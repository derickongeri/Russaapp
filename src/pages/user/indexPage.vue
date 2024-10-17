<template>
  <q-page class="text-body body">
    <div class="signup-page">
      <div class="page-overlay">
        <div class="col q-gutter-y-md button-box text-center">
          <div class="row">
            <q-btn
              no-caps
              size="lg"
              class="full-width"
              unelevated
              rounded
              color="primary"
              label="New to the App - Sign Up"
              @click="signup = true"
            />
          </div>
          <div class="row">
            <q-btn
              no-caps
              size="lg"
              class="full-width bg-white"
              outline
              rounded
              color="primary"
              label="I have an account - Login"
              @click="login = true"
            />
          </div>
        </div>
        <q-dialog v-model="signup" seamless position="bottom">
          <q-card
            class="body-text"
            style="min-height: 95vh; border-radius: 20px"
          >
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <div class="text-h5 q-pl-md">Sign Up</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <signUpForm />
            </q-card-section>
            <div class="row q-mx-md">
              <q-btn
                no-caps
                size="lg"
                class="full-width bg-white"
                outline
                dense
                rounded
                color="primary"
                label="Login"
                @click="
                  signup = false;
                  login = true;
                "
              />
            </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="login" seamless position="bottom">
          <q-card
            class="body-text"
            style="min-height: 70vh; border-radius: 20px"
          >
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <div class="text-h5 q-pl-md">Login</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <loginForm />
            </q-card-section>

            <div class="row q-mx-md">
              <q-btn
                no-caps
                size="lg"
                class="full-width bg-white"
                outline
                rounded
                color="primary"
                label="Sign Up"
                @click="
                  login = false;
                  signup = true;
                "
              />
            </div>
          </q-card>
        </q-dialog>
        <div class="row Frame-622 text-center">
          By continuing you accept our privacy policy and Terms of use
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";
import signUpForm from "src/components/Forms/signUp.vue";
import loginForm from "src/components/Forms/login.vue";

const signup = ref(false),
  login = ref(false),
  bar = ref(false),
  bar2 = ref(false),
  toolbar = ref(false),
  text = ref(""),
  password = ref(""),
  isPwd = ref(true);
</script>
