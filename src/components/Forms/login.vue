<template>
  <div>
    <div class="row q-px-md form-text text-primary">Email Address</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          rounded
          outlined
          flat
          v-model="form.email"
          placeholder="example@email.com"
        />
      </div>
    </div>
  </div>

  <div>
    <div class="row q-px-md form-text text-primary">Password</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          rounded
          outlined
          flat
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('required')]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            /> </template
        ></q-input>
      </div>
    </div>
  </div>

  <div class="row q-pt-md">
    <q-btn
      no-caps
      size="lg"
      class="full-width"
      unelevated
      rounded
      color="primary"
      label="Login"
      to="/meta/language"
      @click="handleLogin"
    />
  </div>
</template>

<script setup>
import { defineComponent, ref, onBeforeMount, computed, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook, QSpinnerHearts } from "quasar";
import userAuthUser from "src/composables/userAuthUser";
import useNotify from "src/composables/useNotify";
import { useRouter } from "vue-router";
import { useMetaStore } from "src/stores/userMeta";
import { useSignsStore } from "src/stores/signs";
import useSupabase from "src/boot/supabase";

const $q = useQuasar();
const store = useMetaStore();
const signsStore = useSignsStore();

const router = useRouter();
const { supabase } = useSupabase();
const { login, isLoggedIn, user } = userAuthUser();
const { notifyError, notifySuccess } = useNotify();

const form = ref({
  email: "",
  password: "",
});

const getUserProfileByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email) // Filter by email
      .single(); // We use .single() to get a single row

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user profile:", error.message);
    } else if (error && error.code === "PGRST116") {
      router.push({
        name: "lang",
      });
    } else {
      router.push({
        name: "home",
      });
    }

    signsStore.addSignsToUserSigns(data.frequent_signs);
    store.addHealthCondition(data.health_info);
    store.addPhysicalInfo(data.physical_info);

    console.log("User profile:", data);

    return data;
  } catch (err) {
    console.error("Error:", err.message);
    return null;
  }
};

//method to handle login and redirect to dashboard
const handleLogin = async () => {
  let timer;
  try {
    $q.loading.show({
      spinner: QSpinnerHearts,
      spinnerColor: "primary",
      message: "Setting user data",
      customClass: "bg-grey-1 text-grey-9 spinner-box",
      backgroundColor: "white",
      messageColor: "black",
    });
    await login(form.value);
    //notifySuccess("Login successfull!");
    getUserProfileByEmail(user.value.email);
    // hiding in 3s
    timer = setTimeout(() => {
      $q.loading.hide();
      timer = void 0;
    }, 3000);
  } catch (error) {
    notifyError(error.message);
  }
};

const isValid = computed(
  () => form.value.password && form.value.password.length > 0
);

const rememberMe = ref(false);
const isPwd = ref(true);
</script>

<style>
.spinner-box {
  height: 100vh;
  width: 100vw;
}
</style>
