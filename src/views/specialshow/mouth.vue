<template>
    <week-slider @dateClick="dateClickhandler" :showYear="true" :defaultDate.sync="default_date" style="padding-top:40px"></week-slider>      
</template>
<script>
export default {
    name: 'app',
    data () {
        return {
            default_date: '2019-04-12'
        }
    },
    methods: {
        dateClickhandler (date) {
            console.log(date);
        }
    }
}
</script>
<style scoped>

</style>