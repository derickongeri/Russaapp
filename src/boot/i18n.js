import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: "en-US",
    legacy: false, // comment this out if not using Composition API
    messages,
  });

  // Tell app to use the I18n instance
  app.use(i18n);
});
