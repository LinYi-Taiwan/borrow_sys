<template>
  <div class="nav">
    <router-link to="/allRooms">
      <div class="router-container">
        <div class="key"></div>
        <div>教室借用</div>
      </div>
    </router-link>
    <router-link to="/record">
      <div class="router-container">
        <div class="record"></div>
        <div>使用紀錄</div>
      </div>
    </router-link>
    <a @click="logout()">
      <div class="router-container">
        <div class="logout"></div>
        <div>系統登出</div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SideBar",
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #b1ca70;
  float: left;
  width: 55px;
  height: 100vh;
  border-top-right-radius: 8px;
  /* border-bottom-right-radius: 8px; */
  box-shadow: 5px 0 18px 0 rgba(0, 0, 0, 0.16);
  transition: 0.2s;
  overflow-x: hidden;
}
.nav a {
  display: block;
  text-decoration: none;
  color: white;
  font-size: 12px;
  text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.16);
  letter-spacing: 1.7px;
  cursor: ㄏㄚㄏㄚ;
}
.nav a:hover {
  opacity: 0.5;
}
.nav:hover {
  transition: 0.2s;
  width: 134px;
}
.router-container {
  /* display: flex; */
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  margin: 24px 0 24px 0;
}

.key {
  width: 26.7px;
  height: 27.3px;
  background: url("../assets/key.svg") center;
  background-size: cover;
  margin: 0 20.3px 0 13.1px;
}
.record {
  width: 20px;
  height: 24px;
  background: url("../assets/record.svg") center;
  background-size: cover;
  margin: 0 22px 0 18px;
}
.logout {
  width: 23.9px;
  height: 20.2px;
  cursor: pointer;
  background: url("../assets/logout.svg") center;
  background-size: cover;
  margin: 0 17px 0 20px;
}
.contain {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-left: 39px;
}
.sideBar-text {
}
</style>
