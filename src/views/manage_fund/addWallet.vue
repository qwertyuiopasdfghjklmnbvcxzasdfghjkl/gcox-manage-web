<template>
    <div class="addWallet">
        <Card>
            <p slot="title">添加新地址</p>
            <Form ref="formItem" :model="formLeft" :rules="ruleInline" label-position="left" :label-width="100">
                <Row>
                    <Col span="24">
                        <FormItem label="币种" prop="symbol">
                            <Input v-model="formLeft.symbol" name="symbol"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="地址" prop="address">
                            <Input v-model="formLeft.address" name="address"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                         <Button type="primary" @click="closeDialog">取消</Button>
                    </Col>
                    <Col span="12">
                         <Button type="primary" @click="addColdWallet('formLeft')">确定</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
</template>
<script>
import fundApi from '../../api/fund'
export default {
    data () {
        return {
            formLeft: {
                symbol: '',
                address: ''
            },
            ruleInline: {
                symbol: [
                    { required: true, message: '请输入币种', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        closeDialog () {
            this.$emit('removeDialog')
        },
        addColdWallet (name) {
            if (this.formLeft.symbol) {
                if (this.formLeft.address) {
                    fundApi.addColdWallet(this.formLeft, (res) => {
                        this.$Message.success({content: '添加成功'})
                        this.$emit('okCallback')
                        this.$emit('removeDialog')
                    }, (msg) => {
                        this.$Message.error({content: msg})                        
                    })
                } else {
                    this.$Message.error({content: '请输入地址'})
                }
            } else {
                this.$Message.error({content: '请输入币种'})
            }
        }
    }
}
</script>

<style>
.addWallet{}
</style>

