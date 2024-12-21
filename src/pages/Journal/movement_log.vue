<template>
  <div
    class="q-px-md bg-white"
    style="position: fixed; z-index: 10; top: 12%; width: 100vw"
  >
    <dateSelector />
  </div>

  <div class="q-my-lg" v-for="(activity, index) in activitiesWithTime" :key="activity.name">
    <div class="row q-pl-md items-center justify-between">
      <div class="text-h6 q-my-md question-text">{{ activity.name }}</div>
      <div class="text-grey-9">
        <q-btn flat round color="primary" icon="mdi-delete-outline" size="lg" @click="removeActivity(index)"/>
      </div>
    </div>

    <div class="row q-pr-md items-center justify-between" style="width: 100%">
      <div>
        <span class="q-mx-md header-text text-primary" style="font-weight: 400"
          >{{ activity.time }} minutes</span
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
          @click="decreaseTime(index)"
          style="border-radius: 8px"
        />
        <q-btn
          square
          size="lg"
          unelevated
          color="primary"
          dense
          icon="add"
          @click="increaseTime(index)"
          style="border-radius: 8px"
        />
      </div>


    </div>
    <q-separator class="q-mt-lg"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const timespent = ref(10);

const activitiesWithTime = ref([
  { name: 'Walking', time: 10 },
  { name: 'Running or Jogging', time: 10 },
  { name: 'Cycling', time: 10 },
  // Add more activities here as needed...
]);


const disabled = computed(() => {
  return timespent.value === 0;
});

function increaseTime(index) {
  activitiesWithTime.value[index].time += 1;
}

function decreaseTime(index) {
  if (activitiesWithTime.value[index].time > 0) {
    activitiesWithTime.value[index].time -= 1;
  }
}

function removeActivity(index) {
  activitiesWithTime.value.splice(index, 1);
}


const editQuality = () => {
  router.push({
    name: "movementlog",
  });
};
</script>
