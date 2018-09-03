<template>
    <div class="pushSetting">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-peizhiguanli"></i> 系统设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
              <el-form>
                <el-form-item label="资产健康报表周期：" > 
                    <el-select v-model="value" @change="selectAsset">
                        <el-option label="日报表" value="1"></el-option>
                        <el-option label="周报表" value="2"></el-option>
                        <el-option label="月报表" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="威胁报表周期：" class="periodicReports">
                    <el-select  v-model="value1" @change="selectthreat">
                        <el-option label="日报表" value="1"></el-option>
                        <el-option label="周报表" value="2"></el-option>
                        <el-option label="月报表" value="3"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="告警配置：" class="configuration">
                    <el-checkbox label="邮件" v-model="email" @change="emailchange"></el-checkbox>
                    <el-checkbox label="公众号" v-model="thepublic" @change="thepublicChange"></el-checkbox>
                </el-form-item>
              </el-form>
                <div class="addemail" v-show="selectdEmail">
                    <div class="email-content">
                        <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        size="medium"
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加邮箱</el-button>
                    </div>
                </div>
                <div class="addrecipient" v-show="selectdRecipient">
                   <div class="Qrcode">
                        <img src="../../../static/img/setting/Qrcode.jpg" alt="">
                    </div>
                    <div class="recipientbox">
                        <el-alert
                            :title="title"
                            type="warning"
                            :closable="closeable"
                            show-icon>
                        </el-alert>
                      <div class="recipientTag">
                            <el-radio border v-for="(key,value,index) in checkName" :key="index">{{key}}</el-radio>
                            <i class="el-icon-refresh" @click="getPush"></i>
                            <p class="msg"><span>*</span>绑定成功后刷新即可添加收件人</p>
                        </div>
                    </div>
                </div>
                <div class="btnlist">
                    <el-button @click="cancle">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pushSetting',
        data: function(){
            return {
                includedComponents:'pushSetting',
                value:'',
                value1:'',
                value2:'',
                value3:'',
                closeable:false,
                checked3:true,
                checked4:false,
                email:false,
                thepublic:false, 
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                selectdEmail:false,
                selectdRecipient:false,
                assethealth:'',
                assethealth1:'',
                checkName:[],
                chatNum:[],
                emailNum:'BD#ybbsxf@163@163.com897824',
                title:''
            }
        },
        methods: {
            cancle(){
                this.selectdEmail = false;
                this.selectdRecipient = false;
                this.email = false;
                this.thepublic = false;
            },
            onSubmit() {
               switch (this.value) {
                   case '日报表':
                    this.assethealth = 1;   
                       break;
                   case '周报表':
                    this.assethealth = 2;   
                       break;
                   case '月报表':
                    this.assethealth = 3;   
                       break;
               };
                switch (this.value1) {
                   case '日报表':
                    this.assethealth1 = 1;   
                       break;
                   case '周报表':
                    this.assethealth1 = 2;   
                       break;
                   case '月报表':
                    this.assethealth1 = 3;   
                       break;
               };
               this.$axios.post('api/push',{
                   email:this.dynamicTags,
                   wechat:this.chatNum,
                   monitor_chart:this.assethealth1,
                   asset_chart:this.assethealth
               }).then((res)=>{
                   if(res.data.status == 1){
                       this.$message.success(res.data.msg);
                    //    this.selectdEmail = false;
                    //    this.selectdRecipient = false;
                    //    this.email = false;
                    //    this.thepublic = false;
                   }else{
                       this.$message.error(res.data.msg);
                   }
               }).catch(v => {
                   console.log(v);
               });
            },
            emailchange(){
                if(this.email){
                    this.selectdEmail = true;
                }else{
                    this.selectdEmail = false;
                }
            },
            selectAsset(val){
                this.assethealth = val;
            },
            selectthreat(val){
                this.assethealth1 = val;
            },
            thepublicChange(){
                if(this.thepublic){
                    this.selectdRecipient = true;
                }else{
                    this.selectdRecipient = false;
                }
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    let match = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                    if(!match.test(inputValue)){
                        this.$message.error('邮箱格式不正确');
                        this.inputVisible = false;
                        this.inputValue = '';
                        return;
                    }else{
                            for(var i=0;i<this.dynamicTags.length;i++){
                                if(this.dynamicTags[i] == inputValue){
                                    this.$message.error('请勿重复添加');
                                    this.inputVisible = false;
                                    this.inputValue = '';
                                    return;
                                }
                            };
                            this.dynamicTags.push(inputValue);
                            this.inputVisible = false;
                            this.inputValue = '';
                    }
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            getPush(){
                this.$axios.get('api/push').then((res)=>{
                     if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                     }
                    let data = res.data.data;
                    this.dynamicTags = data.email;
                    this.checkName = data.wechat;
                    this.title = '收件人需要先关注左侧公众号，并回复消息：'+data.wechat_token+'，即可绑定成功。';
                    for(var key in this.checkName){
                        this.chatNum.push(key);
                    };
                    this.value = data.asset_chart;
                    this.value1 = data.monitor_chart;
                    switch (data.monitor_chart) {
                                case 1:
                                    this.value = '日报表';   
                                    break;
                                case 2:
                                    this.value = '周报表';   
                                    break;
                                case 3:
                                    this.value = '月报表';   
                                    break;
                        };
                    switch (data.asset_chart) {
                                case 1:
                                    this.value1 = '日报表';   
                                    break;
                                case 2:
                                    this.value1 = '周报表';   
                                    break;
                                case 3:
                                    this.value1 = '月报表';   
                                    break;
                        };
            }).catch(v => {
                   console.log(v);
               });
            }
        },
        created(){
            this.getPush();
        }
    }
</script>
<style scope lang="scss">

    .pushSetting .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .pushSetting .crumbs .el-breadcrumb{
        font-size:18px;
    }
    .pushSetting{
        .container{
        .addemail{
            border: 1px solid #ddd;
            padding-left: 45px;
            margin-bottom: 30px;
        }
        .addemail{
            margin-left: 136px;
            width: 73%;
            .email-content{
                margin-top:10px;
                margin-bottom:10px;
            }
        }
        .addrecipient{
            width: 73.5%;
            height: 150px;
            border: 1px solid #ddd;
            padding-left:35px;
            padding-top: 25px;
            margin-left: 136px;
            }
            .recipientTag{
                margin-top: 35px;
                display: flex;
                align-items: center;
                .el-icon-refresh{
                    margin-left: 35px;
                    font-size: 30px;
                    color: #88c2ff;
                    cursor: pointer;
                }
                .msg{
                    margin-left: 20px;
                    color: #999;
                    font-size: 14px;
                    span{
                        color: #CC3333;
                        margin-right: 5px;
                    }
                }
            }
                .Qrcode{
                    img{
                        width: 130px;
                        height: 130px;

                    }
                    float: left;
                }
                .recipientbox{
                    width: 80%;
                    float: left;
                    margin-left: 1%;
                    margin-top: 8px;
                }
        }
        .btnlist{
            display: flex;
            justify-content: center;
            margin-top: 15px;
            button{
                margin-right: 10px;
            }
        }
        }
</style>
<style> 
    .pushSetting .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:20px;
    }
    .pushSetting .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .pushSetting .el-dialog__title{
        font-size: 16px;
    }
    .pushSetting .container .periodicReports label{
        padding-left: 27px;
    }
    .pushSetting .container .configuration .el-form-item__label{
        padding-left: 55px;
    }
    .pushSetting .container .el-alert__icon{
        color:#409eff
    }
    .pushSetting .container .el-alert{
        background: #eaf3fd;
    }
    .pushSetting .container .border{
        height: 1px;
        background: #ddd;
        margin-top: 25px;

    }
    .pushSetting .container .el-alert__content{
        height: 35px;
        line-height: 35px;
        color: #666;
    }
 .pushSetting .el-tag + .el-tag {
    height: 30px;
    margin-right: 10px;
    line-height: 30px;
  }
 .pushSetting .button-new-tag {
    width: 90px;
    height: 30px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-right: 10px;
  }
  .pushSetting .input-new-tag {
    width: 90px;
    margin-right: 10px;
    height: 30px;
  }
  .el-tag{
      margin-left:0;
      margin-right:10px;
      margin-bottom:5px;
  }
 
</style>

