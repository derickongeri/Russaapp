<template>
  <!-- <div class="question-text shadow-bottom">
    Select any menopause signs you have frequently noticed?
  </div> -->
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 70vh; min-width: 100%"
  >
    <div class="q-py-md" style="width: 100%">
      <q-list>
        <q-expansion-item
          expand-icon-class="expand-icon"
          header-class="expansion-header"
          label="Most common signs"
          default-opened
        >
          <div class="q-px-sm" v-for="option in options.slice(0, 6)">
            <q-checkbox
              class="justify-between q-ma-xs q-px-sm option-list"
              v-model="group"
              :label="option.label"
              :val="option.value"
              checked-icon="mdi-circle-slice-8"
              unchecked-icon="mdi-circle-outline"
              color="secondary"
              size="xl"
              left-label
              style="min-width: 100%"
            >
            </q-checkbox>
          </div>
        </q-expansion-item>
        <q-expansion-item
          expand-icon-class="expand-icon"
          header-class="expansion-header"
          label="All signs"
          default-opened
        >
          <div class="q-px-sm" v-for="option in options">
            <q-checkbox
              class="justify-between q-my-xs q-px-sm option-list"
              v-model="group"
              :label="option.label"
              :val="option.value"
              checked-icon="mdi-circle-slice-8"
              unchecked-icon="mdi-circle-outline"
              color="secondary"
              size="xl"
              left-label
              style="min-width: 100%"
            >
              <!-- <template v-slot:label="opt">
              <div class="row items-center" style="min-width: 70vw">
                <span style="font-size: 16px" class="">{{ opt.label }}</span>
              </div>
            </template> -->
            </q-checkbox>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref } from "vue";

const knowsStatus = ref("");

const group = ref([]);
const status = ref("yes");

const statusOptions = ref([
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
]);

const options = ref([
  {
    label: "Abdominal pain",
    value: "Abdominal pain",
  },
  {
    label: "Acne",
    value: "Acne",
  },
  {
    label: "Anxiety",
    value: "Anxiety",
  },
  {
    label: "Back pain",
    value: "Back pain",
  },
  {
    label: "Breast tenderness",
    value: "Breast tenderness",
  },
  {
    label: "Cold flashes",
    value: "Cold flashes",
  },
  {
    label: "Depression",
    value: "Depression",
  },
  {
    label: "Difficulty sleeping",
    value: "Difficulty sleeping",
  },
  {
    label: "Dizziness",
    value: "Dizziness",
  },
  {
    label: "Dry skin",
    value: "Dry skin",
  },
  {
    label: "Fatigue",
    value: "Fatigue",
  },
  {
    label: "Forgetfulness",
    value: "Forgetfulness",
  },
  {
    label: "Headaches",
    value: "Headaches",
  },
  {
    label: "Hot flashes",
    value: "Hot flashes",
  },
  {
    label: "Irritability",
    value: "Irritability",
  },
  {
    label: "Joint pain",
    value: "Joint pain",
  },
  {
    label: "Mood swings",
    value: "Mood swings",
  },
  {
    label: "Night sweats",
    value: "Night sweats",
  },
  {
    label: "Osteoporosis",
    value: "Osteoporosis",
  },
  {
    label: "Rapid heartbeat",
    value: "Rapid heartbeat",
  },
  {
    label: "Skin itching",
    value: "Skin itching",
  },
  {
    label: "Stress incontinence",
    value: "Stress incontinence",
  },
  {
    label: "Urinary urgency",
    value: "Urinary urgency",
  },
  {
    label: "Vaginal dryness",
    value: "Vaginal dryness",
  },
  {
    label: "Vaginal itching",
    value: "Vaginal itching",
  },
  {
    label: "Weight gain",
    value: "Weight gain",
  },
]);

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

<style>
.expand-icon {
  color: #74b281;
}

.expansion-header {
  font-family: Mulish;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.08px;
  color: #404715;
}
</style>
