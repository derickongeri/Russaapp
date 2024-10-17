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
      <div
        class="absolute-top bg-transparent q-pa-md"
        src=""
        style="height: 150px"
      >
        <div
          class="bg-transparent q-mb-md row items-center q-gutter-xs"
          style="position: absolute; bottom: 0%; min-width: 80%"
        >
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="col">
            <q-btn
              :ripple="false"
              flat
              color=""
              icon-right="mdi-chevron-right"
              no-caps
              class="full-width"
              align="between"
            >
              <div class="column items-start justify-left">
                <div class="" style="font-size: 1.75em">Nzisa</div>
                <div class="text-grey-7 text-caption" style="font-size: 1em">
                  Account Profile
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="q-pa-md" style="max-width: 350px; margin-top: 150px">
        <q-list v-for="(link, index) in drawerLinks" :key="index">
          <q-separator class="bg-green-1 q-mx-md"/>
          <q-item class="q-my-sm" clickable :to="link.toPage">
            <q-item-section>
              <q-item-label class="text-primary text-weight-bold head-text" :style="{ fontSize: '1.5em' }">{{
                link.name
              }}</q-item-label>
              <q-item-label v-if="link.caption" caption>{{
                link.caption
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div
        class="absolute-bottom bg-transparent q-pa-md"
        src=""
        style="height: 100px; border-top: 1px grey solid"
      >
        <div
          class="bg-transparent q-mb-md q-ml-xs row items-center q-gutter-md"
          style="position: absolute; bottom: 0%; min-width: 80%"
        >
          <div class="column items-start justify-left">
            <div class="text-weight-bold text-primary" style="font-size: 2.5em">Rusa</div>
            <div class="text-grey-7">by</div>
            <div class="text-grey-7 q-mt-sm">Version 1.0.0 (244)</div>
          </div>
        </div>
      </div>
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

const drawerLinks = ref([
  {
    name: "My settings",
    caption: "birthday, common signs, health background",
    toPage: "/meta/user/update",
  },
  {
    name: "App settings",
    caption: "Manage your account",
    toPage: "/auth",
  },
  {
    name: "Community settings",
    caption: "Edit your community settings",
    toPage: "/community-settings",
  },
  { name: "Share the app", caption: "", toPage: "/share" },
  { name: "Share feedback", caption: "", toPage: "/feedback" },
  { name: "Terms and Conditions", caption: "", toPage: "/terms" },
  { name: "Privacy policy", caption: "", toPage: "/privacy" },
  { name: "Log out", caption: "", toPage: "/logout" },
]);

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
