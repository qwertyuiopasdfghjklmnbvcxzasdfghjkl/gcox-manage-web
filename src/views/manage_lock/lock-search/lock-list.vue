<template>
    <Card style="width: 800px">
        <p slot="title">
            {{vm.$t('exchange.scjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <lock-list-tab :data="data"></lock-list-tab>
        <Page :current="page" :total="total"
              @on-change="changePage" :page-size="size"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import LockListTab from '../lock/lock-list-tab'
    export default {
        components: {LockListTab},
        props: ['item'],
        data() {
            const vm = window.vm
            return {
                vm: vm,
                page: 1,
                total: 0,
                size: 10,
                data: [],
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList(){

            },
            closeDialog(){
                this.$emit('removeDialog');
            },
            changePage(e){

            }
        }

    }
</script>

<style scoped>

</style>
