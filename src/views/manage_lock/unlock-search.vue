<template>
    <Card>
        <p slot="title">{{$t('lock.ewjscx')}}</p>
        <p style="margin-bottom: 10px">
            {{$t('common.yhm')}}
            <Input v-model="form.username" style="width: 200px"></Input>
            {{$t('common.sj')}}
            <DatePicker type="datetime" v-model="form.createdStart"
                        format="yyyy-MM-dd HH:mm:ss"
                        style="width: 200px"></DatePicker>
            <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
        </p>
        <Table :columns="columns" :data="data"></Table>
        <Page :current="page" :total="total"
              @on-change="changePage" :page-size="size"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import lock from '../../api/lock'
    import util from '../../libs/util';
    import lockList from './lock-search/lock-list'
    import upList from './lock-search/up-list'
    export default {
        data() {
            return {
                page: 1,
                total: 0,
                size: 10,
                data: [],
                form:{
                    username:  null,
                    createdStart: null
                },
                columns: [
                    {key: 'username', title: this.$t('common.yhm')},
                    {key: 'accountId', title: this.$t('exchange.mb')},
                    {key: 'totalBalance', title: this.$t('lock.jyl')},
                    {key: 'frozenBalance', title: this.$t('lock.jd')},
                    // {key: 'availableBalance', title: this.$t('lock.sczhysf')},
                    {key: '', title: this.$t('common.cz'),render:(h,params)=>{
                            return ('div', [
                                h('Button',{
                                    props: {type: 'primary', size: 'small'},
                                    style: {margin: '3px'},
                                    on: {
                                        click: ()=>{
                                            util.setDialog(lockList,
                                                {
                                                    item: params.row,
                                                }
                                            )
                                        }
                                    }
                                }, this.$t('exchange.scjl')),
                                h('Button',{
                                    props: {type: 'primary', size: 'small'},
                                    style: {margin: '3px'},
                                    on: {
                                        click: ()=>{
                                            util.setDialog(upList,
                                                {
                                                    item: params.row,
                                                }
                                            )
                                        }
                                    }
                                }, this.$t('lock.scffjl'))
                            ])
                        }}
                ],
            }
        },
        created() {
            console.log(this.page)
            this.getList()

        },
        methods: {
            getList() {
                let data = {page: this.page, size: this.size}
                if(this.form.username){
                    data.username = this.form.username
                }
                lock.getAccounts(data, res => {
                    this.data = res.data;
                    this.total = res.total;
                })
            },
            changePage(e) {
                this.page = e;
                this.getList()
            }
        }
    }
</script>

<style scoped>

</style>
