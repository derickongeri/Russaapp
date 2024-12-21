<template>
    <q-dialog v-model="alert">
    <q-card class="">
      <q-card-section>
        <div class="text-h6">Sign-Up Successful! 🎉</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Thank you for signing up! A confirmation link has been sent to your
        email <span class="caption-text text-primary" style="font-weight: 700;">{{ email }}</span>. Please check your inbox to complete your registration.
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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const email = route.query.mail
const alert = ref(true);

function goTohomepage() {
  router.push({
    name: "home",
  });
}
</script>
