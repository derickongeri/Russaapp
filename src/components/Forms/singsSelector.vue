<template>
  <!-- <div class="question-text shadow-bottom">
    Select any menopause signs you have frequently noticed?
  </div> -->
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 65vh; min-width: 100%"
  >
    <div class="row q-py-sm" style="width: 100%; min-height: 20vh">
      <div class="bg-lime-1 q-pa-sm" style="width: 100%; min-height: 100%">
        <q-chip
          size="lg"
          outline
          color=""
          v-for="(chip, index) in selectedSings"
          :key="index"
          removable
          @remove="removeChip(index)"
        >
          {{ chip.label }}
        </q-chip>
      </div>
    </div>

    <div class="q-py-sm" style="width: 100%">
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
              v-for="sign in signList.slice(0, 7)"
              :key="sign"
            >
              <div class="q-pa-xs" style="width: 100%">
                <q-btn
                  unelevated
                  no-caps
                  class="full-width log-button"
                  :color="isSelected(sign) ? 'secondary' : 'green-1'"
                  @click="toggleChip(sign)"
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
                          color: selectedSings.includes(sign)
                            ? '#ffffff'
                            : '#1D1D1D',
                        }"
                      >
                        {{ sign.label }}
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

    <div class="q-py-sm" style="width: 100%">
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
        <div class="col-6" v-for="sign in filteredSigns" :key="id">
          <div class="q-pa-xs" style="width: 100%">
            <q-btn
              unelevated
              no-caps
              class="full-width log-button"
              :color="isSelected(sign) ? 'secondary' : 'green-1'"
              @click="toggleChip(sign)"
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
                    color: selectedSings.includes(sign)
                      ? '#ffffff'
                      : '#1D1D1D',
                  }"
                >
                  <div class="row text-left">
                    {{ sign.label }}
                  </div>
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row" style="height: 20vh; width: 100%"></div>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useSignsStore } from "src/stores/signs";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const signsStore = useSignsStore();

const router = useRouter();

const expanded = ref(true);

const signList = ref(signsStore.allSigns);

const selectedSings = ref(signsStore.userSigns);
const searchQuery = ref("");

function addChip(sign) {
  if (!selectedSings.value.includes(sign)) {
    selectedSings.value.push(sign);
  }
}

function toggleChip(addedSign) {
  const index = selectedSings.value.indexOf(addedSign);
  if (index === -1) {
    // Add chip if not already in the list
    selectedSings.value.push(addedSign);
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
    .filter((sign) =>
      sign.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => a.label.localeCompare(b));
});

const isSelected = (sign) => selectedSings.value.includes(sign);

watch(selectedSings, (val) => {
  signsStore.addSignsToUserSigns(selectedSings.value);
},{deep: true});

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
