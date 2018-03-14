<template>
    <div class="detailsbook">
        <div class="book">
            <div><img :src="books[0]" alt=""></div>
            <div>书名：{{books[1]}}</div>
            <div class="bookcontent">{{books[2]}}</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            books:[],
        }
    },
    created(){
        this.books = this.$route.query.books
    }
}
</script>

<style lang="less">
.detailsbook{
    .book{
        padding: 100px;
        .bookcontent{
            text-align:justify;
            margin-top: 20px;
        }
    }
}
</style>

