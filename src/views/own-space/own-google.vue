<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                {{$t('login.ggyzm')}}
            </p>
            <Row class="mb20">
                <Col span="20">
                    <b>{{$t('exchange.bd')}}{{$t('login.ggyzm')}}</b>
                </Col>
                <Col span="4">
                    <b v-if="googleStatus&&googleStatus.googleAuthEnable==1" class="ml15">{{$t('exchange.ybd')}}</b>
                    <b v-else class="ml15">{{$t('exchange.wbd')}}</b>
                </Col>
            </Row>
            <div class="gCode" v-if="!googleStatus||googleStatus.googleAuthEnable!=1" >
                <img :src="googleData.base64" alt="">
                <p><span>{{$t('login.ggyzmsy')}}： </span>{{googleData.secretKey}}</p>
            </div>
            <Row class="form">
                <Col span="20">
                    <Input @keyup.native.enter="bind" type="text" v-model="googleData.code" name="code" :placeholder="$t('common.qsr')+$t('login.ggyzm')"></Input>
                </Col>
                <Col span="4">
                    <Button class="ml15" type="primary" v-if="googleStatus&&googleStatus.googleAuthEnable==1" :loading="loading" @click="unbindGoogle()">{{$t('exchange.jb')}}</Button>
                    <Button class="ml15" type="primary" v-else :loading="loading" @click="bindGoogle()">{{$t('exchange.bd')}}</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import userApi from '@/api/user'
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            googleData:{
                base64:null,
                secretKey:null,
                code:null,
            },
            username: Cookies.get('username'),
            googleStatus:null,
            loading:false,
        };
    },
    methods: {
        init(){
            this.getIdentifyCode()
            this.getGoogleStatus()
        },
        getGoogleStatus(){
            userApi.getGoogleStatus(res=>{
                this.googleStatus = res.data
            })
        },
        getIdentifyCode () {
            let username = this.username
            userApi.getSecretKey(username,res=>{
                this.googleData.base64 = res.data.base64
                this.googleData.secretKey = res.data.secretKey
            })
        },
        bind(){
            this.googleStatus&&this.googleStatus.googleAuthEnable==1?this.unbindGoogle():this.bindGoogle()
        },
        bindGoogle(){
            this.loading = true
            let data = {
                bmSecretKey: this.googleData.secretKey,
                googleCode: this.googleData.code,
            }
            userApi.bindGoogle(data,res=>{
                this.loading = false
                if(res.msg){
                    this.$Message.success({content: res.msg});
                    this.init()
                    this.googleData.code = null
                }
            },error=>{
                this.loading = false
                this.$Message.error({content: error});
            })
        },
        unbindGoogle(){
            this.loading = true
            let data = {
                googleCode: this.googleData.code,
            }
            userApi.unbindGoogle(data,res=>{
                this.loading = false
                res.msg&&this.$Message.success({content: res.msg});
                this.init()
                this.googleData.code = null
            },error=>{
                this.loading = false
                this.$Message.error({content: error});
            })
        },
    },
    mounted () {
        this.init()
    }
};
</script>
<style lang="less" scoped>
.form{width: 400px;margin: 20px auto 50px;}
.gCode{
    text-align: center;
    img{
        width: 250px;
    }
}
.mb20{
    width: 400px;margin: 20px auto;
}
.ml15{
    margin-left: 15px;
}
</style>

