import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignOut from "../views/SignOut.vue";
import About from "../views/About.vue";
import LandingPage from "../views/LandingPage.vue";
import Favorites from "../views/Favorites.vue";
import Goals from "../views/Goals.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/signout",
    name: "signout",
    component: SignOut,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/landingpage",
    name: "landingpage",
    component: LandingPage,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites,
  },
  {
    path: "/goals",
    name: "goals",
    component: Goals,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
