<template>
  <div class="q-my-lg" style="max-width: 400px">
    <!-- <q-input v-model="date" filled type="date" hint="Native date" /> -->
    <div class="col-4 question-text q-my-md">Your birthday</div>
    <div class="row q-mb-xl items-center justify-between">
      <div class="col-12">
        <q-input v-model="date" default-view="Years" filled>
          <template v-slot:after>
            <q-btn round dense flat icon="event" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="question-text q-my-md">Height</div>

    <div class="row q-mb-xl items-center">
      <div class="col-3 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          filled
          v-model.number="model"
          type="number"
        />
      </div>

      <div class="col-3 column justify-center q-px-sm" style="height: 100%">
        <q-btn-toggle
          dense
          v-model="unit.height"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'm', value: 'one' },
            { label: 'ft', value: 'two' },
          ]"
        />
      </div>

      <div class="col-3 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          filled
          v-model.number="model"
          type="number"
        />
      </div>

      <div class="col-3 column justify-center q-px-sm" style="height: 100%">
        <q-btn-toggle
          dense
          v-model="unit.height"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'cm', value: 'one' },
            { label: 'In', value: 'two' },
          ]"
        />
      </div>
    </div>

    <div class="col-4 question-text q-my-md">Weight</div>

    <div class="row items-center">
      <div class="col-9 column justify-center" style="height: 100%">
        <q-input
          class="custom-input-style"
          filled
          v-model.number="model"
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
          v-model="unit.weight"
          spread
          class="my-custom-toggle"
          no-caps
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'Kg', value: 'one' },
            { label: 'Lb', value: 'two' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      unit: ref({ weight: "one", height: "one" }),
      name,
      age,
      accept,
      date: ref(""),
      weightUnit: ref("Kg"),
      weightOptions: ref(["Kg", "Lb"]),

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
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
