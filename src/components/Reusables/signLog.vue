<template>
  <div class="q-my-md sign-logger-card" v-for="option in options">
    <div class="sign-logger-card-text q-pa-md">{{ option.label }}</div>
    <q-item class="q-pb-md q-px-lg">
      <q-item-section>
        <q-slider v-model="volume" :min="0" :max="5" marker-labels>
          <template v-slot:marker-label-group="{ markerList }">
            <q-icon
              v-for="val in [0, 5]"
              :key="val"
              :class="markerList[val].classes"
              :style="markerList[val].style"
              size="sm"
              color="grey-7"
              :name="val === 0 ? 'mdi-cancel' : 'mdi-alert-outline'"
              @click="secondModel = val"
            />
          </template>
        </q-slider>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { ref } from "vue";

const volume = ref(0);

const options = ref([
  {
    label: "Abdominal pain",
    value: "Abdominal pain",
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
]);
</script>
