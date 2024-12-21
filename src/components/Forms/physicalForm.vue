<template>
  <div class="q-my-lg" style="max-width: 400px">
    <!-- <q-input v-model="date" filled type="date" hint="Native date" /> -->
    <div class="col-4 question-text q-my-md">Your birthday</div>
    <div class="row q-mb-xl items-center justify-between">
      <div class="col-12">
        <q-input
          outlined
          v-model="physicalInfo.birthday"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="physicalInfo.birthday">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="question-text q-my-md">Height</div>

    <div class="row q-mb-xl items-center">
      <div class="col-3 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          outlined
          v-model.number="physicalInfo.height.value"
          type="number"
        />
      </div>

      <div class="col-3 column justify-center q-px-sm" style="height: 100%">
        <q-btn-toggle
          dense
          v-model="physicalInfo.height.unit"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'm', value: 'm' },
            { label: 'ft', value: 'ft' },
          ]"
        />
      </div>

      <div class="col-3 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          outlined
          v-model.number="physicalInfo.height.value_sec"
          type="number"
        />
      </div>

      <div class="col-3 column justify-center q-px-sm" style="height: 100%">
        <q-btn-toggle
          dense
          v-model="physicalInfo.height.unit_sec"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'cm', value: 'cm' },
            { label: 'In', value: 'In' },
          ]"
        />
      </div>
    </div>

    <div class="col-4 question-text q-my-md">Weight</div>

    <div class="row items-center">
      <div class="col-9 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          outlined
          v-model.number="physicalInfo.weight.value"
          type="number"
        >
          <!-- <div
            class="bg-white q-px-md caption-text custom-input-label text-primary"
          >
            Your Age
          </div> -->
        </q-input>
      </div>

      <div class="col-3 column justify-center q-px-sm" style="height: 100%">
        <q-btn-toggle
          dense
          v-model="physicalInfo.weight.unit"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'Kg', value: 'kg' },
            { label: 'Lb', value: 'lb' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, watch, computed, onMounted } from "vue";
import { useMetaStore } from "src/stores/userMeta";

const store = useMetaStore();

const physicalInfo = ref({
  birthday: "",
  height: {
    value: "",
    unit: "m", // Default unit for height is meters
    value_sec: "",
    unit_sec: "cm", // Default unit for height is meters
  },
  weight: {
    value: "",
    unit: "kg", // Default unit for weight is kilograms
  },
});

const physicaldata = computed(() => {
  return physicalInfo.value;
});

watch(
  physicaldata,
  (val) => {
    store.addPhysicalInfo(val);
  },
  { deep: true }
);

onMounted(() => {
  physicalInfo.value = store.physicalInfo;
});
</script>

<style>
.custom-input-label {
  position: absolute;
  top: -10%;
  z-index: 10;
  font-weight: 700;
  font-size: 20px;
}

.my-custom-toggle {
  border: 0px solid #829121;
}

.input-row {
  height: 15vh;
}

/* .custom-input-style {
  border: 1px solid #829121;
} */
</style>
