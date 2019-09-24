<template>
    <Card style="width: 800px;">
        <p slot="title">{{vm.$t('finance.xgjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}</span>
                <Input v-model="username" style="width: 200px;"></Input>
                <Button type="primary" @click="getList()">{{vm.$t('common.cx')}}</Button>
            </p>
            <Table :columns="columns" :data="tabData"></Table>
            <Page :current="page" :total="total" @on-change="changePage" :page-size="size"
                  style="text-align:center;margin-top:20px;"></Page>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "history",
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                username: null,
                page: 1,
                total: 0,
                size: 10,
                tabData: [],
                columns: [
                    {key: 'at',title: vm.$t('mall.cjsj')},
                    {key: 'at',title: vm.$t('common.yhm')},
                    {key: 'at',title: vm.$t('invite.xgq')},
                    {key: 'at',title: vm.$t('invite.xgh')},
                    {key: 'at',title: vm.$t('finance.czr')},
                ]
            }
        },
        created() {

        },
        methods: {
            getList(){},
            closeDialog(){
                this.$emit('removeDialog');
            },
            changePage(){}
        }

    }
</script>

<style scoped>
.cont p{
    margin-bottom: 10px;
}
</style>
