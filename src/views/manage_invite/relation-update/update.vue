<template>
    <Card style="width: 400px;">
        <p slot="title">{{vm.$t('invite.xgtjr')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}：</span>
                <span>{{data.username}}</span>
            </p>
            <p>
                <span>{{vm.$t('exchange.tjryqm')}}：</span>
                <span><Input v-model="data.invitedCode" style="width: 150px;"></Input></span>
                <span><Button type="primary" @click="save()">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    export default {
        name: "update",
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                data: {
                    username: null,
                    invitedCode: null,
                }
            }
        },
        created() {
            this.data.username = this.item
        },
        methods: {
            save(){
                inviteApi.updateRecommend(this.data, res => {
                    this.$Message.success({content: res.msg});
                    this.$emit('okCallback');
                    this.closeDialog()
                }, msg => {
                    this.$Message.error({content: msg});
                });
            },
            closeDialog(){
                this.$emit('removeDialog');
            }
        }

    }
</script>

<style scoped>
.cont p{
    padding: 10px 0;
}
</style>
