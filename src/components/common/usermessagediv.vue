<template>
    <div class="usermessagediv">
        <!--作者部分 -->
        <div class="authormessage">
            <img class="authorimg" v-lazy="articleauthor.userphoto" />
            <div class="authorcontent">
                <p>{{articleauthor.userid}}</p>
                <p>{{articleauthor.usershowme}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            articleauthor:[],
        }
    },
    props: {
        articleauthorid: String  //定义传值的类型<br>    }
    },
    created(){
        this.axios.get('http://txspring.cn:8010/findByUserIdDao?userid='+ this.articleauthorid).then((res)=>{
            if(res.data.type=="0"){
                this.$Message.error('作者信息读取失败');
            } else{
                this.articleauthor = res.data;
             }
        })
    }
}
</script>
<style lang="less">
@import "./usermessagediv.less";

</style>
