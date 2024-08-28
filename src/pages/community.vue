<template>
  <q-page class="q-pa-none">

    <stories />

    <div class="row q-px-md q-my-md head-text" style="width: 100%">
      Experiments
    </div>

    <div class="horizontal-content q-my-lg">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 35vh; max-width: 100%"
      >
        <div class="row q-px-sm no-wrap">
          <div
            v-for="n in 10"
            :key="n"
            style="width: 85vw; height: 30vh"
            class="q-pa-sm"
          >
            <q-card class="my-card" flat style="border-radius: 20px">
              <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

              <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </div>

    <div class="row q-px-md q-my-md head-text" style="width: 100%">Treatment reviews</div>

    <div class="row q-px-md" style="width: 100%">
      <div class="card-home q-my-md"></div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";
import stories from "src/components/Reusables/storiesSlides.vue";

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

<style lang="scss">
.carousel {
  background-color: #f8f9f4;
}
</style>
