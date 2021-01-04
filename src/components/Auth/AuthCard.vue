<!--
 * @Author: Richard Chiang
 * @Date: 2020-12-30 17:54:55
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2021-01-04 18:10:31
 * @Email: 19875991227@163.com
 * @Description: 
-->
<template>
    <div
        class="auth-card"
        :style="{ width: width,height: height}"
    >
        <div class="auth-card-container">
            <div class="auth-card-inner">
                <div class="auth-card-image-container">
                    <RedoOutlined class="auth-card-redo" @click="handleNext" />
                    <div ref="imageBlock" class="auth-card-image-block"></div>
                    <div ref="imageClip" class="auth-card-image-clip"></div>
                    <img class="auth-card-image" :src='`/static/images/validate/${image.active}.jpg`' :alt="`验证图片${image.active}`" />
                </div>
                <div class="auth-card-slide-container" @mousemove="slideMove" @mouseup="slideEnd" @mouseleave="slideEnd">
                    <div class="auth-card-slide" ref="slide" @mousedown="slideStart">
                        <ArrowRightOutlined />
                    </div>
                    <div class="auth-card-slide-text" v-show="!slide.active">向右拖动滑块填充拼图</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, nextTick } from 'vue'
import { RedoOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'

export default {
    name: 'AuthCard',
    data() {
        return {
            slide: {
                width: '',
                active: false,
                startX: '',
                diffX: ''
            }
        }
    },
    props: {
        width: {
            type: String,
            default: '300'
        },
        height: {
            type: String,
            default: '300'
        }
    },
    components: {
        RedoOutlined,
        ArrowRightOutlined
    },
    methods: {
        // 更换背景图
        handleNext() {
            this.image.active = this.image.active >= 5 ? 1 : ++this.image.active
            this.init()
        },
        slideStart(e) {
            e.preventDefault()
            this.slide.startX = e.clientX
            this.slide.active = true
            this.slide.width = document.getElementsByClassName('auth-card-slide-container')[0].offsetWidth
        },
        slideMove(e) {
            if (this.slide.active) {
                this.slide.diffX = e.clientX - this.slide.startX
                if (this.slide.diffX < 0) this.slide.diffX = 0
                if (this.slide.diffX > this.slide.width) this.slide.diffX = this.slide.width
                this.$refs.slide.style.left = `${this.slide.diffX}px`
                this.$refs.slide.style.transition = ''
                this.$refs.imageClip.style.left = `${this.slide.diffX}px`
            }
        },
        slideEnd() {
            if (this.slide.active) {
                // 判断是否验证通过(偏移量大致相等)
                let res = this.isAlmostEqual(this.$refs.imageClip.style.left, getComputedStyle(this.$refs.imageBlock).left)
                res ? this.validateSuccess() : this.validateFailed()
                this.$refs.slide.style.left = '0px'
                this.$refs.slide.style.transition = 'left 0.5s ease-in'
                this.slide.active = false
            }
        },
        validateSuccess() {
            this.handleNext()
            alert('验证通过')
        },
        validateFailed() {
            this.handleNext()
            alert('验证失败')
        },
        isAlmostEqual(cLeft, bLeft) {
            cLeft = cLeft.substr(0, cLeft.length - 2)
            bLeft = bLeft.substr(0, bLeft.length - 2)
            return cLeft <= bLeft + this.image.maxDiff && cLeft >= bLeft - this.image.maxDiff
        }
    },
    setup(props) {
        const image = reactive({
            active: 1,
            count: 5,
            maxDiff: 5,
            pos: {
                x: 0,
                y: 0
            }
        })
        let imageBlock = ref('')
        let imageBackground = ref('')
        let imageClip = ref('')
        nextTick(() => {
            imageBlock = document.getElementsByClassName('auth-card-image-block')[0]
            imageBackground = document.getElementsByClassName('auth-card-image')[0]
            imageClip = document.getElementsByClassName('auth-card-image-clip')[0]
        })
        const init = () => {
            nextTick(() => {
                setRandomPosition()
                imageClip.style.backgroundImage = `url(/static/images/validate/${image.active}.jpg)`
                console.log(image.pos.x, image.pos.y)
                imageClip.style.backgroundPosition = `${image.pos.x}px ${image.pos.y}px`
                imageClip.style.top = image.pos.y + 'px'  
                imageClip.style.left = '10px'
                imageClip.style.backgroundSize = `${imageBackground.naturalWidth}px ${imageBackground.naturalHeight}px` // 这里很重要，这个尺寸等于原图片大小，保证准确匹配切片图片
                imageBlock.style.left = image.pos.x + 'px'
                imageBlock.style.top = image.pos.y + 'px' 
            })
        }
        // 生成随机位置
        const setRandomPosition = () => {
            image.pos.x = Math.floor(Math.random() *  (props.width - 150) + 101)
            image.pos.y = Math.floor(Math.random() *  (props.height - 100) + 50)
        }
        init()
        return {
            image,
            init,
            setRandomPosition
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-card {
    .auth-card-container {
        padding: 10px;
        border: 1px solid #d9d9d9;
    }
    .auth-card-background {
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
    }
    .auth-card-image-container {
        position: relative;
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        .auth-card-redo {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            opacity: 0.5;
            z-index: 2;
        }
        .auth-card-redo:hover {
            opacity: 1;
        }
        .auth-card-image-block {
            position: absolute;
            // top: 200px;
            // left: 200px;
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) inset;
            border-radius: 5px;
        }
        .auth-card-image {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
        .auth-card-image-clip {
            position: absolute;
            // top: 0;
            // left: 10px;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) outset;
        }
    }
    .auth-card-slide-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        z-index: 1;
        .auth-card-slide {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 38px;
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
            font-size: 18px;
            cursor: pointer;
            transition: background 0.2s ease-in;
            z-index: 3;
            &:hover {
                background: #096dd9;
                color: #fff;
            }
        }
        .auth-card-slide-text {
            color: #000;
            user-select: none;
            -webkit-user-select: none;
        }
    }
}
</style>