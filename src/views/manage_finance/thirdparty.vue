<template>
    <Row style="margin-top:10px;">
        <!--<Card>-->
        <!--<p slot="title">{{$t('exchange.bzcztj')}}</p>-->
        <!--<Table ref="test2" :columns="columns1" :data="data1"></Table>-->
        <!--<Page :current="curPage1" :total="total1" @on-change="changePage1"-->
        <!--:page-size="size" style="text-align:center;margin-top:20px;"></Page>-->
        <!--</Card>-->
        <Card style="margin-top: 10px">
            <p slot="title">
                {{$t('exchange.dsfczlb')}}
                <Button type="primary" @click="downloadList()">{{$t('systemlog.dc')}}</Button>
            </p>
            <row class="selWp">
                <Col :md='8' :lg='6'>
                <label>{{$t('common.bz')}}：</label>
                <Select v-model="formData.symbol" style="width: 154px;" :clearable="true">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option v-for="item in symbolList" :value="item.symbol" :key="item.symbol">{{ item.symbol }}</Option>
                </Select>
                </Col>
                <Col :md='8' :lg='6'>
                <label>{{$t('common.yhm')}}：</label>
                <Input v-model.trim="formData.username" clearable style="width: 154px;"
                :placeholder="$t('common.qsryhm')"></Input>
                </Col>
                <Col :md='8' :lg='6'>
                <label>{{$t('finance.hzid')}}：</label>
                <Input v-model.trim="formData.transferId" clearable style="width: 154px;"
                :placeholder="$t('finance.hzid')"></Input>
                </Col>
                <Col :md='8' :lg='6'>
                <label>{{$t('finance.zzlx')}}：</label>
                <Select v-model="formData.direction" style="width: 154px;">
                    <Option value="-1">{{$t('common.qb')}}</Option>
                    <Option value="0">{{$t('finance.fzz')}}</Option>
                    <Option value="1">{{$t('finance.zzcz')}}</Option>
                    <Option value="2">{{$t('finance.zztx')}}</Option>
                </Select>
                </Col>
                <Col :md='8' :lg='6'>
                <label>{{$t('finance.hzlx')}}：</label>
                <Select v-model="formData.transferType" style="width: 154px;">
                    <Option value="-1">{{$t('common.qb')}}</Option>
                    <Option value="0">{{$t('finance.zzhdtpwkzh')}}</Option>
                    <Option value="1">{{$t('finance.tpwkzhdzzh')}}</Option>
                    <Option value="2">{{$t('finance.tpsyff')}}</Option>
                    <Option value="3">{{$t('finance.wksyff')}}</Option>
                    <Option value="7">{{$t('finance.zfgkfptyy')}}</Option>
                    <Option value="8">{{$t('finance.kfpthz')}}</Option>
                    <Option value="9">{{$t('finance.ptzz')}}</Option>
                </Select>
                </Col>
                <Col :lg='12' :md='16'>
                <label>{{$t('common.cjsj')}}：</label>
                <DatePicker type="datetime" v-model="formData.createdStart" :placeholder="$t('common.kssj')"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 154px;"></DatePicker>
                <DatePicker type="datetime" v-model="formData.createdEnd" :placeholder="$t('common.jssj')"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 154px;"></DatePicker>
                </Col>
                <Col :md='3' :lg='3'>
                <Button type="primary" @click="curPage=1;getfindUser()">{{$t('common.cx')}}</Button>
                </Col>
            </row>
            <Table ref="test2" :columns="columns" :data="data"></Table>
            <Page :current="curPage" :total="total" @on-change="changePage"
                  :page-size="size" style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </Row>
</template>

<script>
    import financeApi from '../../api/finance';
    import currenyApi from '../../api/currency';
    import util from '../../libs/util';

    export default {
        data () {
            return {
                curPage: 1,
                total: 0,
                curPage1: 1,
                total1: 0,
                size: 10,
                columns: [
                    {title: this.$t('common.cjsj'), key: 'createdAt'},
                    {title: this.$t('finance.hzid'), key: 'transferId'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {title: this.$t('common.bz'), key: 'symbol'},
                    {title: this.$t('finance.zzlx'), key: 'direction',
                        render: (h, params) => {
                            return h('div', this.direction(params.row.direction));
                    }},
                    {title: this.$t('exchange.czsl'), key: 'quantity'},
                    {title: this.$t('finance.hzlx'), key: 'transferType',
                        render: (h, params) => {
                            return h('div', this.transferType(params.row.transferType));
                    }},
                    {
                        title: this.$t('common.zt'), key: 'status',
                        render: (h, params) => {
                            return h('div', this.state('' + params.row.status));
                        }
                    }
                ],
                columns1: [
                    {title: this.$t('common.bz'), key: 'symbol'},
                    {title: this.$t('finance.jrczyhs'), key: 'currentRechargeUserCount'},
                    {title: this.$t('finance.jrczbs'), key: 'currentRechargeCount'},
                    {title: this.$t('finance.jryczsl'), key: 'currentRechargeSum'},
                    {title: this.$t('finance.qrnczyhs'), key: 'rechargeUserCount7d'},
                    {title: this.$t('finance.qrnczbs'), key: 'rechargeCount7d'},
                    {title: this.$t('finance.qrnyczsl'), key: 'rechargeSum7d'},
                ],
                data: [],
                data1: [],
                symbolList: [],
                formData: {
                    username: '',
                    max: null,
                    min: null,
                    transferId: null,
                    direction: null,
                    transferType: null,
                    createdStart: null,
                    createdEnd: null,
                    symbol: '0'
                },
                amount: '0',
                downloadparmes: {}
            };
        },
        created () {
            this.getdataSymbol();
            this.getfindUser();
            // this.getStatisticList();
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolList = res;
                });
            },
            getStatisticList () {
                let data = {
                    page: this.curPage1,
                    size: this.size
                };
                financeApi.statisticList(data, (res, total) => {
                    this.data1 = res;
                    this.total1 = total;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            getfindUser () {
                switch (this.amount) {
                    case '1':
                        this.formData.min = null;
                        this.formData.max = 1;
                        break;
                    case '2':
                        this.formData.max = 1000;
                        this.formData.min = 1;
                        break;
                    case '3':
                        this.formData.max = 10000;
                        this.formData.min = 1000;
                        break;
                    case '4':
                        this.formData.min = 10000;
                        this.formData.max = null;
                        break;
                    case '0':
                        this.formData.max = null;
                        this.formData.min = null;
                        break;
                }
                let D = JSON.stringify(this.formData);
                let data = JSON.parse(D);
                if(!data.username){
                    delete data.username
                }
                if(!data.transferId){
                    delete data.transferId
                }
                if(data.direction === '-1' || data.direction == null){
                    delete data.direction
                }
                if(data.transferType === '-1' || data.transferType == null){
                    delete data.transferType
                }
                data.createdStart = data.createdStart ? util.dateToStr(new Date(data.createdStart)) : null;
                data.createdEnd = data.createdEnd ? util.dateToStr(new Date(data.createdEnd)) : null;
                data.symbol = data.symbol === '0' ? null : data.symbol;
                this.downloadparmes = JSON.parse(JSON.stringify(data));
                data.page = this.curPage;
                data.size = this.size;
                financeApi.virtualRechargeRecordList(data, (res, total) => {
                    this.total = total;
                    this.data = res;
                });
            },
            state (i) {
                switch (i) { // 1：进行中，2：已完成，3：已取消，4：已拒绝
                    case '1':
                        return this.$t('common.jxz');
                    case '2':
                        return this.$t('common.ywc');
                    case '3':
                        return this.$t('common.yqx');
                    case '4':
                        return this.$t('common.yjj');
                }
            },
            transferType(type) {
                // 0: 主账户到投票挖矿账户
                // 1：投票挖矿账户到主账户
                // 2：投票收益发放
                // 3：挖矿收益发放
                // 7：支付给开放平台应用
                // 8：开放平台划转
                // 9：普通转账
                let typeStr = { 
                    0: this.$t('finance.zzhdtpwkzh'),
                    1: this.$t('finance.tpwkzhdzzh'),
                    2: this.$t('finance.tpsyff'),
                    3: this.$t('finance.wksyff'),
                    7: this.$t('finance.zfgkfptyy'),
                    8: this.$t('finance.kfpthz'),
                    9: this.$t('finance.ptzz'),
                }
                return typeStr[type]
            },
            direction(dir){
                // 0：非自转，1：自转充值，2：自转提现
                let dirStr = { 
                    0: this.$t('finance.fzz'),
                    1: this.$t('finance.zzcz'),
                    2: this.$t('finance.zztx'),
                }
                return dirStr[dir]
            },
            changePage (page) {
                this.curPage = page;
                this.getfindUser();
            },
            changePage1 (page) {
                this.curPage1 = page;
                this.getfindUser();
            },
            // downloadList () {
            //     util.outExl('api/bm/account/transfer/virtualRechargeRecordExport',this.downloadparmes);
            // },
            downloadList() {
                let arr = []
                for (let i in this.downloadparmes){
                    if(this.downloadparmes[i]!== null && this.downloadparmes[i]!== ''){
                        let v = this.downloadparmes[i]
                        arr.push(i+'='+v)
                    }
                }
                console.log(arr)
                window.location.href = `${util.baseURL}api/bm/account/transfer/virtualRechargeRecordExport?export=1&${arr.join('&')}`
            },
        }
    };
</script>

<style scoped lang='less'>
.selWp{
    margin-bottom: 10px;
    label{
        display: inline-block;
        width: 70px;
    }
}
.selWp>div{
    margin-bottom: 10px;
}
</style>
