<template>
    <div class="articleitem">
        <div>
            <div v-if="!isclose">
                <i slot="icon" class="iconfont icon-guanbi close" @click="isclose=!isclose"></i>
                <usermessagediv :articleauthorid="item.detaileuserid ? item.detaileuserid :  item.userid"></usermessagediv>
                <div class="homeCon">
                    <h2 @click="toarticleView(item.detailpageid)">{{item.detailpagetitle}}</h2>
                    <p v-html="item.detailpagecontent"></p>
                </div>
                <homeconbtn :detailpageid="item.detailpageid" :detailsarticle="item"></homeconbtn>
            </div>
            <div v-else>
                <h3>已经屏蔽该条，还不想看到这些内容吗？</h3>
                <span class="close" @click="isclose=!isclose">撤回</span>
            </div> 
        </div>
        
        
    </div>
</template>

<script>
import usermessagediv from '@/components/common/usermessagediv'
import homeconbtn from '@/components/common/homeconbtn'
export default{
    data(){
        return {
            isclose:false,
        }
    },
    props: {
        item: Object  //定义传值的类型<br>    }
    },
    components:{
        usermessagediv,homeconbtn
    },
    created(){
        // console.log(this.item);
    },
    methods:{
        toarticleView(num){
            this.$router.push({
                path: '/index/detailsarticle', // 路径
                query: { // 查询参数
                    detailpageid: num,
                }
            })
        },
    }
} 
</script>

<style lang="less">
.articleitem{
    // text-align: left;
    // padding: 40px;
    // >div{
    //     border-bottom:1px solid #ccc;
    // }
    ul{
        text-align:left;
        margin:0 16px;
    }
    ul li{
        border-bottom:1px solid #ccc;
        padding:20px 0;
    }
    .homeCon{
        h2{
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            margin:6px 0;
            color: #000
        }
        p{
            height:55px;
            line-height:26px;
            overflow:hidden;
            text-overflow:elipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
        }
    }
    .close {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 16px;
    }
}

</style>

