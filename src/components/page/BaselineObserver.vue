<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i>基线监测 - {{basedata.ip}} - {{basedata.location}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <div class="title_top">当前基线端口</div>
                <div class="line_content">
                    <div class="left_line"></div>
                    <div class="right_line"></div>
                </div>
                <ul class="main" style="color: #606266;">
                    <li v-for="(port,key,index) in baseport.port" :key="index+1">
                        <div class="left_text" v-text="key"></div>
                        <div class="right">
                            <p class="top" v-text="port.server"></p>  
                            <p class="bottom" v-text="port.version"></p>
                        </div>
                    </li>
                   
                </ul>
            </div>           
        </div>
        <div class="container">
            <div class="head">
                <div class="title_top">历史基线</div>
                <div class="line_content">
                    <div class="left_line"></div>
                    <div class="right_line"></div>
                    <i class="iconfont "></i>
                </div>
            </div>
            <div class="historyLine">
                <div class="dash_line">
                    <div style="overflow:hidden; position:relative; height: 60px;">
                    	<ul class="processCorn" id="yearList" style="width: 100%; position: relative;margin-left: 45%;overflow: hidden;">
	                        <li v-for="(time,value,index) in historytime" :key="index+2"><i class="iconfont icon-danxuan"></i> <span v-text="time"></span></li>
	                    </ul>
                    </div>
                </div>
                <div class="hl_main">
                    <img @click="btnPrev()" class="left_arrow" src="/static/img/left.png" alt="">
                    <div class="middle" style="width: 530px;position: relative; overflow: hidden;margin-top: 50px;">
                        <ul class="middle_content" id="cUl">
                            <li v-for="(history,val,index) in basehistory" :key="index+3">
                            	<div style="width: 530px;">
                            		<ul>
			                            <li v-for="(hist,key,index) in history.port" :key="index+4">  {{key}}      {{hist.server}}     {{hist.version}}</li>
			                        </ul>
                            	</div>
                            </li>
                        </ul>
                    </div>
                    <img @click="btnNext()" class="right_arrow" src="/static/img/right.png" alt="">
                </div>
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
					<div class="wrapper">
						<div class="bd">
							<div class="tempWrap" style="overflow:hidden; position:relative; width: 96%;left:2%">
								<ul style="width: 4500px; left: 0; position: relative; overflow: hidden; padding: 0px; margin: 0px;">
									<template v-for="(item,index) in basedata.event">
										<template v-if="index<basedata.event.length&&index%2==0">
									      <li class="item top" style="width: 170px;" :key="index+5">
												<div class="content">
													<ul>
														<li class="line-first" style="background-position-y: 9px;" v-text="basedata.event[index].created_at"></li>
														<li class="title" v-if="basedata.event[index].status ==0"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -598px;line-height: 2.2em;">{{basedata.event[index].port}} 端口关闭</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else-if="basedata.event[index].status ==1"><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -598px;line-height: 2.2em;">{{basedata.event[index].port}} 端口开启</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="title" v-else><span class="title-left" style="background-position-y: 0px;">&nbsp;</span><span class="title-center" style="background-position-y: -598px;line-height: 2.2em;">{{basedata.event[index].port}} 端口服务由 {{basedata.event[index].server}} 变为 {{basedata.event[index].version}}</span><span class="title-right" style="background-position-y: -1200px;">&nbsp;</span></li>
														<li class="overauto" style="border-left: 1px solid rgb(248, 151, 130);width: 187px;height: 80px;overflow: hidden;">
															<div style="width: 204px;overflow-x: hidden;overflow-y: scroll;height: 80px;">
																<ul>
																	<li :key="'t'+key" v-for="(port,key) in basedata.event[index].history.port">{{key}}：{{port.server}} | {{port.version}}</li>
																</ul>
															</div>
														</li>
														<li class="line-last line-point" style="background-position: 0px 0px;"></li>
													</ul>
												</div>
											</li>
											<li v-if="index<basedata.event.length-1" class="item bottom" style="width: 170px;" :key="index+6">
												<div class="content">
													<ul>
														<li class="overauto" style="border-left: 1px solid rgb(26, 132, 206);width: 187px;height: 80px;overflow: hidden;">
															<div style="width: 204px;overflow-x: hidden;overflow-y: scroll;height: 80px;">
																<ul>
																	<li :key="'s'+key" v-for="(port,key) in basedata.event[index].history.port">{{key}}：{{port.server}} | {{port.version}}</li>
																</ul>
															</div>
														</li>
														<li class="title" v-if="basedata.event[index+1].status == 0"><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -658px;line-height: 2.2em;">{{basedata.event[index+1].port}} 端口关闭</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="title" v-else-if="basedata.event[index+1].status == 1"><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -658px;    line-height: 2.2em;">{{basedata.event[index+1].port}} 端口开启</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="title" v-else><span class="title-left" style="background-position-y: -60px;">&nbsp;</span><span class="title-center" style="background-position-y: -658px;line-height: 2.2em;">{{basedata.event[index+1].port}} 端口服务由 {{basedata.event[index+1].server}} 变为 {{basedata.event[index+1].version}}</span><span class="title-right" style="background-position-y: -1260px;">&nbsp;</span></li>
														<li class="line-first" style="background-position-y: -93px;" v-text="basedata.event[index+1].created_at"></li>
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
    export default {
    	name: 'baselineobserver',
        data: function(){
            return {
                includedComponents:'baselineobserver',
            	active:false,
            	n:0,
            	liNum:'',
            	w:530,
            	p:0,
            	leng:"",
            	basedata:[],
            	baseport:[],
            	basehistory:[],
            	historytime:[]
            }
        },
        methods:{
           fetchCustomers(){
	            this.$axios.get("api/ip/"+this.$route.query.id+"/base").then((res)=>{ 
	                switch (res.data.status) {
					        case 1:
					        	this.basedata = res.data.data;
					        	this.baseport = this.basedata.port;
					        	this.basehistory = this.basedata.history;
					        	var self = this;
					        	this.basehistory.forEach(function(base){
//					        		self.historytime.push(base.created_at.split(" ")[0]);
                                    self.historytime.push(base.created_at);
					        	})
                                break;
                            case 403:
									window.location.href = '/login';
								break;
					        default: this.$message.error(res.data.msg); break;
					    } 
	            });
		  	},
          
            //绑定右边点击事件
            btnNext: function(){
            	this.liNum = $("#cUl>li").length;
                if(this.n<this.liNum){
                    this.n++;
                    (this.n>=this.liNum)&&(this.n=0);
                    this.updata();
                }
            },
            //绑定左边点击事件
            btnPrev: function(){
            	this.liNum = $("#cUl>li").length;
                this.n--;
                (this.n<0)&&(this.n=this.liNum-1);
                this.updata();
            },
            updata(){
                $("#cUl").animate({left:-(this.w*this.n)+'px'},300);
                $("#yearList").animate({left:-((170)*this.n)+'px'},300);
                $(".processCorn").find("li").eq(this.n).addClass("active").siblings().removeClass("active");
            },
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
        },
        mounted(){
            var self = this;
                this.fetchCustomers();
        	setTimeout(function(){
                self.tempWidth();
        		$(".processCorn").find("li").eq(0).addClass("active");
        	},1500);
        },
        activated(){
        }
    }
  
</script>

<style scoped lang="less">
@import "../../../static/css/fishBone.css";
.container,ul,li,dl,dd,dt{
    padding:0;
    margin:0;
    font-size:14px;
}
ul,li{
    list-style:none;
}
.overauto li {
		padding-left: 0 !important;
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
            li{
                width:15%;
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
    .hl_main{
            display:flex;
            width:70%;
            margin:auto;
            align-items: center;
            padding:60px 0 30px 0;
            justify-content: space-between;
            .middle_content{
            	position: relative;
                width:530px;
                display:flex;
                ul{
                	
                	li{
	                    background:#5FB878;
	                    border-radius:20px;
	                    margin-bottom:10px;
	                    text-align:center;
	                    line-height:40px;
	                    color:#fff;
	                }
	                li:last-child{
	                    margin-bottom:0;
	                }
	                li:nth-child(1){
	                     background: #42A7DB;
	                    border:1px solid  #42A7DB;
	                }
	                li:nth-child(2){
	                    background: #FABF3A;
	                    border:1px solid  #FABF3A;
	                }
	                li:nth-child(3){
	                    background: #F13852; 
	                    border:1px solid #F13852;
	                }
	                 li:nth-child(4){
	                    background: #42A7DB;
	                    border:1px solid  #42A7DB;
	                }
	                li:hover{
	                    background:#fff;
	                    color:#000;
	                }
                }
                
            }
            img{
                width:30px;
                display:block;
            }
        }
  	.left_arrow:hover{
  		cursor: pointer;
  	}
    .right_arrow:hover{
    	cursor: pointer;
    } 
    .active{
		    color: red;
		}
</style>