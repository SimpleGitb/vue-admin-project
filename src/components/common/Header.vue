<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
            <img src="/static/img/logo2.png" alt="" class="logoPicture">
        </div>
        <div class="logo">云悉互联网安全监测平台 v3.0</div>
        <div class="collapse-btn border"  @click.self="collapseChage($event,'p')">
            <img src="../../../static/img/folds.png" class="fold">
        </div>
        <div class="aseetRecord">
                <ul>
                    <li  @click="hrefAsset($event)">
                        <i class="iconfont icon-yingyongshuli"></i>资产梳理
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                        <i class="el-icon-caret-top el-icon--right"></i>
                            <div class="line" @click.stop="assetsRecord">
                                 <span>梳理记录</span>
                            </div>
                    </li>
                    <li @click="hrefmonitor($event)">
                        <i class="iconfont icon-jiance1"></i>安全检测
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                        <i class="el-icon-caret-top el-icon--right"></i>
                        <div class="line" @click.stop="monitorRecord">
                                 <span>检测记录</span>
                            </div>
                    </li>
                </ul>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <ul>
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <li @click="handleFullScreen">
                                        <i class="el-icon-rank"></i>
                            </li>
                        </el-tooltip>
                            <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <li @click="hrefmsg">
                                    <i class="el-icon-bell"><span class="btn-bell-badge" v-if="message>0"></span></i>
                        </li>
                            </el-tooltip>
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <li>
                        <div class="user-avator"><img src="static/img/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                            <span class="el-dropdown-link">
                                {{username}} <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>
                                        <router-link to="/ModifyData" tag="p">
                                            修改资料
                                        </router-link>
                                    </el-dropdown-item>
                                <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                    </li>
                        </el-dropdown>
                </ul>
                <!-- 消息中心 -->

                <!-- 用户头像 -->
            </div>
        </div>
        <el-dialog
			  title="资产梳理"
			  :visible.sync="dialogVisible"
			  :modal="false"
			  width="35%">
			  <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
			    <el-tab-pane label="ip" name="first">
			    	<div class="group_head">
			    		<el-checkbox-group v-model="asset_ip">
						    <el-checkbox label="port">扫描端口</el-checkbox>
						    <el-checkbox label="domain">服务器上域名</el-checkbox>
						    <el-checkbox label="webinfo">web信息</el-checkbox>
						  </el-checkbox-group>
			    	</div>
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="ip">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="url" name="second">
			    	<div class="group_head">
			    		<el-checkbox-group v-model="asset_url">
						    <el-checkbox label="subdomain">子域名</el-checkbox>
						    <el-checkbox label="port">扫描服务器端口</el-checkbox>
						    <el-checkbox label="webinfo">web信息</el-checkbox>
						  </el-checkbox-group>
			    	</div>
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="url">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="单位名称" name="third">
			    	<!--<div class="group_head">
			    		<el-checkbox-group v-model="checkList3">
						    <el-checkbox label="web信息"></el-checkbox>
						  </el-checkbox-group>
			    	</div>-->
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="textarea3">
					</el-input>
			    </el-tab-pane>
			    <el-tab-pane label="邮箱" name="fourth">
			    	<!--<div class="group_head">
			    		<el-checkbox-group v-model="checkList4">
						    <el-checkbox label="ip信息"></el-checkbox>
						  </el-checkbox-group>
			    	</div>-->
			    	<el-input
					  type="textarea"
					  :rows="7"
					  placeholder="请输入文本"
					  v-model="email">
					</el-input>
			    </el-tab-pane>
			  </el-tabs>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="assetscombSubm()">开始梳理</el-button>
			  </span>
			</el-dialog>

            <el-dialog
	   		  :before-close="handleClose"
			  title="安全检测"
			  :modal="false"
			  :visible.sync="dialogVisible1"
			  width="35%">
					    <el-radio v-model="checked" label="index">首页检测</el-radio>
                        <el-radio v-model="checked" label="deep">深度监测</el-radio>
                <el-input v-model="domain" class="sitecontent" :rows="7" type="textarea" placeholder="http://www.jxzyy.com.cn">
                </el-input>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="monitor()">开始检测</el-button>
			  </span>
			</el-dialog>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                checkeds:['首页检测'],
                name: 'admin',
                domain:'',
                message: 0,
                includedComponents:'assetsComb',
            	tableData: [],
            	multipleSelection: [],
            	currentPage: 1,
            	total: 10,
            	count: 1,
            	dialogVisible: false,
                activeName2: 'first',
                checked:true,
                checked1:true,
            	dialogVisible1: false,
            	asset_ip:[],
            	ip: '',
            	asset_url:[],
            	url: '',
            	checkList3:[],
            	textarea3: '',
            	checkList4:[],
            	email: ''
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$axios.get('api/logout').then((res)=>{
                        if(res.data.status){
                            this.$message.success(res.data.msg);
                            sessionStorage.removeItem('ms_username');
                            this.$router.push('/login');
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            },
            closetip(){
                
            },
            handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
			  handleClose(done) {
		        done();
		      },
		      handleClick(tab, event) {
//		        console.log(tab);
              },
              monitor(){
                  if(!this.domain){
                      this.$message.error('请输入域名');
                      return;
                  }else if(!this.checked){
                      this.$message.error('请选择检测内容');
                      return;
                  }
                  this.dialogVisible1 = false;
                  this.$axios.post('api/monitor',{
                      url:this.domain,
                      task:this.checked
                  }).then((res)=>{
                      if(res.data.status){
                            this.$router.push({
                                name:'monitorResult'
                            });
                      }else{
                          this.$message.error(res.data.msg);
                      }
                  })
              },
		      assetscombSubm(){
                  this.$router.push({
                      name:'assetsRecord'
                  })
			/*  	this.$axios.post("api/asset/get", {
						asset_ip: this.asset_ip,
						asset_url: this.asset_url,
						ip: this.ip,
						url: this.url,
						email: this.email
					}).then((res) => {
						switch (res.data.status) {
							case 1:
//					        	this.$router.push({
//					                name:'assetsRecord'
//					               });
									this.dialogVisible = false;
									this.handleCurrentChange();
								break;
							default: this.$message.error(res.data.msg); break;
						} 
	                });*/
		      },
            handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		      handleClick(tab, event) {
//		        console.log(tab);
		      },
		      assetscombSubm(){
		      	this.$axios.post("api/asset/get", {
			      		asset_ip: this.asset_ip,
			      		asset_url: this.asset_url,
			      		ip: this.ip,
			      		url: this.url,
			      		email: this.email
                    }).then((res) => {
                        switch (res.data.status) {
					        case 1:
					        	this.$router.push({
					                name:'assetsRecord'
					               });
					               this.dialogVisible = false;
					            break;
					        default: this.$message.error(res.data.msg); break;
					    } 
                    });
                
		      },
            hrefmsg(){
                this.$router.push({
                    name:'msg'
                });
            },
            hrefAsset(ev){
                this.dialogVisible = true;
                // ev.stopPropagation();
                // this.$router.push({
                //     name:'assetsComb'
                // });
            },
            hrefmonitor(ev){
                this.dialogVisible1 = true;
                // ev.stopPropagation();
                // this.$router.push({
                //     name:'monitor'
                // });
            },
            // 侧边栏折叠
            collapseChage(event,t){
                bus.$emit('collapse', this.collapse);
                    this.collapse = !this.collapse;
                        if(this.collapse && t == 'p'){
                                event.target.children[0].src = '../../../static/img/folds.png';
                        }else{
                                event.target.children[0].src = '../../../static/img/fold.png';
                        }
            },
            assetsRecord(){
                // this.dialogVisible = true;
                this.$router.push({
                    name:'assetsRecord'
                });
            },
            monitorRecord(){
                this.$router.push({
                    name:'monitorResult'
                });
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1080){
                this.collapseChage();
            };
            this.$axios.get('api/notice').then((res)=>{
                let data = res.data.data;
                this.message = data.threat;
            }).catch(v => {
                    console.log(v);
           });
        }
    }

</script>
<style scoped>
    .aseetRecord{
        display: inline-block;
    }
    .aseetRecord li{
        float: left;
        line-height: 69px;
        border-left:1px solid #282b33;
        list-style: none;
        font-size: 16px;
        padding-left: 25px;
        padding-right: 25px;
        color: #bfcbd9;
        cursor: pointer;
        position: relative;
        transition: .3s linear;
    }


    .msg{
        color: #fff;
        position: relative;
    }

    .aseetRecord li .box{
        background: #fff;
        position: absolute;
        bottom: -72px;
        z-index: 10;
        width: 100%;
        text-align: center;
        left: 0;
        color: #333;
        box-shadow: 4px 4px 2px #ddd;
        display: none;
    }
    .aseetRecord li:nth-of-type(2) .icon-jiance1{
        font-size: 20px;
    }
    .collapse-btn:hover{
        background: #283446;
    }
    .collapse-btn .fold{
        width: 20px
    }
    .aseetRecord li:nth-of-type(2){
        border-right: 1px solid #282b33;
    }
    .aseetRecord li:hover{
        background: #283446;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .collapse-btn .icon-weibiaoti26{
        font-size: 22px;
    }
    .border{
        border-left:1px solid #282b33;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
        color: #bfcbd9;
        font-size: 18px
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-right li:hover{
        background: #283446;
    }
    .header-user-con{
        height: 70px;
    }
    .header-user-con li:nth-of-type(1),.header-user-con li:nth-of-type(3){
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
    }
    .header-user-con .el-icon-rank{
        font-size: 20px;
    }
    .header-user-con li{
            float: left;
            height: 70px;
            line-height: 70px;
            border-left: 1px solid #282b33;
            list-style: none;
            font-size: 16px;
            padding-left: 25px;
            padding-right: 25px;
            color: #bfcbd9;
            cursor: pointer;
    }
    .header-user-con li.el-tooltip .el-icon-bell{
        position: relative;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: -4px;
        top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .logoPicture{
        width:40px;
        margin-top:15px;
    }
    .header .logo{
        width:300px;
    }
</style>
<style lang="scss">
    .aseetRecord li:hover .line{
        display: block;
        z-index: 11;
    }
    .header .sitecontent .el-textarea__inner{
        margin:10px auto;
        font-family: 'Microsoft Yahei';
    }
    .aseetRecord .line{
        height:70px;
        position: absolute;
        z-index: 11;
        background: #fff;
        color:#191c1d;
        width: 100%;
        left: -1px;
        text-align: center;
        display: none;
        border:1px solid transparent;
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, .12);
    }
    .aseetRecord .line:hover span{
        color:#00aaff;
    }
    .aseetRecord .el-dropdown{
        float: left;
    }
    .aseetRecord li .el-icon-caret-bottom{
        display: inline-block;
    }
    .aseetRecord li .el-icon-caret-top{
        display: none;
    }

    .aseetRecord li:hover .el-icon-caret-bottom{
        display: none;
    }
    .aseetRecord li:hover .el-icon-caret-top{
        display: inline-block;
    }
    .aseetRecord li span{
        font-size: 16px;
    }
    .aseetRecord li .icon-yingyongshuli,.aseetRecord li .icon-jiance1{
        margin-right: 10px;
    }
    .aseetRecord li .icon-jiance1{
        font-size: 22px;
    }
</style>
