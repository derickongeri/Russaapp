<template>
  <div class="row question-text">Do you know about your menopause Status?</div>
  <div>
    <q-option-group
      v-model="status"
      :options="statusOptions"
      color="secondary"
      inline
      size="lg"
    >
      <template v-slot:label="opt">
        <div class="row items-center">
          <span style="font-size: 20px" class="">{{
            opt.label
          }}</span>
        </div>
      </template>
    </q-option-group>
  </div>
  <div class="row question-text">What is your menopause status?</div>
  <div class="">
    <q-option-group
      v-model="group"
      :options="options"
      color="secondary"
      size="lg"
    >
      <template v-slot:label="opt">
        <div class="row items-center">
          <span style="font-size: 20px" class="">{{
            opt.label
          }}</span>
        </div>
      </template>
    </q-option-group>
  </div>

  <q-card class="q-pa-md" flat bordered>
    <q-list bordered padding>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label class="label-text">Premenopause</q-item-label>
          <q-item-label class="caption-text" caption>
            There are no changes to my cycle/period and no menopause symptoms.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label class="label-text">Perimenopause </q-item-label>
          <q-item-label class="caption-text" caption>
            There are some changes to my periods and/or I have some symptoms but
            I have not gone 12 consecutive months without a period.
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label class="label-text">Menopause / Postmenopause </q-item-label>
          <q-item-label class="caption-text" caption>
            I have had no periods for the last 12 months or had both ovaries
            removed.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const group = ref("");
const status = ref("");

const statusOptions = ref([
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
]);

const options = ref([
  {
    label: "Premenopause",
    value: "op1",
  },
  {
    label: "Perimenopause",
    value: "op2",
  },
  {
    label: "Menopause / Postmenopause",
    value: "op3",
  },
]);
</script>
