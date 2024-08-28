<template>
  <div class="q-pa-md" style="width: 100vw">

    <div class="row items-center">
      <q-avatar size="40px" color="primary" text-color="white" icon="bluetooth" />
      <div
      class="q-px-md header-text text-primary"
      style="font-size: 20px;"
    >
      Username
    </div>
    </div>


    <div
      class="q-py-md header-text text-primary"
      style="width: 100%; line-height: 1.2em"
    >
      A journey through menopause: Embracing Change
    </div>

    <div
      class="q-py-md header-text text-grey-9"
      style="font-size: 20px; font-weight: 300; line-height: 1.5em; width: 100%"
    >
      {{ story }}
    </div>

    <div
      class="q-py-md header-text text-grey-9"
      style="font-size: 20px; font-weight: 300; width: 100%"
    >
      <q-chip
        size="md"
        outline
        color="grey-7"
        v-for="(chip, index) in tags"
        :key="chip"
      >
        {{ chip }}
      </q-chip>
    </div>

    <div class="q-py-md header-text text-primary" style="width: 100%">
      Comments
    </div>
  </div>

  <div class="">
    <q-list v-for="n in 5">
      <q-item>
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="bluetooth" />
        </q-item-section>
        <q-item-section>
          <div class="row items-center">
            <div class="header-text text-primary" style="font-size: 20px">
              Username
            </div>

            <div class="caption-text" style="font-style: italic">
              ・ 5 mins ago
            </div>
          </div>

          <div
            class="q-py-md header-text text-grey-9"
            style="
              font-size: 20px;
              font-weight: 300;
              line-height: 1.5em;
              width: 100%;
            "
          >
            {{ commentText }}
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="row" style="width: 100%; min-height: 10vh"></div>
  </div>
  <div
    class="q-px-md bg-white"
    style="position: fixed; bottom: 0%; width: 100%"
  >
    <div class="q-py-md header-text text-primary" style="width: 100%">
      <div class="story-box items-center row" style="width: 100%">
        <q-input
          ref="input"
          class="col-10 header-text q-pl-sm"
          style="font-size: 20px; line-height: 1.5em"
          v-model="comment"
          borderless
          placeholder="Add comment"
          autogrow
          @focus="visibleKeybord = true"
          @blur="visibleKeybord = false"
        />
        <div class="col-2 column justify-around items-center">
          <q-btn flat round color="primary" icon="mdi-send" />
        </div>
      </div>
    </div>

    <div
      v-if="visibleKeybord"
      class="row"
      style="width: 100%; min-height: 30vh"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import stories from "src/components/Reusables/storiesSlides.vue";
import { Keyboard } from '@capacitor/keyboard';

const visibleKeybord = ref(false);

const input = ref(null);

const tab = ref("mails");
const comment = ref("");
const title = ref("");
const story = ref(
  "It was a brisk autumn morning when Susan first noticed the subtle changes in her body. At 48, she had always been active, enjoying long hikes and yoga sessions, but lately, she felt a bit more tired than usual. The nights were filled with restless tossing, often waking up drenched in sweat, and her mood seemed to shift like the winds."
);

const commentText = ref(
  "At first, she brushed it off as stress from work or the changing weather. But as the weeks went by, Susan began to suspect that something more significant was happening."
);

const tags = ref([
  "PMS",
  "Perimenopause",
  "Anxiety",
  "HRT",
  "Low mood or depression",
]);

Keyboard.addListener('keyboardWillHide', () => {
  visibleKeybord.value = false;
});

const thumbStyle = ref({
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be300",
    width: "5px",
    opacity: 0.75,
  }),
  barStyle = ref({
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be300",
    width: "9px",
    opacity: 0.2,
  });
</script>

<style>
.story-box {
  border: solid 1px green;
  border-radius: 8px;
}
</style>
