<template>
	<section>
		<!--工具条-->
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="日期：" prop="date" style="margin-bottom:20px;">
				<el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :picker-options="pickerOptions0"></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段：" prop="time" style="margin-bottom:20px;">
				<el-select v-model="ruleForm.time" placeholder="请选择时间段" style="width:220px;">
					<el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="图片：" prop="adimg" class="beginAdImg" style="margin-bottom:20px;">
				<el-upload class="avatar-uploader" action="//up.qbox.me/" :show-file-list="false" :data="uploadform" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.adimg" :src="ruleForm.adimg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
        <el-input v-model="ruleForm.adimg"  style="position:absolute;top:0;left:230px;width:400px;" placeholder="填写图片地址"></el-input>
				<p style="position:absolute;top:50px;left:250px;">建议上传图片大小为200*300(w*h)，且图片大小上限为2M</p>
			</el-form-item>
			<!-- <el-form-item label="跳转链接：" prop="pass"> -->
			<el-form-item label="跳转链接：" style="margin-bottom:20px;">
				<el-input v-model="ruleForm.link" placeholder="填写跳转链接" auto-complete="off" @blur="initLinkStr()" style="width:500px;"></el-input>
        <span>如果输入的话一定要带上http://或者https://</span>
			</el-form-item>
			<el-form-item style="margin-bottom:20px;">
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
    <p v-if="adArr0.length > 0">今日投放</p>
		<el-tooltip v-for="(item,index) in adArr0" :key="index" placement="right" effect="light">
			<div slot="content"><img :src="item.adimg" alt=""></div>
			<!-- <el-button>Top center</el-button> -->
			<div class="tooltip _today" :class="{err: item.error}">
				<span class="startDate">日期：{{item.date}}</span>
				<span class="time" v-if="item.time==='1'">时间：0:00 - 8:00</span>
				<span class="time" v-else-if="item.time==='2'">时间：8:00 - 16:00</span>
				<span class="time" v-else-if="item.time==='3'">时间：16:00 - 24:00</span>
				<span style="margin-left:15px;">
					跳转地址：<a :href="item.link" target="_blank">{{item.link}}</a>
				</span>
				<el-button type="text" style="margin-left:20px;color:#fa5555;" @click="deleteAd(item._id)">删除</el-button>
			</div>
		</el-tooltip>
    <p v-if="adArr1.length > 0">还未投放</p>
		<el-tooltip v-for="(item,index) in adArr1" :key="index" placement="right" effect="light">
			<div slot="content"><img :src="item.adimg" alt=""></div>
			<!-- <el-button>Top center</el-button> -->
			<div class="tooltip" :class="{err: item.error}">
				<span class="startDate">日期：{{item.date}}</span>
				<span class="time" v-if="item.time==='1'">时间：0:00 - 8:00</span>
				<span class="time" v-else-if="item.time==='2'">时间：8:00 - 16:00</span>
				<span class="time" v-else-if="item.time==='3'">时间：16:00 - 24:00</span>
				<span style="margin-left:15px;">
					跳转地址：<a :href="item.link" target="_blank">{{item.link}}</a>
				</span>
				<el-button type="text" style="margin-left:20px;color:#fa5555;" @click="deleteAd(item._id)">删除</el-button>
			</div>
		</el-tooltip>
    <p v-if="adArr2.length > 0">已经投放</p>
    <el-tooltip v-for="(item,index) in adArr2" :key="index" placement="right" effect="light">
			<div slot="content"><img :src="item.adimg" alt=""></div>
			<!-- <el-button>Top center</el-button> -->
			<div class="tooltip pass">
				<span class="startDate">日期：{{item.date}}</span>
				<span class="time" v-if="item.time==='1'">时间：0:00 - 8:00</span>
				<span class="time" v-else-if="item.time==='2'">时间：8:00 - 16:00</span>
				<span class="time" v-else-if="item.time==='3'">时间：16:00 - 24:00</span>
				<span style="margin-left:15px;">
					跳转地址：<a :href="item.link" target="_blank">{{item.link}}</a>
				</span>
				<!-- <el-button type="text" style="margin-left:20px;color:#fa5555;">删除</el-button> -->
			</div>
		</el-tooltip>

	</section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < (Date.now()-8.64e7);
        }
      },
      ruleForm: {
				date: '',
				time: '',
        adimg: '',
        link: '#'
      },
      uploadform: {
        token: ""
      },
      timeOption: [
        {
          label: "0:00 - 8:00",
          value: "1"
        },
        {
          label: "8:00 - 16:00",
          value: "2"
        },
        {
          label: "16:00 - 24:00",
          value: "3"
        }
      ],
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change'}],
        time: [{ required: true, message: '请选择时间段', trigger: 'change'}],
        adimg: [{ required: true, message: '请上传图片或填写图片地址'}]
      },
      adArr0: [],
      adArr1: [],
      adArr2: []
    };
  },
  methods: {
    
    handleAvatarSuccess(response, file, fileList) {
      this.ruleForm.adimg = `${this.host.imgBaseUrl}${response.key}`;
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;
      let _this = this;

      if (!isLt2M) {
        _this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        let params = {
          fileName: file.name
        };

        return axios
          .get(_this.host.baseUrl + "/uploadimg", { params })
          .then(res => {
            if (res.data.code === "1") {
              _this.uploadform = {
                key: res.data.result.fileName,
                token: res.data.result.uploadToken
              };
            } else {
              _this.$message.error("上传图片失败");
            }
          })
          .catch(() => {
            _this.$message.error("上传图片失败");
          });
      }

      return isLt2M;
    },
    getBeginAds(){
      let _this = this;
      let url = _this.host.baseUrl + "/beginadsetting";

      function getSucc(res){
        let arr0 = [];
        let arr1 = [];
        let arr2 = [];

        function compare(type){
          return function(a,b){
            let value1 = a.date;
            let value2 = b.date;
            if(value1 === value2){
              // 如果日期相同
              if(type === 1){
                return a.time - b.time;
              }else if(type === 2){
                return b.time - a.time;
              }
            }else{
              // 按照日期排序
              if(type === 1){
                return new Date(value1) - new Date(value2)
              }else if(type === 2){
                return new Date(value2) - new Date(value1)
              }
            }   
          }
        }

        Date.prototype.Format = function (fmt) { //author: meizz 
            let o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        let standardTime = new Date(res.date).Format("yyyy-MM-dd")

        res.data.forEach(function(item,index){
          item.error = false;
          if(standardTime === new Date(item.date).Format("yyyy-MM-dd")){
            arr0.push(item)
          }else if(standardTime < new Date(item.date).Format("yyyy-MM-dd")){
            // 已经投放的广告
            arr1.push(item)
          }else{
            // 还未投放的广告
            arr2.push(item)
          }
        })
        // 排序
        arr0.sort(compare(1))
        arr1.sort(compare(1))
        arr2.sort(compare(2))
        // 赋值
        _this.adArr0 = arr0;
        _this.adArr1 = arr1;
        _this.adArr2 = arr2;

      }
      function getError(error){
        console.log(error)
      }

      _this.ajax.http("get", url, {}, getSucc, getError);
    },
    initLinkStr(){
      if(this.ruleForm.link === ''){
        this.ruleForm.link = '#';
      }else{
        if(!(this.ruleForm.link.indexOf('http') >= 0)){
          // 填写的链接地址不正确
          if(this.ruleForm.link !== "#"){
            this.$message({
              message: '请填写正确的链接地址',
              type: 'error',
              // duration:10000000
            });
          }
          
        }
      }
    },
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let hasSameAd = false;

          _this.adArr0.forEach((item,index) => {
            item.error = false;
            if(item.date === _this.ruleForm.date && item.time === _this.ruleForm.time){
              hasSameAd = true;
              item.error = true;
            }
          });

          _this.adArr1.forEach((item,index) => {
            item.error = false;
            if(item.date === _this.ruleForm.date && item.time === _this.ruleForm.time){
              hasSameAd = true;
              item.error = true;
            }
          });

          if(hasSameAd){
            let timeSrt = ''
            if(_this.ruleForm.time === '1'){
              timeSrt = '0:00 - 8:00'
            }else if(_this.ruleForm.time === '2'){
              timeSrt = '8:00 - 16:00'
            }else if(_this.ruleForm.time === '3'){
              timeSrt = '16:00 - 24:00'
            }

            _this.$message({
              message: _this.ruleForm.date + '&nbsp&nbsp&nbsp&nbsp' + timeSrt + '&nbsp&nbsp&nbsp&nbsp已经有投放的广告了，请重新填写',
              dangerouslyUseHTMLString: true,
              type: 'error'
              // duration:10000000
            });

          }else{
            // if(_this.ruleForm.link === ""){
            //   _this.ruleForm.link = "#"
            // }
            if(_this.ruleForm.link !== "#"){
              if(!(_this.ruleForm.link.indexOf('http') >= 0)){
                // 填写的链接地址不正确
                _this.$message({
                  message: '请填写正确的链接地址',
                  type: 'error',
                  // duration:10000000
                });

                return 
              }
            }
            
            // console.log(_this.ruleForm)
            let url = _this.host.baseUrl + "/beginadsetting";
            function setSucc(res){
              console.log(res);
              // _this.ruleForm = {
              //   date: '',
              //   time: '',
              //   adimg: '',
              //   link: '#'
              // }
              _this.getBeginAds();
            }
            function setError(error){
              console.log(error)
            }

            _this.ajax.http("post", url, _this.ruleForm, setSucc, setError);
          }
          
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteAd(id){
      let _this = this;
      this.$confirm('此操作将永久删除这条广告，且不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  
        let url = _this.host.baseUrl + "/beginadsetting";
        function getSucc(res){
          console.log(res)
          _this.getBeginAds();
          _this.$message({
            type: 'success',
            message: '删除成功'
          });
        }
        function getError(res){
          console.log(res)
        }
        _this.ajax.http("delete", url, {_id:id}, getSucc, getError);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    }
	},
	mounted(){
    // beginadsetting
    this.getBeginAds()
	}
};
</script>


<style lang="scss">
.beginAdImg {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 300px;
    display: block;
  }
}

.tooltip{
	position: relative;
	width: 700px;
	height: 32px;
	line-height: 30px;
  margin: 15px 0;
	background-color: rgba(64, 158, 255, .1);
	padding: 0 10px;
	color: #409eff;
	border-radius: 4px;
	box-sizing: border-box;
	border: 1px solid rgba(64, 158, 255, .2);
	white-space: nowrap;
	
	span{
    position: relative;
		display: inline-block;
		a{
			position: relative;
			display: inline-block;
      line-height: 16px;
			width: 250px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
	.time{
    width: 130px;
		margin-left: 15px;
	}
}

._today{
  background-color: #fdf5e6;
  color: #eb9e05;
  border-width: 1px;
  border-style: solid;
  border-color: #fbeccd;
  
  a{
    color: #eb9e05;
  }
}

.pass{
  background-color: #edf2fc;
  color: #878d99;
  border-width: 1px;
  border-style: solid;
  border-color: #e6ebf5;
  
  a{
    color: #878d99;
  }
}

.err{
  background-color: #fee;
  border-color: #fedddd;
  color: #fa5555;
  
  a{
    color: #fa5555;
  }
}

.el-tooltip__popper{
  div{
    a{
      color: #000;
      text-decoration: none;
    }
    img{
      width: 330px;
      height: 170px;
    }
    
  }
}
</style>