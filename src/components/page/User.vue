<template>
    <div class="userTable">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-yonghuliebiao"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
               <div class="left">
                    <el-button type="primary" icon="el-icon-circle-plus" @click="addUser">添加用户</el-button>
                    <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                    </el-cascader>
                    <!-- 省市区三级联动 -->
                    <!-- 搜索类型 -->
                <el-input placeholder="请输入内容" v-model="select_word" class="input-with-select" style="width:0">
                    <el-select v-model="valueSelect1" slot="prepend" placeholder="请选择" style="width:90px">
                     <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="sendSearch"></el-button>
                </el-input>
               </div>
                <div class="right">
                    <el-button type="danger" icon="el-icon-delete" @click="deleteAllInput">批量删除</el-button>
                </div>
            </div>
        <el-table v-loading="loading" border  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="" label="邮箱">
                <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column prop="" label="账户类型">
                <template slot-scope="scope">{{ scope.row.role }}</template>
            </el-table-column>
            <el-table-column prop="" label="手机">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
          </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <div :class="scope.row.alive == 1 ? 'play' :'stop'" @click="handleDisable(scope.row,$event)"></div>
            <div class="edit"  @click="handleEdit(scope.row)"></div>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑用户" :visible.sync="editVisible" width="35%">
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="姓名" >
                    <el-input v-model="alertData.name" placeholder="请输入姓名" class="alertInput">
                    </el-input>
                </el-form-item>
                <el-form-item label="地址">
                     <el-cascader
                    size="small"
                    placeholder="请选择地址"
                    :options="alertAdress"
                    v-model="selectedAlertAdress"
                    @change="handleChange1">
                    </el-cascader>
                </el-form-item>
                 <el-form-item label="电话号码">
                    <el-input placeholder="请输入电话号码" v-model="alertData.phone" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="账户类型">
                    <el-select v-model="alertData.role" filterable placeholder="请选择" class="selectType1" @change="alertAccount">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix">
                        </i>
                    </el-select>
                </el-form-item>
                 <el-form-item label="电子邮箱">
                    <el-input v-model="alertData.email" class="alertInput" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input type="textarea" v-model="alertData.remark" class="alertInput" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item label="是否通知">
                        <el-switch v-model="delivery"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加用户" :visible.sync="addVisible" width="35%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name"> 
                        <el-input v-model="ruleForm.name" class="alertInput" placeholder="请输入姓名"></el-input>
                    </el-form-item> 
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入电话号码" class="alertInput"></el-input>
                    </el-form-item> 
                    <el-form-item label="地址" prop="address" class="selectAddress">
                        <el-cascader
                        size="small"
                        placeholder="请选择地址"
                        :options="ruleForm.options"
                        v-model="ruleForm.address"
                        @change="handleChange1">
                        </el-cascader>
                    </el-form-item>                       
                    <el-form-item label="账户类型" prop="classList">
                        <el-select v-model="ruleForm.classList" filterable placeholder="请选择" class="selectType1">
                            <el-option                
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                    </el-form-item>   
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="ruleForm.email" class="alertInput" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>                                                  
                    <el-form-item label="备注" prop="remarks">
                        <el-input type="textarea" v-model="ruleForm.remark" class="alertInput" placeholder="请输入备注"></el-input>
                    </el-form-item> 
                    <el-form-item label="是否通知" prop="delivery">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="addVisible = false">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { regionDataPlus} from 'element-china-area-data';
// 省市区三级联动
    export default {
        name: 'user',
        data() {
            return {
                includedComponents:'user',
                labelPosition: 'center',
                loading:true,
                // 表单对齐
                options: regionDataPlus,
                selectedOptions: [],
                // 用户界面三级联动
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
                valueSelect1: 'name',
                totalpage:0,
                // 搜索类型
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                checkarr:[],
                select_cate: '',
                select_word: '',
                province:'',
                city:'',
                county:'',
                name:'',
                email:'',
                phone:'',
                del_list: [],
                is_search: false,
                delVisible:false,
                editVisible: false,
                addVisible:false,
                delivery:false,
                isdsable:false,
                deleteArr:[],
                // 用户管理界面
                alertAdress: regionDataPlus,
                selectedAlertAdress: [],
                // 弹出框省市区三级联动
                options2: [{
                value: 1,
                label: '管理员'
                }, {
                value: 2,
                label: '销售'
                }, {
                value: 3,
                label: '应急响应'
                }],
                options2: [{
                    value: '1',
                    label: '管理员'
                    }, {
                    value: '2',
                    label: '销售'
                    }, {
                    value: '3',
                    label: '应急响应'
                }],
                ruleForm: {
                    name: '',
                    region: '',
                    delivery: false,
                    classList:'',
                    email:'',
                    address:[],
                    options: regionDataPlus,
                    remark:''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' },               
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },               
                    ],
                    phone: [
                        { required: true, message: '请填写电话', trigger: 'blur' },               
                    ],
                    address: [
                        { required: true, message: '请选择地址'}
                    ],
                   classList:[
                        { required: true, message: '请选择账户类型', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' }
                    ]
                },
                // 弹出框搜索类型
                active:'icon-bofang',
                str:''  ,
                alertData:{
                    name:'',
                    phone:'',
                    email:'',
                    password:'',
                    remark:'',
                    role:1,
                    province:'',
                    city:'',
                    county:'',
                },
                alertTotalData:{
                    status:1,
                    msg:'',
                },
                select: '',
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id:-1
            }
        },
        created() {
            this.getData(this.cur_page);
        },
        computed: {
            data() {
                this.name="";
                this.phone="";
                this.email="";
                this.cur_page=1;
                // 请求完成将值清空
                return this.tableData;
                return this.alertData;
                return this.alertTotalData;
            }
        },
        methods: {
            // 省市区三级联动
             handleChange (value) {
                this.province=value[0];
                this.city=value[1];
                this.county=value[2];
                this.sendSearch();
            },           
            changeInput(val){
                this.select_word=val;
            },
            // 获取搜索框中的内容
            selectType(val){
                this.valueSelect1=val
            },
            // 获取下拉选项中的选项值
            sendSearch(){
                // if(!this.select_word){
                //     this.$message.error('请输入搜索内容');
                //     return;
                // }
                this.loading = true;
                 if(this.valueSelect1 == 'name'){
                     this.name=this.select_word
                 }
                 if(this.valueSelect1 == 'email'){
                     this.email=this.select_word
                 }
                 if(this.valueSelect1 == 'phone'){
                     this.phone=this.select_word
                 }
                //  进行判断将选项值和搜索框的内容相结合
                this.$axios.get('api/user?limit=10&page=1&province='+this.province+'&city='+(this.city ? this.city : '')+'&county='+(this.county ? this.county : '')+'&'+this.valueSelect1+'='+this.select_word).then((res)=>{
                    var text = document.getElementsByClassName('el-table__empty-text');
                    this.tableData=res.data.data.data;
                    this.loading = false;


                    for(var i=0;i<this.tableData.length;i++){

                        this.tableData[i].active = true;

                        if(this.tableData[i].role == 1){
                            this.tableData[i].role="管理员"
                        }
                        if(this.tableData[i].role == 2){
                            this.tableData[i].role="销售人员"
                        }
                        if(this.tableData[i].role == 3){
                            this.tableData[i].role="应急响应"
                        }
                       if(this.tableData[i].phone == "null"){
                            this.tableData[i].phone=""
                        }
                    }
                }).catch(v => {
                    console.log(v)
                });

            },
           handleChange1(val){
                this.alertData.province=val[0];
                this.alertData.city=val[1];
                this.alertData.county=val[2];
                this.selectedAlertAdress=val;
                    // 弹框的地址
           },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(this.cur_page);
                // console.log(this.cur_page)
            },
            // 获取 easy-mock 的模拟数
            alertAccount(val){
                this.alertData.role=val
                // console.log(val);
            },
            getData() {
                 this.loading = true;
                this.$axios.get('api/user',{
                    params:{
                        limit:10,
                        page:this.cur_page
                    }
                }).then((res)=>{
                    if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                    }
                    this.totalpage = Math.ceil(res.data.data.count);
                    this.tableData=res.data.data.data;
                    this.loading = false;
                    if(res.data.status == 0){
                        this.$message.error('请先登录');
                        this.$router.push('/login');
                    };
                    for(var i=0;i<this.tableData.length;i++){

                        this.tableData[i].active = true;

                        if(this.tableData[i].role == 1){
                            this.tableData[i].role="管理员"
                        }
                        if(this.tableData[i].role == 2){
                            this.tableData[i].role="销售人员"
                        }
                        if(this.tableData[i].role == 3){
                            this.tableData[i].role="应急响应"
                        }
                       if(this.tableData[i].phone == "null"){
                            this.tableData[i].phone=""
                        }
                    }
                }).catch(v => {
                    console.log(v)
                });
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.id = index.id;
                this.editVisible = true;
                this.getAlertData(index.id);
                // 点击编辑按钮获取数据
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
                this.selectedAlertAdress=[this.alertData.province,this.alertData.city,this.alertData.county]
               })
            },
            // 发送请求获取弹窗的数据
            handleDisable(obj,ev) {

                this.id = obj.id;
                this.$axios.post("api/user/"+obj.id+"/alive").then((res)=>{
                this.idx = obj.id;
                // this.delVisible = true;
                if(ev.target.className == 'stop'){
                    ev.target.className = 'play'
                    this.$message({
                        message:res.data.msg,
                        type:'success',
                         duration:1000
                     });
                }else{
                    ev.target.className = 'stop';
                    this.$message({
                        message:res.data.msg,
                        type:'warning',
                        duration:1000
                    });

                }
               }).catch(v => {
                    console.log(v)
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    var $this = this;
                    var arr = $this.ruleForm.classList.split('');
                    var receive = Number($this.ruleForm.delivery)
                this.$axios.post("api/user",{
                    name:$this.ruleForm.name,
                    phone:$this.ruleForm.phone,
                    province:$this.ruleForm.address[0],
                    city:$this.ruleForm.address[1],
                    county:$this.ruleForm.address[2],
                    role:arr[arr.length-1],
                    email:$this.ruleForm.email,
                    remark:$this.ruleForm.remark,
                    receive:String(receive)
                }).then((res)=>{                   
                        var data = res.data;
                        if(data.status == 1){
                            this.$message.success(data.msg);
                            this.addVisible = false;
                            this.getData();
                        }else{
                            this.$message.error(data.msg);
                        }
            }).catch(v => {
                    console.log(v)
                });
                } else {
                    console.log('error submit!!');
                            return false;
                        }
                });
            },
            resetForm(formName) {
                    this.$refs[formName].resetFields();
            },
            addUser() {
                this.addVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                   if(this.alertData.role == "管理员"){
                       this.alertData.role=1
                   }
                   if(this.alertData.role == "销售"){
                       this.alertData.role=2
                   }
                   if(this.alertData.role == "应急响应"){
                       this.alertData.role=3
                   }
                this.$axios.post("api/user/"+this.id,{
                    province:this.alertData.province,
                    city:this.alertData.city,
                    county:this.alertData.county,
                    role:this.alertData.role,
                    phone:this.alertData.phone,
                    name:this.alertData.name,
                    email:this.alertData.email,
                    remark:this.alertData.remark,
                    receive:Number(this.delivery)
                }).then((res)=>{
                    this.getData(this.cur_page);
                    this.$message.success(res.data.msg);
                }).catch(v => {
                    console.log(v)
                });
                // 提交数据给后台
                this.editVisible = false;
            },
            // 确定删除
            deleteRow(){
                for(var i=0;i<this.multipleSelection.length;i++){
                    this.deleteArr.push(this.multipleSelection[i].id);
                };
               this.$axios.delete('api/user',{
                    data: {id: this.deleteArr}
               }).then((res)=>{
                    let data = res.data;
                    this.$message.success(data.msg);
                    this.delVisible = false;
                    this.deleteArr = [];
                    this.getData();
                }).catch(v => {
                    console.log(v)
                });
            },
             deleteAllInput(){    
                if(!this.multipleSelection.length){
                    this.$message.error('请选择用户');
                }else{
                   this.delVisible = true;
                }
            },
            changepage(t,ev){
                 this.$axios.get('api/user?limit=10&page='+t+'&province='+(this.province ? this.province : '')+'&city='+(this.city ? this.city : '')+ '&county='+(this.county ? this.county : '')+ '&'+this.valueSelect1 +'='+this.select_word).then((res)=>{
                      let data = res.data;
                      this.tableData = data.data.data;
                }).catch(v => {
                    console.log(v)
                });
            }
        },
        mounted(){
               var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length;i++){
                    text[i].innerHTML = '<img src="../../../static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
                }
        }
    }

</script>

<style scoped lang="less">
    .userTable .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .userTable .crumbs .el-breadcrumb{
        font-size:18px;
    }

    .userTable .handle-box {
        display:flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .userTable .handle-select {
        width: 120px;
    }

    .userTable .handle-input {
        width: 200px;
        display: inline-block;
    }
    .userTable .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }

    .userTable .el-cascader .el-input__inner{
       height:32px;
       line-height:32px;
   }
    .userTable .el-table--small{
        font-size:14px;
    }
    .userTable .selectType{
        width:12%;
    }

    .userTable .el-form-item--small,.el-form-item__label{
        line-height:40px;
        height:40px;
    }
    .userTable .alertInput{
        width:80%;
    }
    .userTable .selectType1{
        width:30%;
    }
    .userTable .corn{
        display:inline-block;
        font-size:20px;
        cursor: pointer;
    }
    .userTable tbody td{
        text-align: center;
    }
    .userTable .edit{
        width: 19px;
        height: 20px;
        background: url("../../../static/img/update.png") no-repeat -41px -25px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
    .userTable .stop{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -23px 1px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }

    .userTable .play{
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -60px -21px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
</style>
<style>
    .userTable .el-textarea__inner{
        font-family: "Micoroft Yahei";
    }
    .userTable .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:18px;
    }
    .userTable .left{
        display: flex;
        align-items: center;
        align-content: center;
    }
    .userTable .left .el-cascader{
        width: 170px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .userTable .left .el-input-group--prepend .el-input__inner{
        width: 150px;
    }
    .userTable .left .input-with-select .el-select .el-input__inner{
        width: 90px;
    }
    .userTable .left .el-button{
        padding: 8px 15px;
    }
    .userTable .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .userTable .el-table__empty-text span{
        margin-left: 15px;
    }
    .userTable .noText{
        width: 24px;
        height: 24px;
    }
    .userTable .el-cascader{
        width: 170px;
    }
    .userTable .el-table thead{
        color: #666;
    }
       @media screen and (max-width: 1100px) {
           .userTable .left .el-input-group{
               width: 45%!important;
           }
   }

    .userTable .has-gutter tr {
        background: #f2f2f2;
    }
    .userTable .cell{
        display: flex;
        justify-content: center;
        align-items:center;
    }

    .userTable .el-table th{
        text-align: center;
    }

    .userTable .el-table td, .userTable .el-table th.is-leaf{
        border: none;
        border-left:1px solid #ebebeb;
    }

    .userTable .el-table td:first-child, .userTable .el-table th.is-leaf:first-child{
        border-left: none;
    }

    .userTable .el-table td{
        border-bottom: 1px solid #ddd
    }
     
     .userTable .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
    }

    .userTable .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .userTable .el-dialog__title{
        font-size: 16px;
    }
    .popper__arrow{
        display:none!important;
    }


</style>
