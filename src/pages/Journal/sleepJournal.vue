<template>
  <!-- <div
    class="q-px-md bg-white"
    style="position: fixed; z-index: 10; top: 12%; width: 100vw"
  >
    <dateSelector />
  </div> -->
  <div class="q-mt-md" style="width: 100vw;">
    <div
      class="question-text text-center text-grey-9 q-px-md"
      style="width: 90%; margin: auto; font-weight: 700; font-size: 24px"
    >
      How would you rate the quality of your sleep?
    </div>
    <div class="column items-center q-pa-lg" style="width: 100%">
      <div class="row" style="width: 90%">
        <div class="col-5 q-pr-md">
          <div class="column justify-between q-py-md" style="height: 100%">
            <div
              v-for="(label, index) in durationLabels"
              :key="index"
              class="col-1 text-left"
            >
              <div
                class="caption-text q-mb-sm"
                style="font-weight: 700; font-size: 20px"
              >
                {{ label.quality }}
              </div>
              <div class="row">
                <q-icon name="ti-timer"></q-icon>
                <span class="text-caption">{{ label.duration }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-2">
          <div class="column q-py-md items-center">
            <q-slider
              v-model="standard"
              :min="0"
              :max="5"
              :steps="1"
              color="primary"
              thumb-size="48px"
              vertical
              reverse
              track-size="12px"
              track-color="grey-4"
              inner-track-color="transparent"
              style="height: 50vh"
              @update:model-value="onSlide"
            >
              <template v-slot:thumb-label="props">
                <q-icon name="ti-hand-point-up" color="white" />
              </template>
            </q-slider>
          </div>
        </div>

        <!-- Quality Icons -->
        <div class="col-5 q-pl-md">
          <div class="column justify-between items-end" style="height: 100%">
            <div
              v-for="(icon, index) in qualityIcons"
              :key="index"
              class="text-center q-mr-sm"
            >
              <q-icon :name="icon.icon" :color="icon.color" size="48px" />
            </div>
          </div>
        </div>
      </div>
    </div>

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
          v-if="showNextbtn"
          no-caps
          class="tab-text full-width"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Next: Notes"
          style="width: 40%"
          @click="nextPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const standard = ref(0);
const fnMarkerLabel = (val) => `${10 * val}%`;

const durationLabels = [
  { duration: "7 - 8 hours", quality: "Exellent" },
  { duration: "6 - 7 hours", quality: "Good" },
  { duration: "5 hours", quality: "Fair" },
  { duration: "3 - 4 hours", quality: "Poor" },
  { duration: "less than 3 hours", quality: "Worst" },
  { duration: "0 hours", quality: "None" },
];
const qualityIcons = [
  { icon: "mdi-emoticon-excited-outline", color: "green" },
  { icon: "mdi-emoticon-happy-outline", color: "yellow" },
  { icon: "mdi-emoticon-neutral-outline", color: "brown" },
  { icon: "mdi-emoticon-sad-outline", color: "orange" },
  { icon: "mdi-emoticon-dead-outline", color: "purple" },
  { icon: "mdi-emoticon-dead-outline", color: "transparent" },
]; // Replace with appropriate icons

const onSlide = (value) => {
  console.log("Slider value:", value);
};

const nextPage = () => {
  router.push({
    name: "sleepnotes",
  });
};

const showNextbtn = computed(() => {
  return standard.value > 0;
});
</script>
