<template>
    <div id="map">
        <div class="headerBox">
            <img src="@/assets/images/logo.png" alt="" class="logopng"/>
            <p class="title">江苏省5G产业生态在线系统</p>
        </div>
        <div class="switchBox">
            <span class="switchTitle"></span>
            <!-- <el-switch
                v-model="switchMap"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="setMapTheme"
            ></el-switch> -->
        </div>
        <div class="bottomBox">
            <div
                v-for="item in navBarList"
                :key="item.id"
                :class="[isClick === item.id ? 'activeitemsNav' : 'itemsNav']"
                @click="getPrivinceData(item.id)"
            >
                <i :class="item.icon"></i>
                <p class="name">{{ item.name }}</p>
            </div>
            <div class="bottomNmaeBox">
                <el-button
                    size="small"
                    @click="goLogin"
                    v-if="!comName"
                    type="primary"
                    round
                    >登录</el-button
                >
                <span class="bottomNmae" v-if="comName">{{ comName }}</span>
                <el-button v-if="comName" type="text" @click="goAdmin"
                    >后台管理</el-button
                >
                <el-button v-if="comName" type="text" @click="logOut"
                    >退出</el-button
                >
            </div>
        </div>
        <div class="leftBox">
            <div class="leftItemsBox" v-show="collapseFlag">
                <div class="leftheaderBox">
                    <p class="headerTitle" style="position: relative;">企业数量</p>
                    <el-tooltip class="item" effect="dark" content="折叠" placement="left">
                        <img src="@/assets/collapse.png" alt="" class="collapseImg" @click="collapseBar" style="position: absolute;
    right: 0;
    height: 20px;
    top: 20px;
    cursor: pointer;">
                    </el-tooltip>
                </div>
                <div class="etitle">总数:{{ amount }}家</div>
                <div id="outputValue" :style="{height:echartHeight}"></div>
            </div>
            <div class="leftItemsBox" v-show="collapseFlag">
                <div class="leftheaderBox">
                    <p class="headerTitle" style="position: relative;">产业规模</p>
                    <el-tooltip class="item" effect="dark" content="折叠" placement="left">
                        <img src="@/assets/collapse.png" alt="" class="collapseImg" @click="collapseBar" style="position: absolute;
    right: 0;
    height: 20px;
    top: 20px;
    cursor: pointer;">
                    </el-tooltip>
                </div>
                <div class="etitle">总产值：{{ totalValue }}亿元</div>
                <div id="modelll" :style="{height:echartHeight}"></div>
            </div>
            <div v-show="!collapseFlag">
                <div class="leftheaderBox" @click="collapseBar">
                    <p class="headerTitle">展开</p>
                </div>
                <!-- <el-button type="primary" icon="el-icon-search" style="width:100%" @click="collapseBar">展开</el-button> -->
            </div>
        </div>
        <div class="rightBox">
            <!-- <el-input v-model="search" placeholder="请输入企业名称">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getScenList"
                ></el-button>
            </el-input> -->
            <el-autocomplete
                class="inline-input"
                v-model="search"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="true"
                @select="handleSelect">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getScenList"
                ></el-button>
            </el-autocomplete>
            <div style="height:20px"></div>
            <div class="leftheaderBox">
                <p class="headerTitle">产业链分布</p>
            </div>
            <div class="content">
                <div class="btnGroups">
                    <el-radio-group
                        v-model="activeName"
                        @change="changeActiveName"
                    >
                        <el-radio-button label="产品"></el-radio-button>
                        <el-radio-button label="项目"></el-radio-button>
                        <el-radio-button label="需求"></el-radio-button>
                    </el-radio-group>
                    <div v-if="activeName === '产品'" class="listBox" :style="{maxHeight:listBoxHeight}">
                        <div
                            class="cardBox"
                            v-for="(item, index) in productList"
                            :key="index"
                        >
                            <div class="cardContent">
                                <p class="cardTitle">{{ item.productName }}</p>
                                <p class="comDetail">{{item.comName}}</p>
                                <p class="cardDetail">
                                    {{ item.productIntroduce }}
                                </p>
                                <el-button
                                    type="text"
                                    style="color:'#ffffff';text-align: right;"
                                    @click="showProductDetail(item)"
                                    >查看更多>></el-button
                                >
                            </div>
                        </div>
                    </div>
                    <div v-if="activeName === '项目'" class="listBox" :style="{maxHeight:listBoxHeight}">
                        <div
                            class="cardBox"
                            v-for="(item, index) in projectList"
                            :key="index"
                        >
                            <div v-if="!adminFlag">
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 0"
                                >
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardDetail">
                                        {{ item.projectIntroduce }}
                                    </p>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showProjectDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 1"
                                >
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardDetail">
                                        加密：{{ item.encryptionCode }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="adminFlag">
                                <div class="cardContent">
                                    <p class="cardTitle">
                                        {{ item.projectName }}
                                    </p>
                                    <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardDetail">
                                        {{ item.projectIntroduce }}
                                    </p>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showProjectDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeName === '需求'" class="listBox" :style="{maxHeight:listBoxHeight}">
                        <div
                            class="cardBox"
                            v-for="(item, index) in needList"
                            :key="index"
                        >
                            <div v-if="!adminFlag">
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 0"
                                >
                                <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                    <!-- <p class="cardDetail">{{item.demandInfo}}</p> -->
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showNeedDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                                <div
                                    class="cardContent"
                                    v-if="item.isEncryption === 1"
                                >
                                 <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                   
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <p class="cardDetail">
                                        加密：{{ item.encryptionCode }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="adminFlag">
                                <div class="cardContent">
                                    <p class="cardTitle">
                                        {{ item.demandName }}
                                    </p>
                                    <p class="comDetail">{{item.comName}}</p>
                                    <p class="cardDetail">
                                        {{ item.demandInfo }}
                                    </p>
                                    
                                    <span v-if="item.type === 1"
                                        >主营产品需求</span
                                    >
                                    <span v-if="item.type === 2"
                                        >在研项目需求</span
                                    >
                                    <span v-if="item.type === 3"
                                        >其他合作需求</span
                                    >
                                    <div class="needTagBox">
                                        <span
                                            v-for="(el,
                                            index) in item.demandClass"
                                            :key="index"
                                        >
                                            <span v-if="el === 1"
                                                >资金支持</span
                                            >
                                            <span v-if="el === 2"
                                                >技术支撑</span
                                            >
                                            <span v-if="el === 3"
                                                >市场推广</span
                                            >
                                        </span>
                                    </div>
                                    <el-button
                                        type="text"
                                        style="color:'#ffffff';text-align: right;"
                                        @click="showNeedDetail(item)"
                                        >查看更多>></el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sceanDetailDialog" v-if="sceanFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ sceanData.title }}</p>
                <i class="el-icon-close" @click="closeDialog"></i>
            </div>
            <p class="stepsTitle">{{sceanData.comName}}</p>
            <div class="divider"></div>
            <div class="sceanBox">
                <p class="stepsTitle">① 描述:</p>
                <div class="stepsContent">
                    <p class="stepsDetail">{{ sceanData.info }}</p>
                </div>
                <div v-if="proFlag">
                    <p class="stepsTitle">② 图片介绍:</p>
                    <div class="stepsContent">
                        <el-image
                            style="width: 200px; height: 120px"
                            :src="url"
                            :preview-src-list="srcList"
                        >
                        </el-image>
                    </div>
                    <p class="stepsTitle">③ 视频介绍:</p>
                    <div class="stepsContent" v-if="videoUrl">
                        <video class="myVideo" :src="videoUrl" controls></video>
                    </div>
                    <div class="stepsContent" v-if="!videoUrl">
                        <p style="color:#ffffff">该企业暂未上传视频</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="sceanDetailDialog" v-if="enterpriseFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ parkName }}</p>
                <i class="el-icon-close" @click="closeEnterpriseDialog"></i>
            </div>
            <div class="divider"></div>
            <div class="enterpriseBox">
                <el-tabs
                    v-model="activeIndex"
                    :tab-position="tabPosition"
                    style="height: 200px;"
                    :stretch="false"
                    @tab-click="handleTabClick"
                >
                    <el-tab-pane
                        v-for="(item, index) in enterpriseList"
                        :key="index"
                        :label="item.comName"
                    >
                        <div class="enterpriseDetail">
                            <div class="detailBox">
                                <p>法人：{{ item.opername }}</p>
                                <p>注册资金：{{ item.registcapi }}</p>
                                <p>地址：{{ item.address }}</p>
                                <p>成立日期：{{ item.startdate }}</p>
                                <p>简介：{{ item.info }}</p>
                                <p>企业性质：
                                    <span v-if="item.nature == 1">国有企业</span>
                                    <span v-if="item.nature == 2">民营企业</span>
                                    <span v-if="item.nature == 3">外资企业</span>
                                    <span v-if="item.nature == 4">中外合资企业</span>
                                    <span v-if="item.nature == 5">未填写</span>
                                </p>
                                <p>
                                    官方网站：<a
                                        target="_blank"
                                        style="color:#fff"
                                        :href="item.websiteAddress"
                                        >{{ item.websiteAddress }}</a
                                    >
                                </p>
                                <p>员工数：{{ item.staffnum }}</p>
                                <p>2019营收：{{ item.lastincome }}万元</p>
                                <p>5G相关营收：{{ item.oldincome }}万元</p>
                                <p>股票代码：{{ item.stockCode }}</p>
                                <p>员工数：{{ item.staffnum }}</p>
                                <p>联系人：{{ item.concatperson }}</p>
                                <p>电话：{{ item.phone }}</p>
                                <p>邮箱：{{ item.email }}</p>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="sceanDetailDialog" v-if="searchFlag">
            <div class="sceanDialogHeader">
                <p class="dialogTitle">{{ searchEnterprise }}</p>
                <i class="el-icon-close" @click="closeEnterpriseDialog"></i>
            </div>
            <div class="divider"></div>
            <div class="enterpriseBox">
                <el-tabs :tab-position="tabPosition" :stretch="false">
                    <el-tab-pane :label="enterpriseName">
                        <div class="enterpriseDetail">
                            <div class="detailBox">
                                <!-- <p>法人：{{enterprise.legalPerson}}</p> -->
                                <p>法人：{{ enterprise.opername }}</p>
                                <p>注册资金：{{ enterprise.registcapi }}</p>
                                <p>地址：{{ enterprise.product }}</p>
                                <p>简介：{{ enterprise.info }}</p>
                                <p>
                                    官方网站：<a
                                        :href="enterprise.websiteAddress"
                                        >{{ enterprise.websiteAddress }}</a
                                    >
                                </p>
                                <p>员工数：{{ enterprise.staffnum }}</p>
                                <p>2019营收：{{ enterprise.lastincome }}</p>
                                <p>2018营收：{{ enterprise.oldincome }}</p>
                                <p>股票代码：{{ enterprise.stockCode }}</p>
                                <p>员工数：{{ enterprise.staffnum }}</p>
                            </div>
                        </div>
                        <div class="tagBox">
                            <el-tag
                                effect="dark"
                                type="warning"
                                closable
                                v-for="(item, index) in elementsList"
                                :key="index"
                                >{{ item }}</el-tag
                            >
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
        >
            <div>
                为优化体验效果，请点击下载<a
                    target="_blank"
                    href="https://www.google.cn/chrome/"
                    >chrome浏览器</a
                >
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="centerDialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <el-dialog
            title="查看图片"
            :visible.sync="imgDialogVisible"
            width="50%"
            center
        >
            <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
            >
            </el-image>
            <el-carousel :interval="4000">
                <el-carousel-item
                    v-for="(item, index) in companySceneImgDTOList"
                    :key="index"
                >
                    <img class="realImg" :src="item.scenarioImg" alt="" />
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
// 万里
import mapboxgl from "mapbox-gl"
import echarts from "echarts"
import axios from "axios"
// import enterpriseAll from "../fiveData/enterpriseAll.json"
// import enterprise from "../fiveData/enterprise.json"
import jiangsusheng from "@/assets/cityJson/江苏省.json"
import {
    listBaseInfoByStream,
    listProductByStream,
    getCompanyProject,
    getProduct,
    getScale,
    getCompanyProjectDemand,
    getCompanyProductDemand,
    getCompanyOtherDemand,
} from "@/api/home"

export default {
    data() {
        return {
            centerDialogVisible: false,
            map: "", //地图实例
            switchMap: false,
            navBarList: [
                {
                    id: 1,
                    name: "上游产业链",
                    icon: "iconfont icon-wangluo",
                },
                {
                    id: 2,
                    name: "中游产业链",
                    icon: "iconfont icon-xinpian",
                },
                {
                    id: 3,
                    name: "下游产业链",
                    icon: "iconfont icon-modular",
                },
                {
                    id: 4,
                    name: "全部",
                    icon: "iconfont icon-quanbu",
                },
            ], // 底部导航栏菜单
            isClick: 4, // 默认选择全部
            search: "", //搜索框输入内容
            scean: 1, //场景,
            sceanList: [],
            sceanFlag: false,
            sceanData: {},
            enterpriseFlag: false,
            tabPosition: "left",
            markers: {},
            markersOnScreen: {},
            colors: ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"],
            marker: "",
            enterpriseList: [],
            parkName: "",
            activeIndex: 0,
            radar: "",
            radarFlag: false,
            elementsList: ["算法", "芯片", "终端", "系统", "平台"],
            searchReault: {
                type: "FeatureCollection",
                crs: {
                    type: "name",
                    properties: {
                        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
                    },
                },
                features: [],
            },
            cityList: [
                {
                    id: 1,
                    city: "南京市",
                    coordinates: [118.796539, 32.058441],
                },
                {
                    id: 2,
                    city: "无锡市",
                    coordinates: [120.312332, 31.491756],
                },
                {
                    id: 3,
                    city: "徐州市",
                    coordinates: [117.284042, 34.206741],
                },
                {
                    id: 4,
                    city: "常州市",
                    coordinates: [119.59794, 31.72322],
                },
                {
                    id: 5,
                    city: "苏州市",
                    coordinates: [120.585297, 31.29904],
                },
                {
                    id: 6,
                    city: "南通市",
                    coordinates: [120.894287, 31.98078],
                },
                {
                    id: 7,
                    city: "连云港市",
                    coordinates: [119.1773, 34.84065],
                },
                {
                    id: 8,
                    city: "淮安市",
                    coordinates: [119.021263, 33.597507],
                },
                {
                    id: 9,
                    city: "盐城市",
                    coordinates: [120.50102, 33.20107],
                },
                {
                    id: 10,
                    city: "扬州市",
                    coordinates: [119.43157, 32.39463],
                },
                {
                    id: 11,
                    city: "镇江市",
                    coordinates: [119.43396, 32.13188],
                },
                {
                    id: 12,
                    city: "泰州市",
                    coordinates: [119.922981, 32.45615],
                },
                {
                    id: 13,
                    city: "宿迁市",
                    coordinates: [118.241703, 33.964418],
                },
            ],
            searchFlag: false,
            searchEnterprise: "",
            enterprise: {},
            officeList: [],
            totalValue: null,
            amount: 0,
            activeName: "产品",
            CompanyProducts: [],
            Employees: [],
            detail: {},
            Industry: {},
            Partners: [],
            ScopeIn: "",
            knowledge: 0,
            legalPerson: "",
            ContactInfo: {},
            companySceneImgDTOList: [],
            videoUrl: "",
            imgTitle: "",
            imgDialogVisible: false,
            url: "",
            srcList: [],
            newSceanListArr: [],
            productList: [],
            projectList: [],
            needList: [],
            marker: "",
            markersList: [],
            signmarker: "",
            dataValue: {},
            loginFlag: false,
            adminFlag: false,
            comName: "",
            activeTab: 1,
            newActiveTab: 0,
            oldActiveTab: 0,
            popup: "",
            proFlag: false,
            listBoxHeight: '600px',
            echartHeight: '300px',
            restaurants: [],
            collapseFlag: true
        }
    },
    mounted() {
        this.handleRestaurants()
        this.handleHeight()
        this.checkBrowserVersion()
        this.initMap()
        // this.getEchartsData()
        this.checkLogin()
        this.getScenList()
    },
    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
            this.search = item.value
            this.getScenList()
        },
        handleRestaurants () {

        },
        checkBrowserVersion() {
            var browser = navigator.appName
            var b_version = navigator.appVersion
            var version = parseFloat(b_version)
            if (browser === "Netscape" && version < 5) {
                // alert("请下载最新版浏览器")
                window.location.href = "https://www.google.cn/chrome/"
                return false
            }
            // var Sys = {};
            // var ua = navigator.userAgent.toLowerCase();
            // var s;
            // (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            // (s = ua.match(/firefox/([\d.]+)/)) ? Sys.firefox = s[1] :
            // (s = ua.match(/chrome/([\d.]+)/)) ? Sys.chrome = s[1] :
            // (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            // (s = ua.match(/version/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
            // /以下进行测试/
            // if (Sys.ie) {
            //     this.centerDialogVisible = true
            // };
            // if (Sys.firefox) {
            //     this.centerDialogVisible = false
            // };
            // if (Sys.chrome) {
            //     this.centerDialogVisible = false
            // };
            // if (Sys.opera) {
            //     this.centerDialogVisible = false
            // };
            // if (Sys.safari) {
            //     this.centerDialogVisible = false
            // };
            // if (Sys.ie == 9.0 || Sys.ie == 8.0 || Sys.ie == 7.0 || Sys.ie == 7.0){
            //     window.location.href="https://www.google.cn/chrome/"
            // }
            // var Sys = {};
            // var ua = navigator.userAgent.toLowerCase();
            // var s;
            // (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            // (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            // (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            // (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            // (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
            // /*以下进行测试*/
            // if (Sys.ie) this.centerDialogVisible = true;
            // if (Sys.firefox) this.centerDialogVisible = false;
            // if (Sys.chrome) this.centerDialogVisible = false;
            // if (Sys.opera) this.centerDialogVisible = false;
            // if (Sys.safari) this.centerDialogVisible = false;

            // if (Sys.ie == 9.0 || Sys.ie == 8.0 || Sys.ie == 7.0 || Sys.ie == 6.0){
            //     window.location.href="https://www.google.cn/chrome/"
            // }
        },
        checkLogin() {
            if (!sessionStorage.getItem("user")) {
                this.adminFlag = false
            } else {
                this.adminFlag =
                    JSON.parse(sessionStorage.getItem("user")).isAdmin === 1
                        ? true
                        : false
                this.comName = JSON.parse(
                    sessionStorage.getItem("user")
                ).comName
            }
        },
        handleHeight () {
            var oHeight = document.documentElement.clientHeight
            // console.log(oHeight)
            this.listBoxHeight = (oHeight * 0.51) + 'px'
            this.echartHeight = (oHeight * 0.27) + 'px'
        },
        initMap() {
            mapboxgl.accessToken =
                "pk.eyJ1Ijoibnl5anl5YW5mYXBlbmciLCJhIjoiY2p3ajU4eXI2MGdxcDQ4cGI4cHI2bHhjcSJ9.m4FzyOH_5Yo3YVnroLxk-w"
            this.map = new mapboxgl.Map({
                container: "map",
                // style: "http://106.15.47.224:8688/styles/newblue/style.json",
                style: "http://47.101.52.252:8080/styles/newblue/style.json",
                center: [119.8526, 32.910144],
                zoom: 7.5,
                pitch: 60,
                bearing: -0.03,
            })
            // this.map.getSource('earthquakes').setData(enterpriseAll)
            this.map.on("mouseenter", "earthquake_label", (e) => {
                // console.log(e);
                let poptitle = e.features[0].properties.city
                this.popup = new mapboxgl.Popup({
                    closeButton: false,
                })
                    .setLngLat(e.lngLat)
                    .setText(poptitle)
                    .addTo(this.map)
            })
            this.map.on("mouseleave", "earthquake_label", (e) => {
                this.popup.remove()
            })
            this.map.on("styledata", () => {
                this.getPrivinceData(4)
                this.getQixiaDistribute()
                this.getEchartsData()
            })
        },
        getEchartsData() {
            getScale().then((res) => {
                this.dataValue = res.result
                this.getEnterpriseMode()
                this.getOutputValue()
                this.totalValue =
                    Math.floor((this.dataValue.downstreamValueSum +
                        this.dataValue.midstreamValueSum +
                        this.dataValue.upstreamValueSum)/10000)
                this.amount =
                    this.dataValue.downstreamCount +
                    this.dataValue.midstreamCount +
                    this.dataValue.upstreamCount
            })
        },
        getPrivinceData(id) {
            this.isClick = id
            let myData = {
                type: id,
            }
            //   console.log(myData);
            listBaseInfoByStream(myData).then((res) => {
                if (res.code === 200) {
                    this.searchReault.features = res.result
                    // console.log(res.result)
                    this.restaurants = []
                    res.result.forEach(el => {
                        el.properties.comList.forEach(eel => {
                            this.restaurants.push({
                                value: eel.comName,
                                address: eel.city
                            })
                        })
                    })
                    // console.log(this.restaurants)
                    var mag1 = ["<", ["get", "mag"], 5]
                    var mag2 = [
                        "all",
                        [">=", ["get", "mag"], 10],
                        ["<", ["get", "mag"], 20],
                    ]
                    var mag3 = [
                        "all",
                        [">=", ["get", "mag"], 20],
                        ["<", ["get", "mag"], 30],
                    ]
                    var mag4 = [
                        "all",
                        [">=", ["get", "mag"], 30],
                        ["<", ["get", "mag"], 40],
                    ]
                    var mag5 = [">=", ["get", "mag"], 40]

                    if (!this.map.getSource("earthquakes")) {
                        this.map.addSource("earthquakes", {
                            type: "geojson",
                            data: this.searchReault,
                            cluster: false,
                            clusterRadius: 80,
                            clusterProperties: {
                                // keep separate counts for each magnitude category in a cluster
                                mag1: ["+", ["case", mag1, 1, 0]],
                                mag2: ["+", ["case", mag2, 1, 0]],
                                mag3: ["+", ["case", mag3, 1, 0]],
                                mag4: ["+", ["case", mag4, 1, 0]],
                                mag5: ["+", ["case", mag5, 1, 0]],
                            },
                        })
                    } else {
                        this.map
                            .getSource("earthquakes")
                            .setData(this.searchReault)
                    }

                    if (!this.map.getLayer("earthquake_circle")) {
                        this.map.addLayer({
                            id: "earthquake_circle",
                            type: "circle",
                            source: "earthquakes",
                            filter: ["!=", "cluster", true],
                            paint: {
                                "circle-color": [
                                    "case",
                                    mag1,
                                    this.colors[0],
                                    mag2,
                                    this.colors[1],
                                    mag3,
                                    this.colors[2],
                                    mag4,
                                    this.colors[3],
                                    this.colors[4],
                                ],
                                "circle-opacity": 0.6,
                                "circle-radius": 20,
                            },
                        })
                    }

                    if (!this.map.getLayer("earthquake_label")) {
                        this.map.addLayer({
                            id: "earthquake_label",
                            type: "symbol",
                            source: "earthquakes",
                            cluster: false,
                            // "filter": ["!=", "cluster", true],

                            layout: {
                                "text-field": [
                                    "number-format",
                                    ["get", "mag"],
                                    {
                                        "min-fraction-digits": 0,
                                        "max-fraction-digits": 1,
                                    },
                                ],
                                "text-font": [
                                    "Open Sans Semibold",
                                    "Arial Unicode MS Bold",
                                ],
                                "text-size": 18,
                                "text-allow-overlap": true,
                            },
                            paint: {
                                // "text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"]
                                "text-color": "white",
                            },
                        })
                        this.map.on(
                            "click",
                            "earthquake_label",
                            this.handleMarkerClick
                        )
                    }
                    this.getScenList()
                }
            })
        },
        // 获取柱状图
        getEnterpriseMode() {
            let myChart = echarts.init(document.getElementById("modelll"))
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                    formatter:'{b}:{c}亿'
                },
                grid: {
                    top: "15%",
                    right: "3%",
                    left: "20%",
                    bottom: "15%",
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["上游", "中游", "下游"],
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.12)",
                            },
                        },
                        axisLabel: {
                            margin: 10,
                            color: "#e2e9ff",
                            textStyle: {
                                fontSize: 14,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "产值（亿元）",
                        nameTextStyle: {
                            color: "#fff",
                        },
                        splitNumber: 5,
                        axisLabel: {
                            formatter: "{value}",
                            color: "#e2e9ff",
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.12)",
                            },
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        barWidth: "20px",
                        data: [
                            {
                                name: "上游产业链",
                                value: 200,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(242,241,110,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(242,241,110,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(242,241,110,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                            {
                                name: "中游产业链",
                                value: 50,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color:
                                                        "rgba(242,183,101,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(242,183,101,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(242,183,101,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                            {
                                name: "下游产业链",
                                value: 260,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(0,219,177,1)", // 0% 处的颜色
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        "rgba(0,219,177,0.2)", // 100% 处的颜色
                                                },
                                            ],
                                            false
                                        ),
                                        barBorderRadius: [30, 30, 30, 30],
                                        shadowColor: "rgba(0,219,177,1)",
                                        shadowBlur: 4,
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
            option.series[0].data[0].value = (this.dataValue.upstreamValueSum/10000).toFixed(2)
            option.series[0].data[1].value = (this.dataValue.midstreamValueSum/10000).toFixed(2)
            option.series[0].data[2].value = (this.dataValue.downstreamValueSum/10000).toFixed(2)
            myChart.setOption(option)
            window.addEventListener("resize", () => {
                myChart.resize()
            })
        },
        // 获取产值饼图
        getOutputValue() {
            let myChart = echarts.init(document.getElementById("outputValue"))

            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    // x: 'right',
                    right: 30,
                    top: 10,
                    data: ["上游", "中游", "下游"],
                    textStyle: {
                        color: "#ffffff",
                    },
                },
                series: [
                    {
                        name: "数量",
                        type: "pie",
                        center: ["40%", "50%"],
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        data: [
                            {
                                value: 348,
                                name: "上游",
                                itemStyle: {
                                    color: "#F2F16E",
                                },
                            },
                            {
                                value: 135,
                                name: "中游",
                                itemStyle: {
                                    color: "#CC496D",
                                },
                            },
                            {
                                value: 348,
                                name: "下游",
                                itemStyle: {
                                    color: "#1679D4",
                                },
                            },
                        ],
                    },
                ],
            }
            option.series[0].data[0].value = this.dataValue.upstreamCount
            option.series[0].data[1].value = this.dataValue.midstreamCount
            option.series[0].data[2].value = this.dataValue.downstreamCount
            myChart.setOption(option)
            window.addEventListener("resize", () => {
                myChart.resize()
            })
        },
        getSearchResult() {
            if (!this.search) {
                this.map.getSource("earthquakes").setData(parkList)
            }
            // this.enterpriseFlag = true
            parkList.features.forEach((el) => {
                el.properties.test.forEach((l) => {
                    if (l.enterpriseName.indexOf(this.search)) {
                        this.searchReault.features[0].properties.test.push(l)
                        this.searchReault.features[0].geometry.coordinates =
                            el.geometry.coordinates
                    }
                })
            })
            this.map.getSource("earthquakes").setData(this.searchReault)
            // this.searchEnterprise = this.searchReault.features[0].properties.test[0].enterpriseName
            // console.log(this.searchReault.features[0].properties)
        },
        // 点击场景设置图层数据
        clusterMapDis(name) {
            // this.map.getSource('earthquakes').setData(smartGov)
            this.newSceanListArr.forEach((l) => {
                if (l.properties.id === name) {
                    this.map.flyTo({
                        center: l.geometry.coordinates,
                        zoom: 15,
                    })
                }
            })

            // this.handleAnimateCircle()
        },
        closeDialog() {
            this.sceanFlag = false
            this.sceanData = {}
        },
        closeEnterpriseDialog() {
            this.enterpriseFlag = false
            this.search = ""
            this.activeIndex = 0
            this.getScenList()
        },
        getSomeOneRadarEnterprise() {
            let myChart = echarts.init(document.getElementById(this.radar))
            let option = {
                // title: {
                //     text: '南邮研究院',
                //     textStyle:{
                //         color:'#ffffff'
                //     }
                // },
                tooltip: {},
                // legend: {
                //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                // },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: "#fff",
                            // backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5],
                        },
                    },
                    indicator: [
                        { name: "算法", max: 6500 },
                        { name: "芯片", max: 16000 },
                        { name: "模块", max: 30000 },
                        { name: "终端", max: 38000 },
                        { name: "系统", max: 52000 },
                        { name: "网络", max: 25000 },
                        { name: "平台", max: 25000 },
                    ],
                    splitArea: {
                        areaStyle: {
                            color: ["#114474"],
                            shadowColor: "rgba(0, 0, 0, 0.3)",
                            shadowBlur: 10,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(114, 131, 150, 1)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(114, 131, 150, 1)",
                        },
                    },
                },
                series: [
                    {
                        name: "预算 vs 开销（Budget vs spending）",
                        type: "radar",
                        areaStyle: {
                            normal: {
                                color: "#1087F6", // 图表中各个图区域的颜色
                                areaStyle: {
                                    type: "default",
                                    opacity: 0.8, // 图表中各个图区域的透明度
                                    color: "#ff0000", // 图表中各个图区域的颜色
                                },
                            },
                        },
                        data: [
                            {
                                value: [
                                    4300,
                                    10000,
                                    28000,
                                    35000,
                                    50000,
                                    19000,
                                    5200,
                                ],
                                name: "预算分配（Allocated Budget）",
                                itemStyle: {
                                    normal: {
                                        color: "#1087F6", // 图表中各个图区域的颜色
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
            myChart.setOption(option)
            window.addEventListener("resize", () => {
                myChart.resize()
            })
        },
        getAllDistribute() {
            var mag1 = ["<", ["get", "mag"], 5]
            var mag2 = [
                "all",
                [">=", ["get", "mag"], 10],
                ["<", ["get", "mag"], 20],
            ]
            var mag3 = [
                "all",
                [">=", ["get", "mag"], 20],
                ["<", ["get", "mag"], 30],
            ]
            var mag4 = [
                "all",
                [">=", ["get", "mag"], 30],
                ["<", ["get", "mag"], 40],
            ]
            var mag5 = [">=", ["get", "mag"], 40]

            if (!this.map.getSource("earthquakes")) {
                this.map.addSource("earthquakes", {
                    type: "geojson",
                    data: enterpriseAll,
                    cluster: false,
                    clusterRadius: 80,
                    clusterProperties: {
                        // keep separate counts for each magnitude category in a cluster
                        mag1: ["+", ["case", mag1, 1, 0]],
                        mag2: ["+", ["case", mag2, 1, 0]],
                        mag3: ["+", ["case", mag3, 1, 0]],
                        mag4: ["+", ["case", mag4, 1, 0]],
                        mag5: ["+", ["case", mag5, 1, 0]],
                    },
                })
            }

            if (!this.map.getLayer("earthquake_circle")) {
                this.map.addLayer({
                    id: "earthquake_circle",
                    type: "circle",
                    source: "earthquakes",
                    filter: ["!=", "cluster", true],
                    paint: {
                        "circle-color": [
                            "case",
                            mag1,
                            this.colors[0],
                            mag2,
                            this.colors[1],
                            mag3,
                            this.colors[2],
                            mag4,
                            this.colors[3],
                            this.colors[4],
                        ],
                        "circle-opacity": 0.6,
                        "circle-radius": 20,
                    },
                })
            }

            if (!this.map.getLayer("earthquake_label")) {
                this.map.addLayer({
                    id: "earthquake_label",
                    type: "symbol",
                    source: "earthquakes",
                    cluster: false,
                    // "filter": ["!=", "cluster", true],

                    layout: {
                        "text-field": [
                            "number-format",
                            ["get", "mag"],
                            {
                                "min-fraction-digits": 0,
                                "max-fraction-digits": 1,
                            },
                        ],
                        "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                        ],
                        "text-size": 18,
                        "text-allow-overlap": true,
                    },
                    paint: {
                        // "text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"]
                        "text-color": "white",
                    },
                })
            }
            // console.log("data没有进来了")
            this.map.on("data", (e) => {
                // console.log("data进来了")
                // console.log(e)
                if (e.sourceId !== "earthquakes" || !e.isSourceLoaded) {
                    return
                }
                this.map.on("click", "earthquake_label", this.handleMarkerClick)
            })
        },
        handleMarkerClick(e) {
            //   console.log(e);

            this.enterpriseFlag = true

            const features = this.map.queryRenderedFeatures(e.point, {
                layers: ["earthquake_label"],
            })
            // console.log(features)
            this.parkName = features[0].properties.city
            if (features.length > 0) {
                const enterList = JSON.parse(features[0].properties.comList)
                // console.log(enterList)
                // this.enterpriseList = JSON.parse(features[0].properties.test)
                this.enterpriseList = enterList
                this.search = this.enterpriseList[0].comName
                this.getScenList()
            }
        },
        handleTabClick(tab, event) {
            // console.log(tab.label)
            this.search = tab.label
            this.getScenList()
        },
        getQixiaDistribute() {
            const dottedLine = jiangsusheng
            // console.log("123")
            if (!this.map.getSource("dottedlines_label")) {
                this.map.addSource("dottedlines_label", jiangsusheng)
                // this.map.addSource('dottedlines_label_nj',nanjingDis);
            } else {
                return false
            }

            // console.log("456")
            // if (!this.map.getLayer('qixiaDis')){
            this.map.addLayer({
                id: "qixiaDis",
                type: "fill",
                source: "dottedlines_label",
                paint: {
                    "fill-color": "#ffffff",
                    "fill-opacity": 0.05,
                },
            })
            this.map.addLayer({
                id: "qixiaDisline",
                type: "line",
                source: "dottedlines_label",
                paint: {
                    "line-dasharray": [3, 2],
                    "line-width": 1.5,
                    "line-opacity": 1,
                    "line-color": "#ffffff",
                },
            })
            // this.map.addLayer({
            //     'id': 'njDis',
            //     'type': 'fill',
            //     'source':'dottedlines_label_nj',
            //     'paint': {
            //         "fill-color":"#ffffff",
            //         "fill-opacity":0.05,
            //     }
            // });
            // this.map.addLayer({
            //     'id': 'njDisline',
            //     'type': 'line',
            //     'source':'dottedlines_label_nj',
            //     'paint': {
            //         'line-dasharray':[3,2],
            //         'line-width': 1.5,
            //         "line-opacity":1,
            //         'line-color': '#ffffff'
            //     }
            // });
            // }
        },
        selectScean(params) {
            this.scean = params
        },
        handleAnimateCircle() {
            var size = 200
            var pulsingDot = {
                width: size,
                height: size,
                data: new Uint8Array(size * size * 4),

                onAdd: () => {
                    var canvas = document.createElement("canvas")
                    canvas.width = this.width
                    canvas.height = this.height
                    this.context = canvas.getContext("2d")
                },

                render: () => {
                    var duration = 1000
                    var t = (performance.now() % duration) / duration

                    var radius = (size / 2) * 0.3
                    var outerRadius = (size / 2) * 0.7 * t + radius
                    var context = this.context

                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height)
                    context.beginPath()
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    )
                    context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")"
                    context.fill()

                    // draw inner circle
                    context.beginPath()
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    )
                    context.fillStyle = "rgba(255, 100, 100, 1)"
                    context.strokeStyle = "white"
                    context.lineWidth = 2 + 4 * (1 - t)
                    context.fill()
                    context.stroke()

                    // update this image's data with data from the canvas
                    this.data = context.getImageData(
                        0,
                        0,
                        this.width,
                        this.height
                    ).data

                    // keep the map repainting
                    this.map.triggerRepaint()

                    // return `true` to let the map know that the image was updated
                    return true
                },
            }

            this.map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 })

            this.map.addLayer({
                id: "points",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        118.8972030341,
                                        32.1540342558,
                                    ],
                                },
                            },
                        ],
                    },
                },
                layout: {
                    "icon-image": "pulsing-dot",
                },
            })
        },
        setMapTheme() {
            if (this.switchMap) {
                this.map.setStyle(
                    "mapbox://styles/mapbox/satellite-streets-v11"
                )
            } else {
                this.map.setStyle(
                    "http://106.15.47.224:8688/styles/newblue/style.json"
                )
            }
        },
        getScenList() {
            let productType = 0
            if (this.activeName === "产品") {
                productType = 1
            } else if (this.activeName === "项目") {
                productType = 2
            } else {
                productType = 3
            }
            let myData = {
                companyName: this.search,
                productName: "",
                productType: productType,
                type: this.isClick,
            }
            listProductByStream(myData).then((res) => {
                // console.log(res)
                this.productList = res.result.companyProductDTOList
                this.projectList = res.result.companyProjectDTOList
                this.needList = res.result.companyDemandDTOList
            })
        },
        showProductDetail(params) {
            this.proFlag = true
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {
                companyProductId: params.companyProductId,
            }
            getProduct(myData).then((res) => {
                console.log(res)
                if (res && res.code === 200){
                    this.sceanData = res.result
                    this.sceanData.title = res.result.productName
                    this.sceanData.info = res.result.productIntroduce
                    this.videoUrl = res.result.productVideo
                    this.srcList = []
                    if (res.result.imgList.length > 0) {
                        res.result.imgList.forEach((l) => {
                            this.srcList.push(l.imgUrl)
                        })
                        this.url = this.srcList[0]
                    } else {
                        this.srcList = []
                        this.url = ""
                    }
                }else{
                    console.log(res)
                }
            })
        },
        showProjectDetail(params) {
            this.proFlag = false
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {
                companyProjectId: params.companyProjectId,
            }
            getCompanyProject(myData).then((res) => {
                if(res && res.code === 200) {
                    this.sceanData = res.result
                    this.sceanData.title = res.result.projectName
                    this.sceanData.info = res.result.projectIntroduce
                    this.srcList = []
                    if (
                        res.result.imgList &&
                        res.result.imgList.length > 0
                    ) {
                        res.result.imgList.forEach((l) => {
                            this.srcList.push(l.imgUrl)
                        })
                        this.url = this.srcList[0]
                    }
                }
            })
        },
        showNeedDetail(params) {
            this.proFlag = false
            if (!sessionStorage.getItem("user")) {
                this.$router.push({
                    path: '/login'
                })
            }
            this.enterpriseFlag = false
            // console.log(params)
            this.sceanFlag = true
            let myData = {}
            if (params.type === 1) {
                myData = {
                    companyProductDemandId: params.demandId,
                }
                getCompanyProductDemand(myData).then((res) => {
                    this.sceanData = res.result
                    this.sceanData.title = res.result.companyProductName
                    this.sceanData.info = res.result.demandInfo
                })
            } else if (params.type === 2) {
                myData = {
                    companyProjectDemandId: params.demandId
                }
                getCompanyProjectDemand(myData).then((res) => {
                    this.sceanData = res.result
                    this.sceanData.title = res.result.companyProjectName
                    this.sceanData.info = res.result.demandInfo
                })
            } else {
                myData = {
                    companyOtherDemandId: params.demandId
                }
                getCompanyOtherDemand(myData).then((res) => {
                    this.sceanData = res.result
                    this.sceanData.title = res.result.companyOtherName
                    this.sceanData.info = res.result.demandInfo
                })
            }
        },
        showImgBox() {
            // this.imgTitle =
            this.imgDialogVisible = true
        },
        goLogin() {
            this.$router.push({
                path: "/login",
            })
        },
        changeActiveName(val) {
            this.getScenList()
        },
        logOut() {
            this.comName = null
            sessionStorage.clear()
            this.$router.go(0)
        },
        goAdmin () {
            if (this.adminFlag) {
                this.$router.push({
                    path:'/admin/com'
                })
            } else {
                this.$router.push({
                    path:'/home/basicInfo'
                })
            }
        },
        collapseBar () {
            this.collapseFlag = !this.collapseFlag
        }
    },
}
</script>

<style scoped lang="css">
#map {
    width: 100%;
    height: 100%;
    position: relative;
}
.headerBox {
    position: absolute;
    left: 20px;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.logopng{
    height: 60px;
}
.switchBox {
    position: absolute;
    right: 20px;
    top: 50px;
    z-index: 2;
    color: #ffffff;
    margin-right: 10px;
    display: flex;
    align-items: center;
}
.switchTitle {
    font-size: 18px;
    margin-right: 10px;
}
.title {
    color: #ffffff;
    font-size: 24px;
    margin-left: 10px;
}
.bottomBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
}
.bottomNmae {
    color: #ffffff;
}
.bottomNmaeBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.itemsNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    cursor: pointer;
}
.itemsNav i {
    color: #ffffff;
    font-size: 30px;
    margin-bottom: 10px;
}
.itemsNav .name {
    color: #ffffff;
    font-size: 20px;
    margin: 10px 0 0 0;
}
.activeitemsNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    cursor: pointer;
}
.activeitemsNav i {
    color: #f9ce5f;
    font-size: 30px;
    margin-bottom: 10px;
}
.activeitemsNav .name {
    color: #f9ce5f;
    font-size: 20px;
    margin: 10px 0 0 0;
}
.listBox{
    /* max-height: 572px; */
    overflow-y: auto;
    width: 100%;
}
#outputValue{
    /* height: 300px; */
    width: 100%;
    background-color: #101B26;
}
#modelll{
    /* height: 300px; */
    width: 90%;
    background-color: #101B26;
    margin: 0 auto;
}
</style>
