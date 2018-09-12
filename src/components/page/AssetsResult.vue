<template>
	<div class="result">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item style=""><i><img style="width: 16px;height: 16px;vertical-align: middle;" src="../../../static/img/u7848.png"/></i> 资产梳理</el-breadcrumb-item>
          </el-breadcrumb>
			<div class="container">
				<div class="el-tree el-tree-node1" @click="openclose1($event)">
					<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
					<span >IP</span>
				</div>
				<div class="node1">
					<div v-if="result.ip_list==0" class="el-table__empty-block">
						<span class="el-table__empty-text" >暂无数据</span>
					</div>
					<template v-for="(result,index) in result.ip_list">
						<div :key="'g'+index" class="el-tree el-tree-node2" @click="openclose1($event)" v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)" style="margin-left: 28px;padding: 11px 0;">
							<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
							<span v-text="result.ip"></span>
							<el-button type="text" style="float: right;margin-right: 30px;padding: 2px 15px;" class="btnshow" @click="dialogVisible = true,dialog($event,result.ip,index)" :disabled="ipdisabled">纳入监测</el-button>
						</div>
						<div :key="index+'d'">
							<div class="el-tree el-tree-node3" @click="openclose1($event)" style="margin-left: 46px;">
								<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
								<span>服务器</span>
							</div>
							<div>
								<table rules="rows">
								    <tr align="center">
								        <th width="199">端口</th>
								        <th width="140">服务</th>
								        <th width="140">版本号</th>
								        <th></th>
								    </tr>
								    <tr :key="'a'+index" align="center" v-for="(port,key,index) in result.port">
								    	<td v-text="key"></td>
								    	<td v-text="port.service"></td>
								    	<td v-text="port.version"></td>
								    	<td></td>
								    </tr>
								</table>
								<div v-if="result.port==0" class="el-table__empty-block">
									<span class="el-table__empty-text" >暂无数据</span>
								</div>
							</div>
							<div class="el-tree el-tree-node3" @click="openclose1($event)" style="margin-left: 46px;">
								<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
								<span>网站</span>
							</div>
							<div>
								<table rules="rows">
								    <tr align="center">
								        <th width="199">网站</th>
								        <th width="140">CDN</th>
								        <th width="140">服务器</th>
								        <th width="140">CMS</th>
								        <th width="140">防火墙</th>
								        <th width="140">开发语言</th>
								        <th width="140">操作系统</th>
								        <th></th>
								        <th width="100" style="float: right;line-height: 40px;border: 0;">操作</th>
								    </tr>
								    <tr :key="'b'+index" align="center" v-for="(port,key,index) in result.domains" v-on:mouseenter="mouseEnter($event)" v-on:mouseleave="mouseLeave($event)">
								    	<td v-text="port.domain"></td>
								        <td v-text="port.webinfo.cdn"></td>
								        <td v-text="port.webinfo.server"></td>
								        <td v-text="port.webinfo.cms"></td>
								        <td v-text="port.webinfo.waf"></td>
								        <td v-text="port.webinfo.language">language</td>
								        <td v-text="port.webinfo.os">os</td>
								    	<td></td>
								    	<td width="100" style="float: right;line-height: 40px;border: 0;">
								    		<el-button type="text" class="btnshow"  @click="dialogVisible = true,dialog($event,result.ip,index)">纳入监测</el-button>
								    	</td>
								    </tr>
								</table>
								<div v-if="result.domains==0" class="el-table__empty-block">
									<span class="el-table__empty-text" >暂无数据</span>
								</div>
							</div>
						</div>
					</template>
				</div>
				
				<div class="el-tree el-tree-node1" @click="openclose1($event)">
					<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
					<span >网站</span>
				</div>
				<div>
					<div v-if="result.url_list==0" class="el-table__empty-block">
						<span class="el-table__empty-text">暂无数据</span>
					</div>
					<template v-for="(result,index) in result.url_list">
						<div :key="index" class="el-tree" @click="openclose1($event)" style="margin-left: 28px;padding: 11px 0;">
							<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
							<span v-text="result.domain"></span>
							<el-button type="text" :disabled="urldisabled" style="float: right;margin-right: 30px;padding: 2px 15px;" @click="urldialogVisible = true,urldialog($event,result.domain,index)">纳入监测</el-button>
						</div>
						<div :key="'ss'+result">
							<table rules="rows" class="wangzhan">
								    <tr align="center">
								        <th width="100">域名所有者</th>
								        <th width="100">注册邮箱</th>
								        <th width="100">域名注册商</th>
								        <th width="100">备案单位</th>
								        <th width="100">备案号</th>
								        <th width="100">域名过期时间</th>
								        <th width="100">DNS</th>
								        <th width="100">操作系统</th>
								        <th width="100">服务器</th>
								        <th width="100">IP</th>
								        <th width="100">开发语言</th>
								        <th width="100">数据库</th>
								        <th width="100">CMS</th>
								        <th width="100">IDC</th>
								        <th width="100">CDN</th>
								        <th width="100">waf</th>
								    </tr>
								    <tr align="center">
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.whois_name"
											  >
											  <slot name="content"><span v-text="result.webinfo.whois_name"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.whois_name"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.whois_mail"
											  >
											  <slot name="content" ><span v-text="result.webinfo.whois_mail"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.whois_mail"></el-button>
											</el-popover>
								    	</td>
								        <td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.whois_isp"
											  >
											  <slot name="content" ><span v-text="result.webinfo.whois_isp"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.whois_isp"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.whois_name"
											  >
											  <slot name="content" ><span v-text="result.webinfo.whois_name"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.whois_name"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.icp_id"
											  >
											  <slot name="content" ><span v-text="result.webinfo.icp_id"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.icp_id"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.whois_date"
											  >
											  <slot name="content"><span v-text="result.webinfo.whois_date"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.whois_date"></el-button>
											</el-popover>
								    	</td>
										<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.dns"
											  >
											  <slot name="content"><span v-text="result.webinfo.dns"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.dns"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.os"
											  >
											  <slot name="content"><span v-text="result.webinfo.os"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.os"></el-button>
											</el-popover>
								    	</td>
										<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.server"
											  >
											  <slot name="content"><span v-text="result.webinfo.server"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.server"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.ip"
											  >
											  <slot name="content"><span v-text="result.webinfo.ip"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.ip"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.language"
											  >
											  <slot name="content"><span v-text="result.webinfo.language"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.language"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.database"
											  >
											  <slot name="content"><span v-text="result.webinfo.database"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.database"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.cms"
											  >
											  <slot name="content"><span v-text="result.webinfo.cms"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.cms"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.idc"
											  >
											  <slot name="content"><span v-text="result.webinfo.idc"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.idc"></el-button>
											</el-popover>
								    	</td>
								    	<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.cdn"
											  >
											  <slot name="content"><span v-text="result.webinfo.cdn"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.cdn"></el-button>
											</el-popover>
								    	</td>
										<td>
								    		<el-popover
											  placement="top"
											  width="100"
											  trigger="hover"
											  v-show="result.webinfo.waf"
											  >
											  <slot name="content"><span v-text="result.webinfo.waf"></span></slot>
											  <el-button style="width: 80px;white-space:nowrap;overflow: hidden;border: 0;" slot="reference" v-text="result.webinfo.waf"></el-button>
											</el-popover>
								    	</td>
								    </tr>
								</table>
							<div class="el-tree" @click="openclose1($event)" style="margin-left: 48px;">
								<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
								<span>子域名</span>
							</div>
							<div>
								<table rules="rows">
								    <tr align="center">
								       <th width="180">网站</th>
								       <th width="180">服务器</th>
								        <th width="180">CDN</th>
								        <th width="180">防火墙</th>
								        <th width="180">CMS</th>
								        <th></th>
								    </tr>
								    <tr :key="'c'+key" align="center" v-for="(sub,key) in result.subdomain">
								    	<td v-text="sub.domain"></td>
								    	<td v-text="sub.webinfo.server"></td>
								        <td v-text="sub.webinfo.cdn"></td>
								        <td v-text="sub.webinfo.waf"></td>
								        <td v-text="sub.webinfo.cms"></td>
								    	<td></td>
								    </tr>
								</table>
								<div v-if="result.subdomain==0" class="el-table__empty-block">
									<span class="el-table__empty-text">暂无数据</span>
								</div>
							</div>
							<div class="el-tree" @click="openclose1($event)" style="margin-left: 46px;">
								<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
								<span>服务器</span>
							</div>
							<div>
								<table rules="rows">
								    <tr align="center">
								        <th width="180">端口</th>
								        <th width="180">服务</th>
								        <th width="180">版本号</th>
								        <th></th>
								    </tr>
								    <tr :key="'c'+index" align="center" v-for="(port,key,index) in result.port">
								    	<td v-text="key"></td>
								    	<td v-text="port.service"></td>
								    	<td v-text="port.version"></td>
								    	<td></td>
								    </tr>
								</table>
								<div v-if="result.port==0" class="el-table__empty-block">
									<span class="el-table__empty-text" >暂无数据</span>
								</div>
							</div>
						</div>
					</template>
				</div>
				<div class="el-tree el-tree-node1" @click="openclose1($event)">
					<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
					<span>邮箱</span>
				</div>
				<div>
					<div v-if="result.email_list==0" class="el-table__empty-block">
						<span class="el-table__empty-text">暂无数据</span>
					</div>
					<template v-for="result in result.email_list">
						<div :key="'qq'+result" class="el-tree" @click="openclose1($event)" style="margin-left: 28px;padding: 11px 0;">
							<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
							<span>abc@qq.com</span>
						</div>
						<div :key="'qs'+result">
							<div class="el-tree" @click="openclose1($event)" style="margin-left: 46px;">
								<span style="vertical-align: middle;"><img src="../../../static/img/箭头-ip_u7775.png"/></span>	
								<span>网站</span>
							</div>
							<div>
								<table rules="rows">
								    <tr align="center">
								        <th width="180">端口</th>
								        <th width="180">服务</th>
								        <th width="180">版本号</th>
								        <th></th>
								    </tr>
								    <tr :key="'d'+index" align="center" v-for="(port,key,index) in result.email_list">
								    	<td v-text="key"></td>
								    	<td v-text="port.service"></td>
								    	<td v-text="port.version"></td>
								    	<td></td>
								    </tr>
								</table>
								<div v-if="result.port==0" class="el-table__empty-block">
									<span class="el-table__empty-text" >暂无数据</span>
								</div>
							</div>
						</div>
					</template>
				</div>
				
			</div>
			<el-dialog
			  title="纳入监测"
			  :visible.sync="dialogVisible"
			  width="35%"
			  :close-on-click-modal="false"
			  :before-close="handleClose">
			  <div style="margin-top: 10px;" class="content_dia">
			  	
			  	<div class="observer">
			  		<el-radio-group v-model="radio" @change="radioChange">
					    <el-radio label="0">正常监测</el-radio>
  						<el-radio label="1">基线监测</el-radio>
					  </el-radio-group>
			  	</div>
			  	<div class="con_input" v-if="input_show">
			  		<el-input value="端口" readonly></el-input>
			  		<el-input value="版本" readonly></el-input>
			  		<el-input value="服务器" readonly></el-input>
		  			<div :key="'e'+index" v-for="(port,key,index) in portinput">
		  				<el-input :value="key"></el-input>
				  		<el-input :value="port.service"></el-input>
				  		<el-input :value="port.version" ></el-input>
				  		<i class="el-icon-remove" @click="deleteport(key,$event)"></i>
				  	</div>
				  	
			  		<el-input v-model="add_input1" ></el-input>
			  		<el-input v-model="add_input2"></el-input>
			  		<el-input v-model="add_input3"></el-input>
			  		<i class="el-icon-circle-plus" @click="addport()"></i>
			  		<div style="clear: both;font-size: 12px;"><i style="color: RGB(208,208,208);margin-right: 10px;font-size: 14px;" class="el-icon-question"></i>以上为基线监测信息，若信息有误，请手动纠正</div>
			  	</div>
			  	<div class="line"></div>
			  	<el-form label-width="100px">
		            <el-form-item label="所属单位">
		                <el-select v-model="assetsalertData.owner" filterable placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @change="selectunit" style="width:60%">
		                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.id">
		                    </el-option>
		                </el-select>
		            </el-form-item>
		            <!--<el-form-item label="名称">
		                <el-input v-model="assetsalertData.name" class="alertInput" placeholder="填写该网站名称(全称)"></el-input>
		            </el-form-item>
		            <el-form-item label="网址">
		                <el-input v-model="assetsalertData.url" class="alertInput" @blur="geturl" placeholder="填写该网站网址，格式：http://www.ah.gov.cn/"></el-input>
		            </el-form-item>-->
		            <el-form-item label="选择策略">
		                <el-select v-model="assetsalertData.resultgydata" placeholder="请选择策略" @change="addresultgyselect(assetsalertData.resultgydata)" style="width:60%">
		                    <el-option v-for="item in ip_resultgydata" :key="item.id" :label="item.name" :value="item.name">
		                    </el-option>
		                </el-select>
		            </el-form-item>
                    <el-form-item label="监控时间段">
                        <el-date-picker v-model="assetsalertData.startTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" :disabled="isdisable">
                        </el-date-picker>
                        -
                        <el-date-picker v-model="assetsalertData.endTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" :disabled="isdisable">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="每天时间段">
                            <el-select v-model="assetsalertData.startdaily" class="item-time" :disabled="isdisable">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item" ></el-option>
                                </el-select>
                                    -
                                <el-select v-model="assetsalertData.enddaily" class="item-time" :disabled="isdisable">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select> 
                    </el-form-item> 
                    <el-form-item label="可用性监测">
                                            
                        <el-switch v-model="assetsalertData.usability" :disabled="isdisable">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="端口变动">
                                            
                        <el-switch v-model="assetsalertData.port" :disabled="isdisable">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="assetsalertData.remark" :disabled="isdisable">
                        </el-input>
                    </el-form-item>    
		            <el-form-item label="网站标签:">
		                <el-tag :key="'e'+index" closable @close="closeSiteTag(item)" v-for="(item,index) in sitetag">
		                    {{item}}
		                </el-tag>
		                    <el-input
		                    class="input-new-tag"
		                    v-if="inputVisible"
		                    v-model="inputValue"
		                    ref="saveTagInput"
		                    size="small"
		                    @blur="handleInputConfirm"
		                    >
		                    </el-input>
		                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
		            </el-form-item>
		        </el-form>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="saveaddServerresultgy">确 定</el-button>
			  </span>
			</el-dialog>
			
			<el-dialog
			  title="纳入监测"
			  :visible.sync="urldialogVisible"
			  width="35%"
			  :close-on-click-modal="false"
			  :before-close="handleClose">
			  <div style="margin-top: 10px;" class="content_dia">
			  	<div class="observer">
			  		<el-radio-group v-model="radio1" @change="radioChange1">
					    <el-radio label="0">正常监测</el-radio>
  						<el-radio label="1">基线监测</el-radio>
					  </el-radio-group>
			  	</div>
			  	<div class="con_input urlinput" v-if="input_show1">
			  		<el-input value="域名所有者" readonly></el-input>
			  		<el-input value="DNS" readonly></el-input>
			  		<el-input value="IP" readonly></el-input>
			  		<el-input value="注册人" readonly></el-input>
		  				<el-input :value="urlport.webinfo.dns"></el-input>
				  		<el-input :value="urlport.webinfo.server"></el-input>
				  		<el-input :value="urlport.webinfo.ip"></el-input>
				  		<el-input :value="urlport.webinfo.whois_name"></el-input>
		  		
			  		<el-input v-model="add_input1"></el-input>
			  		<el-input value="服务器" readonly></el-input>
		  			<template v-for="(port,key,index) in result.port">
		  				<el-input :key="'f'+index" :value="key"></el-input>
				  		<el-input :key="'f'+index" :value="port.service" ></el-input>
				  		<el-input :key="'f'+index" :value="port.version" ></el-input>
				  		<el-input :key="'f'+index" :value="port.version"></el-input>
				  		<i :key="'f'+index" class="el-icon-remove" ></i>
		  			</template>
			  		<el-input v-model="add_input1"></el-input>
			  		<el-input v-model="add_input2"></el-input>
			  		<el-input v-model="add_input3"></el-input>
			  		<el-input v-model="add_input3"></el-input>
			  		<i class="el-icon-circle-plus"></i>-->
			  		<div style="clear: both;font-size: 12px;"><i style="color: RGB(208,208,208);margin-right: 10px;font-size: 14px;" class="el-icon-question"></i>以上为基线监测信息，若信息有误，请手动纠正</div>
			  	</div>
			  	<div class="line"></div>
			  	<el-form label-width="100px">
		            <el-form-item label="所属单位">
		                <el-select v-model="urlData.owner" filterable placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @change="selectunit" style="width:60%">
		                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.id">
		                    </el-option>
		                </el-select>
		            </el-form-item>
		            <el-form-item label="名称">
		                <el-input v-model="urlData.name" class="alertInput" placeholder="填写该网站名称(全称)" style="width:60%"></el-input>
		            </el-form-item>
		            <!--<el-form-item label="网址">
		                <el-input v-model="assetsalertData.url" class="alertInput" @blur="geturl" placeholder="填写该网站网址，格式：http://www.ah.gov.cn/"></el-input>
		            </el-form-item>-->
		            <el-form-item label="选择策略">
		                <el-select v-model="urlData.resultgydata" placeholder="请选择策略" @change="addStrategyselect(urlData.resultgydata)" style="width:60%">
		                    <el-option v-for="item in resultgydata" :key="item.id" :label="item.name" :value="item.name">
		                    </el-option>
		                </el-select>
		            </el-form-item>
                    <div v-if="urlData.selectd" class="hideStrate">
                <el-form-item label="监控时间段">
                    <el-date-picker v-model="urlData.startTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    -
                    <el-date-picker v-model="urlData.endTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="每天时间段">
                                <el-select class="item-mini-select" v-model="urlData.startdaily" :disabled="isdisable">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                    -
                                <el-select class="item-mini-select" v-model="urlData.enddaily" :disabled="isdisable">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select> 
                </el-form-item>
                <el-form-item label="首页监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    网站可用性,首页敏感词、篡改、劫持监测
                                </div>
                                
                        </div>
                        <div class="block">
                                    <el-slider
                                    v-model="urlData.homemonitoringNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
                                    :disabled="isdisable"
                                    >
                                    </el-slider>
                                </div>

                </el-form-item>
                <el-form-item label="图片篡改">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    网站首页反共图片监测
                                </div>
                        </div>                       
                        <div class="block">
                                <el-slider
                                    v-model="urlData.photoTamperingNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
                                    :disabled="isdisable"
                                    >
                                </el-slider>
                        </div>
                </el-form-item>
                <el-form-item label="劫持监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    网站内页劫持、敏感词、暗链篡改、敏感js
                                </div>
                        </div>                        
                        <div class="block">
                                <el-slider
                                    v-model="urlData.hijackedNum"
                                    :format-tooltip="changestep"
                                    :step="33"
                                    :disabled="isdisable"
                                    >
                                </el-slider>
                        </div>                    
                </el-form-item>
                <el-form-item label="深度监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    深度监测网站内页存在的劫持,敏感词及敏感信息泄露
                                </div>
                        </div>                        
                        <div class="block">
                                <el-slider
                                    v-model="urlData.monitoringNum"
                                    :format-tooltip="changestep"
                                    :step="25"
                                    :disabled="isdisable"
                                    >
                                </el-slider>
                        </div>
                </el-form-item>
                <el-form-item label="域名监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    所有人变更、备案、dns、解析ip、过期时间、是否开启泛解析
                                </div>
                        </div>                        
                        <div class="block">
                                <el-slider
                                    v-model="urlData.domainmonitorNum"
                                    :format-tooltip="changestep1"
                                    :step="33"
                                    :disabled="isdisable"
                                    >
                                </el-slider>
                        </div>
                </el-form-item>
                <el-form-item label="情报威胁">
                    <el-switch v-model="urlData.delivery"></el-switch>
                </el-form-item>    
                   <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="urlData.remark" :disabled="isdisable">
                        </el-input>
                    </el-form-item> 
            </div>
            <div v-show="urlData.resultgydata" class="hidebox">
                <el-form-item label="可用性监测">
                     <div class="icon">
                        <i class="el-icon-question"></i>
                        <div class="tips">
                            <div class="border"></div>
                            分布式监测该应用的可用性与延时状况
                        </div>
                    </div>                   
                    <el-switch v-model="urlData.delivery1"></el-switch>
                </el-form-item>
                <div v-show="urlData.delivery1">
                    告警策略
                    <div class="dborder"></div>
                    <el-form-item label="异常条件" class="abnormal">
                        当响应时间大于&nbsp;
                        <div style="margin-right: 0px;" class="item-mini-input">
                                 <el-input type="number" v-model="urlData.resTime" style="width: 45px;">
                                    <template slot="append">ms</template>
                                </el-input>
                        </div>&nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                        <div class="item-mini-input">
                            <el-input min="0" type="number" v-model="urlData.threat_count"></el-input>
                        </div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;
                        <div class="item-mini-input">
                            <el-input min="0" v-model="urlData.continue_count" type="number"></el-input>
                        </div>&nbsp;次时进行报警。
                    </el-form-item>
                    <el-form-item label="警告次数">
                        监控将最多发出&nbsp;
                        <div class="item_input" style="display: inline-block;">
                            <el-select v-model="urlData.notice_count" placeholder="">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                            </el-select>
                        </div>&nbsp;次警告
                    </el-form-item>
                    <el-form-item label="自定义cookie" class="custom">
                        <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="urlData.custom">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否跟随跳转">
                        <el-switch v-model="urlData.jump"></el-switch>
                        <div class="msg">
                            <p class="msg">
                                <span>*</span> 默认监测跳转后的状态码
                            </p>
                        </div>
                    </el-form-item>
                </div>
            </div>
             <el-form-item label="关联单位">
                <el-select v-model="urlData.unit" style="width:80%;" filterable placeholder="表示该单位也需要接受或查看该网站的威胁，支持多个单位共同关注" class="selectType"
                    @change="selectType">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="addTag()">添加</el-button>
            </el-form-item>
            <el-form-item class="unitTag">
                <el-tag :key="'fg'+index" closable @close="closeUnitTag(item)" v-for="(item,index) in unitData">
                    {{item}}
                </el-tag>
            </el-form-item>
            <el-form-item label="网站标签:">
                <el-tag :key="'fs'+index" closable @close="closeSiteTag(item)" v-for="(item,index) in sitetag">
                    {{item}}
                </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
            </el-form-item>
		        </el-form>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="urldialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="siteMonitoring">确 定</el-button>
			  </span>
			</el-dialog>
        </div>
	</div>
</template>

<script>
    export default {
    	name: 'assetsresult',
        data: function(){
            return {
				includedComponents:'assetsresult',
            	tr:"",
            	tableData1: [],
            	tableData2: [],
            	iplist:[],
            	portinput:[],
				result:[],
				dialogVisible: false,
				urldialogVisible: false,
				radio: '0',
				radio1: '0',
				btnshow: false,
				dia:[],
				route: '',
				ip_input: "",
				domain: "",
				add_input1:"",
				add_input2:"",
				add_input3:"",
				input_show: false,
				input_show1: false,
				inputVisible: false,
				inputValue: '',
                resultgyId:'',
                unitData: [],               
                serverId:'',
                isdisable:false,
                ipdisabled:false,
                urldisabled:false,
                assetsalertData: {
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    resultgydata: '',
                    startTime: '',
                    endTime: '',
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    resTime:'',
                    ip:'',
                    port:'',
                    usability:''
                },   
                urlData:{
                	ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    resultgydata: '',
                    strategydata: '',
                    startTime: '',
                    endTime: '',
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    resTime:'',
                    domainmonitor: '1天',
                    homemonitoring: '1小时',
                    photoTampering: '15分钟',
                    hijacked: '1天',
                    monitoring: '1天',
                    remark: '',
                    delivery: false,
                    delivery1: false,
                    jump:false,
                    threat_count:'',
                    continue_count:'',
                    notice_count:'',
                    strategynote: '',
                    sitenote: '',
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum: 0,
                    domainmonitorNum: 0,
                    homemonitoringNum1: '',
                    photoTamperingNum1: '',
                    hijackedNum1: '',
                    monitoringNum1: '',
                    domainmonitorNum1: ''
                },
                remark: '',
                configure_id:[],
                urlconfigure_id:[],
                configure:[],
                port:[],
                Data2:[],
                unitId:[],       
                dayTime:[],
                resultgydata: [],  
                ip_resultgydata: [],
				optionssite: [],
				sitetag:[],
				urlport:[]
            }
        },
        methods:{
        	radioChange(){
          		 if(this.radio ==0){
          		 	this.input_show = false;
          		 }else{
          		 	this.input_show = true;
          		 }
        		
        	},
        	radioChange1(){
          		 if(this.radio1 ==0){
          		 	this.input_show1 = false;
          		 }else{
          		 	this.input_show1 = true;
          		 }
        		
        	},
		      openclose1(event){
		      	$(event.currentTarget).next().slideToggle("fast");
		      	
		      	var nowDeg = $(event.currentTarget).find("img").css("transform");
		      	function getmatrix(a,b,c,d){
				    var aa=Math.round(180*Math.asin(a)/ Math.PI);
				    var bb=Math.round(180*Math.acos(b)/ Math.PI);
				    var cc=Math.round(180*Math.asin(c)/ Math.PI);
				    var dd=Math.round(180*Math.acos(d)/ Math.PI);
				    var deg=0;
				    if(aa==bb||-aa==bb){
				        deg=dd;
				    }else if(-aa+bb==180){
				        deg=180+cc;
				    }else if(aa+bb==180){
				        deg=360-cc||360-dd;
				    }
				    return deg>=360?0:deg;
				    //return (aa+','+bb+','+cc+','+dd);
				}
				var values = nowDeg.split('(')[1].split(')')[0].split(',');
				var a = values[0];
				var b = values[1];
				var c = values[2];
				var d = values[3];
				nowDeg = getmatrix(a,b,c,d);
		      
		      	if(nowDeg == 90){
		      		$(event.currentTarget).find("img").css("transform","rotate(0deg)");
		      	}else{
		      		$(event.currentTarget).find("img").css("transform","rotate(90deg)");
		      	}
		      },
		      handleClose(done) {
//		        this.$confirm('确认关闭？')
//		          .then(_ => {
//		            done();
//		          })
//		          .catch(_ => {});
		          done();
		      },
		      mouseEnter(event){
		      	$(event.currentTarget).find(".btnshow").css("visibility","visible");
		      },
		      mouseLeave(event){
		      	$(event.currentTarget).find(".btnshow").css("visibility","hidden");
		      },
		      dialog(event,ip,index){
//		      	console.log($(event.currentTarget).parent());
					this.sitetag = [];
					event.stopPropagation();
					this.ip_input = ip;
					this.portinput = this.iplist[index].port;
		      },
		      urldialog(event,domain,index){
		      	event.stopPropagation();
		      	this.sitetag = [];
		      	this.domain =domain+"\/";
				this.geturl();
				this.urlport = this.result.url_list[index];
		      },
            getdata(){
            	this.route = this.$route.query.id;
        		this.$axios.get("api/asset/"+this.route).then((res) => {
	                switch (res.data.status) {
						        case 1:
						        	var _self = this;
//						        	var Data1;
//						        	const Data2=[];
						        	var result = res.data;
						        	this.result = result.data;
						        	this.iplist = this.result.ip_list;
//						        	this.iplist.forEach(function(ip){
//						        		Data1 = ip.port;
//						        	});
//						        	for(var name in Data1){
//										Data2.push({ port: name,server:Data1[name].service,version:Data1[name].version});
//									}
//						        	this.Data2 = Data2;
//						        	console.log(this.tableData2);
									break;
								case 403:
									window.location.href = '/login';
								break;
						        default:  break;
						    } 
	            }).catch(v => {
	                    console.log(v);
	             });
        	},
        	deleteport(key,event){
        		delete this.portinput[key];
        		$(event.currentTarget).parent().empty();
        	},
        	addport(){
        		if(this.add_input1&&this.add_input2&&this.add_input3){
	        		this.portinput[this.add_input1]= {service: this.add_input2, version: this.add_input3};
	        		console.log(this.portinput);
        		}
        		this.add_input1 = "";
        		this.add_input2 = "";
        		this.add_input3 = "";
        	},
        saveaddServerresultgy(){
        		const Data2=[];
                for(var name in this.portinput){
					Data2.push({ port: parseInt(name),server:this.portinput[name].service,version:this.portinput[name].version});
				}
            	if(this.configure_id == 0){
            		this.configure = {
	                	name:this.assetsalertData.resultgydata,
	                    start:this.assetsalertData.startTime,
	                    end:this.assetsalertData.endTime,
	                    daily_start:this.assetsalertData.startdaily,
	                    daily_end:this.assetsalertData.enddaily,
	                    remark:this.assetsalertData.remark,
	                    usability:Number(this.assetsalertData.usability),
	                    port:Number(this.assetsalertData.port)
	                };
	                this.$axios.post('api/ip',{
	                	owner_id:this.assetsalertData.owner,
	                	ip:this.ip_input,
	                	configure:this.configure,
	                	type:this.radio,
	                	port:Data2 
	                    
	                }).then((res)=>{
	                    if(res.data.status == 1){
	                        this.$message.success(res.data.msg);
	                        this.dialogVisible = false;
	                    }else{
	                        this.$message.error(res.data.msg);
	                    }
	                })
            	}else{
            		this.configure = this.configure_id;
	               this.$axios.post('api/ip',{
	                	owner_id:this.assetsalertData.owner,
	                	ip:this.ip_input,
	                	configure_id:this.configure,
	                	type:this.radio,
	                	port:Data2
	                    
	                }).then((res)=>{
	                    if(res.data.status == 1){
	                        this.$message.success(res.data.msg);
	                        this.dialogVisible = false;
	                    }else{
	                        this.$message.error(res.data.msg);
	                    }
	                })
            	}
            },
            siteMonitoring(){
	            if(this.urlconfigure_id == 0){
	            	 switch (this.urlData.homemonitoringNum) {
	            	 			case 99:
	                            this.urlData.homemonitoringNum1 =5 ;
	                                break;
	                            case 82.5:
	                            this.urlData.homemonitoringNum1 = 15;
	                                break;
	                            case 66:
	                            this.urlData.homemonitoringNum1 = 30;
	                                break;                    
	                            case 49.5:
	                            this.urlData.homemonitoringNum1 = 60;
	                                break;
	                            case 33:
	                            this.urlData.homemonitoringNum1 = 360;
	                                break;
	                            case 16.5:
	                            this.urlData.homemonitoringNum1 = 1440;
	                                break;                                       
	                            default:
	                            this.urlData.homemonitoringNum1 = 0;
	                                break;
                            };
                            switch (this.urlData.photoTamperingNum) {
                            	case 99:
	                            this.urlData.photoTamperingNum1 = 5;
	                                break;
	                            case 82.5:
	                            this.urlData.photoTamperingNum1 = 15;
	                                break;
	                            case 66:
	                            this.urlData.photoTamperingNum1 = 30;
	                                break;
	                            case 49.5:
	                            this.urlData.photoTamperingNum1 = 60;
	                                break;                    
	                            case 33:
	                            this.urlData.photoTamperingNum1 = 360;
	                                break;  
	                            case 16.5:
	                            this.urlData.photoTamperingNum1 = 1440;
	                                break;                                       
	                            default:
	                            this.urlData.photoTamperingNum1 = 0;
	                                break;
                            };
                            switch (this.urlData.hijackedNum) {
                            	case 99:
	                            this.urlData.hijackedNum1 = 360;
	                                break;
	                            case 66:
	                            this.urlData.hijackedNum1 = 1440;
	                                break;
	                            case 33:
	                            this.urlData.hijackedNum1 = 4320;
	                                break;                                                        
	                            default:
	                            this.urlData.hijackedNum1 = 0;
	                                break;
                            };

                            switch (this.urlData.monitoringNum) {
                                case 100:
	                            this.urlData.monitoringNum1 = 60;
	                                break;
	                            case 75:
	                            this.urlData.monitoringNum1 = 360;
	                                break;
	                            case 50:
	                            this.urlData.monitoringNum1 = 1440;
	                                break;
	                            case 25:
	                            this.urlData.monitoringNum1 = 4320;
	                                break;                          
	                            default:
	                            this.urlData.monitoringNum1 = 0;
	                                break;
                            };
                    
                            switch (this.urlData.domainmonitorNum) {
                                case 99:
                                this.urlData.domainmonitorNum1 = 1440;
                                    break;
                                case 66:
                                this.urlData.domainmonitorNum1 = 4320;
                                    break;
                                case 33:
                                this.urlData.domainmonitorNum1 = 10080;
                                    break;                                                            
                                default:
                                this.urlData.domainmonitorNum1 = 0;
                                    break;
                        };
            		this.configure = {
	                    start:this.urlData.startTime,
	                    end:this.urlData.endTime,
	                    daily_start:this.urlData.startdaily,
	                    daily_end:this.urlData.enddaily,
	                    index: this.urlData.homemonitoringNum1,
	                    picture: this.urlData.photoTamperingNum1,
	                    hack: this.urlData.hijackedNum1,
	                    deep: this.urlData.monitoringNum1,
	                    domain: this.urlData.domainmonitorNum1,
	                    notice: Number(this.urlData.delivery),
	                    remark:this.urlData.remark,
	                    usability:Number(this.urlData.delivery1),
                        delay:Number(this.urlData.resTime),
                        threat_count:Number(this.urlData.threat_count),
                        continue_count:Number(this.urlData.continue_count),
                        notice_count:Number(this.urlData.notice_count),
                        cookie:Number(this.urlData.custom),
                        jump:Number(this.urlData.jump)
	                };
	                this.$axios.post('api/site',{
	                	owner_id:this.urlData.owner,
	                	name:this.urlData.name,
	                	domain:this.domain,
	                	configure:this.configure,
	                	remark:this.remark,
	                	superior:this.unitId,
	                	tags: this.sitetag,
	                	type:this.radio1,
	                }).then((res)=>{
	                    if(res.data.status == 1){
	                        this.$message.success(res.data.msg);
	                        this.urldialogVisible = false;
	                    }else{
	                        this.$message.error(res.data.msg);
	                    }
	                })
            	}else{
            		this.configure = this.urlconfigure_id;
	               this.$axios.post('api/site',{
	                	owner_id:this.urlData.owner,
	                	name:this.urlData.name,
	                	domain:this.domain,
	                	configure_id:this.configure,
	                	remark:this.remark,
	                	superior:this.unitId,
	                	tags:this.sitetag,
	                	type:this.radio1,
	                	usability:Number(this.urlData.delivery1),
                        delay:Number(this.urlData.resTime),
                        threat_count:Number(this.urlData.threat_count),
                        continue_count:Number(this.urlData.continue_count),
                        notice_count:Number(this.urlData.notice_count),
                        cookie:Number(this.urlData.custom),
                        jump:Number(this.urlData.jump)
	                    
	                }).then((res)=>{
	                    if(res.data.status == 1){
	                        this.$message.success(res.data.msg);
	                        this.urldialogVisible = false;
	                    }else{
	                        this.$message.error(res.data.msg);
	                    }
	                })
            	}
            },
            addStrategyselect(val) {
                for (var i = 0; i < this.resultgydata.length; i++) {
                    if (this.resultgydata[i].name.indexOf(val) == 0) {
                        this.urlconfigure_id = this.resultgydata[i].id;
                    }
                };
				if(this.urlconfigure_id == 0){
					this.isdisable = false;
					this.iscustom = true;
                    this.urlData.selectd = true;
				}else{
					this.$axios.get('api/siteConfigure/'+this.urlconfigure_id).then((res)=>{
                        let data = res.data.data;
                            this.urlData.endTime = data.end;
                            this.urlData.startTime = data.start;
                            this.urlData.startdaily = data.daily_start;
                            this.urlData.enddaily = data.daily_end;
                            this.urlData.homemonitoringNum1 = data.index;
                            this.urlData.photoTamperingNum1 = data.picture;
                            this.urlData.hijackedNum1 = data.hack;
                            this.urlData.monitoringNum1 = data.deep;
                            this.urlData.domainmonitorNum1 = data.domain;
                            this.urlData.delivery1 = Boolean(data.usability);
                            this.urlData.resTime = data.delay ?  data.delay : '';
                            this.urlData.threat_count = data.threat_count;
                            this.urlData.continue_count = data.continue_count;
                            this.urlData.notice_count = data.notice_count;
                            this.urlData.custom = data.cookie;
                            this.urlData.jump = Boolean(data.jump);
                            this.iscustom = true;
                            this.urlData.selectd = true;
                       switch (this.urlData.homemonitoringNum1) {
                            case 5:
                            this.urlData.homemonitoringNum = 99;
                                break;
                            case 15:
                            this.urlData.homemonitoringNum = 82.5;
                                break;
                            case 30:
                            this.urlData.homemonitoringNum = 66;
                                break;                    
                            case 60:
                            this.urlData.homemonitoringNum = 49.5;
                                break;
                            case 360:
                            this.urlData.homemonitoringNum = 33;
                                break;
                            case 1440:
                            this.urlData.homemonitoringNum = 16.5;
                                break;                                       
                            default:
                            this.urlData.homemonitoringNum = 0;
                                break;
                        };
                    
                        switch (this.urlData.photoTamperingNum1) {
                            case 5:
                            this.urlData.photoTamperingNum = 99;
                                break;
                            case 15:
                            this.urlData.photoTamperingNum = 82.5;
                                break;
                            case 30:
                            this.urlData.photoTamperingNum = 66;
                                break;
                            case 60:
                            this.urlData.photoTamperingNum = 49.5;
                                break;                    
                            case 360:
                            this.urlData.photoTamperingNum = 33;
                                break;  
                            case 1440:
                            this.urlData.photoTamperingNum = 16.5;
                                break;                                       
                            default:
                            this.urlData.photoTamperingNum = 0;
                                break;
                        };
                        switch (this.urlData.hijackedNum1) {
                            case 360:
                            this.urlData.hijackedNum = 99;
                                break;
                            case 1440:
                            this.urlData.hijackedNum = 66;
                                break;
                            case 4320:
                            this.urlData.hijackedNum = 33;
                                break;                                                        
                            default:
                            this.urlData.hijackedNum = 0;
                                break;
                        };

                        switch (this.urlData.monitoringNum1) {
                            case 60:
                            this.urlData.monitoringNum = 100;
                                break;
                            case 360:
                            this.urlData.monitoringNum = 75;
                                break;
                            case 1440:
                            this.urlData.monitoringNum = 50;
                                break;
                            case 4320:
                            this.urlData.monitoringNum = 25;
                                break;                          
                            default:
                            this.urlData.monitoringNum = 0;
                                break;
                        };
                    
                            switch (this.urlData.domainmonitorNum1) {
                                case 1440:
                                this.urlData.domainmonitorNum = 99;
                                    break;
                                case 4320:
                                this.urlData.domainmonitorNum = 66;
                                    break;
                                case 10080:
                                this.urlData.domainmonitorNum = 33;
                                    break;                                                            
                                default:
                                this.urlData.domainmonitorNum = 0;
                                    break;
                            };
            		})
					this.isdisable = true;
				}
            },
            
            changestep(val){
                switch (val) {
                    case 25:
                        return 3+'天1次'
                        break;
                    case 60:
                        return 1+'小时1次'
                        break;
                    case 360:
                        return 6+'小时1次'
                        break;                                         
                    case 50:
                        return 1+'天1次'
                        break;
                    case 1440:
                        return 1+'天1次'
                        break;                                          
                    case 75:
                        return 6+'小时1次'
                        break; 
                    case 4320:
                        return 3+'天1次'
                        break;
                    case 33:
                        return 3+'天1次'
                        break;
                    case 66:
                        return 1+'天1次'
                        break;
                    case 99:
                        return 1+'小时1次'
                        break;
                    case 100:
                        return 1+'小时1次'
                        break;                                                                                                                     
                    default:
                        return val
                        break;
                }
            },
            changestep1(val){
                switch (val) {
                    case 33:
                        return 7+'天1次'
                        break;
                    case 66:
                        return 3+'天1次'
                        break;
                    case 99:
                        return 1+'天1次'
                        break;
                    case 100:
                        return 1+'天1次'
                        break;
                    case 1440:
                        return 1+'天1次'
                        break;     
                    case 4320:
                        return 3+'天1次'
                        break;                      
                    case 10080:
                        return 7+'天1次'
                        break;                       

                    default:
                        return val
                        break;
                }
            },
            changestep2(val){  
                switch (val) {
                    case 16.5:
                        return 1+'天1次'
                        break;
                    case 5:
                        return 5+'分钟1次'
                        break;                      
                    case 15:
                        return 15+'分钟1次'
                        break;
                    case 30:
                        return 30+'分钟1次'
                        break;                      
                    case 60:
                        return 1+'小时1次'
                        break;                      
                    case 33:
                        return 6+'小时1次'
                        break;
                    case 49.5:
                        return 1+'小时1次'
                        break;
                    case 66:
                        return 30+'分钟1次'
                        break;
                    case 82.5:
                        return 15+'分钟1次'
                        break;
                    case 99:
                        return 5+'分钟1次'
                    case 100:
                        return 5+'分钟1次'
                        break;
                    case 360:
                        return 6+'小时1次'
                        break;     
                    case 1440:
                        return 1+'天1次'
                        break;                                                               
                    default:
                        return val;
                        break;
                }
            },
            selectType(value) {
                this.tagVal = value;
            },        
            closeUnitTag(tag) {
                this.unitData.splice(this.unitData.indexOf(tag), 1);
//              this.unitData2.splice(this.unitData2.indexOf(tag), 1);
            },
             closeSiteTag(tag) {
                this.sitetag.splice(this.sitetag.indexOf(tag), 1);
//              this.sitetag2.splice(this.sitetag2.indexOf(tag), 1);
            },     
              showInput() {
                    this.inputVisible = true;
                    this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                    });
            },
            handleInputConfirm() {
                    let inputValue = this.inputValue;
                    if(!inputValue){
                        this.inputVisible = false;
                        return;
                    }
                    if (this.sitetag.indexOf(this.inputValue) !== -1) {
                        this.$message.error('请勿重复添加');
                        this.inputVisible = false;
                        this.inputValue = '';
                        return;
                    }else{
                        this.sitetag.push(this.inputValue);
                        this.inputValue = '';
                    }
                    this.inputVisible = false;
            },
            addTag() {
                if (!this.tagVal) {
                    this.$message.error('请选择关联单位');
                } else {
                    if (this.unitData.indexOf(this.tagVal) !== -1) {
                        this.$message.error('请勿重复添加');
                    } else {
                        this.unitData.push(this.tagVal);
                        for (var i = 0; i < this.optionssite.length; i++) {
                            if (this.optionssite[i].owner.indexOf(this.tagVal) !== -1) {
                                this.unitId.push(this.optionssite[i].id);
                            }
                        }
                    };
                }
            },
            selectunit(row) {
                for (var i = 0; i < this.optionssite.length; i++) {
                    if (this.optionssite[i].owner.indexOf(this.assetsalertData.owner) !== -1) {
                        this.selectedUnit = this.optionssite[i];
                    }
                }
            }, 
            geturl() {
                this.$axios.get('api/getTags', {
           			params: {
                        url: this.domain
                    }
                }).then((res) => {
                    this.sitetag = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },  
            addresultgyselect(val) {
                for (var i = 0; i < this.ip_resultgydata.length; i++) {
                    if (this.ip_resultgydata[i].name.indexOf(val) == 0) {
                        this.configure_id = this.ip_resultgydata[i].id;
                    }
                };
                if(this.configure_id == 0){
                	this.isdisable = false;
                }else{
                	this.$axios.get('api/ipConfigure/'+this.configure_id).then((res)=>{
                        let data = res.data.data;
                            this.assetsalertData.endTime = data.end;
                            this.assetsalertData.startTime = data.start;
                            this.assetsalertData.startdaily = data.daily_start;
                            this.assetsalertData.enddaily = data.daily_end;
                            this.assetsalertData.usability = data.usability=1?true:false;
                         	this.isdisable = true;
            		})
                }
            },                           
            createTime(){
                    for(var i=0;i<25;i++){
                        this.dayTime.push(i);
                    };
            },
        },
        created(){
        	
        },
		mounted: function (){
        	this.getdata();
        	this.createTime();
            this.$axios.get("api/siteConfigure/select/all").then((res) => {
                let data = res.data;
                this.resultgydata = data.data;
                this.resultgydata.push({"id":0,"name":"自定义策略"});
            }).catch(v => {
                    console.log(v);
            });
			this.$axios.get("api/ipConfigure/select/all").then((res) => {
                let data = res.data;
                this.ip_resultgydata = data.data;
                this.ip_resultgydata.push({"id":0,"name":"自定义策略"});
            }).catch(v => {
                    console.log(v);
            });
            this.$axios.get("api/owner/select/all").then((res) => {
                let data = res.data;
                this.optionssite = data.data;
            }).catch(v => {
                    console.log(v);
            });
       },
        watch:{
        	$route(){
		        this.route = this.$route.query.id
		      },
		      route() {
		      	if(this.route!==undefined){
		      		this.getdata()
		      	}
			        
			      }
        }
    }
  
</script>

<style scoped lang="less">
.container{
	margin-top: 20px;
	padding: 20px 25px;
}
.el-table {
	text-align: center;
}
.el-tree{
	cursor: pointer;
	font-size: 14px;
	border-bottom: 1px solid #e6e7e7;
	padding: 10px 0;
	margin-bottom: 0;
}
.el-tree span:nth-child(2){
	margin-left: 5px;
}
.node1 img{
	width: 12px;
	height: 12px;
}
.el-tree img {
	width: 12px;
	height: 12px;
}
.tree_text span{
	color: RGB(64,158,255);
}
table{
	/*border: 1px solid RGB(230,230,230);*/
	margin-left: 36px; 
	font-size: 14px;color: #5a5e66;font-weight: 400;width: 97%;border-bottom: 1px solid RGB(230,230,230);
}
table th{
	color: #5a5e66;font-weight: 400;height: 40px;
}
table td{
	color: #5a5e66;height: 40px;font-size: 12px;
}
table tr{
	border-bottom: 1px solid RGB(230,230,230);
}
table tr:hover{
	background: RGB(245,247,251);
	}
.wangzhan tr:hover{
	background: white;
	}
.el-tree-node1{
	/*background: RGB(242,242,242);*/
	padding: 10px 10px;
	border-bottom: 1px solid RGB(231,231,231);
}
.line{
	clear: both;
	width: 100%;
	height: 1px;
	background: RGB(231,231,231);
	margin: 20px 0;
	
}
.container img{
	transform: rotate(90deg);
}
.btnshow{
	visibility: hidden;
}

/*.con_input .el-input:nth-child(1){
	margin-left: 20px;
}
.con_input .el-input:nth-child(4){
	margin-left: 20px;
}*/
.observer{
	padding-top: 20px;clear: both;
}
.observer>.el-radio-group{
	float: left;
	margin-left: 20px;
	margin-bottom: 20px;
}

</style>
<style type="text/css">
	.result .el-input-group__append, .el-input-group__prepend{
		padding: 0 10px;
	}
.result	.el-table__empty-text{
	font-size: 14px; 
	color: rgba(51, 51, 51, 0.8);
}
.result .el-table tr{
	height: 47px;
}
.result .el-table th>.cell{
	text-align: center;
	font-size: 14px;
	color: #5a5e66;
	font-weight: 400;
}
.result .el-dialog__header{
	background: RGB(248,248,248);
	border-bottom: 1px solid #e2e2e2;
}
.result .el-dialog__body{
	padding: 0;
}
.result .el-textarea__inner{
	width: 90%;
}
.content_dia>.el-input>.el-input__inner{
		text-align: center !important;
	}
.result .el-button:active{
	color: #5a5e66;
}
.result .el-button:hover{
	color: #5a5e66;
	background: white;
}

 .result .con_input .el-input{
	margin-bottom: 10px;
	margin-right: 10px;float: left;width: 26%;
}
  .result .urlinput .el-input{
	margin-bottom: 10px;
	margin-right: 10px;float: left;width: 20%;
}
.result .con_input{
	clear: both;
	width: 100%;
	padding: 0 0 0 20px;
}
.result .el-icon-remove,.result .el-icon-circle-plus{
	float: left;margin-top: 3px;color: RGB(204,204,204);font-size: 18px;cursor: pointer;
}
.result .el-icon-circle-plus{
	color: RGB(64,158,255);
}
.result .con_input .el-input__inner{
	text-align: center;
	border-radius: 0;width: 100%;height: 25px;float: left;
}
</style>
<style type="text/css">
.result .el-tag + .el-tag {
        margin-left: 10px;
    }
 .result .button-new-tag {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .result .input-new-tag {
        width: 90px;
        height: 10px;
        line-height: 10px;
        padding: 0 8px;
    }
	.result  .el-slider__runway{
            margin-left: 20px;
            width: 90%;
            margin-top: 14px;
    }
    .result .item-mini-input .el-input__inner{
    	width: 45px;
        height: 21px;
    }  
    .result .item_input .el-input__inner{
    	width: 55px;
        height: 21px;
        text-align: center;
    }  
    .result .el-form .item-mini-input{
        display: inline-block;
    }
    .result .el-form .item-mini-input .el-input__inner{
        padding:0;
        text-align: center;
    } 
     .result .tips{
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
    .result .hidebox{
    	padding: 0 20px;
    }
   
    .result .msg{
        display: inline;
        margin-left: 5px;
    }
    .result .msg span{
        color: red;
    }
   .result .el-form-item--small .el-form-item__content .icon{
        display: inline;
        position: absolute;
    }
     
   
    .result .el-form .item-mini-select{
        width: 20%;
    }
    .result .el-form .el-input.item-mini-input:nth-of-type(1){
        width: 10%;
    }
    .result .el-form .el-input.item-mini-input:nth-of-type(2),.result .el-form .el-input.item-mini-input:nth-of-type(3){
        width: 8%;
    }
   

    .result .hideresult .el-form-item:nth-of-type(3) .border{
        left: 23%;
    }
    .result .hideresult .el-form-item:nth-of-type(4) .border{
        left: 37%;
    }
    .result .hideresult .el-form-item:nth-of-type(5) .border{
        left: 22%;
    }
    .result .hideresult .el-form-item:nth-of-type(6) .border{
        left: 18%;
    }
    .result .hideresult .el-form-item:nth-of-type(7) .border{
        left: 16%;
    }    
  
    .result .el-form  .times{
        background: #E4E4E4;
        border-radius: 0px 4px 4px 0px;
        margin-left: -3px;
        padding-top: 0%;
        padding-left: 9px;
        padding-right: 9px;
        padding-bottom: 2px;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
            -webkit-appearance:textfield;
    }
    .result .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .result .el-dialog__title{
        font-size: 16px;
        padding: 10px 15 10px;
    }
            .result .hidebox .el-form-item{
            border:1px solid #e4e4e4;
            border-radius:6px;
            position: relative;
        }
        .result .hidebox .el-textarea__inner{
            border:none;
            outline: none;
        }
        .result .hidebox .el-form-item:nth-of-type(1) .el-form-item__label{
            line-height:66px;
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            padding-right:0;
        }

        .result  .hidebox .dborder{
            border-bottom: 1px dashed  #d7d7d7;
            margin-bottom: 20px;
            margin-top: -11px;
        }

        .result .hidebox .el-form-item:nth-of-type(1) .el-form-item__content,
        .result .hidebox .el-form-item:nth-of-type(2) .el-form-item__content,
        .result .hidebox .el-form-item:nth-of-type(3) .el-form-item__content,
        .result .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
            padding-left:8px;
        }
        .result .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
            display: flex;
            align-items: center;
        }
        .result .hidebox .el-form-item:nth-of-type(2){
                line-height: 100%;
        }
        .result .hidebox .el-form-item:nth-of-type(1) .el-form-item__label,
        .result .hidebox .el-form-item:nth-of-type(2) .el-form-item__label,
        .result .hidebox .el-form-item:nth-of-type(3) .el-form-item__label,
        .result .hidebox .el-form-item:nth-of-type(4) .el-form-item__label,
        .result .hidebox .el-form-item:nth-of-type(5) .el-form-item__label,
        .result .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            background:#f5f5f5;
            
        }
        .result .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
        }
   .result .el-tag{
        margin-right:10px;
    }
</style>