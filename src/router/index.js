import Vue from "vue";
import VueRouter from "vue-router";
import template from "../views/template.vue";
import show from "../views/show.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: template,
    name: "template ",
  },
  {
    path: "/show",
    component: show,
    name: "show ",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
