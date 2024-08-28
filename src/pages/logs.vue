<template>
  <div class="">
    <!-- <div class="q-px-md bg-lime">
      <dateSelector class="text-primary"/>
    </div> -->

    <div class="row q-px-sm q-mt-md justify-between" style="width: 100%">
      <div v-for="item in journalList" :key="item.id" class="col-6">
        <div class="q-pa-xs" style="width: 100%">
          <q-btn
            outline
            no-caps
            class="q-ma-xs full-width log-button"
            color="primary"
            push
            style="border-radius: 10px; height: 20vh"
            @click="goToJournal(item.routeName)"
          >
            <div
              class="column justify-between items-start no-wrap"
              style="width: 100%; height: 100%"
            >
              <div
                class="col self-end text-center button-art button-art-1"
              ></div>
              <div class="col-2 head-text q-pb-md q-pt-xs">{{ item.name }}</div>
            </div>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- <div class="q-px-md" style="width: 100%">
      <q-btn
        outline
        no-caps
        class="q-my-xs log-button"
        color="primary"
        push
        style="border-radius: 10px"
        to="/signs"
      >
        <div
          class="row justify-between items-center no-wrap"
          style="width: 100%; height: 100px"
        >
          <div class="head-text q-pb-md q-pt-xs">Signs</div>
          <div class="text-center button-art button-art-1"></div>
        </div>
      </q-btn>

      <q-btn
        outline
        no-caps
        class="full-width q-my-xs log-button"
        color="primary"
        push
        style="border-radius: 10px"
        to="/signs"
      >
        <div
          class="row justify-between items-center no-wrap"
          style="width: 100%; height: 100px"
        >
          <div class="head-text q-pb-md q-pt-xs">Sleep</div>
          <div class="text-center button-art button-art-1"></div>
        </div>
      </q-btn>

      <q-btn
        outline
        no-caps
        class="full-width q-my-xs"
        color="primary"
        push
        style="border-radius: 10px; border: solid 1px"
        to="/signs"
      >
        <div
          class="row justify-between items-center no-wrap"
          style="width: 100%; height: 100px"
        >
          <div class="head-text q-pb-md q-pt-xs">Mood</div>
          <div class="text-center button-art button-art-2"></div>
        </div>
      </q-btn>

      <q-btn
        outline
        no-caps
        class="full-width q-my-xs"
        color="primary"
        push
        style="border-radius: 10px; border: solid 1px"
        to="/signs"
      >
        <div
          class="row justify-between items-center no-wrap"
          style="width: 100%; height: 100px"
        >
          <div class="head-text q-pb-md q-pt-xs">Movement</div>
          <div class="text-center button-art button-art-2"></div>
        </div>
      </q-btn>
      <q-btn
        outline
        no-caps
        class="full-width q-my-xs"
        color="primary"
        push
        style="border-radius: 10px; border: solid 1px"
        to="/signs"
      >
        <div
          class="row justify-between items-center no-wrap"
          style="width: 100%; height: 90px"
        >
          <div class="head-text q-pb-md q-pt-xs">Period</div>
          <div class="text-center button-art button-art-2"></div>
        </div>
      </q-btn>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import dateSelector from "src/components/Reusables/dateselector.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tab = ref("mails");
const journalList = ref([
  {
    name: "Signs",
    img: "",
    routeName: "signs",
  },
  {
    name: "Sleep",
    img: "",
    routeName: "sleep",
  },
  {
    name: "Mood",
    img: "",
    routeName: "mood",
  },
  {
    name: "Movement",
    img: "",
    routeName: "movement",
  },
  {
    name: "Period",
    img: "",
    routeName: "period",
  },
]);

const goToJournal = (val) => {
  router.push({
    name: val,
  });
};
</script>
