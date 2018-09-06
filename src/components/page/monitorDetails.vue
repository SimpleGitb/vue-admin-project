<template>
	<div class="record">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item style=""><i><img style="width: 16px;height: 16px;vertical-align: middle;" src="../../../static/img/u7577.png"/></i> 检测详情</el-breadcrumb-item>
          </el-breadcrumb>
		<div class="container">
			 <el-table
			    ref="multipleTable"
			    :data="tableData"
			    tooltip-effect="dark"
			    border
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      label="URL"
			      >
			      <template slot-scope="scope">
			      	{{ scope.row.url }}
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="敏感链接"
			      >
			      <template slot-scope="scope">
					{{ scope.row.link }}
			      	<!-- <i><img style="width: 25px;height: 25px;vertical-align: middle;cursor: pointer;" src="../../../static/img/u7720.png"/></i> -->
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="关键词"
			      >
			      <template slot-scope="scope">
			      	{{ scope.row.keywords }}
			      </template>
			    </el-table-column>
                <el-table-column
			      label="类型"
			      >
			      <template slot-scope="scope">
			      	{{ scope.row.type }}
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
			      label="快照"
			      >
                    <template slot-scope="scope">
                        <a :href="scope.row.cache_link ? scope.row.cache_link : 'javascript:;'"><i class="iconfont icon-kuaizhao"></i></a>
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
	</div>
	
</template>

<script>
    export default {
        name: 'monitorDetails',
        data: function () {
            return {
                includedComponents: 'monitorDetails',
                tableData: [],
                multipleSelection: [],
                currentPage: 1,
                total: 10,
                count: 1,
                dialogVisible: false,
                asset_ip: [],
                ip: '',
                asset_url: [],
                url: '',
                email: ''
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            assetsResult(id) {
                this.$router.push({
                    name: 'monitorDetails',
                })
            },
            removeBatch(rows) {
                var ids = [];
                rows.forEach(element => {
                    ids.push(element.id)
                })
                //			      this.tableData.splice(0,1);
                this.$confirm('确定要删除选中的文件吗?', '提示').then(() => {
                    this.$axios.delete("api/asset/delete", {
                        data: {
                            id: ids
                        }
                    }).then((res) => {
                        this.handleCurrentChange();
                    });
                }).catch(() => {});
            },
            handleCurrentChange(val) {
                this.$axios.get('api/monitor/' + this.$route.query.id + '?page=1&limit=10').then((res) => {
                    this.tableData = res.data.data;
                })
            },
            handleClose(done) {
                done();
            },
            handleClick(tab, event) {
                //		        console.log(tab);
            },
            assetscombSubm() {
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
                        default:
                            this.$message.error(res.data.msg);
                            break;
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
.record .el-table_1_column_3 a:link{
		color: #409EFF;
	}
	.record .el-table_1_column_3 a:visited{
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
		width: 100%;
		border-bottom: 1px solid RGB(216,220,229);
		padding: 5px 0 5px 20px;
	}
</style>
<style type="text/css">
.record .cell .iconfont{
	font-size: 20px;
	color: #5a5e66;
}
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
	display: flex;
	align-items: center;
	justify-content: center;
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
