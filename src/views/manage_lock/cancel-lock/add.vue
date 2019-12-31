<template>
    <Card style="width: 500px;" class="statc">
        <p slot="title">
            {{this.item?vm.$t('common.xg'):vm.$t('lock.xzjs')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form ref="formItem" :model="data" :rules="ruleInline" :label-width="110" label-position="left">
            <FormItem :label="vm.$t('lock.mbscjlid')" prop="minerId">
                <p>
                    <Input v-model="data.minerId"></Input>
                </p>
            </FormItem>
            <FormItem :label="vm.$t('common.yhm')" prop="username">
                <p class="column">
                    <Input v-model="data.username"></Input>
                </p>
            </FormItem>
            <div class="btn">
                <Button @click="push()" type="primary" :loading="loading" >{{vm.$t('common.bc')}}</Button>
            </div>
        </Form>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    import lockApi from '@/api/lock';
    export default {
        name: "add",
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                loading: false,
                data: {
                    username: null,
                    minerId: null,
                },
                ruleInline: {}
            }
        },
        created() {
            if(this.item){
                this.data.mappingId = this.item.mappingId
                this.data.username = this.item.username
                this.data.minerId = this.item.minerId

            }else{
                this.ruleInline = {
                    username: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('common.yhm'), trigger: 'blur'},
                    ],
                    minerId: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('lock.mbscjlid'), trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            push() {
                if(!this.loading){
                    if (this.item) {
                        this.update()
                    } else {
                        this.add()
                    }
                }
            },
            add(){
                let form = this.$refs.formItem;
                form.validate((valid) => {
                    if (valid) {
                        this.loading = true
                        lockApi.insertCancelStake(this.data, res => {
                            this.$Message.success({content: res.msg});
                            this.$emit('okCallback');
                            this.closeDialog()
                        }, msg => {
                            this.$Message.error({content: msg});
                            this.loading = false
                        });
                    }
                })
            },
            update(){
                this.loading = true
                inviteApi.updateBindRecord(this.data, res => {
                    this.$Message.success({content: res.msg});
                    this.$emit('okCallback');
                    this.closeDialog()
                }, msg => {
                    this.$Message.error({content: msg});
                    this.loading = false
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
.cont .lab {
    display: inline-block;
    width: 100px;
    text-align: right
}
.cont .res{
    display: inline-block;
    width: 50px;
}
.btn{
    text-align: center;
    margin-top: 10px;
}
</style>
