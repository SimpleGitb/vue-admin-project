<template>
	<div class="strate">
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-zhishishuli"></i> 策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
                <div class="right" style="float:right">
                </div>
        	<el-tabs  v-model="activeName" @tab-click="changeloading">
			    <el-tab-pane label="应用策略" name="application">
			    	<el-button @click="addManage" type="primary" icon="el-icon-circle-plus">添加策略</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteStrategyInput">批量删除</el-button>
			    	<el-table
                        v-loading="loading"
					    ref="multipleTable"
					    :data="tableData3"
					    style="width: 100%"
                        border
					    @selection-change="handleSelectionChange">
					    <el-table-column
					      type="selection"
					      >
					    </el-table-column>
					    <el-table-column
					      label="策略名称">
					      <template slot-scope="scope">
					      	{{ scope.row.name }}
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="时间"
					      width="300">
					       <template slot-scope="scope">
					      	{{ scope.row.start.split(' ')[0] }} - {{ scope.row.end.split(' ')[0] }} / {{scope.row.daily_start}} 点 —— {{scope.row.daily_end}} 点
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="首页监测">
					      <template slot-scope="scope">
					      	 <div v-if="scope.row.index == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.index == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.index == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.index == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.index == 1440">
                                   1天
                               </div>
					      	 <div v-if="scope.row.index == 4320">
                                   3天
                               </div>                               
					      	 <div v-if="scope.row.index == 30">
                                   30分钟
                               </div>  
 					      	 <div v-if="scope.row.index == 10080">
                                   7天
                               </div>                                                            
					      </template>
					    </el-table-column> 
					    <el-table-column
					      label="图片篡改">
					      <template slot-scope="scope">
					      	 <div v-if="scope.row.picture == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.picture == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.picture == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.picture == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.picture == 1440">
                                   1天
                               </div>
					      	 <div v-if="scope.row.picture == 4320">
                                   3天
                               </div>                               
					      	 <div v-if="scope.row.picture == 30">
                                   30分钟
                               </div>  
					      	 <div v-if="scope.row.picture == 10080">
                                   7天
                               </div>                                
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="劫持监测">
					      <template slot-scope="scope">
					      	 <div v-if="scope.row.hack == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.hack == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.hack == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.hack == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.hack == 1440">
                                   1天
                               </div>
					      	 <div v-if="scope.row.hack == 4320">
                                   3天
                               </div>                               
					      	 <div v-if="scope.row.hack == 30">
                                   30分钟
                               </div>    
					      	 <div v-if="scope.row.hack == 10080">
                                   7天
                               </div>                                                            
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="深度监测">
					      <template slot-scope="scope">
					      	 <div v-if="scope.row.deep == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.deep == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.deep == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.deep == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.deep == 1440">
                                   1天
                               </div>
					      	 <div v-if="scope.row.deep == 4320">
                                   3天
                               </div>                               
					      	 <div v-if="scope.row.deep == 30">
                                   30分钟
                               </div>   
					      	 <div v-if="scope.row.deep == 10080">
                                   7天
                               </div>                                                            
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="域名监测">
					      <template slot-scope="scope">
					      	 <div v-if="scope.row.domain == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.domain == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.domain == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.domain == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.domain == 1440">
                                   1天
                               </div>
					      	 <div v-if="scope.row.domain == 4320">
                                   3天
                               </div>                    
					      	 <div v-if="scope.row.domain == 10080">
                                   7天
                               </div>                               
					      	 <div v-if="scope.row.domain == 30">
                                   30分钟
                               </div>                               
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="操作">
					      <template slot-scope="scope">
                                <div class="edit"  @click="editStrategy(scope.row.id)"></div>
					      </template>
					    </el-table-column>
					  </el-table>
                        <div class="block" style="float:right;margin-top:20px">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="totalpage1"
                                @current-change	="changepage1"
                            >
                            </el-pagination>
                        </div>
			    </el-tab-pane>
			    <el-tab-pane label="服务器策略" name="server">
                    <el-button @click="addServerManage" type="primary" icon="el-icon-circle-plus">添加服务器策略</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteServerInput">批量删除</el-button>
                    <el-table
					    ref="multipleTable"
                        v-loading="loading1"
					    :data="tableData4"
					    tooltip-effect="dark"
					    border
					    style="width: 100%"
					    @selection-change="handleSelectionServerChange">
					    <el-table-column
					      type="selection"
					      >
					    </el-table-column>
					    <el-table-column
					      label="策略名称">
					      <template slot-scope="scope">
					      	{{ scope.row.name }}
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="监测时间"
					      width="300">
					       <template slot-scope="scope">
					      	{{ scope.row.start.split(' ')[0] }} - {{ scope.row.end.split(' ')[0] }} / {{scope.row.daily_start}} 点 —— {{scope.row.daily_end}} 点
					      </template>
					    </el-table-column>
                        <el-table-column
					      label="可用性监测">
					      <template slot-scope="scope">
                              <div v-if="scope.row.usability == 1">
                                   1分钟
                               </div>
					      	 <div v-if="scope.row.usability == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.usability == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.usability == 30">
                                   30分钟
                               </div>
					      	 <div v-if="scope.row.usability == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.usability == 360">
                                   6小时
                               </div>                             
					      </template>
					    </el-table-column>                         
					    <el-table-column
					      label="端口变动">
					      <template slot-scope="scope">
                              <div v-if="scope.row.port == 5">
                                   5分钟
                               </div>
					      	 <div v-if="scope.row.port == 15">
                                   15分钟
                               </div>
					      	 <div v-if="scope.row.port == 30">
                                   30分钟
                               </div>
					      	 <div v-if="scope.row.port == 60">
                                   1小时
                               </div>
					      	 <div v-if="scope.row.port == 360">
                                   6小时
                               </div>
					      	 <div v-if="scope.row.port == 1440">
                                   1天
                               </div>
					      </template>
					    </el-table-column> 
					    <el-table-column
					      label="操作">
					      <template slot-scope="scope">
                                <div class="edit"  @click="editServeStrategy(scope.row.id)"></div>
					      </template>
					    </el-table-column>
					  </el-table>
                      <div class="block" style="float:right;margin-top:20px">
                        <el-pagination
                        layout="prev, pager, next"
                        :total="totalpage2"
                        @current-change="changepage2"
                        >
                        </el-pagination>
					</div>
                </el-tab-pane>
			</el-tabs>
        </div>
        <el-dialog :close-on-click-modal="ismodal" title="策略编辑" :visible.sync="strategyDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="策略名称"> 
                    <el-input v-model="editStrategys.name"> 
                    </el-input>
                </el-form-item>
                        <el-form-item label="监控时间段">
                            <el-date-picker
                            v-model="editStrategys.startTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                        </el-form-item>
                    <el-form-item label="每天时间段" >
                                <el-select v-model="editStrategys.startdaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                -
                                <el-select v-model="editStrategys.enddaily" class="item-time">
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
                                    v-model="editStrategys.homemonitoringNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
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
                                    v-model="editStrategys.photoTamperingNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
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
                                    v-model="editStrategys.hijackedNum"
                                    :format-tooltip="changestep"
                                    :step="33"
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
                                    v-model="editStrategys.monitoringNum"
                                    :format-tooltip="changestep"
                                    :step="25"
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
                                    v-model="editStrategys.domainmonitorNum"
                                    :format-tooltip="changestep1"
                                    :step="33"
                                    >
                                </el-slider>
                        </div>
                    </el-form-item>
                    <el-form-item label="情报威胁">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    与该应用相关的威胁信息推送
                                </div>
                        </div>
                        <el-switch v-model="editStrategys.sitenote"></el-switch>
                    </el-form-item>               
                    <el-form-item label="可用性监测">
                         <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    分布式监测该应用的可用性与延时状况
                                </div>
                        </div>
                                <el-slider
                                    v-model="editStrategys.usability"
                                    :format-tooltip="usabilitychange2"
                                    :step="16.5"
                                    @change="usabilitychange4"
                                    >
                                </el-slider>
                    </el-form-item>
                    <div v-show="editStrategys.usability" class="hidebox"> 
                        <div>
                            告警策略
                            <div class="border"></div>
                            </div>
                    <el-form-item label="异常条件" class="abnormal">
                        当响应时间大于&nbsp;
                                        <div style="width:23%;display:inline-block">
                                            <el-input v-model="editStrategys.resTime">
                                                <template slot="append">ms</template>
                                            </el-input>
                            </div>
                        &nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                        <div class="item-mini-input"><input type="number" min="0" v-model="editStrategys.threat_count" /></div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;<div class="item-mini-input"><input v-model="addStrategy.continue_count" min="0" type="number"/></div>&nbsp;次时进行报警。
                    </el-form-item>
                    <el-form-item label="警告次数">
                        监控将最多发出&nbsp;<div class="item-mini-input">
                                <el-select  v-model="editStrategys.notice_count">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                                </el-select>
                            </div>&nbsp;次警告
                    </el-form-item>
                    <el-form-item label="自定义cookie">
                        <el-input type="textarea" placeholder="请输入自定义内容" resize="none"  v-model="editStrategys.custom">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否跟随跳转">
                        <el-switch v-model="editStrategys.strategynote"></el-switch>
                        <div class="msg">
                            <p class="msg">
                                <span>*</span> 默认监测跳转后的状态码
                            </p>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入备注" resize="none" v-model="editStrategys.notice">
                        </el-input>
                    </el-form-item>                       
                    </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="strategyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEditAsset">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :close-on-click-modal="ismodal" title="策略添加" :visible.sync="addstrategyDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="策略名称">
                    <el-input v-model="addStrategy.name">
                    </el-input> 
                </el-form-item>
                    <el-form-item label="监控时间段">
                            <el-date-picker
                            v-model="addStrategy.startTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                        </el-form-item>
                    <el-form-item label="每天时间段">
                                <el-select v-model="addStrategy.startdaily"  class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                -
                                <el-select v-model="addStrategy.enddaily"  class="item-time">
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
                                    v-model="addStrategy.homemonitoringNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
                                    @change="homechange"
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
                                    v-model="addStrategy.photoTamperingNum"
                                    :format-tooltip="changestep2"
                                    :step="16.5"
                                    @change="photoTamperingchange" 
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
                                    v-model="addStrategy.hijackedNum"
                                    :format-tooltip="changestep"
                                    :step="33"
                                    @change="hijackedchange"
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
                                    v-model="addStrategy.monitoringNum"
                                    :format-tooltip="changestep"
                                    :step="25"
                                     @change="monitorchange"
                                    >
                                </el-slider>
                        </div>
                    </el-form-item>
                    <el-form-item label="域名监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    所有人变更,备案,dns,解析ip,过期时间,是否开启泛解析
                                </div>
                        </div>
                        <div class="block">
                                <el-slider 
                                    v-model="addStrategy.domainmonitorNum"
                                    :format-tooltip="changestep1"
                                    :step="33"
                                    @change="domainchange"
                                    >
                                </el-slider>
                        </div>
                    </el-form-item>
                    <el-form-item label="情报威胁">
                           <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    与该应用相关的威胁信息推送
                                </div>
                        </div>
                        <el-switch v-model="addStrategy.sitenote"></el-switch>
                    </el-form-item>                 
                    <el-form-item label="可用性监测">
                         <div class="icon">
                            <i class="el-icon-question"></i>
                                <div class="tips">
                                    <div class="border"></div>
                                    分布式监测该应用的可用性与延时状况
                                </div>
                        </div>
                                <el-slider
                                    v-model="addStrategy.usability"
                                    :format-tooltip="usabilitychange2"
                                    :step="16.5"
                                    @change="usabilitychange3"
                                    >
                                </el-slider>
                    </el-form-item>
                    <div class="hidebox" v-show="addStrategy.usability"> 
                            <div>
                                <p>告警策略:</p>
                                <div class="border"></div>
                            </div>
                    <el-form-item label="异常条件" class="abnormal">
                         当响应时间大于&nbsp;
                         <div style="width:23%;display:inline-block">
                                            <el-input v-model="addStrategy.resTime">
                                                <template slot="append">ms</template>
                                            </el-input>
                         </div>&nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                        <div class="item-mini-input">
                            <input min="0" type="number" v-model="addStrategy.threat_count" />
                        </div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;
                        <div class="item-mini-input">
                            <input min="0" v-model="addStrategy.continue_count" type="number" >
                        </div>&nbsp;次时进行报警。
                    </el-form-item>  
                    <el-form-item label="警告次数">
                        监控将最多发出&nbsp;<div class="item-mini-input">
                            <el-select  v-model="addStrategy.notice_count">
                               <el-option label="1" value="1"></el-option>
                               <el-option label="2" value="2"></el-option>
                               <el-option label="3" value="3"></el-option>
                            </el-select>
                            </div>&nbsp;次警告
                    </el-form-item>
                    <el-form-item label="自定义cookie" class="linemax">
                        <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="addStrategy.custom">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否跟随跳转">
                        <el-switch v-model="addStrategy.strategynote"></el-switch>
                        <div class="msg">
                            <p class="msg">
                                <span>*</span> 默认监测跳转后的状态码
                            </p>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注"  class="linemax">
                         <el-input type="textarea" placeholder="请输入备注" resize="none" v-model="addStrategy.notice">
                        </el-input>
                    </el-form-item>
                    </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addstrategyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveaddStrategy">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="服务器策略编辑" class="serverDialog" :visible.sync="serverstrategyDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="策略名称">
                    <el-input v-model="editserverStrategy.name">
                    </el-input> 
                </el-form-item>
                    <el-form-item label="监控时间段">
                            <el-date-picker
                            v-model="editserverStrategy.startTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                        </el-form-item>
                    <el-form-item label="每天时间段">
                                <el-select v-model="editserverStrategy.startdaily" class="item-time">
                                    <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                                </el-select>
                                -
                                <el-select v-model="editserverStrategy.enddaily" class="item-time">
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
                                    v-model="editserverStrategy.usability"
                                    :format-tooltip="usabilitychange2"
                                    :step="16.5"
                                    @change="usabilitychange1"
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
                                    v-model="editserverStrategy.port"
                                    :format-tooltip="changestep4"
                                    :step="16.5"
                                    @change="portchange1"
                                    >
                                </el-slider>
                    </el-form-item>
                    <el-form-item label="备注">
                         <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="editserverStrategy.remark">
                        </el-input>
                    </el-form-item>                    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="serverstrategyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEditServerStrategy">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="服务器策略添加" class="serverDialog" :visible.sync="addServerStrategyDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="策略名称">
                    <el-input v-model="addserverStrategy.name">
                    </el-input> 
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
                    <el-form-item label="可用性监测">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addServerStrategyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveaddServerStrategy">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="delstrateVisible" width="300px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delstrateVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletestrategy">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="delserverVisible" width="300px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delserverVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteServer">确 定</el-button>
            </span>
        </el-dialog>        
	</div>
</template>

<script>
    export default {
    	name: 'strategicmanage',
        data: function(){
            return {
                includedComponents:'strategicmanage',
                ismodal:false,
                delstrateVisible:false,
                delserverVisible:false,
                activeName: 'application',
                strategyDialog:false,
                serverstrategyDialog:false,
                addstrategyDialog:false,
                addServerStrategyDialog:false,
                strategyId:'',
                serverId:'',
                totalpage1:1,
                totalpage2:1,
                tableData3: [],
                tableData4:[],
                editStrategys: {
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    strategydata: '',
                    warncount:1,
                    resTime:200,
                    threat_count:2,
                    continue_count:3,
                    notice_count:3,
                    startTime: [new Date(),new Date(2018, 11, 30)],
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    domainmonitor: '1天',
                    homemonitoring: '1小时',
                    photoTampering: '15分钟',
                    hijacked: '1天',
                    monitoring: '1天',
                    remark: '',
                    custom:'',
                    usability: 0,
                    sitenote: false,
                    strategynote:false,
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum:0,
                    domainmonitorNum:0
                },
                editserverStrategy:{
                        name:'',
                        startTime:[],
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
                addserverStrategy:{
                        name:'',
                        startTime: [new Date(),new Date(2018, 11, 30)],
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
                addStrategy:{
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    warncount:1,
                    strategydata: '',
                    startTime: [new Date(),new Date(2018, 11, 30)],
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    domainmonitor: '1天',
                    homemonitoring: '1小时',
                    photoTampering: '15分钟',
                    hijacked: '1天',
                    monitoring: '1天',
                    remark: '',
                    resTime:200,
                    threat_count:2,
                    continue_count:3,
                    notice_count:3,
                    usability: 0,
                    strategynote: false,
                    sitenote: false,
                    custom:'',
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum:0,
                    domainmonitorNum:0,
                    homemonitoringNum1: 0,
                    photoTamperingNum1: 0,
                    hijackedNum1: 0,
                    monitoringNum1: 0,
                    domainmonitorNum1: 0
                },
                multipleSelection: [],
                multipleServerSelection:[],
                strategyIdArr:[],
                strateServerId:[],
                dayTime:[],
                loading:true,
                loading1:true
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.strategyIdArr = [];
                this.multipleSelection = val;
                for(var i=0;i<this.multipleSelection.length;i++){
                    this.strategyIdArr.push(this.multipleSelection[i].id);
                }
            },
            usabilitychange3(val){
                switch (val) {
                    case 0:
                    this.addStrategy.usability1 = 0;
                        break;
                    case 16.5:
                    this.addStrategy.usability1 = 360;
                        break;
                    case 33:
                    this.addStrategy.usability1 = 60;
                        break;
                    case 49.5:
                    this.addStrategy.usability1 = 30;
                        break;
                    case 66:
                    this.addStrategy.usability1 = 15;
                        break;
                    case 82.5:
                    this.addStrategy.usability1 = 5;
                        break;    
                    case 99:
                    this.addStrategy.usability1 = 1;
                        break;
                    case 100:
                    this.addStrategy.usability1 = 1;
                        break;
                    default:
                    this.addStrategy.usability1 = 0;
                        break;
                }
            },
            usabilitychange4(val){
                switch (val) {
                    case 0:
                    this.editStrategys.usability1 = 0;
                        break;
                    case 16.5:
                    this.editStrategys.usability1 = 360;
                        break;
                    case 33:
                    this.editStrategys.usability1 = 60;
                        break;
                    case 49.5:
                    this.editStrategys.usability1 = 30;
                        break;
                    case 66:
                    this.editStrategys.usability1 = 15;
                        break;
                    case 82.5:
                    this.editStrategys.usability1 = 5;
                        break;    
                    case 99:
                    this.editStrategys.usability1 = 1;
                        break;
                    case 100:
                    this.editStrategys.usability1 = 1;
                        break;
                    default:
                    this.editStrategys.usability1 = 0;
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
            usabilitychange1(val){
                switch (val) {
                    case 0:
                    this.editserverStrategy.usability1 = 0;
                        break;
                    case 16.5:
                    this.editserverStrategy.usability1 = 360;
                        break;
                    case 33:
                    this.editserverStrategy.usability1 = 60;
                        break;
                    case 49.5:
                    this.editserverStrategy.usability1 = 30;
                        break;
                    case 66:
                    this.editserverStrategy.usability1 = 15;
                        break;
                    case 82.5:
                    this.editserverStrategy.usability1 = 5;
                        break;    
                    case 99:
                    this.editserverStrategy.usability1 = 1;
                        break;
                    case 100:
                    this.editserverStrategy.usability1 = 1;
                        break;
                    default:
                    this.editserverStrategy.usability1 = 0;
                        break;
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
            portchange1(val){
                switch (val) {
                    case 0:
                    this.editserverStrategy.port1 = 0;
                        break;
                    case 16.5:
                    this.editserverStrategy.port1 = 1440;
                        break;
                    case 33:
                    this.editserverStrategy.port1 = 360;
                        break;
                    case 49.5:
                    this.editserverStrategy.port1 = 60;
                        break;
                    case 66:
                    this.editserverStrategy.port1 = 30;
                        break;
                    case 82.5:
                    this.editserverStrategy.port1 = 15;
                        break;    
                    case 99:
                    this.editserverStrategy.port1 = 5;
                        break;
                    case 100:
                    this.editserverStrategy.port1 = 5;
                        break;
                    default:
                    this.editserverStrategy.port1 = 0;
                        break;
                }
            },
            handleDisable(row,data){
                 this.$axios.post('api/ipConfigure/'+row.id+'/usability').then((res)=>{
                           this.$message.success(res.data.msg);
                 });
             },
            handleDisableport(row){
                 this.$axios.post('api/ipConfigure/'+row.id+'/port').then((res)=>{
                           this.$message.success(res.data.msg);
                 })
            },
            handleSelectionServerChange(val){
                this.strateServerId = [];
                this.multipleServerSelection = val;
                for(var i=0;i<this.multipleServerSelection.length;i++){
                    this.strateServerId.push(this.multipleServerSelection[i].id);
                };
            },
            deleteServer(){
                                this.$axios.delete('api/ipConfigure',{
                                    data:{
                                        id:this.strateServerId
                                    }
                                }).then((res)=>{
                                    if(res.data.status == 1){
                                        this.$message.success(res.data.msg);
                                        this.getipConfigure();
                                        this.delserverVisible = false;
                                    }else{
                                        this.$message.error(res.data.msg);
                                    }
                                });
            },
            deletestrategy(){
                    this.$axios.delete('api/siteConfigure',{
                        data:{
                            id:this.strategyIdArr
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            this.$message.success(res.data.msg);
                            this.getsiteConfigure();
                            this.strategyIdArr = [];
                            this.delstrateVisible = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
            },
            deleteServerInput(){
                        if(!this.strateServerId.length){
                            this.$message.error('请选择策略');
                            return;
                        }else{
                            this.delserverVisible = true;
                        };
            },
            deleteStrategyInput(){
                if(!this.strategyIdArr.length){
                        this.$message.error('请选择策略');
                        return;
                    }else{
                        this.delstrateVisible = true;
                    }
            },
            editServeStrategy(id){
                this.serverId = id;
                this.serverstrategyDialog = true;
                this.$axios.get('api/ipConfigure/'+id).then((res)=>{
                    let data = res.data.data;
                    this.editserverStrategy.name  = data.name;
                    this.editserverStrategy.startTime  = [new Date(data.start),new Date(data.end)];
                    this.editserverStrategy.startdaily =  data.daily_start;
                    this.editserverStrategy.enddaily =  data.daily_end;
                    this.editserverStrategy.usability1 = data.usability;
                    this.editserverStrategy.port1 = data.port;
                        switch (this.editserverStrategy.usability1) {
                            case 0:
                            this.editserverStrategy.usability = 0;
                                break;
                            case 1:
                            this.editserverStrategy.usability = 99;
                                break;
                            case 5:
                            this.editserverStrategy.usability = 82.5;
                                break;
                            case 15:
                            this.editserverStrategy.usability = 66;
                                break;                                                                    
                            case 30:
                            this.editserverStrategy.usability = 49.5;
                                break;
                            case 60:
                            this.editserverStrategy.usability = 33;
                                break;                         
                            case 360:
                            this.editserverStrategy.usability = 16.5;
                                break; 
                            default:
                            this.editserverStrategy.usability = 0;
                                break;
                    };
                        switch (this.editserverStrategy.port1) {
                                case 0:
                                this.editserverStrategy.port = 0;
                                    break;
                                case 5:
                                this.editserverStrategy.port = 99;
                                    break;
                                case 15:
                                this.editserverStrategy.port = 82.5;
                                    break;
                                case 30:
                                this.editserverStrategy.port = 66;
                                    break;                                                                    
                                case 60:
                                this.editserverStrategy.port = 49.5;
                                    break;
                                case 360:
                                this.editserverStrategy.port = 33;
                                    break;                         
                                case 1440:
                                this.editserverStrategy.port = 16.5;
                                    break; 
                                default:
                                this.editserverStrategy.port = 0;
                                    break;
                        };           
                })
            },
            saveEditAsset() {
                    switch (this.editStrategys.homemonitoringNum) {
                        case 0:
                        this.editStrategys.homemonitoringNum1 = 0;
                            break;
                        case 16.5:
                        this.editStrategys.homemonitoringNum1 = 1440;
                            break;
                        case 5:
                        this.editStrategys.homemonitoringNum1 = 5;
                            break;
                        case 15:
                        this.editStrategys.homemonitoringNum1 = 15;
                            break;                                                                    
                        case 33:
                        this.editStrategys.homemonitoringNum1 = 360;
                            break;
                        case 30:
                        this.editStrategys.homemonitoringNum1 = 30;
                            break;                         
                        case 49.5:
                        this.editStrategys.homemonitoringNum1 = 60;
                            break; 
                        case 60:
                        this.editStrategys.homemonitoringNum1 = 60;
                            break;                                                
                        case 66:
                        this.editStrategys.homemonitoringNum1 = 30;
                            break;
                        case 360:
                        this.editStrategys.homemonitoringNum1 = 360;
                            break;                                              
                        case 82.5:
                        this.editStrategys.homemonitoringNum1 = 15;
                            break; 
                        case 1440:
                        this.editStrategys.homemonitoringNum1 = 1440;
                            break;                           
                        case 99:
                        this.editStrategys.homemonitoringNum1 = 5;
                            break;
                        case 100:
                        this.editStrategys.homemonitoringNum1 = 5;
                            break;                                                               
                        default:
                        this.editStrategys.homemonitoringNum1 = 0;
                            break;
                    };               
                    switch (this.editStrategys.photoTamperingNum) {
                        case 0:
                        this.editStrategys.photoTamperingNum1 = 0;
                            break;
                        case 16.5:
                        this.editStrategys.photoTamperingNum1 = 1440;
                            break;
                        case 5:
                        this.editStrategys.photoTamperingNum1 = 5;
                            break;  
                        case 15:
                        this.editStrategys.photoTamperingNum1 = 15;
                            break;                                              
                        case 33:
                        this.editStrategys.photoTamperingNum1 = 360;
                            break;
                        case 30:
                        this.editStrategys.photoTamperingNum1 = 30;
                            break;                          
                        case 49.5:
                        this.editStrategys.photoTamperingNum1 = 60;
                            break; 
                        case 60:
                        this.editStrategys.photoTamperingNum1 = 60;
                            break;                                            
                        case 66:
                        this.editStrategys.photoTamperingNum1 = 30;
                            break; 
                        case 360:
                        this.editStrategys.photoTamperingNum1 = 360;
                            break;                                           
                        case 82.5:
                        this.editStrategys.photoTamperingNum1 = 15;
                            break;  
                        case 1440:
                        this.editStrategys.photoTamperingNum1 = 1440;
                            break;                       
                        case 99:
                        this.editStrategys.photoTamperingNum1 = 5;
                            break; 
                        case 100:
                        this.editStrategys.photoTamperingNum1 = 5;
                            break;                                                              
                        default:
                        this.editStrategys.photoTamperingNum1 = 0;
                            break;
                    };
                    switch (this.editStrategys.hijackedNum) {
                        case 0:
                        this.editStrategys.hijackedNum1 = 0;
                            break;
                        case 33:
                        this.editStrategys.hijackedNum1 = 4320;
                            break;
                        case 360:
                        this.editStrategys.hijackedNum1 = 360;
                            break;
                        case 1440:
                        this.editStrategys.hijackedNum1 = 1440;
                            break;                                                
                        case 66:
                        this.editStrategys.hijackedNum1 = 1440;
                            break;
                        case 4320:
                        this.editStrategys.hijackedNum1 = 4320;
                            break;                        
                        case 100:
                        this.editStrategys.hijackedNum1 = 360;
                            break;
                        case 99:
                        this.editStrategys.hijackedNum1 = 360;
                            break;                             
                        default:
                        this.editStrategys.hijackedNum1 = 0;
                            break;
                    };
                    switch (this.editStrategys.monitoringNum) {
                        case 0:
                        this.editStrategys.monitoringNum1 = 0;
                            break;
                        case 25:
                        this.editStrategys.monitoringNum1 = 4320;
                            break;
                        case 60:
                        this.editStrategys.monitoringNum1 = 60;
                            break;
                        case 360:
                        this.editStrategys.monitoringNum1 = 360;
                            break;                                              
                        case 50:
                        this.editStrategys.monitoringNum1 = 1440;
                            break;
                        case 1440:
                        this.editStrategys.monitoringNum1 = 1440;
                            break;                        
                        case 75:
                        this.editStrategys.monitoringNum1 = 360;
                            break;
                        case 4320:
                        this.editStrategys.monitoringNum1 = 4320;
                            break;                         
                        case 100:
                        this.editStrategys.monitoringNum1 = 60;
                            break;                          
                        default:
                        this.editStrategys.monitoringNum1 = 0;
                            break;
                    };
                    switch (this.editStrategys.domainmonitorNum) {
                        case 0:
                        this.editStrategys.domainmonitorNum1 = 0;
                            break;
                        case 33:
                        this.editStrategys.domainmonitorNum1 = 10080;
                            break;
                        case 1440:
                        this.editStrategys.domainmonitorNum1 = 1440;
                            break;
                        case 4320:
                        this.editStrategys.domainmonitorNum1 = 4320;
                            break;
                        case 66:
                        this.editStrategys.domainmonitorNum1 = 4320;
                            break;
                        case 10080:
                        this.editStrategys.domainmonitorNum1 = 10080;
                            break;
                        case 100:
                        this.editStrategys.domainmonitorNum1 = 1440;
                            break;
                        case 99:
                        this.editStrategys.domainmonitorNum1 = 1440;
                            break;                                                                                       
                        default:
                        this.editStrategys.domainmonitorNum1 = 0;
                            break;
                };
                this.$axios.post('api/siteConfigure/'+this.strategyId,{
                    name:this.editStrategys.name,
                    start: this.editStrategys.startTime[0].toLocaleDateString().split('/').join('-'),
                    end: this.editStrategys.startTime[1].toLocaleDateString().split('/').join('-'),
                    daily_start:this.editStrategys.startdaily,
                    daily_end:this.editStrategys.enddaily,
                    index:this.editStrategys.homemonitoringNum1,
                    picture:this.editStrategys.photoTamperingNum1,
                    hack:this.editStrategys.hijackedNum1,
                    deep:this.editStrategys.monitoringNum1,
                    domain:this.editStrategys.domainmonitorNum1,
                    notice:Number(this.editStrategys.sitenote),
                    remark:this.editStrategys.notice,
                    usability:Number(this.editStrategys.usability1),
                    delay:Number(this.editStrategys.resTime),
                    threat_count:Number(this.editStrategys.threat_count),   
                    continue_count:Number(this.editStrategys.continue_count),
                    notice_count:Number(this.editStrategys.notice_count),
                    cookie:this.editStrategys.custom,
                    jump:Number(this.editStrategys.strategynote)
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.$message.success(res.data.msg);
                        this.strategyDialog = false;
                        this.getsiteConfigure();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            saveaddServerStrategy(){

                this.$axios.post('api/ipConfigure',{
                    name:this.addserverStrategy.name,
                    start:this.addserverStrategy.startTime[0],
                    end:this.addserverStrategy.startTime[1],
                    daily_start:this.addserverStrategy.startdaily,
                    daily_end:this.addserverStrategy.enddaily,
                    remark:this.addserverStrategy.remark,
                    usability:Number(this.addserverStrategy.usability1),
                    port:Number(this.addserverStrategy.port1)
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.$message.success(res.data.msg);
                        this.addServerStrategyDialog = false;
                        this.getipConfigure();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            saveEditServerStrategy(){
                this.$axios.post('api/ipConfigure/'+this.serverId,{
                    name:this.editserverStrategy.name,
                    start:this.addserverStrategy.startTime[0].toLocaleDateString().split('/').join('-'),
                    end:this.addserverStrategy.startTime[1].toLocaleDateString().split('/').join('-'),
                    daily_start:this.editserverStrategy.startdaily,
                    daily_end:this.editserverStrategy.enddaily,
                    remark:this.editserverStrategy.remark,
                    usability:Number(this.editserverStrategy.usability1),
                    port:Number(this.editserverStrategy.port1)
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.$message.success(res.data.msg);
                        this.serverstrategyDialog = false;
                        this.getipConfigure();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            homechange(val){
                switch (val) {
                    case 0:
                    this.addStrategy.homemonitoringNum1 = 0;
                        break;
                    case 16.5:
                    this.addStrategy.homemonitoringNum1 = 1440;
                        break;
                    case 15:
                    this.addStrategy.homemonitoringNum1 = 15;
                        break;
                    case 33:
                    this.addStrategy.homemonitoringNum1 = 360;
                        break;
                    case 30:
                    this.addStrategy.homemonitoringNum1 = 30;
                        break;                     
                    case 49.5:
                    this.addStrategy.homemonitoringNum1 = 60;
                        break;
                    case 66:
                    this.addStrategy.homemonitoringNum1 = 60;
                        break;
                    case 60:
                    this.addStrategy.homemonitoringNum1 = 30;
                        break; 
                    case 360:
                    this.addStrategy.homemonitoringNum1 = 360;
                        break;
                    case 82.5:
                    this.addStrategy.homemonitoringNum1 = 15;
                        break;
                    case 1440:
                    this.addStrategy.homemonitoringNum1 = 1440;
                        break;
                    case 99:
                    this.addStrategy.homemonitoringNum1 = 5;
                        break;
                    case 100:
                    this.addStrategy.homemonitoringNum1 = 5;
                        break;
                    default:
                    this.addStrategy.homemonitoringNum1 = 0;
                        break;
                }
            },
            photoTamperingchange(val){
                switch (val) {
                    case 0:
                    this.addStrategy.photoTamperingNum1 = 0;
                        break;
                    case 16.5:
                    this.addStrategy.photoTamperingNum1 = 1440;
                        break;
                    case 33:
                    this.addStrategy.photoTamperingNum1 = 360;
                        break;
                    case 49.5:
                    this.addStrategy.photoTamperingNum1 = 60;
                        break;                    
                    case 66:
                    this.addStrategy.photoTamperingNum1 = 30;
                        break;                    
                    case 82.5:
                    this.addStrategy.photoTamperingNum1 = 15;
                        break;
                    case 99:
                    this.addStrategy.photoTamperingNum1 = 5;
                        break;
                    case 100:
                    this.addStrategy.photoTamperingNum1 = 5;
                        break;
                    default:
                    this.addStrategy.photoTamperingNum1 = 0;
                        break;
                }
            },
            hijackedchange(val){
                switch (val) {
                    case 0:
                    this.addStrategy.hijackedNum1 = 0;
                        break;
                    case 33:
                    this.addStrategy.hijackedNum1 = 4320;
                        break;
                    case 66:
                    this.addStrategy.hijackedNum1 = 4320;
                        break;
                    case 99:
                    this.addStrategy.hijackedNum1 = 1440;
                        break;
                    case 100:
                    this.addStrategy.hijackedNum1 = 360;
                        break;                                                            
                    default:
                    this.addStrategy.hijackedNum1 = 0;
                        break;
                }
            },
            monitorchange(val){
                switch (val) {
                    case 0:
                    this.addStrategy.monitoringNum1 = 0;
                        break;
                    case 25:
                    this.addStrategy.monitoringNum1 = 4320;
                        break;
                    case 50:
                    this.addStrategy.monitoringNum1 = 1440;
                        break;
                    case 75:
                    this.addStrategy.monitoringNum1 = 360;
                        break;  
                    case 100:
                    this.addStrategy.monitoringNum1 = 60;
                        break;                                                            
                    default:
                    this.addStrategy.monitoringNum1 = 0;
                        break;
                }
            },
            domainchange(val){
                switch (val) {
                    case 0:
                    this.addStrategy.domainmonitorNum1 = 0;
                        break;
                    case 33:
                    this.addStrategy.domainmonitorNum1 = 10080;
                        break;
                    case 66:
                    this.addStrategy.domainmonitorNum1 = 10080;
                        break;
                    case 99:
                    this.addStrategy.domainmonitorNum1 = 4320;
                        break;
                    case 100:
                    this.addStrategy.domainmonitorNum1 = 1440;
                        break;                                                                            
                    default:
                    this.addStrategy.domainmonitorNum1 = 0;
                        break;
                }
            },
            saveaddStrategy(){
                if(!this.addStrategy.name){
                    this.$message.error('请填写策略名称');
                    return;
                };
                // console.log(this.addStrategy.domainmonitorNum1)
                this.$axios.post('api/siteConfigure',{
                    name:this.addStrategy.name,
                    start:this.addStrategy.startTime[0].toLocaleDateString().split('/').join('-'),  
                    end:this.addStrategy.startTime[1].toLocaleDateString().split('/').join('-'),
                    daily_start:this.addStrategy.startdaily,
                    daily_end:this.addStrategy.enddaily,
                    index:this.addStrategy.homemonitoringNum1,
                    picture:this.addStrategy.photoTamperingNum1,
                    hack:this.addStrategy.hijackedNum1,
                    deep:this.addStrategy.monitoringNum1,
                    domain:this.addStrategy.domainmonitorNum1,
                    notice:Number(this.addStrategy.sitenote),
                    remark:this.addStrategy.notice,
                    usability:Number(this.addStrategy.usability1),
                    delay:Number(this.addStrategy.resTime),
                    threat_count:Number(this.addStrategy.threat_count),   
                    continue_count:Number(this.addStrategy.continue_count),
                    notice_count:Number(this.addStrategy.notice_count),
                    cookie:this.addStrategy.custom,
                    jump:Number(this.addStrategy.strategynote)
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.$message.success(res.data.msg);
                        this.addstrategyDialog = false;
                        this.getsiteConfigure();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            changestep(val){
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
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
                    case 0:
                        return '不监测'
                        break;
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
                    case 0:
                        return '不监测'
                        break;
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
            editStrategy(id){
                this.strategyId = id;
                this.strategyDialog = true;
                this.$axios.get('api/siteConfigure/'+id+'').then((res)=>{
                    let data = res.data.data;
                    this.editStrategys.name = data.name;
                    this.editStrategys.sitenote  = Boolean(data.notice);
                    this.editStrategys.custom = data.cookie;
                    this.editStrategys.notice_count = data.notice_count;
                    this.editStrategys.usability1  =  data.usability;
                    this.editStrategys.startTime  = [new Date(data.start),new Date(data.end)];
                    this.editStrategys.startdaily = data.daily_start;
                    this.editStrategys.enddaily = data.daily_end;
                    this.editStrategys.domainmonitorNum = data.domain;
                    this.editStrategys.monitoringNum = data.deep;
                    this.editStrategys.homemonitoringNum = data.index;
                    this.editStrategys.photoTamperingNum = data.picture;
                    this.editStrategys.hijackedNum = data.hack;
                    this.editStrategys.domainmonitorNum1 = data.domain;
                    this.editStrategys.monitoringNum1 = data.deep;
                    this.editStrategys.homemonitoringNum1 = data.index;
                    this.editStrategys.photoTamperingNum1 = data.picture;
                    this.editStrategys.hijackedNum1 = data.hack;
                    this.editStrategys.resTime = data.delay;
                    this.editStrategys.threat_count = data.threat_count;
                    this.editStrategys.continue_count = data.continue_count;
                    this.editStrategys.notice_count = data.notice_count;
                        switch (this.editStrategys.usability1) {
                                case 0:
                                this.editStrategys.usability = 0;
                                    break;
                                case 1:
                                this.editStrategys.usability = 99;
                                    break;
                                case 5:
                                this.editStrategys.usability = 82.5;
                                    break;
                                case 15:
                                this.editStrategys.usability = 66;
                                    break;
                                case 30:
                                this.editStrategys.usability = 49.5;
                                    break;
                                case 60:
                                this.editStrategys.usability = 33;
                                    break;    
                                case 360:
                                this.editStrategys.usability = 16.5;
                                    break;
                                default:
                                this.editStrategys.usability = 0;
                                    break;
                        };

                        switch (this.editStrategys.homemonitoringNum1) {
                            case 0:
                                this.editStrategys.homemonitoringNum = 0;
                                break;
                            case 5:
                                this.editStrategys.homemonitoringNum = 99;
                                break;
                            case 15:
                                this.editStrategys.homemonitoringNum = 82.5;
                                break;
                            case 30:
                                this.editStrategys.homemonitoringNum = 66;
                                break;
                            case 60:
                                this.editStrategys.homemonitoringNum = 49.5;
                                break;
                            case 360:
                                this.editStrategys.homemonitoringNum = 33;
                                break;
                            case 1440:
                                this.editStrategys.homemonitoringNum = 16.5;
                                break;
                            default:
                                this.editStrategys.homemonitoringNum = 0;
                                break;
                        };
                        switch (this.editStrategys.photoTamperingNum1) {
                            case 0:
                                this.editStrategys.photoTamperingNum = 0;
                                break;
                            case 5:
                                this.editStrategys.photoTamperingNum = 99;
                                break;
                            case 15:
                                this.editStrategys.photoTamperingNum = 82.5;
                                break;
                            case 30:
                                this.editStrategys.photoTamperingNum = 66;
                                break;
                            case 60:
                                this.editStrategys.photoTamperingNum = 49.5;
                                break;
                            case 360:
                                this.editStrategys.photoTamperingNum = 33;
                                break;
                            case 1440:
                                this.editStrategys.photoTamperingNum = 16.5;
                                break;
                            default:
                                this.editStrategys.photoTamperingNum = 0;
                                break;
                        };
                        switch (this.editStrategys.hijackedNum1) {
                            case 0:
                                this.editStrategys.hijackedNum = 0;
                                break;
                            case 360:
                                this.editStrategys.hijackedNum = 99;
                                break;
                            case 1440:
                                this.editStrategys.hijackedNum = 66;
                                break;
                            case 4320:
                                this.editStrategys.hijackedNum = 33;
                                break;
                            default:
                                this.editStrategys.hijackedNum = 0;
                                break;
                        };
                        switch (this.editStrategys.monitoringNum1) {
                            case 0:
                                this.editStrategys.monitoringNum = 0;
                                break;
                            case 60:
                                this.editStrategys.monitoringNum = 100;
                                break;
                            case 360:
                                this.editStrategys.monitoringNum = 75;
                                break;
                            case 1440:
                                this.editStrategys.monitoringNum = 50;
                                break;
                            case 4320:
                                this.editStrategys.monitoringNum = 25;
                                break;
                            default:
                                this.editStrategys.monitoringNum = 0;
                                break;
                        };
                        switch (this.editStrategys.domainmonitorNum1) {
                            case 0:
                                this.editStrategys.domainmonitorNum = 0;
                                break;
                            case 1440:
                                this.editStrategys.domainmonitorNum = 99;
                                break;
                            case 4320:
                                this.editStrategys.domainmonitorNum = 66;
                                break;
                            case 10080:
                                this.editStrategys.domainmonitorNum = 33;
                                break;
                            default:
                                this.editStrategys.domainmonitorNum = 0;
                                break;
                        };
                })
            },
            addManage(){
                this.addstrategyDialog = true;
            },
            addServerManage(){
                this.addServerStrategyDialog = true;
            },
            getsiteConfigure(){
                this.loading = true;
                this.$axios.get('api/siteConfigure?page=1&limit=10').then((res)=>{
                    if(res.data.status == 403){
                        window.location.href = '/login';
                        return;
                    }
                    let data = res.data.data.configure;
                    this.totalpage1 = Math.ceil(res.data.data.count);
                    this.tableData3 = data;
                    this.loading = false;
                }).catch((v)=>{
                    console.log(v);
                });
            },
            getipConfigure(){
                this.loading1 = true;
                this.$axios.get('api/ipConfigure?page=1&limit=10').then((res)=>{
                    let data = res.data.data.configures;
                    this.tableData4 = data;
                    this.totalpage2 = Math.ceil(res.data.data.count);
                    this.loading1 = false;
                }).catch((v)=>{
                    console.log(v);
                })
            },
            changepage1(t){
               this.loading = true;
               this.$axios.get('api/siteConfigure?page='+t+'&limit=10').then((res)=>{
                    let data = res.data.data.configure;
                    this.tableData3 = data;
                    this.loading = false;
                }).catch((v)=>{
                    console.log(v);
                });
            },
            changepage2(t){
                this.loading1 = true;
                this.$axios.get('api/ipConfigure?page='+t+'&limit=10').then((res)=>{
                    let data = res.data.data.configures;
                    this.tableData4 = data;
                    this.loading1 = false;
                }).catch((v)=>{
                    console.log(v);
                });
            },
            createTime(){
                    for(var i=0;i<25;i++){
                        this.dayTime.push(i);
                    };
            },
            changeloading(tab){
                if(tab.name == 'server'){
                    if(this.tableData4.length===0){
                        this.getipConfigure();
                    }
                }
            }
        },
        created(){
                this.getsiteConfigure();
        },
        mounted(){
             
             this.createTime();
               var text = document.getElementsByClassName('el-table__empty-text');
                for(var i=0;i<text.length;i++){
                    text[i].innerHTML = '<img src="../../../static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
                }
         }
    }
</script>


<style lang="less">
    @media screen and (max-width: 1920px){
            .strate .el-form .times{
                border-bottom:1px solid #E4E4E4;
            }
    }
        @media screen and (min-width: 1920px){
            .strate .el-form .times{
                border-bottom:none
            }
    }
        .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label,
        .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
        }

         .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
        }
        .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            line-height:35px;
            background:#f5f5f5;
        }
        .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:55px;
        }
        .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:35px;
        }
        .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
            border-right:1px solid #fbfbfb;
            background:#f5f5f5;
            line-height:54px;
        }
        
        .strate .hidebox .el-form-item{
            border:1px solid #e4e4e4;
            border-radius:6px;
            position: relative;
        }
    .strate .el-form .item-mini-input{
            display: inline-block;
        }
    .strate .el-form .item-mini-input  input{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        text-align: center;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #5a5e66;
        display: inline-block;
        font-size: inherit;
        height: 24px;
        line-height: 1;
        outline: 0;
        padding: 0 2px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    .strate .el-form  .item-mini-select{
        width: 14%;
        display: inline-block;
    }
    .strate .el-form  .item-mini-select .el-input__inner{
        height: 25px;
        text-align: center;
        padding-right: 20px;
        padding-left: 0;
    }
    .strate .el-form .item-mini-input:nth-of-type(1){
        width: 10%;
    }
    .strate .el-form .item-mini-input:nth-of-type(2),.strate .el-form .item-mini-input:nth-of-type(3){
        width: 8%;
    }
    .strate .el-form .item-mini-input .el-input__inner{
        height: 22px;
        padding:0;
        text-align: center;
    } 
    .strate .el-table .cell .el-switch{
        height: 23px;
    }

    .strate .item-time{
        width: 70px;;
    }

    .strate .crumbs .el-breadcrumb .el-icon-tickets{
        font-size:18px;
    }
    
    .strate .crumbs .el-breadcrumb{
        font-size:18px;
    }

    .el-table {
        margin-top: 20px;
        text-align: center;
    }

    .el-icon-edit-outline{
        width: 20px;
        height: 20px;
    }

</style>
<style type="text/css">
    .strate .el-breadcrumb .el-breadcrumb__inner .iconfont{
       font-size:20px;
    }
    .strate .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }
    .strate .el-dialog__title{
        font-size: 16px;
    }
    .popper__arrow{
        display: none!important;
    }
    .strate .el-table__empty-text{
        display: flex;
        align-items:center;
    }
    .strate .el-input__suffix{
        right: 0;
    }
    .strate .el-table__empty-text span{
        margin-left: 15px;
    }
    .strate .noText{
        width: 24px;
        height: 24px;
    }
    .strate .el-table__header-wrapper .has-gutter tr th{
        background: #f2f2f2;
    }
    .strate .msg{
        display: inline;
        margin-left: 15px;
    }
    .strate  .hidebox .el-form-item{
        border:1px solid #e4e4e4;
        border-radius:6px;
    }

    .strate .el-form .item-mini-input .el-input-group{
        width:20%
    }
    .strate .el-dialog .el-form-item .el-switch{
        margin-left:10px;
        vertical-align: text-bottom
    }

        .el-table thead{
            color: #666;
        }

    .strate  .hidebox .border{
        border-bottom: 1px dashed  #d7d7d7;
        margin-bottom: 20px;
        margin-top: -11px;
    }

    .strate .msg span{
        color:brown;
    }

    .strate .el-textarea__inner{
        font-family:'Microsoft Yahei';
    }

    .strate .hidebox .el-form-item__label{
        text-align:center;
        padding-right:0
    }
    .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__content,
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
        padding-left:8px;
    }
    
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content .el-switch{
        vertical-align: middle;
        display: flex;
    }
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__content{
        display: flex;
        align-items: center;
    }

    .strate .hidebox .el-textarea__inner{
        outline:none;
        border:none;
    }
    .strate .serverDialog .el-form .el-form-item:nth-of-type(4) .tips .border{
        left:41%;
    }
    .strate .serverDialog .el-form .el-form-item:nth-of-type(5) .tips .border{
        left:24%;
    }
    .strate .hidebox .el-form-item:nth-of-type(1) .el-form-item__label{
        line-height:66px;
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        padding-right:0
    }
    .strate .el-dialog .el-icon-question{
        position: absolute;
        top:9px;
        left: -10px;
        cursor: pointer;
    }
    .strate .el-dialog .icon:hover .tips{
        display: block;
    }

    .strate .el-dialog .tips{
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
    .strate .el-dialog .tips .border{
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:8px solid rgb(50, 65, 87);
        border-bottom:8px solid transparent;
        position: absolute;
        bottom:-15px;
        left:22%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(5) .border{
        left: 38%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(7) .border{
        left: 18%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(8) .border{
        left: 16%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(9) .border{
        left: 30%;
    }
    .strate .el-dialog .el-form-item:nth-of-type(10) .border{
        left: 25%;
    }
    .strate .hidebox .el-form-item:nth-of-type(2) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:96px;
    }
    .strate .hidebox .el-form-item:nth-of-type(3) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        line-height:35px;
        background:#f5f5f5;
    }
    .strate .hidebox .el-form-item:nth-of-type(4) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:55px;
    }
    .strate .hidebox .el-form-item:nth-of-type(5) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:35px;
    }
    .strate .hidebox .el-form-item:nth-of-type(6) .el-form-item__label{
        border-right:1px solid #fbfbfb;
        background:#f5f5f5;
        line-height:54px;
    }
    .strate .el-table th>.cell{
        text-align: center;
        font-size: 14px;
    }
    .strate .el-table td>.cell{
        text-align: center;
        font-size: 14px;
    }
    .strate .el-form .item-mini-input{
        display: inline-block;
    }
    .strate .el-form .item-mini-input:nth-of-type(1){
        width: 10%;
    }
    .strate .el-form .item-mini-input:nth-of-type(2),.strate .el-form .item-mini-input:nth-of-type(3){
        width: 8%;
    }
        .strate .el-form .item-mini-input{
            display: inline-block;
            width: 10%;
        }
        .strate .el-form .item-mini-select{
            width: 20%;
        }
        .strate .el-form .el-input.item-mini-input:nth-of-type(1){
            width: 10%;
        }
        .strate .el-form .el-input.item-mini-input:nth-of-type(2),.strate .el-form .el-input.item-mini-input:nth-of-type(3){
            width: 8%;
        }
        .strate .el-form .item-mini-input .el-input__inner{
            padding:0;
            text-align: center;
        } 
        .strate .el-dialog .icon:hover .tips{
            display: block;
        }
        .strate .el-dialog .tips{
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
        .strate .el-form .times{
            background: #E4E4E4;
            border-radius: 0px 4px 4px 0px;
            margin-left: -6px;
            padding-top: 2px;
            padding-left: 9px;
            padding-right: 9px;
            padding-bottom: 2px;
        }
        .strate .el-dialog .hidebox .abnormal .el-input__inner{
            height: 23px;
            padding:0;
            text-align:center;
        }
        .strate .el-form .el-input-group__append{
            padding:0 13px;
            background:#e4e4e4;
            color:#666
        }

    .strate  .el-slider__runway{
    margin-left:20px;
    width: 95%;
    margin-top:14px;
}
    .strate .edit{
        width: 19px;
        height: 20px;
        background: url("/static/img/update.png") no-repeat -41px -25px;
        display: inline-block;
        cursor: pointer;
    }
    .strate .el-icon-edit-outline::before{
        cursor: pointer;
        width: 25px !important;
        height: 30px !important;
    }

    .strate .stop{
            width: 24px;
            height: 24px;
            background: url("/static/img/update.png") no-repeat -23px 0px;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
        }

    .strate .play{
        width: 24px;
        height: 24px;
        background: url("/static/img/update.png") no-repeat -60px -22px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
    .popper__arrow{
        display: none;
    }
</style>
