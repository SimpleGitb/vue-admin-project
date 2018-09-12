<template>
    <div class="message">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i> 消息通知</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message" @tab-click="changetab">
                <el-tab-pane :label="`威胁事件(${threatCount})`" name="first">
                    <el-button type="primary" class="beenRead" @click="threatRead">
                        标记已读
                    </el-button>
                    <el-table
                        border
                        @selection-change="threatSelectionChange"
                        v-loading="loading"
                        :data="tableData">
                         <el-table-column type="selection">
                         </el-table-column>
                        <el-table-column
                            label="描述">
                        <template slot-scope="scope">
                                <span class="mark" v-if="scope.row.deal !== 3">·</span>{{scope.row.site_name}}出现{{scope.row.type}}
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            width="200"
                            label="时间">
                        </el-table-column>
                       <el-table-column  width="200" label="操作">
                            <template slot-scope="scope">
                                    <a href="javascript:;" target="_blank" class="toview" @click="toview(scope.row)">查看</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination layout="prev, pager, next" :total="threatCountPage" @current-change="changethreat">
                        </el-pagination>
                    </div>                    
                </el-tab-pane>
                <el-tab-pane :label="`服务器资产事件(${serverCount})`" name="second">
                    <el-button type="primary" class="beenRead" @click="assetRead">
                        标记已读
                    </el-button>                   
                    <el-table
                        border
                        v-loading="loading1"
                        @selection-change="assetCountSelectionChange"
                        :data="tableData1">
                         <el-table-column type="selection" width="50">
                         </el-table-column>                       
                        <el-table-column
                            prop="date"
                            class="title"
                            label="描述">
                        <template slot-scope="scope">
                                <span class="mark" v-if="!scope.row.read">·</span>
                                {{scope.row.ip.ip}} 端口 {{scope.row.port}}
                                <span v-if="scope.row.status == 0">关闭</span>
                                <span v-else-if="scope.row.status == 1">开启</span>
                                <span v-else-if="scope.row.status !== 1 && scope.row.status!== 0">更改为{{scope.row.status}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            width="200"
                            label="时间">
                        </el-table-column>
                       <el-table-column  width="200" label="操作">
                        <template slot-scope="scope">
                                <a href="javascript:;" v-if="scope.row.action == 0" class="toview">已过期</a>
                                <a href="javascript:;" v-else-if="scope.row.action == 1" @click="disposal(scope.row)" class="toview">处置</a>
                                <a href="javascript:;" v-else-if="scope.row.action == 2"  class="toview">已处置</a>
                                <a href="javascript:;" v-else-if="scope.row.action == 3"  class="toview">已读</a>
                        </template>
                        </el-table-column>
                        </el-table>
                        <div class="pagination">
                        <el-pagination layout="prev, pager, next" :total="assetCountPage" @current-change="changeasset">
                        </el-pagination>
                    </div>                         
                </el-tab-pane>
                <el-tab-pane :label="`应用资产事件(${assetCount})`" name="application">
                    <el-button type="primary" class="beenRead" @click="applicationRead">
                        标记已读
                    </el-button>                   
                    <el-table
                        border
                         @selection-change="applicationSelectionChange"
                        :data="tableData5">
                         <el-table-column type="selection" width="50">
                         </el-table-column>                       
                        <el-table-column
                            prop="content"
                            class="title"
                            label="描述">
                            <template slot-scope="scope">
                                <span class="mark" v-if="!scope.row.read">·</span>
                               {{scope.row.content}}
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            width="200"
                            label="时间">
                        </el-table-column>
                       <el-table-column  width="200" label="操作">
                            <template slot-scope="scope">
                                <!-- <a href="javascript:;" v-if="scope.row.type == 0" class="toview">普通监测</a> -->
                                <a href="javascript:;" v-if="scope.row.deal == 0 && scope.row.type == 0"  class="toview" @click="check(scope.row)">处置</a>
                                <a href="javascript:;" v-if="scope.row.deal == 1 && scope.row.type == 0"  class="toview">已处置</a>
                                <a href="javascript:;" v-if="scope.row.type == 1" class="toview">基线监测</a>
                        </template>
                        </el-table-column>
                        </el-table>
                        <div class="pagination">
                        <el-pagination layout="prev, pager, next" :total="assetCountPage" @current-change="changeasset">
                        </el-pagination>
                    </div>                
                </el-tab-pane>
                <el-tab-pane :label="`可用性事件(${availaCount})`" name="third">
                    <el-button type="primary" class="beenRead" @click="availaRead">
                        标记已读
                    </el-button>                      
                    <el-table
                        border
                        v-loading="loading2"
                        @selection-change="availaCountSelectionChange"
                        :data="tableData2">
                         <el-table-column type="selection" width="50">
                         </el-table-column>
                        <el-table-column
                            class="title"
                            label="描述">
                        <template slot-scope="scope">
                                <span class="mark" v-show="!scope.row.read">·</span>
                                {{scope.row.content}}
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            width="200"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            width="200"
                            label="操作">
                            <template slot-scope="scope">
                                <a href="javascript:;" target="_blank" class="toview" @click="usabilityView(scope.row)">查看</a>
                            </template>
                        </el-table-column>
                        </el-table>
                    <div class="pagination">
                        <el-pagination layout="prev, pager, next" :total="availaCountPage" @current-change="changeavaila">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`威胁情报`" name="threat">
                    <el-table
                        border
                        v-loading="loading3"
                        :data="tableData3">
                        <el-table-column
                            prop="date"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="时间">
                        </el-table-column>
                       <el-table-column  label="操作">
                        <template slot-scope="scope">
                                <a href="javascript:;" target="_blank" class="toview">查看</a>
                        </template>
                        </el-table-column>
                        </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`系统通告`" name="system">
                    <el-table
                        border
                        v-loading="loading4"
                        :data="tableData4">
                        <el-table-column
                            prop="date"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="时间">
                        </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                                <a href="javascript:;" target="_blank" class="toview">查看</a>
                        </template>
                        </el-table-column>
                        </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
                <el-dialog title="处置" :visible.sync="editVisible" width="15%" class="confrim">
                    <el-form label-width="100px">
                        <el-form-item>
                                    该端口变动是否为已知？
                                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveDisposal(1)">已知变动</el-button>
                        <el-button @click="saveDisposal(2)">异常变动</el-button>
                    </div>
                </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                includedComponents:'tabs',
                message: 'first',
                deal:0,
                loading:true,
                loading1:true,
                loading2:true,
                loading3:false,
                loading4:false,
                editVisible:false,
                tableData:  [],
                tableData1:  [],
                tableData2:  [],
                tableData3:  [],
                tableData4:  [],
                tableData5:[],
                assetCount:0,
                serverCount:0,
                availaCount:0,
                threatCount:0,
                threatCountPage:0,
                assetCountPage:0,
                availaCountPage:0,
                threatData:[],
                assetData:[],
                availaData:[],
                applicationData:[],                
                rowId:''
            }
        },
        methods: {
           changetab(tab){
               if(tab.name == 'second'){
                   if(this.tableData1.length){
                       return;
                   }
                    this.getAsset();
               }else if(tab.name == 'third'){
                   if(this.tableData2.length){
                       return;
                    }
                       this.getusability();
               }else if(tab.name ==  'application'){
                   this.getApplicationEvent();
               }
           },
           changethreat(t){
               this.loading = true;
                this.$axios.get('api/notice/threat?page='+t+'&limit=10').then((res)=>{
                        let data = res.data.data;
                        this.tableData = data.threat;
                        this.loading = false;
                        this.threatCountPage = Math.ceil(data.count);
                }).catch(v => {
                    console.log(v);
                });
           },
           changeasset(t){
               this.loading1 = true;
               this.$axios.get('api/notice/asset?page='+t+'&limit=10').then((res)=>{
                    let data = res.data.data;
                    this.tableData1 = data.asset;
                    this.loading1 = false;
                    this.assetCountPage = Math.ceil(data.count);
            }).catch(v => {
                    console.log(v);
                });
           },
           check(row){ 
               this.$axios.post('api/notice/assetEvent/'+row.id+'/deal').then((res)=>{
                    if(res.data.status){
                        this.$message.success(res.data.msg);
                    }else{
                        this.$message.error(res.data.msg);
                    }
               })
           },
           changeavaila(t){
               this.loading2 = true;
            this.$axios.get('api/notice/usability?page='+t+'&limit=10').then((res)=>{
                    let data = res.data.data;
                    var arr = [];
                    this.availaCountPage = Math.ceil(data.count);
                        this.tableData2.push(data.event);
                        for(var key in  data.event){
                            arr.push(data.event[key])
                        };
                       this.tableData2 = arr;
                       this.loading2 = false;
                       for(var i=0;i<this.tableData2.length;i++){
                           this.tableData2[i].read = 0;
                       }
            }).catch(v => {
                    console.log(v);
                });               
           },
           availaRead(){
                        if(!this.availaData.length){
                            this.$message.error('请先选择消息');
                            return;
                        }
                        var arrId = [];
                        for(var i=0;i<this.availaData.length;i++){
                            arrId.push(this.availaData[i].id);
                        };
                        
                        this.$axios.post('api/notice/usability',{id:arrId}).then((res)=>{
                            if(res.data.status){
                                this.$message.success(res.data.msg);
                                for(var i=0;i<this.tableData2.length;i++){
                                        if(this.tableData2[i].id ==  arrId[i]){
                                            this.tableData2[i].read = 1;
                                        }
                                }
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(v => {
                    console.log(v);
                });
           },
           assetRead(){
            if(!this.assetData.length){
                   this.$message.error('请先选择消息');
                   return;
               }
               var arrId = [];
               for(var i=0;i<this.assetData.length;i++){
                   arrId.push(this.assetData[i].id);
               };
              
              this.$axios.post('api/notice/asset',{id:arrId}).then((res)=>{
                  if(res.data.status){
                      for(var i=0;i<this.tableData1.length;i++){
                              if(this.tableData1[i].id ==  arrId[i]){
                                  this.tableData1[i].read = 1;
                              }else{
                                  this.tableData1[i].read = 0;
                              }
                      }
                      this.$message.success(res.data.msg);
                      this.getnotice();
                  }else{
                      this.$message.error(res.data.msg);
                  }
              }).catch(v => {
                    console.log(v);
                });
           },
           applicationRead(){
               var arrId = [];
            for(var i=0;i<this.applicationData.length;i++){
                arrId.push(this.applicationData[i].id);
            }
               this.$axios.post('api/notice/assetEvent/read',{
                   id:arrId
               }).then((res)=>{
                   if(res.data.status){
                       this.$message.success(res.data.msg);
                       this.getApplicationEvent();
                   }else{
                       this.$message.error(res.data.msg);
                   }
               })
           },
           applicationSelectionChange(val){
               this.applicationData = val;
           },
           threatRead(){
               if(!this.threatData.length){
                   this.$message.error('请先选择消息');
                   return;
               }
               var arrId = [];
               for(var i=0;i<this.threatData.length;i++){
                   arrId.push(this.threatData[i].id);
               };
              
              this.$axios.post('api/notice/threat',{id:arrId}).then((res)=>{
                  if(res.data.status){
                      this.$message.success(res.data.msg);
                      this.getthreat();
                      this.getnotice();
                  }else{
                      this.$message.error(res.data.msg);
                  }
              }).catch(v => {
                    console.log(v);
                });
           },
           toview(row){
               var row = {
                   id:row.site_id,
                   name:'assets'
               }
               this.$router.push({  name:'assets','params': row });
           },
           usabilityView(row){
               var row = {
                   id:row.site_id,
                   name:'usblity'
               }
               this.$router.push({  name:'assets','params': row });
           },
           assetCountSelectionChange(val){
                this.assetData = val;
           },
           threatSelectionChange(val){
                this.threatData = val;
           },
           availaCountSelectionChange(val){
                this.availaData = val;
           },
           getApplicationEvent(){
               this.$axios.get('api/notice/assetEvent?page=1&limit=10').then((res)=>{
                   let data = res.data.data;
                        this.tableData5 = data.event;
               })
           },
           getthreat(){
                this.$axios.get('api/notice/threat?page=1&limit=10').then((res)=>{
                        let data = res.data.data;
                        this.tableData = data.threat;
                        this.loading = false;
                        this.threatCountPage = Math.ceil(data.count);
                }).catch(v => {
                    console.log(v);
                });
           },
           saveDisposal(num){
                this.$axios.post('api/notice/asset/'+ this.rowId +'/deal',{
                    deal:num
                }).then((res)=>{
                    if(res.data.status){
                        this.$message.success(res.data.msg);
                        this.getAsset();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    this.editVisible = false;
                }).catch(v => {
                    console.log(v);
                });
           },
           disposal(row){
               this.editVisible = true;
               this.rowId = row.id;
           },
           getAsset(){
             this.$axios.get('api/notice/asset?page=1&limit=10').then((res)=>{
                    let data = res.data.data;
                    var arr = [];
                    this.assetCountPage = Math.ceil(data.count);
                        for(var key in data.asset){
                            data.asset[key].read = 0;
                            arr.push(data.asset[key]);
                        };
                    this.tableData1 = arr;
                    this.loading1 = false;
             }).catch(v => {
                    console.log(v);
                });
           },
           getusability(){
            this.$axios.get('api/notice/usability?page=1&limit=10').then((res)=>{
                    let data = res.data.data;
                    var arr = [];
                    this.availaCountPage = Math.ceil(data.count);
                            for(var key in  data.event){
                                data.event[key].read = 0;
                                arr.push(data.event[key])
                            };
                       this.tableData2 = arr;
                       this.loading2 = false;
            }).catch(v => {
                    console.log(v);
                });
           },
           getnotice(){
               this.$axios.get('api/notice').then((res)=>{
                if(res.data.status == 403){
                    window.location.href = '/login';
                    return;
                }
                let data = res.data.data;
                this.assetCount = data.site_asset;
                this.serverCount = data.ip_asset;
                this.availaCount = data.count;
                this.threatCount = data.threat;
            }).catch(v => {
                    console.log(v);
                });
           }
        },
        computed: {
            // unreadNum(){
            //     return this.unread.length;
            // }
        },
        created(){
            this.getnotice();
            this.getthreat();
        },
        mounted(){
                    // sessionstorage.setItem('ms_username','123');
            var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length ;i++){
                    text[i].innerHTML = '<img src="../../../static/img/assets/noText.png" class="noText"><span>您好，还没有消息哦！</span>';
                }
        }
    }

</script>

<style>

    .message .el-table__body-wrapper .el-table__row td:nth-of-type(2){
        display: flex;
    }
    .message .el-table .cell:nth-of-type(2){
        display: flex;
    }
    .confrim .el-form-item__content{
        margin-left:0!important;
    }
    .message .crumbs .el-breadcrumb__inner{
        font-size: 18px;
    }
    .message-title{
        cursor: pointer;
    }

    .message .el-table th{
        text-align: center;
    }

    .message .el-table .cell .mark{
        color: #409eff;
        font-size: 30px;
        display: inline-block;
        margin-right: 10px;
        float: left;
    }

    .message .el-table td{
        font-size: 14px;
    }
    .message .el-table .noText{
        width: 24px;
        height:24px
    }
    .message .el-table__empty-text{
        display: flex;
        align-content: center;
        align-items: center;
    }
    .message .el-table__empty-text span{
        margin-left:10px;
    }
    .message .el-table td .toview{
        color: #409EFF;
    }

    .message .el-table__header-wrapper .has-gutter tr th{
        background: #f2f2f2;
        font-size: 14px;
    }

    .message .el-dialog__header{
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }


    .message .el-table td{
        text-align: center;
    }

    .handle-row{
        margin-top: 30px;
    }
    .message .beenRead{
        margin-top:10px;
        margin-bottom:20px;
    }
</style>