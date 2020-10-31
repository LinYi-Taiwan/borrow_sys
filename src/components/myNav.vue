<template>
  <div class="logo-home">
    <img class="white-logo" src="../assets/whitelogo.svg" alt="img" />
    <div class="title-box">
      <div class="title-up">諮商與臨床心理學系</div>
      <div class="title-down">教室借用系統</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test"
};
</script>

<style scoped>
.logo-home {
  display: flex;
  width: 175.3px;
  height: 57px;
  margin: 32px 0 30.9px 156px;
}
.title-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-up {
  width: 200px;
  height: 15px;
  font-size: 14px;
  line-height: 1.07;
  letter-spacing: 0.49px;
  text-align: left;
  color: #ffffff;
  margin-bottom: 5px;
}
.title-down {
  width: 200px;
  height: 23px;
  font-size: 20px;
  line-height: 1.15;
  letter-spacing: 2.34px;
  text-align: left;
  color: #ffffff;
}
.white-logo {
  width: 57px;
  height: 57px;
  margin-right: 10px;
}
</style>
