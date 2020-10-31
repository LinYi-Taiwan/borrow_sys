import Vuex from "vuex";
import Vue from "vue";
import room from "./modules/room";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    room
  }
});
