<template>
  <el-container class="home-continer">
    <el-header>
      <div>
        <img src="../assets/img/icon.png" style="width: 50px;height: 50px;" alt="">
        <span>后台管理</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="isCollapsed?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 background-color="#333744"
                 text-color="#fff" active-text-color="#409bff" width="200px" :unique-opened="true"
                 :collapse="isCollapsed" :collapse-transition="false" :router="true">
          <el-submenu :index="item.id + ' '" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item :index="subitem.url" v-for="subitem in item.child" :key="subitem.id"  >
              <template slot="title">
                <i :class="subitem.icon"></i>
                <span>{{ subitem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-container>
        <el-main>
          <!--welcome占位符-->
          <router-view></router-view>
        </el-main>
        <el-footer>loyo</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {
  removeToken
} from '@/utils/auth'
import {
  menu
} from "@/api/system"
import {
  Message
} from 'element-ui'

export default {
  data() {
    return {
      menuList: [],
      //定义初始值
      isCollapsed: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      removeToken()
      this.$router.push("/login")
    },
    async getMenuList() {
      menu().then((res_data) => {
        if (res_data.code !== 200) {
          Message({
            message: res_data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
        this.menuList = res_data.data
      })
    },
    //折叠函数
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    }
  }
};
</script>

<style lang="less" scoped>
.home-continer {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;

  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.el-footer {
  background-color: #f1f1f1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 12px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;

}
</style>
