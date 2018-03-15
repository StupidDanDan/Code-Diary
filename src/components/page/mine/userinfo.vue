<template>
    <div class="userinfo">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="头像：">
                <img v-lazy="photo" class="userimg" alt="" @click="imgdivshow = !imgdivshow">
                <div v-if="imgdivshow" class="imgdiv">
                    <img v-lazy="imgitem" class="userimg borderadd" alt="" v-for="imgitem in imglist" @click="changephoto(imgitem)">
                </div>
            </FormItem>
                
            <FormItem label="用户名：" prop="name">
                <Input v-model="formValidate.name"  placeholder="Enter your name" disabled></Input>
            </FormItem>
            <FormItem label="手机号：" prop="phone">
                <Input v-model="formValidate.phone" placeholder="Enter your Phone"></Input>
            </FormItem>
            <FormItem label="个性签名：" prop="showme">
                <Input v-model="formValidate.showme"  placeholder="Enter your ShowMe"></Input>
            </FormItem>
            <FormItem label="性别：" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="man">男</Radio>
                    <Radio label="wowan">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</Button>
            </FormItem>
    </Form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userinfo:'',
            imglist:['http://oz033lzfm.bkt.clouddn.com/rongrong.jpg','http://oz033lzfm.bkt.clouddn.com/djx.jpg','http://oz033lzfm.bkt.clouddn.com/touxiang.jpg','http://oz033lzfm.bkt.clouddn.com/dingyue.jpg','http://oz033lzfm.bkt.clouddn.com/tou2.jpg','http://oz033lzfm.bkt.clouddn.com/tou1.jpg'],
            photo:'',
            imgdivshow:false,
            formValidate: {
                    name: '',
                    phone: '',
                    showme: '',
                    gender: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机号码不能为空', trigger: 'blur' },
                        { validator(rule, value, callback, source, options) {
                            var errors = [];
                            if (!/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(value)) {
                                callback('手机号码输入不正确');
                            } 
                            callback(errors);
                        }, message: '手机号码不正确', trigger: 'blur' }
                    ],
                    showme: [
                        { required: true, message: 'Please select the city', trigger: 'blur' },
                        { type: 'string', max: 20, message: '最多只能20个字', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                }
        }
    },
    created(){
        this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid=' + this.$cookieStore.getCookie('userid')).then(res =>{
            this.userinfo = res.data;
            this.formValidate.name = this.userinfo.userid;
            this.formValidate.phone = this.userinfo.userphone;
            this.formValidate.showme = this.userinfo.usershowme;
            this.formValidate.gender = this.userinfo.usersex;
            // console.log( this.userinfo)
            this.photo = this.userinfo.userphoto;
        })
    },
    methods:{
        changephoto(imgsrc){
            this.photo = imgsrc;
        },
        handleReset(){
            this.formValidate.phone = '';
            this.formValidate.showme = '';
            this.formValidate.gender ='man';
        },
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.post("http://txspring.cn:8010/updateUser", this.qs.stringify({
					        type: "userall",
					        userphone: this.formValidate.phone,
					        usersex: this.formValidate.gender,
					        usershowme: this.formValidate.showme,
					        userid: this.formValidate.name
				        })).then(res => {
                            console.log(res);
                            if(res == "1" || res == 1 || res.data == "1") {

                                this.axios.post("http://txspring.cn:8010/updateUser", this.qs.stringify({
					                type: "userphoto",
					                value: this.photo,
					                userid: this.formValidate.name
				                })).then((res) => {
                                   if(res == "1" || res == 1 || res.data == "1") {
                                        this.$Message.success('头像修改成功');
                                   }else {
                                        this.$Message.error('不知道为什么头像修改失败了，请联系管理员');
                                   }
                                })
                                this.$Message.success('信息修改成功');
						        location.reload();
					        } else {
						        this.$Message.error('不知道为什么信息修改失败了，请联系管理员');
					        }
                        })
                    } else {
                        this.$Message.error('您修改的个人信息不符合条件，请重新填写');
                    }
            })
           
        }
    }
}
</script>

<style lang="less">
.userinfo{
    .userimg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin:5px 10px;
    }
    .borderadd{
        border: 1px solid #8590a6;
    }
    .imgdiv{
        position: relative;
        z-index: 99;
        border: 1px solid #8590a6;
        border-radius: 5px;
    }
}
</style>

