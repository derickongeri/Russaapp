<template>
  <div class="row q-px-md q-my-md head-text" style="width: 100%">Stories</div>

  <div class="horizontal-content q-my-lg">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 35vh; max-width: 100%"
    >
      <div class="row q-px-md q-gutter-x-sm no-wrap">
        <q-item
          class="column items-start justify-around q-pa-md story-card add-story-card"
          clickable
          to="/createpost"
          v-ripple
        >
          <div class="col-4" style="width: 100%">
            <div class="row justify-between items-center" style="width: 100%">
              <div class="">Post a story</div>
              <q-icon size="md" name="mdi-open-in-new" color="primary" />
            </div>
          </div>
          <div class="col"></div>
          <div class="col-1 q-my-sm">
            Share what's on your mind and engage with the community
          </div>
        </q-item>
        <q-item
          clickable
          to="/readpost"
          v-ripple
          v-for="n in 10"
          :key="n"
          class="column justify-between q-pa-md story-card read-story-card"
        >
          <div class="col-3">Title</div>
          <div class="col">{{ lorem }}</div>
          <div class="col-1">Author</div>
        </q-item>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";

const lorem = ref(
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
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

<style lang="scss"></style>
