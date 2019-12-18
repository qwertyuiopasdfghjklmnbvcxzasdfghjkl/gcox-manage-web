<template>
    <Card>
        <p slot="title">{{$t('invite.yqgxcx')}}</p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model.trim="data.username" @keyup.enter.native="getInfo()" style="width: 150px"></Input></span>
                <span>{{$t('invite.xscj')}}： <Input v-model.trim="data.upLevel" style="width: 150px"></Input></span>
                <span>{{$t('invite.xxcj')}}： <Input v-model.trim="data.downLevel" style="width: 150px"></Input></span>
                <Button type="primary" @click="getInfo()">{{$t('common.cx')}}</Button>
                <Button type="primary" @click="downloadList()">{{$t('systemlog.dc')}}</Button>
            </p>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    import util from '../../libs/util';
    export default {
        name: "relation",
        data() {
            return {
                name: null,
                code: null,
                data: {
                    username: null,
                    upLevel: null,
                    downLevel: null
                },
                outData:{
                    username: null
                },
                page: 1,
                size: 10,
                total: 0,
                tabData: [],
                datas:[],
                columns:[
                    {key: 'levelSign',title: this.$t('invite.cj')},
                    {key: 'username',title: this.$t('common.yhm')},
                ],
                downloadparmes: {}
            }
        },
        created() {

        },
        methods: {
            getInfo(){
                let Data = JSON.stringify(this.data)
                let formData = JSON.parse(Data)
                this.downloadparmes = formData
                if(formData.username){
                    inviteApi.findUserInviteRecommendLevel(formData, res => {
                        this.$Message.success({content: res.msg});
                        // this.tabData = res.data
                        this.outData.username = res.data.username
                        this.datas = res.data
                        this.total = res.total
                        this.tabData = this.datas.slice(0, this.size)
                    }, msg => {
                        this.$Message.error({content: msg});
                    });    
                }else{
                    this.$Message.error({content: this.$t('common.bnwk')});
                }
            },
            // output(){
            //     if(this.data){
            //         inviteApi.exportInviteModifyRecordExcel(this.data, res => {
            //             this.$Message.success({content: res.msg});
            //         }, msg => {
            //             this.$Message.error({content: msg});
            //         });
            //     }else{
            //         this.$Message.error({content: this.$t('common.bnwk')});
            //     }
            // },
            downloadList() {
                let arr = []
                for (let i in this.downloadparmes){
                    if(this.downloadparmes[i]!== null){
                        let v = this.downloadparmes[i]
                        arr.push(i+'='+v)
                    }
                }
                // console.log(arr, this.downloadparmes)
                if(this.downloadparmes.username){
                    window.location.href = `${util.baseURL}api/bm/userInvite/exportInviteModifyRecordExcel?export=1&${arr.join('&')}`
                }else{
                    this.$Message.error({content: this.$t('common.bnwk')});
                }
            },
            changePage(page){
                this.page = page
                this.tabData = this.datas.slice(this.size*(page-1), this.size*page);
                // this.getInfo()
            },
        }

    }
</script>

<style scoped>
.cont{
    margin-top: 10px;
}
</style>
