<template>
  <div class="row q-pb-md items-center">
    <div class="question-text">My story is about</div>
    <q-space />
    <q-btn icon="close" flat round dense v-close-popup />
  </div>

  <div class="row q-py-sm q-mb-md" style="width: 100%; min-height: 20vh">
    <div class="bg-green-1 q-pa-sm" style="width: 100%; min-height: 100%">
      <div
        v-if="selectedTagArray.length === 0"
        class="column items-center justify-center"
        style="min-height: 100%"
      >
        Nothing selected
      </div>
      <q-chip
        size="lg"
        outline
        v-for="(chip, index) in selectedTagArray"
        :key="index"
        removable
        @remove="removeChip(chip)"
      >
        {{ chip.label }}
      </q-chip>
    </div>
  </div>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 40vh; min-width: 100%"
  >
    <div class="q-py-sm" style="width: 100%">
      <q-list class="rounded-borders">
        <q-expansion-item
          class="header-text text-grey-9 q-my-xs"
          v-model="expandedState[category]"
          :header-class="getHeaderClass(category)"
          style="font-size: 20px"
          v-for="category in uniqueCategories"
          :key="category"
          :label="category"
        >
          <div class="row justify-between">
            <div
              class="col-6"
              v-for="sign in tagsList.filter(
                (tag) => tag.category === category
              )"
              :key="sign.label"
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
                      style="font-size: 20px; font-weight: 500"
                    >
                      <div
                        class="row text-left"
                        :style="{
                          color: isSelected(sign) ? '#ffffff' : '#1D1D1D',
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
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storiesStore } from "src/stores/stories";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = storiesStore();
const router = useRouter();
const expanded = ref(false);
const tagsList = ref(store.allTags);

// Track expanded state for each category
const expandedState = ref({});

// Get unique categories from tagsList
const uniqueCategories = computed(() => {
  return [...new Set(tagsList.value.map((tag) => tag.category))];
});

const selectedTagSet = ref(new Set(store.storyTags.map((tag) => tag.label)));
const selectedTagArray = computed(() =>
  Array.from(selectedTagSet.value, (label) =>
    tagsList.value.find((tag) => tag.label === label)
  )
);

function toggleChip(addedTag) {
  if (selectedTagSet.value.has(addedTag.label)) {
    selectedTagSet.value.delete(addedTag.label);
  } else {
    selectedTagSet.value.add(addedTag.label);
  }
}

function removeChip(tag) {
  selectedTagSet.value.delete(tag.label);
}

const isSelected = (tag) => selectedTagSet.value.has(tag.label);

watch(
  selectedTagSet,
  () => {
    console.log("Updated selectedTagArray:", selectedTagArray.value);
    store.addStoryTags(selectedTagArray.value);
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  selectedTagSet.value = new Set(store.storyTags.map((tag) => tag.label));
});

const thumbStyle = ref({
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be300",
  width: "5px",
  opacity: 0.75,
});
const barStyle = ref({
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be300",
  width: "9px",
  opacity: 0.2,
});

// Get dynamic header class for expansion item
function getHeaderClass(category) {
  return expandedState.value[category] ? "expanded-header" : "collapsed-header";
}
</script>

<style>
.expand-icon {
  color: #74b281;
}

.expanded-header {
  background-color: white;
  color: #404715;
  font-weight: normal;
}

.collapsed-header {
  background-color: #FFCCCC50;
  color: #1d1d1d;
  font-weight: normal;
}

.expansion-header {
  background-color: #ccccff50;
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
