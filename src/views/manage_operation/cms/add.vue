<template>
    <Card class="cont">
        <p slot="title">
            {{vm.$t('operation.xinzwz')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="formItem" :model="form" :rules="ruleInline" :label-width="100">
                <FormItem :label="vm.$t('operation.ssyjmk')" prop="firstLevel">
                    <Select v-model="form.firstLevel">
                        <Option :value="1">{{vm.$t('operation.ggjzx')}}</Option>
                        <Option :value="2">{{vm.$t('operation.yjnr')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('operation.ssejmk')" prop="secondLevel">
                    <Select v-model="form.secondLevel">
                        <Option :value="1">{{vm.$t('operation.gg')}}</Option>
                        <Option :value="2">{{vm.$t('operation.zx')}}</Option>
                        <Option :value="3">{{vm.$t('operation.gywm')}}</Option>
                        <Option :value="4">{{vm.$t('operation.jy')}}</Option>
                        <Option :value="5">{{vm.$t('operation.bzzx')}}</Option>
                        <Option :value="6">{{vm.$t('operation.tksm')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('operation.zwbt')" prop="titleCn">
                    <Input v-model="form.titleCn" :max="100"></Input>
                </FormItem>
                <FormItem :label="vm.$t('operation.ywbt')" prop="titleEn">
                    <Input v-model="form.titleEn" :max="100"></Input>
                </FormItem>
                <FormItem :label="vm.$t('operation.zwzw')" prop="bodyCn">
                    <wangeditor :catchData="bodyCnhData"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('operation.ywzw')" prop="bodyEn">
                    <wangeditor :catchData="bodyEnData"></wangeditor>
                </FormItem>
                <FormItem :label="vm.$t('common.zt')" prop="state">
                    <Select v-model="form.state">
                        <Option :value="0">{{vm.$t('operation.wfb')}}</Option>
                        <Option :value="1">{{vm.$t('operation.yfb')}}</Option>
                    </Select>
                </FormItem>
                <div class="btn">
                    <Button type="primary" @click="submit()">{{vm.$t('common.tj')}}</Button>
                </div>
            </Form>
        </div>
    </Card>
</template>

<script>
    import wangeditor from '../../my_components/wangeditor/wangeditor'
    import extendApi from '../../../api/extend'
    export default {
        data(){
            const vm = window.vm
            return{
                vm: vm,
                form: {
                    firstLevel: 1,
                    secondLevel: 1,
                    titleCn: null,
                    titleEn: null,
                    bodyCn: null,
                    bodyEn: null,
                    state: 0,
                },
                ruleInline: {
                    firstLevel: [
                        {required: true}
                        ],
                    secondLevel: [
                        {required: true}
                    ],
                    titleCn: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.zwbt'), trigger: 'blur'}
                    ],
                    titleEn: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.ywbt'), trigger: 'blur'}
                    ],
                    bodyCn: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.zwzw'),trigger: 'blur'}
                    ],
                    bodyEn: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.ywzw'),trigger: 'blur'}
                    ],
                    state: [
                        {required: true}
                    ],
                }
            }
        },
        components:{
            wangeditor
        },
        methods:{
            closeDialog(){
                this.$emit('removeDialog')
            },
            bodyCnhData(data){
                this.form.bodyCn = data
            },
            bodyEnData(data){
                this.form.bodyEn = data
            },
            submit(){
                let form = this.$refs.formItem;
                form.validate((valid) => {
                    if(valid){
                        extendApi.addCms(this.form,res=>{
                            this.$Message.success({content: this.vm.$t('common.tjcg')});
                            this.$emit('okCallback');
                            this.$emit('removeDialog');
                            },msg=>{
                            this.$Message.error({content: msg});
                            }
                        )
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
.cont{
    width: 1000px;
}
    .btn{
        margin: 10px auto;
        text-align: center;
    }
</style>
