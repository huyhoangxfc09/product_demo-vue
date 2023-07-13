<template>
  <div>
    <el-menu mode="horizontal" default-active="home">
      <el-menu-item index="home">
        <a href="/">Home</a>
      </el-menu-item>
      <el-menu-item index="about">
        <a href="/about">About</a>
      </el-menu-item>
      <el-menu-item index="create">
        <el-button type="primary" size="mini" @click="createProduct">Create</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
 methods:{
   createProduct(){
     this.$router.push(`/create`)
   }
 }
}
</script>
<style scoped>

</style>