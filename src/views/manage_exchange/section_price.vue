<!-- 价格分片管理 -->
<template>
    <Row>
        <Col span="24">
            <Row>
                <Card>
                    <p slot="title">
                        <Col span="16">
                            {{$t('nav.jgfpgl')}}
                        </Col>
                        <Col span="8">
                            <Button type="primary" style="float:right;" @click="add()">{{$t('common.tj')}}</Button>
                        </Col>
                    </p>
                    <!--<p style="margin-bottom: 20px">-->
                        <!--{{$t('monitoring.gllx')}}：-->
                        <!--&lt;!&ndash;<Input v-model="value" style="width: 200px"></Input>&ndash;&gt;-->
                        <!--<Select style="width:200px" v-model="value">-->
                            <!--<Option v-for="data in datas" :value="data.name">{{data.name}}</Option>-->
                        <!--</Select>-->
                        <!--<Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>-->
                    <!--</p>-->
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
    import add from './section_price/add.vue';
    import currencyApi from '../../api/currency';

    export default {
        data () {
            return {
                page: 1,
                size: 10,
                total: 0,
                value: null,
                datas: [],
                columns: [
                    {title: 'ID', key: 'sectionId'},
                    {title: this.$t('exchange.scmc'), key: 'market'},
                    {title: this.$t('exchange.zfbfb'), key: 'amplitudeRate',
                        render:(h,params)=>{return h('span',params.row.amplitudeRate+'%')}
                        },
                    {title: this.$t('exchange.zfje'), key: 'changeAmount'},
                    {title: this.$t('exchange.zhangfbfb'), key: 'changeRate',
                        render:(h,params)=>{return h('span',params.row.changeRate+'%')}
                        },
                    // {title: this.$t('system.cjr'), key: 'creator'},
                    {title: this.$t('exchange.wtpl'), key: 'interval',
                        render:(h,params)=>{return h('span',params.row.interval+'/s')}
                        },
                    {title: this.$t('exchange.slfw'), key: 'quantityRange'},
                    {title: this.$t('common.kssj'), key: 'startAt'},
                    {title: this.$t('common.jssj'), key: 'endAt'},
                    {title: this.$t('common.zt'), key: 'status',
                        render:(h,params)=>{return h('span',params.row.interval === 1 ? this.$t('fund.qy'):this.$t('exchange.ty') )}
                        },
                    {
                        title: this.$t('common.cz'), key: 'publicLinkId', render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {marginRight: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(add,
                                                {
                                                    item: params.row,
                                                    state: 2,
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
                data: []
            };
        },
        watch: {
            data () {
                this.getAll();
            }
        },
        created () {
            this.getList();
            this.getAll();
        },
        methods: {
            getAll () {
                this.datas = JSON.parse(window.localStorage.symbolTypes);
            },
            getList () {
                let data = {
                    page: this.page,
                    pageSize: this.size,
                };
                currencyApi.sectionPriceList(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage (page) {
                this.page = page;
                this.getList();
            },
            add () {
                util.setDialog(add, {
                    okCallback: () => {
                        this.getList();
                    }
                });
            },
            deleteSymbol (id) {
                let data = {
                    publicLinkId: id
                };
                currencyApi.sectionPriceList(data, (res) => {
                    this.$Message.success({content: this.$t('common.tjcg')});
                    this.getList();
                }, (msg) => {
                    this.$Message.error(msg);
                });
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
