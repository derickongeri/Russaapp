<template>
  <div
    class="question-text text- text-grey-9 q-pa-md"
    style="width: 100%; margin: auto; font-weight: 700; font-size: 24px"
  >
    Have you performed any physical activites today?
  </div>

  <div class="row q-pa-md" style="width: 100vw; min-height: 20vh">
    <div class="bg-green-1 q-pa-sm" style="width: 100%; min-height: 100%">
      <q-chip
        size="lg"
        outline
        color="primary"
        v-for="(chip, index) in selectedActivities"
        :key="chip"
        removable
        @remove="removeChip(index)"
      >
        {{ chip }}
      </q-chip>
    </div>
  </div>

  <div class="q-pa-md" style="width: 100%">
    <q-list class="rounded-borders">
      <q-expansion-item v-model="expanded" label="Common activites">
        <template v-slot:header>


          <q-item-section>
            <div class="header-text text-grey-9" style="font-size: 20px;">
              Common activites
            </div>

          </q-item-section>


        </template>
        <div class="row justify-between">
          <div class="col-6" v-for="activity in activities.slice(0, 7)" :key="activity">
            <div class="q-pa-xs" style="width: 100%">
              <q-btn
                unelevated
                no-caps
                class="full-width log-button"
                :color="
                  selectedActivities.includes(activity)
                    ? 'secondary'
                    : 'green-1'
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
                    <div class="row text-left" :style="{'color': selectedActivities.includes(activity) ? '#ffffff' : '#1D1D1D'}">
                      {{ activity }}
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
      All activites
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
      <div class="col-6" v-for="activity in filteredActivities" :key="activity">
        <div class="q-pa-xs" style="width: 100%">
          <q-btn
            unelevated
            no-caps
            class="full-width log-button"
            :color="
              selectedActivities.includes(activity) ? 'secondary' : 'green-1'
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
                :style="{'color': selectedActivities.includes(activity) ? '#ffffff' : '#1D1D1D'}"
              >
                <div class="row text-left">
                  {{ activity }}
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
          label="Next: Duration"
          @click="editQuality()"
        />
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const expanded = ref(true);

const activities = ref([
  "Chores",
  "Walking",
  "Running or Jogging",
  "Cycling",
  "Swimming",
  "Stretching",
  "Yoga",
  "Strength Training",
  "Dancing",
  "Climbing Stairs",
  "Gardening",
  "House Cleaning",
  "Playing Sports",
  "Hiking",
  "Pilates",
  "Aerobics",
  "Jumping Rope",
  "Skipping",
  "Playing with Pets",
  "Martial Arts",
]);
const selectedActivities = ref([]);
const searchQuery = ref("");

function addChip(activity) {
  if (!selectedActivities.value.includes(activity)) {
    selectedActivities.value.push(activity);
  }
}

function toggleChip(activity) {
  const index = selectedActivities.value.indexOf(activity);
  if (index === -1) {
    // Add chip if not already in the list
    selectedActivities.value.push(activity);
  } else {
    // Remove chip if already in the list
    selectedActivities.value.splice(index, 1);
  }
}

function removeChip(index) {
  selectedActivities.value.splice(index, 1);
}

// Computed property to filter activities based on search query
const filteredActivities = computed(() => {
  const listItems = activities.value.slice(7);
  return listItems.filter((activity) =>
    activity.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).sort((a, b) => a.localeCompare(b));;
});

const editQuality = () => {
  router.push({
    name: "movementlog",
  });
};
</script>
