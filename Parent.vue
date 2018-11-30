<template>
  <div>
    <input type="text" id="txtName" v-model="Name" />
    <input type="text" id="txtUrl" v-model="Url" />
    <input type="button" value="click" v-on:click="btnClick()" />
    <img :src="imgUrl1"/>
    <img :src="imgUrl2">
    <m-Child @updateByChild="updateByChild" ref="child"></m-Child>
  </div>
</template>
<script lang="ts">
import Vue, { Component, VueConstructor } from 'vue'
import child from './Child.vue'
Vue.config.devtools = true
export default Vue.extend({
  name: 'parent',
  data() {
    return {
      Name: 'User Request',
      Url: '/Request/Index',
      imgUrl1: './Img/0.jpg'
    }
  },
  methods: {
    btnClick: function() {
      alert('点击了' + this.Name + '链接地址为:' + this.Url)
      //alert(this.$refs.child);
      let childComponent: any = this.$refs.child
      childComponent.Url = 'modify from parent'
      console.log(childComponent.Url)
      console.log(childComponent.Name)
    },
    updateByChild: function(data: any) {
      //alert(data[0]);
      //alert(data[1]);
      this.Name = data[0]
      this.Url = data[1]
      this.btnClick()
    }
  },
  components: {
    'm-Child': child
  },
  mounted() {},
  computed: {
    imgUrl2:{
      get(){
        return "./Img/1.jpg";
      }
    }
  }
})
</script>
<style>
@import "./Style/parent.css";
</style>



