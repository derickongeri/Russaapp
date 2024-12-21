<template>
  <div
    class="q-ma-md q-py-lg header-text text-primary"
    style="font-size: xx-large"
  >
    {{ displayDate }}
  </div>
  <div class="q-my-md">
    <div class="row items-center justify-between">
      <div class="col text-right q-pr-lg text-grey-6">NONE</div>

      <div class="col">
        <div class="row q-gutter-x-md q-pr-md" style="width: 100">
          <!-- <div class="col text-grey-6">NONE</div> -->
          <div class="col text-center text-grey-6">LOW</div>
          <div class="col text-center text-grey-6">MED</div>
          <div class="col text-center text-grey-6">HIGH</div>
        </div>
      </div>
    </div>
  </div>

  <div class="q-my-md">
    <div class="row items-center justify-between">
      <div class="col-4 q-px-sm">
        <div
          class="sign-logger-card-text q-px-md"
          style="font-weight: 700; font-size: x-large"
        >
          {{ option.label }}
        </div>
      </div>

      <div class="col">
        <div class="row items-center q-pr-md">
          <div class="col column items-center">
            <q-radio
              v-model="option.rating"
              checked-icon="fa-regular fa-circle-check"
              unchecked-icon="fa-regular fa-circle"
              val="none"
              size="xl"
            />
          </div>
          <div class="">
            <q-btn-toggle
              class="fit text-grey-6"
              v-model="option.rating"
              outline
              dense
              rounded
              toggle-color="primary"
              :options="[
                { value: 'one', slot: 'one' },
                { value: 'two', slot: 'two' },
                { value: 'three', slot: 'three' },
              ]"
            >
              <template v-slot:one>
                <div
                  class="q-pl-md q-pr-sm"
                  style="border-radius: 20px 0px 0px 20px"
                >
                  <q-icon
                    :color="setColor(option.rating, 'one', 'green')"
                    name="fa-regular fa-face-meh"
                    size=""
                  />
                </div>
              </template>

              <template v-slot:two>
                <div
                  class="q-px-md"
                  style="
                    border-right: solid 1px grey;
                    border-left: solid 1px grey;
                  "
                >
                  <q-icon
                    :color="setColor(option.rating, 'two', 'orange')"
                    name="fa-regular fa-face-frown-open"
                    size=""
                  />
                </div>
              </template>

              <template v-slot:three>
                <div
                  class="q-pr-md q-pl-sm"
                  style="border-radius: 0 20px 20px 0px"
                >
                  <q-icon
                    :color="setColor(option.rating, 'three', 'pink')"
                    name="fa-regular fa-face-frown"
                    size=""
                  />
                </div>
              </template>
            </q-btn-toggle>
          </div>
        </div>
        <!-- <q-item class="q-pb-md">
          <q-item-section>
            <q-slider v-model="option.rating" :min="0" :max="5" marker-labels>
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
        </q-item> -->
      </div>
    </div>
  </div>

  <div class="q-mt-xl" style="width: 100%">
    <div
      class="row justify-center q-ma-md bg-green-1 q-py-sm"
      style="border-radius: 10px; font-size: large"
    >
      <q-checkbox
        class="q-px-md"
        size="md"
        name="accept_agreement"
        v-model="acceptAgreement"
        label="Add to My list of frequent signs"
        left-label
      />
    </div>
  </div>

  <div class="row q-mt-md q-pa-md" style="width: 100%">
    <q-btn
      no-caps
      class="tab-text"
      size="lg"
      unelevated
      rounded
      color="primary"
      label="Save"
      :disable="!submitState"
      style="width: 100%"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import useSupabase from "src/boot/supabase";
import { useSignsStore } from "src/stores/signs";
import { useLogsStore } from "src/stores/logs";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { supabase } = useSupabase();
const signsStore = useSignsStore();
const logsStore = useLogsStore();

const displayDate = ref(logsStore.displayDate);

const option = ref({});
const acceptAgreement = ref(false);

const setColor = (option, val, color) => {
  return option === val ? color : "grey-4";
};

const submitState = computed(() => {
  return option.value.rating !== "none"
})

onMounted(() => {
  const sign = logsStore.added_sign;

  option.value = {
    label: sign.label,
    value: sign.label,
    rating: "none",
  };
});

watch(
  option,
  (val) => {
    // console.log(val);
    // logsStore.addSignsLog(val);
  },
  { deep: true }
);
</script>
