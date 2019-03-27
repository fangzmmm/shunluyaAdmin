<template>
<el-row >
  <el-col :span="12">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true"  :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
            label="地名"
            prop="address"
            :rules="[
              { type: 'string', message: '地名必须为字符串'}
            ]"
            >
            <el-autocomplete
              class="inline-input"
              v-model="numberValidateForm.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="submitForm('numberValidateForm')">添加</el-button>
            <el-button @click="selectForm()" type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item
            label="是否检查地名"
          >
            <el-switch
              v-model="check"
              active-text="按月付费"
              inactive-text="按年付费">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div  class="text item">
        <el-tag
        v-for="addres in address"
        :key="addres.id"
        closable
        @close="deleteAddress(addres.id)">
        {{addres.address}}
      </el-tag>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
import { getAllAddress,addAddress,delAddress,selectAddress,checkAddress } from '../../api/api';
  export default{
    data() {
      return {
        check:true,
        address:[],
        numberValidateForm: {
          address: ''
        }
      };
    },
    methods: { 
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        let results=[];
        let address = this.numberValidateForm.address;
        let param = {
             name:address
        }
        let addressObject = {
              pagesize:15,
              pagenum: 0, 
              orand: "OR", 
              filter:[param]
        }
        checkAddress(addressObject).then(res =>{
            results =res.data.data.map(function(addres){return {value:addres.name};});
            cb(results);
        })
      },
      deleteAddress(param){
        	this.$confirm('确认删除该地址吗?', '提示', {
					type: 'warning'
				}).then(() => {
          delAddress({address:param}).then(res=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getAddress();
          })
				}).catch(() => {

				});
      },
      getAddress(){
        getAllAddress().then(res=>{
          this.address = res.data.data_address;
        })
      },
       submitForm(formName) {
         let address = this.numberValidateForm.address;
        this.$refs[formName].validate((valid) => {
          //[{pagesize: 15, pagenum: 0, orand: "OR"]filter: [{name: "石台"}
          let param = {
             name:address
          }
          let addressObject = {
              pagesize:15,
              pagenum: 0, 
              orand: "OR", 
              filter:[param]
          }
            checkAddress(addressObject).then(res =>{
              if(this.check){
                if(res.data.data.length == 0){
                      this.$message.error({
                         message: '添加失败！中国有这个地方么？',
                      });
                    return ''
                  }
                  else{
                    if (address!=='') {
                      this.upaddress(address);
                    }
                  }
              }else{
                if (address!=='') {
                      this.upaddress(address);
                }
              }  
            })
        });
      },
      upaddress(address){
        addAddress({address:address}).then(res=>{
                        if(res.data == 1){
                          this.$message({
                            message: '添加成功',
                            type: 'success'
                          });
                        }else{
                          this.$message.error({
                              message: '添加失败！可能是地名重复奥',
                            });
                        }
                        this.getAddress();
                        this.numberValidateForm.address=''
                      })
      },
      selectForm(formName) {
         let address = this.numberValidateForm.address;
         if(address == ''){
           this.getAddress();
           return;
         }
          selectAddress({address:address}).then(res=>{
            this.address = res.data.address;
        })
      }
    },
		mounted() {
			this.getAddress();
		}
  }

</script>

<style>
 .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
