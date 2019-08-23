<template>
    <Card style="width: 600px;">
        <p slot="title">
            {{vm.$t('common.xg')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Row style="margin:0 20px;">
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('common.bz')}}</Col>
                <Col span="6">{{item.market}}</Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('common.yhm')}}</Col>
                <Col span="6">{{item.market}}</Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('exchange.ygm')}}</Col>
                <Col span="6">{{item.market }}</Col>
                <Col span="6">
                    <input-number v-model="currencySymbol"></input-number>
                </Col>
                <Col span="6">
                    <Button type="primary" style="float:right;" @click="sumbit(data2)">{{vm.$t('common.bc')}}</Button>
                </Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('exchange.ymc')}}</Col>
                <Col span="6">{{item.market }}</Col>
                <Col span="6">
                    <input-number v-model="currencySymbol"></input-number>
                </Col>
                <Col span="6">
                    <Button type="primary" style="float:right;" @click="sumbit(data2)">{{vm.$t('common.bc')}}</Button>
                </Col>
            </Row>
        </Row>
    </Card>
</template>

<script>
    export default {
        props:['item'],
        data(){
            const vm = window.vm
            return{
                vm: vm,
                currencySymbol: null
            }
        },
        methods:{
            sumbit(data){
                console.log(data)
            },
            closeDialog(){
                this.$emit('removeDialog')
            }
        }
    }
</script>

<style scoped>

</style>
