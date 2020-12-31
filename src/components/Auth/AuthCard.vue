<!--
 * @Author: Richard Chiang
 * @Date: 2020-12-30 17:54:55
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2020-12-31 18:00:47
 * @Email: 19875991227@163.com
 * @Description: 
-->
<template>
    <div
        class="auth-card"
        :style="{ width: width + 'px',height: height + 'px' }"
    >
        <div class="auth-card-container">
            <div class="auth-card-inner">
                <div class="auth-card-image-container">
                    <div class="auth-card-image-block"></div>
                    <div class="auth-card-image-clip"></div>
                    <img class="auth-card-image" src="/static/images/sidebar-1.jpg" alt="验证图片1" />
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
import { nextTick } from 'vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'

export default {
    name: 'AuthCard',
    data() {
        return {
            image: {
                pos: {
                    x: 50,
                    y: 50
                }
            },
            slide: {
                width: '',
                active: false,
                startX: '',
                diffX: ''
            }
        }
    },
    prop: {
        width: {
            type: String,
            default: 300
        },
        height: {
            type: String,
            default: 200
        }
    },
    components: {
        ArrowRightOutlined
    },
    methods: {
        slideStart(e) {
            e.preventDefault()
            this.slide.startX = e.clientX
            this.slide.active = true
            this.slide.width = document.getElementsByClassName('auth-card-slide-container')[0].offsetWidth
            console.log(this.slide.width)
        },
        slideMove(e) {
            if (this.slide.active) {
                this.slide.diffX = e.clientX - this.slide.startX
                if (this.slide.diffX < 0) this.slide.diffX = 0
                if (this.slide.diffX > this.slide.width) this.slide.diffX = this.slide.width
                this.$refs.slide.style.left = `${this.slide.diffX}px`
                this.$refs.slide.style.transition = ''
            }
        },
        slideEnd() {
            this.$refs.slide.style.left = '0px'
            this.$refs.slide.style.transition = 'left 0.5s ease-in'
            this.slide.active = false
        }
    },
    setup() {
        nextTick(() => {
            let clip = document.getElementsByClassName('auth-card-image-clip')[0]
            console.log(clip.style)
            clip.style.backgroundImage = 'url(/static/images/sidebar-1.jpg)'
            clip.style.backgroundPosition = '-200px -200px'
            // @todo 准确匹配切片图片
        })
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
        .auth-card-image-block {
            position: absolute;
            top: 200px;
            left: 200px;
            width: 50px;
            height: 50px;
            background: #fff;
            opacity: 1;
        }
        .auth-card-image {
            width: 100%;
            height: 300px;
        }
        .auth-card-image-clip {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
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
            z-index: 2;
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