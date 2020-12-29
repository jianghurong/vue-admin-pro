<!--
 * @Author: Richard Chiang
 * @Date: 2020-12-29 09:59:16
 * @LastEditor: Richard Chiang
 * @LastEditTime: 2020-12-29 16:53:56
 * @Email: 19875991227@163.com
 * @Description: 
-->
<template>
    <div>
        <a-row :gutter="24" style="margin-bottom: 24px">
            <a-col :sm="24" :md="12" :xl="6">
                <chart-card :loading="loading" title="用户数" total="2116680">
                    <template #footer> 用户 </template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6">
                <chart-card :loading="loading" title="月活跃用户" total="1016182">
                    <template #footer> 最近一月 </template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6">
                <chart-card :loading="loading" title="总视频数" total="2764125">
                    <template #footer> 视频 </template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6">
                <chart-card :loading="loading" title="今日上传视频" total="2161">
                    <template #footer> 最近一天 </template>
                </chart-card>
            </a-col>
        </a-row>
        <a-row :gutter="24">
            <a-col :sm="24" :md="12">
                <a-card :loading="loading" title="用户数量（新增）">
                    <div id="userAmountContainer"></div>
                </a-card>
            </a-col>
            <a-col :sm="24" :md="12">
                <a-card :loading="loading" title="视频分类">
                    <div id="videoAmountContainer"></div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { ChartCard } from "@/components"
import { Column, Pie } from "@antv/g2plot"
import axios from "axios"

export default {
    name: "statistics",
    components: {
        ChartCard,
    },
    setup() {
        const loading = ref(true)
        axios.all([
            axios.get('/statistics/newlyUser'),
            axios.get('/statistics/video')
        ]).then(axios.spread((user, video) => {
            loading.value = false
            nextTick(() => {
                const userAmountColumn = new Column("userAmountContainer", {
                    appendPadding: 10,
                    data: user.data,
                    xField: "month",
                    yField: "amount",
                    meta: {
                        amount: {
                            alias: "新增用户",
                        },
                    },
                })
                userAmountColumn.render()
                const videoAmountPie = new Pie("videoAmountContainer", {
                    appendPadding: 10,
                    data: video.data,
                    angleField: "value",
                    colorField: "type",
                })
                videoAmountPie.render()
            })
        }))
        return {
            loading
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
