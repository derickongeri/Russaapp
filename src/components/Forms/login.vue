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
    <div class="row q-pt-md q-gutter-sm">
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

  <div class="row">
    <div>
      <q-checkbox v-model="form.rememberMe" label="Remember me" />
    </div>
    <q-space />
    <div>
      <q-btn
        :ripple="false"
        flat
        color="primary"
        label="Forgot password?"
        @click="resetPassword = !resetPassword"
        no-caps
      />
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
      @click="handleLogin"
    />
  </div>

  <q-dialog
    v-model="resetPassword"
    position="bottom"
    backdrop-filter="blur(4px)"
  >
    <q-card
      class="body-text"
      style="min-height: 75vh; min-width: 100vw; border-radius: 20px"
    >
      <q-card-section class="row items-center q-pb-none">
        <q-btn icon="mdi-arrow-left-thin" flat round dense v-close-popup />
        <q-space />
        <div class="text-h5 q-pl-md">Reset password</div>
        <q-space />
        <q-btn icon="" flat round dense />
      </q-card-section>

      <q-card-section>
        <div class="caption-text">
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <div class="row q-px- form-text text-primary">Email Address</div>
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

        <div class="row q-pt-md">
          <q-btn
            no-caps
            size="lg"
            class="full-width"
            unelevated
            rounded
            color="primary"
            label="Send Instructions"
            @click="sendPasswordRestEmail(form.email), (alert = !alert)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="alert" position="bottom" backdrop-filter="blur(4px)">
    <div class="text-center" style="width: 100%; position: fixed; top: 4%">
      <div class="row">
        <q-btn
          label="Back"
          :ripple="false"
          flat
          no-caps
          icon="mdi-arrow-left"
          @click="resetPassword = !resetPassword"
          v-close-popup
        ></q-btn>
      </div>
    </div>
    <div
      class="column items-center bg-white justify-center body-text"
      style="min-height: 100vh; min-width: 100vw; border-radius: 0px"
    >
      <div class="" style="width: 100%; height: 60%">
        <div
          class="row items-center justify-center q-mb-lg"
          style="width: 100%"
        >
          <div
            class="comumn justify-center items-center bg-lime-1"
            style="border-radius: 16px"
          >
            <div class="q-pa-lg">
              <q-icon
                name="mdi-email-check"
                color="green-3"
                size="96px"
              ></q-icon>
            </div>
          </div>
        </div>
        <div class="row items-center justify-center header-text text-grey-9">
          Check your mail
        </div>
        <div class="row items-center justify-center caption-text">
          <div
            class="text-center q-py-md"
            style="width: 84%; font-size: 20px; margin: auto"
          >
            We have sent a password recovery instructions to your email
          </div>
        </div>
        <div class="row q-my-lg items-center justify-center">
          <q-btn
            style="border-radius: 10px; min-width: 60%"
            class="q-px-lg"
            size="lg"
            unelevated
            label="Open email app"
            @click="openMailApp"
            color="primary"
            no-caps
          ></q-btn>
        </div>
      </div>
      <div
        class="text-center"
        style="width: 100%; height: 10vh; position: fixed; bottom: 0%"
      >
        <div class="text-center" style="width: 84%; margin: auto">
          Did not receive the email? Check your spam filter, or try another
          email address
        </div>
      </div>
    </div>
  </q-dialog>

  <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
    <q-card>
      <q-card-section class="row items-center q-pb-none text-h6">
        <div class="column items-center" style="width: 100%">
          <div class="row items-center q-gutter-x-sm">
            <div class="col">Login Failed</div>
            <i class="fa-solid fa-ban" style="color: #f74c40"></i>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        Please check that your email and password are correct and try again.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Ok" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
const { login, isLoggedIn, sendPasswordRestEmail, user } = userAuthUser();
const { notifyError, notifySuccess } = useNotify();

const form = ref({
  email: "",
  password: "",
  rememberMe: false, // Default unchecked
});

const resetPassword = ref(false);

const dialog = ref(false);
const alert = ref(false);

const getUserProfileByEmail = async (email) => {
  console.log("executing");
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

    await login(form.value, form.value.rememberMe).then(() => {
      getUserProfileByEmail(user.value.email);
    });

    timer = setTimeout(() => {
      $q.loading.hide();
      timer = void 0;
    }, 300);
  } catch (error) {
    //notifyError(error.message);
    dialog.value = true;
    timer = setTimeout(() => {
      $q.loading.hide();
      timer = void 0;
    }, 300);
  }
};

const isValid = computed(
  () => form.value.password && form.value.password.length > 0
);

const rememberMe = ref(false);
const isPwd = ref(true);

function goToPasswordReset() {
  router.push({ name: "resetpassword" });
}

function openMailApp() {
  const mailtoLink = "mailto:";
  window.location.href = mailtoLink;
}

// onBeforeMount(() => {
//   if (isLoggedIn) {
//     getUserProfileByEmail(user.value.email);
//     router.push({
//       name: "home",
//     });
//   }
// });

// onMounted(() => {
//   if (isLoggedIn) {
//     console.log(user.value)
//     getUserProfileByEmail(user.value.email);
//   }
// });
</script>

<style>
.spinner-box {
  height: 100vh;
  width: 100vw;
}
</style>
