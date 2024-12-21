<template>
  <q-page class="text-body body">
    <div class="signup-page">
      <div class="page-overlay-language">
        <div class="col q-gutter-y-md button-box-language text-center">
          <div class="row full-width items-center justify-center q-pa-md lang-header">Choose your language</div>
          <div class="row">
            <q-btn
              size="lg"
              class="full-width"
              unelevated
              rounded
              color="primary"
              label="English"
              to="/meta/user"
            />
          </div>
          <div class="row">
            <q-btn
              size="lg"
              class="full-width bg-white"
              outline
              rounded
              color="primary"
              label="French"
              to="/meta/user"
            />
          </div>
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
