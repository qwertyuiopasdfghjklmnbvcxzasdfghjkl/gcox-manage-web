<template>
    <Card>
        <p slot="title">{{$t('invite.yqgxxg')}}</p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="data.username" @keyup.enter.native="page=1;getList()" style="width: 300px"></Input></span>
                <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                <Button type="primary" style="float: right" @click="historyList()">{{$t('finance.xgjl')}}</Button>
            </p>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :pageSize="size" :total="total" @on-change="changePage" :page-size="size"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import util from '../../libs/util';
    import update from './relation-update/update';
    import history from './relation-update/history';
    import inviteApi from '@/api/invite';
    export default {
        name: "relation",
        data() {
            return {
                name: null,
                code: null,
                size: 10,
                page: 1,
                total: 1,
                data: {
                    username: null
                },
                tabData: [],
                columns: [
                    {key: 'myusername', title: this.$t('common.yhm')},
                    {key: 'username', title: this.$t('invite.tjr')},
                    {key: 'invitedCode', title: this.$t('exchange.tjryqm')},
                    {
                        key: 'invitedCode', title: this.$t('common.cz'), render: (h, params) => {
                            return h('Button', {
                                props: {type: 'primary', size: 'small'},
                                on: {
                                    click: () => {
                                        util.setDialog(update, {
                                            item: this.data.username,
                                            okCallback: () => {
                                                this.getList();
                                            }
                                        });
                                    }
                                }
                            }, this.$t('invite.xgtjr'))
                        }
                    },
                ]
            }
        },
        created() {

        },
        methods: {
            getList() {
                if(this.data.username){
                    inviteApi.findUserInviteRecommend(this.data, res => {
                        this.$Message.success({content: res.msg});
                        res.data.myusername = this.data.username
                        this.tabData = [res.data]
                        console.log(this.tabData)
                    }, msg => {
                        this.$Message.error({content: msg});
                    });
                }else{
                    this.$Message.error({content: this.$t('common.bnwk')});
                }
            },
            historyList() {
                util.setDialog(history, {
                    makClose: false,
                    item: this.data.username,
                    okCallback: () => {
                        // this.getList();
                    }
                });
            },
            changePage(page){
                this.page = page
                this.getList()
            }
        }

    }
</script>

<style scoped>
    .cont {
        margin-top: 10px;
    }
</style>
