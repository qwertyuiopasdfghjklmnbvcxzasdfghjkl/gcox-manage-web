<!-- 价格分片管理 -->
<template>
    <Row>
        <Col span="24">
            <Row>
                <Card>
                    <p slot="title">
                        <Col span="16">
                            {{$t('nav.m1m2')}}
                        </Col>
                    </p>
                    <p style="margin-bottom: 20px">
                        {{$t('common.bz')}}：
                        <Select style="width:200px" v-model="symbol">
                            <Option :value="0">{{$t('common.qb')}}</Option>
                            <Option v-for="data in sumbolList" :value="data.name">{{data.name}}</Option>
                        </Select>
                        {{$t('common.yhm')}}
                        <Input v-model="value" style="width: 200px"></Input>
                        <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                    </p>
                    <Table :columns="columns" :data="data" style="margin-top: 20px;"></Table>
                    <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                          style="text-align:center;margin-top:20px;"></Page>
                </Card>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import util from '../../libs/util';
    import currencyApi from '../../api/currency';
    import update from './buy-sell/update'

    export default {
        data () {
            return {
                page: 1,
                size: 10,
                total: 0,
                symbol: 0,
                sumbolList: [],
                data:[],
                value:null,
                columns: [
                    {title: 'ID', key: 'sectionId'},
                    {title: this.$t('common.yhm'), key: 'market'},
                    {title: this.$t('common.bz'), key: 'amplitudeRate'},
                    {title: this.$t('exchange.ygm'), key: 'changeAmount'},
                    {title: this.$t('exchange.ymc'), key: 'changeRate'},
                    {title: this.$t('exchange.kmed'), key: 'interval'},
                    {title: this.$t('common.gxsj'), key: 'startAt'},
                    {
                        title: this.$t('common.cz'), key: 'publicLinkId', render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {marginRight: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(update,
                                                {
                                                    item: params.row,
                                                    okCallback: () => {
                                                        this.getList();
                                                    }
                                                }
                                            )
                                        }
                                    }
                                }, this.$t('common.xg'))
                            ]);
                        }
                    }
                ],
            };
        },
        created () {
            this.getList();
            this.getAll();
            this.getAllMarket();
        },
        methods: {
            getAll () {
                this.sumbolList = JSON.parse(window.localStorage.symbolTypes);
            },
            getList () {
                let data = {
                    page: this.page,
                    pageSize: this.size,
                    symbol: this.symbol === 0 ? null : this.symbol
                };
                currencyApi.sectionPriceList(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage (page) {
                this.page = page;
                this.getList();
            }
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

    .ivu-table-sort i {
        display: none;
    }

    .ivu-table-cell .ivu-table-sort i:first-child {
        display: none;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }
</style>
