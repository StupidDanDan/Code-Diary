<template>
    <div class="writearticle">
        <div>
            文章标题：<Input v-model="articletitle" placeholder="Enter something..." style="width: 300px"></Input>
        </div>
        <div>
            文章类别：<Select v-model="articleclass" clearable style="width:200px">
                        <Option v-for="item in articleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
        </div>
        <div id="editorElem" style="text-align:left;position:relative;z-index:1;"></div>
        <div> <Button type="primary" @click="sendarticle()">发表文章</Button></div>
    </div>
</template>
<script>
 import E from 'wangeditor'
export default {
    data(){
        return{
            editorContent: '',
            articletitle:'',
            articleList: [
                    {
                        value: '003',
                        label: 'JavaScript'
                    },
                    {
                        value: '002',
                        label: 'CSS'
                    },
                    {
                        value: '006',
                        label: 'Node.JS'
                    },
                    {
                        value: '001',
                        label: 'Mysql'
                    },
                    {
                        value: '004',
                        label: 'Mui'
                    },
                    {
                        value: '005',
                        label: 'Project'
                    }
                ],
                articleclass: ''
        }
    },
    mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          console.log(this.editorContent);
        }
        editor.create()  
    },
    methods:{
        sendarticle(){
            console.log(this.editorContent);
            console.log(this.articletitle);
            console.log(this.$cookieStore.getCookie('userid'));
            console.log(this.articleclass);
            this.axios.post('http://txspring.cn:8010/sendDetailPages',this.qs.stringify({
				content: this.editorContent,
				title: this.articletitle,
				userid: this.$cookieStore.getCookie('userid'),
				classid: this.articleclass
			})).then(res => {
                console.log(res.data.type);
                if (res.data.type == '1') {
                    this.$Message.success('发表成功'); 
                    setTimeout(() => {
                        this.$router.push('/index');
                    }, 1000);
                } else {
                    this.$Message.error('不知道出了什么奇怪的事情，请重新尝试发表文章');
                }
            })
        }
    }
}
</script>
<style lang="less">
.writearticle{
    text-align: left;
    >div{
        margin: 40px auto;
        width:700px
    }
}
</style>

