<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="main-header text-white" height-hint="98">
      <div class="q-mt-xl header-text">

          <!-- <q-avatar size="xl" color="" text-color="white" icon="mdi-menu" /> -->
          <div class="row q-gutter-xs items-center header-text">
            <q-btn round flat size="lg" color="white" icon="mdi-menu" />
            {{ currentRouteTitle }}
          </div>

      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="main-footer">
      <div class="q-gutter-y-xs" style="width: 90vw">
        <q-tabs
          class="nav-text q-mt-none"
          indicator-color="transparent"
          active-color="primary"
          active-class="active-tab"
        >
          <q-route-tab
            no-caps
            label="Home"
            icon="mdi-home-outline"
            to="/home"
            exact
          />
          <q-route-tab no-caps label="Siku" icon="mdi-plus" to="/siku" exact />
          <q-route-tab
            no-caps
            label="Maarifa"
            icon="mdi-lightbulb-on-outline"
            to="/maarifa"
            exact
          />
          <q-route-tab
            no-caps
            label="Utu"
            icon="mdi-account-group-outline"
            to="/utu"
            exact
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";


export default {
  name: "contentLayout",
  setup() {
    const route = useRoute();

    // Computed property to get the title from the current route meta
    const currentRouteTitle = computed(() => {
      return route.meta.title || "Default Title";
    });

    return {
      currentRouteTitle,
    };
  },
};
</script>
