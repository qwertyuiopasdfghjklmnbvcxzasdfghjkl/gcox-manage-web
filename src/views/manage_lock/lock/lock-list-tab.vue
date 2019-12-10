<template>
    <div>
        <Table :columns="column" :data="data"></Table>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            const vm = window.vm
            return {
                vm: vm,
                column: []
            }
        },
        created() {
            this.column = [
                {key: 'minerId', title: this.vm.$t('lock.scjlid')},
                {key: 'username', title: this.vm.$t('common.yhm')},
                {key: 'symbol', title: this.vm.$t('common.bz')},
                {key: 'amount', title: this.vm.$t('lock.scsl')},
                {
                    key: 'type', title: this.vm.$t('lock.sclx'),
                    render: (h, params) => {
                        return h('div', this.sw(params.row.type))
                    }
                },
                {key: 'remainAmount', title: this.vm.$t('lock.sy')},
                {
                    key: 'status', title: this.vm.$t('common.zt'),
                    render: (h, params) => {
                        let color = {
                            //0未完成，1为已完成，-1为已失效
                            '0': 'red',
                            '1': 'green',
                            '-1': '#de500c'
                        }
                        return h('div', {style: {color: color[params.row.status]}},this.state(params.row.status))
                    }
                },
                {key: 'createAt', title: this.vm.$t('common.cjsj')},
            ]
        },
        methods: {
            sw(id) { // 1用户锁仓，2 锁仓系统奖励 ， 3 注册奖励， 4 推荐新用户奖励， 5 推荐用户锁仓奖励 ,
                let state = {
                    1: this.vm.$t('exchange.yhsc'),
                    2: this.vm.$t('exchange.scxtjl'),
                    3: this.vm.$t('exchange.zhucejl'),
                    4: this.vm.$t('exchange.tjxyhjl'),
                    5: this.vm.$t('exchange.tjyhscjl'),
                }
                return state[id]
            },
            state(id) { //0未完成，1为已完成，-1为已失效
                let state = {
                    '-1': this.vm.$t('lock.ysx'),
                    '0': this.vm.$t('lock.wwc'),
                    '1': this.vm.$t('lock.ywc'),
                }
                return state[id]
            }
        }

    }
</script>

<style scoped>

</style>
