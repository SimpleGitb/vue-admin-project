<template>
	<div class="record">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item style=""><i><img style="width: 16px;height: 16px;vertical-align: middle;" src="../../../static/img/u7577.png"/></i> 资产梳理记录</el-breadcrumb-item>
          </el-breadcrumb>
		<div class="container">
			 <el-button type="danger" @click="removeBatch(multipleSelection)" :disabled="this.multipleSelection.length === 0"><i class="el-icon-delete"></i>  批量删除</el-button>
			<el-button type="text" @click="dialogVisible = true" class="popup">点击打开弹窗</el-button>
			 <el-table
			    ref="multipleTable"
			    :data="tableData"
			    tooltip-effect="dark"
			    border
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="报表名称"
			      >
			      <template slot-scope="scope">
			      	{{ scope.row.name }}
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="下载地址"
			      >
			      <template slot-scope="scope">
							<a :href="'api/asset/'+scope.row.id+'/export'">
								<i class="iconfont icon-xiazai"></i>
							</a>
			      	<!-- <i><img style="width: 25px;height: 25px;vertical-align: middle;cursor: pointer;" src="../../../static/img/u7720.png"/></i> -->
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="时间"
			      >
			      <template slot-scope="scope">
			      	{{ scope.row.created_at }}
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      >
			      <template slot-scope="scope">
			      	<el-button type="text" @click="assetsResult(scope.row.id)" class="seekbtn">查看</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <div class="pagin">
			  	<el-pagination
				  small
				  :current-page.sync="currentPage"
				  @current-change="handleCurrentChange"
				  layout="prev, pager, next"
				  :total="total">
				</el-pagination>
			  </div>
		</div>
       </div>
       <el-dialog
			  title="资产梳理"
			  :visible.sync="dialogVisible"
			  width="35%"
			  :close-on-click-modal="false"
			  :before-close="handleClose">
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
	</div>
	
</template>

<script>
    export default {
    	name: 'assetsrecord',
        data: function(){
            return {
							includedComponents:'assetsrecord',
            	tableData: [],
            	multipleSelection: [],
            	currentPage: 1,
            	total: 10,
            	count: 1,
            	
            	dialogVisible: false,
            	activeName2: 'first',
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
        methods:{
      		handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		    assetsResult(id){
		    	this.$axios.get("api/asset/"+id).then((res) => {
	                switch (res.data.status) {
						        case 1:
						        	this.$router.push({
					                    name:'assetsResult',
					                    'query':{id:id}
//					                    params:{id:id}
					                })
						            break;
						        default: this.$message.error(res.data.msg); break;
						    } 
	            }).catch(v => {
	                    console.log(v);
	             });
		      	
		     },
		      removeBatch(rows){
			      var ids = [];
			      rows.forEach(element =>{
			        ids.push(element.id)
			      })
//			      this.tableData.splice(0,1);
			      this.$confirm('确定要删除选中的文件吗?','提示',{
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() =>{
			      	this.$axios.delete("api/asset/delete", {
                        data: {
                           id: ids
                      	}
                    }).then((res) => {
                    	this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
                       this.handleCurrentChange();
                    });
			      }).catch(()=>{
			      	this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });  
			      });
			    },
			    handleCurrentChange(val) {
			        this.$axios.get("api/asset/index?page="+this.currentPage+"&limit="+10).then((res) => {
		                switch (res.data.status) {
							        case 1:
							        	const record = res.data;
							        	this.tableData = record.data.infos;
							        	this.count = record.data.count;
//							        	console.log(this.count);
							        	if(this.count <= 10){
							             	this.total = 10;
							             }else{
							             	this.total = (this.count+10) - (this.count)%10;
							             }
													break;
												case 403:
													window.location.href = '/login';
												break;
							        default: this.$message.error(res.data.msg); break;
							    } 
		            }).catch(v => {
		                    console.log(v);
		             });
			      },
			      
			      handleClose(done) {
		        done();
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
//					        	this.$router.push({
//					                name:'assetsRecord'
//					               });
					               this.dialogVisible = false;
					               this.handleCurrentChange();
					            break;
					        default: this.$message.error(res.data.msg); break;
					    } 
                    });
                
		      }
        },
        created() {
					this.handleCurrentChange();
        }
    }
  
</script>

<style scoped lang="less">
@import '../../../static/css/fishBone.css';
a{
		color: #409eff;
	}
a:link{
		color: #409EFF;
	}
a:visited{
		color: #006AD5;
	}
.container{
	margin-top: 20px;
	padding: 20px 25px;
}
.el-table {
	margin-top: 20px;
	text-align: center;
}
.popup{
	float: right;
	margin-right: 40px;
	
	
}
.group_head{
	width: 100%;border-bottom: 1px solid RGB(216,220,229);padding: 5px 0 5px 20px;
}
</style>
<style type="text/css">

.record .el-table thead>tr{
	background-color: RGB(242,242,242);
}
.record .el-table thead>tr:hover{
	background-color: RGB(242,242,242);
}
.record .el-table th>.cell{
	text-align: center;
	font-size: 14px;
	color: #000000;
}
.record .seekbtn{
	background: RGB(64,158,255);
	color: white;
	width: 37px;
	height: 20px;
	line-height: 0;
}

.record .el-tabs__nav{
		width: 100%;
	}
	.record .el-tabs--border-card>.el-tabs__header .el-tabs__item{margin: 0;}
	.record .el-tabs__item{
		width: 25%;
		text-align: center;
	}
	.record .el-tabs--border-card>.el-tabs__content{
		padding: 0;
	}

	.el-textarea__inner{
		font-family: "微软雅黑";
	}
	.el-dialog__header{
	background: RGB(248,248,248);
	border-bottom: 1px solid #e2e2e2;
}
.record .el-tabs__nav-wrap:first-child{
	padding-left: 0;
}
.record .el-icon-download{
		color: RGB(64,158,255);
		cursor: pointer;
		font-size: 18px;
	}
	.record .container .pagin{
		text-align: right;
		padding-top: 20px;
	}
</style>
