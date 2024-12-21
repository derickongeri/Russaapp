<template>
  <div
    class=""
    style="position: absolute; height: 15vh; width: 100vw; z-index: 10"
  >
    <div class="row" style="width: 100vw; height: 15vh; position: relative">
      <div
        class="row items-center bg-white"
        style="position: absolute; width: 100vw; height: 10vh; bottom: 0%"
      >
        <div class="col-2">
          <q-circular-progress
            show-value
            class="text-primary q-ml-md"
            :value="progress.step"
            :min="0"
            :max="4"
            size="56px"
            color="primary"
            track-color="light-green-1"
          >
            {{ progress.step }} of 4
          </q-circular-progress>
        </div>

        <q-item class="col-8">
          <q-item-section>
            <q-item-label
              class="question-text"
              style="font-size: 20px; font-weight: 700"
              >{{ progress.title }}</q-item-label
            >
            <q-item-label class="caption-text">{{
              progress.caption
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <div class="col-2">
          <q-btn
            dense
            unelevated
            rounded
            label="Skip"
            color=""
            text-color="black"
            @click="skip()"
          />
        </div>
        <!-- <q-btn
          style="min-width: 124px; min-height: 50px"
          unelevated
          rounded
          label="Skip"
          color=""
          text-color="black"
          @click="prevStep"
        /> -->
      </div>
    </div>
  </div>
  <div class="onboarding">
    <q-stepper
      class=""
      header-class="stepper-header"
      flat
      v-model="step"
      alternative-labels
    >
      <q-step
        class="q-pa-none step q-my-none"
        name="step1"
        title="Step 1"
        icon="mdi-text-account"
        :done="step > 1"
      >
        <div>
          <ageSelector />

          <!-- <div class="q-py-md">
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
          </div> -->
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
            @click="finish()"
          />
        </div>
      </template>

      <template v-slot:message>
        <!-- <div
          v-if="step === 'step1'"
          class="row q-mb-sm items-center selection-header justify-center"
          style="width: 100%"
        >
          About Me
        </div> -->

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
import ageSelector from "src/components/Forms/physicalForm.vue";
import weightSelector from "src/components/Forms/weightSelector.vue";
import menopuaseStatus from "src/components/Forms/menopauseStatus.vue";
import signsSelector from "src/components/Forms/singsSelector.vue";
import healthStatus from "src/components/Forms/healthStatus.vue";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";
import { useMetaStore } from "src/stores/userMeta";
import { useSignsStore } from "src/stores/signs";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();
const store = useMetaStore();
const signsStore = useSignsStore();
const { supabase } = useSupabase();

const model = ref("one");
const step = ref("step1");
const progress = ref({
  step: 1,
  title: "Physical attributes",
  caption: "Enter your age, weight, and height to get accurate health insights",
});
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
    progress.value = {
      step: 2,
      title: "Menopause status",
      caption:
        "Your menopause status allows us to better assist you on your journey.",
    };
  } else if (step.value === "step2") {
    step.value = "step3";
    progress.value = {
      step: 3,
      title: "Menopause signs",
      caption:
        "Please select signs to help us provide you with a quick and easy tracking list",
    };
  } else if (step.value === "step3") {
    step.value = "step4";
    progress.value = {
      step: 4,
      title: "Health information",
      caption: "Please share infomation for tailored care and recommendations",
    };
  }
};

const prevStep = () => {
  if (step.value === "step2") {
    step.value = "step1";
    progress.value = {
      step: 1,
      title: "Physical attributes",
      caption:
        "Enter your age, weight, and height to get accurate health insights",
    };
  } else if (step.value === "step3") {
    step.value = "step2";
    progress.value = {
      step: 2,
      title: "Menopause status",
      caption:
        "Your menopause status allows us to better assist you on your journey.",
    };
  } else if (step.value === "step4") {
    step.value = "step3";
    progress.value = {
      step: 3,
      title: "Menopause signs",
      caption:
        "Please select signs to help us provide you with a quick and easy tracking list",
    };
  }
};

const submitUserMeta = async () => {
  try {
    // 1. Get the current user email
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user?.email;

    if (!email) {
      throw new Error("User not logged in or email not available.");
    }

    // 2. Check if the user already exists in the user_profile table
    const { data: userProfile, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error; // Handle other errors apart from 'no records found'
    }

    const physicalInfoJson = store.physicalInfo;
    const menopauseStatusJson = store.menopauseStatus;
    const healthConditionsJson = store.healthConditions;
    const frequentSignsJson = signsStore.userSigns;

    // 3. If no user found, insert new row with email and physicalInfo
    if (!userProfile) {
      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert([
          {
            email: email,
            physical_info: physicalInfoJson, // Store physical info as JSONB
            knows_status: menopauseStatusJson,
            frequent_signs: frequentSignsJson,
            health_info: healthConditionsJson,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      console.log("New profile created successfully.");
    } else {
      // Optionally: Update existing profile's physical_info
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          physical_info: physicalInfoJson, // Store physical info as JSONB
          knows_status: menopauseStatusJson,
          frequent_signs: frequentSignsJson,
          health_info: healthConditionsJson,
        })
        .eq("email", email);

      if (updateError) {
        throw updateError;
      }

      console.log("Profile updated successfully.");
    }
  } catch (error) {
    console.error("Error in submitting physical info:", error.message);
  }
};

const skip = () => {
  router.push({
    name: "home",
  });
};

const finish = async () => {
  await submitUserMeta().then(() => {
    router.push({
      name: "home",
    });
  });
};
</script>

<style scoped>
.stepper-header {
  display: none;
}

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
