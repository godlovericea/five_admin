<template>
    <div class="videoBox">
        <div id="playWnd" class="playWnd"></div>
        <!-- <div class="btnGroups">
            <el-button @click="init">初始化</el-button>
            <el-button @click="startPreview">预览</el-button>
            <el-button @click="uninit">反初始化</el-button>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            oWebControl:null,
            pubKey:'',
            videoWidth:1650,
            videoHeight:862,
        }
    },
    props:['videoInfo'],
    mounted(){
        // console.log($)
        this.initPlugin()
    },
    methods:{
        initPlugin () {
            this.oWebControl = new WebControl({
                szPluginContainer: "#playWnd",
                iServicePortStart: 15900,
                iServicePortEnd: 15909,
                cbConnectSuccess:  ()=> {
                    this.oWebControl.JS_StartService("window", {
                        dllPath: "./VideoPluginConnect.dll"
                        //dllPath: "./DllForTest-Win32.dll"
                    }).then( () =>{
                        this.oWebControl.JS_CreateWnd("playWnd", this.videoWidth, this.videoHeight).then( () =>{
                            console.log("JS_CreateWnd success");
                            this.uninit()
                            setTimeout(()=>{
                                this.init()
                            },1000)
                            setTimeout(()=>{
                                this.startPreview()
                            },2000)
                        });
                    },  ()=> {
                    
                    });
                },
                cbConnectError:  () => {
                    console.log("cbConnectError");
                    this.oWebControl = null;
                    alert("插件未启动，正在尝试启动，请稍候...");
                    WebControl.JS_WakeUp("VideoWebPlugin://");
                    initCount ++;
                    if (initCount < 3) {
                        setTimeout( () =>{
                            initPlugin();
                        }, 3000)
                    } else {
                        $("#playWnd").html("插件启动失败，请检查插件是否安装！");
                    }
                },
                cbConnectClose:  ()=> {
                    console.log("cbConnectClose");
                    this.oWebControl = null;
                }
            });
        },
        getPubKey (callback) {
            this.oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then( (oData)=> {
                console.log(oData)
                if (oData.responseMsg.data) {
                   this.pubKey = oData.responseMsg.data
                    callback()
                }
            })
        },
        setEncrypt (value) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.pubKey);
            return encrypt.encrypt(value);
        },
        getPubKeyCallBack() {
            this.oWebControl.JS_RequestInterface({
                funcName: "init",
                argument: JSON.stringify({
                    appkey:'26394872',
                    secret: 'fDMq9rgvvi2xUSjOQ5C5',
                    ip: '221.230.21.105',
                    // appkey:this.videoInfo.appkey,
                    // secret: this.videoInfo.secret,
                    // ip: this.videoInfo.ip,
                    playMode: 0, // 预览
                    // port: 8090,
                    port: 10201,
                    snapDir: 'D:/SnapDir',
					videoDir: 'D:/SnapDir',
                    layout: "1x1",
					enableHTTPS: 1,
                    encryptedFields: ['secret']
                })
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        },
        init(){
            // if(this.videoInfo.appkey === '' || this.videoInfo.cameraIndexCode === ''){
            //     this.videoInfo.appkey='25497268'
            //     this.videoInfo.secret='cVByj72aN4tmccgmyqA8'
            //     this.videoInfo.ip='221.226.70.66'
            //     this.videoInfo.port=8090
            //     this.videoInfo.cameraIndexCode='db104c786b9f498f800c420dca2f983a'
            // }
            this.getPubKey(this.getPubKeyCallBack)
            this.oWebControl.JS_RequestInterface({
                funcName: "init",
                argument: JSON.stringify({
                    appkey:'26394872',
                    secret: 'fDMq9rgvvi2xUSjOQ5C5',
                    ip: '221.230.21.105',
                    // appkey:this.videoInfo.appkey,
                    // secret: this.videoInfo.secret,
                    // ip: this.videoInfo.ip,
                    playMode: 0, // 预览
                    // port: 8090,
                    port: 10201,
                    // port: this.videoInfo.port,
                    snapDir: 'D:/SnapDir',
					videoDir: 'D:/SnapDir',
                    layout: "1x1",
					enableHTTPS: 1,
                    encryptedFields: ['secret']
                })
            })
        },
        startPreview(){
            this.oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    // cameraIndexCode : '3c854060405f42bba959611ea6184c70',//6号球机
                    // cameraIndexCode : 'f66bd864c4f343ea9cb93c3cc460785f',//5号球机
                    cameraIndexCode : 'd6731fb670144edab60e4115ac1ef4d4',//3号球机
                    // cameraIndexCode : 'b248757eea7245c4bb7012a8185b3c6e',//4号球机
                    streamMode: 0,
                    transMode: 1,
                    gpuMode: 0,
                    wndId: -1
                })
            })
        },
        uninit(){
            this.oWebControl.JS_RequestInterface({
                funcName: "uninit"
            }).then(function (oData) {
                // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            });
        }
    }
}
</script>

<style lang="less" scoped>
.videoBox{
    width: 100%;
    // height: 100%;
    background-color: white;
    position: relative;
    // margin-top: 20px;
    .playWnd{
        margin: 0 auto;
        // width: 2200px;
        // height: 1000px;
        width: 1650px;
        height: 750px;
        border: 1px solid #999;
    }
}
</style>
