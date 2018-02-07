<template>
    <div>
        <p class="page-container">404 page not found</p>
        <p class="page-container">点击<router-link to="/main" >这里</router-link>回到首页</p>
    </div>
</template>

<style lang="scss" scoped>
.page-container {
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
  
  a{
      color: #20a0ff;
      text-decoration: none;
  }
}
</style>