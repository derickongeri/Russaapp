import { boot } from "quasar/wrappers";
import VueSocials from "vue-socials";

export default boot(({ app }) => {
  // Set vuesocials instance on app
  app.use(VueSocials);
});
