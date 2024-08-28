<template>
  <div class="q-my-">
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

  <div class="q-my-md" v-for="option in options">
    <div class="row items-center justify-between">
      <div class="col-4">
        <div class="sign-logger-card-text q-px-md">{{ option.label }}</div>
      </div>

      <div class="col">
        <div class="row items-center" style="width: 100">
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
              class="full-width bg-lime-1 text-grey-6"
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
</template>

<script setup>
import { ref } from "vue";

const volume = ref(0);

const options = ref([
  {
    label: "Abdominal pain",
    value: "Abdominal pain",
    rating: "none",
  },
  {
    label: "Headaches",
    value: "Headaches",
    rating: "none",
  },
  {
    label: "Hot flashes",
    value: "Hot flashes",
    rating: "none",
  },
  {
    label: "Mood swings",
    value: "Mood swings",
    rating: "none",
  },
  {
    label: "Night sweats",
    value: "Night sweats",
    rating: "none",
  },
  {
    label: "Osteoporosis",
    value: "Osteoporosis",
    rating: "none",
  },
  {
    label: "Rapid heartbeat",
    value: "Rapid heartbeat",
    rating: "none",
  },
]);

const setColor = (option, val, color) => {
  return option === val ? color : "grey-4";
};
</script>
