import Vue from "vue";
import Router from "vue-router";

// import component
import room from "@/components/room/Room/";
import allRooms from "@/components/room/allRooms/";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import Home from "@/components/Home";
import Record from "@/components/Record";
import ErrorPage from "@/components/ErrorPage";
Vue.use(Router);

export default new Router({
  base: "/",
  routes: [
    { path: "/login", name: "login", component: Login },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: { needLogin: true }
    },
    {
      path: "/allRooms",
      name: "allRooms",
      component: allRooms,
      meta: { needLogin: true }
    },
    {
      path: "/allRooms/:id",
      name: "room",
      component: room,
      meta: { needLogin: true }
    },
    {
      path: "/record",
      name: "Record",
      component: Record,
      meta: { needLogin: true }
    },
    { path: "/ErrorPage", name: "ErrorPage", component: ErrorPage },
    { path: "/home", name: "home", component: Home, meta: { needLogin: true } }
  ]
});
