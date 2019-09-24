<template>
    <Card>
        <p slot="title">
            {{$t('invite.yqxxcx')}}
        </p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="name" style="width: 300px"></Input></span>
                <span>{{$t('common.yqm')}}： <Input v-model="code" style="width: 300px"></Input></span>
                <Button type="primary" @click="getInfo()">{{$t('common.cx')}}</Button>
            </p>
            <div class="cont">
                <p><span>{{$t('common.yhm')}}：</span>{{data.name}}</p>
                <p><span>{{$t('common.yqm')}}：</span>{{data.name}}</p>
                <p><span>{{$t('invite.yqjl')}}（ACM）：</span>{{data.name}}</p>
                <p><span>{{$t('invite.yqrs')}}：</span>{{data.name}}</p>
                <p>
                    <span>{{$t('invite.yqls')}}：</span>
                </p>
                <Table :columns="columns" :data="tabData"></Table>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "info",
        data() {
            return {
                name: null,
                code: null,
                data: {},
                tabData: [],
                columns: [
                    {
                        title: this.$t('common.zh'),
                        key: 'market'
                    },
                    {
                        title: this.$t('exchange.zcsj'),
                        key: 'market'
                    },
                    {
                        title: this.$t('invite.yqzt'),
                        key: 'market'
                    },
                    {
                        title: this.$t('invite.yqjl') + '（ACM）',
                        key: 'market'
                    }
                ]
            }
        },
        created() {

        },
        methods: {
            getInfo() {
            }
        }
    }
</script>

<style scoped lang="less">
    .cont {
        margin-top: 10px;

        p {
            padding: 10px 0;
        }
    }
</style>
