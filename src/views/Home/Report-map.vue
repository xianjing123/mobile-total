<template>
    <div>
        <Header>上报</Header>
        map
    </div>
</template>

<script>
import Header from '../../components/Header'
export default {
    mounted () {
        this.$store.commit("commitShow",false)
    },
    destroyed () {
        this.$store.commit("commitShow",true)
    },
    components:{
        Header
    }
}
</script>