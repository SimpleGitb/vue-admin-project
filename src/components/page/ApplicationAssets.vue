<template>
    <div class="application">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="iconfont icon-wangzhan"></i> 应用资产</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="left">
                        <el-dropdown split-button type="primary" @click="addAssets">
                                <i class="el-icon-circle-plus"></i>&nbsp;添加网站
                            <el-dropdown-menu slot="dropdown" @click="batch">
                                <el-dropdown-item>
                                    <span @click="batch">批量添加</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    <!-- 搜索类型 -->
                    <el-input v-model="select_word" placeholder="请输入网站名称或域名" class="input-with-select" style="width:0">
                        <el-button slot="append" icon="el-icon-search" @click="sendSearchAsset"></el-button>
                    </el-input>
                </div>
                <div class="right">
                    <el-button type="danger" icon="el-icon-delete" @click="deleteAllInput">批量删除</el-button>
                    <el-dropdown split-button type="primary">
                       <i class="el-icon-setting"></i>&nbsp;系统操作
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>                    
                            <p @click="associated">批量关联</p>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <p @click="allocation">分配策略</p>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <p @click="exportReport">导出报表</p>
                        </el-dropdown-item>                        
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-table border v-loading="loading2" ref="multipleTable" :data="tableData3" @selection-change="handleSelectionChange"
                @row-click="handleMovelayer">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column label="单位" width="150">
                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                </el-table-column>
                <el-table-column label="应用名称">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="URL">
                    <template slot-scope="scope">{{ scope.row.domain }}</template>
                </el-table-column>
                <el-table-column label="威胁事件" >
                    <template slot-scope="scope">
                        <div class="threatEvent"  @click="threatEvent($event,scope,scope.row.threat_new_count)" :style="{color:red}" v-if="scope.row.threat_new_count ==  0 ? red='#333' : red='red'">
                            <span>{{ scope.row.threat_count }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="资产事件">
                    <template slot-scope="scope">
                        <div class="assetEvent" @click="hrefAssetEvent(scope,$event)" :style="{color:red}" v-if="scope.row.event_color ==  0 ? red='#333' : red='red'">
                            <span>{{ scope.row.event_count }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div :class="scope.row.alive == 1 ? 'play' :'stop'" @click="handleDisable(scope.row,$event)"></div>
                        <div class="update" @click="edit(scope,$event)"></div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="changepage"
                    :current-page.sync="currentPage2"
                    :page-sizes="[10,50,100,]"
                    :page-size="1"
                    layout="sizes, prev, pager, next"
                    :total="totalpage">
                    </el-pagination>
                <!-- <el-pagination layout="prev, pager, next" :total="totalpage" @current-change="changepage"></el-pagination> -->
            </div>
        </div>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </div>
        </el-dialog>
        <div class="layer" v-loading="loading3" :style="{right:right}">
            <div class="layer-header">
                <div class="head-content">
                    <img src="../../../static/img/assets/icon.png">
                    <p class="title">{{layerData[0].site +'-'+ layerData[0].domain}}</p>
                </div>
                <div class="head-close" @click="handleLayerClose">
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                </div>
            </div>
            <div class="layer-content">
                <div class="content-list">
                    <el-tabs type="card" v-model="activeName" @tab-click="tabclick">
                        <el-tab-pane label="事件中心" name="first">
                            <div class="childtab">
                                <div class="tab-header">
                                    <el-tabs type="border-card" class="panpal"  @tab-click="tabclick1" v-model="activeName2">
                                        <el-tab-pane label="威胁事件" name="first">
                                            <div>
                                                <el-tabs v-model="activeName3" @tab-click="threatclick">
                                                    <el-tab-pane label="最新威胁" name="first">
                                                        <div class="left_l">
                                                            <img src="../../../static/img/monitoring/screening.png">
                                                            <el-select v-model="valueSelect2" multiple placeholder="请选择筛选类型" @change="selectType2">
                                                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                            <!-- 搜索类型 -->
                                                        </div>
                                                        <div class="right">
                                                            <el-input placeholder="请输入关键词" v-model="keywords1" class="input-with-select" style="width:0">
                                                                <el-button slot="append" icon="el-icon-search" @click="sendSearch"></el-button>
                                                            </el-input>
                                                        </div>
                                                        <div class="table-threat" @mouseleave="hideTips">
                                                            <div class="tips" :style="{left:tipsLeft,top:tipsTop,display:display}">
                                                                <span>{{tipsMsgs}}</span>
                                                                <a v-show="isshow" href="javascript:;" @click="hrefAsset" class="view">立即查看</a>
                                                                <div class="border"></div>
                                                            </div>
                                                            <el-table @cell-mouse-enter="showTips" v-loading="loading4" border ref="multipleTable" :data="layerTab">
                                                                <!-- <el-table-column type="selection" width="55">
                                                            </el-table-column> -->
                                                                <el-table-column label="主管单位" width="120">
                                                                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="单位">
                                                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="URL">
                                                                    <template slot-scope="scope">{{ scope.row.url }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="敏感链接">
                                                                    <template slot-scope="scope">{{ scope.row.link }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="发生时间">
                                                                    <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="关键词">
                                                                    <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="类型" width="100">
                                                                    <template slot-scope="scope">
                                                                        <div v-if="scope.row.type == 'pic_hack'">
                                                                            <img src="../../../static/img/monitoring/chain.png"> 图片篡改
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'js_link'">
                                                                            <img src="../../../static/img/monitoring/script.png"> 恶意脚本
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'hijack'">
                                                                            <img src="../../../static/img/monitoring/event.png"> 劫持事件
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site_link'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 可疑链接
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 敏感词
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="快照" width="60">
                                                                    <template slot-scope="scope">
                                                                        <a :href="scope.row.link" target="_blank">
                                                                            <i class="iconfont kuaizhao">&#xe609;</i>
                                                                        </a>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="操作">
                                                                    <template slot-scope="scope">
                                                                        <div class="btn-list">
                                                                            <el-button type="primary" class="list-item blue" @click="confrim(scope.row.id)">确认</el-button>
                                                                            <el-button type="primary" class="list-item orange" @click="ignore(scope.row.id)">忽略</el-button>
                                                                            <el-button type="primary" class="list-item pink" @click="positive(scope.row.id)">误报</el-button>
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                            <div class="pagination">
                                                                <el-pagination layout="prev, pager, next" :total="newthreatpage" @current-change="threatchangepage">
                                                                </el-pagination>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="已处置" name="check" class="waiteSetting">
                                                        <div class="left_l">
                                                            <!-- 省市区三级联动 -->
                                                            <img src="../../../static/img/monitoring/screening.png">
                                                            <el-select v-model="valueSelect3" multiple placeholder="请选择筛选类型" @change="selectType3">
                                                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        <div class="right">
                                                            <el-input placeholder="请输入关键词" v-model="keywords2" class="input-with-select" style="width:0">
                                                                <el-button slot="append" icon="el-icon-search" @click="sendSearch1"></el-button>
                                                            </el-input>
                                                        </div>
                                                        <div class="table-threat" @mouseleave="hideTips">
                                                            <div class="tips" :style="{left:tipsLeft,top:tipsTop,display:display}">
                                                                <span>{{tipsMsgs}}</span>
                                                                <a v-show="isshow" href="javascript:;" @click="hrefAsset" class="view">立即查看</a>
                                                                <div class="border"></div>
                                                            </div>
                                                            <el-table @cell-mouse-enter="showTips" v-loading="loading5" border ref="multipleTable" :data="disposal">
                                                                <!-- <el-table-column type="selection" width="55">
                                                            </el-table-column> -->
                                                                <el-table-column label="主管单位" width="120">
                                                                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="单位">
                                                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="URL">
                                                                    <template slot-scope="scope">{{ scope.row.url }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="敏感链接">
                                                                    <template slot-scope="scope">{{ scope.row.link }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="发生时间">
                                                                    <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="关键词">
                                                                    <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="类型" width="100">
                                                                    <template slot-scope="scope">
                                                                        <div v-if="scope.row.type == 'pic_hack'">
                                                                            <img src="../../../static/img/monitoring/chain.png"> 图片篡改
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'js'">
                                                                            <img src="../../../static/img/monitoring/script.png"> 恶意脚本
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'hijack'">
                                                                            <img src="../../../static/img/monitoring/event.png"> 劫持事件
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 敏感词
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site_link'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 可疑链接
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="快照" width="60">
                                                                    <template slot-scope="scope">
                                                                        <a :href="scope.row.cache" target="_blank">
                                                                            <i class="iconfont icon-kuaizhao"></i>
                                                                        </a>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="操作">
                                                                    <template slot-scope="scope">
                                                                        <div class="btn-list">
                                                                            <!-- <el-button type="primary" class="list-item">处置</el-button> -->
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                            <div class="pagination">
                                                                <el-pagination layout="prev, pager, next" :total="disposalpage" @current-change="disposalchangepage">
                                                                </el-pagination>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="已误报" name="positives" class="waiteSetting">
                                                        <div class="left_l">
                                                            <!-- 省市区三级联动 -->
                                                            <img src="../../../static/img/monitoring/screening.png">
                                                            <el-select v-model="valueSelect4" multiple placeholder="请选择筛选类型" @change="selectType4">
                                                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        <div class="right">
                                                            <el-input placeholder="请输入关键词" v-model="keywords3" class="input-with-select" style="width:0">
                                                                <el-button slot="append" icon="el-icon-search" @click="sendSearch2"></el-button>
                                                            </el-input>
                                                        </div>
                                                        <div class="table-threat" @mouseleave="hideTips">
                                                            <div class="tips" :style="{left:tipsLeft,top:tipsTop,display:display}">
                                                                <span>{{tipsMsgs}}</span>
                                                                <a v-show="isshow" href="javascript:;" @click="hrefAsset" class="view">立即查看</a>
                                                                <div class="border"></div>
                                                            </div>
                                                            <el-table @cell-mouse-enter="showTips" v-loading="loading6" border ref="multipleTable" :data="positives">
                                                                <!-- <el-table-column type="selection" width="55">
                                                            </el-table-column> -->
                                                                <el-table-column label="主管单位" width="120">
                                                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="单位">
                                                                    <template slot-scope="scope">{{ scope.row.owner }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="URL">
                                                                    <template slot-scope="scope">{{ scope.row.url }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="敏感链接">
                                                                    <template slot-scope="scope">{{ scope.row.link }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="发生时间">
                                                                    <template slot-scope="scope">{{ scope.row.created_at }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="关键词">
                                                                    <template slot-scope="scope">{{ scope.row.keywords }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="类型" width="100">
                                                                    <template slot-scope="scope">
                                                                        <div v-if="scope.row.type == 'pic_hack'">
                                                                            <img src="../../../static/img/monitoring/chain.png"> 图片篡改
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'js'">
                                                                            <img src="../../../static/img/monitoring/script.png"> 恶意脚本
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'hijack'">
                                                                            <img src="../../../static/img/monitoring/event.png"> 劫持事件
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 敏感词
                                                                        </div>
                                                                        <div v-if="scope.row.type == 'site_link'">
                                                                            <img src="../../../static/img/monitoring/sensitive.png"> 可疑链接
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="快照" width="60">
                                                                    <template slot-scope="scope">
                                                                        <a :href="scope.row.cache" target="_blank">
                                                                            <i class="iconfont">&#xe609;</i>
                                                                        </a>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="操作">
                                                                    <template slot-scope="scope">
                                                                        <div class="btn-list">
                                                                            <el-button type="primary" class="list-item" @click="undo(scope.row.id)">撤销</el-button>
                                                                        </div>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                            <div class="pagination">
                                                                <el-pagination layout="prev, pager, next" :total="positivespage" @current-change="positiveschangepage">
                                                                </el-pagination>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="历史威胁" name="fourth">
                                                        <div class="historthreat" v-loading="threatLoading">
                                                            <div class="item-noText" v-if="threat.length== 0">
                                                                <img src="../../../static/img/assets/noText.png">
                                                                <span>暂无历史威胁</span>
                                                            </div>
                                                            <div class="history-list">
                                                                <el-steps direction="vertical" :active="1">
                                                                    <div class="box" v-for="(item,index) in threat" :key="index">
                                                                        <div class="border"></div>
                                                                        <el-step title="">
                                                                        </el-step>
                                                                        <p class="createTime">{{item.cache_link.split('/')[4]}}</p>
                                                                        <div class="item-list">
                                                                            <div class="item-top">
                                                                                <p>时间：{{item.cache_link.split('/')[4]}}</p>
                                                                                <p>事件：出现敏感词：
                                                                                    <a :href="item.link">{{item.link}}</a> {{item.keywords}}</p>
                                                                                <p>快照：
                                                                                    <a :href="item.cache_link ? item.cache_link : 'javascript:void(0);'" target="_blank" class="view">查看</a>
                                                                                </p>
                                                                            </div>
                                                                            <div class="item-bottom">
                                                                                <p>{{item.confirm.length>=1 ? item.confirm :
                                                                                    '暂无确认信息'}}</p>
                                                                                <p>{{item.deal.length>=1 ? item.deal : '暂无处置信息'}}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </el-steps>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                </el-tabs>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="资产事件" name="assetEvent">
                                            <div class="assetsEvent" v-loading="eventLoading">
                                                <div class="item-noText" v-if="assetEventTime.length== 0">
                                                    <img src="../../../static/img/assets/noText.png">
                                                    <span>暂无资产事件</span>
                                                </div>
                                                <div class="history-list" v-else>
                                                    <el-steps direction="vertical" :active="1">
                                                        <div class="box" v-for="(value, key, index) in assetEventTime" :key="index">
                                                            <div class="border"></div>
                                                            <el-step title="">
                                                            </el-step>
                                                            <p class="createTime">{{value.created_at}}</p>
                                                            <div class="item-list">
                                                                <div class="item-top">
                                                                    {{value.content}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </el-steps>
                                                </div>
                                                            <div class="pagination">
                                                                <el-pagination layout="prev, pager, next" :total="assetEventpage" @current-change="assetEventchangepage">
                                                                </el-pagination>
                                                            </div>                                                    
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="威胁情报">
                                            <div class="intelligence">
                                                <ul>
                                                    <li>
                                                        <p>同ip网站被黑</p>
                                                        <span> 2018-07-26 12：30：15</span>
                                                    </li>
                                                    <li>
                                                        <p>cms爆发漏洞</p>
                                                        <span> 2018-07-26 12：30：15</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="WEB资产" name="second">
                            <div class="web-assets" v-loading="webasset">
                                <div class="assets-header">
                                    <div class="icon">
                                        <img src="../../../static/img/assets/border1.png">
                                        <img src="../../../static/img/assets/border2.png">
                                        <img src="../../../static/img/assets/border3.png">
                                        <img src="../../../static/img/assets/border3.png">
                                    </div>
                                    <p class="header-title">正常监测</p>
                                </div>
                                <div class="assets-content">
                                    <div class="content-list">
                                        <div class="list-item">
                                            <div class="item-header">
                                                <p class="header-title">
                                                    <span>网站信息</span>
                                                </p>
                                            </div>
                                            <div class="item-content">
                                                <el-table border :data="layerData" style="width: 100%">
                                                    <el-table-column prop="language" label="开发语言" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="database" label="数据库" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="server" label="Web容器">
                                                    </el-table-column>
                                                    <el-table-column prop="os" label="操作系统">
                                                    </el-table-column>
                                                    <el-table-column prop="ip" label="IP/CDN">
                                                    </el-table-column>
                                                    <el-table-column prop="cms" label="Web指纹">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                        <div class="list-item">
                                            <div class="item-header">
                                                <p class="header-title">
                                                    <span>域名属性</span>
                                                </p>
                                            </div>
                                            <div class="item-content">
                                                <el-table border :data="layerData" style="width: 100%">
                                                    <el-table-column prop="whois_isp" label="域名注册商" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="whois_name" label="域名所有者" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="whois_mail" label="邮箱">
                                                    </el-table-column>
                                                    <el-table-column prop="icp_name" label="备案单位">
                                                    </el-table-column>
                                                    <el-table-column prop="icp_id" label="备案号">
                                                    </el-table-column>
                                                    <el-table-column prop="whois_dns" label="DNS">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                        <div class="list-item">
                                            <div class="item-header">
                                                <p class="header-title">
                                                    <span>服务器信息</span>
                                                </p>
                                            </div>
                                            <div class="item-content">
                                                <ul class="iplist">
                                                    <li class="ipaddress">{{layerData[0].ipaddress}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="list-item domain">
                                            <div class="item-header">
                                                <p class="header-title">
                                                    <span>子域名</span>
                                                </p>
                                            </div>
                                            <div class="item-content">
                                                <el-table border :data="subdomain" style="width: 100%">
                                                    <el-table-column prop="domain" label="域名" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="name" label="标题" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.language" label="开发语言">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.database" label="数据库">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.server" label="WEB容器">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.os" label="操作系统">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.ip" label="IP/CDN">
                                                    </el-table-column>
                                                    <el-table-column prop="asset.cms" label="Web指纹">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="基本信息" name="third">
                            <div class="infomations">
                                <div class="information" v-loading="inforLoading">
                                    <ul class="infomation-list">
                                        <li>
                                            <p>该站点由：
                                                <span>{{information.adder}}</span> 于：
                                                <span> {{information.created_at}}</span> 添加
                                            </p>
                                        </li>
                                        <li>
                                            <p>所属单位：
                                                <span>{{information.owner}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>监测规则：
                                                <span>{{information.configure }}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>关联单位：
                                                <span v-for="item in information.superior" :key="item.id">{{item.owner}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>单位所属销售：
                                                <span>{{information.salesman}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>监测截止时间：
                                                <span>{{information.updated_at}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>备注：
                                                <span>{{information.remark}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>最后监测间时：
                                                <span>{{information.updated_at}}</span>
                                            </p>
                                        </li>
                                        <li class="border"></li>
                                        <li>
                                            <p>策略名称:
                                                <span>{{configureData.name}}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>首页监测:
                                                <span v-if="configureData.index == 60">
                                                    1小时
                                                </span>
                                                <span v-if="configureData.index == 5">
                                                    5分钟
                                                </span>
                                                <span v-if="configureData.index == 15">
                                                    15分钟
                                                </span>
                                                <span v-if="configureData.index == 360">
                                                    6小时
                                                </span>
                                                <span v-if="configureData.index == 1440">
                                                    1天
                                                </span>
                                                <span v-if="configureData.index == 4320">
                                                    3天
                                                </span>
                                                <span v-if="configureData.index == 30">
                                                    30分钟
                                                </span>
                                                <span v-if="configureData.index == 10080">
                                                    7天
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>图片篡改：
                                                <span v-if="configureData.picture == 60">
                                                    1小时
                                                </span>
                                                <span v-if="configureData.picture == 5">
                                                    5分钟
                                                </span>
                                                <span v-if="configureData.picture == 15">
                                                    15分钟
                                                </span>
                                                <span v-if="configureData.picture == 360">
                                                    6小时
                                                </span>
                                                <span v-if="configureData.picture == 1440">
                                                    1天
                                                </span>
                                                <span v-if="configureData.picture == 4320">
                                                    3天
                                                </span>
                                                <span v-if="configureData.picture == 30">
                                                    30分钟
                                                </span>
                                                <span v-if="configureData.picture == 10080">
                                                    7天
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>劫持监测：
                                                <span v-if="configureData.hack == 60">
                                                    1小时
                                                </span>
                                                <span v-if="configureData.hack == 5">
                                                    5分钟
                                                </span>
                                                <span v-if="configureData.hack == 15">
                                                    15分钟
                                                </span>
                                                <span v-if="configureData.hack == 360">
                                                    6小时
                                                </span>
                                                <span v-if="configureData.hack == 1440">
                                                    1天
                                                </span>
                                                <span v-if="configureData.hack == 4320">
                                                    3天
                                                </span>
                                                <span v-if="configureData.hack == 30">
                                                    30分钟
                                                </span>
                                                <span v-if="configureData.hack == 10080">
                                                    7天
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>深度监测：
                                                <span v-if="configureData.deep == 60">
                                                    1小时
                                                </span>
                                                <span v-if="configureData.deep == 5">
                                                    5分钟
                                                </span>
                                                <span v-if="configureData.deep == 15">
                                                    15分钟
                                                </span>
                                                <span v-if="configureData.deep == 360">
                                                    6小时
                                                </span>
                                                <span v-if="configureData.deep == 1440">
                                                    1天
                                                </span>
                                                <span v-if="configureData.deep == 4320">
                                                    3天
                                                </span>
                                                <span v-if="configureData.deep == 30">
                                                    30分钟
                                                </span>
                                                <span v-if="configureData.deep == 10080">
                                                    7天
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>域名监测：
                                                <span v-if="configureData.domain == 60">
                                                    1小时
                                                </span>
                                                <span v-if="configureData.domain == 5">
                                                    5分钟
                                                </span>
                                                <span v-if="configureData.domain == 15">
                                                    15分钟
                                                </span>
                                                <span v-if="configureData.domain == 360">
                                                    6小时
                                                </span>
                                                <span v-if="configureData.domain == 1440">
                                                    1天
                                                </span>
                                                <span v-if="configureData.domain == 4320">
                                                    3天
                                                </span>
                                                <span v-if="configureData.domain == 30">
                                                    30分钟
                                                </span>
                                                <span v-if="configureData.domain == 10080">
                                                    7天
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>情报威胁：
                                                <span v-if="configureData.notice == 1">
                                                    已开启
                                                </span>
                                                <span v-if="configureData.notice == 0">
                                                    未开启
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>可用性监测：
                                                <span v-if="configureData.usability == 1">
                                                    已开启
                                                </span>
                                                <span v-if="configureData.usability == 0">
                                                    未开启
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="monitoringcount">
                                    <div class="count-list">
                                        <div class="list-bg">
                                            <img src="../../../static/img/assets/bg.png">
                                        </div>
                                        <ul>
                                            <li>
                                                <div class="item-box">
                                                    <span>{{information.count.index ? information.count.index : 0}}</span>
                                                    <p>首页监测次数</p>
                                                </div>
                                                <div class="item-arrow">
                                                    <img src="../../../static/img/assets/arrow.png">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="item-box">
                                                    <span>{{information.count.deep ? information.count.deep : 0}}</span>
                                                    <p>深度监测次数</p>
                                                </div>
                                                <div class="item-arrow">
                                                    <img src="../../../static/img/assets/arrow.png">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="item-box">
                                                    <span>{{information.count.picture ? information.count.picture : 0}}</span>
                                                    <p>图片监测次数</p>
                                                </div>
                                                <div class="item-arrow">
                                                    <img src="../../../static/img/assets/arrow.png">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="item-box">
                                                    <span>{{information.count.hack ? information.count.hack : 0}}</span>
                                                    <p>劫持监测次数</p>
                                                </div>
                                                <div class="item-arrow">
                                                    <img src="../../../static/img/assets/arrow.png">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="item-box">
                                                    <span>{{information.count.domain ? information.count.domain : 0}}</span>
                                                    <p>域名监测次数</p>
                                                </div>
                                                <div class="item-arrow">
                                                    <img src="../../../static/img/assets/arrow.png">
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="border">
                                        <img src="../../../static/img/assets/borders.png">
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="可用性"  name="visble">
                            <div class="availability" v-loading="usabLoading">
                            <div class="noAvailability" v-if="nodeData.length == 0">
                                    <img src="../../../static/img/assets/noText.png" class="noText">
                                    <span>暂无可用性</span>
                            </div> 
                            <div class="nodeData"  v-show="!nodeData.length">
                                <div class="left_btn">
                                       <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                                        <el-radio-button label="day" class="is-active"><span @click="changedelay1(1)">今天</span></el-radio-button>
                                        <el-radio-button label="three"><span @click="changedelay1(3)">3天</span></el-radio-button>
                                        <el-radio-button label="week"><span @click="changedelay1(7)">一周</span></el-radio-button>
                                        <el-radio-button label="threedays"><span @click="changedelay1(30)">30天</span></el-radio-button>
                                         <el-date-picker
                                            v-model="usabval"
                                            v-show="customval"
                                            @change="changedelay1(0)"
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                            </el-date-picker>
                                        <el-radio-button label="custom"><span @click="custom">自定义</span></el-radio-button>
                                        </el-radio-group>
                                </div>
                                <div class="right_btn">
                                    <el-radio-group v-model="tabPosition1" style="margin-bottom: 30px;">
                                        <el-radio-button label="average"><span @click="average">平均</span></el-radio-button>
                                        <el-radio-button :label="index"  v-for="(value,key,index) in nodeData" :key="index"><span @click="changedelay(key)">{{value}}</span></el-radio-button>
                                    </el-radio-group>
                                        <el-button type="primary" @click="usblityVisble = true">导出报表</el-button>
                                </div>
                                <div class="clear"></div> 
                                <div class="leftContent" style="widht:100%;position:relative">
                                    <div class="siteDelay" id="siteDelay" style="width:100%;height:500px;position:absolute;top:60px"></div>
                                    <div class="dalayTime" id="delayTime" style="width:100%;height:500px;margin-top:50px;position:absolute;top:600px"></div>
                                </div>
                            </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <el-dialog title="资产添加" :visible.sync="showdialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="所属单位">
                    <el-autocomplete style="width:80%;" popper-class="my-autocomplete" v-model="assetsalertData.owner" @focus="querySearch" :fetch-suggestions="querySearch"
                        placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @select="selectunit">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>
                    <!-- <el-select v-model="assetsalertData.owner" filterable placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @change="selectunit" style="width:60%">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="assetsalertData.name" class="alertInput" placeholder="填写该网站名称(全称)"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="assetsalertData.url" class="alertInput" @blur="geturl" placeholder="填写该网站网址，格式：http://www.ah.gov.cn/"></el-input>
                </el-form-item>
                <el-form-item label="选择策略">
                    <el-select v-model="assetsalertData.strategydata" placeholder="请选择策略" @change="addStrategyselect">
                        <el-option v-for="item in strategydata" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-if="assetsalertData.selectd" class="hideStrate">
                    <el-form-item label="监控时间段">
                        <el-date-picker v-model="assetsalertData.startTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="每天时间段">
                        <el-select class="item-mini-select" v-model="assetsalertData.startdaily" :disabled="isdisable">
                            <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                        </el-select>
                        -
                        <el-select class="item-mini-select" v-model="assetsalertData.enddaily" :disabled="isdisable">
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
                            <el-slider v-model="assetsalertData.homemonitoringNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
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
                            <el-slider v-model="assetsalertData.photoTamperingNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
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
                            <el-slider v-model="assetsalertData.hijackedNum" :format-tooltip="changestep3" :step="33" :disabled="isdisable">
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
                            <el-slider v-model="assetsalertData.monitoringNum" :format-tooltip="changestep" :step="25" :disabled="isdisable">
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
                            <el-slider v-model="assetsalertData.domainmonitorNum" :format-tooltip="changestep1" :step="33" :disabled="isdisable">
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
                        <el-switch v-model="assetsalertData.delivery" style="margin-left:28px;"></el-switch>
                    </el-form-item>
                </div>
                <div v-show="assetsalertData.strategydata" class="hidebox">
                    <el-form-item label="可用性监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                            <div class="tips">
                                <div class="border"></div>
                                分布式监测该应用的可用性与延时状况
                            </div>
                        </div>
                                 <el-slider
                                    :disabled="isdisable"
                                    v-model="assetsalertData.usability"
                                    :format-tooltip="usabilitychange1"
                                    :step="16.5"
                                    @change="usabilitychange"
                                    >
                                </el-slider>
                    </el-form-item>
                    <div v-show="assetsalertData.usability">
                        告警策略
                        <div class="dborder"></div>
                        <el-form-item label="异常条件" class="abnormal">
                            当响应时间大于&nbsp;
                            <div style="display:inline" class="item-mini-input">
                                <el-input type="number" min="0" v-model="assetsalertData.resTime">
                                    <template slot="append">ms</template>
                                </el-input>
                            </div>&nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                            <div class="item-mini-input">
                                <el-input min="0" type="number" v-model="assetsalertData.threat_count"></el-input>
                            </div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;
                            <div class="item-mini-input">
                                <el-input min="0" v-model="assetsalertData.continue_count" type="number"></el-input>
                            </div>&nbsp;次时进行报警。
                        </el-form-item>
                        <el-form-item label="警告次数">
                            监控将最多发出&nbsp;
                            <div class="item-mini-select">
                                <el-select v-model="assetsalertData.notice_count" placeholder="">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                </el-select>
                            </div>&nbsp;次警告
                        </el-form-item>
                        <el-form-item label="自定义cookie" class="custom">
                            <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="assetsalertData.custom">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="是否跟随跳转">
                            <el-switch v-model="assetsalertData.jump"></el-switch>
                            <div class="msg">
                                <p class="msg">
                                    <span>*</span> 默认监测跳转后的状态码
                                </p>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="策略备注" class="strategynote">
                    <el-input type="textarea" placeholder="请输入策略备注" v-model="assetsalertData.strategynote" class="alertInput" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="关联单位" class="associatedUnit">
                    <el-autocomplete popper-class="my-autocomplete" style="width:80%" v-model="assetsalertData.unit" @focus="querySearch" :fetch-suggestions="querySearch"
                        placeholder="请输入内容" @select="selectType">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>
                    <!-- <el-select v-model="assetsalertData.unit" style="width:80%;" filterable placeholder="表示该单位也需要接受或查看该网站的威胁，支持多个单位共同关注" class="selectType"
                    @change="selectType">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
                    <el-button type="primary" @click="addTag()">添加</el-button>
                </el-form-item>
                <el-form-item class="unitTag">
                    <el-tag closable @close="closeUnitTag(item)" v-for="(item,index) in unitData" :key="index">
                        {{item}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="网站标签:">
                    <el-tag closable @close="closeSiteTag(item)" v-for="(item,index) in sitetag" :key="index">
                        {{item}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
                </el-form-item>
                <el-form-item label="站点备注">
                    <el-input type="textarea" placeholder="请输入站点备注" v-model="assetsalertData.remark" class="alertInput" resize="none"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showdialog = false">取 消</el-button>
                <el-button type="primary" @click="saveaddAsset">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="资产编辑" :visible.sync="addAssetsDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="所属单位">
                    <el-autocomplete style="width:80%;" popper-class="my-autocomplete" v-model="editAssets.owner" @focus="querySearch" :fetch-suggestions="querySearch"
                        placeholder="请输入内容" @select="selectunit">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>
                    <!-- <el-select v-model="editAssets.owner" filterable placeholder="请选择该网站直属单位，鼠标点击后支持搜索" @change="selectunit" style="width:80%">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="editAssets.name" class="alertInput" placeholder="填写该网站名称(全称)"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="editAssets.url" class="alertInput" @blur="geturl2" placeholder="填写该网站网址，格式：http://www.ah.gov.cn/"></el-input>
                </el-form-item>
                <el-form-item label="选择策略">
                    <el-select v-model="editAssets.strategydata" placeholder="请选择策略" @change="addStrategyselect">
                        <el-option v-for="item in strategydata" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-if="editAssets.selectd" class="hideStrate">
                    <el-form-item label="监控时间段">
                     <el-date-picker v-model="editAssets.startTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日" :disabled="isdisable"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="每天时间段">
                        <el-select class="item-mini-select" v-model="editAssets.startdaily" :disabled="isdisable">
                            <el-option v-for="item in dayTime" :key="item" :lable="item" :value="item"></el-option>
                        </el-select>
                        -
                        <el-select class="item-mini-select" v-model="editAssets.enddaily" :disabled="isdisable">
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
                            <el-slider v-model="editAssets.homemonitoringNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
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
                            <el-slider v-model="editAssets.photoTamperingNum" :format-tooltip="changestep2" :step="16.5" :disabled="isdisable">
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
                            <el-slider v-model="editAssets.hijackedNum" :format-tooltip="changestep3" :step="33" :disabled="isdisable">
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
                            <el-slider v-model="editAssets.monitoringNum" :format-tooltip="changestep" :step="25" :disabled="isdisable">
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
                            <el-slider v-model="editAssets.domainmonitorNum" :format-tooltip="changestep1" :step="33" :disabled="isdisable">
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
                        <el-switch v-model="editAssets.delivery" style="margin-left:28px;"></el-switch>
                    </el-form-item>
                </div>
                <div v-show="editAssets.strategydata" class="hidebox">
                    <el-form-item label="可用性监测">
                        <div class="icon">
                            <i class="el-icon-question"></i>
                            <div class="tips">
                                <div class="border"></div>
                                分布式监测该应用的可用性与延时状况
                            </div>
                        </div>
                                <el-slider
                                    v-model="editAssets.usability"
                                    :disabled="isdisable"
                                    :format-tooltip="usabilitychange1"
                                    :step="16.5"
                                    @change="usabilitychange2"
                                    >
                                </el-slider>
                    </el-form-item>
                    <div v-show="editAssets.usability">
                        告警策略
                        <div class="dborder"></div>
                        <el-form-item label="异常条件" class="abnormal">
                            当响应时间大于&nbsp;
                            <div style="display:inline" class="item-mini-input">
                                <el-input type="number" min="0" v-model="editAssets.resTime">
                                    <template slot="append">ms</template>
                                </el-input>
                            </div>&nbsp;&nbsp;或被监控URL出现无法访问；同时，警告次数当有至少
                            <div class="item-mini-input">
                                <el-input type="number" min="0" v-model="editAssets.threat_count"></el-input>
                            </div>&nbsp;个监测点出现异常，并且此异常连续出现&nbsp;
                            <div class="item-mini-input">
                                <el-input v-model="editAssets.continue_count" min="0" type="number"></el-input>
                            </div>&nbsp;次时进行报警。
                        </el-form-item>
                        <el-form-item label="警告次数">
                            监控将最多发出&nbsp;
                            <div class="item-mini-select">
                                <el-select v-model="editAssets.notice_count" placeholder="">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                </el-select>
                            </div>&nbsp;次警告
                        </el-form-item>
                        <el-form-item label="自定义cookie" class="custom">
                            <el-input type="textarea" placeholder="请输入自定义内容" resize="none" v-model="editAssets.custom">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="是否跟随跳转">
                            <el-switch v-model="editAssets.jump"></el-switch>
                            <div class="msg">
                                <p class="msg">
                                    <span>*</span> 默认监测跳转后的状态码
                                </p>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="策略备注" class="strategynote">
                    <el-input type="textarea" placeholder="请输入策略备注" resize="none" v-model="editAssets.strategynote" class="alertInput"></el-input>
                </el-form-item>
                <el-form-item label="关联单位" class="associatedUnit">
                    <el-autocomplete popper-class="my-autocomplete" style="width:80%" v-model="editAssets.unit" @focus="querySearch" :fetch-suggestions="querySearch"
                        placeholder="请输入内容" @select="selectType1">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.owner }}</div>
                            <!-- <span class="addr">{{ item.address }}</span> -->
                        </template>
                    </el-autocomplete>
                    <!-- <el-select v-model="editAssets.unit" style="width:80%;" filterable placeholder="表示该单位也需要接受或查看该网站的威胁，支持多个单位共同关注" class="selectType"
                    @change="selectType1">
                    <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                    </el-option>
                </el-select> -->
                    <el-button type="primary" @click="addTag2()">添加</el-button>
                </el-form-item>
                <el-form-item class="unitTag">
                    <el-tag closable @close="closeUnitTag(item)" v-for="(item,index) in unitData2" :key="index">
                        {{item}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="网站标签:">
                    <el-tag closable @close="closeSiteTag(item)" v-for="(item,index) in sitetag2" :key="index">
                        {{item}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible2" v-model="inputValue2" ref="saveTagInput" size="small" @blur="handleInputConfirm2">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput2">+ 添加标签</el-button>
                </el-form-item>
                <el-form-item label="站点备注">
                    <el-input type="textarea" placeholder="请输入站点备注" resize="none" v-model="editAssets.remark" class="alertInput"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addAssetsDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEditAsset">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量添加" :visible.sync="batchAddAssets" width="35%" class="batchAdd">
            <el-form label-width="100px">
                <el-form-item label="选择策略">
                    <el-autocomplete popper-class="my-autocomplete" style="width:80%" v-model="batchAdd.strategy" @focus="querySearch1" :fetch-suggestions="querySearch1"
                        placeholder="请选择策略" @select="selectstrategydata">
                        <i class="el-icon-edit el-input__icon" slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.name }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" :rows="2" :autosize="{ minRows: 2, maxRows: 4}" placeholder="国土资|网站名称|http://www.baidu.com/" v-model="batchAdd.content"
                        resize="none">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="batchAddAssets = false">取 消</el-button>
                <el-button type="primary" @click="batchAddAsset">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :visible.sync="associate" width="35%">
            <el-form label-width="100px">
                <el-form-item label="所属上级">
                    <el-select v-model="associateds.superior" filterable placeholder="请选择上级" @change="selectAssociate" style="width:60%">
                        <el-option v-for="item in optionssite" :key="item.id" :label="item.owner" :value="item.owner">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="associate = false">取 消</el-button>
                <el-button type="primary" @click="saveEditsite">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择策略" :visible.sync="allocationDialog" width="35%">
            <el-form label-width="100px">
                <el-form-item label="选择策略">
                    <!-- <el-autocomplete
                            popper-class="my-autocomplete"
                            style="width:80%"
                            v-model="batchchoice"
                            @focus="querySearch1"
                            :fetch-suggestions="querySearch1"
                            placeholder="请选择策略"
                            @select="selectstrategydata">
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix">
                        </i>
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.name }}</div>
                             <span class="addr">{{ item.address }}</span>
                        </template>
                    </el-autocomplete>   -->
                    <el-select v-model="assetsalertData.strategydata" placeholder="请选择策略" @change="addStrategyselect">
                        <el-option v-for="item in strategydata" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="allocationDialog = false">取 消</el-button>
                <el-button type="primary" @click="selectdstrategy">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :visible.sync="editVisible" width="25%" class="confrim">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                    该操作将会确认该页面所有威胁 确定要确认吗？
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="alertData.customer">客户</el-checkbox>
                    <el-checkbox v-model="alertData.sales">销售</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" resize="none" v-model="alertData.remark" placeholder="说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEditConfrim">发送</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :visible.sync="ignoreVisible" width="25%" class="ignore">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                    该操作将会忽略该页面所有威胁 确定要忽略吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ignoreVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEditignore">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :visible.sync="positivesVisible" width="25%" class="positives">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                    该操作将会误报该页面所有威胁 确定要误报吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="positivesVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEditPositives">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="信息" :visible.sync="undoVisible" width="25%" class="undo">
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item>
                    该操作将会撤销该页面所有威胁 确定要撤销吗？
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEditUndo">确定</el-button>
                <el-button @click="undoVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="导出报表" :visible.sync="exportVisble" width="30%" class="exportPort">
                <div class="tip-header">
                    <img src="../../../static/img/assets/qat.png">
                    <p class="tip-msg">点击下方导出按钮后即可导出pdf格式的报表</p>
                </div>
                   <el-form>
                    <el-form-item label="时间筛选">
                        <el-date-picker v-model="theReport.startTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="exportVisble = false">取消</el-button>
                    <a class="exportBtn" :href="'/api/site/threat/export?start='+theReport.startTime[0]
                        +'&end='+theReport.startTime[1] +'&id=['+selecedId+']'">导出报表</a>
            </div>
        </el-dialog>  
             <el-dialog title="导出可用性报表" :visible.sync="usblityVisble" width="30%" class="exportPort">
                <div class="tip-header">
                    <img src="../../../static/img/assets/qat.png">
                    <p class="tip-msg">点击下方导出按钮后即可导出可用性报表</p>
                </div>
                   <el-form>
                    <el-form-item label="时间筛选">
                        <el-date-picker v-model="usblityReport.startTime" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日" @change="test"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="usblityVisble = false">取消</el-button>
                    <a class="exportBtn" :href="'/api/site/'+rowId+'/usability/export?start='+usblityReport.startTime[0]
                        +'&end='+usblityReport.startTime[1]">导出报表</a>
            </div>
        </el-dialog>      
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        name:'application',
        data() {
            return {
                currentPage2:1,
                includedComponents:'application',
                labelPosition: 'center',
                batchchoice: '',
                usabval:'',
                usblityVisble:false,
                tabPosition:'day',
                tabPosition1:'average',
                exportVisble:false,
                Ip:'',
                readonly:false,
                webasset:true,
                customval:false,
                allocationDialog: false,
                eventLoading: true,
                usabLoading:true,
                addAssetsDialog: false,
                batchAddAssets: false,
                associate: false,
                editVisible: false,
                positivesVisible: false,
                ignoreVisible: false,
                undoVisible: false,
                selectdstrategyUnitId: [],
                activeName2: 'first',
                activeName3:'first',
                activeName: '',
                loading2: false,
                loading3: false,
                loading4: false,
                loading5: false,
                loading6: false,
                showdialog: false,
                keywords: '',
                keywords1: '',
                keywords2: '',
                keywords3:'',
                newthreatpage: 0,
                disposalpage: 0,
                positivespage: 0,
                iscustom: false,
                isdisable: false,
                associatedUnit: [],
                assetEventpage:0,
                websiteData: [],
                restaurants: [],
                tipsLeft: '0px',
                tipsTop: '0px',
                tipsMsg: '',
                valueSelect4: '',
                tipschage: false,
                inputVisible: false,
                inputVisible2: false,
                inputValue: '',
                inputValue2: '',
                owner_id:'',
                theReport:{
                    startTime: [new Date().toLocaleDateString(),new Date(2018, 11, 30).toLocaleDateString()]
                },
                usblityReport:{
                    startTime: [new Date().toLocaleDateString(),new Date(2018, 11, 30).toLocaleDateString()]
                },
                batchAdd: {
                    strategy: '',
                    content: ''
                },
                associateds: {
                    superior: ''
                },
                assetsalertData: {
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
                    strategydata: '',
                    startTime: [new Date(),new Date(2018, 11, 30)],
                    startdaily: 0,
                    enddaily: 24,
                    selectd: false,
                    resTime: 200,
                    domainmonitor: '1天',
                    homemonitoring: '1小时',
                    photoTampering: '15分钟',
                    hijacked: '1天',
                    monitoring: '1天',
                    remark: '',
                    delivery: 0,
                    usability: 0,
                    usability1: 0,
                    jump: false,
                    threat_count: 2,
                    continue_count: 3,
                    notice_count: 3,
                    strategynote: '',
                    sitenote: '',
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum: 0,
                    domainmonitorNum: 0,
                    homemonitoringNum1: 0,
                    photoTamperingNum1: 0,
                    hijackedNum1: 0,
                    monitoringNum1: 0,
                    domainmonitorNum1: 0
                },
                editAssets: {
                    ownerId: '',
                    owner: '',
                    name: '',
                    url: '',
                    unit: '',
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
                    usability: 0,
                    usability1: 0,
                    resTime: 200,
                    threat_count: 2,
                    continue_count: 3,
                    notice_count: 3,
                    custom: '',
                    jump: '',
                    delivery: 0,
                    strategynote: '',
                    sitenote: '',
                    homemonitoringNum: 0,
                    photoTamperingNum: 0,
                    hijackedNum: 0,
                    monitoringNum: 0,
                    domainmonitorNum: 0,
                    homemonitoringNum1: 0,
                    photoTamperingNum1: 0,
                    hijackedNum1: 0,
                    monitoringNum1: 0,
                    domainmonitorNum1: 0
                },
                assetEventTime: [],
                layerData: [{
                    site: '',
                    domain: '',
                    language: '',
                    database: '',
                    server: '',
                    os: '',
                    ip: '',
                    cms: '',
                    whois_isp: '',
                    whois_name: '',
                    whois_mail: '',
                    icp_name: '',
                    icp_id: '',
                    whois_dns: '',
                    ipaddress: [],
                    title: ''
                }],
                subdomain: [],
                information: {
                    count: {
                        index: '',
                        picture: '',
                        deep: '',
                        hack: '',
                        domain: ''
                    }
                },
                tableData3: [],
                sitetag: [],
                sitetag2: [],
                unitData: [],
                unitData2: [],
                strategydata: [],
                layerTab: [],
                selecedId:[],
                alertData: {
                    name: '',
                    password: '',
                    email: '',
                    contact: '',
                    phone: '',
                    role: '',
                    remark: '',
                    delivery: '',
                    area: true
                },
                positives: [],
                disposal: [],
                threat: [],
                fullscreenLoading: false,
                cpage: 1,
                isdsable: false,
                delVisible: false,
                multipleSelection: [],
                selectedOptions: [],
                select_word: '',
                editVisible: false,
                totalpage: 0,
                deleteArr: [],
                ownerId: '',
                unitId: [],
                unitId1: [],
                selectUnitId: [],
                configure_id: '',
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                right: '-200%',
                cpage: 1,
                selectedAlertAdress: [],
                optionssite: [],
                configureData: {},
                options2: [{
                        value: 'hijack',
                        label: '劫持事件'
                    },
                    {
                        value: 'site',
                        label: '敏感词'
                    },
                    {
                        value: 'site_link',
                        label: '可疑链接'
                    },
                    {
                        value: 'js',
                        label: '恶意脚本'
                    },
                    {
                        value: 'pic_hack',
                        label: '图片篡改'
                    }
                ],
                // 弹出框搜索类型
                id: '',
                valueSelect1: '',
                valueSelect2: '',
                valueSelect3: '',
                inforLoading:true,
                unitRowId: '',
                display: 'none',
                dayTime: [],
                rowId: '',
                selectTypeUnitId: [],
                timeout: null,
                confrimId: '',
                ignoreId: '',
                positiveId: '',
                undoId: '',
                tipsMsgs: '',
                isshow: true,
                threatLoading:true,
                editConfrim: {
                    customer: false,
                    sales: false,
                    remark: ''
                },
                row: {},
                nodeData:[],
                pages:1,
                vals:10
            }
        },
        methods: {
            test(){
            },
            handleSizeChange(val){
                this.loading2 = true;
                this.vals = val;
                this.$axios.get("api/site?page=" + this.pages + "&limit="+val+"&search=" + this.select_word).then(
                    (res) => {
                        let data = res.data;
                        this.tableData3 = data.data.data;
                        this.loading2 = false;
                    }).catch(v => {
                    console.log(v);
                });
            },
            handleMovelayer(row, event) {
                if (event) { // 如果是checkbox或者是操作按钮不让layer出来
                    if (event.target.children && !event.target.innerText) {
                        return false;
                    }
                }
                this.right = '0%';
                this.loading3 = true;
                this.inforLoading = true;
                this.webasset = true;
                this.rowId = row.id;
                    this.$axios.get('api/site/' + this.rowId + '/asset').then((res) => {
                        let data = res.data.data;
                        this.layerData[0].site = data.site.name ? data.site.name : '无';
                        this.layerData[0].domain = data.site.domain ? data.site.domain : '无';
                        this.layerData[0].language = data.site.asset.language ? data.site.asset.language : '无';
                        this.layerData[0].database = data.site.asset.database ? data.site.asset.database : '无';
                        this.layerData[0].server = data.site.asset.server ? data.site.asset.server : '无';
                        this.layerData[0].os = data.site.asset.os ? data.site.asset.os : '无';
                        this.layerData[0].ip = data.site.asset.ip ? data.site.asset.ip : '无';
                        this.layerData[0].cms = data.site.asset.cms ? data.site.asset.cms : '无';
                        this.layerData[0].whois_isp = data.site.asset.whois_isp ? data.site.asset.whois_isp : '无';
                        this.layerData[0].whois_name = data.site.asset.whois_name ? data.site.asset.whois_name :
                            '无';
                        this.layerData[0].whois_mail = data.site.asset.whois_mail ? data.site.asset.whois_mail :
                            '无';
                        this.layerData[0].icp_name = data.site.asset.icp_name ? data.site.asset.icp_name : '无';
                        this.layerData[0].icp_id = data.site.asset.icp_id ? data.site.asset.icp_id : '无';
                        this.layerData[0].whois_dns = data.site.asset.whois_dns ? data.site.asset.whois_dns : '无';
                        this.layerData[0].ipaddress = data.site.asset.ip ? data.site.asset.ip : '无';
                        this.subdomain = data.subdomain;
                        this.loading3 = false;
                        this.webasset = false;
                    }).catch(v => {
                        console.log(v);
                    });           
                // 最新威胁
                this.getThreat(row.id);
            },
            tabclick(tab){
                 if(tab.name == 'third'){ // 基本信息
                        this.$axios.get('api/site/' + this.rowId + '/info').then((res) => {
                                let data = res.data.data;
                                this.information.adder = data.adder;
                                this.information.created_at = data.created_at;
                                this.information.owner = data.owner;
                                this.information.configure = data.configure.name;
                                this.information.superior = data.superior;
                                this.information.salesman = data.salesman;
                                this.information.count.index = data.count.index;
                                this.information.count.picture = data.count.picture;
                                this.information.count.deep = data.count.deep;
                                this.information.count.hack = data.count.hack;
                                this.information.count.domain = data.count.domain;
                                this.inforLoading = false;
                            }).catch(v => {
                                console.log(v);
                            });
                            this.$axios.get('api/site/' + this.rowId + '/event').then((res) => {
                                let data = res.data.data;
                                this.configureData = data.configure;
                            }).catch(v => {
                                console.log(v);
                            });
                }else if(tab.name == 'visble'){// 可用性
                    if(!this.nodeData.length){
                        this.average();
                    }
                }
            },
            tabclick1(tab){
                if(tab.name == 'assetEvent'){
                        this.hrefAssetEvent();
                }
            },
            threatclick(tab){
                if(tab.name == 'check'){
                  // 已处置
                    this.loading5 = true;
                    this.$axios.get('api/threat?page=1&limit=10&where=deal&site_id=' + this.rowId).then((res) => {
                        let data = res.data.data;
                        this.disposalpage = Math.ceil(data.count);
                        this.disposal = data.data;
                        this.loading5 = false;
                    }).catch(v => {
                        console.log(v);
                    });
                }else if(tab.name ==  'positives'){
                  // 已误报
                    this.getCheck(this.rowId);
                }else if(tab.name == 'fourth'){
                    this.getHistory(this.rowId)
                }
            },
            custom(){
                this.customval = !this.customval;
            },
            usabilitychange(val){
                switch (val) {
                    case 0:
                    this.assetsalertData.usability1 = 0;
                        break;
                    case 16.5:
                    this.assetsalertData.usability1 = 360;
                        break;
                    case 33:
                    this.assetsalertData.usability1 = 60;
                        break;
                    case 49.5:
                    this.assetsalertData.usability1 = 30;
                        break;
                    case 66:
                    this.assetsalertData.usability1 = 15;
                        break;
                    case 82.5:
                    this.assetsalertData.usability1 = 5;
                        break;    
                    case 99:
                    this.assetsalertData.usability1 = 1;
                        break;
                    case 100:
                    this.assetsalertData.usability1 = 1;
                        break;
                    default:
                    this.assetsalertData.usability1 = 0;
                        break;
                }
            },
            usabilitychange2(val){
                switch (val) { 
                    case 0:
                    this.editAssets.usability1 = 0;
                        break;
                    case 16.5:
                    this.editAssets.usability1 = 360;
                        break;
                    case 33:
                    this.editAssets.usability1 = 60;
                        break;
                    case 49.5:
                    this.editAssets.usability1 = 30;
                        break;
                    case 66:
                    this.editAssets.usability1 = 15;
                        break;
                    case 82.5:
                    this.editAssets.usability1 = 5;
                        break;    
                    case 99:
                    this.editAssets.usability1 = 1;
                        break;
                    case 100:
                    this.editAssets.usability1 = 1;
                        break;
                    default:
                    this.editAssets.usability1 = 0;
                        break;
                }
            },
            usabilitychange1(val){
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
            average(row){
                    this.$axios.get('api/site/'+ (this.rowId ? this.rowId : row.id) + '/usability').then((res) =>{
                        let data = res.data.data;
                        this.nodeData = data.node;
                        this.usabLoading = false;
                        this.assetsDetails(data);
                        this.delayTime(data.event);
                    }).catch(v => {
                        console.log(v);
                    });
            },
            changedelay(ip){
                this.Ip = ip;
                this.$axios.get('api/site/' + this.rowId +'/usability?node='+ip+'&time='+encodeURIComponent((this.usabval[0] ? this.usabval[0] : '') + '#'+ (this.usabval[1] ? this.usabval[1] : ''))).then((res)=>{
                    let data = res.data.data;
                   this.nodeData = data.node;
                   this.assetsDetails(data);
                   this.delayTime(data.event);
                   this.usabLoading = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            changedelay1(t){
                if(!t){
                    if(this.usabval){
                        this.$axios.get('api/site/'+ this.rowId +'/usability?time='+encodeURIComponent((this.usabval[0] ? this.usabval[0] : '') + '#'+ (this.usabval[1] ? this.usabval[1] : ''))+'&node='+(this.Ip ? this.Ip : '') ).then((res)=>{
                                let data = res.data.data;
                                this.nodeData = data.node;
                                this.assetsDetails(data);
                                this.delayTime(data.event);
                                this.usabLoading = false;
                                // this.usabval = [];
                            }).catch(v => {
                                console.log(v);
                            });
                    }else{
                        this.customval = false;
                    }
                }else{
                    this.$axios.get('api/site/'+ this.rowId +'/usability?time='+t+'').then((res)=>{
                        let data = res.data.data;
                            this.nodeData = data.node;
                            this.assetsDetails(data);
                            this.delayTime(data.event);
                            this.usabLoading = false;
                     }).catch(v => {
                         console.log(v);
                     });
                }
            }, /* 是否存在新的威胁事件，存在跳转到最新威胁 不存在跳转到历史威胁 */
            threatEvent(ev,scope,num){
                if(num !== 0){
                    this.activeName3 = 'first';
                    this.activeName2 = 'first';
                }else{
                    this.activeName3 = 'fourth';
                    this.activeName2 = 'first';
                    this.getHistory(scope.row.id);
                };
                // ev.stopPropagation();
            },
            hrefAssetEvent(scope,ev){
                this.activeName2 = 'assetEvent';
                this.activeName = 'first';
                this.eventLoading = true;
                this.assetEventTime = [];
                this.$axios.get('api/site/' + (scope.row.id ? scope.row.id : this.rowId) + '/eventDetail?page=1&limit=10').then((res) => {
                    if(res.data.data.events){
                        for(var key in res.data.data.events){
                            this.assetEventTime.push(res.data.data.events[key]);
                        }
                    };
                    this.eventLoading = false;
                    this.assetEventpage = Math.ceil(res.data.data.count);
                }).catch(v => {
                    console.log(v);
                });
            },
            getThreat(id) {
                // 最新威胁
                this.loading4 = true;
                this.$axios.get('api/threat?page=1&limit=10&site_id=' + id).then((res) => {
                    let data = res.data.data;
                    this.newthreatpage = Math.ceil(data.count);
                    this.layerTab = data.data;
                    this.loading4 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            assetEventchangepage(t){
                this.eventLoading = true;
                this.$axios.get('api/site/' + this.rowId + '/eventDetail?page='+t+'&limit=10').then((res) => {
                   if(res.data.data.length){
                        this.assetEventpage = Math.ceil(res.data.data.count);
                        this.assetEventTime = res.data.data.events;
                    }else{
                        this.assetEventTime = res.data.data.events;
                    }
                    this.eventLoading = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            getCheck(id) {
                this.loading5 = true;
                this.$axios.get('api/threat?page=1&limit=10&where=check&site_id=' + id).then((res) => {
                    let data = res.data.data;
                    this.positivespage = Math.ceil(data.count);
                    this.positives = data.data;
                    this.loading5 = false;
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
            confrim(id) {
                this.editVisible = true;
                this.confrimId = id;
            },
            ignore(id) {
                this.ignoreVisible = true;
                this.ignoreId = id;
            },
            undo(id) {
                this.undoId = id;
                this.undoVisible = true;
            },
            positive(id) {
                this.positivesVisible = true;
                this.positiveId = id;
            },
            saveEditUndo() {
                this.$axios.post('api/threat/' + this.undoId + '/uncheck').then((res) => {
                    if (!res.data.status) {
                        this.$message.error(res.data.msg);
                    } else {
                        this.$message.success(res.data.msg);
                        this.getCheck(this.rowId);
                    }
                    this.undoVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditConfrim() {
                this.$axios.post('api/threat/' + this.confrimId + '/confirm', {
                    owner: Number(this.editConfrim.customer),
                    salesman: Number(this.editConfrim.sales),
                    remark: this.editConfrim.remark
                }).then((res) => {
                    if (!res.data.status) {
                        this.$message.error(res.data.msg);
                    } else {
                        this.$message.success(res.data.msg);
                        this.getThreat(this.rowId);
                    }
                    this.editVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditPositives() {
                this.$axios.post('api/threat/' + this.positiveId + '/check').then((res) => {
                    if (!res.data.status) {
                        this.$message.error(res.data.msg);
                    } else {
                        this.$message.success(res.data.msg);
                        this.getThreat(this.rowId);
                    }
                    this.positivesVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            saveEditignore() {
                this.$axios.post('api/threat/' + this.ignoreId + '/ignore').then((res) => {
                    if (!res.data.status) {
                        this.$message.error(res.data.msg);
                    } else {
                        this.$message.success(res.data.msg);
                        this.getThreat(this.rowId);
                    }
                    this.ignoreVisible = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            querySearch1(queryString, cb) {
                var restaurants = this.strategydata;
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
            loadAll() {
                this.$axios.get('api/owner/select/all').then((res) => {
                    this.optionssite = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            selectstrategydata(val) {
                this.batchAdd.strategy = val.name;
                this.batchchoice = val.name;
                for (var i = 0; i < this.strategydata.length; i++) {
                    if (!this.strategydata[i].name.indexOf(val.name)) {
                        this.configure_id = this.strategydata[i].id;
                    }
                };
            },
            hideTips() {
                this.display = "none";
            },
            showTips(row, column, cell, event) {
                var _this = this;
                this.tipsTop = event.target.offsetTop + (event.target.offsetHeight / 2) + 90 + 'px';
                this.tipsLeft = 49.2 + '%';
                this.row.id = row.site_id;
                this.display = "block";
                if (row.event == 0) {
                    _this.isshow = false;
                    _this.tipsMsgs = '该站点从未发生过威胁';
                } else if (row.event == 1) {
                    _this.isshow = false;
                    _this.tipsMsgs = '该站点第一次发生威胁';
                } else {
                    _this.isshow = true;
                    _this.tipsMsgs = '上次发生威胁事件时间:' + row.event;
                }
            },
            handleDisable(obj, ev) {
                ev.stopPropagation();
                this.$axios.post("api/site/" + obj.id + "/alive").then((res) => {
                    if (ev.target.className == 'stop') {
                        ev.target.className = 'play';
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                            duration: 1000
                        });
                    } else {
                        ev.target.className = 'stop';
                        this.$message({
                            message: res.data.msg,
                            type: 'info',
                            duration: 1000
                        });
                    }
                }).catch(v => {
                    console.log(v);
                });
            },
            selectType2(t) {
                // console.log(this.valueSelect2,this.keywords)
                this.type1 = t;
                this.$axios.get('api/threat?page=1&limit=10&site_id=' + this.rowId + '&type=' + t+'&search='+this.keywords1).then((res) => {
                    let data = res.data.data;
                    this.layerTab = data.data;
                    this.newthreatpage = Math.ceil(data.count);
                }).catch(v => {
                    console.log(v);
                })
            },
            selectTypeUnit(val) {
                this.editAssets.unit = val;
            },
            selectType3(t) {
                this.loading5 = true;
                this.type2 = t;
                this.$axios.get('api/threat?page=1&limit=10&where=deal&site_id=' + this.rowId + '&type=' + t +'&search='+this.keywords2).then((res) => {
                    let data = res.data.data;
                    this.disposal = data.data;
                    this.disposalpage = Math.ceil(data.count);
                    this.loading5 = false;
                }).catch(v => {
                    console.log(v);
                })
            },
            selectType4(t) {
                this.loading6 = true;
                this.type3 = t;
                this.$axios.get('api/threat?page=1&limit=10&where=check&&site_id=' + this.rowId + '&type=' + t + '&search='+this.keywords3).then((
                    res) => {
                    let data = res.data.data;
                    this.positives = data.data;
                    this.positivespage = Math.ceil(data.count);
                    this.loading6 = false;
                }).catch(v => {
                    console.log(v);
                })
            },
            selectdstrategy() {
                var selecedId = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    selecedId.push(this.multipleSelection[i].id);
                };
                this.$axios.post('api/site/configure', {
                    id: selecedId,
                    configure_id: this.configure_id
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                    this.allocationDialog = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            selectAssociate(val) {
                for (var i = 0; i < this.optionssite.length; i++) {
                    if (this.optionssite[i].owner.indexOf(val) !== -1) {
                        if (this.associatedUnit[i] == this.optionssite[i].id) {
                            return;
                        } else {
                            this.associatedUnit = (this.optionssite[i].id);
                        }
                    }
                }
            },
            saveEditsite() {
                this.$axios.post('api/site/superior', {
                    id: Array.from(new Set(this.selectUnitId)),
                    owner_id: this.associatedUnit
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.$message.success(res.data.msg);
                        this.getsite();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                    this.associate = false;
                    this.selectUnitId = [];
                    this.associatedUnit = [];
                }).catch(v => {
                    console.log(v);
                });
            },
            allocation() {
                if (!this.multipleSelection.length) {
                    this.$message.error('你尚未选择单位');
                    return;
                };
                this.allocationDialog = true;
            },
            exportReport(){
                if (!this.multipleSelection.length) {
                    this.$message.error('请先选择单位');
                    return;
                };
                this.exportVisble = true;
                this.selecedId = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    this.selecedId.push(this.multipleSelection[i].id);
                };
            },
            batchAddAsset() {
                if (!this.batchAdd.strategy) {
                    this.$message.error('请选择策略');
                    return;
                } else if (!this.batchAdd.content) {
                    this.$message.error('请输入内容');
                    return;
                };
                this.$axios.post('api/batch', {
                    configure_id: this.configure_id,
                    data: this.batchAdd.content
                }).then((res) => {
                    let data = res.data;
                    if (data.status == 1) {
                        this.$message.success(data.msg);
                        this.batchAddAssets = false;
                    } else {
                        this.$message.error(data.msg);
                        this.batchAddAssets = false;
                    }
                }).catch(v => {
                    console.log(v);
                });
            },
            batch() {
                if (!this.loading2) {
                    this.batchAddAssets = true;
                }
            },
            threatchangepage(t) {
                this.loading4 = true; 
                this.$axios.get("api/threat?page=" + t + "&limit=10&site_id=" + this.rowId +'&type='+(this.type1 ? this.type1 : '' )+'&search='+this.keywords1).then((res) => {
                    let data = res.data.data;
                    this.newthreatpage = Math.ceil(data.count);
                    this.layerTab = data.data;
                    this.loading4 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            disposalchangepage(t) {
                this.loading5 = true;
                this.$axios.get('api/threat?page=' + t + '&limit=10&where=deal&site_id=' + this.rowId+'&type='+(this.type2 ? this.type2 : '') +'&search=' +this.keywords2 ).then((res) => {
                    let data = res.data.data;
                    this.disposalpage = Math.ceil(data.count);
                    this.disposal = data.data;
                    this.loading5 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            positiveschangepage(t) {
                this.loading6 = true;
                this.$axios.get('api/threat?page=' + t + '&limit=10&where=check&site_id=' + this.rowId+'&type='+(this.type3 ? this.type3 : '') +'&search=' +this.keywords3 ).then((res) => {
                    let data = res.data.data;
                    this.positivespage = Math.ceil(data.count);
                    this.positives = data.data;
                    this.loading6 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            changepage(t) {
                this.loading2 = true;
                this.pages = t;
                this.$axios.get("api/site?page=" + t + "&limit="+this.vals+"&search=" + this.select_word+'&owner_id='+this.owner_id).then(
                    (res) => {
                        let data = res.data;
                        this.tableData3 = data.data.data;
                        this.loading2 = false;
                    }).catch(v => {
                    console.log(v);
                });
            },
            addAssets() {
                if (!this.loading2) {
                    this.showdialog = true;
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleLayerClose() {
                this.right = '-150%';
                this.activeName = 'first';
                this.activeName2 = 'first';
                this.activeName3 = 'first';
            },
            handleSelectionChange(val, event) {
                this.multipleSelection = val;
            },
            sendSearchAsset() {
                    this.loading2 = true;
                        this.$axios.get('api/site?limit=10&page=1&search='+ this.select_word).then((res) => {
                            let data = res.data.data.data;
                            this.totalpage = Math.ceil(res.data.data.count);
                            this.tableData3 = data;
                            this.loading2 = false;
                        }).catch(v => {
                            console.log(v);
                        });
            },
            sendSearch() {
                if (!this.keywords1) {
                    this.$message.error('请输入关键词');
                    return;
                } else {
                    this.loading4 = true;
                    this.$axios.get('api/threat?page=1&limit=10&search=' + this.keywords1 + '&type='+ (this.type1 ? this.type1 : '') + '&site_id='+ this.rowId).then((res) => {
                        let data = res.data.data;
                        this.layerTab = data.data;
                        this.loading4 = false;
                        this.newthreatpage = Math.ceil(data.count);
                    }).catch(v => {
                        console.log(v);
                    });
                }
            },
            sendSearch1() {
                if (!this.keywords2) {
                    this.$message.error('请输入关键词');
                    return;
                } else {
                    this.loading5 = true;
                    this.$axios.get('api/threat?page=1&limit=10&where=check&search=' + this.keywords2 +'&type=' + (this.type2 ? this.type2 : '') + '&site_id='+ this.rowId).then((res) => {
                        let data = res.data.data;
                        this.disposal = data.data;
                        this.disposalpage = Math.ceil(data.count);
                        this.loading5 = false;
                    }).catch(v => {
                        console.log(v);
                    });
                }
            },
            sendSearch2() {
                if (!this.keywords3) {
                    this.$message.error('请输入关键词');
                    return;
                } else {
                    this.loading6 = true;
                    this.$axios.get('api/threat?page=1&limit=10&where=deal&search=' + this.keywords3 +'&type=' + (this.type3 ? this.type3 : '')  + '&site_id='+ this.rowId).then((res) => {
                        let data = res.data.data;
                        this.positives = data.data;
                        this.positivespage = Math.ceil(data.count);
                        this.loading6 = false;
                    }).catch(v => {
                        console.log(v);
                    });
                }
            },
            deleteAllInput() {
                if (!this.multipleSelection.length) {
                    this.$message.error('请选择单位');
                } else {
                    this.delVisible = true;
                }
            },
            associated() {
                if (!this.multipleSelection.length) {
                    this.$message.error('请先选择单位');
                } else {
                    this.associate = true;
                    for (var i = 0; i < this.multipleSelection.length; i++) {
                        this.selectUnitId.push(this.multipleSelection[i].id);
                    }
                }
            },
            deleteRow() {
                this.deleteArr = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    this.deleteArr.push(this.multipleSelection[i].id);
                };
                this.$axios.delete('api/site', {
                    data: {
                        id: this.deleteArr
                    }
                }).then((res) => {
                    let data = res.data;
                    this.$message.success(data.msg);
                    this.getsite();
                    this.delVisible = false;
                }).catch((v) => {
                    this.$message.error('发生了错误');
                    this.delVisible = false;
                })
            },
            edit(scope, ev) {
                ev.stopPropagation();
                this.addAssetsDialog = true;
                this.unitRowId = scope.row.id;
                this.$axios.get("api/site/" + scope.row.id + "").then((res) => {
                    let data = res.data.data;
                    this.editAssets.name = data.name;
                    this.editAssets.url = data.domain;
                    this.editAssets.remark = data.remark;
                    var arr = new Set(data.superior);
                    this.unitData2 = Array.from(arr);
                    this.sitetag2 = data.tags ? data.tags : [];
                    var strategyArr = [];
                    for (var i = 0; i < this.strategydata.length; i++) {
                        for (var key in this.strategydata[i]) {
                            strategyArr.push(this.strategydata[i][key]);
                        }
                    };
                    if (strategyArr.indexOf(data.configure_id) !== -1) {
                        this.editAssets.strategydata = strategyArr[strategyArr.indexOf(data.configure_id) - 1];
                    };

                    var ownerArr = [];

                    for (var i = 0; i < this.optionssite.length; i++) {
                        for (var key in this.optionssite[i]) {
                            ownerArr.push(this.optionssite[i][key]);
                        }
                    };
                    if (ownerArr.indexOf(data.owner_id) !== -1) {
                        this.editAssets.owner = ownerArr[ownerArr.indexOf(data.owner_id) + 1];
                    }

                    this.editAssets.selectd = true;
                    this.$axios.get('api/siteConfigure/' + data.configure_id + '').then((res) => {
                        let data = res.data.data;
                        this.editAssets.strategydata = data.name;
                        this.editAssets.usability1 = data.usability;
                        this.editAssets.resTime = data.delay;
                        this.editAssets.threat_count = data.threat_count;
                        this.editAssets.continue_count = data.continue_count;
                        this.editAssets.notice_count = data.notice_count;
                        this.editAssets.custom = data.cookie;
                        this.editAssets.jump = data.jump;
                        this.editAssets.homemonitoringNum1 = data.index;
                        this.editAssets.photoTamperingNum1 = data.picture;
                        this.editAssets.hijackedNum1 = data.hack;
                        this.editAssets.monitoringNum1 = data.deep;
                        this.editAssets.domainmonitorNum1 = data.domain;

                        switch (this.editAssets.homemonitoringNum1) {
                            case 0:
                                this.editAssets.homemonitoringNum = 0;
                                break;
                            case 5:
                                this.editAssets.homemonitoringNum = 99;
                                break;
                            case 15:
                                this.editAssets.homemonitoringNum = 82.5;
                                break;
                            case 30:
                                this.editAssets.homemonitoringNum = 66;
                                break;
                            case 60:
                                this.editAssets.homemonitoringNum = 49.5;
                                break;
                            case 360:
                                this.editAssets.homemonitoringNum = 33;
                                break;
                            case 1440:
                                this.editAssets.homemonitoringNum = 16.5;
                                break;
                            default:
                                this.editAssets.homemonitoringNum = 0;
                                break;
                        };

                        switch (this.editAssets.usability1) { 
                            case 0:
                            this.editAssets.usability = 0;
                                break;
                            case 1:
                            this.editAssets.usability = 99;
                                break;
                            case 5:
                            this.editAssets.usability = 82.5;
                                break;
                            case 15:
                            this.editAssets.usability = 66;
                                break;
                            case 30:
                            this.editAssets.usability = 49.5;
                                break;
                            case 60:
                            this.editAssets.usability = 33;
                                break;    
                            case 360:
                            this.editAssets.usability = 16.5;
                                break;
                            default:
                            this.editAssets.usability = 0;
                                break;
                        }
                        switch (this.editAssets.photoTamperingNum1) {
                            case 0:
                                this.editAssets.photoTamperingNum = 0;
                                break;
                            case 5:
                                this.editAssets.photoTamperingNum = 99;
                                break;
                            case 15:
                                this.editAssets.photoTamperingNum = 82.5;
                                break;
                            case 30:
                                this.editAssets.photoTamperingNum = 66;
                                break;
                            case 60:
                                this.editAssets.photoTamperingNum = 49.5;
                                break;
                            case 360:
                                this.editAssets.photoTamperingNum = 33;
                                break;
                            case 1440:
                                this.editAssets.photoTamperingNum = 16.5;
                                break;
                            default:
                                this.editAssets.photoTamperingNum = 0;
                                break;
                        };
                        switch (this.editAssets.hijackedNum1) {
                            case 0:
                                this.editAssets.hijackedNum = 0;
                                break;
                            case 360:
                                this.editAssets.hijackedNum = 99;
                                break;
                            case 1440:
                                this.editAssets.hijackedNum = 66;
                                break;
                            case 4320:
                                this.editAssets.hijackedNum = 33;
                                break;
                            default:
                                this.editAssets.hijackedNum = 0;
                                break;
                        };
                        switch (this.editAssets.monitoringNum1) {
                            case 0:
                                this.editAssets.monitoringNum = 0;
                                break;
                            case 60:
                                this.editAssets.monitoringNum = 100;
                                break;
                            case 360:
                                this.editAssets.monitoringNum = 75;
                                break;
                            case 1440:
                                this.editAssets.monitoringNum = 50;
                                break;
                            case 4320:
                                this.editAssets.monitoringNum = 25;
                                break;
                            default:
                                this.editAssets.monitoringNum = 0;
                                break;
                        };
                        switch (this.editAssets.domainmonitorNum1) {
                            case 0:
                                this.editAssets.domainmonitorNum = 0;
                                break;
                            case 1440:
                                this.editAssets.domainmonitorNum = 99;
                                break;
                            case 4320:
                                this.editAssets.domainmonitorNum = 66;
                                break;
                            case 10080:
                                this.editAssets.domainmonitorNum = 33;
                                break;
                            default:
                                this.editAssets.domainmonitorNum = 0;
                                break;
                        };
                    }).catch(v => {
                        console.log(v);
                    });
                    //  data.id; data.configure_id; owner_id 
                }).catch(v => {
                    console.log(v)
                })
            },
            selectunit(obj) {
                this.assetsalertData.owner = obj.owner;
                this.editAssets.owner = obj.owner;
                for (var i = 0; i < this.optionssite.length; i++) {
                    if (this.optionssite[i].owner.indexOf(this.assetsalertData.owner) !== -1 || this.optionssite[i].owner
                        .indexOf(this.editAssets.owner) !== -1) {
                        this.selectedUnit = this.optionssite[i];
                    }
                }
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (!inputValue) {
                    this.inputVisible = false;
                    return;
                }
                if (this.sitetag.indexOf(this.inputValue) !== -1) {
                    this.$message.error('请勿重复添加');
                    this.inputVisible = false;
                    this.inputValue = '';
                    return;
                } else {
                    this.sitetag.push(this.inputValue);
                    this.inputValue = '';
                }
                this.inputVisible = false;
            },
            showInput2() {
                this.inputVisible2 = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm2() {
                let inputValue = this.inputValue2;
                if (!inputValue) {
                    this.inputVisible2 = false;
                    return;
                }
                if (this.sitetag2.indexOf(this.inputValue2) !== -1) {
                    this.$message.error('请勿重复添加');
                    this.inputVisible2 = false;
                    this.inputValue2 = '';
                    return;
                } else {
                    this.sitetag2.push(this.inputValue2);
                    this.inputValue2 = '';
                }
                this.inputVisible2 = false;
            },
            addTag() {
                if (!this.tagVal) {
                    this.$message.error('请选择关联单位');
                    return;
                } else {
                    if (this.unitData.indexOf(this.tagVal) !== -1) {
                        this.$message.error('请勿重复添加');
                        return;
                    } else {
                        this.unitData.push(this.tagVal);
                        for (var i = 0; i < this.optionssite.length; i++) {
                            if (this.optionssite[i].owner.indexOf(this.tagVal) !== -1) {
                                this.unitId.push(this.optionssite[i].id);
                                this.assetsalertData.unit = '';
                            }
                        }
                    };
                }
            },
            addTag2() {
                if (!this.tagVal1) {
                    this.$message.error('请选择关联单位');
                    return;
                } else {
                    if (this.unitData2.indexOf(this.tagVal1) !== -1) {
                        this.$message.error('请勿重复添加');
                        return;
                    } else {
                        this.unitData2.push(this.tagVal1);
                        for (var i = 0; i < this.optionssite.length; i++) {
                            if (this.optionssite[i].owner.indexOf(this.tagVal1) !== -1) {
                                this.unitId1.push(this.optionssite1[i].id);
                                this.editAssets.unit = '';
                            }
                        }
                    };
                }
            },
            addStrategyselect(val) {
                for (var i = 0; i < this.strategydata.length; i++) {
                    if (this.strategydata[i].name.indexOf(val) == 0) {
                        this.configure_id = this.strategydata[i].id;
                    }
                };

                this.$axios.get('api/siteConfigure/' + this.configure_id).then((res) => {
                    let data = res.data.data;
                    this.assetsalertData.startTime = [data.start,data.end];
                    this.assetsalertData.startdaily = data.daily_start;
                    this.assetsalertData.enddaily = data.daily_end;
                    this.assetsalertData.homemonitoringNum1 = data.index;
                    this.assetsalertData.photoTamperingNum1 = data.picture;
                    this.assetsalertData.hijackedNum1 = data.hack;
                    this.assetsalertData.monitoringNum1 = data.deep;
                    this.assetsalertData.domainmonitorNum1 = data.domain;
                    this.assetsalertData.usability1 = data.usability;
                    this.assetsalertData.resTime = data.delay;
                    this.assetsalertData.threat_count = data.threat_count;
                    this.assetsalertData.continue_count = data.continue_count;
                    this.assetsalertData.notice_count = data.notice_count;
                    this.assetsalertData.custom = data.cookie;
                    this.assetsalertData.jump = Boolean(data.jump);
                    this.iscustom = true;
                    this.assetsalertData.selectd = true;
                    this.editAssets.selectd = true;
                    if (this.configure_id == 22) {
                        this.isdisable = true;
                    } else {
                        this.isdisable = false;
                    };
                    switch (this.assetsalertData.usability1) {
                        case 1:
                            this.assetsalertData.usability = 16.5;
                            break;
                        case 5:
                            this.assetsalertData.usability = 33;
                            break;
                        case 15:
                            this.assetsalertData.usability = 49.5;
                            break;
                        case 30:
                            this.assetsalertData.usability = 66;
                            break;
                        case 60:
                            this.assetsalertData.usability = 82.5;
                            break;
                        case 360:
                            this.assetsalertData.usability = 99;
                            break;
                        default:
                            this.assetsalertData.usability = 0;
                            break;
                    };
                    switch (this.assetsalertData.homemonitoringNum1) {
                        case 5:
                            this.assetsalertData.homemonitoringNum = 99;
                            break;
                        case 15:
                            this.assetsalertData.homemonitoringNum = 82.5;
                            break;
                        case 30:
                            this.assetsalertData.homemonitoringNum = 66;
                            break;
                        case 60:
                            this.assetsalertData.homemonitoringNum = 49.5;
                            break;
                        case 360:
                            this.assetsalertData.homemonitoringNum = 33;
                            break;
                        case 1440:
                            this.assetsalertData.homemonitoringNum = 16.5;
                            break;
                        default:
                            this.assetsalertData.homemonitoringNum = 0;
                            break;
                    };
                    switch (this.assetsalertData.photoTamperingNum1) {
                        case 5:
                            this.assetsalertData.photoTamperingNum = 99;
                            break;
                        case 15:
                            this.assetsalertData.photoTamperingNum = 82.5;
                            break;
                        case 30:
                            this.assetsalertData.photoTamperingNum = 66;
                            break;
                        case 60:
                            this.assetsalertData.photoTamperingNum = 49.5;
                            break;
                        case 360:
                            this.assetsalertData.photoTamperingNum = 33;
                            break;
                        case 1440:
                            this.assetsalertData.photoTamperingNum = 16.5;
                            break;
                        default:
                            this.assetsalertData.photoTamperingNum = 0;
                            break;
                    };
                    switch (this.assetsalertData.hijackedNum1) {
                        case 360:
                            this.assetsalertData.hijackedNum = 99;
                            break;
                        case 1440:
                            this.assetsalertData.hijackedNum = 66;
                            break;
                        case 4320:
                            this.assetsalertData.hijackedNum = 33;
                            break;
                        default:
                            this.assetsalertData.hijackedNum = 0;
                            break;
                    };
                    switch (this.assetsalertData.monitoringNum1) {
                        case 60:
                            this.assetsalertData.monitoringNum = 100;
                            break;
                        case 360:
                            this.assetsalertData.monitoringNum = 75;
                            break;
                        case 1440:
                            this.assetsalertData.monitoringNum = 50;
                            break;
                        case 4320:
                            this.assetsalertData.monitoringNum = 25;
                            break;
                        default:
                            this.assetsalertData.monitoringNum = 0;
                            break;
                    };
                    switch (this.assetsalertData.domainmonitorNum1) {
                        case 1440:
                            this.assetsalertData.domainmonitorNum = 99;
                            break;
                        case 4320:
                            this.assetsalertData.domainmonitorNum = 66;
                            break;
                        case 10080:
                            this.assetsalertData.domainmonitorNum = 33;
                            break;
                        default:
                            this.assetsalertData.domainmonitorNum = 0;
                            break;
                    };
                    this.editAssets.startTime = [data.start,data.end];
                    this.editAssets.startdaily = data.daily_start;
                    this.editAssets.enddaily = data.daily_end;
                    this.editAssets.homemonitoringNum1 = data.index;
                    this.editAssets.photoTamperingNum1 = data.picture;
                    this.editAssets.hijackedNum1 = data.hack;
                    this.editAssets.monitoringNum1 = data.deep;
                    this.editAssets.domainmonitorNum1 = data.domain;
                    this.editAssets.usability = data.usability;
                    this.editAssets.resTime = data.delay ? data.delay : '';
                    this.editAssets.threat_count = data.threat_count;
                    this.editAssets.continue_count = data.continue_count;
                    this.editAssets.notice_count = data.notice_count;
                    this.editAssets.custom = data.cookie;
                    this.editAssets.jump = Boolean(data.jump);
                    this.iscustom = true;
                    this.editAssets.selectd = true;
                    this.editAssets.selectd = true;
                    if (this.configure_id == 22) {
                        this.isdisable = true;
                    } else {
                        this.isdisable = false;
                    };
                    switch (this.editAssets.usability1) {
                        case 1:
                            this.editAssets.usability = 16.5;
                            break;
                        case 5:
                            this.editAssets.usability = 33;
                            break;
                        case 15:
                            this.editAssets.usability = 49.5;
                            break;
                        case 30:
                            this.editAssets.usability = 66;
                            break;
                        case 60:
                            this.editAssets.usability = 82.5;
                            break;
                        case 360:
                            this.editAssets.usability = 99;
                            break;
                        default:
                            this.editAssets.usability = 0;
                            break;
                    };
                    switch (this.editAssets.homemonitoringNum1) {
                        case 5:
                            this.editAssets.homemonitoringNum = 1440;
                            break;
                        case 15:
                            this.editAssets.homemonitoringNum = 360;
                            break;
                        case 30:
                            this.editAssets.homemonitoringNum = 60;
                            break;
                        case 60:
                            this.editAssets.homemonitoringNum = 60;
                            break;
                        case 360:
                            this.editAssets.homemonitoringNum = 15;
                            break;
                        case 1440:
                            this.editAssets.homemonitoringNum = 5;
                            break;
                        default:
                            this.editAssets.homemonitoringNum = 0;
                            break;
                    };
                    switch (this.editAssets.photoTamperingNum1) {
                        case 5:
                            this.editAssets.photoTamperingNum = 1440;
                            break;
                        case 15:
                            this.editAssets.photoTamperingNum = 360;
                            break;
                        case 30:
                            this.editAssets.photoTamperingNum = 60;
                            break;
                        case 60:
                            this.editAssets.photoTamperingNum = 30;
                            break;
                        case 360:
                            this.editAssets.photoTamperingNum = 15;
                            break;
                        case 1440:
                            this.editAssets.photoTamperingNum = 5;
                            break;
                        default:
                            this.editAssets.photoTamperingNum = 0;
                            break;
                    };
                    switch (this.editAssets.hijackedNum1) {
                        case 360:
                            this.editAssets.hijackedNum = 4320;
                            break;
                        case 1440:
                            this.editAssets.hijackedNum = 1440;
                            break;
                        case 4320:
                            this.editAssets.hijackedNum = 360;
                            break;
                        default:
                            this.editAssets.hijackedNum = 0;
                            break;
                    };
                    switch (this.editAssets.monitoringNum1) {
                        case 60:
                            this.editAssets.monitoringNum = 4320;
                            break;
                        case 360:
                            this.editAssets.monitoringNum = 1440;
                            break;
                        case 1440:
                            this.editAssets.monitoringNum = 360;
                            break;
                        case 4320:
                            this.editAssets.monitoringNum = 60;
                            break;
                        default:
                            this.editAssets.monitoringNum = 0;
                            break;
                    };
                    switch (this.editAssets.domainmonitorNum1) {
                        case 1440:
                            this.editAssets.domainmonitorNum = 10080;
                            break;
                        case 4320:
                            this.editAssets.domainmonitorNum = 4320;
                            break;
                        case 10080:
                            this.editAssets.domainmonitorNum = 1440;
                            break;
                        default:
                            this.editAssets.domainmonitorNum = 0;
                            break;
                    };
                }).catch(v => {
                    console.log(v);
                });
            },
            selectType(value) {
                this.assetsalertData.unit = value.owner;
                this.tagVal = value.owner;
            },
            selectType1(value) {
                this.editAssets.unit = value.owner;
                this.tagVal1 = value.owner;
            },
            closeUnitTag(tag) {
                this.unitData.splice(this.unitData.indexOf(tag), 1);
                this.unitData2.splice(this.unitData2.indexOf(tag), 1);
            },
            closeSiteTag(tag) {
                this.sitetag.splice(this.sitetag.indexOf(tag), 1);
                this.sitetag2.splice(this.sitetag2.indexOf(tag), 1);
            },
            geturl() {
                if(!this.assetsalertData.url)return;
                this.$axios.get('api/getTags', {
                    params: {
                        url: this.assetsalertData.url
                    }
                }).then((res) => {
                    this.sitetag = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            geturl2() {
                if(!this.editAssets.url)return;
                this.$axios.get('api/getTags', {
                    params: {
                        url: this.editAssets.url
                    }
                }).then((res) => {
                    this.sitetag2 = res.data.data;
                }).catch(v => {
                    console.log(v);
                });
            },
            changestep(val) {
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 25:
                        return 3 + '天1次'
                        break;
                    case 60:
                        return 1 + '小时1次'
                        break;
                    case 360:
                        return 6 + '小时1次'
                        break;
                    case 50:
                        return 1 + '天1次'
                        break;
                    case 1440:
                        return 1 + '天1次'
                        break;
                    case 75:
                        return 6 + '小时1次'
                        break;
                    case 4320:
                        return 3 + '天1次'
                        break;
                    case 33:
                        return 3 + '天1次'
                        break;
                    case 66:
                        return 1 + '天1次'
                        break;
                    case 99:
                        return 1 + '小时1次'
                        break;
                    case 100:
                        return 1 + '小时1次'
                        break;
                    default:
                        return val
                        break;
                }
            },
            changestep1(val) {
                 
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 33:
                        return 7 + '天1次'
                        break;
                    case 66:
                        return 3 + '天1次'
                        break;
                    case 99:
                        return 1 + '天1次'
                        break;
                    case 100:
                        return 1 + '天1次'
                        break;
                    case 1440:
                        return 1 + '天1次'
                        break;
                    case 4320:
                        return 3 + '天1次'
                        break;
                    case 10080:
                        return 7 + '天1次'
                        break;
                    default:
                        return val
                        break;
                }
            },
            changestep2(val) {
        
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 16.5:
                        return 1 + '天1次'
                        break;
                    case 5:
                        return 5 + '分钟1次'
                        break;
                    case 15:
                        return 15 + '分钟1次'
                        break;
                    case 30:
                        return 30 + '分钟1次'
                        break;
                    case 60:
                        return 1 + '小时1次'
                        break;
                    case 33:
                        return 6 + '小时1次'
                        break;
                    case 49.5:
                        return 1 + '小时1次'
                        break;
                    case 66:
                        return 30 + '分钟1次'
                        break;
                    case 82.5:
                        return 15 + '分钟1次'
                        break;
                    case 99:
                        return 5 + '分钟1次'
                    case 100:
                        return 5 + '分钟1次'
                        break;
                    case 360:
                        return 6 + '小时1次'
                        break;
                    case 1440:
                        return 1 + '天1次'
                        break;
                    default:
                        return val;
                        break;
                }
            },
            changestep3(val) {
                
                switch (val) {
                    case 0:
                        return '不监测'
                        break;
                    case 33:
                        return 3 + '天1次'
                        break;
                    case 66:
                        return 1 + '天1次'
                        break;
                    case 99:
                        return 6 + '小时1次'
                        break;
                    case 100:
                        return 6 + '小时1次'
                        break;
                }
            },
            saveEditAsset() {
                switch (this.editAssets.homemonitoringNum) {
                    case 0:
                        this.editAssets.homemonitoringNum1 = 0;
                        break;
                    case 16.5:
                        this.editAssets.homemonitoringNum1 = 1440;
                        break;
                    case 33:
                        this.editAssets.homemonitoringNum1 = 360;
                        break;
                    case 49.5:
                        this.editAssets.homemonitoringNum1 = 60;
                        break;
                    case 66:
                        this.editAssets.homemonitoringNum1 = 30;
                        break;
                    case 82.5:
                        this.editAssets.homemonitoringNum1 = 15;
                        break;
                    case 99:
                        this.editAssets.homemonitoringNum1 = 5;
                        break;
                    case 100:
                        this.editAssets.homemonitoringNum1 = 5;
                        break;
                    default:
                        this.editAssets.homemonitoringNum1 = 0;
                        break;
                };
                switch (this.editAssets.photoTamperingNum) {
                    case 0:
                        this.editAssets.photoTamperingNum1 = 0;
                        break;
                    case 16.5:
                        this.editAssets.photoTamperingNum1 = 1440;
                        break;
                    case 33:
                        this.editAssets.photoTamperingNum1 = 360;
                        break;
                    case 49.5:
                        this.editAssets.photoTamperingNum1 = 60;
                        break;
                    case 66:
                        this.editAssets.photoTamperingNum1 = 30;
                        break;
                    case 82.5:
                        this.editAssets.photoTamperingNum1 = 15;
                        break;
                    case 99:
                        this.editAssets.photoTamperingNum1 = 5;
                        break;
                    case 100:
                        this.editAssets.photoTamperingNum1 = 5;
                        break;
                    default:
                        this.editAssets.photoTamperingNum1 = 0;
                        break;
                };
                switch (this.editAssets.hijackedNum) {
                    case 0:
                        this.editAssets.hijackedNum1 = 0;
                        break;
                    case 33:
                        this.editAssets.hijackedNum1 = 4320;
                        break;
                    case 66:
                        this.editAssets.hijackedNum1 = 1440;
                        break;
                    case 99:
                        this.editAssets.hijackedNum1 = 360;
                        break;
                    case 100:
                        this.editAssets.hijackedNum1 = 360;
                        break;
                    default:
                        this.editAssets.hijackedNum1 = 0;
                        break;
                };
                switch (this.editAssets.monitoringNum) {
                    case 0:
                        this.editAssets.monitoringNum = 0;
                        break;
                    case 25:
                        this.editAssets.monitoringNum1 = 4320;
                        break;
                    case 50:
                        this.editAssets.monitoringNum1 = 1440;
                        break;
                    case 75:
                        this.editAssets.monitoringNum1 = 360;
                        break;
                    case 100:
                        this.editAssets.monitoringNum1 = 60;
                        break;
                    default:
                        this.editAssets.monitoringNum1 = 0;
                        break;
                };
                switch (this.editAssets.domainmonitorNum) {
                    case 0:
                        this.editAssets.domainmonitorNum1 = 0;
                        break;
                    case 100:
                        this.editAssets.domainmonitorNum1 = 10080;
                        break;
                    case 99:
                        this.editAssets.domainmonitorNum1 = 10080;
                        break;
                    case 66:
                        this.editAssets.domainmonitorNum1 = 4320;
                        break;
                    case 33:
                        this.editAssets.domainmonitorNum1 = 1440;
                        break;
                    default:
                        this.editAssets.domainmonitorNum1 = 0;
                        break;
                };


                for (var i = 0; i < this.optionssite.length; i++) {
                    if (this.optionssite[i].owner.indexOf(this.assetsalertData.owner) !== -1) {
                        this.selectedUnit = this.optionssite[i];
                    }
                };
                if (!this.editAssets.strategydata) {
                    this.$message.error('请选择策略');
                    return;
                }

                if (this.isdisable) {
                    this.$axios.post("api/site/" + this.unitRowId + '/update', {
                        owner_id: this.selectedUnit.id,
                        name: this.editAssets.name,
                        domain: this.editAssets.url,
                        configure_id: this.configure_id,
                        remark: this.editAssets.remark,
                        superior: this.unitId1,
                        tags: this.sitetag2,
                        usability: Number(this.editAssets.usability1),
                        delay: Number(this.editAssets.resTime),
                        threat_count: Number(this.editAssets.threat_count),
                        continue_count: Number(this.editAssets.continue_count),
                        notice_count: Number(this.editAssets.notice_count),
                        cookie: Number(this.editAssets.custom),
                        jump: Number(this.editAssets.jump)
                    }).then((res) => {
                        let data = res.data;
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                            this.addAssetsDialog = false;
                            this.assetsalertData.selectd = false;
                            this.editAssets.selectd = false;
                        } else {
                            this.$message.error(data.msg);
                            this.addAssetsDialog = false;
                            this.assetsalertData.selectd = false;
                            this.editAssets.selectd = false;
                        }
                    }).catch(v => {
                        console.log(v);
                    });
                } else {
                    this.$axios.post("api/site/" + this.unitRowId + '/update', {
                        owner_id: this.selectedUnit.id,
                        name: this.editAssets.name,
                        domain: this.editAssets.url,
                        configure: {
                            start: this.editAssets.startTime[0],
                            end: this.editAssets.startTime[1],
                            daily_start: this.editAssets.startdaily,
                            daily_end: this.editAssets.enddaily,
                            index: Number(this.editAssets.homemonitoringNum1),
                            picture: Number(this.editAssets.photoTamperingNum1),
                            hack: Number(this.editAssets.hijackedNum1),
                            deep: Number(this.editAssets.monitoringNum1),
                            domain: Number(this.editAssets.domainmonitorNum1),
                            notice: Number(this.editAssets.delivery),
                            remark: this.editAssets.strategynote,
                            usability: Number(this.editAssets.usability1),
                            delay: Number(this.editAssets.resTime),
                            threat_count: Number(this.editAssets.threat_count),
                            continue_count: Number(this.editAssets.continue_count),
                            notice_count: Number(this.editAssets.notice_count),
                            cookie: Number(this.editAssets.custom),
                            jump: Number(this.editAssets.jump)
                        },
                        remark: this.editAssets.remark,
                        superior: this.unitId1,
                        tags: this.sitetag2,
                    }).then((res) => {
                        let data = res.data
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                            this.addAssetsDialog = false;
                            this.assetsalertData.selectd = false;
                            this.editAssets.selectd = false;
                        } else {
                            this.$message.error(data.msg);
                            this.addAssetsDialog = false;
                            this.assetsalertData.selectd = false;
                            this.editAssets.selectd = false;
                        }
                    }).catch(v => {
                        console.log(v);
                    });
                }
            },
            hrefAsset() {
                this.$router.push({
                    name: 'assets',
                    'params': this.row
                });
            },
            saveaddAsset() {
                //   5分钟 30分钟  6小时 15分钟 1小时 1天 3天 7天
                if (!this.assetsalertData.owner) {
                    this.$message.error('请选择所属单位');
                    return;
                } else if (!this.assetsalertData.name) {
                    this.$message.error('请填写网站名称');
                    return;
                } else if (!this.assetsalertData.url) {
                    this.$message.error('请填写网站网址');
                    return;
                };
                if (!this.assetsalertData.strategydata) {
                    this.$message.error('请选择策略');
                    return;
                };
                if (this.isdisable) {
                    this.$axios.post("api/site", {
                        owner_id: this.selectedUnit.id,
                        name: this.assetsalertData.name,
                        domain: this.assetsalertData.url,
                        configure_id: this.configure_id,
                        remark: this.assetsalertData.remark,
                        superior: this.unitId,
                        tags: this.sitetag,
                        usability: Number(this.assetsalertData.usability1),
                        delay: Number(this.assetsalertData.resTime),
                        threat_count: Number(this.assetsalertData.threat_count),
                        continue_count: Number(this.assetsalertData.continue_count),
                        notice_count: Number(this.assetsalertData.notice_count),
                        cookie: Number(this.assetsalertData.custom),
                        jump: Number(this.assetsalertData.jump)
                    }).then((res) => {
                        let data = res.data;
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                            this.showdialog = false;
                            this.assetsalertData.selectd = false;
                        } else {
                            this.$message.error(data.msg);
                            this.showdialog = false;
                            // this.assetsalertData.selectd = false;
                            // this.editAssets.selectd = false;
                        }
                    }).catch(v => {
                        console.log(v);
                    });
                } else {
                    if (!this.selectedUnit) {
                        this.$message.error('请选择单位');
                        return;
                    };
                    this.$axios.post("api/site", {
                        owner_id: this.selectedUnit.id,
                        name: this.assetsalertData.name,
                        domain: this.assetsalertData.url,
                        configure: {
                            start: this.assetsalertData.startTime[0],
                            end: this.assetsalertData.startTime[1],
                            daily_start: this.assetsalertData.startdaily,
                            daily_end: this.assetsalertData.enddaily,
                            index: Number(this.assetsalertData.homemonitoringNum1),
                            picture: Number(this.assetsalertData.photoTamperingNum1),
                            hack: Number(this.assetsalertData.hijackedNum1),
                            deep: Number(this.assetsalertData.monitoringNum1),
                            domain: Number(this.assetsalertData.domainmonitorNum1),
                            notice: Number(this.assetsalertData.delivery),
                            remark: this.assetsalertData.strategynote,
                            usability: Number(this.assetsalertData.usability1),
                            delay: Number(this.assetsalertData.resTime),
                            threat_count: Number(this.assetsalertData.threat_count),
                            continue_count: Number(this.assetsalertData.continue_count),
                            notice_count: Number(this.assetsalertData.notice_count),
                            cookie: Number(this.assetsalertData.custom),
                            jump: Number(this.assetsalertData.jump)
                        },
                        remark: this.assetsalertData.remark,
                        superior: this.unitId,
                        tags: this.sitetag
                    }).then((res) => {
                        let data = res.data
                        if (data.status == 1) {
                            this.$message.success(data.msg);
                        } else {
                            this.$message.error(data.msg);
                        }
                        this.showdialog = false;
                        this.assetsalertData.selectd = false;
                    }).catch(v => {
                        console.log(v);
                    });
                }
            },
            assetsDetails(data) {
                    var server_delay = [],site_delay = [],created_at=[];
                    for(var i=0;i<data.usability.length;i++){
                        site_delay.push(data.usability[i].site_delay);
                        server_delay.push(data.usability[i].server_delay);
                        created_at.push(data.usability[i].created_at);
                    }
                let siteDelay = echarts.init(document.getElementById('siteDelay'));
                        siteDelay.setOption({
                            title: {
                                text: '毫秒/ms',
                                padding:[
                                    0,100,100,50
                                ]
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            legend: {
                                data: ['服务器延时', '网站延时']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                data: created_at
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [
                                {
                                    name: '网站延时',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: site_delay
                                },
                                {
                                    name: '服务器延时',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: server_delay
                                }
                            ]
                        });
                        document.getElementById('siteDelay').style.width = "100%";
                        siteDelay.resize();
            },
            delayTime(data) {
                var time = [],count = [],delay = [],elapse = [],status_code = [];
                for(var key in data){
                    time.push(key);
                    count.push(data[key]);
                }
                for(var key in count){
                    if(!count[key].length)return;
                    for(var i=0;i<count[key].length;i++){
                        delay.push(count[key][i].event.delay);
                        elapse.push(count[key][i].event.elapse);
                        status_code.push(count[key][i].event.status_code);
                    }
                };
                if(!document.getElementById('delayTime')) return;
                let delayTime = echarts.init(document.getElementById('delayTime'));
                delayTime.setOption({
                    title: {
                        text: '毫秒',
                        padding:[
                            0,100,100,100
                        ]
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['网站延迟时间','打开网站消耗时间','打开网站报错状态码']
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: time
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    grid:{
                        x:70,
                        y:45
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            left: '3%',
                            start: 50,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: '网站延迟时间',
                            type: 'bar',
                            data: delay,
                        },{
                            name: '打开网站消耗时间',
                            type: 'bar',
                            data: elapse,
                        },
                        {
                            name: '打开网站报错状态码',
                            type: 'bar',
                            data: status_code,
                        }
                    ]
                });
                document.getElementById('delayTime').style.width = "100%";
                delayTime.resize();
            },
            getsite() {
                this.loading2 = true;
                this.$axios.get("api/site?limit="+this.vals+"&page=1").then((res) => {
                    this.totalpage = Math.ceil(res.data.data.count);
                    let data = res.data.data.data;
                    this.tableData3 = data;
                    this.loading2 = false;
                }).catch(v => {
                    console.log(v);
                });
            },
            createTime() {
                for (var i = 0; i < 25; i++) {
                    this.dayTime.push(i);
                };
            },
            getHistory(id){
                this.$axios.get('api/site/'+id+'/history').then((res)=>{
                        this.threat = res.data.data.threat;
                        this.threatLoading = false;
                    })
            }
        },
        created() {
            this.getsite();
            this.createTime();
            this.loadAll();
            this.$axios.get("api/siteConfigure/select/all").then((res) => {
                if(res.data.status == 403){
                    window.location.href = '/login';
                    return;
                };
                let data = res.data;
                this.strategydata = data.data;
            }).catch(v => {
                console.log(v);
            });
        },
        activated(){
            if (this.$route.params.id) {
                this.right = '0%';
                this.loading3 = true;
                this.activeName3 = 'fourth';
                if(this.$route.params.name == 'usblity'){
                     this.activeName = 'visble';
                     this.activeName2 = 'assetEvent';
                     this.usabLoading = true;
                     this.average(this.$route.params);
                }else if(this.$route.params.name == 'assets'){
                    this.activeName = 'first';
                    this.getHistory(this.$route.params.id);
                }
                this.handleMovelayer(this.$route.params);
            }else if(this.$route.params.unItId){
                this.loading2 = true;
                this.owner_id = this.$route.params.unItId;
                this.$axios.get('api/site?page=1&limit=10&owner_id='+this.$route.params.unItId+'').then((res)=>{
                        let data = res.data;
                        this.tableData3 = data.data.data;
                        this.totalpage = Math.ceil(data.data.count);
                        this.loading2 = false;
                });
            }
            else {
                this.activeName = 'first';
            }
        },
        mounted() {
            var text = document.getElementsByClassName('el-table__empty-text');
            for (var i = 0; i < text.length; i++) {
                text[i].innerHTML =
                    '<img src="../../../static/img/assets/noText.png" class="noText"><span>目前没有内容</span>';
            }
        }
    }

    window.onresize = function(){
        if(!document.getElementById('siteDelay')) return;
        let siteDelay = echarts.init(document.getElementById('siteDelay'));
        siteDelay.resize();
        if(!document.getElementById('delayTime')) return;
        let delayTime = echarts.init(document.getElementById('delayTime'));
        delayTime.resize();
    };
    window.onload = function(){
       this.onresize();
    }

</script>
<style>
    .application .availability .left_btn .el-radio-group{
            line-height: 1;
            vertical-align: middle;
            font-size: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            align-content: center;
    }
    .exportBtn{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #409EFF;
        border: 1px solid #d8dce5;
        color: #fff;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        -o-transition: .1s;
        transition: .1s;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 12px;
        padding: 9px 15px;
        
    }
    body {
        overflow: hidden;
    }

    .el-tag+.el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        height: 10px;
        line-height: 10px;
        padding: 0 8px;
    }

    .application .left .input-with-select .el-input__inner{
        width: 170px;
        margin-left: 20px;
    }
    .application .left{
        display: flex;
    }
    .application .left .el-dropdown .el-button{
        height:34px;
    }

.el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select{
        margin:-16px;
        margin-top:0;
        margin-bottom:-2px;
}
    .application .el-dialog .el-form-item--small:nth-of-type(8) {
        left: 38%;
    }

    .application .el-dialog .el-form-item:nth-of-type(7) .border {
        left: 18%;
    }

    .application .el-dialog .el-form-item:nth-of-type(8) .border {
        left: 31%
    }

    .application .el-dialog .el-form-item:nth-of-type(9) .border {
        left: 30%;
    }

    .application .el-dialog .el-form-item:nth-of-type(10) .border {
        left: 25%;
    }

    .popper__arrow {
        display: none !important;
    }

    .application .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 15px 10px;
    }

    .application .el-dialog__title {
        font-size: 16px;
    }

    .application .el-dialog .el-switch {
        margin-left: 5px;
        margin-top: -7px;
        vertical-align: text-bottom
    }

    .application .el-dialog .item-mini-input .el-input__inner {
        height: 21px;
    }

    .application .el-table__empty-text {
        display: flex;
        align-items: center;
    }

    .application .el-table__empty-text span {
        margin-left: 15px;
    }

    .application .noText {
        width: 24px;
        height: 24px;
    }

    .application .el-table thead {
        color: #666;
    }

    .application .batchAdd .el-form .el-form-item__content .el-textarea .el-textarea__inner {
        height: 145px !important;
        width: 80%;
        font-family: 'Microsoft Yahei';
    }

    .application .el-form .associatedUnit .el-form-item__content {
        display: flex;
    }

    .application .el-form .el-form-item__content .el-button {
        margin-left: 10px;
        height: 31px;
    }

    @media screen and (max-width: 1100px) {
        .application .left .el-input-group {
            width: 50% !important;
        }
        .application .right .el-button--small {
            padding: 9px 7px;
        }
    }

    .application .has-gutter tr {
        background-color: #f2f2f2;
    }

    .application .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #e2e2e2;
    }

    .application .showSetting .el-form-item__label {
        color: #409EFF
    }

    .childtab .el-tabs__content .left_l {
        float: left;
        display: flex;
        align-items: center
    }

    .childtab .el-tabs__content .left_l .left_title {
        font-size: 14px;
        color: #5a5e66
    }

    .application .hidebox .el-form-item {
        border: 1px solid #e4e4e4;
        border-radius: 6px;
        position: relative;
    }

    .application .hidebox .el-form-item:nth-of-type(1) {
        border: none;

    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label:nth-of-type(1) {
        background: none;
        display: initial;
        position: none;
        height: 31px;
        line-height: 31px;
    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__content:nth-of-type(1) .el-icon-question {
        left: 0px;
    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__content:nth-of-type(1) .border {
        left: 29%
    }

    .application .el-textarea__inner{
        font-family: "Microsoft Yahei";
    }

    .application .hidebox .el-textarea__inner {
        border: none;
        outline: none;
    }

    .application .el-slider__runway {
        margin-left: 20px;
        width: 95%;
        margin-top: 14px;
    }

    .application  .el-slider__runway .el-slider__button-wrapper {
        outline: none;
    }

    .application .el-dialog .el-icon-question {
        position: absolute;
        top: 9px;
        left: -10px;
        cursor: pointer;
    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label {
        line-height: 66px;
        border-right: 1px solid #fbfbfb;
        background: #f5f5f5;
        padding-right: 0;
    }

    .application .hidebox .dborder {
        border-bottom: 1px dashed #d7d7d7;
        margin-bottom: 20px;
        margin-top: -11px;
    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__content,
    .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__content,
    .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__content,
    .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content {
        padding-left: 10px;
        padding-right: 10px;
    }

    .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content {
        display: flex;
        align-items: center;
    }

    .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__content .el-switch__core {
        margin-top: 4px;
    }

    .application .hidebox .el-form-item:nth-of-type(2) {
        line-height: 100%;
    }

    .application .hidebox .el-form-item:nth-of-type(1) .el-form-item__label,
    .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__label,
    .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__label,
    .application .hidebox .el-form-item:nth-of-type(4) .el-form-item__label,
    .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__label,
    .application .hidebox .el-form-item:nth-of-type(6) .el-form-item__label {
        position: absolute;
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        padding: 0
    }

    .application .hidebox .el-form-item:nth-of-type(2) .el-form-item__label {
        border-right: 1px solid #fbfbfb;
        background: #f5f5f5;
    }

    .application .hidebox .el-form-item:nth-of-type(3) .el-form-item__label {
        border-right: 1px solid #fbfbfb;
        line-height: 35px;
        background: #f5f5f5;
    }

    .application .hidebox .el-form-item:nth-of-type(4) .el-form-item__label {
        border-right: 1px solid #fbfbfb;
        background: #f5f5f5;
        line-height: 55px;
    }

    .childtab .el-tabs--border-card {
        position: absolute;
        width: 97%;
        height: 100%;
    }

    .application .hidebox .el-form-item:nth-of-type(5) .el-form-item__label {
        border-right: 1px solid #fbfbfb;
        background: #f5f5f5;
        line-height: 35px;
    }

    .application .hidebox .el-form-item:nth-of-type(6) .el-form-item__label {
        border-right: 1px solid #fbfbfb;
        background: #f5f5f5;
        line-height: 54px;
    }

    .application .el-form .item-mini-input {
        display: inline-block;
        width: 10%;
    }

    .application .el-form .item-mini-input .el-input-group {
        width: 20%;
    }

    .application .el-form .item-mini-input .el-input-group__append {
        padding: 0 13px;
        background: #e4e4e4;
        color: #666
    }

    .application .el-form .item-mini-select {
        width: 13%;
        display: inline-block;
    }
    .application .el-form .item-mini-select .el-input__inner{
        height: 25px;
    }

    .application .el-form .el-input.item-mini-input:nth-of-type(1) {
        width: 10%;
    }

    .application .el-form .el-input.item-mini-input:nth-of-type(2),
    .application .el-form .el-input.item-mini-input:nth-of-type(3) {
        width: 8%;
    }

    .application .el-form .item-mini-input .el-input__inner {
        padding: 0;
        text-align: center;
    }

    .application .el-dialog .icon:hover .tips {
        display: block;
    }

    .application .el-dialog .tips {
        position: absolute;
        background: rgb(50, 65, 87);
        border-radius: 6px;
        color: #eee;
        left: -66px;
        top: -32px;
        padding-left: 10px;
        padding-right: 10px;
        display: none;
        font-size: 12px;
    }

    .application .el-dialog .hideStrate .el-form-item:nth-of-type(3) .border {
        left: 23%;
    }

    .application .el-dialog .hideStrate .strategynote .el-form-item__content {
        line-height: 100%
    }

    .application .el-dialog .hideStrate .strategynote .el-form-item__content .el-input--small {
        height: 100%
    }

    .application .el-dialog .hideStrate .abnormal .el-input__inner,
    .application .el-dialog .hidebox .abnormal .el-input__inner {
        height: 22px;
        width: 54px;
    }

    .application .el-dialog .hideStrate .custom .el-input--small,
    .application .el-dialog .hidebox .custom .el-input--small {
        height: 52px;
    }

    .application .el-dialog .hideStrate .el-form-item:nth-of-type(4) .border {
        left: 37%;
    }

    .application .el-dialog .hideStrate .el-form-item:nth-of-type(5) .border {
        left: 22%;
    }

    .application .el-dialog .hideStrate .el-form-item:nth-of-type(6) .border {
        left: 18%;
    }

    .application .el-dialog .hideStrate .el-form-item:nth-of-type(7) .border {
        left: 16%;
    }

    .application .table-threat .tips {
        font-size: 14px;
        color: #ddd;
        padding-left: 20px;
        padding-right: 20px;
        background: #393D49;
        z-index: 20;
        display: none;
        position: absolute;
        padding-top: 5px;
        padding-bottom: 5px;
    }


    .application .table-threat .pagination {
        margin-right: 75px;
    }

    .application .table-threat .tips .view {
        color: #6aa5ff
    }

    .application .table-threat .tips .border {
        border-left: 5px solid transparent;
        border-right: 5px solid #393D49;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        position: absolute;
        left: -10px;
        top: 32%;
    }

    .application .el-dialog .tips .border {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgb(50, 65, 87);
        border-bottom: 8px solid transparent;
        position: absolute;
        bottom: -15px;
        left: 22%;
    }

    .application .el-form .times {
        background: #E4E4E4;
        border-radius: 0px 4px 4px 0px;
        margin-left: -6px;
        padding-top: 1px;
        padding-left: 9px;
        padding-right: 9px;
        padding-bottom: 2px;
    }

    .application .el-table--enable-row-transition .el-table__body td:hover {
        cursor: pointer;
    }

    .childtab .el-table--enable-row-transition .el-table__body td:hover {
        cursor: initial;
    }

    .childtab .el-tabs__content .right {
        margin-left: 530px;
    }

    .childtab .el-input--small .el-input__inner {
        height: 40px !important;
    }

    .childtab .el-select {
        width: 490px;
    }

    .childtab .el-tabs__content .left_l img {
        float: left;
        margin-right: 10px;
    }

    .childtab .el-tabs__content .right .el-input {
        width: 150px
    }

    .childtab .table-threat {
        margin-top: 20px;
    }

    .content-box {
        overflow-x: hidden;
    }

    .application .confrim .el-form-item__content,
    .application .undo .el-form-item__content,
    .application .ignore .el-form-item__content,
    .application .positives .el-form-item__content {
        margin-left: 0 !important;
    }

    .application .el-tabs__content {
        position: absolute;
        width: 98%;
        height: 130%;
    }

    .childtab .el-tabs .el-tabs__content:first-child {
        border-right: 1px solid #d8dce5;
    }

    .application .el-tabs__content .el-tabs__content {
        overflow: auto;
    }

    .application .el-step {
        position: relative;
    }

    .assetsEvent .is-horizontal .el-step__main {
        width: 300px;
        height: 60px;
        background: #fff;
        border: 2px solid #eee;
        position: absolute;
    }

    .web-assets .assets-content .domain .item-content:last-child{
        margin-bottom: 290px;
    } 

    .assetsEvent .is-horizontal:nth-of-type(1) .el-step__main {
        top: -100px;
    }

    .assetsEvent .is-horizontal:nth-of-type(2) .el-step__main {
        top: 100px;
    }

    .assetsEvent .is-horizontal:nth-of-type(3) .el-step__main {
        top: -100px;
    }

    .childtab .el-tabs__nav-wrap {
        padding-left: 0 !important;
    }

    .application .el-tabs__nav-wrap:first-child {
        padding-left: 30px;
    }
     .application .el-table .threatEvent,.application .el-table .assetEvent{
         width: 100%;
         height:100%;
         position: absolute;
         top: 0;
         left:0;
         display: flex;
         align-items: center;
         justify-content: center;
     }
    .application .el-table td:first-child .cell,
    .application .el-table th:first-child .cell {
        padding-left: 15px;
    }

    .application .cell {
        color: #5a5e66;
        display: flex;
        justify-content: center;
        align-items:center;
    }

    .application .cell a {
        color: #666;
    }

    .application .cell a .iconfont {
        font-size: 22px;
    }

    .application tbody td {
        text-align: center;
    }

    .application .el-table th {
        text-align: center;
    }

    .application .msg {
        display: inline;
        margin-left: 5px;
    }

    .application .msg span {
        color: red;
    }

    .application .el-tabs__content .el-table__footer-wrapper{
        margin-top: 10px;
    }

    .application .handle-input {
        width: 200px !important;
    }

    .application .availability .left_btn{
        float: left;
        margin-left:20px;
        margin-right:20px;
    }
    .application .availability .left_btn .el-radio-button__inner{
        height: 32px;
        position: relative;
        width: 54px;
    }

    .application .availability .left_btn .el-radio-button__inner span{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        line-height: 30px;
    }
    .application .availability .left_btn .el-button+.el-button{
        margin-left:6px;
    }
    .application .availability .right_btn{
        margin-right:50px;
        margin-top: 10px;
    }
    .application .availability .right_btn .el-button--primary{
        margin-left:15px;
        float: right;
    }

    .application .availability .el-input__inner{
        border-radius: 0;
    }

    .clear{
        clear:both;
    }
    .application .availability .el-row .el-button{
        margin-left:15px;
    }

    .application .noAvailability{
       width:70.3%;
       height:100%;
       position: fixed;
       display: flex;
       justify-content: center;
       align-content: center;
       align-items: center;
       background: #f2f2f2;
       z-index: 99;
    }

    .application .noAvailability span{
        margin-left: 10px;
        font-size: 14px;
        color: #5a5e66;
    }

    .application  .delayTime{
            margin-bottom: 20px;
        }
    .application .delayTime div{
            width:100%!important;
            position:absolute!important;
    }

    .application .siteDelay div{
            position:absolute!important;
    }
            

</style>
<style lang="scss" scoped>

ul,
    li {
        list-style: none;
    }

    .el-tag {
        margin-right: 10px;
    }

.exportPort{
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
}
    .crumbss {
        border-width: 0px;
        height: 32px;
        color: #FFF;
        background: #409eff;
        float: left;
        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .intelligence {
        padding {
            left: 20px;
            right: 20px;
        }
        li {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #d7d7d7;
            font-size: 14px;
            p {
                float: left;
            }
            span {
                float: right;
                margin-right: 50px;
            }
        }
        li:hover {
            background: #f2f2f2;
        }


    }

    .el-breadcrumb {
        text-align: center;
        line-height: 32px;
    }

    .application .crumbs .el-breadcrumb {
        font-size: 18px;
    }

    .application .eel-breadcrumb__item:last-child .el-breadcrumb__inner .iconfont {
        font-size: 18px !important;
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
    }

    .el-table__header thead {
        background: #f2f2f2
    }

    .handle-input {
        width: 100px;
    }

    .el-form-item__content .selectType {
        width: 70%;
    }

    .alertInput {
        width: 80%;
    }

    .selectType1 {
        width: 40%;
    }

    .corn {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
    }

    .snapshot {
        width: 20px;
        height: 20px;
        background: url('../../../static/img/assets/snapshot.png') -6px 0;
        cursor: pointer;
    }

    .application .cell{
        display: flex;
        justify-content: center;
        align-items:center;
    }

    .update {
        width: 19px;
        height: 20px;
        background: url('../../../static/img/update.png') no-repeat -41px -25px;
        cursor: pointer;
        display: inline-block;
    }

    .stop {
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -23px 1px;
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;
    }

    .play {
        width: 24px;
        height: 24px;
        background: url("../../../static/img/update.png") no-repeat -60px -21px;
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;
    }

    thead th {
        text-align: center
    }

    .is-leaf:last-child {
        border-right: 1px solid #ddd !important;
    }
    
        .list {
        position: absolute;
        width: 100%;
        z-index: 2;
        background: #fff;
        border: 1px solid #eee;
        border-top: none;
        li {
            padding-left: 15px;
            cursor: pointer;
        }
        li:hover {
            background: #e5e5e5;
        }
    }

    .historthreat,
    .assetsEvent {
        background: #f2f2f2;
        overflow: auto;
        .historthreat-title {
            padding: 20px;
            padding-bottom: 0;
            font-weight: 500;
            color: #333;
        }
        .history-list {
            margin-left: 222px;
            padding-top: 10px;
            .el-steps{
                width: 98%;
            }
            .is-vertical {
                float: left;
                width: 0;
            }
            .box {
                position: relative;
                margin-bottom: 15px;
                .createTime {
                    position: absolute;
                    left: -170px;
                    color: #666;
                }
                .view{
                    color:#409EFF;
                }
                .view:visited{
                    color:#006AD5;
                }
            }
            .border {
                width: 2px;
                background: #d7d7d7;
                position: absolute;
                height: 230px;
                left: 10px;
                top: 20px;
            }
        }
        .item-noText {
            text-align: center;
            height: 800px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                margin-left: 10px;
                font-size: 14px;
                color: #5a5e66;
            }
            img {
                width: 21px;
                height: 21px;
            }
        }
        .item-list {
            height: 185px;
            background: #fff;
            padding: 10px;
            margin-left: 35px;
            border-radius: 6px;
            box-shadow: 1px 1px 1px 5px #eee;
            .item-top {
                border-bottom: 1px solid #eee;
            }
            .item-top,
            .item-bottom {
                padding: 10px;
                font-size: 14px;
                color: #666;
            }

        }
    }

    .historthreat {
        width: 100%;
        height: 100%;
        position:absolute;
    }

    .assetsEvent {
        height: 1200px;
        width: 100%;
        position: absolute;
        .border {
            height: 50px !important;
        }
        .item-list {
            height: 35px !important;
            .item-top {
                border: none !important;
            }
        }
    }

    .childtab {
        margin-left: 30px;
        .tab-header {
            height: 40px;
            .historicalthreat {
                cursor: pointer;
                position: absolute;
                left: 260px;
                top: -61px;
                z-index: 3;
                border-bottom: none;
            }
        }
    }

    .web-assets {
        width: 96%;
        height: 780px;
        border: 1px solid #ddd;
        margin-left: 30px;
        overflow: auto;
        margin-bottom: 50px;
        .assets-header {
            height: 40px;
            background: #f2f2f2;
            position: relative;
            padding-left: 10px;
            display: flex;
            justify-content: left;
            align-content: center;
            align-items: center;
            .icon {
                width: 20px;
                height: 16px;
                position: relative;
                img {
                    position: absolute;
                    bottom: 0px;
                }
                img:nth-of-type(1) {
                    left: 0;
                }
                img:nth-of-type(2) {
                    left: 5px;
                }
                img:nth-of-type(3) {
                    left: 10px;
                }
                img:nth-of-type(4) {
                    left: 15px
                }
            }
            .header-title {
                margin-left: 17px;
            }
        }
        .assets-content {
            .list-item {
                .item-header {
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                    .header-title {
                        border-bottom: 3px solid #409eff;
                        display: inline-block;
                        span {
                            padding-left: 30px;
                            padding-right: 30px;
                        }
                    }
                }
                .item-content {
                    margin-top: 15px;
                    .ipaddress {
                        width: 140px;
                        height: 30px;
                        background: #f2f2f2;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 15px;
                        margin-left: 20px;
                    }
                }
            }
        }
    }

    .monitoringcount {
        width: 895px;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        display: inline-block;
        position: relative;
        .border {
            position: absolute;
            left: 50%;
            top: 60px;
            margin-left: -231px;
            z-index: 1;
        }
        .count-list {
            width: 600px;
            height: 560px;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
                width: 150px;
                height: 150px;
                border: 1px solid #ddd;
                border-radius: 50%;
                position: absolute;
                background: #fff;
                z-index: 2;
                .item-arrow {
                    position: absolute;
                }

                .item-box {
                    text-align: center;
                    span {
                        font-size: 48px;
                        line-height: 95px
                    }
                    p {
                        color: #333;
                    }
                }
            }
            .list-bg {
                img {
                    width: 150px;
                    height: 150px;
                }
            }
            li:nth-of-type(1) {
                .item-arrow {
                    top: 64px;
                    left: 159px;
                    transform: rotate(11deg);
                }
                top: 0px;
                left: 220px;
                span {
                    color: #3a92c0;
                }

            }
            li:nth-of-type(2) {
                left: 0px;
                top: 180px;
                span {
                    color: #53a169;
                }
                .item-arrow {
                    top: -21px;
                    left: 95px;
                    transform: rotate(-50deg);
                }
            }
            li:nth-of-type(3) {
                right: 0px;
                top: 180px;
                span {
                    color: #5FB878;
                }
                .item-arrow {
                    top: 150px;
                    left: 68px;
                    transform: rotate(100deg);
                }
            }
            li:nth-of-type(4) {
                left: 100px;
                top: 405px;
                span {
                    color: #F7A358
                }
                .item-arrow {
                    top: 2px;
                    left: 3px;
                    transform: rotate(-135deg);
                }
            }
            li:nth-of-type(5) {
                right: 100px;
                top: 405px;
                span {
                    color: #42A7DB
                }
                .item-arrow {
                    top: 97px;
                    transform: rotate(170deg);
                    left: -9px;
                }
            }
        }
    }

    $unit: 170px;
    .assetsEvent {
        margin-bottom: 20px;
        .arrow {
            img {
                position: absolute;
                top: 50%;
                margin-top: -42px;
                cursor: pointer;
            }
            img:first-child {
                left: 5px;
            }
            img:last-child {
                right: 5px;
            }
        }
        .assetTime {
            width: 1210px;
            height: 3px;
            background: #1D9ED9;
            position: relative;
            top: 240px;
            left: 50px;
            li {
                width: 10px;
                height: 10px;
                background: #199ed8;
                border-radius: 50%;
                float: left;
                position: absolute;
                top: -4px;
                .item-box,
                .item-box .item-bg {
                    width: 300px;
                    height: 70px;
                    background: #fff;
                    position: absolute;
                    color: #666;
                    font-size: 14px;
                    z-index: 1;
                    cursor: pointer;
                    .item-content {
                        padding-left: 20px;
                        position: relative;
                        z-index: 2;
                        .item-name {
                            margin-top: 8px;
                        }
                        .time {
                            display: flex;
                            align-content: center;
                            align-items: center;
                            margin: 5px auto;
                            p {
                                display: inline;
                                color: #999;
                                margin-left: 5px
                            }
                        }
                    }
                }
            }
            li:nth-of-type(1) {
                left: $unit*1-30;
                .item-box {
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(2) {
                left: $unit*2;
                .item-box {
                    bottom: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(3) {
                left: $unit*3;
                .item-box {
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(4) {
                left: $unit*4;
                .item-box {
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(5) {
                left: $unit*5;
                .item-box {
                    top: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(6) {
                left: $unit*6;
                .item-box {
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-child(2n) {
                .item-box {
                    .item-name {
                        margin-top: 17px;
                    }
                }
            }
            li:last-child {
                width: 20px;
                height: 20px;
                right: 0;
                left: auto;
                top: -9px;
            }
        }

    }

    .layer {
        width: 74%;
        height: 100%;
        background: #fff;
        position: fixed;
        box-shadow: 1px 1px 10px 1px #a5a5a5;
        top: 0;
        z-index: 99;
        transition: all 0.3s linear;
        .layer-header {
            height: 65px;
            padding-left: 30px;
            border-bottom: 1px solid #ddd;
            line-height: 65px;
            .head-content {
                float: left;
                display: flex;
                align-items: center;
                .title {
                    margin-left: 20px;
                }
            }
            .head-close {
                float: right;
                margin-right: 20px;
                cursor: pointer;
                font-family: '微软雅黑';
                font-size: 20px;
                position: absolute;
                right: 0;
                z-index: 10001;
            }
        }
        .layer-content {
            margin-top: 12px;
        }
        .btn-list {
            .list-item {
                width: 37px;
                height: 20px;
                line-height: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                color: #fff;
                border-color: transparent;
                margin-right: 8px;
                margin-left: 5px;
            }
            .list-item.blue {
                background: #409dff
            }
            .list-item.orange {
                background: #ff9933
            }
            .list-item.pink {
                background: #f56b6b;
            }
        }

    }
    
    .infomations{
        height:700px;
        overflow: auto;
    }
    .information {
        width: 30%;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        float: left;
        .infomation-list {
            margin-top: 55px;
            overflow: auto;
            height: 900px;
            .border {
                // color:#d7d7d7;
                border: 0.5px dashed #d7d7d7;
            }
            p {
                color: #666;
            }
            li {
                padding-left: 10%;
                padding-right: 17%;
                margin-bottom: 15px;
                font-size: 14px;
                span {
                    color: #409EFF;
                }
            }
        }

    }

    .monitoringcount {
        width: 62%;
        height: 676px;
        border: 1px solid #ddd;
        margin-left: 30px;
        display: inline-block;
        position: relative;
        overflow: auto;
        .border {
            position: absolute;
            left: 50%;
            top: 120px;
            margin-left: -231px;
            z-index: 1;
        }
        .count-list {
            height: 560px;
            margin: 55px auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
                width: 150px;
                height: 150px;
                border: 1px solid #ddd;
                border-radius: 50%;
                position: absolute;
                background: #fff;
                z-index: 2;
                .item-arrow {
                    position: absolute;
                }

                .item-box {
                    text-align: center;
                    span {
                        font-size: 40px;
                        line-height: 95px
                    }
                }
            }
            .list-bg {
                img {
                    width: 150px;
                    height: 150px;
                }
            }
            li:nth-of-type(1) {
                .item-arrow {
                    top: 68px;
                    left: 159px;
                    transform: rotate(11deg);
                }
                top: 0px;
                left: 220px;
                span {
                    color: #3a92c0;
                }
            }
            li:nth-of-type(2) {
                left: 0px;
                top: 180px;
                span {
                    color: #53a169;
                }
                .item-arrow {
                    top: -21px;
                    left: 99px;
                    transform: rotate(-50deg);
                }
            }
            li:nth-of-type(3) {
                right: 0px;
                top: 180px;
                span {
                    color: #5FB878;
                }
                .item-arrow {
                    top: 150px;
                    left: 70px;
                    transform: rotate(100deg);
                }
            }
            li:nth-of-type(4) {
                left: 100px;
                top: 405px;
                span {
                    color: #F7A358
                }
                .item-arrow {
                    top: 2px;
                    left: 0px;
                    transform: rotate(-135deg);
                }
            }
            li:nth-of-type(5) {
                right: 100px;
                top: 405px;
                span {
                    color: #42A7DB
                }
                .item-arrow {
                    top: 101px;
                    transform: rotate(170deg);
                    left: -9px;
                }
            }
        }
    }

    .availability {
        border: 1px solid #ddd;
        margin-left: 30px;
        width:97%;
        height:100%;
        overflow: auto;
        position: absolute;
        .leftContent {
            height: 1600px;
            width: 100%;
            overflow: auto;
            margin-top: 20px;
            .delayTime {
                margin-bottom: 20px;
            }
        }
    }

    $unit: 170px;
    .assetsEvent {
        .arrow {
            img {
                position: absolute;
                top: 50%;
                margin-top: -42px;
                cursor: pointer;
            }
            img:first-child {
                left: 5px;
            }
            img:last-child {
                right: 5px;
            }
        }
        .assetTime {
            width: 1210px;
            height: 3px;
            background: #1D9ED9;
            position: relative;
            top: 240px;
            left: 50px;
            li {
                width: 10px;
                height: 10px;
                background: #199ed8;
                border-radius: 50%;
                float: left;
                position: absolute;
                top: -4px;
                .item-box,
                .item-box .item-bg {
                    width: 300px;
                    height: 70px;
                    background: #fff;
                    position: absolute;
                    color: #666;
                    font-size: 14px;
                    z-index: 1;
                    cursor: pointer;
                    .item-content {
                        padding-left: 20px;
                        position: relative;
                        z-index: 2;
                        .item-name {
                            margin-top: 8px;
                        }
                        .time {
                            display: flex;
                            align-content: center;
                            align-items: center;
                            margin: 5px auto;
                            p {
                                display: inline;
                                color: #999;
                                margin-left: 5px
                            }
                        }
                    }
                }
            }
            li:nth-of-type(1) {
                left: $unit*1-30;
                .item-box {
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(2) {
                left: $unit*2;
                .item-box {
                    bottom: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(3) {
                left: $unit*3;
                .item-box {
                    top: -150px;
                    left: -140px;
                }
            }
            li:nth-of-type(4) {
                left: $unit*4;
                .item-box {
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(5) {
                left: $unit*5;
                .item-box {
                    top: -150px;
                    left: -150px;
                }
            }
            li:nth-of-type(6) {
                left: $unit*6;
                .item-box {
                    bottom: -150px;
                    left: -150px;
                }
            }
            li:nth-child(2n) {
                .item-box {
                    .item-name {
                        margin-top: 17px;
                    }
                }
            }
            li:last-child {
                width: 20px;
                height: 20px;
                right: 0;
                left: auto;
                top: -9px;
            }
        }

    }

    .application .table .showSetting .el-form-item__label {
        color: red
    }

    .application .tips {
        display: none;
    }

</style>