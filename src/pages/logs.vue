<template>
  <div class="">
    <div class="" style="width: 100%">
      <q-tabs
        v-model="tab"
        no-caps
        outside-arrows
        class="bg-white text-primary q-ml-md"
        content-class="tab-text"
      >
        <q-tab name="mails">
          <div class="tab-text">Signs</div>
        </q-tab>
        <q-tab name="alarms">
          <div class="tab-text">Sleep</div>
        </q-tab>
        <q-tab name="movies">
          <div class="tab-text">Mood</div>
        </q-tab>
        <q-tab name="movement">
          <div class="tab-text">Movement</div>
        </q-tab>
        <q-tab name="period">
          <div class="tab-text">Period</div>
        </q-tab>
      </q-tabs>
      <q-separator />
      <div class="q-px-md">
        <dateSelector />
      </div>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="" name="mails">
          <!-- <dateSelector /> -->
          <div class="head-text q-pb-md q-pt-xs">
            Have you noticed any signs?
          </div>
          <!-- <div class="text-h6 tab-header q-py-lg">Select Date</div> -->

          <!-- <div class="text-h6 tab-header q-py-lg">Signs</div> -->
          <q-btn
            align="between"
            no-caps
            unelevated
            class="full-width q-my-lg tab-action-btn"
            color="primary"
            label="Select signs"
            icon-right="mdi-arrow-right-thin"
            size="lg"
            to="/signs"
          />
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";

const tab = ref("mails");
</script>
