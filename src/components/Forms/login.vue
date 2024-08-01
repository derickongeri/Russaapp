<template>
  <div>
    <div class="row q-px-md form-text text-primary">Email Address</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          rounded
          outlined
          flat
          v-model="text"
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
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
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
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref(""),
  password = ref(""),
  isPwd = ref(true);
</script>
