<template>
  <div class="homePage">
    <!-- <div class="edge"> -->
    <!-- <myHeader /> -->
    <!-- <div class="contain">
        <div class="title-box">
          <img src="../assets/logo.svg" alt="img" />
          <div class="title-up">諮商與臨床心理學系</div>
          <div class="title-down">教室借用系統</div>
        </div> -->

    <!-- <div class="nav">
          <router-link to="/allRooms" class="nav-item button">
            教室借用
          </router-link>
          <router-link to="/record" class="nav-item button">
            借用紀錄
          </router-link> -->

    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import myNav from "@/components/myNav";
// import myHeader from "@/components/myHeader";
export default {
  name: "home"
};
</script>

<style scoped>
.homePage {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
}
.edge {
  width: 63.4vw;
  height: 33.5vw;
  border-radius: 4.1vw;
  border: solid 0.6vw #ffffff;
}
.contain {
  margin: 0 auto;
  height: 100%;
}
.nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 14vw 0 14vw;
}
.nav-item {
  width: 10.4vw;
  height: 4vw;
  text-align: center;
  line-height: 4vw;
  color: white;
}
.button {
  box-shadow: 0 0 0.6vw 0 rgba(0, 0, 0, 0.16);
  background-color: #96c45a;
  border-radius: 1.6vw;
  font-size: 1.25vw;
}
.title-box {
  width: 17.2vw;
  height: 11.9vw;
  margin: 0 auto;
  margin-top: 5.75vw;
  margin-bottom: 3.43vw;
}
.title-up {
  width: 13.5vw;
  height: 1.66vw;

  font-size: 1.45vw;
  line-height: 1.14;
  margin: 0 auto;
  color: #96c45a;
}
.title-down {
  width: 13.5vw;
  height: 2.44vw;

  font-size: 2.1vw;
  margin: 0 auto;
  color: #96c45a;
}
</style>
