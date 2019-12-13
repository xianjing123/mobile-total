<template>
    <div class="header">
        <div><i class="iconfont icon-xiangzuo" @click="historyGo"></i></div>
        <div><slot></slot></div>
        <div></div>
    </div>
</template>

<script>
export default {
    methods:{
        historyGo () {
            console.log(this.$router.go(-1))
        }
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width:100%;
        height:0.4rem;
        background:white;
        display:flex;
        justify-content: space-between;
        line-height:0.4rem;
        font-size:0.18rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(25,31,37,1);
        .icon-xiangzuo{
            margin-left:0.05rem;
        }
    }
</style>