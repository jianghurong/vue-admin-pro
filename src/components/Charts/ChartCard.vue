<!--
 * @Author: Richard Chiang
 * @Date: 2020-12-29 10:38:07
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2020-12-29 16:57:45
 * @Email: 19875991227@163.com
 * @Description: 
-->
<template>
    <a-card
        :loading="loading"
        class="chart-card"
    >
        <div class="chart-card-header">
            <div class="chart-card-header-title">{{ title }}</div>
            <div class="chart-card-header-tips">
                <a-tooltip>
                    <template #title>
                        {{ prompt }}
                    </template>
                    <InfoCircleTwoTone />
                </a-tooltip>
            </div>
        </div>
        <div class="chart-card-main">
            <h2>{{ total }}</h2>
        </div>
        <div class="chart-card-footer">
            <slot name="footer"></slot>
        </div>
    </a-card>
</template>

<script>
import { InfoCircleTwoTone } from '@ant-design/icons-vue'

export default {
    name: "ChartCard",
    props: {
        title: {
            type: String,
        },
        total: {
            type: String,
        },
        prompt: {
            type: String,
            default: '介绍'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    components: {
        InfoCircleTwoTone
    }
};
</script>

<style lang="scss" scoped>
.chart-card {
    .chart-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chart-card-header-tips {
            font-size: 20px;
        }
    }
}
</style>