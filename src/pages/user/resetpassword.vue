<template>
  <q-page class="text-body body">
    <div class="signup-page">
      <q-dialog
        v-model="dialog"
        transition-show="slide-left"
        position="bottom"
        backdrop-filter="blur(4px)"
      >
        <div class="text-center" style="width: 100%; position: fixed; top: 4%">
          <div class="row">
            <q-btn
              label="Back"
              :ripple="false"
              flat
              no-caps
              icon="mdi-arrow-left"
              @click="toLogin()"
              v-close-popup
            ></q-btn>
          </div>
        </div>

        <div
          class="column items-center bg-white body-text"
          style="min-height: 100vh; min-width: 100vw; border-radius: 0px"
        >
          <div class="" style="width: 100%; height: 60%; margin-top: 25%">
            <div class="row q-px-md items-center header-text text-grey-9">
              Create new password
            </div>

            <div
              class="row q-px-md q-mt-md items-center caption-text text-grey-9"
            >
              Your new password must be different from previous used passwords.
            </div>

            <div class="q-px-md q-mt-md" style="min-width: 100vw">
              <div>
                <div class="row form-text text-primary">New password</div>
                <div class="row q-pt-md q-gutter-sm">
                  <div class="col">
                    <q-input
                      outlined
                      flat
                      v-model="form.password"
                      :type="isPwd ? 'password' : 'text'"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || $t('required'),
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
            </div>
            <div class="q-px-md" style="min-width: 100vw">
              <div>
                <div class="row form-text text-primary">Confrim password</div>
                <div class="row q-pt-md q-gutter-sm">
                  <div class="col">
                    <q-input
                      outlined
                      flat
                      v-model="confirmedpassword"
                      :type="isPwd ? 'password' : 'text'"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || $t('Field is required *'),
                        (val) =>
                          (val && val.length > 0 && val !== password) ||
                          $t('Passwords do not match*'),
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
                      ><template v-slot:hint>
                        Both passwords must match
                      </template></q-input
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-my-lg q-px-md items-center justify-center">
              <q-btn
                style="border-radius: 10px; min-width: 100%"
                class="q-px-lg"
                size="lg"
                unelevated
                label="Reset Password"
                @click="updatePassword"
                color="primary"
                no-caps
              ></q-btn>
            </div>
          </div>
          <!-- <div
            class="text-center"
            style="width: 100%; height: 10vh; position: fixed; bottom: 0%"
          >
            <div class="text-center" style="width: 84%; margin: auto">
              Did not receive the email? Check your spam filter, or try another
              email address
            </div>
          </div> -->
        </div>
      </q-dialog>
    </div>
  </q-page>
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
const { updateUserPassword } = userAuthUser();
const { notifyError, notifySuccess } = useNotify();

const form = ref({
  email: "",
  password: "",
});

const confirmedpassword = ref("");

const dialog = ref(true);

const isValid = computed(
  () =>
    form.value.password &&
    form.value.password.length > 0 &&
    form.value.password === confirmedpassword.value
);

const updatePassword = () => {
  if (isValid.value) {
    console.log('resetting password')
    updateUserPassword(form.password).then(() => {
      router.push({ name: "auth" });
    });
  }
};

const rememberMe = ref(false);
const isPwd = ref(true);

function toLogin() {
  router.push({
    name: "auth",
  });
}
</script>

<style>
.spinner-box {
  height: 100vh;
  width: 100vw;
}
</style>
