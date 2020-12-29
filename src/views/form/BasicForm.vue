<template>
    <!-- @todo 基础表单开发 -->
    <a-form>
        <a-form-item label="姓名">
            <a-input></a-input>
        </a-form-item>
        <a-form-item label="部门">
            <a-select v-model="departmentSelected" style="width: 120px">
                <a-select-option v-for="department in departmentList" :key="department" :value="department.id">
                    {{ department.name }}
                </a-select-option>
            </a-select>
        </a-form-item>
    </a-form>
</template>

<script>
import { ref } from 'vue'
import axios from "axios"

export default {
    name: "BasicForm",
    setup() {
        const departmentSelected = ref('')
        const departmentList = ref([])
        axios.get("/meta/department").then((res) => {
            departmentList.value = res.data.list
        })
        return {
            departmentList,
            departmentSelected
        }
    },
};
</script>
