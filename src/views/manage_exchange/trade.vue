<!-- 交易查询 -->
<template>
    <Card class="spax">
        <div class="spaxWp" v-if="spax">
            <div class="loader">
                <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" class="path"></circle></svg>
            </div>
        </div>
        <p slot="title">
            {{$t('nav.jycx')}}
            <Button type="primary" @click="download()">{{$t('systemlog.dc')}}</Button>
        </p>
        <p style="margin-bottom: 20px" class="input_p">
            <span>
                {{$t('exchange.jysc')}}：
                <Select v-model="formData.market" style="width: 140px">
                    <Option :value="0">{{$t('common.qb')}}</Option>
                    <Option v-for="item in marketList" :value="item.market" :key="item.market">{{ item.market }}</Option>
                </Select>
            </span>
            <span>
                {{$t('common.yhm')}}：
                <Input v-model.trim="formData.username" clearable style="width: 140px"
                        :placeholder="$t('common.qsryhm')"></Input>
            </span>
            <span>
                {{$t('exchange.yhwtid')}}：
                <Input v-model="formData.orderBookId" clearable style="width: 140px"
                        :placeholder="$t('exchange.yhwtid')"></Input>
            </span>
            <span>
                {{$t('exchange.cjsj')}}：
                <DatePicker type="datetime" v-model="formData.startTime" :placeholder="$t('common.kssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 160px"></DatePicker>
                <DatePicker type="datetime" v-model="formData.endTime" :placeholder="$t('common.jssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 160px"></DatePicker>
            </span>
            <span>
                {{$t('exchange.cjjg')}}：
                <Select v-model="formData.preDealPrice" style="width:60px">
                    <Option :value="0">{{$t('common.qb')}}</Option>
                    <Option :value="1">{{$t('exchange.xy')}}</Option>
                    <Option :value="2">{{$t('exchange.dy')}}</Option>
                    <Option :value="3">{{$t('exchange.dengy')}}</Option>
                </Select>
                <numberbox :min="0" v-model="formData.dealPrice" style="width: 100px;border:1px solid #dddee1"></numberbox>
            </span>
            <span>
                {{$t('exchange.cjl')}}：
                <Select v-model="formData.preDealAmount" style="width: 60px">
                    <Option :value="0">{{$t('common.qb')}}</Option>
                    <Option :value="1">{{$t('exchange.xy')}}</Option>
                    <Option :value="2">{{$t('exchange.dy')}}</Option>
                    <Option :value="3">{{$t('exchange.dengy')}}</Option>
                </Select>
                <numberbox v-model="formData.dealAmount" style="width: 100px;border:1px solid #dddee1"></numberbox>
            </span>
            <span> <Checkbox v-model="formData.excludeSpecialUser">{{$t('exchange.pctszh')}}</Checkbox></span>
            <Button type="primary" @click="curPage=1;getAuditing()">{{$t('common.cx')}}</Button>
        </p>
        <Table ref="table" :columns="columns" :data="datas"></Table>
        <Page :current="curPage" :total="total" @on-change="changePage" :page-size="size"
                style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import util from '../../libs/util';
    import currenyApi from '../../api/currency';
    import Numberbox from '../components/dialog/numberbox';

    export default {
        components: {Numberbox},
        data () {
            return {
                spax: false,
                curPage: 1,
                total: 0,
                size: 10,
                columns: [
                    {key: 'orderBookLogId', title: this.$t('common.jyid')},
                    {key: 'username', title: this.$t('common.yhm')},
                    {key: 'orderBookId', title: this.$t('exchange.yhwtid')},
                    {key: 'reciprocalUsername', title: this.$t('exchange.dsf')},
                    {key: '', title: this.$t('exchange.dswtid')},
                    {key: 'market', title: this.$t('exchange.jysc')},
                    {key: 'direction', title: this.$t('exchange.fx'),render: (h,params)=>{
                        return h('span', params.row.direction&&(params.row.direction==1?this.$t('exchange.m1'):this.$t('exchange.m4')))
                    }},
                    {key: 'dealPrice', title: this.$t('exchange.cjjg')},
                    {key: 'dealAmount', title: this.$t('exchange.cjl')},
                    {key: 'dealCurrency', title: this.$t('exchange.cjje')},
                    {key: 'fee', title: this.$t('exchange.yhsxf')},
                    {key: 'toSymbol', title: this.$t('exchange.sxfbz')},
                    {key: 'dealAmountUsd', title: this.$t('exchange.fbmyje')},
                    {key: 'dealTime', title: this.$t('exchange.cjsj')}
                ],
                datas: [],
                formData: {
                    endTime: null,
                    startTime: null,
                    market: 0,
                    preDealAmount: 0,
                    preDealPrice: 0,
                    dealAmount: null,
                    dealPrice: null,
                    username: null,
                    orderBookId: null,
                    excludeSpecialUser: true
                },
                marketList: [],
                exportDocPrames: {}
            };
        },
        created () {
            this.getAuditing();
            this.getAllMarket();
        },
        methods: {
            getAllMarket () {
                currenyApi.findAllMarketList((res) => {
                    this.marketList = res;
                });
            },
            switchStaus (state) {// 全部成交、部分成交、撤销、部分成交余额较少被强制撤销
                switch (state) {
                    case 0:
                        return this.$t('finance.cx');
                    case 1:
                        return this.$t('exchange.qbcj');
                    case 2:
                        return this.$t('exchange.bfcj');
                    case 3:
                        return this.$t('common.wc');
                    case 4:
                        return this.$t('exchange.bfcjyejsbqzcx');
                }
            },
            getAuditing () {
                this.spax = true;
                let D = JSON.stringify(this.formData);
                let data = JSON.parse(D);
                data.startTime = data.startTime ? util.dateToStr(new Date(data.startTime)) : null;
                data.endTime = data.endTime ? util.dateToStr(new Date(data.endTime)) : null;
                data.market = data.market === 0 ? null : data.market;
                data.preDealAmount = data.preDealAmount === 0 ? null : data.preDealAmount;
                data.preDealPrice = data.preDealPrice === 0 ? null : data.preDealPrice;
                data.page = this.curPage;
                data.size = this.size;
                data.excludeSpecialUser = this.formData.excludeSpecialUser ? 1 : 0;
                this.exportDocPrames = data;
                currenyApi.getTransaction(data,
                    (res, total) => {
                        this.total = total;
                        this.datas = res;
                        this.spax = false;
                    });
            },
            changePage (page) {
                this.curPage = page;
                this.getAuditing();
            },
            download(){
                let data = ['export=1']
                for (let i in this.exportDocPrames) {
                    if(this.exportDocPrames[i]){
                        let v = this.exportDocPrames[i] ? this.exportDocPrames[i] : ''
                        data.push(i+'='+v)
                    }
                }
                window.location.href = `${util.baseURL}api/bm/bbManage/orderBookLogs/query?${data.join('&')}`
            },
            exportCsvData(){
                let data = JSON.parse(JSON.stringify(this.formData));
                let that = this;
                data.startTime = data.startTime ? util.dateToStr(new Date(data.startTime)) : null;
                data.endTime = data.endTime ? util.dateToStr(new Date(data.endTime)) : null;
                data.market = data.market === 0 ? null : data.market;
                data.preDealAmount = data.preDealAmount === 0 ? null : data.preDealAmount;
                data.preDealPrice = data.preDealPrice === 0 ? null : data.preDealPrice;
                data.page = 1;
                data.size = 1000;
                data.excludeSpecialUser = this.formData.excludeSpecialUser ? 1 : 0;
                console.table(data)
                for(let i in data){
                    if(data[i] == null){
                        delete data[i]
                    }
                }
                console.table(data)
                currenyApi.getTransaction(data,(res, total) => {
                    let dataExp = res;
                    dataExp.forEach(e => {
                        if(e.direction){
                            e.direction = e.direction == 1 ? this.$t('exchange.m1') : this.$t('exchange.m4')
                        }
                    });
                    that.$refs.table.exportCsv({
                        filename: that.$t('exchange.jycxbb'),
                        columns: that.columns,
                        data: dataExp
                    });
                });
            },
            
        }
    };
</script>

<style lang="less" scoped>
    .refresh {
        width: 49px;
        height: 24px;
        background: url(../../images/frsh.png) center/cover no-repeat;
        background-size: contain;
        cursor: pointer;
        color: #2d8cf0;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }

    .input_p {
        span {
            display: inline-block;
            margin: 10px 10px 0 0;
        }
    }

    .spaxWp{
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 1000;
        transform: translate(-50%,-50%);
        padding: 40px;
        box-shadow: 0 0 20px rgba(0,0,0,.1);
        background-color: #fff;
        border-radius: 10px;
        -webkit-animation: opacitys 0.3s;
        animation: opacitys 0.3s;
        
    }
    @keyframes opacitys{
        0%{opacity:0}
        100%{opacity:1}
    }
    .loader {
        width: 30px;
        height: 30px;
        position: relative;
        margin: 0 auto;
    }
    .circular {
        -webkit-animation: rotate 2s linear infinite;
        animation: rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    @keyframes rotate{
        to{-webkit-transform:rotate(1turn);
        transform:rotate(1turn)}
    }
    .path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
        animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
        stroke-linecap: round;
    }
    @keyframes dash{
        0%{stroke-dasharray:1,200;stroke-dashoffset:0}
        50%{stroke-dasharray:89,200;stroke-dashoffset:-35}
        to{stroke-dasharray:89,200;stroke-dashoffset:-124}
    }
    @keyframes color{
        0%,to{stroke:#d62d20}
        40%{stroke:#0057e7}
        66%{stroke:#008744}
        80%,90%{stroke:#ffa700}
    }
</style>
