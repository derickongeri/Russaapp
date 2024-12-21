<template>
  <!-- <div
    class="q-px-md bg-white"
    style="position: fixed; z-index: 10; top: 12%; width: 100vw"
  >
    <dateSelector />
  </div> -->
  <div class="" style="width: 100vw">
    <!-- <div
      class="question-text text-center text-grey-9 q-pa-md"
      style="width: 100%; margin: auto; font-weight: 700; font-size: 24px"
    >
      Select from the list or add a sign
    </div> -->
    <!-- <div class="row items-center justify-between q-px-md" style="width: 100%">
        <div class="sign-logger-card-text">My frequent signs</div>
        <q-btn
          class="tab-text-light"
          flat
          no-caps
          color="primary"
          label="Edit this list"
          icon-right="mdi-playlist-edit"
        />
      </div> -->
    <div class="q-px-md" style="width: 100vw; margin-top: 5%">
      <signLogger />
    </div>
    <div class="row" style="height: 20vh; width: 100%"></div>

    <div
      class="column footer-div justify-center q-pa-md items-center"
      style="
        position: fixed;
        z-index: 10;
        bottom: 0%;
        width: 100vw;
        min-height: 12vh;
      "
    >
      <div class="column q-my-sm items-center justify-between" style="width: 100%">
        <q-btn
          no-caps
          class="tab-text"
          size="lg"
          unelevated
          rounded
          flat
          :ripple="false"
          color="primary"
          label="Edit my frequent signs"
          style="width: fit-content"
          icon-right="mdi-pencil-outline"
          to="/editsigns"
        />
      </div>
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
          to="/addsign"
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
import { useRouter } from "vue-router";
import dateSelector from "src/components/Reusables/dateselector.vue";

import signLogger from "src/components/Reusables/signLog.vue";

const router = useRouter();

const tab = ref("mails");

const toAddSign = () => {
}

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
