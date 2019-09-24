<template>
    <Card>
        <p slot="title">{{$t('invite.yqgxcx')}}</p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="name" style="width: 300px"></Input></span>
                <span>{{$t('invite.xscj')}}： <Input v-model="code" style="width: 300px"></Input></span>
                <span>{{$t('invite.xxcj')}}： <Input v-model="code" style="width: 300px"></Input></span>
                <Button type="primary" @click="getInfo()">{{$t('common.cx')}}</Button>
                <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
            </p>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" @on-change="changePage"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "relation",
        data() {
            return {
                name: null,
                code: null,
                page: 1,
                total: 1,
                tabData: [],
                columns:[
                    {key: 'code',title: this.$t('invite.cj')},
                    {key: 'username',title: this.$t('common.yhm')},
                ]
            }
        },
        created() {

        },
        methods: {
            getInfo(){},
            output(){},
            changePage(){},
        }

    }
</script>

<style scoped>
.cont{
    margin-top: 10px;
}
</style>
