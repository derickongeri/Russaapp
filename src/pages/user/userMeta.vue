<template>
  <div class="onboarding">
    <q-stepper
      class=""
      flat
      v-model="step"
      alternative-labels
      header-nav
      contracted
    >
      <q-step
        class="q-pa-none step q-my-none"
        name="step1"
        title="Step 1"
        icon="mdi-text-account"
        :done="step > 1"
      >
        <div class="meta-form q-my-none column items-center">
          <!-- <div
            class="row q-mb-sm items-center selection-header justify-center"
            style="width: 100%"
          >
            About Me
          </div> -->
          <div
            class="row q-mb-md items-center text-box justify-center"
            style="width: 100%"
          >
            {{ lorem }}
          </div>
          <div
            class="row q-my-sm items-center selection-header justify-center"
            style="width: 100%"
          >
            Age
          </div>

          <ageSelector />

          <div class="q-py-md">
            <q-btn-toggle
              v-model="model"
              class="my-custom-toggle"
              no-caps
              dense
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'kg/cm', value: 'one' },
                { label: 'Lb/ft', value: 'two' },
              ]"
            />
          </div>
          <weightSelector />
          <heightSelector />
        </div>
      </q-step>

      <q-step
        class="q-pa-none step q-my-none"
        name="step2"
        title="Step 2"
        :done="step > 2"
        icon="mdi-gender-female"
      >
        <div style="min-height: 74vh">
          <menopuaseStatus />
        </div>
      </q-step>

      <q-step
        class="q-pa-none step q-my-none"
        name="step3"
        title="Step 3"
        icon="mdi-format-list-checks"
      >
        <signsSelector />
      </q-step>

      <q-step
        class="q-pa-none step q-my-none"
        name="step4"
        title="Step 4"
        icon="mdi-heart-pulse"
      >
        <div class="meta-form column items-center"></div>
        <healthStatus />
      </q-step>

      <template v-slot:navigation>
        <div
          class="row justify-between q-px-md q-pb-md q-pt-lg footer-div-user-meta"
          style="position: fixed; bottom: 0%; width: 100%"
        >
          <q-btn
            v-if="step === 'step1'"
            style="min-width: 124px; min-height: 50px"
            unelevated
            rounded
            label="Back"
            color=""
            text-color="black"
            @click="prevStep"
          />

          <q-btn
            v-if="step !== 'step1'"
            style="min-width: 124px; min-height: 50px"
            unelevated
            rounded
            label="Previous"
            color=""
            text-color="black"
            @click="prevStep"
          />

          <q-btn
            v-if="step !== 'step4'"
            style="min-width: 124px; min-height: 50px"
            unelevated
            rounded
            label="NEXT"
            color="primary"
            text-color="white"
            @click="nextStep"
          />

          <q-btn
            v-else
            style="min-width: 124px; min-height: 50px"
            unelevated
            rounded
            class=""
            label="GET STARTED"
            color="primary"
            text-color="white"
            to="/home"
          />
        </div>
      </template>

      <template v-slot:message>
        <div
          v-if="step === 'step1'"
          class="row q-mb-sm items-center selection-header justify-center"
          style="width: 100%"
        >
          About Me
        </div>

        <!-- <div v-if="step === 'step2'" class="question-text q-px-md">
          Do you know your menopause status?
        </div> -->

        <div v-if="step === 'step3'" class="question-text q-px-md">
          Select any menopause signs you have frequently noticed?
        </div>

        <div v-if="step === 'step4'" class="question-text q-px-md">
          Have you been diagnosed with any of these health conditions?
        </div>
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import heightSelector from "src/components/Forms/heightSelection.vue";
import ageSelector from "src/components/Forms/ageSelector.vue";
import weightSelector from "src/components/Forms/weightSelector.vue";
import menopuaseStatus from "src/components/Forms/menopauseStatus.vue";
import signsSelector from "src/components/Forms/singsSelector.vue";
import healthStatus from "src/components/Forms/healthStatus.vue";

const model = ref("one");
const step = ref("step1");
const lorem = ref(
  "Lorem ipsum dolor sit amet consectetur. Vulputate urna ultrices tempor quam lacus curabitur magnis."
);
const answers = ref({
  question1: "",
  question2: "",
  question3: "",
});

const nextStep = () => {
  if (step.value === "step1") {
    step.value = "step2";
  } else if (step.value === "step2") {
    step.value = "step3";
  } else if (step.value === "step3") {
    step.value = "step4";
  }
};

const prevStep = () => {
  if (step.value === "step2") {
    step.value = "step1";
  } else if (step.value === "step3") {
    step.value = "step2";
  } else if (step.value === "step4") {
    step.value = "step3";
  }
};

const finish = () => {
  console.log("Onboarding complete with answers:", answers.value);
  // You can handle form submission or save the answers here
};
</script>

<style scoped>
.onboarding {
  position: absolute;
  bottom: 2%;
  width: 100vw;
  height: 88vh;
  margin: 5vh 0;
}
.step {
  min-height: 75vh;
}

.age-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.scroll-area {
  width: 100vw;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
}
</style>
