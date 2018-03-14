<template>
   <div class="homeconbtn">
        <div class="conbtnwarp">
            <div :class="{'blue' : isupvote}" @click="upvote()"> <i slot="icon" class="iconfont icon-xihuan1"></i>{{detailsarticle.detailpagegood}}点赞</div>
            <div> <i slot="icon" class="iconfont icon-msnui-sns"></i>{{detailsarticle.detailpagecount}}阅读</div>
            <div :class="{'blue' : isdiscuss}" @click="updiscuss()"> <i slot="icon" class="iconfont icon-xiaoxi"></i>{{isdiscuss ? '收起评论' : '评论'}}</div>
            <div :class="{'blue' : isstoreup}" @click="storeup()"> <i slot="icon" class="iconfont icon-buoumaotubiao44"></i>{{isstoreup ? '已收藏' : '收藏'}}</div>
            <div> <i slot="icon" class="iconfont icon-msnui-sns"></i>分享</div>
        </div>
        <!-- 评论区域 -->
        <div class="pinglunwarap" v-if="isdiscuss">
            
            <div class="discussitemone">评论区域：</div>
            <div class="loadingdiv" v-if="isloading">
                <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </div>
            <div class="discussitem" v-if="discuss.length>0" v-for="discussi in discuss">
                <div>
                    <p class="usercontent">
                        <img :src="discussi.userphoto" alt="" class="userimg">
                        <span class="username">{{discussi.userid}}</span>
                        <span class="articletime">{{discussi.createdAt | filterByTime}}</span>
                    </p>
                    <p><span class="discusscontent">评论内容：{{discussi.remarkcontent}}</span><span class="deldiscuss" @click="deletediscuss(discussi)">删除评论</span></p>
                </div>
                <Modal
                    v-model="modal1"
                    title="温馨提示："
                    @on-ok="ok()"
                    @on-cancel="modal1 = false">
                    <p>确定要删除该条评论吗？</p>
                 </Modal>
            </div>
            <div class="adddiscuss">
                <Input v-model="adddiscusscontent"  placeholder="写下你的评论..最多20个字" style="width: 600px" clearable :maxlength="20"></Input>
                <Button class="discussbtn" @click="adddiscuss()" >发送评论</Button>
            </div>

        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            isupvote:false,
            isdiscuss:false,
            isstoreup:false,
            userid:'',
            discuss:[],
            adddiscusscontent:'',
            isloading:true,
            modal1:false,
            deldiscuss:{},
        }
    },
    props: {
        detailpageid: String,  //定义传值的类型<br>    }
        detailsarticle:Object
    },
    created(){
        this.userid = this.$cookieStore.getCookie('userid');
        this.axios.get('http://txspring.cn:8010/selectedUidAic?userid=' + this.userid + '&articalid=' + this.detailpageid).then((res)=>{
                if(res.data.type != '0'){
                    this.isstoreup = true;
                    // this.$Message.error('文章已经收藏过了');
                }else{
                    this.isstoreup =false;
                }
        })

    },
    updated(){
        console.log()
    },
    methods:{
        upvote(){
            this.axios.get('http://txspring.cn:8010/addDetailGood?detailid=' + this.detailpageid).then((res)=>{
                if(res.data != '1'){
                    this.$Message.error('点赞失败');
                } else{
                    this.isupvote = true;
                    this.detailsarticle.detailpagegood = parseInt(this.detailsarticle.detailpagegood) + 1;
                    this.$Message.success('点赞成功'); 
                }
            })
        },
        storeup(){
            this.axios.get('http://txspring.cn:8010/selectedUidAic?userid=' + this.userid + '&articalid=' + this.detailpageid).then((res)=>{
                if(res.data.type != '0'){
                    this.$Message.error('文章已经收藏过了');
                } else{  
                    this.axios.post('http://txspring.cn:8010/addCollectByAll', this.qs.stringify({
								userid: this.userid,
								detailid: this.detailpageid,
					})).then((res)=>{
                        if(res.data.type != '1'){
                            this.$Message.error('收藏失败');
                        } else{
                            this.isstoreup = true;
                            this.$Message.success('收藏成功'); 
                        }
                    })
                }
            })
        },
        updiscuss(){
            this.isdiscuss = !this.isdiscuss;
            if (this.isdiscuss) {
                this.axios.get('http://txspring.cn:8010/getAllRemark?remarkarticleid=' + "'" + this.detailpageid + "'").then((res)=>{
                    setTimeout(() => {
                        this.isloading=false;
                        if (res.data.type == '0') {
                            this.$Message.warning('该文章还没有任何评论');
                            this.discuss=[];
                        } else {
                            console.log(res)
                            this.discuss = res.data;
                        }
                    }, 1000);     
                })
            } else {
                this.discuss = [];
                this.isloading=true;
            }    
        },
        adddiscuss(){
            this.axios.post('http://txspring.cn:8010/addRemark', this.qs.stringify({
					remarkcontent: this.adddiscusscontent,
					remarkpersonid: this.userid,
					remarkarticleid: this.detailpageid
			})).then(res => {
                    // console.log(data);
                    if (res.data.type != '1') {
                        // 不成功
                         this.$Message.error('评论失败');
                    } else {
                        this.$Message.success('评论成功，正在为您刷新评论');
                        this.refreshdiscuss();
                    }
            })
        },
        deletediscuss(discussi){          
            if (discussi.remarkpersonid == this.userid) {
                this.deldiscuss = discussi;
                this.modal1 = true;
            } else {
                this.$Message.error('删除失败，这条评论不是您的。');
            }
        },
        refreshdiscuss(){
            this.adddiscusscontent = '';
            this.discuss = []; 
            this.isloading = true;
            this.axios.get('http://txspring.cn:8010/getAllRemark?remarkarticleid=' + "'" + this.detailpageid + "'").then((res)=>{
                setTimeout(() => {
                    this.isloading=false;
                    if (res.data.type == '0') {
                        this.$Message.warning('该文章还没有任何评论');
                        this.discuss=[];
                    } else {
                         this.discuss = res.data;
                    }
                }, 1000);
                    
            })
        },
        ok(){
            this.axios.get('http://txspring.cn:8010/deleteRemarkByPersonId?remarkid=' + this.deldiscuss.remarkid + '&remarkpersonid=' + this.deldiscuss.remarkpersonid).then(res => {
                console.log(res.data == 1);
                if (res.data == 1) {
                    this.deldiscuss = {};
                    this.refreshdiscuss();
                } else {
                    this.$Message.error('删除失败，请联系管理员');
                    refreshdiscuss();
                }
            })
        }
    },
    filters:{
      filterByTime(value){
        if(value!=""){       
          return tools.returnYearMonth(value);
        }
        else{
          return value;
        }
      }
    }
}   
</script>

<style lang="less">
@import "./homeconbtn.less";
</style>


