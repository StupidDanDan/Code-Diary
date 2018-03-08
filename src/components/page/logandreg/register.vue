<template>
  <div class="register">
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
            <Button type="primary" @click="handleSubmit('formInline')">register</Button>
        </FormItem>
         <router-link tag="p" class="gologinbtn" :to="{ name: 'login'}">已经有账号，前往登录</router-link>
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
                        this.axios.post('http://txspring.cn:8010/addUser',this.qs.stringify({
								user: this.formInline.user,
								password: this.formInline.password
						})).then(response => {
                            if (response.data.type == "0") {
                                 this.$Message.error('用户名已经被占用了！');
                                 this.formInline.user = '';
                                 this.formInline.password = '';
                            } else {
                                this.$Message.success('注册成功，快去登陆页面登陆吧！'); 
                                this.formInline.user = '';
                                this.formInline.password = '';  
                            }                                
                        }, response => {
                            this.$Message.error('注册出错，请尝试重新注册或者联系管理员');       
                        })                      
                    } else {
                        this.$Message.error('您填写的注册信息不正确。');
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.register{
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
    .gologinbtn{
        color: #76b1ff;
        cursor: pointer;
    }
    
}
</style>

