<template>
    <div class="monitor-content">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .monitor-content {
        margin-top:0.2rem;
        width:100%;
        height:0.68rem;
        background:rgba(50, 150, 250, 1);
        font-size:0.36rem;
        color:white;
        line-height:0.68rem;
        padding-left:0.2rem;
        box-sizing: border-box;
    }
</style>