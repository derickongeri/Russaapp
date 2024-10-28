import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import userAuthUser from "src/composables/userAuthUser";
import { setStatusBarColor } from "src/boot/statusBar.js";
import { ref } from "vue";
import { useQuasar } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to) => {
    const $q = useQuasar();
    const { isLoggedIn } = userAuthUser();
    const onboarded = $q.localStorage.getItem("userOnboarded") === "true";

    console.log(onboarded);

    // If the user has not been onboarded, redirect to the onboard page
    if (!onboarded && to.name !== "onboard") {
      return { name: "onboard" };
    }

    // Now check if the user is logged in if onboarding is complete
    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes("fromEmail") &&
      to.name !== "auth"
    ) {
      // Redirect to the login/auth page if the user is not logged in
      return { name: "auth" };
    }
  });

  return Router;
});
