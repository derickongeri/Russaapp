<template>
  <div class="">
    <div
      class="row item-center justify-between q-px-md"
      style="width: 100%; "
    >
      <q-chip outline color="primary" text-color="white">
        <div class="caption-text" style="font-style: italic">
          Get more with Rusa+
        </div>
      </q-chip>

      <div class="row items-center">
        <q-btn
          outline
          round
          size="xs"
          color="primary"
          icon="mdi-information-variant"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <div
        flat
        class="my-card bg-green-1 text-white"
        style="width: 100%; min-height: 15vh; border-radius: 20px"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      controlType: ref("flat"),
      controlTypeOptions: [
        { value: "regular", label: "regular" },
        { value: "unelevated", label: "unelevated" },
        { value: "flat", label: "flat (default)" },
        { value: "outline", label: "outline" },
        { value: "push", label: "push" },
      ],

      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>
