<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>正常监测 - {{fetchdata.ip}} - {{fetchdata.location}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <div class="title_top">当前资产端口</div>
                <div class="line_content">
                    <div class="left_line"></div>
                    <div class="right_line"></div>
                </div>
                <ul class="main" style="color: #606266;">
                    <li v-for="(port,key,index) in fetchdata.port" :key="index+1">
                        <div class="left_text" v-text="key"></div>
                        <div class="right">
                            <p class="top" v-text="port.server"></p>  
                            <p class="bottom" v-text="port.version"></p>
                        </div>
                    </li>
                   
                </ul>
                <!--<el-row :gutter="20" style="color: #606266;">
				  <el-col :span="4" v-for="(port,key) in fetchdata.port" :key="port.id+1">
				  	<div class="top_text" v-text="key"></div>
                        <div class="bottom">
                            <p class="bottom_p1" v-text="port.server"></p>  
                            <p class="bottom_p2" v-text="port.version"></p>
                        </div>
				  </el-col>
				</el-row>-->
            </div>           
        </div>
        
        <div class="container">
            <div class="history_change">
                <div class="head">
                    <div class="title_top">历史变动</div>
                    <div class="line_content">
                        <div class="left_line"></div>
                        <div class="right_line"></div>
                    </div>
                </div>
            </div>
            <div class="hc_mai">
				<div class="fishBone">
					<div class="wrapper" >
						<div class="bd">
							<div class="tempWrap" style="overflow:hidden; position:relative; width: 96%;left:2%">
								<ul  style="width: 4500px; left: 0; position: relative; overflow: hidden; padding: 0px; margin: 0px;">
									
									<template v-for="(item,index) in fetchdata.event">
										<template v-if="index<fetchdata.event.length&&index%2==0">
									      <li class="item top" style="width: 170px;" :key="index+2">
												<div class="content">
													<ul>
														<li class="line-first" style="background-position-y: 9px;" v-text="fetchdata.event[index].created_at"></li>
														<li class="title" v-if="fetchdata.event[index].status ==0"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口关闭</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else-if="fetchdata.event[index].status ==1"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口开启</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口服务由 {{fetchdata.event[index].server}} 变为 {{fetchdata.event[index].version}}</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="overauto" style="border-left: 1px solid rgb(248, 151, 130);width: 187px;height: 80px;overflow: hidden;">
															<div style="width: 204px;overflow-x: hidden;overflow-y: scroll;height: 80px;">
																<ul>
																	<li v-for="(port,key) in fetchdata.event[index].history.port">{{key}}：{{port.server}} | {{port.version}}</li>
																</ul>
															</div>
														</li>
														<li class="line-last line-point" style="background-position: 0px 0px;"></li>
													</ul>
												</div>
											</li>
											<li v-if="index<fetchdata.event.length-1" class="item bottom" style="width: 170px;" :key="index+3">
												<div class="content">
													<ul>
														<li class="overauto" style="border-left: 1px solid rgb(26, 132, 206);width: 187px;height: 80px;overflow: hidden;">
															<div style="width: 204px;overflow-x: hidden;overflow-y: scroll;height: 80px;">
																<ul>
																	<li v-for="(port,key) in fetchdata.event[index].history.port">{{key}}：{{port.server}} | {{port.version}}</li>
																</ul>
															</div>
														</li>
														<li class="title" v-if="fetchdata.event[index+1].status == 0"><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -659px;">{{fetchdata.event[index+1].port}} 端口关闭</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="title" v-else-if="fetchdata.event[index+1].status == 1"><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -659px;">{{fetchdata.event[index+1].port}} 端口开启</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="title" v-else><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -659px;">{{fetchdata.event[index+1].port}} 端口服务由 {{fetchdata.event[index+1].server}} 变为 {{fetchdata.event[index+1].version}}</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="line-first" style="background-position-y: -93px;" v-text="fetchdata.event[index+1].created_at"></li>
														<li class="line-last line-point" style="background-position: 0px -20px;"></li>
													</ul>
												</div>
											</li>
									    </template>
									</template>
									
								</ul>
							</div>
						</div>
					</div>
					<a class="prev" @click="prevPage"></a>
					<a class="next" @click="nextPage"></a>
					<div class="line"></div>
				</div>            
            </div>
        </div>
    </div>
</template>
<script>
//	0 端口关闭  1 端口开启    有值 server 变为version
    export default {
    	name: 'normalobserver',
        data: function(){
            return {
				includedComponents:'normalobserver',
            	p:0,
            	leng:"",
            	fetchdata:[]
            }
        },
        methods:{
        	prevPage: function(){
        		var wid = this.leng;
        		if(this.p < -wid){
//      			this.p = 400;
					return;
        		}
        		this.p -= 800;
        		$(".tempWrap>ul").animate({left:this.p},"300");
//      		console.log(this.p);
        	},
        	nextPage: function(){
        		if(this.p>=0){
        			return;
        		}
        		this.p += 800;
//      		console.log(this.p);
        		$(".tempWrap>ul").animate({left:this.p},"300");
        	},
        	tempWidth: function(){
        		var len= $(".tempWrap>ul>li").length;
        		var len1 = (len/2*500)+500;
        		this.leng = len1;
        		$(".tempWrap>ul").css("width",len1+"px");
//      		console.log(len1);
        	},
        	fetchCustomers(){
           		this.$axios.get("api/ip/"+this.$route.query.id+"/normal").then((res)=>{
	                switch (res.data.status) {
					        case 1:
					        	this.fetchdata = res.data.data;
								break;
							case 403:
								window.location.href = '/login';
								break;
					        default: this.$message.error(res.data.msg); break;
					    }
	            });
		  	},
        },
        mounted(){
        	var self = this;
        	setTimeout(function(){
        		self.tempWidth();
        	},1500);
		   
		   this.fetchCustomers();
        }
    }
    
</script>

<style scoped lang="scss">
@import url('../../../static/css/fishBone');
.container,ul,li,dl,dd,dt{
    padding:0;
    margin:0;
    font-size:14px;
}
.overauto li {
		padding-left: 0 !important;
	}
ul,li{
    list-style:none;
}
.container{
    margin-bottom:15px;
}
    .head{
        width:100%;
        
        .title_top{
            padding-left:15px;
            line-height:40px;
        }
        .line_content{
            display:flex;
            width:100%;
            .left_line{
                width:10%;
                height:3px;
                background:#409EFF;
            }
            .right_line{
                width:90%;
                height:1px;
               background:#E4E4E4;
            }
        }
        .main{
            display:flex;
            justify-content: space-around;
            align-items: center;
            padding-bottom: 30px;
            width:100%;      
             
            a{
            	margin: 0 10px;
            	margin-top: 30px;
                width:200px;
                height:150px;
                border:1px solid #409EFF;
                padding:0 20px;
                font-size: 13px;
                align-items: center;                
                float: left;
                .top_text{
                    font-size:48px;
                    margin-top: 10px;
                }
                .top_text:nth-child(2n+1){
                    color:#5FB878;
                }
                .top_text:nth-child(2n+2){
                    color:#42A7DB;
                }
                .top_text:nth-child(3){
                    color:#F7A358;
                }
                .top_text:nth-child(4){
                    color:#5FB878;
                }
            }
         
        }
        
    }
    .bottom_p1{
    	margin-top: 10px;
    	width: 200px;height: 25px;background: RGB(253,246,236);
    }
    .bottom_p2{
    	margin-top: 10px;width: 200px;height: 25px;background: RGB(234,243,253);
    }
    .dash_line{
        width:90%;
        height:20px;
        border-bottom:3px dashed #E4E4E4;
        position:relative;
        margin:0 auto;
        .processCorn{            
                position:absolute;
                top:10px;
                left:0;
                width:100%;
                display:flex;
                justify-content: space-around;
            li{
                width:10%;
                i{
                    display:block;
                    font-size:20px;
                }
                span{
                    display:block;
                }
                display:flex;
                flex-direction: column;
                align-items:center;

            }
        }
    }
    
        .bottom_line{
            width:100%;
            height:300px;
            background:url('/static/img/background.png') center center no-repeat ;
            background-size:85% 70%;
        }
/*.el-row {
	padding-left: 30px;
	margin-top: 30px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  	width:235px;
	height:150px;
	border:1px solid #409EFF;
	padding:10px 10px;
	font-size: 13px;
	align-items: center; 
	margin-right: 25px;
  	margin-bottom: 20px;
    .top_text{
                    font-size:48px;
                }
                
  }
  .el-col:hover{
  	box-shadow: 0 0 10px #CCCCCC;
  	
  }
  .el-row :nth-child(2n+1) {
  	.top_text {
  		color: RGB(95,184,120);
  	}
  }
  .el-row :nth-child(2n+2){
  		.top_text {
	  		color:#42A7DB;
	  	}
	}
	.el-row :nth-child(2n+3){
		.top_text {
	  		color:#F7A358;
	  	}
	}
	.el-row :nth-child(2n+4){
		.top_text {
	  		color:#5FB878;
	  	}
	}   */
.main{
    display:flex;
    justify-content: space-around;
    align-items: center;
    height:130px;
    width:100%;
    list-style:none;    
    .right{
    	padding: 0 5px 0 20px;
    }        
    li{
        width:20%;
        height:70px;
        border:1px solid RGB(247,163,88);
        border-radius: 5px;
        overflow: hidden;
        display:flex;
        align-items: center;                
        
        .left_text{
            font-size:30px;
            width: 80px;
            height: 70px;
            color: white;
            text-align: center;
            line-height: 70px;
            background: RGB(247,163,88);
        }
        p{
        	line-height: 20px;
        }
    }
 	li:hover{
 		box-shadow: 0 0 10px #CCCCCC;
 	}
 	li:nth-child(2){
 		border:1px solid RGB(64,158,255);
 		.left_text{
 			background: RGB(64,158,255);
 		}
 	}
 	li:nth-child(3){
 		border:1px solid RGB(95,184,120);
 		.left_text{
 			background: RGB(95,184,120);
 		}
 	}
 	li:nth-child(4){
 		border:1px solid RGB(64,158,255);
 		.left_text{
 			background: RGB(64,158,255);
 		}
 	}
}

	          
.tempWrap>ul>li:nth-child(2n+1){
	.line-first{
		background-position-y: 9px;
	}
	.title-left{
		background-position-y: 0px;
	}
	.title-center{
		color: red;
		background-position-y: -598px;
	}
	.title-right{background-position-y: -1200px;}
}
</style>