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
                <!--<div class="main">
                    <a>
                        <div class="top_text">850</div>
                        <div class="bottom">
                            <p class="bottom_p1">ftp</p>  
                            <p class="bottom_p2">vsftpd (before 2.0.8) or WU-FTPD</p>
                        </div>
                    </a>
                    <a>
                        <div class="top_text">80</div>
                        <div class="bottom">
                            <p class="bottom_p1">ftp</p>  
                            <p class="bottom_p2">vsftpd (before 2.0.8) or WU-FTPD</p>
                        </div>
                    </a>
                    <a>
                        <div class="top_text">80</div>
                        <div class="bottom">
                            <p class="bottom_p1">ftp</p>  
                            <p class="bottom_p2">vsftpd (before 2.0.8) or WU-FTPD</p>
                        </div>
                    </a>
                    <a>
                        <div class="top_text">80</div>
                        <div class="bottom">
                            <p class="bottom_p1">ftp</p>  
                            <p class="bottom_p2">vsftpd (before 2.0.8) or WU-FTPD</p>
                        </div>
                    </a>
                </div>-->
                <el-row :gutter="20" style="color: #606266;">
				  <el-col :span="4" v-for="(port,key) in fetchdata.port" :key="port.id">
				  	<div class="top_text" v-text="key"></div>
                        <div class="bottom">
                            <p class="bottom_p1" v-text="port.server"></p>  
                            <p class="bottom_p2" v-text="port.version"></p>
                        </div>
				  </el-col>
				</el-row>
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
									<!--<li class="item top" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li class="line-first" style="background-position-y: 9px;">2018年4月19日11:14:52</li>
												<li class="title"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -598px;">80 端口服务由 http 变为 ftp</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
												<li style="border-left: 1px solid rgb(248, 151, 130);height: 28px;"></li>
												<li style="border-left: 1px solid rgb(248, 151, 130);height: 28px;"></li>
												<li style="border-left: 1px solid rgb(248, 151, 130);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(248, 151, 130);">22: ssh openSSL</li>
												<li class="line-last line-point" style="background-position: 0px 0px;"></li>
											</ul>
										</div>
									</li>
									<li class="item bottom" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li style="border-left: 1px solid rgb(26, 132, 206);">80: ftp</li>
												<li style="border-left: 1px solid rgb(26, 132, 206);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(26, 132, 206);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(26, 132, 206);">8089: http nginx</li>
												<li class="title"><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -658px;">新增 8080 端口</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
												<li class="line-first" style="background-position-y: -93px;">2018年4月19日12:24:56</li>
												<li class="line-last line-point" style="background-position: 0px -20px;"></li>
											</ul>
										</div>
									</li>
									<li class="item top" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li class="line-first" style="background-position-y: -111px;">2018年4月19日12:24:56</li>
												<li class="title"><span class="title-left" style="background-position-y: -120px;">&nbsp;</span><span class="title-center" style="background-position-y: -718px;">90 端口服务器变动</span><span class="title-right" style="background-position-y: -1320px;">&nbsp;</span></li>
												<li style="border-left: 1px solid rgb(247, 162, 89);">80: ftp</li>
												<li style="border-left: 1px solid rgb(247, 162, 89);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(247, 162, 89);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(247, 162, 89);">8089: http nginx</li>
												<li class="line-last line-point" style="background-position: 0px -40px;"></li>
											</ul>
										</div>
									</li>
									<li class="item bottom" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li style="border-left: 1px solid rgb(67, 166, 218);">80: ftp</li>
												<li style="border-left: 1px solid rgb(67, 166, 218);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(67, 166, 218);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(67, 166, 218);">8089: http nginx</li>
												<li class="title"><span class="title-left" style="background-position-y: -180px;">&nbsp;</span><span class="title-center" style="background-position-y: -778px;">8090 端口关闭 22 端口由 ssh 变为 rdp</span><span class="title-right" style="background-position-y: -1380px;">&nbsp;</span></li>
												<li class="line-first" style="background-position-y: -213px;">2018年4月19日12:24:56</li>
												<li class="line-last line-point" style="background-position: 0px -60px;"></li>
											</ul>
										</div>
									</li>
									<li class="item top" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li class="line-first" style="background-position-y: -231px;">2018年5月19日12:24:56</li>
												<li class="title"><span class="title-left" style="background-position-y: -240px;">&nbsp;</span><span class="title-center" style="background-position-y: -838px;">90端口服务器变动</span><span class="title-right" style="background-position-y: -1440px;">&nbsp;</span></li>
												<li style="border-left: 1px solid rgb(249, 191, 59);">80: ftp</li>
												<li style="border-left: 1px solid rgb(249, 191, 59);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(249, 191, 59);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(249, 191, 59);">8089: http nginx</li>
												<li class="line-last line-point" style="background-position: 0px -80px;"></li>
											</ul>
										</div>
									</li>
									<li class="item bottom" style="width: 168px; float: left;">
										<div class="content">
											<ul>
												<li style="border-left: 1px solid rgb(136, 199, 204);">80: ftp</li>
												<li style="border-left: 1px solid rgb(136, 199, 204);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(136, 199, 204);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(136, 199, 204);">8089: http nginx</li>
												<li class="title"><span class="title-left" style="background-position-y: -300px;">&nbsp;</span><span class="title-center" style="background-position-y: -898px;">新开90端口</span><span class="title-right" style="background-position-y: -1500px;">&nbsp;</span></li>
												<li class="line-first" style="background-position-y: -333px;">2018年7月11日14:51:35</li>
												<li class="line-last line-point" style="background-position: 0px -100px;"></li>
											</ul>
										</div>
									</li>
									<li class="item top" style="width: 170px; float: left;">
										<div class="content">
											<ul>
												<li class="line-first" style="background-position-y: -351px;">2018年7月11日14:51:35</li>
												<li class="title"><span class="title-left" style="background-position-y: -360px;">&nbsp;</span><span class="title-center" style="background-position-y: -958px;">90 端口服务器变动</span><span class="title-right" style="background-position-y: -1560px;">&nbsp;</span></li>
												<li style="border-left: 1px solid rgb(239, 109, 95);">80: ftp</li>
												<li style="border-left: 1px solid rgb(239, 109, 95);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(239, 109, 95);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(239, 109, 95);">8089: http nginx</li>
												<li class="line-last line-point" style="background-position: 0px -120px;"></li>
											</ul>
										</div>
									</li>
									<li class="item bottom" style="width: 170px; float: left;">
										<div class="content">
											<ul>
												<li style="border-left: 1px solid rgb(96, 169, 110);">80: ftp</li>
												<li style="border-left: 1px solid rgb(96, 169, 110);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(96, 169, 110);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(96, 169, 110);">8089: http nginx</li>
												<li class="title"><span class="title-left" style="background-position-y: -420px;">&nbsp;</span><span class="title-center" style="background-position-y: -1018px;">新开90端口</span><span class="title-right" style="background-position-y: -1620px;">&nbsp;</span></li>
												<li class="line-first" style="background-position-y: -453px;">2018年7月12日14:51:35</li>
												<li class="line-last line-point" style="background-position: 0px -140px;"></li>
											</ul>
										</div>
									</li>
									<li class="item top" style="width: 170px; float: left;">
										<div class="content">
											<ul>
												<li class="line-first" style="background-position-y: -471px;">2018年7月12日15:51:35</li>
												<li class="title"><span class="title-left" style="background-position-y: -480px;">&nbsp;</span><span class="title-center" style="background-position-y: -1078px;">90 端口服务器变动</span><span class="title-right" style="background-position-y: -1680px;">&nbsp;</span></li>
												<li style="border-left: 1px solid rgb(240, 56, 82);">80: ftp</li>
												<li style="border-left: 1px solid rgb(240, 56, 82);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(240, 56, 82);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(240, 56, 82);">8089: http nginx</li>
												<li class="line-last line-point" style="background-position: 0px -160px;"></li>
											</ul>
										</div>
									</li>
									<li class="item bottom" style="width: 170px; float: left;">
										<div class="content">
											<ul>
												<li style="border-left: 1px solid rgb(58, 146, 132);">80: ftp</li>
												<li style="border-left: 1px solid rgb(58, 146, 132);">8080: nginx nginx 1.2</li>
												<li style="border-left: 1px solid rgb(58, 146, 132);">22: ssh openSSL</li>
												<li style="border-left: 1px solid rgb(58, 146, 132);">8089: http nginx</li>
												<li class="title"><span class="title-left" style="background-position-y: -540px;">&nbsp;</span><span class="title-center" style="background-position-y: -1138px;">新开90端口</span><span class="title-right" style="background-position-y: -1740px;">&nbsp;</span></li>
												<li class="line-first" style="background-position-y: -573px;">2018年7月12日16:10:35</li>
												<li class="line-last line-point" style="background-position: 0px -180px;"></li>
											</ul>
										</div>
									</li>-->
									<template v-for="(item,index) in fetchdata.event">
										<template v-if="index<fetchdata.event.length&&index%2==0">
									      <li class="item top" style="width: 170px;" :key="index">
												<div class="content">
													<ul>
														<li class="line-first" style="background-position-y: 9px;" v-text="fetchdata.event[index].created_at"></li>
														<li class="title" v-if="fetchdata.event[index].status ==0"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口关闭</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else-if="fetchdata.event[index].status ==1"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口开启</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -599px;">{{fetchdata.event[index].port}} 端口服务由 {{fetchdata.event[index].server}} 变为 {{fetchdata.event[index].version}}</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li style="border-left: 1px solid rgb(248, 151, 130);height: 20px;"></li>
														<li style="border-left: 1px solid rgb(248, 151, 130);height: 20px;"></li>
														<li style="border-left: 1px solid rgb(248, 151, 130);height: 20px;"></li>
														<li class="line-last line-point" style="background-position: 0px 0px;"></li>
													</ul>
												</div>
											</li>
											<li v-if="index<fetchdata.event.length-1" class="item bottom" style="width: 170px;" :key="index">
												<div class="content">
													<ul>
														<li style="border-left: 1px solid rgb(26, 132, 206);height: 20px;"></li>
														<li style="border-left: 1px solid rgb(26, 132, 206);height: 20px;"></li>
														<li style="border-left: 1px solid rgb(26, 132, 206);height: 20px;"></li>
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
.el-row {
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