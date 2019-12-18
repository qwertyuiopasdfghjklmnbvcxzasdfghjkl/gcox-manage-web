<template>
    <Card>
        <p slot="title">
            {{$t('invite.yqxxcx')}}
        </p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="formData.username" @keyup.enter.native="page=1;getInfo()" style="width: 200px"></Input></span>
                <span style="margin-left:20px;">{{$t('common.yqm')}}： <Input v-model="formData.myInvitationCode" @keyup.enter.native="getInfo()" style="width: 200px"></Input></span>
                <Button type="primary" @click="page=1;getInfo()">{{$t('common.cx')}}</Button>
            </p>
            <div class="cont">
                <p><span>{{$t('common.yhm')}}：</span>{{data.username}}</p>
                <p><span>{{$t('common.yqm')}}：</span>{{data.myInvitationCode}}</p>
                <p><span>{{$t('invite.yqjl')}}：</span>{{data.awardHasGiven == 1?this.$t('invite.yff'):this.$t('invite.wff')}}</p>
                <p><span>{{$t('invite.yqrs')}}：</span>{{data.countm}}</p>
                <p>
                    <span>{{$t('invite.yqls')}}：</span>
                </p>
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :pageSize="pageSize" :total="total" @on-change="changePage"
                    style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    export default {
        name: "info",
        data() {
            return {
                data: {
                    username: null,
                    myInvitationCode: null,
                },
                formData:{
                    username: null,
                    myInvitationCode: null,
                },
                pageSize: 10,
                page: 1,
                total: 0,
                tabData: [],
                columns: [
                    {
                        title: this.$t('common.zh'),
                        key: 'username'
                    },
                    {
                        title: this.$t('exchange.zcsj'),
                        key: 'createdAt'
                    },
                    {
                        title: this.$t('invite.yqzt'),
                        key: 'isInvited',render: (h, params) => {
							return h('span', params.row.isInvited == 1?this.$t('invite.yyq'):this.$t('invite.wyq'))
						}
                    },
                    {
                        title: this.$t('invite.yqjl'),
                        key: 'awardHasGiven',render: (h, params) => {
							return h('span', params.row.awardHasGiven == 1?this.$t('invite.yff'):this.$t('invite.wff'))
						}
                    }
                ]
            }
        },
        created() {
            // this.getInfo();
            // this.getHistory();
        },
        methods: {
            getInfo() { //邀请信息查询
                this.tabData = []
                inviteApi.findUserInviteInfo(this.formData, res => {
                    this.data = res.data
                    this.getList()
                }, msg => {
                    this.$Message.error({content: msg});
                });
                
            },
            getList() { //信息查询
                inviteApi.findUserInvite(this.pageSize, this.page, this.formData, res => {
                    this.tabData = res.data
                    this.total = res.total
                })
            },
            changePage(page){
                this.page = page
                this.getList()
            }
        }
    }
</script>

<style scoped lang="less">
    .cont {
        margin-top: 10px;

        p {
            padding: 10px 0;
        }
    }
</style>
