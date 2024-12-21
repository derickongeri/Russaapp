<template>
  <div class="" style="width: 100vw;">
      <div class="q-px-md" style="width: 100vw">
        <createpost />
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import createpost from "src/components/Stories/poststory.vue";

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
