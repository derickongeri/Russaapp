<template>
  <div
    class="q-px-md bg-white"
    style="position: fixed; z-index: 10; top: 12%; width: 100vw"
  >
    <dateSelector />
  </div>
  <div class="" style="width: 100vw; margin-top: 25%">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 65vh; min-width: 100%"
    >
      <div class="row items-center justify-between q-px-md" style="width: 100%">
        <div class="sign-logger-card-text">My frequent signs</div>
        <q-btn
          class="tab-text-light"
          flat
          no-caps
          color="primary"
          label="Edit this list"
          icon-right="mdi-playlist-edit"
        />
      </div>
      <div class="q-px-md" style="width: 100vw">
        <signLogger />
      </div>
    </q-scroll-area>

    <div
      class="column footer-div justify-center q-pa-md items-center"
      style="
        position: fixed;
        z-index: 10;
        bottom: 0%;
        width: 100vw;
        height: 12vh;
      "
    >
      <div class="row items-center justify-between" style="width: 100%">
        <q-btn
          no-caps
          class="tab-text"
          size="lg"
          unelevated
          rounded
          outline
          color="primary"
          label="Add Sign"
          style="width: 40%"
        />
        <q-btn
          no-caps
          class="tab-text"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Save"
          style="width: 40%"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";

import signLogger from "src/components/Reusables/signLog.vue";

const tab = ref("mails");

const thumbStyle = ref({
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be300",
    width: "5px",
    opacity: 0.75,
  }),
  barStyle = ref({
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be300",
    width: "9px",
    opacity: 0.2,
  });
</script>
