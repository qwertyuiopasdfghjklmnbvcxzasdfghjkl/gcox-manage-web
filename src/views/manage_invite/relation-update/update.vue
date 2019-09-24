<template>
    <Card style="width: 800px;">
        <p slot="title">{{vm.$t('invite.xgtjr')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}：</span>
                <span>{{item}}</span>
            </p>
            <p>
                <span>{{vm.$t('exchange.tjryqm')}}：</span>
                <span>{{item}}</span>
                <span><Input v-model="code" style="width: 260px;"></Input></span>
                <span><Button type="primary" @click="save()">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "update",
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                code: null
            }
        },
        created() {

        },
        methods: {
            closeDialog(){
                this.$emit('removeDialog');
            },
            save(){}
        }

    }
</script>

<style scoped>
.cont p{
    padding: 10px 0;
}
</style>
