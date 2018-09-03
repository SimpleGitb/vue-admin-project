<template>
<div class="dashboard">
    <div class="content-tab">
        <div class="statisticalt">
            <ul class="count-list">
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.site_count | NumFormat }}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <div class="item-border">
                            <span>总站点个数</span>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{toauditData.monitor_today | NumFormat}}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total1_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total1_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                         <div class="item-border">
                            <span>总监测次数</span>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.confirm_today | NumFormat }}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total2_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total2_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                         <div class="item-border">
                            <span>今日确认威胁</span>
                        </div>                        
                    </div>
                </li>
                <li class="list-item">
                    <div class="item-top">
                        <span>{{ toauditData.threat_count | NumFormat}}</span>
                        <div class="item-box">
                            <div class="item-bg">
                                <div class="item-bg-box">
                                    <img src="../../../static/img/home/total3_t.png" class="itembg-t">
                                    <img src="../../../static/img/home/total3_b.png" class="itembg-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-bottom">
                          <div class="item-border">
                            <span>历史威胁事件</span>
                        </div>                            
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
        <div class="toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">数据统计</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':index == 1}" v-for="(index,item) in Math.ceil(tabdata.length/4)" :key="item.count"
                                @mouseover="swiper(index,$event,0)"></li>
                        </ul>
                    </div>
                </el-header>
                <el-main>
                    <div class="toaudit-box" :style="{left:toauditLeft}">
                        <div class="toaudit-content">
                            <ul class="content-list">
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.confirm_count}}</span>
                                        <p class="item-msg">总确认威胁</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.deal_wait}}</span>
                                        <p class="item-msg">总待处置威胁(站点数)</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.threat_today}}</span>
                                        <p class="item-msg">今日故障站点</p>
                                    </div>
                                </li>
                                <li class="list-item">
                                    <div class="item-content">
                                        <span class="item-count">{{toauditData.site_stop}}</span>
                                        <p class="item-msg">已暂停网站 </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="toaudit-content">
                            <ul class="content-list">
                                <li class="list-item">
                                    <div class="item-content contentpage">
                                        <span class="item-count">{{toauditData.site_audit}}</span>
                                        <p class="item-msg">待审核网站</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="application toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">应用分布</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':item == 0}" v-for="(index1,item) in distribution" :key="item.id" @mouseover="swiper(item,$event,1)"></li>
                        </ul>
                    </div>
                </el-header>
                <div class="toaudit-box" style="left:0%">
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted" style="width:  100%; height: 250px"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted1" style="width: 100%; height: 300px"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted2" style="width: 100%; height: 300px"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted3" style="width: 100%; height: 300px"></div>
                    </el-main>
                    <el-main class="app_content" style="overflow:hidden;">
                        <div id="Accounted4" style="width: 100%; height: 300px"></div>
                    </el-main>
                </div>
            </el-container>
        </div>
        <div class="website-statistical toaudit">
                <el-header class="header">
                    <p class="header_title">站点与威胁统计</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':item == 0}" v-for="(index, item) in statisticalData" :key="item.id" @mouseover="swiper(item,$event,2)"></li>
                        </ul>
                    </div>
                </el-header>
                <div class="toaudit-box" style="left:0%">
                    <el-main>
                        <div class="toaudit-content">
                            <div id="webSite-statistical" :style="{width: '100%', height: '840px'}"></div>
                        </div>
                    </el-main>
                    <el-main>
                        <div class="toaudit-content">
                            <div id="webSiteCms" :style="{width: '100%', height: '840px'}"></div>
                        </div>
                    </el-main>
                </div>
        </div>
        <div class="distribution toaudit">
            <el-container>
                <el-header class="header">
                    <p class="header_title">威胁趋势</p>
                    <div class="header_btn">
                        <ul class="btn-list">
                            <li :class="{'list-item':listItem,'active':active2 = index !== 1}" v-for="(item,index) in switchData" :key="item.key" @mouseover="swiper(index,$event,3)"></li>
                        </ul>
                    </div>
                </el-header>
                <el-main>
                    <div class="toaudit-box" style="left:0%;">
                        <div class="toaudit-content">
                            <div id="broken" style="width:100%;height:480px;margin-left:50px"></div>
                        </div>
                        <div class="toaudit-content">
                            <ve-line :data="chartData" :loading="loading" ref="chart4" style="width:90%;height:500px;margin-left:30px"></ve-line>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>
<script>
    import Vue from 'vue'
    import echarts from 'echarts'
    import line from 'v-charts/lib/line.common';
    import {
        CodeToText
    } from 'element-china-area-data';
    Vue.component(line.name, line);
    import 'v-charts/lib/style.css'

    export default {
        name: 'dashboard',
        data() {
            return {
                includedComponents:'dashboard',
                toauditData: {
                    site_count: '0',
                    monitor_today: '0',
                    confirm_today: '0',
                    threat_count: '0',
                    confirm_count: '0',
                    deal_wait: '0',
                    threat_today: '0',
                    site_stop: '0',
                    site_audit: '0'
                },
                distribution: [{
                        id: 1,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 2,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 3,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 4,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 5,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    }
                ],
                statisticalData: [{
                        id: 1,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    },
                    {
                        id: 2,
                        name: 'asdada',
                        age: '180',
                        sex: 'nan'
                    }
                ],
                loading:true,
                active: false,
                active2: false,
                header_title: '站点地图分布',
                index: 0,
                activeName: 1,
                chartData: {
                    type: 'line',
                    columns: ['时间', '确认', '处置'],
                    rows: [
                    ]
                },
                toauditLeft: 0,
                tabdata: [{
                        count: 66
                    },
                    {
                        count: 99
                    },
                    {
                        count: 10
                    },
                    {
                        count: 78
                    },
                    {
                        count: 65
                    }
                ],
                switchData: [{
                        'name': '1122',
                        'key': 'asdsada'
                    },
                    {
                        'name': '1133',
                        'key': 'dvdsver'
                    },
                ],
                listItem: true,
                isData1:false,
                isData2:false,
                isData3:false,
                isData4:false,
                names:[],
                names1:[],
                names2:[],
                names3:[],
                names4:[],
                names5:[],
                confirm:[]
                // name: localStorage.getItem('ms_username'),
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        methods: {
            loadData(index){
            },
            drawLine() {
                var Accounted = echarts.init(document.getElementById('Accounted'));
                if(!Accounted)return;
                Accounted.showLoading();
                this.$axios.get('api/count/pieChart?type=server').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        this.names.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: 'web容器占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['55%', '62%'],
                            data: this.names,
                        }]
                    });
                Accounted.hideLoading();
                }).catch(v => {
                    console.log(v)
                });
            },
            drawLine1() {
                this.names1 = [];
                var Accounted = echarts.init(document.getElementById('Accounted1'));
                if(!Accounted)return;
                Accounted.showLoading();
                this.$axios.get('api/count/pieChart?type=os').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        this.names1.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 基于准备好的dom，初始化echarts实例
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: '操作系统占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['55%', '50%'],
                            data: this.names1,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                    Accounted.hideLoading();
                }).catch(v => {
                    console.log(v)
                });
            },
            drawLine2() {
                this.names2 = [];
                var Accounted = echarts.init(document.getElementById('Accounted2'));
                if(!Accounted)return;
                Accounted.showLoading();
                this.$axios.get('api/count/pieChart?type=language').then((res) => {
                    let data = res.data.data;

                    for (var key in data) {
                        this.names2.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 基于准备好的dom，初始化echarts实例
                    Accounted.setOption({
                        title: {
                            text: '开发语言占比',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            },
                            lineHeight: 56
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['55%', '43%'],
                            data: this.names2,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                    Accounted.hideLoading();
                }).catch(v => {
                    console.log(v)
                });
            },
            drawLine3() {
                this.names3 = [];
                var Accounted = echarts.init(document.getElementById('Accounted3'));
                if(!Accounted)return;
                Accounted.showLoading();
                this.$axios.get('api/count/pieChart?type=cdn').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        this.names3.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    // 绘制图表
                    Accounted.setOption({
                        title: {
                            text: 'CDN',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{

                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['55%', '40%'],
                            data: this.names3,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                    Accounted.hideLoading();
                }).catch(v => {
                    console.log(v)
                });
            },
            drawLine4() {
                this.names4 = [];
                var Accounted = echarts.init(document.getElementById('Accounted4'));
                if(!Accounted)return;
                Accounted.showLoading();
                this.$axios.get('api/count/pieChart?type=waf').then((res) => {
                    let data = res.data.data;
                    for (var key in data) {
                        this.names4.push({
                            name: key,
                            value: data[key]
                        })
                    };
                    Accounted.setOption({
                        title: {
                            text: 'waf',
                            x: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                color: '#666'
                            }
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '51%'],
                            data: this.names4,
                            grid: {
                                left: '3%',
                                right: '4%',
                                containLabel: true
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                    Accounted.hideLoading();
                }).catch(v => {
                    console.log(v)
                });
            },
            drawBar() {
                var owner = [],
                    event = [],
                    photo = [],
                    script = [],
                    sensitive = [],
                    url = [];
                    var webSiteStatistical = echarts.init(document.getElementById('webSite-statistical'));
                    if(!webSiteStatistical)return;
                    webSiteStatistical.showLoading();
                    this.$axios.get('api/count/barGraph').then((res) => {
                        let data = res.data.data;
                         for(var key in data){
                            owner.push(data[key].owner);
                            event.push(data[key]['劫持事件']);
                            photo.push(data[key]['图片篡改']);
                            script.push(data[key]['恶意脚本']);
                            sensitive.push(data[key]['敏感词']);
                            url.push(data[key]['敏感链接']);
                         };
                        webSiteStatistical.setOption({
                            dataZoom: [
                                {
                                    type: 'slider',
                                    show: true,
                                    yAxisIndex: [0],
                                    left: '3%',
                                    start: 50,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                    yAxisIndex: [0],
                                    start: 29,
                                    end: 36
                                }
                            ],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['图片篡改', '敏感词','网站劫持','敏感链接','恶意脚本'],
                                top:'20px'
                            },
                            grid: {
                                left: '10%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis:  {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: owner
                            },
                            series: [
                                {
                                    name: '图片篡改',
                                    type: 'bar',
                                    stack: '总量',
                                    data: photo
                                },
                                {
                                    name: '敏感词',
                                    type: 'bar',
                                    stack: '总量',
                                    data: sensitive
                                },
                                {
                                    name: '网站劫持',
                                    type: 'bar',
                                    stack: '总量',
                                    data: event
                                },
                                {
                                    name: '敏感链接',
                                    type: 'bar',
                                    stack: '总量',
                                    data:url
                                },
                                {
                                    name: '恶意脚本',
                                    type: 'bar',
                                    stack: '总量',
                                    data:script
                                }
                            ]
                        })
                        webSiteStatistical.hideLoading();
                    }).catch(v => {
                        console.log(v);
                    });
            },
            drawBar1() {
                this.names5 = [];
                    var abnormal = [],
                    normal = [];
                    var webSiteCms = echarts.init(document.getElementById('webSiteCms'));
                    if(!webSiteCms)return;
                    webSiteCms.showLoading();
                this.$axios.get('api/count/cmsHack').then((res) => {
                    let data = res.data.data;
                    for(var key in data){
                        normal.push(data[key].normal);
                        abnormal.push(data[key].abnormal);
                        this.names5.push(key);
                    }
                    webSiteCms.setOption({
                        dataZoom: [{
                                type: 'slider',
                                show: true,
                                yAxisIndex: [0],
                                left: '3%',
                                start: 65,
                                end: 100
                            },
                            {
                                type: 'inside',
                                yAxisIndex: [0],
                                start: 29,
                                end: 36
                            }
                        ],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['正常站点', '异常站点'],
                            top: '20px'
                        },
                        grid: {
                            left: '12%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: this.names5.reverse()
                        },
                        series: [{
                                name: '正常站点',
                                type: 'bar',
                                stack: '总量',
                                data: normal.reverse(),
                                color: ['#2F4554']
                            },
                            {
                                name: '异常站点',
                                type: 'bar',
                                stack: '总量',
                                data: abnormal.reverse(),
                                color: ['#D53A35']
                            }
                        ]
                    });
                    webSiteCms.hideLoading();
                }).catch(v => {
                    console.log(v)
                });

            },
            swiper(n, ev, num) {
                var s = n;
                var obtnList = ev.target.parentElement;
                var aBtn = obtnList.children;
                var toauditBox = document.getElementsByClassName('toaudit-box')[num];
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].className = 'list-item';
                }
                if (num == 0) {
                    aBtn[n - 1].className = 'list-item active';
                    toauditBox.style.left = -(n - 1) * 110 + '%';
                }else if (num == 1) {
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 100 + '%';
                    switch (n) {
                        case 1:
                            if(!this.names1.length){
                                this.drawLine1();
                            }
                            break;
                        case 2:
                            if(!this.names2.length){
                                this.drawLine2();
                            }
                            break;
                        case 3:
                            if(!this.names3.length){
                                this.drawLine3();
                            }
                            break;
                        case 4:
                            if(!this.names4.length){
                                this.drawLine4();
                            }
                            break;
                    }
                }else if(num == 2){
                    if(n == 1){
                            if(!this.names5.length){
                                this.drawBar1();
                            };
                    }
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 100 + '%';
                }
                else if (num == 3) {
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 105 + '%';
                    if(n == 1){
                        if(!this.confirm.length){
                            this.siteMap();
                        }
                    }
                } else {
                    aBtn[n].className = 'list-item active';
                    toauditBox.style.left = -(n) * 100 + '%';
                }
            },
            broken() {
                var city = [],
                    site_count = [],
                    site_hack = [];
                    let broken = echarts.init(document.getElementById('broken'));
                    if(!broken)return;
                this.$axios.get('api/count/siteMap').then((res) => {
                    let data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        city.push(CodeToText[data[i].city]);
                        site_count.push(data[i].site_count);
                        site_hack.push(data[i].site_hack);
                    };
                    broken.hideLoading();
                    broken.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        legend: {
                            data: ['Growth', '正常站点', '异常站点'],
                            itemGap: 5
                        },
                        grid: {
                            top: '12%',
                            left: '1%',
                            right: '10%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: city
                        }],
                        yAxis: [{

                        }],
                        series: [{
                                name: '正常站点',
                                type: 'bar',
                                data: site_count
                            },
                            {
                                name: '异常站点',
                                type: 'bar',
                                data: site_hack
                            }
                        ]
                    });
                }).catch(v => {
                    console.log(v);
                });
                
            },
            siteMap(){
                this.confirm = [];
                var deal = [],time = [];
                this.$axios.get('api/count/lineChart').then((res)=>{
                    let data = res.data.data;
                    for(var key in data.confirm){
                        this.confirm.push(data.confirm[key]);
                        time.push(key);
                    };
                    for(var key in data.deal){
                        deal.push(data.deal[key]);
                    };
                    for(var i=0;i<this.confirm.length;i++){
                        this.chartData.rows.push({'时间':time[i],'确认':this.confirm[i],'处置':deal[i]});
                        this.loading = false;
                    }
                }).catch(v => {
                    console.log(v);
                });
            },
            switchTab(k, ev) {
                this.index = k;
                var s = k;
                var obtnList = ev.target.parentElement;
                var aBtn = obtnList.children;
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].className = 'list-item';
                };
                aBtn[k].className = 'list-item active';
            }
        },
        mounted() {
            this.drawLine();
            this.drawBar();
            var broken = echarts.init(document.getElementById('broken'));
            broken.showLoading();
        },
        created() {
            this.$axios.get('api/count').then((res) => {
                if(res.data.status == 403){
                    window.location.href = '/login';
                    return;
                }
                let data = res.data.data;
                this.toauditData.site_count = data.site_count;
                this.toauditData.monitor_today = data.monitor_today;
                this.toauditData.confirm_today = data.confirm_today;
                this.toauditData.threat_count = data.threat_count;
                this.toauditData.confirm_count = data.confirm_count;
                this.toauditData.deal_wait = data.deal_wait;
                this.toauditData.threat_today = data.threat_today;
                this.toauditData.site_stop = data.site_stop;
                this.toauditData.site_audit = data.site_audit;
                this.broken();
            }).catch(v => {
                    console.log(v)
                });
                
        },
        filters: {
            NumFormat: function (value) {
                // if(!value) return '0.00'
                value = value.toFixed ? value.toFixed(2) : value;
                var intPart = Number(value).toFixed(0) // 获取整数部分
                var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                var floatPart = '.00' // 预定义小数部分
                var value2Array = value.split('.')
                // =2表示数据有小数位
                if (value2Array.length === 2) {
                    floatPart = value2Array[1].toString() // 拿到小数部分
                    if (floatPart.length === 1) { // 补0,实际上用不着
                        return intPartFormat //+ '.' + floatPart
                    } else {
                        return intPartFormat //+ '.' + floatPart
                    }
                } else {
                    return intPartFormat //+ floatPart
                }
            }
        }
    };

        window.onresize = function(){
            if(document.getElementById('Accounted')){
                var Accounted = echarts.init(document.getElementById('Accounted'));
                Accounted.resize();
            }
             if(document.getElementById('Accounted1')){
                 var Accounted1 = echarts.init(document.getElementById('Accounted1'));
                 Accounted1.resize();
            } 
            if(document.getElementById('Accounted2')){
                var Accounted2 = echarts.init(document.getElementById('Accounted2'));
                Accounted2.resize();
            } 
            if(document.getElementById('Accounted3')){
                var Accounted3 = echarts.init(document.getElementById('Accounted3'));
                Accounted3.resize();
            } 
            if(document.getElementById('Accounted4')){
                var Accounted4 = echarts.init(document.getElementById('Accounted4'));
                Accounted4.resize();
            }
            if(document.getElementById('webSite-statistical')){
                var webSiteStatistical = echarts.init(document.getElementById('webSite-statistical'));
                webSiteStatistical.resize();
            }
            if(document.getElementById('webSiteCms')){
                var webSiteCms = echarts.init(document.getElementById('webSiteCms'));
                webSiteCms.resize();
            }
            if(document.getElementById('broken')){
                var broken = echarts.init(document.getElementById('broken'));
                broken.resize();
            }
    };

    window.onload = function(){
        this.onresize();
    }


</script>
<style scoped lang="scss">
    input{
        font-family: 'Microsoft Yahei'!important;
    }
    @font-face {
        font-family: pictos;
        src: url('../../assets/font/QTypePro-SquareLight.otf');
    };

    body{
            overflow: auto;
        }

    ul,
   li {
       list-style: none;
   }

   .clear {
       clear: both;
   }

   .statisticalt {
       margin-top: 15px;
       .list-item:nth-of-type(1) {
           .item-top {
               color: #009688;
           }
           .item-bg {
               background: #008d7f;
           }
       }
       .list-item:nth-of-type(2) {
           .item-top {
               color: #409EFF;
           }
           .itembg-t {
               transform: rotateY(180deg);
           }
           .itembg-b {
               transform: rotate(180deg);
           }
           .item-bg {
               background: #369aff;
           }
       }
       .list-item:nth-of-type(3) {
           .item-top {
               color: #EA3C77;
           }
           .itembg-b {
               transform: rotate(180deg);
           }
           .item-bg {
               background: #dd2667;
           }
       }
       .list-item:nth-of-type(4) {
           .item-top {
               color: #FEA321;
           }
           .item-bg {
               background: #fd9f1a;
           }
       }
       .list-item {
           width: 24%;
           background: #fff;
           float: left;
           margin-right: 16px;
           box-shadow: 2px 2px 5px #ddd;
           border-radius: 6px;
           .item-box {
               .item-bg {
                   position: absolute;
                   width: 23%;
                   height: 100%;
                   left: 23px;
                   top: -25px;
                   border-radius: 5px;
                   .item-bg-box {
                       width: 50%;
                       height: 100%;
                       margin: 0 auto;
                       position: relative;
                   }
               }
               .itembg-t {
                   position: absolute;
                   left: 50%;
                   margin-left: -20px;
                   top: 16px;
               }
               .itembg-b {
                   position: absolute;
                   opacity: 0.1;
                   bottom: 0;
                   left: 50%;
                   margin-left: -20px;
               }
           }
           .item-top {
               font-family: pictos;
               position: relative;
               text-align: center;
               line-height: 90px;
               height: 90px;
               margin: 0 auto;
               span {
                   text-align: center;
                   font-size: 36px;
               }
           }
           .item-bottom {
               text-align: center;
               height: 50px;
               line-height: 50px;
               color: #666;
               font-size: 14px;
               .item-border{
                    width: 88%;
                    margin: 0 auto;
                    border-top: 1px solid #e2e2e2;
               }
           }
       }
   }

   .toaudit {
       width: 36%;
       height: 320px;
       overflow: hidden;
       background: #fff;
       margin-top: 15px;
       float: left;
       box-shadow: 1px 1px 10px #eee;
       border-radius: 6px;
       header{
           border-radius: 6px;
       }
       .header {
           height: 45px !important;
           border-bottom: 1px solid #f6f6f6;
           line-height: 45px !important;
           display: flex;
           justify-content: space-between;
           align-items: center;
           background: #fff;
           font-size: 14px;
           color: #333;
           .header_title {
               display: inline;
           }
           .header_btn {
               float: right;
               .list-item {
                   width: 10px;
                   height: 10px;
                   background: #e3e3e3;
                   border-radius: 50px;
                   float: left;
                   margin-left: 5px;
                   cursor: pointer;
               }
               .list-item.active {
                   background: #999;
               }
           }
       }
       .el-main {
            overflow: inherit;
       }
       .toaudit-box {
           width: 1000%;
           height: 230px;
           position: relative;
           transition: 0.3s linear;
       }
       .toaudit-content {
           float: left;
           width: 10%;
           height: 230px;
           overflow: hidden;
           margin-right: 50px;
           .content-list {
               width: 124%;
               height: 230px;
           }
           .list-item {
               width: 39%;
               height: 100px;
               background: #f8f8f8;
               margin-bottom: 15px;
               text-align: center;
               line-height: 75px;
               border: 1px solid transparent;
               float: left;
               cursor: pointer;
               margin-right: 2%;
               .item-content {
                   .item-count {
                       font-size: 36px;
                       font-family: pictos;
                   }
                   .item-msg {
                       line-height: 0;
                       font-size: 14px;
                       color: #666;
                   }
               }
               .contentpage {
                   .item-count {
                       color: #009688 !important;
                   }
               }
           }
           .list-item:nth-of-type(1) {
               .item-count {
                   color: #ea3c77;
               }
           }
           .list-item:nth-of-type(2) {
               .item-count {
                   color: #FEA321;
               }
           }
           .list-item:nth-of-type(3) {
               .item-count {
                   color: #409EFF;
               }
           }
           .list-item:hover {
               border: 1px solid #409EFF;
               background: #fff;
           }
           .list-item:nth-of-type(4) {
               .item-count {
                   color: #009688;
               }
           }
       }
   }

   .application {
       width: 26%;
       height: 320px;
       background: #fff;
       float: left;
       margin-left: 16px;
       overflow: hidden;
       border-radius: 6px;
       .box {
           width: 1000%;
       }
       .el-main {
           width: 10%;
           height: 300px;
           float: left;
           overflow: inherit;
       }
   }

   .website-statistical {
       width: 35%;
       margin-left: 16px;
       float: left;
       overflow: hidden;
       height: 840px;
       border-radius: 6px;
       .toaudit-content {
           width: 100%;
           height: 840px;
           position: relative
       }
       .toaudit-box {
           height: 100%;
       }
       .el-main {
           width: 10%;
           float: left;
       }
   }

   .distribution {
       width: 61.8%;
       position: absolute;
       top: 540px;
       height: 500px;
       overflow: hidden;
       border-radius: 6px;
       .toaudit-box {
           height: 500px;
           .toaudit-content {
               width: 10.2%;
               height: 500px;
               float: left;
               overflow: hidden;
           }
       }
   }
@media screen and (max-width: 1850px) {
    .statisticalt .list-item {
           width: 24%;
           margin-right: 11px
       }
       .application{
           margin-left:10px;
       }
       .website-statistical{
           margin-left:10px;
       }
       .toaudit{
           margin-top:10px
       }
       .distribution{
           margin-top:10px;
           width: 61.3%;
       }
}
@media screen and (max-width: 1380px) {
       .statisticalt .list-item {
           width: 24%;
           margin-right: 8px
       }
       .el-main {
           padding-left: 0;
       }
       .toaudit .content-list {
           width: 100%;
           height: 220px
       }
       .item-bg {
           display: none;
       }
       .statisticalt {
           width: auto;
           
       }
       .toaudit .toaudit-content .list-item {
               width: 41%;
                margin-left: 20px;
       }
        .website-statistical{
           width: 34.5%;
       }
       .toaudit-content .content-list {
           width: 400px;
       }
       .el-main {
           padding-left: 5px;
       }
       .toaudit .toaudit-content .content-list {
           margin: auto;
           width: auto;
       }
       .website-statistical {
           float: left;
       }
       .application {
           margin-left: 10px;
       }
       .distribution {
           width: 61.2%;
           position: absolute;
           top: 535px;
       }
       .website-statistical {
           margin-left: 10px;
           margin-right: 0;
       }
       .toaudit:first-child .toaudit-content {
           width: 13%
       }
   }

@media screen and (max-width: 1366px) {
    .toaudit .toaudit-content .list-item{
        width: 38%;
    }
}
@media screen and (max-width: 1080px) {
       .toaudit .toaudit-content .list-item{
           width: 38%;
       }
   }

</style>