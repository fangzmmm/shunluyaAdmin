<template>
    <section class="chart-container">
        <el-row>
           
            <el-col :span="12">
                
                 <el-card class="box-card" shadow="hover">
                    <div id="chartColumn" style="width:100%; height:400px;"></div>
                </el-card>
            </el-col>
            
            <el-col :span="12">
                <el-card class="box-card" shadow="hover">
                <div id="chartBar" style="width:100%; height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { getMsgCount,getHotAddress} from '../../api/api';
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                msgCount:0,
                hotAddress:[],
                startHot:[],
                endHost:[]
            }
        },

        methods: {
            drawColumnChart() {
                let count = this.msgCount;
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title: {
                        text: '所有有效订单数',
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: '订单',
                            type: 'gauge',
                            detail: {formatter:'{value}单'},
                            axisLine : {
	                       	show : true,
	                       	lineStyle : { 					// 属性lineStyle控制线条样式
	                           color :[[ 0.25, "#F24764" ],
	                              	[ 0.5, "#FBCE14" ],		
	                              	[ 0.75, "#11C3C2" ],		
	                              	[ 1,"#2FC35B" ]	],
	                           width : 20//表盘宽度
	                     	}
                  		},
                            data: [{'value':count}]
                        }
                    ]
                });
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    title: {
                        text: '地点热度',
                        subtext: '每一个小时刷新'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['起点', '终点']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: this.hotAddress
                    },
                    series: [
                        {
                            name: '起点',
                            type: 'bar',
                            itemStyle : {
                                normal : {
                                    color : '#FFD16E'
                                }
					        },
                            data: this.startHot
                        },
                        {
                            name: '终点',
                            type: 'bar',
                            itemStyle : {
                                normal : {
                                    color : '#7AA2EA'
                                }
					        },
                            data: this.endHost
                        }
                    ]
                });
            },
            drawCharts() {
                getMsgCount().then(res=>{
                    this.msgCount = res.data.msgCount;
                    this.drawColumnChart()
                });
                getHotAddress().then(res=>{
                    let startAddress = [],endAddress=[];
                    startAddress = res.data.start;
                    endAddress  = res.data.end;
                    startAddress.filter((addres)=>{                   
                        this.hotAddress.push(addres.address);
                    })
                    startAddress.filter((addres)=>{
                        this.startHot.push(addres.hot);
                    })
                    endAddress.filter((addres)=>{
                        this.endHost.push(addres.hot);
                    })
                    this.drawBarChart()
                });
            },

        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
