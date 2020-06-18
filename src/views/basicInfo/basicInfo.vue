<template>
  <div class="warnWrapper">
    <div class="divider"></div>
    <div class="formBox">
      <el-form :model="form" ref="ruleForm" class="demo-form-inline" label-width="120px">
        <el-form-item label="公司全称">
          <el-input
            size="small"
            v-model="form.comName"
            placeholder="请输入公司名称"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司简称">
          <el-input
            size="small"
            v-model="form.litcomname"
            placeholder="请输入公司简称"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业资质">
          <el-radio-group v-model="form.econkind" @change="changeRadio">
            <el-radio :label="1">规模以上企业</el-radio>
            <el-radio :label="2">高新技术企业</el-radio>
            <el-radio :label="3">瞪羚企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="资质证书图片"
          v-if="form.econkind === 2 || form.econkind === 3"
        >
          <el-upload
            class="upload-demo"
            list-type="picture-card"
            action="http://120.55.161.93:6012/qiniu/upload"
            name="file"
            :file-list="fileList"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :limit="1"
          >
            <div
              style="height:148px;display:flex;align-items:center;justify-content:center"
            >
              <i class="el-icon-plus"></i>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <p>可上传1张图片，图片大小不超过4m（支持格式为：png、jpeg）。</p>
          <p>如果企业资质发生变化，请删除之前图片，重新上传最新资质图片</p>
        </el-form-item>
        <el-form-item label="所属行业">
          <el-cascader
            v-model="industryList"
            :props="props"
            :options="options"
            collapse-tags
            @change="handleChange"
            style="width:400px"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="所属市区" prop="city">
          <el-select v-model="form.city" style="width:400px">
            <el-option label="南京市" value="1"></el-option>
            <el-option label="无锡市" value="2"></el-option>
            <el-option label="徐州市" value="3"></el-option>
            <el-option label="常州市" value="4"></el-option>
            <el-option label="苏州市" value="5"></el-option>
            <el-option label="南通市" value="6"></el-option>
            <el-option label="连云港市" value="7"></el-option>
            <el-option label="淮安市" value="8"></el-option>
            <el-option label="盐城市" value="9"></el-option>
            <el-option label="扬州市" value="10"></el-option>
            <el-option label="镇江市" value="11"></el-option>
            <el-option label="泰州市" value="12"></el-option>
            <el-option label="宿迁市" value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-upload
            class="upload-demo"
            list-type="picture-card"
            action="http://120.55.161.93:6012/qiniu/upload"
            name="file"
            :file-list="fileListLicense"
            :before-upload="beforeLicenseAvatarUpload"
            :on-success="handleLicenseAvatarSuccess"
            :on-remove="handleLiceseRemove"
            :on-preview="handleLicensePreview"
            :limit="1"
          >
            <div
              style="height:148px;display:flex;align-items:center;justify-content:center"
            >
              <i class="el-icon-plus"></i>
            </div>
          </el-upload>
          <el-dialog :visible.sync="licenseVisible">
            <img width="100%" :src="licenseImageUrl" alt="" />
          </el-dialog>
          <p>可上传1张图片，图片大小不超过4m（支持格式为：png、jpeg）。</p>
        </el-form-item>
        <el-form-item label="法人">
          <el-input
            size="small"
            v-model="form.opername"
            placeholder="请输入法人"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册资金">
          <el-input
            size="small"
            v-model="form.registcapi"
            placeholder="请输入注册资金（万元）"
            style="width:400px"
            onkeyup="value=value.replace(/[^\0-9\.]/g,'')"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input
            size="small"
            v-model="form.address"
            placeholder="请输入地址"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-date-picker
            v-model="form.startdate"
            type="date"
            placeholder="选择日期"
            style="width:400px"
            :picker-options="picOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input
            size="small"
            v-model="form.info"
            type="textarea"
            :rows="4"
            maxlength="500"
            placeholder="请输入公司简介，不超过500字"
            style="width:600px"
            autocomplete="off"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="官网地址">
          <el-input
            size="small"
            v-model="form.websiteAddress"
            placeholder="请输入公司官网地址"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否上市">
          <el-radio-group v-model="form.isonline">
            <el-radio :label="1">已上市</el-radio>
            <el-radio :label="0">未上市</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上市交易所" v-if="form.isonline === 1">
          <el-radio-group v-model="form.exchange">
            <el-radio :label="1">上海</el-radio>
            <el-radio :label="2">深圳</el-radio>
            <el-radio :label="3">香港</el-radio>
            <el-radio :label="4">纽约</el-radio>
            <el-radio :label="5">伦敦</el-radio>
            <el-radio :label="6">其他</el-radio>
          </el-radio-group>
          <el-input
            v-if="form.exchange === 6"
            v-model="form.exchangeValue"
            placeholder="请输入上市交易所"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="股票代码" v-if="form.isonline === 1">
          <el-input
            size="small"
            v-model="form.stockCode"
            placeholder="请输入股票代码"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工人数">
          <el-input
            size="small"
            v-model="form.staffnum"
            oninput="value=value.replace(/[^\d.]/g,'')"
            placeholder="请输入员工人数"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="2019年营业收入">
          <el-input
            size="small"
            v-model="form.lastincome"
            placeholder="请输入2019年营业收入，单位：万元"
            style="width:400px"
            onkeyup="value=value.replace(/[^\0-9\.]/g,'')"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="2019年5G相关业务收入">
          <el-input
            size="small"
            v-model="form.oldincome"
            placeholder="请输入2019年5G相关业务收入，单位：万元"
            style="width:400px"
            onkeyup="value=value.replace(/[^\0-9\.]/g,'')"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业联系人姓名">
          <el-input
            size="small"
            v-model="form.concatperson"
            placeholder="请输入企业联系人姓名"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input
            size="small"
            v-model="form.phone"
            placeholder="请输入联系人电话"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人邮件">
          <el-input
            size="small"
            v-model="form.email"
            placeholder="请输入联系人邮件"
            style="width:400px"
            autocomplete="off"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input
            type="textarea"
            v-model="form.rejected"
            placeholder="请输入审核意见"
            :rows="6"
            disabled
            style="width:400px"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div v-if="!adminFlag">
            <el-button
              v-if="companyBaseInfoId === 0"
              size="small"
              type="primary"
              round
              style="width:100px"
              @click="addPostData"
              >提交</el-button
            >
            <el-button
              v-else
              size="small"
              type="primary"
              style="width:100px"
              round
              @click="updatePostData"
              >修改</el-button
            >
          </div>
          <div v-if="adminFlag">
            <el-button
              size="small"
              type="success"
              round
              style="width:100px"
              @click="overSure"
              >通过</el-button
            >
            <el-button
              size="small"
              type="danger"
              round
              style="width:100px"
              @click="openReject"
              >驳回</el-button
            >
            <el-button
              size="small"
              type="primary"
              round
              style="width:100px"
              @click="backToList"
              >返回列表</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="驳回理由"
      :visible.sync="rejectDialog"
      width="400px"
      center
      :close-on-click-modal="false"
      custom-class="dialogClass"
    >
      <el-input
        type="textarea"
        :rows="6"
        v-model="remarks"
        placeholder="请输入驳回理由"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="primary" @click="sureReject">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBaseInfo,
  getBaseInfo,
  updateBaseInfo,
  checkCompanyBaseInfo
} from "@/api/collect";
export default {
  data() {
    return {
      form: {},
      industryList: [],
      options: [
        {
          value: 1,
          label: "上游产业链",
          children: [
            {
              value: 11,
              label: "芯片",
              children: [
                {
                  value: 111,
                  label: "光芯片"
                },
                {
                  value: 112,
                  label: "射频芯片"
                },
                {
                  value: 113,
                  label: "基带芯片"
                },
                {
                  value: 114,
                  label: "其他芯片"
                }
              ]
            },
            {
              value: 12,
              label: "射频器件及模块",
              children: [
                {
                  value: 121,
                  label: "射频模块"
                },
                {
                  value: 122,
                  label: "滤波器"
                },
                {
                  value: 123,
                  label: "功率放大器"
                },
                {
                  value: 124,
                  label: "射频开关"
                },
                {
                  value: 125,
                  label: "PCB"
                }
              ]
            },
            {
              value: 13,
              label: "光器件及模块",
              children: [
                {
                  value: 131,
                  label: "光模块"
                },
                {
                  value: 132,
                  label: "有源光器件"
                },
                {
                  value: 133,
                  label: "无源光器件"
                },
                {
                  value: 134,
                  label: "波分复用器"
                }
              ]
            },
            {
              value: 14,
              label: "传播介质",
              children: [
                {
                  value: 141,
                  label: "光纤光缆光棒"
                },
                {
                  value: 142,
                  label: "射频电缆(含连接器)"
                }
              ]
            },
            {
              value: 15,
              label: "天线",
              children: [
                {
                  value: 151,
                  label: "基站天线"
                },
                {
                  value: 152,
                  label: "小天线"
                }
              ]
            }
          ]
        },
        {
          value: 2,
          label: "中游产业链",
          children: [
            {
              value: 21,
              label: "传播设备",
              children: [
                {
                  value: 211,
                  label: "宏基站"
                },
                {
                  value: 212,
                  label: "微基站"
                }
              ]
            },
            {
              value: 22,
              label: "网络设备",
              children: [
                {
                  value: 221,
                  label: "交换机"
                },
                {
                  value: 222,
                  label: "路由器"
                },
                {
                  value: 223,
                  label: "服务器"
                }
              ]
            },
            {
              value: 23,
              label: "网络规划服务",
              children: [
                {
                  value: 231,
                  label: "规划设计"
                },
                {
                  value: 232,
                  label: "SDN/NFV"
                },
                {
                  value: 233,
                  label: "网络优化和维护"
                }
              ]
            }
          ]
        },
        {
          value: 3,
          label: "下游产业链",
          children: [
            {
              value: 31,
              label: "终端设备",
              children: [
                {
                  value: 311,
                  label: "手机终端"
                },
                {
                  value: 312,
                  label: "智能终端"
                },
                {
                  value: 313,
                  label: "工业设备"
                },
                {
                  value: 314,
                  label: "智能穿戴设备"
                }
              ]
            },
            {
              value: 32,
              label: "应用服务",
              children: [
                {
                  value: 321,
                  label: "工业互联网"
                },
                {
                  value: 322,
                  label: "车联网"
                },
                {
                  value: 323,
                  label: "智慧城市"
                },
                {
                  value: 324,
                  label: "智慧医疗"
                },
                {
                  value: 325,
                  label: "智慧教育"
                },
                {
                  value: 326,
                  label: "高清视频"
                },
                {
                  value: 327,
                  label: "VR/AR"
                }
              ]
            }
          ]
        }
      ],
      props: {
        multiple: true
      },
      businessLicense: "",
      econkindImg: "",
      fileList: [],
      fileListLicense: [],
      editImgList: [],
      adminFlag: false,
      picOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      comType: 1,
      companyBaseInfoId: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      licenseVisible: false,
      licenseImageUrl: "",
      adminFlag: false,
      rejectDialog: false,
      remarks: "",
      removeFlag: false,
      licenseRemoveFlag: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let isAdmin = JSON.parse(sessionStorage.getItem("user")).isAdmin;
      this.adminFlag = isAdmin === 1 ? true : false;
      let companyId = 0;
      if (this.$route.query.id) {
        companyId = this.$route.query.id;
      } else {
        companyId = JSON.parse(sessionStorage.getItem("user")).companyId;
      }
      let myData = {
        companyId: companyId
      };
      getBaseInfo(myData).then(res => {
        if (res.code === 200) {
          this.fileList = [];
          this.fileListLicense = [];
          this.form = res.result;
          this.companyBaseInfoId = this.form.companyBaseInfoId;
          this.industryList = this.form.industryList;
          if (this.form.businessLicense) {
            this.fileListLicense.push({
              name: "license",
              url: this.form.businessLicense
            });
          }
          if (this.form.econkindImg) {
            this.fileList.push({
              name: "eckind",
              url: this.form.econkindImg
            });
          }
        } else {
          this.companyBaseInfoId = null;
        }
      });
    },
    addPostData() {
      let companyId = JSON.parse(sessionStorage.getItem("user")).companyId;
      let myData = {
        address: this.form.address,
        businessLicense: this.businessLicense,
        city: this.form.city,
        comName: this.form.comName,
        companyId: companyId,
        econkindImg: this.econkindImg,
        concatperson: this.form.concatperson,
        econkind: this.form.econkind,
        email: this.form.email,
        websiteAddress: this.form.websiteAddress,
        exchangeValue: this.form.exchangeValue,
        exchange: this.form.exchange,
        industryList: this.industryList,
        info: this.form.info,
        isonline: this.form.isonline,
        lastincome: this.form.lastincome,
        litcomname: this.form.litcomname,
        oldincome: this.form.oldincome,
        opername: this.form.opername,
        phone: this.form.phone,
        registcapi: this.form.registcapi,
        shortinfo: this.form.shortinfo,
        staffnum: parseInt(this.form.staffnum),
        startdate: this.form.startdate,
        stockCode: this.form.stockCode,
        upcoroper: this.form.upcoroper
      };
      addBaseInfo(myData).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getInfo();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    updatePostData() {
      let companyId = JSON.parse(sessionStorage.getItem("user")).companyId;
      let myData = {
        companyBaseInfoId: this.companyBaseInfoId,
        address: this.form.address,
        businessLicense: this.businessLicense,
        city: this.form.city,
        comName: this.form.comName,
        companyId: companyId,
        econkindImg: this.econkindImg,
        concatperson: this.form.concatperson,
        econkind: this.form.econkind,
        email: this.form.email,
        websiteAddress: this.form.websiteAddress,
        exchangeValue: this.form.exchangeValue,
        exchange: this.form.exchange,
        industryList: this.industryList,
        info: this.form.info,
        isonline: this.form.isonline,
        lastincome: this.form.lastincome,
        litcomname: this.form.litcomname,
        oldincome: this.form.oldincome,
        opername: this.form.opername,
        phone: this.form.phone,
        registcapi: this.form.registcapi,
        shortinfo: this.form.shortinfo,
        staffnum: parseInt(this.form.staffnum),
        startdate: this.form.startdate,
        stockCode: this.form.stockCode,
        upcoroper: this.form.upcoroper
      };
      updateBaseInfo(myData).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getInfo();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleChange(value) {
      // console.log(value);
    },
    handleRemove(file, fileList) {},
    handleLiceseRemove(file, list) {
      this.licenseRemoveFlag = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.econkindImg = res[0];
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
        return false;
      }
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
        return false;
      }
      return isLt2M && (!isJPG || !isPNG || !isJPEG);
    },
    beforeLicenseAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
        return false;
      }
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
        return false;
      }
      return isLt2M && (!isJPG || !isPNG || !isJPEG);
    },
    handleLicenseAvatarSuccess(res, file, fileList) {
      // console.log(res)
      this.businessLicense = res[0];
    },
    handleLicensePreview(file) {
      this.licenseImageUrl = file.url;
      this.licenseVisible = true;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeRadio(cal) {
      if (cal === 1) {
        this.fileList = [];
      }
    },
    backToList() {
      this.$router.push({
        path: "/admin/com"
      });
    },
    overSure() {
      this.$confirm("此操作将审核通过该公司, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const myData = {
          companyBaseInfoId: this.companyBaseInfoId,
          state: "N"
        };
        checkCompanyBaseInfo(myData).then(res => {
          this.getInfo();
        });
      });
    },
    openReject() {
      this.rejectDialog = true;
    },
    sureReject() {
      const myData = {
        companyBaseInfoId: this.companyBaseInfoId,
        state: "F",
        rejected: this.remarks
      };
      checkCompanyBaseInfo(myData).then(res => {
        this.rejectDialog = false;
        this.remarks = "";
        this.getInfo();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.warnWrapper {
  width: 100%;
  padding: 20px;
}
</style>
