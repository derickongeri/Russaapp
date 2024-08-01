<template>
  <q-carousel
    v-model="selectedAge"
    :slides="ageOptions"
    transition-prev="fade"
    transition-next="fade"
    swipeable
    animated
    control-color="grey-9"
    height="48px"
    class="text-grey-9 rounded-borders"
    style="border: solid 1px #74b281; border-radius: 24px; min-width: 100%"
  >
    <q-carousel-slide
      v-for="age in ageOptions"
      :key="age"
      :name="age"
      class="column no-wrap items-center flex-center"
    >
      <div
        class="row q-px-md items-center justify-between"
        style="min-width: 100%"
      >
        <div class="text-grey-6 text-center">
          {{ age - 2 }}
        </div>
        <div class="text-grey-6 text-center">
          {{ age - 1 }}
        </div>
        <div
          style="font-size: 20px"
          class="text-center text-primary text-weight-bold"
        >
          {{ age }}
        </div>
        <div class="text-grey-6 text-center">
          {{ age + 1 }}
        </div>
        <div class="text-grey-6 text-center">
          {{ age + 2 }}
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
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
