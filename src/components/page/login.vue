<template>
  <div class="login">
    <img src="../../assets/images/logo.png" alt="" class="logo">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
         <router-link tag="p" class="goregisterbtn" :to="{ name: 'register'}">还没账号？点击跳转注册页面</router-link>
    </Form>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' },
                        { type: 'string', min: 4, max: 8, message: '用户名个数4-8,字母和数字组成', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6,max: 10, message: '密码个数6-10,字母和数字组成', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                 this.$refs[name].validate((valid) => {
                    if (valid) {                                       
                        this.axios.post('http://txspring.cn:8010/getUser',this.qs.stringify({
								user: this.formInline.user,
								password: this.formInline.password
						})).then(response => {
                            if (response.data.type == "0") {
                                 this.$Message.error('用户名秘密错误！');
                                 this.formInline.user = '';
                                 this.formInline.password = '';
                            } else {
                                this.formInline.user = '';
                                this.formInline.password = '';  

                                this.$cookieStore.setCookie('userid', response.data.userid,2)
                                this.$cookieStore.setCookie('userpassword', response.data.userpassword,2)
                                // this.$cookieStore.setCookie('usercanuser', response.data.usercanuser,2)
                                // this.$cookieStore.setCookie('usersex', response.data.usersex,2)
                                // this.$cookieStore.setCookie('usershowme', response.data.usershowme,2)
                                // this.$cookieStore.setCookie('userphoto', response.data.userphoto,2)
                                // this.$cookieStore.setCookie('userphone', response.data.userphone,2)
                                // console.log(this.$cookieStore.getCookie('user'))
                                this.$Message.success('登录成功，3秒之后为您跳转'); 
                                var _this = this;
                                setTimeout(function() {
									_this.$router.push('/index');
								}, 3000);
                            }                                
                        }, response => {
                            this.$Message.error('登录出错，请尝试重新登录或者联系管理员');       
                        })
                    } else {
                        this.$Message.error('你的用户名和密码填写不正确');
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.login{
    background: #ffffff;
    width: 300px;
    margin: 0 auto;
    margin-top: 250px;
    padding: 20px;
    .logo{
        width: 200px;
        padding: 10px;
    }
    .ivu-btn{
        &.ivu-btn-primary{
            width: 165px;
        }
    } 
    .goregisterbtn{
        color: #76b1ff;
        cursor: pointer;
    }
    
}
</style>

