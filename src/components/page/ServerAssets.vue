<template>
    <div class="serveTab">
        <div class="crumbss">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-fuwuqi"></i> 服务器列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="left">
                         <el-button type="primary" icon="el-icon-circle-plus" @click="batchAddAsset">批量添加</el-button>
                </div>
            </div>
            <el-table border v-loading="loading"  ref="multipleTable" :data="tableData3" style="width: 100%;" @selection-change="handleSelectionChange">
                <el-table-column label="单位" width="120">
                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                </el-table-column>
                <el-table-column label="IP">
                    <template slot-scope="scope">
                        <div class="icon" v-if="scope.row.status == 1">
                            <span>
                                <img src="/static/img/assets/total1.png">
                            </span>
                        </div>
                         <div class="icon icon1" v-else>
                            <span>
                                <img src="/static/img/assets/total3.png">
                            </span>
                        </div>
                        <span @click="hrefmonitor(scope.row)">{{ scope.row.ip }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="IDC">
                    <template slot-scope="scope">{{ scope.row.idc }}</template>
                </el-table-column>
                <el-table-column label="端口">
                    <template slot-scope="scope">
                        <div class="box" v-for="(value, key, index) in scope.row.port" :key="index">
                            <el-popover
                            placement="top-start"
                            title="端口信息"
                            width="200"
                            trigger="hover"
                            >
                              <p>当前服务:{{value.version}},</p>
                              <p>当前版本:{{value.server}}</p>
                            <el-button slot="reference">{{key}}</el-button>
                            </el-popover>
                        </div>
                    </template>
            </el-table-column>
                <el-table-column label="事件">
                <template slot-scope="scope">
                    <div :style="{color:color}" v-if="scope.row.event_count == 0 ? color = '#333' : color ='red'">
                        {{ scope.row.event_count }}
                    </div>
                </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <div :style="{color:red}" v-if="scope.row.alive == 0" @click="changeStatus(scope.row.id,$event)">
                            已暂停
                        </div>
                        <div v-else-if="scope.row.type == 1" @click="changeStatus(scope.row.id,$event)">
                            基线监测中
                        </div>
                        <div v-else-if="scope.row.type == 0" @click="changeStatus(scope.row.id,$event)">
                            正常监测中
                        </div>
                    </template>
                </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                <div class="update" @click="edit(scope.row)"></div>
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

        <el-dialog title="修改" class="edit" :visible.sync="editVisible1" width="30%">
                   <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                    <el-form-item label="所属单位">
                        <el-autocomplete style="width:80%;" popper-class="my-autocomplete" v-model="dynamicValidateForm.owner" @focus="querySearch" :fetch-suggestions="querySearch"
                            placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @select="selectunit">
                            <i class="el-icon-edit el-input__icon" slot="suffix">
                            </i>
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.owner }}</div>
                                <!-- <span class="addr">{{ item.address }}</span> -->
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="选择策略">
                        <el-autocomplete popper-class="my-autocomplete" v-model="dynamicValidateForm.strategy" @focus="querySearch1" :fetch-suggestions="querySearch1"
                            placeholder="请选择策略" @select="selectStrategy">
                            <i class="el-icon-edit el-input__icon" slot="suffix">
                            </i>
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.name }}</div>
                                <!-- <span class="addr">{{ item.address }}</span> -->
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <div class="hidebox" v-show="dynamicValidateForm.strategy">
                    <el-form-item label="监控时间段">
                            <el-date-picker
                            v-model="dynamicValidateForm.startTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker> 
                    </el-form-item>
                    <el-form-item label="每天时间段">
                            <el-select v-model="dynamicValidateForm.startdaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                    -
                                <el-select v-model="dynamicValidateForm.enddaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select> 
                    </el-form-item> 
                    <el-form-item label="可用性监测">
                         <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    监测服务器连通状态
                                </div>
                        </div>
                                <el-slider
                                    v-model="dynamicValidateForm.usability"
                                    :format-tooltip="usabilitychange2"
                                    :step="16.5"
                                    @change="usabilitychange"
                                    >
                                </el-slider>
                    </el-form-item>
                    <el-form-item label="端口变动">
                          <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    监测服务器端口开启、关闭与服务变化
                                </div>
                        </div>
                                 <el-slider
                                    v-model="dynamicValidateForm.port"
                                    :format-tooltip="changestep4"
                                    :step="16.5"
                                    @change="portchange"
                                    >
                                    </el-slider>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="dynamicValidateForm.remark">
                        </el-input>
                    </el-form-item>
                    </div>
                    <div class="ipserver" v-if="isport">
                    <el-form-item label="基线修改">
                        <div class="box"   v-for="(keys,value) in dynamicValidateForm.init"
                        :key="value">
                            <el-input  v-model="keys.port" ></el-input>
                            <el-input v-model="keys.version"></el-input>
                            <el-input class="item-ftpd" v-model="keys.server"></el-input>
                            <div class="delete">
                                    <i class="el-icon-remove"  @click="removeDomain(value)"></i>
                            </div>
                        </div>
                        <div class="box"  v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'">
                            <el-input v-model="domain.port"></el-input>
                            <el-input v-model="domain.server"></el-input>
                            <el-input class="item-ftpd"  v-model="domain.version"></el-input>  
                            <div class="add">
                                <i class="el-icon-circle-plus" @click="addDomain()"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item class="tipsbox">
                            <i class="iconfont icon-wenti"></i>
                            <span>以上为基线监测信息,若信息有误,请手动纠正</span>
                    </el-form-item>
                    </div>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible1 = false">取消</el-button>
                <el-button type="primary" @click="saveEdit('dynamicValidateForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量添加" :visible.sync="batchAddAssets" width="35%" class="batchAdd">
                        <el-form label-width="100px">
                            <el-form-item label="选择单位">
                    <el-autocomplete popper-class="my-autocomplete" v-model="batchAdd.owner" @focus="querySearch" :fetch-suggestions="querySearch"
                        placeholder="请选择单位内容"  @select="selectOwnerdata">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" :rows="2" :autosize="{ minRows: 2, maxRows: 4}" placeholder="127.0.0.1,多个IP请换行输入" v-model="batchAdd.content"
                        resize="none">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="isManage" label="选择策略">
                    <el-autocomplete popper-class="my-autocomplete" v-model="batchAdd.strategy" @focus="querySearch1" :fetch-suggestions="querySearch1"
                        placeholder="请选择策略"  @select="selectstrategydata">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.name }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <div v-if="batchAdd.strategy" class="hidebox">
                     <el-form-item label="策略名称" v-if="batchAdd.strategyId==0">
                        <el-input v-model="addserverStrategy.name" placeholder="请填写策略名称"></el-input>
                    </el-form-item>
                    <el-form-item label="监控时间段">
                            <el-date-picker
                            v-model="addserverStrategy.startTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="每天时间段">
                            <el-select v-model="addserverStrategy.startdaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                    -
                                <el-select v-model="addserverStrategy.enddaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                    </el-form-item>
                    <el-form-item label="可用性监测" class="usblity">
                                <div class="icon">
                                    <i class="el-icon-question"></i>
                                        <div class="tips">
                                            <div class="border"></div>
                                            监测服务器连通状态
                                        </div>
                                </div>
                                <el-slider
                                    v-model="addserverStrategy.usability"
                                    :format-tooltip="usabilitychange2"
                                    :step="16.5"
                                    @change="usabilitychange"
                                    >
                                </el-slider>
                    </el-form-item>
                    <el-form-item label="端口变动">
                                <div class="icon">
                                    <i class="el-icon-question"></i>
                                        <div class="tips">
                                            <div class="border"></div>
                                            监测服务器端口开启、关闭与服务变化
                                        </div>
                                </div>
                                 <el-slider
                                    v-model="addserverStrategy.port"
                                    :format-tooltip="changestep4"
                                    :step="16.5"
                                    @change="portchange"
                                    >
                                </el-slider>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="addserverStrategy.remark">
                        </el-input>
                    </el-form-item> 
                    </div>                   
            </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="batchAddAssets = false">取 消</el-button>
                        <el-button type="primary" @click="saveAddServer">确 定</el-button>
                    </div>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name:'serverAsset',
        data() {
            return {
                includedComponents:'serverAsset',
                labelPosition: 'center',
                activeName2: 'first',
                fullscreenLoading:false,
                editVisible1:false,
                loading:true,
                isManage:true,
                batchAddAssets:false,
                iconfont:'iconfont',
                iconDian:true,
                iconLandian:false,
                ipdata:[],
                dayTime:[],
                optionsite:[
                    
                ],
                configure:[],
                red:'red',
                addserverStrategy:{
                        name:'',
                        startTime:'',
                        endTime:'',
                        startdaily: 0,
                        enddaily: 24,
                        remark:'',
                        usability:0,
                        usability1:0,
                        port:0,
                        port1:0,
                        remark:''
                },                
                batchAdd: {
                    owner:'',
                    strategy: '',
                    content: ''
                },                
                validateForm:[],
                port:[
                   
                ],
                editPort:[],
                dynamicValidateForm: {
                    owner:'',
                    strategy:'',
                    name:'',
                    domains: [
                       
                    ],
                    init:[
                            
                    ]
                },
                tableData3: [
                ],
                portNum:'',
                cpage:1,
                optionssite: [],
                isdsable:false,
                delVisible:false,
                multipleSelection: [],
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
                selectedAlertAdress: [],
                options2: [],
                // 弹出框搜索类型
                id:'',
                valueSelect1:'',
                selectType:'',
                isport:true
            }
        },
        methods: {
            batchAddAsset(){
                this.batchAddAssets = true;
            },
            selectunit(obj) {
                this.dynamicValidateForm.owner = obj.owner;
                this.dynamicValidateForm.ownerId = obj.id;
            },
            selectStrategy(obj){

                this.dynamicValidateForm.strategy = obj.name;
                this.dynamicValidateForm.strategyId = obj.id;
                this.$axios.get('api/ipConfigure/'+obj.id+'').then((res)=>{
                    let data = res.data.data;
                    this.dynamicValidateForm.name = data.name;
                    this.dynamicValidateForm.startTime = [new Date(data.start),new Date(data.end)];
                    this.dynamicValidateForm.startdaily = data.daily_start;
                    this.dynamicValidateForm.enddaily = data.daily_end;
                    this.dynamicValidateForm.usability1 = data.usability;
                    this.dynamicValidateForm.port1 = data.port;
                    this.dynamicValidateForm.remark = data.remark;
                    switch (this.dynamicValidateForm.usability1) {
                            case 0:
                            this.dynamicValidateForm.usability = 0;
                                break;
                            case 1:
                            this.dynamicValidateForm.usability = 99;
                                break;
                            case 5:
                            this.dynamicValidateForm.usability = 82.5;
                                break;
                            case 15:
                            this.dynamicValidateForm.usability = 66;
                                break;                                                                    
                            case 30:
                            this.dynamicValidateForm.usability = 49.5;
                                break;
                            case 60:
                            this.dynamicValidateForm.usability = 33;
                                break;                         
                            case 360:
                            this.dynamicValidateForm.usability = 16.5;
                                break; 
                            default:
                            this.dynamicValidateForm.usability = 0;
                                break;
                    };
                    switch (this.dynamicValidateForm.port1) {
                                case 0:
                                this.dynamicValidateForm.port = 0;
                                    break;
                                case 5:
                                this.dynamicValidateForm.port = 99;
                                    break;
                                case 15:
                                this.dynamicValidateForm.port = 82.5;
                                    break;
                                case 30:
                                this.dynamicValidateForm.port = 66;
                                    break;                                                                    
                                case 60:
                                this.dynamicValidateForm.port = 49.5;
                                    break;
                                case 360:
                                this.dynamicValidateForm.port = 33;
                                    break;                         
                                case 1440:
                                this.dynamicValidateForm.port = 16.5;
                                    break; 
                                default:
                                this.dynamicValidateForm.port = 0;
                                    break;
                    };
                })
            },
            saveAddServer(){
                if(!this.batchAdd.ownerId){
                    this.$message.error('请选择单位');
                    return;
                }else if(!this.batchAdd.strategyId){
                    this.$message.error('请选择策略');
                    return;
                }
                if(this.batchAdd.strategyId){
                    this.$axios.post('api/ip/store/batch',{
                        owner_id:this.batchAdd.ownerId,
                        ip:this.batchAdd.content,
                        configure_id:this.batchAdd.strategyId
                    }).then((res)=>{
                            if(res.data.status){
                                this.$message.success(res.data.msg);
                                this.getServerList();
                                this.batchAddAssets = false;
                            }else{
                                this.$message.error(res.data.msg);
                            }
                    })
                }else{
                    this.$axios.post('api/ip/store/batch',{
                        owner_id:this.batchAdd.ownerId,
                        ip:this.batchAdd.content,
                        configure:{
                            name:this.addserverStrategy.name,
                            start:this.addserverStrategy.startTime[0].toLocaleDateString().split('/').join('-'),
                            end:this.addserverStrategy.startTime[1].toLocaleDateString().split('/').join('-'),
                            daily_start:this.addserverStrategy.startdaily,
                            daily_end:this.addserverStrategy.enddaily,
                            remark:this.addserverStrategy.remark,
                            usability:this.addserverStrategy.usability1,
                            port:this.addserverStrategy.port1
                        }
                    }).then((res)=>{
                            if(res.data.status){
                                this.$message.success(res.data.msg);
                                this.getServerList();
                                this.batchAddAssets = false;
                            }else{
                                this.$message.error(res.data.msg);
                            }
                    })
                }
            },
            usabilitychange2(val){ 
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 16.5:
                        return 6+'小时'
                        break;
                    case 33:
                        return 1+'小时'
                        break;
                    case 49.5:
                        return 30+'分钟'
                        break;
                    case 66:
                        return 15+'分钟'
                        break;
                    case 82.5:
                        return 5+'分钟'
                        break;
                    case 99:
                        return 1+'分钟'
                        break;
                    default:
                        return val;
                        break;
                }
            }, 
            usabilitychange(val){
                switch (val) {
                    case 0:
                    this.addserverStrategy.usability1 = 0;
                        break;
                    case 16.5:
                    this.addserverStrategy.usability1 = 360;
                        break;
                    case 33:
                    this.addserverStrategy.usability1 = 60;
                        break;
                    case 49.5:
                    this.addserverStrategy.usability1 = 30;
                        break;
                    case 66:
                    this.addserverStrategy.usability1 = 15;
                        break;
                    case 82.5:
                    this.addserverStrategy.usability1 = 5;
                        break;    
                    case 99:
                    this.addserverStrategy.usability1 = 1;
                        break;
                    case 100:
                    this.addserverStrategy.usability1 = 1;
                        break;
                    default:
                    this.addserverStrategy.usability1 = 0;
                        break;
                }
            },
            portchange(val){
                switch (val) {
                    case 0:
                    this.addserverStrategy.port1 = 0;
                        break;
                    case 16.5:
                    this.addserverStrategy.port1 = 1440;
                        break;
                    case 33:
                    this.addserverStrategy.port1 = 360;
                        break;
                    case 49.5:
                    this.addserverStrategy.port1 = 60;
                        break;
                    case 66:
                    this.addserverStrategy.port1 = 30;
                        break;
                    case 82.5:
                    this.addserverStrategy.port1 = 15;
                        break;    
                    case 99:
                    this.addserverStrategy.port1 = 5;
                        break;
                    case 100:
                    this.addserverStrategy.port1 = 5;
                        break;
                    default:
                    this.addserverStrategy.port1 = 0;
                        break;
                }
            },            
            changestep4(val){
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 16.5:
                        return 1+'天'
                        break;
                    case 33:
                        return 6+'小时'
                        break;
                    case 49.5:
                        return 1+'小时'
                        break;
                    case 66:
                        return 30+'分钟'
                        break;
                    case 82.5:
                        return 15+'分钟'
                        break;
                    case 99:
                        return 5+'分钟'
                        break;
                    default:
                        return val;
                        break;
                }
            },                               
            getconfigure(){
                this.$axios.get('api/ipConfigure/select/all').then((res)=>{
                    this.configure = res.data.data;
                });
            },
            selectOwnerdata(data){
                this.batchAdd.owner = data.owner;
                this.batchAdd.ownerId = data.id;
            },
            hrefmonitor(scope){
                var row = {
                    id:scope.id
                }
                if(scope.alive == 0) return;
                if(scope.type == 1){ // 基线监测
                    this.$router.push({
                        name: 'permission',
                        'query': row
                    });
                }else{
                    this.$router.push({
                        name: 'NormalObserver',
                        'query': row
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            querySearch1(queryString, cb) {
                var restaurants = this.configure;
                var results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
                this.timeout = setTimeout(() => {
                    cb && cb(results);
                }, 1000 * Math.random());
            },
            createFilter1(queryString) {
                return (restaurant) => {
                    return (restaurant.name.indexOf(queryString) === 0);
                };
            },
            querySearch(queryString, cb) {
                var restaurants = this.optionssite;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                this.timeout = setTimeout(() => {
                    cb && cb(results);
                }, 1000 * Math.random());
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.owner.indexOf(queryString) === 0);
                };
            },                            
            loadAll() {
                this.$axios.get('api/owner/select/all').then((res) => {
                    this.optionssite = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            querySearch(queryString, cb) {
                var restaurants = this.optionssite;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                this.timeout = setTimeout(() => {
                    cb && cb(results);
                }, 1000 * Math.random());
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.owner.indexOf(queryString) === 0);
                };
            },
            selectstrategydata(val) {
                this.batchAdd.strategy = val.name;
                this.batchAdd.strategyId = val.id;
                if(val.id == 0){
                    this.addserverStrategy.startTime = [new Date(),new Date(2018,11,31)];
                    this.addserverStrategy.startdaily = 0;
                    this.addserverStrategy.enddaily = 24;
                    this.addserverStrategy.remark = '';
                    this.addserverStrategy.port = 0;
                    this.addserverStrategy.usability = 0;
                    return;
                }
                this.$axios.get('api/ipConfigure/'+val.id).then((res)=>{
                    let data = res.data.data;
                    this.addserverStrategy.startTime = [new Date(data.start),new Date(data.end)];
                    this.addserverStrategy.startdaily = data.daily_start;
                    this.addserverStrategy.enddaily = data.daily_end;
                    this.addserverStrategy.remark = data.remark;
                    this.addserverStrategy.port1 = data.port;
                    this.addserverStrategy.usability1 = data.usability; 
                        switch (this.addserverStrategy.port1) {
                            case 0:
                            this.addserverStrategy.port = 0;
                                break;
                            case 1440:
                            this.addserverStrategy.port = 16.5;
                                break;
                            case 360:
                            this.addserverStrategy.port = 33;
                                break;
                            case 60:
                            this.addserverStrategy.port = 49.5;
                                break;
                            case 30:
                            this.addserverStrategy.port = 66;
                                break;
                            case 15:
                            this.addserverStrategy.port = 82.5;
                                break;    
                            case 5:
                            this.addserverStrategy.port = 99;
                                break;
                            default:
                            this.addserverStrategy.port = 0;
                                break;
                    }
                    switch (this.addserverStrategy.usability1) {
                        case 0:
                        this.addserverStrategy.usability = 0;
                            break;
                        case 1:
                        this.addserverStrategy.usability = 99;
                            break;
                        case 5:
                        this.addserverStrategy.usability = 82.5;
                            break;
                        case 15:
                        this.addserverStrategy.usability = 66;
                            break;
                        case 30:
                        this.addserverStrategy.usability = 49.5;
                            break;
                        case 60:
                        this.addserverStrategy.usability = 33;
                            break;    
                        case 360:
                        this.addserverStrategy.usability = 16.5;
                            break;
                        default:
                        this.addserverStrategy.usability = 0;
                            break;
                    }
                })
            },            
            removeDomain(index) {
                // console.log(this.dynamicValidateForm.init)
            //    var index = this.dynamicValidateForm.init.indexOf(item)
                // if (index !== -1) {
                this.dynamicValidateForm.init.splice(index, 1)
                // }
            },
            addDomain() {
               this.dynamicValidateForm.domains.push({
                port:'',
                server: '',
                version: '',
                key:Date.now()
              });
            },
            changepage(t){
               this.$axios.get("api/ip?page="+t+"&limit=10").then((res)=>{
                    let data = res.data;
                    this.totalpage = Math.ceil(res.data.data.count);
                    this.tableData3 = data.data.data;
               }).catch(v=>{
                    console.log(v)
               });
            },
            changeStatus(id,ev){
                 this.$axios.post("api/ip/"+id+"/alive").then((res)=>{
                     if(res.data.msg == '已暂停监测'){
                         ev.target.innerText = '已暂停';
                         ev.target.style.color= 'red';
                     }else if(res.data.msg == '已开始监测'){
                         ev.target.innerText = '正常监测';
                         ev.target.style.color= '#409dff';
                     }
                        this.$message.success(res.data.msg);
               }).catch(v=>{
                    console.log(v)
               });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getServerList(){
                this.loading = true;
                this.$axios.get("api/ip?page="+this.cpage+"&limit=10").then((res)=>{
                    if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                    }
                    this.totalpage = Math.ceil(res.data.data.count);
                    let data = res.data.data;
                    this.tableData3 = data.data;
                    this.loading = false;
              }).catch(v => {
                    console.log(v)
                });
            },
            edit(row){
                this.id = row.id;
                if(row.type == 1){ // 基线
                    this.isport = true;
                    }else{
                    this.isport = false
                };
                this.editVisible1 = true;
                for(var i=0;i<this.tableData3.length;i++){
                    if(this.tableData3[i].id == row.id){
                        if(this.tableData3[i].port.length == 0){
                            if(this.dynamicValidateForm.init[0])this.dynamicValidateForm.init[0].port = '';
                            if(this.dynamicValidateForm.init[0])this.dynamicValidateForm.init[0].server = '';
                            if(this.dynamicValidateForm.init[0])this.dynamicValidateForm.init[0].version = '';
                        }else{
                            this.dynamicValidateForm.init = [];
                            for(var key in this.tableData3[i].port){
                                this.dynamicValidateForm.init.push({port:key,version:this.tableData3[i].port[key].version,server:this.tableData3[i].port[key].server})
                            }
                        }
                    }
                }
                // this.validateForm = this.dynamicValidateForm.init;
            },
            saveEdit(){
                 if(this.isport){
                     var obj = [],inow=0,oldiow, arr1 = [];
                        for(var key in this.dynamicValidateForm.init){
                            if(Number(this.dynamicValidateForm.init[key].port) == 0){
                            }else{
                                            obj.push({port:Number(this.dynamicValidateForm.init[key].port),server:this.dynamicValidateForm.init[key].server,version:this.dynamicValidateForm.init[key].version});
                                }
                           }

                           for(var i=0;i<this.dynamicValidateForm.domains.length;i++){
                                for(var key in this.dynamicValidateForm.domains[i]){
                                        if(Number(this.dynamicValidateForm.domains[i].port == 0)){
                                            break;
                                        }
                                        arr1 = [{port:Number(this.dynamicValidateForm.domains[i].port),version:this.dynamicValidateForm.domains[i].version,server:this.dynamicValidateForm.domains[i].server}]
                                }
                        };
                           
                         this.$axios.post("api/ip/"+this.id,{
                            owner_id:this.dynamicValidateForm.ownerId,
                            configure_id:this.dynamicValidateForm.strategyId,
                            port:[...obj,...arr1]
                        }).then((res)=>{
                            this.editVisible1 = false;
                            this.$message.success(res.data.msg);
                            this.getServerList();
                            for(var i=0;i<this.dynamicValidateForm.domains.length;i++){
                                    for(var key in this.dynamicValidateForm.domains[i]){
                                        this.dynamicValidateForm.domains[i][key] = '';
                                    }
                            }
                        }).catch(v => {
                        console.log(v);
                    });

                 }else{
                        var obj = [],arr1 = [];
                        for(var key in this.dynamicValidateForm.init){
                            if(Number(this.dynamicValidateForm.init[key].port == 0)){
                                  break;
                            }else{
                                            obj.push({port:Number(this.dynamicValidateForm.init[key].port),server:this.dynamicValidateForm.init[key].server,version:this.dynamicValidateForm.init[key].version});
                            }
                        };

                        if(!this.dynamicValidateForm.ownerId){
                            this.$message.error('请选择单位');
                            return;
                        }else if(!this.dynamicValidateForm.strategyId){
                            this.$message.error('请选择策略');
                            return;
                        }
                    this.$axios.post("api/ip/"+this.id,{
                            owner_id:this.dynamicValidateForm.ownerId,
                            configure_id:this.dynamicValidateForm.strategyId
                        }).then((res)=>{
                            this.editVisible1 = false;
                            this.$message.success(res.data.msg);
                            this.getServerList();
                            for(var i=0;i<this.dynamicValidateForm.domains.length;i++){
                                    for(var key in this.dynamicValidateForm.domains[i]){
                                        this.dynamicValidateForm.domains[i][key] = '';
                                    }
                            }
                        }).catch(v => {
                        console.log(v);
                    });
                 }
            },
            createTime(){
                    for(var i=0;i<25;i++){
                        this.dayTime.push(i);
                    };
            }            
        },
        created(){
            this.createTime();
            this.getServerList();
            this.loadAll();
            this.getconfigure();
            if(sessionStorage.role == 1){
                 this.isManage = true;
            }else{
                 this.isManage = false;
            }
        },
        mounted(){
               var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length;i++){
                    text[i].innerHTML = '<img src="/static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
                }
        }        
    }

</script>
<style lang="scss" scoped>
    .box{
        .el-button{
            color: #fff;
            padding: 10px;
            float: left;
            border-radius: 20px;
            margin-left: 15px;
            padding-left: 20px;
            padding-right: 20px;
            line-height: 5px;
            margin-bottom: 5px;
        }
    }
    .box:nth-of-type(3n+1) {
        .el-button{
            background: #83c695
        }
    }
    .box:nth-of-type(3n-1) {
        .el-button{
            background: #6fb9e2
        }
    }
    .box:nth-of-type(3n) {
        .el-button{
            background: #faac9c
        }
    }
    .tip-header{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img{
            width: 16px;
            height: 16px;
        }
        .tip-msg{
            display: inline-block;
            margin-left: 15px;
        }
    }

    .port-tip{
        width: 200px;
        padding: 20px;
        background: #000;
        color: #fff;
    }

    .serveTab .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .serveTab .crumbs .el-breadcrumb{
        font-size:18px;
    }
    ul,li{
        list-style: none;
    }


    .intelligence{
        padding{
            left:20px;
            right: 20px;
        }
        li{
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #d7d7d7;
            font-size: 14px;
        }
        li:hover{
            background: #f2f2f2;
        }
        
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
          background: #f2f2f2;
    }

    .handle-input {
        width: 100px;
    }

    .selectType {
        width: 12%;
    }


    .alertInput {
        width: 80%;
    }


    .update{
        width: 19px;
        height: 20px;
        background: url('/static/img/update.png') no-repeat -41px -25px;
        cursor: pointer;
        margin: 0 auto;
    }

    thead th{
      text-align: center
    }


</style>
<style>
    .serveTab .el-table .icon,.serveTab .el-table .icon1{
        float: left;
    }
    .serveTab .el-table .icon1 span{
        background: url("/static/img/assets/total2.png")!important; 

    }
    .serveTab .el-table .icon span{
        background: url("/static/img/assets/total.png"); 
        width: 13px; 
        height: 13px; 
        display: inline-block; 
        position: relative;
    }
    .serveTab .el-table .icon span img{
        position: absolute;
        left: 54%;
        margin-left: -4px;
        top: 3px;
    }
    .serveTab .el-table tr td:nth-of-type(2) .cell .icon-dian{
        float: left;
        font-size: 28px;
    }

    .serveTab .el-dialog .hidebox .usblity .tips .border{
        left:43%;
    }
    .serveTab .el-dialog .hidebox .el-form-item__content{
        display: flex;
    }
    .popper__arrow{
        display: none!important;
    }

    .serveTab .el-form-item .item-time{
        width: 70px;
    }
    .serveTab .el-textarea .el-textarea__inner{
        font-family: "Microsoft Yahei";
    }

    .serveTab .el-dialog .tips{
        position: absolute;
        background: rgb(50, 65, 87);
        border-radius:6px;
        color:#eee;
        left: -66px;
        top: -32px;
        padding-left:10px;
        padding-right:10px;
        display: none;
        font-size:12px;
    }
    .serveTab  .el-slider{
        width: 100%
    }
    .serveTab  .el-slider__runway{
        margin-left:20px;
        width: 95%;
        margin-top:14px;
}
    .serveTab .el-dialog .tips .border{
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:8px solid rgb(50, 65, 87);
        border-bottom:8px solid transparent;
        position: absolute;
        bottom:-15px;
        left:24%;
    }

    .serveTab .el-dialog .el-icon-question{
        position: absolute;
        top:9px;
        left: -10px;
        cursor: pointer;
    }
    .serveTab .el-dialog .icon:hover .tips{
        display: block;
    }
    .serveTab .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:18px;
    }    .serveTab .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:18px;
    }
    .serveTab .crumbss .el-breadcrumb{
        font-size:18px;
        margin-bottom:20px;
    }
    .serveTab .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .serveTab .el-dialog__title{
        font-size: 16px;
    }
    .popper__arrow{
        display: none!important;
    }
    .serveTab .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .serveTab .el-table__empty-text span{
        margin-left: 15px;
    }
    .serveTab .noText{
        width: 24px;
        height: 24px;
    }
    .el-table thead{
        color: #666;
    }
    .serveTab .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
    }
    .serveTab .el-icon-remove, .serveTab .el-form .el-form-item .add{
        font-size: 18px;
        color: #adadad;
    }

    .serveTab .item-value{
        width: 250px;
        height: 28px;
    }
    .serveTab .el-table tr td:nth-of-type(2),.serveTab .el-table tr td:nth-of-type(6){
        color: #409dff;
    }
    .serveTab .el-table tr td:nth-of-type(2),.serveTab .el-table tr td:nth-of-type(6)  div{
        cursor: pointer;
    }

    .serveTab .el-form .el-form-item .delete,.serveTab .el-form .el-form-item .add{
        float: right
    }

    .serveTab .el-form .ipserver .box{
        display: flex;
        margin-left:68px;
        margin-top:5px;
        margin-bottom:5px;
    }
    .serveTab .el-form .ipserver .tipsbox {
        margin-left:68px;
    }

    .serveTab .el-dialog .hidebox .el-form-item:nth-of-type(3) .border {
        left: 42%;
    }

    .serveTab .edit .ipserver .el-form-item .el-input{
        width: 33%;
        display: inline-block;
        margin-right: 10px;
    }

    .serveTab .el-table td:first-child .cell, .serveTab .el-table th:first-child .cell{
        padding-left: 15px;
    }

    .serveTab .cell{
        text-align: center
    }

    .serveTab .el-table__header-wrapper .has-gutter tr th{
        background: #f2f2f2;
    }

    .serveTab .el-table th{
        text-align: center;
    }


</style>
