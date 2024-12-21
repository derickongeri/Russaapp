<template>
  <div
    class="question-text text- text-grey-9 q-pa-md"
    style="width: 100%; margin: auto; font-weight: 700; font-size: 24px"
  >
    Select any signs that you have frequently experienced
  </div>

  <div class="row q-pa-md" style="width: 100vw; min-height: 20vh">
    <div class="bg-lime-1 q-pa-sm" style="width: 100%; min-height: 100%">
      <q-chip
        size="lg"
        outline
        color=""
        v-for="(chip, index) in selectedSings"
        :key="chip"
        removable
        @remove="removeChip(index)"
      >
        {{ chip.label }}
      </q-chip>
    </div>
  </div>

  <div class="q-pa-md" style="width: 100%">
    <q-list class="rounded-borders">
      <q-expansion-item v-model="expanded" label="Common activites">
        <template v-slot:header>
          <q-item-section>
            <div class="header-text text-grey-9" style="font-size: 20px">
              Common Signs
            </div>
          </q-item-section>
        </template>
        <div class="row justify-between">
          <div
            class="col-6"
            v-for="activity in signList.slice(0, 7)"
            :key="activity"
          >
            <div class="q-pa-xs" style="width: 100%">
              <q-btn
                unelevated
                no-caps
                class="full-width log-button"
                :color="
                  selectedSings.includes(activity) ? 'secondary' : 'green-1'
                "
                @click="toggleChip(activity)"
                style="height: 10vh; border-radius: 10px"
              >
                <div
                  class="column justify-around items-start no-wrap"
                  style="width: 100%; height: 100%"
                >
                  <div
                    class="col head-text q-pt-sm self-start"
                    style="
                      font-size: 20px;
                      font-weight: 700;
                      width: 100%;
                      height: 100%;
                    "
                  >
                    <div
                      class="row text-left"
                      :style="{
                        color: selectedSings.includes(activity)
                          ? '#ffffff'
                          : '#1D1D1D',
                      }"
                    >
                      {{ activity.label }}
                    </div>
                  </div>
                </div>
              </q-btn>
            </div>
          </div>
        </div>
      </q-expansion-item>
    </q-list>
  </div>

  <div class="q-pa-md" style="width: 100vw">
    <div class="row header-text text-grey-9 q-pa-md" style="font-size: 20px">
      All signs
    </div>
    <div class="row q-py-md" style="min-width: 100%">
      <q-input
        v-model="searchQuery"
        placeholder="Search activities..."
        rounded
        outlined
        class="full-width"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </div>

    <div class="row justify-between">
      <div class="col-6" v-for="activity in filteredSigns" :key="activity">
        <div class="q-pa-xs" style="width: 100%">
          <q-btn
            unelevated
            no-caps
            class="full-width log-button"
            :color="selectedSings.includes(activity) ? 'secondary' : 'green-1'"
            @click="toggleChip(activity)"
            style="height: 10vh; border-radius: 10px"
          >
            <div
              class="column justify-around items-start no-wrap"
              style="width: 100%; height: 100%"
            >
              <div
                class="col head-text q-pt-sm self-start"
                style="
                  font-size: 20px;
                  font-weight: 700;
                  width: 100%;
                  height: 100%;
                "
                :style="{
                  color: selectedSings.includes(activity)
                    ? '#ffffff'
                    : '#1D1D1D',
                }"
              >
                <div class="row text-left">
                  {{ activity.label }}
                </div>
              </div>
            </div>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="row" style="height: 30vh; width: 100%"></div>
  </div>

  <div
    class="column footer-div justify-center q-pa-md items-center"
    style="position: fixed; z-index: 10; bottom: 0%; width: 100vw; height: 12vh"
  >
    <div class="row items-center justify-between" style="width: 100%">
      <q-btn
        no-caps
        class="tab-text full-width"
        size="lg"
        unelevated
        rounded
        color="primary"
        label="Add to list"
        @click="editQuality()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useSignsStore } from "src/stores/signs";
import useSupabase from "src/boot/supabase";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const signsStore = useSignsStore();
const { supabase } = useSupabase();

const router = useRouter();

const expanded = ref(true);

const signList = ref(signsStore.allSigns);

const selectedSings = ref(signsStore.userSigns);
const searchQuery = ref("");

function addChip(activity) {
  if (!selectedSings.value.includes(activity)) {
    selectedSings.value.push(activity);
  }
}

function toggleChip(addedSign) {
  const index = selectedSings.value.indexOf(addedSign);
  if (index === -1) {
    // Add chip if not already in the list
    selectedSings.value.push(addedSign);
    console.log(selectedSings.value);
  } else {
    // Remove chip if already in the list
    selectedSings.value.splice(index, 1);
  }
}

function removeChip(index) {
  selectedSings.value.splice(index, 1);
}

// Computed property to filter signList based on search query
const filteredSigns = computed(() => {
  const listItems = signList.value.slice(7);
  return listItems
    .filter((activity) =>
      activity.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => a.label.localeCompare(b));
});

watch(selectedSings, (val) => {
  console.log(val);
});

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

    const frequentSignsJson = selectedSings.value;

    // 3. If no user found, insert new row with email and physicalInfo
    if (!userProfile) {
      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert([
          {
            email: email,
            frequent_signs: frequentSignsJson,
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
          frequent_signs: frequentSignsJson,
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

const editQuality = () => {
  submitUserMeta().then(() => {
    signsStore.addSignsToUserSigns(selectedSings.value);
    router.push({
      name: "signs",
    });
  });
};
</script>
