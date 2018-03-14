<template>
    <div class="booklist">
        <div class="books" v-for="book in booklists.item" @click="tobookView(book.src,book.name,book.details)">
            <div><img :src="book.src" alt=""></div>
            <div>书名：{{book.name}}</div>
            <div>作者：{{book.autor}}</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    props:{
        booklists:Object,
    },
    methods:{
        tobookView(a,b,c){
            var books = [a,b,c];
            this.$router.push({
            path: '/index/detailsbook', // 路径
            query: { // 查询参数
              books: books,
            }
        })
        }
    }
}
</script>

<style lang="less">
.booklist{
    .books{
        display: inline-block;
        width:280px;
        text-align: center;
        margin-top: 40px;
        cursor: pointer;
    }
}
</style>


