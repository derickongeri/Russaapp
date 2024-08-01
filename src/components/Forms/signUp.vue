<template>
  <div>
    <div class="row q-px-md form-text text-primary">Your Name</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-input
          rounded
          outlined
          flat
          v-model="form.firstName"
          placeholder="Firatname"
        />
      </div>
      <div class="col">
        <q-input
          rounded
          outlined
          v-model="form.lastName"
          placeholder="Lastname"
        />
      </div>
    </div>
  </div>

  <div>
    <div class="row q-px-md form-text text-primary">Select Country</div>
    <div class="row q-py-md q-gutter-sm">
      <div class="col">
        <q-select
          rounded
          outlined
          options-cover
          v-model="model"
          :options="options"
          label="Rounded outlined"
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
          rounded
          outlined
          flat
          v-model="text"
          placeholder="Placeholder"
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
      label="Sign Up"
      @click="icon = true"
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
</template>

<script setup>
import { ref } from "vue";

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
  options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
</script>
