<template>
  <div class="q-pa-md">
    <div class="row q-py-md" style="min-width: 100%">
      <q-input
        v-model="searchQuery"
        placeholder="Search sign..."
        rounded
        outlined
        class="full-width"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 75vh; min-width: 100%"
    >
      <div class="q-py-sm" style="width: 100%">
        <div class="row justify-between">
          <div class="col-12" v-for="sign in filteredSigns" :key="sign">
            <div class="q-pa-xs" style="width: 100%">
              <q-btn
                unelevated
                no-caps
                class="full-width q-py-md log-button"
                color="green-1"
                @click="logSign(sign)"
                style="border-radius: 10px"
              >
                <div
                  class="row justify-between items-center"
                  style="width: 100%; height: 100%"
                >
                  <div
                    class="col-9 head-text"
                    style="font-size: 20px; font-weight: 700"
                  >
                    <div class="row text-left">
                      {{ sign.label }}
                    </div>
                  </div>
                  <div class="col-1">
                    <q-icon name="mdi-chevron-right" color="black"></q-icon>
                  </div>
                </div>
              </q-btn>
            </div>
          </div>
        </div>

        <div class="row" style="height: 5vh; width: 100%"></div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useSignsStore } from "src/stores/signs";
import { useLogsStore } from "src/stores/logs";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const signsStore = useSignsStore();
const logsStore = useLogsStore();

const router = useRouter();

const expanded = ref(true);

const signList = ref(signsStore.allSigns);

const selectedSing = ref(null);
const searchQuery = ref("");

function logSign(addedSign) {
  logsStore.setAddedSing(addedSign);
  router.push({
    name: "logaddedsign"
  })
}

// Computed property to filter signList based on search query
const filteredSigns = computed(() => {
  const frequentSings = signsStore.userSigns;
  const allSigns = signsStore.allSigns;
  const loggedSings = logsStore.signs_log;

  // Filter the allItems array to get only items that are not in selectedItems
  const remainingItems = allSigns.filter(
    (item) => !frequentSings.some((selected) => selected.id === item.id)
  );

  // Filter the allItems array to get only items that are not in selectedItems
  const finalList = remainingItems.filter(
    (item) => !loggedSings.some((selected) => selected.id === item.id)
  );

  return finalList
    .filter((sign) =>
      sign.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => a.label.localeCompare(b));
});

watch(
  selectedSing,
  (val) => {
    // signsStore.addSignsToUserSigns(selectedSing.value);
  },
  { deep: true }
);

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
