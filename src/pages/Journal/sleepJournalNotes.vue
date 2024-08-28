<template>
  <div
    class="q-px-md bg-white"
    style="position: fixed; z-index: 10; top: 12%; width: 100vw"
  >
    <dateSelector />
  </div>
  <div class="" style="width: 100vw; margin-top: 20%">
    <q-card flat>
      <q-card-section>
        <div class="text-h6 q-mb-md question-text">Quality</div>

        <div class="row justify-between items-center" style="height: 100%; width: 100%">
          <div class="col">
            <q-btn no-caps flat v-ripple @click="editQuality">
              <div class="q-mr-md">
                <q-item-label
                  class="caption-text text-primary"
                  style="font-weight: 600; font-size: 20px"
                  >{{ durationLabels[0].quality }}</q-item-label
                >
                <q-item-label caption lines="2"
                  ><q-icon name="ti-timer"></q-icon
                  ><span class="text-caption">{{
                    durationLabels[0].duration
                  }}</span></q-item-label
                >
              </div>
              <q-icon
                :name="qualityIcons[1].icon"
                :color="qualityIcons[1].color"
                size="48px"
              />
            </q-btn>
          </div>
          <div class="">
            <q-btn flat no-caps label="Edit" icon-right="ti-marker-alt" class="caption-text" @click="editQuality"></q-btn>
          </div>
        </div>

        <div class="text-h6 q-my-md question-text">Interruptions</div>
        <div class="row items-center justify-between" style="width: 100%">
          <div>
            <span
              class="q-mx-md header-text text-primary"
              style="font-weight: 400"
              >{{ interruptionCount }} times</span
            >
          </div>
          <div class="q-gutter-x-sm">
            <q-btn
              square
              size="lg"
              unelevated
              :disable="disabled"
              color="primary"
              dense
              icon="remove"
              @click="decreaseInterruptionCount"
              style="border-radius: 8px"
            />
            <q-btn
              square
              size="lg"
              unelevated
              color="primary"
              dense
              icon="add"
              @click="increaseInterruptionCount"
              style="border-radius: 8px"
            />
          </div>
        </div>
        <div class="text-h6 q-my-md question-text">Notes</div>
        <q-input
          outlined
          v-model="sleepNotes"
          label="Notes about your sleep"
          type="textarea"
        />
      </q-card-section>
    </q-card>

    <!-- <q-card flat>
      <q-card-section class="q-mt-md">
        <div class="text-h6 q-mb-md">How often was your sleep interrupted?</div>
        <div class="row items-center justify-center">
          <q-btn round dense icon="remove" @click="decreaseInterruptionCount" />
          <span class="q-mx-md text-h6">{{ interruptionCount }}</span>
          <q-btn round dense icon="add" @click="increaseInterruptionCount" />
        </div>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <q-input
          filled
          v-model="sleepNotes"
          label="Notes about your sleep"
          type="textarea"
        />
      </q-card-section>
    </q-card> -->

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
          class="tab-text full-width"
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const interruptionCount = ref(0);

const sleepNotes = ref("");

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

const disabled = computed(() => {
  return interruptionCount.value === 0;
});

const increaseInterruptionCount = () => {
  interruptionCount.value++;
};

const decreaseInterruptionCount = () => {
  if (interruptionCount.value > 0) {
    interruptionCount.value--;
  }
};

const editQuality = () => {
  router.push({
    name: "sleep",
  });
};
</script>
