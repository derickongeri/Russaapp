<template>
  <div class="row items-center q-mt-md" style="width: 90%">
    <div class="col selection-header text-center">Weight</div>
    <div class="col">
      <q-carousel
        v-model="selectedAge"
        :slides="ageOptions"
        vertical
        transition-prev="fade"
        transition-next="fade"
        swipeable
        animated
        control-color="grey-9"
        height="150px"
        class="text-grey-9 rounded-borders"
        style="min-width: 100%"
      >
        <q-carousel-slide
          v-for="age in ageOptions"
          :key="age"
          :name="age"
          class="row no-wrap items-center flex-center"
          style="min-width: 100%"
        >
          <div class="items-center justify-between" style="min-width: 100%">
            <div class="text-grey-6 q-my-sm text-center">
              {{ age - 1 }}
            </div>
            <q-separator class="bg-black" />
            <div
              style="font-size: 20px"
              class="q-my-sm text-center text-primary text-weight-bold"
            >
              {{ age }}
            </div>
            <q-separator class="bg-black" />
            <div class="text-grey-6 q-my-sm text-center">
              {{ age + 1 }}
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="col selection-header text-center">Kg</div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Height",
  setup() {
    const minAge = 18;
    const maxAge = 100;
    const numOptions = 7; // Number of options visible at once
    const ageOptions = Array.from(
      { length: maxAge - minAge + 1 },
      (_, i) => minAge + i
    );

    const selectedAge = ref(Math.floor((maxAge - minAge) / 2) + minAge);

    const visibleOptions = computed(() => {
      const middleIndex = ageOptions.indexOf(selectedAge.value);
      const start = Math.max(middleIndex - Math.floor(numOptions / 2), 0);
      const end = Math.min(start + numOptions, ageOptions.length);

      return ageOptions.slice(start, end);
    });

    return {
      ageOptions: visibleOptions,
      selectedAge,
    };
  },
};
</script>
