<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if="onboarduser"
      class="main-header text-white"
      height-hint="98"
    >
      <div class="q-mt-xl header-text">
        <!-- <q-avatar size="xl" color="" text-color="white" icon="mdi-menu" /> -->
        <div class="row q-gutter-xs items-center header-text">
          <q-btn
            round
            flat
            size="lg"
            color="white"
            icon="mdi-menu"
            @click="toggleLeftDrawer"
          />
          {{ currentRouteTitle }}
        </div>
      </div>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <q-page v-if="!onboarduser" class="flex flex-center">
        <onboarding />
      </q-page>
      <router-view v-else />
    </q-page-container>

    <q-footer v-if="onboarduser" bordered class="main-footer">
      <div class="q-gutter-y-xs" style="width: 90vw">
        <q-tabs
          class="nav-text q-mt-none"
          indicator-color="transparent"
          active-color="primary"
          active-class="active-tab"
        >
          <q-route-tab
            no-caps
            label="Discover"
            :icon="getIcon('/', 'mdi-compass', 'mdi-compass-outline')"
            to="/"
            exact
          />
          <q-route-tab
            no-caps
            label="Utu"
            :icon="getIcon('/utu', 'mdi-comment', 'mdi-comment-outline')"
            to="/utu"
            exact
          />
          <q-route-tab
            no-caps
            label="Siku"
            :icon="getIcon('/siku', 'mdi-notebook', 'mdi-notebook-outline')"
            to="/siku"
            exact
          />
          <q-route-tab
            no-caps
            label="Maarifa"
            :icon="
              getIcon('/maarifa', 'mdi-lightbulb', 'mdi-lightbulb-outline')
            "
            to="/maarifa"
            exact
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { isUserOnboarded } from "src/utils/onboarding";
import onboarding from "src/components/Reusables/onboarding.vue";

const $q = useQuasar();

const route = useRoute();

const onboarded = ref($q.localStorage.getItem("userOnboarded") === "true");
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onboarduser = computed(() => {
  return $q.localStorage.getItem("userOnboarded");
});

// Computed property to get the title from the current route meta
const currentRouteTitle = computed(() => {
  return route.meta.title || "Default Title";
});

const getIcon = (to, filledIcon, outlinedIcon) => {
  return route.path === to ? filledIcon : outlinedIcon;
};

function completeOnboarding() {
  setOnboarded(true);
}

function setOnboarded(value) {
  $q.localStorage.set("userOnboarded", value);
  const event = new Event("storage");
  event.key = "userOnboarded";
  event.newValue = value;
  window.dispatchEvent(event);
}

window.addEventListener("storage", (event) => {
  if (event.key === "userOnboarded") {
    onboarded.value = event.newValue === "true";
  }
});

onMounted(() => {
  console.log("User onboard", onboarded.value);
});
</script>
