<template>
  <!-- <div class="question-text shadow-bottom">
    Select any menopause signs you have frequently noticed?
  </div> -->
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 70vh; min-width: 100%"
  >
    <div class="row q-py-sm" style="width: 100%; min-height: 20vh">
      <div class="bg-lime-1 q-pa-sm" style="width: 100%; min-height: 100%">
        <q-chip
          size=""
          outline
          color=""
          v-for="(chip, index) in group"
          :key="chip"
          removable
          @remove="removeChip(index)"
        >
          {{ chip }}
        </q-chip>
      </div>
    </div>
    <div class="q-py-md" style="width: 100%">
      <q-list>
        <q-expansion-item
          expand-icon-class="expand-icon"
          header-class="expansion-header"
          v-for="(diseases, category) in groupedConditions"
          :key="category"
          :label="category"
        >
          <div v-for="condition in diseases" :key="condition.value">
            <q-checkbox
              class="justify-between q-ma-xs q-px-sm option-list"
              v-model="group"
              :label="condition.label"
              :val="condition.value"
              checked-icon="mdi-circle-slice-8"
              unchecked-icon="mdi-circle-outline"
              color="secondary"
              size="xl"
              left-label
              style="min-width: 86vw"
            >
            </q-checkbox>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="row" style="height: 20vh; width: 100%"></div>
  </q-scroll-area>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSignsStore } from "src/stores/signs";
import { useMetaStore } from "src/stores/userMeta";
import { useI18n } from "vue-i18n";

const signsStore = useSignsStore();
const store = useMetaStore();

const selectedSings = ref(signsStore.userSigns);

const group = ref([]);

const options = ref([
  { label: "Hypertension", value: "Hypertension", group: "Cardiovascular" },
  { label: "Heart Disease", value: "Heart Disease", group: "Cardiovascular" },
  { label: "Diabetes", value: "Diabetes", group: "Endocrine" },
  { label: "Hypothyroidism", value: "Hypothyroidism", group: "Endocrine" },
  { label: "Asthma", value: "Asthma", group: "Respiratory" },
  {
    label: "Chronic Obstructive Pulmonary Disease (COPD)",
    value: "Chronic Obstructive Pulmonary Disease (COPD)",
    group: "Respiratory",
  },
  { label: "Arthritis", value: "Arthritis", group: "Musculoskeletal" },
  { label: "Osteoporosis", value: "Osteoporosis", group: "Musculoskeletal" },
  { label: "Cancer", value: "Cancer", group: "Oncological" },
  { label: "Breast Cancer", value: "Breast Cancer", group: "Oncological" },
  {
    label: "Chronic Kidney Disease",
    value: "Chronic Kidney Disease",
    group: "Renal",
  },
  { label: "Kidney Stones", value: "Kidney Stones", group: "Renal" },
  { label: "Depression", value: "Depression", group: "Mental Health" },
  {
    label: "Anxiety Disorder",
    value: "Anxiety Disorder",
    group: "Mental Health",
  },
  {
    label: "Alzheimer's Disease",
    value: "Alzheimer's Disease",
    group: "Neurological",
  },
  {
    label: "Parkinson's Disease",
    value: "Parkinson's Disease",
    group: "Neurological",
  },
  {
    label: "Gastroesophageal Reflux Disease (GERD)",
    value: "Gastroesophageal Reflux Disease (GERD)",
    group: "Gastrointestinal",
  },
  {
    label: "Irritable Bowel Syndrome (IBS)",
    value: "Irritable Bowel Syndrome (IBS)",
    group: "Gastrointestinal",
  },
  { label: "Psoriasis", value: "Psoriasis", group: "Dermatological" },
  { label: "Eczema", value: "Eczema", group: "Dermatological" },
  {
    label: "Sickle Cell Disease",
    value: "Sickle Cell Disease",
    group: "Hematological",
  },
  { label: "Hemophilia", value: "Hemophilia", group: "Hematological" },
  {
    label: "Sexually Transmitted Infections (STIs)",
    value: "Sexually Transmitted Infections (STIs)",
    group: "Infectious",
  },
  {
    label: "Tuberculosis (TB)",
    value: "Tuberculosis (TB)",
    group: "Infectious",
  },
]);

// Group conditions by category
const groupedConditions = computed(() => {
  return options.value.reduce((acc, condition) => {
    if (!acc[condition.group]) {
      acc[condition.group] = [];
    }
    acc[condition.group].push(condition);
    return acc;
  }, {});
});

function removeChip(index) {
  group.value.splice(index, 1);
}

watch(group, (val) => {
  store.addHealthCondition(val);
});

onMounted(() => {
  group.value = store.healthConditions;
});

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
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.08px;
  color: #404715;
}
</style>
