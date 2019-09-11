<template>
    <div class="box">
        <Form ref="form" :model="form" :rules="ruleInline" :label-width="180" style="margin:0 20px;">
            <div class="law">
                <FormItem :label="vm.$t('ieo.xmmc')" prop="projectName">
                    <Input v-model="form.projectName" :maxlength="32" class="w1"></Input>
                </FormItem>

                <FormItem :label="vm.$t('common.kssj')" prop="startTime">
                    <DatePicker type="datetime"
                                class="w1"
                                v-model="form.startTime"
                                :placeholder="vm.$t('common.kssj')"
                                format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmmcyw')" prop="projectNameEn">
                    <Input v-model="form.projectNameEn" :maxlength="32" class="w1"></Input>
                </FormItem>

                <FormItem :label="vm.$t('ieo.jzsj')" prop="endTime">
                    <DatePicker type="datetime"
                                class="w1"
                                v-model="form.endTime"
                                :placeholder="vm.$t('ieo.jzsj')"
                                format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                </FormItem>
                <FormItem prop="projectSymbol" :label="vm.$t('common.bzdh')">
                    <label class="green_title">{{vm.$t('common.bzdh')}}</label>
                    <Input v-model="form.projectSymbol" :maxlength="32" class="w1"></Input>
                </FormItem>

                <FormItem :label="vm.$t('ieo.kksj')" prop="paidTime">
                    <DatePicker type="datetime"
                                class="w1"
                                v-model="form.paidTime"
                                :placeholder="vm.$t('ieo.kksj')"
                                format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                </FormItem>
                <FormItem :label="vm.$t('ieo.bzlogo')" prop="logoFile">
                    <span v-if="cont"><img :src="utils.baseURL+cont.projectLogo" width="40" height="40"></span>
                    <input type="file" ref="logoFiles" name="logoFile" class="w1" @change="getImg()">
                </FormItem>

                <FormItem :label="vm.$t('ieo.fbsj')" prop="releaseTime">
                    <DatePicker type="datetime"
                                class="w1"
                                v-model="form.releaseTime"
                                :placeholder="vm.$t('ieo.fbsj')"
                                format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmtp')" prop="thumbFile">
                    <span v-if="cont"><img :src="utils.baseURL+cont.projectThumb" width="40" height="40"></span>
                    <input type="file" ref="thumbFile" name="thumbFile" class="w1" @change="getThumImg()">
                </FormItem>
                <FormItem></FormItem>
                <FormItem :label="vm.$t('ieo.xmjj')" prop="projectProfile">
                    <Input v-model="form.projectProfile" class="w1" type="textarea" :maxlength="255"></Input>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmjjyw')" prop="projectProfileEn">
                    <Input v-model="form.projectProfileEn" class="w1" type="textarea" :maxlength="800"></Input>
                </FormItem>

            </div>


            <FormItem :label="vm.$t('ieo.fxsl')" prop="totalIssue">
                <numberbox class="number_input w1" v-model="form.totalIssue"></numberbox>
                <Tag type="border" color="green" v-if="form.projectSymbol">{{form.projectSymbol}}</Tag>
            </FormItem>
            <FormItem prop="priceSymbol">
                <label class="red_title"><i
                        class="red">* </i>{{vm.$t('ieo.xsd')}}<span>{{vm.$t('ieo.jjbz')}}</span></label>
                <Select v-model="form.priceSymbol" class="w1">
                    <Option v-for="item in symbolList"
                            :value="item.symbol"
                            :key="item.symbol">
                        {{ item.symbol }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="vm.$t('ieo.fxjghbz')" prop="issuePrice">
                <b style="font-size: 20px">1</b>
                <Tag type="border" color="red" v-if="form.priceSymbol">{{form.priceSymbol}}</Tag>
                <b>=</b>
                <numberbox class="number_input w2" v-model="form.issuePrice"></numberbox>
                <Tag type="border" color="green" v-if="form.projectSymbol">{{form.projectSymbol}}</Tag>
            </FormItem>
            <FormItem :label="vm.$t('ieo.mjmbhzb')" prop="totalRaised">
                <numberbox class="number_input w1" v-model="form.totalRaised"></numberbox>
                <Tag type="border" color="red" v-if="form.priceSymbol">{{form.priceSymbol}}</Tag>
            </FormItem>
            <FormItem :label="vm.$t('ieo.zfs')" prop="totalSubscription">
                <numberbox class="number_input w1" :accuracy="0" v-model="form.totalSubscription"></numberbox>
            </FormItem>
            <FormItem :label="vm.$t('ieo.mfjghbz')" prop="subscriptionPrice">
                <numberbox class="number_input w1" v-model="form.subscriptionPrice"></numberbox>
                <Tag type="border" color="red" v-if="form.priceSymbol">{{form.priceSymbol}}</Tag>
            </FormItem>
            <FormItem :label="vm.$t('ieo.mfdbsl')" prop="oneSymbolCount">
                <numberbox class="number_input w1" v-model="form.oneSymbolCount"></numberbox>
                <Tag type="border" color="green" v-if="form.projectSymbol">{{form.projectSymbol}}</Tag>
            </FormItem>
            <FormItem :label="vm.$t('ieo.dfbz')" class="tab" prop="paymentConfigs">
                <div class="symbol-tab">
                    <p>
                        <span>{{vm.$t('operation.bh')}}</span>
                        <span>{{vm.$t('common.bz')}}</span>
                        <span>{{vm.$t('ieo.mfsl')}}</span>
                        <span>{{vm.$t('common.cz')}}</span>
                    </p>
                    <p v-for="(item,index) in form.paymentConfigs">
                        <span>{{index+1}}</span>
                        <span>{{item.symbol}}</span>
                        <span>{{item.symbolCount}}</span>
                        <span>
                            <Button @click="edit(index)" type="primary" size="small">{{vm.$t('ieo.bj')}}</Button>
                            <Button @click="delect(index,item.symbol)" type="warning" size="small">{{vm.$t('common.sc')}}</Button>
                        </span>
                    </p>
                </div>
                <Button class="btn1" icon="plus-round" @click="add()">{{vm.$t('common.tj')}}</Button>
            </FormItem>
            <div>
                <p class="title1"><span class="red">*</span>{{vm.$t('ieo.rgxz')}}：</p>
                <div class="">
                    <FormItem prop="needKyc">
                        <Checkbox v-model="needKyc">{{vm.$t('ieo.yhsfxykyc')}}</Checkbox>
                    </FormItem>
                    <div>
                        <FormItem prop="subscriptionLimit">
                            <RadioGroup v-model="form.subscriptionLimit">
                                <Radio :label="0">{{vm.$t('ieo.yhsfznsgyc')}}</Radio>
                                <Radio :label="1">{{vm.$t('ieo.yhsfznmgbzsgyc')}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                </div>

                <FormItem :label="vm.$t('ieo.grrgfszsx')" prop="subscriptionQuantityLimit">
                    <numberbox class="number_input w1" :accuracy="0"
                               v-model="form.subscriptionQuantityLimit"></numberbox>
                </FormItem>
                <FormItem :label="vm.$t('ieo.grmcrgfsxx')" prop="subscriptionLeast">
                    <numberbox class="number_input w1" :accuracy="0" v-model="form.subscriptionLeast"></numberbox>
                </FormItem>
            </div>
            <p><br><br></p>
            <FormItem :label="vm.$t('ieo.xmffbsbzh')" prop="projectAccount">
                <Input v-model="form.projectAccount" :maxlength="120" class="w1"></Input>
            </FormItem>
            <div class="law">
                <FormItem :label="vm.$t('ieo.rgxuzhi')" prop="subscriptionNotice">
                    <wangeditor :catchData="noticeData" :content="form.subscriptionNotice"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('ieo.rgxuzhiyw')" prop="subscriptionNoticeEn">
                    <wangeditor :catchData="noticeDataen" :content="form.subscriptionNoticeEn"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmgz')" prop="participationRules">
                    <wangeditor :catchData="ruleData" :content="form.participationRules"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmgzyw')" prop="participationRulesEn">
                    <wangeditor :catchData="ruleDataEn" :content="form.participationRulesEn"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmxq')" prop="projectDetail">
                    <div id="father">
                        <wangeditor :catchData="catchData" :content="form.projectDetail"></wangeditor>
                    </div>
                </FormItem>
                <FormItem :label="vm.$t('ieo.xmxqyw')" prop="projectDetailEn">
                    <div id="fatheren">
                        <wangeditor :catchData="catchDataen" :content="form.projectDetailEn"></wangeditor>
                    </div>
                </FormItem>
            </div>


            <FormItem>
                <Button type="primary" v-if="cont" class="btn" size="large" @click="updata()">
                    {{vm.$t('common.xg')}}
                </Button>
                <Button type="primary" v-else class="btn" size="large" @click=" submit()">
                    {{vm.$t('finance.chuangj')}}
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Numberbox from '../../components/dialog/numberbox';
    import wangeditor from '../../my_components/wangeditor/wangeditor';
    import currenyApi from '../../../api/currency';
    import ieoApi from '../../../api/ieo';
    import util from '../../../libs/util';
    import add from './addSymbol';

    export default {
        name: 'project',
        props: ['cont'],
        components: {Numberbox, wangeditor},
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                symbolList: [],
                needKyc: false,
                utils: util,
                paymentConfigs:[],
                form: {
                    projectName: null,
                    projectNameEn: null,
                    startTime: null,
                    projectSymbol: null,
                    endTime: null,
                    logoFile: null,
                    thumbFile: null,
                    paidTime: null,
                    projectProfile: null,
                    projectProfileEn: null,
                    releaseTime: null,
                    totalIssue: null,
                    priceSymbol: null,
                    issuePrice: null,
                    totalRaised: null,
                    totalSubscription: null,
                    subscriptionPrice: null,
                    oneSymbolCount: null,
                    paymentConfigs: [],
                    paymentConfig: null,
                    needKyc: 0,
                    subscriptionLimit: null,
                    subscriptionQuantityLimit: null,
                    subscriptionLeast: null,
                    projectAccount: null,
                    subscriptionNotice: null,
                    subscriptionNoticeEn: null,
                    participationRules: null,
                    participationRulesEn: null,
                    projectDetail: null,
                    projectDetailEn: null,
                },
                ruleInline: {
                    projectName: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmmc'), trigger: 'blur'}
                    ],
                    projectNameEn: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmmcyw'), trigger: 'blur'}
                    ],
                    startTime: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('common.kssj')}
                    ],
                    projectSymbol: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('common.bzdh'), trigger: 'blur'}
                    ],
                    endTime: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.jzsj')}
                    ],
                    logoFile: [
                        {required: !this.cont, message: vm.$t('common.qsr') + vm.$t('ieo.bzlogo')}
                    ],
                    thumbFile: [
                        {required: !this.cont, message: vm.$t('common.qsr') + vm.$t('ieo.xmtp')}
                    ],
                    paidTime: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.kksj')}
                    ],
                    projectProfile: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmjj'), trigger: 'blur'}
                    ],
                    projectProfileEn: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmjjyw'), trigger: 'blur'}
                    ],
                    releaseTime: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.fbsj')}
                    ],
                    totalIssue: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.fxsl')}
                    ],
                    priceSymbol: [
                        {
                            required: true,
                            message: vm.$t('common.qsr') + vm.$t('ieo.xsd') + vm.$t('ieo.jjbz'),
                            trigger: 'blur'
                        }
                    ],
                    issuePrice: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.fxjghbz')}
                    ],
                    totalRaised: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.mjmbhzb')}
                    ],
                    totalSubscription: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.zfs')}
                    ],
                    subscriptionPrice: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.mfjghbz')}
                    ],
                    oneSymbolCount: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.mfdbsl')}
                    ],
                    paymentConfigs: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.dfbz')}
                    ],
                    needKyc: [
                        {required: false}
                    ],
                    subscriptionLimit: [
                        {required: true, message: vm.$t('common.qxz')}
                    ],
                    subscriptionQuantityLimit: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.grrgfszsx')}
                    ],
                    subscriptionLeast: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.grmcrgfsxx')}
                    ],
                    projectAccount: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmffbsbzh'), trigger: 'blur'}
                    ],
                    subscriptionNotice: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.rgxuzhi'), trigger: 'blur'}
                    ],
                    subscriptionNoticeEn: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.rgxuzhiyw'), trigger: 'blur'}
                    ],
                    participationRules: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmgz'), trigger: 'blur'}
                    ],
                    participationRulesEn: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmgzyw'), trigger: 'blur'}
                    ],
                    projectDetail: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmxq'), trigger: 'blur'}
                    ],
                    projectDetailEn: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('ieo.xmxqyw'), trigger: 'blur'}
                    ],
                },
                datas: [{orderId: 123, orderId2: 'eft'}],
            };
        },
        watch: {
            needKyc () {
                if (this.needKyc) {
                    this.form.needKyc = 1;
                } else {
                    this.form.needKyc = 0;
                }
            }
        },
        created () {
            this.getdataSymbol();
            if (this.cont) {
                this.form = this.cont;
                this.form.paymentConfigs = JSON.parse(this.form.paymentConfig);
                this.needKyc = this.form.needKyc === 1;
            }
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolList = res;

                    this.form.paymentConfigs.filter(data=>{
                        this.symbolList.map((next,i)=>{
                            if(next.symbol === data.symbol){
                                this.symbolList[i].disable = true
                            }
                        })
                    })
                });
            },
            submit () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.projectDetail = this.form.projectDetail.toString();
                        this.form.paymentConfig = JSON.stringify(this.form.paymentConfigs);
                        this.form.startTime = util.dateToStr(new Date(this.form.startTime))
                        this.form.endTime = util.dateToStr(new Date(this.form.endTime))
                        this.form.paidTime = util.dateToStr(new Date(this.form.paidTime))
                        this.form.releaseTime = util.dateToStr(new Date(this.form.releaseTime))
                        let formData = new FormData();
                        let i;
                        for (i in this.form) {
                            formData.append(i, this.form[i]);
                        }
                        console.log(this.form)
                        ieoApi.addProject(formData, (res) => {
                            this.$Message.success({content: this.vm.$t('common.tjcg')});
                            this.$router.push({name: 'ieo_project_index'});
                        }, (msg) => {
                            this.$Message.error({content: msg});
                        });
                    }
                });
            },
            updata () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        delete this.form.state;
                        delete this.form.updatedAt;
                        delete this.form.createdAt;
                        delete this.form.projectLogo;
                        this.form.projectDetail = this.form.projectDetail.toString();
                        this.form.participationRules = this.form.participationRules.toString();
                        this.form.subscriptionNotice = this.form.subscriptionNotice.toString();
                        this.form.projectDetailEn = this.form.projectDetailEn.toString();
                        this.form.participationRulesEn = this.form.participationRulesEn.toString();
                        this.form.subscriptionNoticeEn = this.form.subscriptionNoticeEn.toString();
                        this.form.paymentConfig = JSON.stringify(this.form.paymentConfigs);

                        this.form.startTime = util.dateToStr(new Date(this.form.startTime))
                        this.form.endTime = util.dateToStr(new Date(this.form.endTime))
                        this.form.paidTime = util.dateToStr(new Date(this.form.paidTime))
                        this.form.releaseTime = util.dateToStr(new Date(this.form.releaseTime))

                        let formData = new FormData();
                        let i;
                        for (i in this.form) {
                            formData.append(i, this.form[i]);
                        }
                        console.log(this.form)
                        ieoApi.updataProject(formData, (res) => {
                            this.$Message.success({content: this.vm.$t('common.xgcg')});
                            this.$emit('updata');
                        }, (msg) => {
                            this.$Message.error({content: msg});
                        });
                    }
                });
            },
            catchData (value) {
                this.form.projectDetail = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            catchDataen (value) {
                this.form.projectDetailEn = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            ruleData (value) {
                this.form.participationRules = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            ruleDataEn (value) {
                this.form.participationRulesEn = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            noticeData (value) {
                this.form.subscriptionNotice = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            noticeDataen (value) {
                this.form.subscriptionNoticeEn = value;      //在这里接受子组件传过来的参数，赋值给data里的参数
            },
            add () {
                util.setDialog(add, {
                    symbolList: this.symbolList,
                    okCallback: (res) => {
                        this.form.paymentConfigs.push(res);
                        this.$forceUpdate()
                        this.symbolList.map((next,i)=>{
                            if(next.symbol === res.symbol){
                                this.symbolList[i].disable = true
                            }
                        })
                        console.log(this.form.paymentConfigs)
                    }
                });
            },
            getImg () {
                this.form.logoFile = this.$refs.logoFiles.files[0];
            },
            getThumImg () {
                this.form.thumbFile = this.$refs.thumbFile.files[0];
            },
            edit(i){
                util.setDialog(add, {
                    symbolList: this.symbolList,
                    item: this.form.paymentConfigs[i],
                    okCallback: (res) => {
                        this.form.paymentConfigs[i] = res;
                        this.$forceUpdate()
                    }
                });
            },
            delect(i,symbol){
                this.form.paymentConfigs.splice(i, 1);
                this.symbolList.map((next,i)=>{
                    if(next.symbol === symbol){
                        this.symbolList[i].disable = false
                    }
                })
                this.$forceUpdate()
            }
        }
    };
</script>

<style scoped lang="less">
    @import "project";
    .symbol-tab{
        border: 10px solid #ededed;
        display: flex;
        flex-flow: column;
        p{
            border-bottom: 1px solid #ededed;
            display: flex;
            padding: 4px 0;
            span{
                flex: 1;
                padding-left: 10px;
            }
            &:first-child{
                background: #cdcdcd;
            }
        }
    }
</style>
