<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {userList} from "@/api/user";
import {Message} from "element-ui";

export default {
  data() {
    //请求参数
    return{
      queryInfo:{
        query:"",
        pagenum:1,
        pagesize:1
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      userList(this.queryInfo).then((res_data) => {
        if (res_data.code !== 200) {
          Message({
            message: res_data.message,
            type: 'success',
            duration: 5 * 1000
          })
        }
        console.log(res_data)
        return res_data;
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>