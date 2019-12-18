<template>
    <Card style="width: 800px;">
        <p slot="title">{{vm.$t('finance.xgjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}</span>
                <Input v-model="data.username" style="width: 200px;"></Input>
                <Button type="primary" @click="getList()">{{vm.$t('common.cx')}}</Button>
            </p>
            <Table :columns="columns" :data="tabData"></Table>
            <Page :current="page" :total="total" @on-change="changePage" :pageSize="pageSize"
                  style="text-align:center;margin-top:20px;"></Page>
        </div>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    export default {
        props: ['item'],
        name: "history",
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                page: 1,
                total: 0,
                pageSize: 8,
                data: {
                    username: null
                },
                tabData: [],
                columns: [
                    {key: 'createdAt',title: vm.$t('mall.cjsj')},
                    {key: 'username',title: vm.$t('common.yhm')},
                    {key: 'beforeCode',title: vm.$t('invite.xgq')},
                    {key: 'afterCode',title: vm.$t('invite.xgh')},
                    {key: 'operatorUsername',title: vm.$t('finance.czr')},
                ]
            }
        },
        created() {
            console.log(this.item)
            if(this.item){
                this.data.username = this.item
                this.getList()
            }
        },
        methods: {
            getList(){
                inviteApi.findUserInviteModifyRecord(this.pageSize,this.page,this.data, res => {
                    // this.$Message.success({content: res.msg});
                    this.tabData = res.data
                    this.total = res.total
                    if(!res.data[0]){
                        this.$Message.success({content: vm.$t('common.zwsj')});
                    }
                }, msg => {
                    this.$Message.error({content: msg});
                });
            },
            closeDialog(){
                this.$emit('removeDialog');
            },
            changePage(page){
                this.page = page
                this.getList()
            }
        }

    }
</script>

<style scoped>
.cont p{
    margin-bottom: 10px;
}
</style>
