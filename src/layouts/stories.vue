<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="main-header text-white" height-hint="98">
      <div class="q-mt-lg header-text">
        <!-- <q-avatar size="xl" color="" text-color="white" icon="mdi-menu" /> -->
        <div class="row q-gutter-xs items-center header-text">
          <q-btn
            round
            flat
            size="lg"
            color="white"
            icon="mdi-keyboard-backspace"
            @click="goBack"
          />
          {{ currentRouteTitle }}
        </div>
      </div>
    </q-header>

    <q-page-container>
      <transition
        name="slide-fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        ><router-view
      /></transition>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import dateSelector from "src/components/Reusables/dateselector.vue";

const route = useRoute();

const router = useRouter();

// Computed property to get the title from the current route meta
const currentRouteTitle = computed(() => {
  return route.meta.title || "Default Title";
});


</script>

<style scoped>
/* Define the sliding transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 100ms ease, opacity 100ms ease;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
