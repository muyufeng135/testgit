<template>
  <div>
    <p>导航 ：
      <router-link to="/">首页</router-link> |
      <router-link to="/eqstatus">设备状态</router-link> |
      <router-link to="/request">用车申请</router-link> |
    </p>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

