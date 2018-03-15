<template>
    <div class="userinfo">
        <Form ref="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="头像：" prop="city">
                <Select  placeholder="Select your city">
                    <Option value="beijing"><img v-lazy='http://oz033lzfm.bkt.clouddn.com/rongrong.jpg' alt=""></Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="用户名：" prop="name">
                <Input  placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="手机号：" prop="phone">
                <Input placeholder="Enter your Phone"></Input>
            </FormItem>
            <FormItem label="个性签名：" prop="showme">
                <Input placeholder="Enter your ShowMe"></Input>
            </FormItem>
            <FormItem label="性别：" prop="gender">
                <RadioGroup >
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
    </Form>
        <!-- <Card style="width:350px">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Classic film
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            Change
        </a>
        <ul>
            <li><span>用户名: {{ userinfo.userid }}</span></li>
            <li><span>手机号: {{ userinfo.userphone }}</span></li>
            <li><span>个性签名: {{ userinfo.usershowme }}</span></li>
            <li><span>性别: {{ userinfo.usersex }}</span></li>
        </ul>
    </Card> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            userinfo:'',
        }
    },
    created(){
        this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid=' + this.$cookieStore.getCookie('userid')).then(res =>{
            console.log(res);
            this.userinfo = res.data;
        })
    }
}
</script>

<style lang="less">

</style>

