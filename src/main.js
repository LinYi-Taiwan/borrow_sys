import Vue from "vue";
import App from "./App";
import router from "./router/router";
import {
  BIconLayoutTextWindow,
  BIconLayoutTextWindowReverse,
  IconsPlugin
} from "bootstrap-vue";
import GSignInButton from "vue-google-signin-button";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(GSignInButton);
Vue.use(IconsPlugin);

router.beforeEach(function(to, from, next) {
  if (to.matched.length === 0) {
    next({ name: "login" });
  }
  // store.state.room.isLoading = true;
  if (localStorage.tokens) {
    store.state.room.tokens = JSON.parse(localStorage.tokens);
  }

  if (to.matched.some(record => record.meta.needLogin)) {
    let access_url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${
      JSON.parse(localStorage.tokens).accessToken
    }`;

    axios
      .get(access_url)
      .then(res => {
        if (res.status === 200) {
          next();
        } else {
          alert("連線已逾時，請重新登入");
          localStorage.removeItem("tokens");
          next({ name: "login" });
        }
      })
      .catch(error => {
        alert("連線已逾時，請重新登入");
        console.log(error);
        next({ name: "login" });
      });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  // components: { App },
  render: h => h(App)
}).$mount("#app");
