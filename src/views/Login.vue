<template>
    <div style="padding: 40px">
        <!-- @todo 登录验证 拖动 -->
        <a-row type="flex" justify="center">
            <a-col :xs="24" :sm="24" :md="12" :lg="6">
                <a-form
                    :layout="loginForm.layout"
                    :model="loginForm"
                    :rules="rules"
                >
                    <a-form-item has-feedback label="账号" name="account">
                        <a-input
                            v-model:value="loginForm.account"
                            placeholder="请输入账号"
                        />
                    </a-form-item>
                    <a-form-item has-feedback label="密码" name="password">
                        <a-input-password
                            v-model:value="loginForm.password"
                            placeholder="请输入密码"
                        />
                    </a-form-item>
                    <a-form-item>
                        <auth-card
                            width="438"
                            height="300"
                        ></auth-card>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            @click="login"
                            :loading="loading"
                        >
                            登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { message } from "ant-design-vue"
import { AuthCard } from '@/components'

export default {
    name: "Login",
    components: {
        AuthCard
    },
    setup() {
        const router = useRouter();
        const loading = ref(false);
        // 验证账号
        const validateAccount = async (rule, value) => {
            if (value === "") {
                return Promise.reject("请输入账号");
            }
        };
        // 验证密码
        const validatePassword = async (rule, value) => {
            if (value === "") {
                return Promise.reject("请输入密码");
            }
        };
        const rules = {
            account: [
                {
                    validator: validateAccount,
                    trigger: "change",
                },
            ],
            password: [
                {
                    validator: validatePassword,
                    trigger: "change",
                },
            ],
        };
        const loginForm = reactive({
            layout: "vertical", // 表单布局 'horizontal'-水平 'vertical'-垂直 'inline'-行内
            account: "",
            password: "",
        });
        const login = () => {
            loading.value = true;
            loginSuccess();
        };
        const loginSuccess = () => {
            // @todo 登录规则
            setTimeout(() => {
                loading.value = false;
                router.push("/dash");
                message.success("登录成功");
            }, 2000);
        };
        return {
            loading,
            rules,
            loginForm,
            login,
        };
    },
};
</script>
