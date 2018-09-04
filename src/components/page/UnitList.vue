<template>
    <div class="Unit">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-weibiaoti2010101"></i> 单位列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
            <div class="left">
                    <el-button type="primary" icon="el-icon-circle-plus" @click="addunit">添加单位</el-button>
                    <el-cascader
                        size="small"
                        placeholder="请选择地址"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                <!-- 搜索类型 -->
                 <el-input placeholder="请输入内容" v-model="select_word" class="input-with-select" style="width:0">
                    <el-button slot="append" icon="el-icon-search" @click="sendSearch"></el-button>
                </el-input>
            </div>
            <div class="right">
                <el-button type="danger" icon="el-icon-delete" @click="deleteAllInput">批量删除</el-button>
            </div>
        </div>
        <el-table border v-loading="loading" ref="multipleTable" :data="tableData3"  style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="单位" width="120">
                <template slot-scope="scope">{{ scope.row.owner }}</template>
            </el-table-column>
            <el-table-column label="站点数量">
                <template slot-scope="scope">
                    <span class="cursor" @click="hrefAsset(scope)">
                        {{ scope.row.site_count }}
                    </span>
                    </template>
            </el-table-column>
            <el-table-column label="异常站点数">
                <template slot-scope="scope">{{ scope.row.threat }}</template>
            </el-table-column>
            <el-table-column label="所属销售">
              <template slot-scope="scope">{{ scope.row.salesman }}</template>
          </el-table-column>
              <el-table-column label="应急响应">
              <template slot-scope="scope">
                    <el-select v-model="scope.row.emergency"  @change="selectEmergency(scope.row)" placeholder="请选择" class="selectType1">
                        <el-option
                            v-for="item in options3"
                            :key="item.id"
                            :value="item.name">
                        </el-option>
                    </el-select>
              </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="update" @click="edit(scope)"></div>
          </template>
        </el-table-column>
        </el-table>
             <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="totalpage" 
                @current-change="changepage"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog title="添加单位" :visible.sync="addUnitVisible" width="35%">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                            <el-form-item label="单位名称" > 
                                <el-input placeholder="请输入单位名称" v-model="addUnitData.owner" class="alertInput"></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-cascader
                                size="small"
                                placeholder="请选择地址"
                                :options="alertAdress"
                                v-model="addUnitData.selectedAlertAdress"
                                @change="handleChange1">
                                </el-cascader>
                            </el-form-item>               
                            <el-form-item label="联系邮箱">
                                <el-input placeholder="请输入联系邮箱" v-model="addUnitData.email" class="alertInput"></el-input>
                            </el-form-item>    
                            <el-form-item label="联系人">
                                <el-input placeholder="请输入联系人" v-model="addUnitData.name" class="alertInput"></el-input>
                            </el-form-item>  
                            <el-form-item label="联系电话">
                                <el-input placeholder="请输入联系电话" v-model="addUnitData.phone" class="alertInput"></el-input>
                            </el-form-item>                
                            <el-form-item label="所属销售">
                                <el-select v-model="addUnitData.role" filterable placeholder="请选择所属销售"  @change="alertAccount1">
                                    <el-option                
                                        v-for="item in options2"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>             
                            <el-form-item label="备注" >
                                <el-input placeholder="请输入备注" type="textarea" v-model="addUnitData.remark" class="alertInput"></el-input>
                            </el-form-item>
                            <el-form-item label="是否为客户">
                                    <el-switch v-model="addUnitData.delivery"></el-switch>
                                </el-form-item>     
                            <el-form-item label="地域管理">
                            <el-switch v-model="addUnitData.area"></el-switch>
                        </el-form-item>    
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        
                        <el-button @click="addUnitVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveAddUnit">确 定</el-button>
                    </div> 
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑单位" :visible.sync="editVisible" width="35%">
            <el-form label-width="100px">
                <el-form-item label="单位名称" >
                    <el-input placeholder="请输入单位名称" v-model="alertData.name" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                     <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="alertAdress"
                    v-model="selectedAlertAdress"
                    @change="handleChange2">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input placeholder="请输入电子邮箱" v-model="alertData.email" class="alertInput"></el-input>
                </el-form-item>
                 <el-form-item label="联系人">
                    <el-input placeholder="请输入联系人" v-model="alertData.contact" class="alertInput"></el-input>
                </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input placeholder="请输入联系电话" v-model="alertData.phone" class="alertInput"></el-input>
                </el-form-item>               
                <el-form-item label="所属销售">
                    <el-select v-model="alertData.role" filterable placeholder="请选择所属销售" @change="alertAccount">
                        <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input placeholder="请输入备注" type="textarea" v-model="alertData.remark" class="alertInput"></el-input>
                </el-form-item>
                 <el-form-item label="是否为客户">
                        <el-switch v-model="alertData.delivery"></el-switch>
                    </el-form-item>               
                <el-form-item label="地域管理">
                        <el-switch v-model="alertData.area"></el-switch>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {
        regionDataPlus
    } from 'element-china-area-data';

    export default {
        name:'unIt',
        data() {
            return {
                includedComponents:'unIt',
                labelPosition: 'center',
                loading:true,
                addUnitVisible:false,
                seleced:'',
                tableData3: [],
                addUnitData:{
                    name:'',
                    password:'',
                    email:'', 
                    contact:'', 
                    phone :'',
                    role :'',
                    remark :'',
                    delivery :'',
                    area:true
                },
                alertData:{
                    name:'',
                    password:'',
                    email:'',
                    contact:'',
                    phone :'',
                    role :'',
                    remark :'',
                    delivery :'',
                    area:true
                },
               options1: [{
                    value: 'name',
                    label: '姓名'
                    }, {
                    value: 'phone',
                    label: '电话'
                    }, {
                    value: 'email',
                    label: '邮箱'
                }],
                cpage:1,
                isdsable:false,
                delVisible:false,
                multipleSelection: [],
                fullscreenLoading:false,
                options: regionDataPlus,
                selectedOptions: [],
                select_word: '',
                editVisible:false,
                totalpage:0,
                deleteArr:[],
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                cpage:1,
                alertAdress: regionDataPlus,
                selectedAlertAdress: [],
                options2: [],
                options3:[],
                // 弹出框搜索类型
                id:'',
                valueSelect1:'',
                selectType:''
            }
        },
        methods: {
            handleChange(value) {
                this.alertData.province=value[0];
                this.alertData.city=value[1];
                this.alertData.county=value[2]
                this.selectedAlertAdress=value;
                this.sendSearch();
            },
            hrefAsset(scope){
                this.$router.push({  name:'assets',params:{'unItId':scope.row.id}});
            },
            selectEmergency(row){
                    var id = '';
                    for(var i=0;i<this.options3.length;i++){
                        if(this.options3[i].name.indexOf(row.emergency) == 0){
                            id = this.options3[i].id;
                        }
                    }
                    this.$axios.post('api/owner/'+row.id+'/emergency/'+id).then((res)=>{
                        if(res.data.status == 1){
                            this.$message.success(res.data.msg);
                            this.getUnitList();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            changepage(t){
               this.$axios.get("api/owner?page="+t+"&limit=10&province="+(this.alertData.province ? this.alertData.province :'')+'&'+'city='+(this.alertData.city ? this.alertData.city : '')+'&'+
                        'county='+(this.alertData.county ? this.alertData.county : '')+'&'+'owner='+this.select_word).then((res)=>{
                        let data = res.data;
                        this.tableData3 = data.data;
               }).catch(v=>{
                    console.log(v)
               })
            },
            addunit(){
               this.addUnitVisible = true;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            alertAccount(val){  
                this.alertData.role=val;
                // console.log(val);
                for(var i=0;i<this.options2.length;i++){
                    if(!this.options2[i].name.indexOf(val)){
                        this.alertData.salesman_id = this.options2[i].id;
                    }
                }
            },
            alertAccount1(val){  
                this.addUnitData.role=val;
                // console.log(val);
                for(var i=0;i<this.options2.length;i++){
                    if(!this.options2[i].name.indexOf(val)){
                        this.addUnitData.salesman_id = this.options2[i].id;
                    }
                }
            },
            handleChange1(val){
                this.addUnitData.province=val[0];
                this.addUnitData.city=val[1];
                this.addUnitData.county=val[2]
                this.addUnitData.selectedAlertAdress=val;
                    // 弹框的地址
           },
            handleChange2(val){
                this.alertData.province=val[0];
                this.alertData.city=val[1];
                this.alertData.county=val[2]
                this.selectedAlertAdress=val;
                    // 弹框的地址
           },
            getAlertData(n){
                this.$axios.get("api/user/"+n,).then((res)=>{
                   this.alertData=res.data.data
                //    console.log(this.alertData)
                   if(this.alertData.role == 1){
                       this.alertData.role="管理员"
                   }
                   if(this.alertData.role == 2){
                       this.alertData.role="销售"
                   }
                   if(this.alertData.role == 3){
                       this.alertData.role="应急响应"
                   }                   
               }).catch(v => {
                    console.log(v)
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            sendSearch() {
                // if(!this.select_word){
                //     this.$message.error('请输入单位名称');
                //     return;
                // };
                    this.loading = true;
                    this.$axios.get("api/owner?page=1&limit=10&province="+(this.alertData.province ? this.alertData.province :'')+'&'+'city='+(this.alertData.city ? this.alertData.city : '')+'&'+
                        'county='+(this.alertData.county ? this.alertData.county : '')+'&'+'owner='+this.select_word
                    ).then((res)=>{
                        let data = res.data.data;
                        var arr = [];

                        for(var i=0;i<this.options3.length;i++){
                            for(var key in this.options3[i]){
                                arr.push(this.options3[i][key]);
                            };
                     };
                    for(var i=0;i<data.data.length;i++){
                            data.data[i].emergency = arr[arr.indexOf(data.data[i].emergency_id)+1];
                    };
                        this.tableData3 = data.data;
                        this.loading = false;
                    }).catch(v => {
                    console.log(v)
                 });
                if(!this.alertData.province&&!this.alertData.city&&!this.alertData.county){
                    console.log(this.alertData.province)
                }
            },
            deleteAllInput() {
                if(!this.multipleSelection.length){
                    this.$message.error('请选择单位');
                }else{
                   this.delVisible = true;
                }
            },
            deleteRow(){
                 this.deleteArr = [];
               for(var i=0;i<this.multipleSelection.length;i++){
                    this.deleteArr.push(this.multipleSelection[i].id);
                };
               this.$axios.delete('api/owner',{
                    data: {id: this.deleteArr}
               }).then((res)=>{
                    let data = res.data;
                    this.$message.success(data.msg);
                    this.delVisible = false;
                    this.getUnitList();
                }).catch((v)=>{
                    this.$message.error('发生了错误');
                    this.delVisible = false;
                    this.getUnitList();
                })
            },
            getUnitList(){
                this.loading = true;
                this.$axios.get("api/owner?page="+this.cpage+"&limit=10",).then((res)=>{
                    if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                    }
                    this.totalpage = Math.ceil(res.data.data.count);
                    let data = res.data.data;
                    this.loading = false;
                    var arr = [];
                    if(res.data.status == 0){
                        this.$message.error('请先登录');
                        this.$router.push('/login');
                    };
                    /*
                        吧对象拆开分成字
                    */
                    for(var i=0;i<this.options3.length;i++){
                        for(var key in this.options3[i]){
                            arr.push(this.options3[i][key]);
                        }
                    };
                    /*
                            利用数组的indexof查找id，因为上面的方法是对json对象进行了拆分
                            例如 {aaa:123,bbb:456} 拆成了 [aaa,123]
                            所以利用数组的indexof找到id之后拿到id的位置+1也就是id所对应的名称
                    */
                    for(var i=0;i<data.data.length;i++){
                        if(data.data[i].emergency_id == null){
                            data.data[i].emergency = '我的用户';
                        }else{
                            data.data[i].emergency = arr[arr.indexOf(data.data[i].emergency_id)+1];
                        }
                    };
                    
                    this.tableData3 = data.data;

              }).catch(v => {
                    console.log(v)
                });
            },
            saveAddUnit(){
                if(!this.addUnitData.owner){
                    this.$message.error('请填写单位名称');
                    return;
                }else if(!this.addUnitData.province){
                    this.$message.error('请选择地址');
                    return;
                }else if(!this.addUnitData.email){
                    this.$message.error('请填写邮箱');
                    return;
                }else if(!this.addUnitData.name){
                    this.$message.error('请填写联系人');
                    return;
                }else if(!this.addUnitData.phone){
                    this.$message.error('请填写联系电话');
                    return;
                }else if(!this.addUnitData.salesman_id){
                    this.$message.error('请选择所属销售');
                    return;
                }else if(!this.addUnitData.remark){
                    this.$message.error('请填写备注');
                    return;
                }
                
                this.$axios.post("api/owner",{
                        province:this.addUnitData.province,
                        city:this.addUnitData.city,
                        county:this.addUnitData.county,
                        owner:this.addUnitData.owner,
                        email:this.addUnitData.email,
                        name:this.addUnitData.name,
                        phone:this.addUnitData.phone,
                        salesman_id:this.addUnitData.salesman_id,
                        remark:this.addUnitData.remark,
                        client:Number(this.addUnitData.delivery),
                        area:Number(this.addUnitData.area)
                    }).then((res)=>{   
                        let data = res.data
                        if(data.status == 1){
                        this.$message.success(data.msg);
                        this.addUnitVisible = false;
                        this.getUnitList();
                        }else{
                            this.$message.error(data.msg);
                        }
                    }).catch(v => {
                    console.log(v)
                });
            },
            edit(scope){
                this.editVisible = true;
                this.id = scope.row.id;
                this.$axios.get("api/owner/"+scope.row.id+"").then((res)=>{
                        let data = res.data.data;
                        this.selectedAlertAdress=[data.province,data.city,data.county];
                        this.alertData.name = data.owner;
                        this.alertData.email = data.email;
                        this.alertData.phone = data.phone;
                        this.alertData.owner = data.owner;
                        this.alertData.contact = data.name;
                        this.alertData.remark = data.remark;
                        this.alertData.client  = Boolean(data.client) ;
                        this.alertData.area   = Boolean(data.area);
                        this.alertData.province = data.province;
                        this.alertData.city =  data.city;
                        this.alertData.county = data.county;
                        this.alertData.role = data.salesman;
                        this.alertData.salesman_id = data.salesman_id;
                }).catch(v => {
                    console.log(v)
                });
            },
            saveEdit(){
                this.$axios.post("api/owner/"+this.id,{
                        province:this.alertData.province,
                        city:this.alertData.city,
                        county:this.alertData.county,
                        owner:this.alertData.owner,
                        email:this.alertData.email,
                        name:this.alertData.name,
                        phone:this.alertData.phone,
                        salesman_id:this.alertData.salesman_id,
                        remark:this.alertData.remark,
                        client:Number(this.alertData.delivery),
                        area:Number(this.alertData.area)
                }).then((res)=>{
                        if(res.data.status == 1){
                            this.$message.success(res.data.msg);
                            this.editVisible = false;
                            this.getUnitList();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                        
                }).catch(v => {
                    console.log(v)
                });
            }
        },
        created(){
            this.getUnitList();
            this.$axios.get("api/user/select/all").then((res)=>{ 
                let data = res.data;
                this.options2 = data.data;
            }).catch(v => {
                    console.log(v);
            });
            this.$axios.get("api/user/emergency/all").then((res)=>{ 
                let data = res.data;
                this.options3 = data.data;
            }).catch(v => {
                    console.log(v);
            });            
        },
        mounted(){
               var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length;i++){
                    text[i].innerHTML = '<img src="../../../static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
                }
        }        
    }

</script>
<style lang="less" scoped>

    .Unit .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .Unit .crumbs .el-breadcrumb{
        font-size:18px;
    }

    .el-breadcrumb{
        text-align: center;
        line-height: 32px;
    }

    .eel-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #fff;
        cursor: pointer;
    }


    .handle-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }

    .el-cascader .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    .el-table--small {
        font-size: 14px;
        width: 100px;
    }

    .el-table__header thead{
          background: #f2f2f2
    }

    .handle-input {
        width: 100px;
    }

    .selectType {
        width: 12%;
    }

    .el-form-item--small,
    .el-form-item__label {
        line-height: 40px;
        height: 40px;
    }

    .alertInput {
        width: 80%;
    }



    .corn {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
    }

    .update{
        width: 19px;
        height: 20px;
        background: url('../../../static/img/update.png') no-repeat -41px -25px;
        cursor: pointer;
        margin: 0 auto;
    }

    thead th{
      text-align: center
    }


</style>
<style>
    .Unit .el-textarea__inner{
        font-family: "Microsoft Yahei";
    }
    .Unit .cursor{
        cursor: pointer;
    }
    .Unit .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:18px;
    }
    .Unit .el-cascader{
        width: 154px;
    }
    .Unit .left{
        display: flex;
        align-items: center;
        align-content: center;
    }
    .Unit .left .el-cascader{
        width: 170px;
        margin-left: 20px;
    }
    .Unit .left .input-with-select .el-input__inner{
        width: 170px;
        margin-left: 20px;
    }
    .Unit .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .Unit .el-dialog__title{
        font-size: 16px;
    }
    .popper__arrow{
        display:none!important;
    }
    .Unit .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .Unit .el-table__empty-text span{
        margin-left: 15px;
    }
    .Unit .noText{
        width: 24px;
        height: 24px;
    }
    .Unit .selectType1{
        width: 110px;
    }
     .el-table thead{
        color: #666;
    }
     .Unit .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
    }
   .Unit .el-table td:first-child .cell, .Unit .el-table th:first-child .cell{
        padding-left: 15px;
    }

    .Unit tbody td{
        text-align: center;
    }

    .Unit .el-table th{
        text-align: center;
    }

    .Unit .el-table__header-wrapper .has-gutter tr{
        background: #f2f2f2
    }

    .Unit .el-dialog{
        width: 630px;
    }

  .Unit .msg{
    display: inline;
  }
   .Unit .msg span{
      color: red;
}


</style>
