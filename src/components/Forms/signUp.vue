<template>
  <div>
    <div class="row q-px-md form-text text-primary">Your Name</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          dense
          rounded
          outlined
          flat
          v-model="form.firstName"
          placeholder="Firstname"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('Field is required *'),
          ]"
        />
      </div>
      <div class="col">
        <q-input
          dense
          rounded
          outlined
          v-model="form.lastName"
          placeholder="Lastname"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('Field is required *'),
          ]"
        />
      </div>
    </div>
  </div>

  <div>
    <div class="row q-px-md form-text text-primary">Select Country</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-select
          dense
          rounded
          outlined
          v-model="form.country"
          use-input
          input-debounce="0"
          :options="countries"
          @filter="filterFn"
          virtual-scroll
          popup-content-class="custom-menu"
          dialog-content-class="custom-dialog"
          :rules="[
            (val) => (val && val.length > 0) || $t('Field is required *'),
          ]"
        />
      </div>
    </div>
  </div>

  <div>
    <div class="row q-px-md form-text text-primary">Email Address</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          type="email"
          dense
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
          dense
          rounded
          outlined
          flat
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('Field is required *'),
          ]"
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

  <div>
    <div class="row q-px-md form-text text-primary">Confirm Password</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          dense
          rounded
          outlined
          flat
          v-model="confirmedpassword"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('Field is required *'),
          ]"
          @focus="visibleKeybord = true"
          @blur="visibleKeybord = false"
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

  <div
    v-if="visibleKeybord"
    class="row q-mt-lg"
    style="width: 100%; min-height: 30vh"
  ></div>

  <div class="row q-pt-md">
    <q-btn
      no-caps
      size="lg"
      class="full-width"
      unelevated
      dense
      rounded
      color="primary"
      label="Sign Up"
      @click="handleRegister"
    />
  </div>
  <!-- <div class="row">
        <q-btn
          no-caps
          size="lg"
          class="full-width bg-white"
          outline
          rounded
          color="primary"
          label="Login"
          to="/auth/login"
        />
      </div> -->

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Sign-Up Successful! 🎉</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Thank you for signing up! A confirmation link has been sent to your
        email <b>{{ form.email }}</b
        >. Please check your inbox to complete your registration.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          @click="goTohomepage"
          v-close-popup
        />
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
import countriesData from "src/composables/countries.json";

const $q = useQuasar();

const router = useRouter();
const { register } = userAuthUser();
const { notifyError, notifySuccess } = useNotify();

const getCountryNames = (data) => {
  return data.countries.map((country) => country.name);
};

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      countries.value = getCountryNames(countriesData);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    countries.value = getCountryNames(countriesData).filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const form = ref({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
  }),
  text = ref(""),
  password = ref(""),
  isPwd = ref(true),
  model = ref(null),
  countries = ref([]),
  alert = ref(false);

const confirmedpassword = ref("");
const visibleKeybord = ref(false);

//method to handle login and redirect to dashboard
const handleRegister = async () => {
  let timer;
  if (confirmedpassword.value === form.value.password) {
    try {
      $q.loading.show({
        spinner: QSpinnerHearts,
        spinnerColor: "primary",
        message: "Setting user data",
        customClass: "bg-grey-1 text-grey-9 spinner-box",
        backgroundColor: "white",
        messageColor: "black",
      });
      await register(form.value).then(() => {
        router.push({
          name: "verifyEmail",
          query: { mail: form.value.email },
        });
        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 300);
      });
    } catch (error) {
      notifyError(`You are missing some required fields`);
    }
  } else {
    notifyError(`Your passwords do not match`);
  }
};

function goTohomepage() {
  router.push({
    name: "home",
  });
}

onMounted(() => {
  countries.value = getCountryNames(countriesData);
});
</script>

<style>
.custom-menu {
  height: 35vh; /* Adjust as needed for 5 items */
  overflow-y: auto; /* Enable scrolling if more than 5 items */
}

.custom-dialog {
  padding-top: 50px; /* Adjust this to move content down from the top */
}
</style>
