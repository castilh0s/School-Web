import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Students from "./views/Students.vue";
import Failed from "./views/Failed.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/students",
      name: "students",
      component: Students
    },
    {
      path: "/students/failed",
      name: "failed",
      component: Failed
    }
  ]
});
