<template>
  <div class="q-py-md" style="width: 100%">
    <div class="row items-center q-gutter-x-sm">
      <q-avatar color="green-2" text-color="white">J</q-avatar>

      <div>
        <q-btn
          size="sm"
          no-caps
          outline
          rounded
          color="primary"
          label="Link to profile"
          icon-right="mdi-chevron-down"
          @click="open('bottom')"
        />
      </div>
    </div>

    <div class="row head-text q-mt-md">Story title</div>
    <div class="caption-text q-my-sm">Short tile to summarise you story</div>
    <q-input
      class="story-box q-px-sm"
      v-model="text"
      borderless
      placeholder="Tap to start typing"
    />
  </div>

  <div class="q-py-md" style="width: 100%">
    <div class="row head-text">Your story</div>
    <div class="caption-text q-my-sm">Short tile to summarise you story</div>
    <q-input
      class="story-box q-px-sm"
      v-model="text"
      borderless
      placeholder="Tap to start typing"
      type="textarea"
    />
  </div>

  <div class="row head-text q-mt-md">Tags</div>
  <div class="caption-text q-my-sm">
    Make it easier to discover your story by adding tags
  </div>

  <q-btn
    no-caps
    outline
    color="primary"
    style="width: 100%; min-height: 10vh; border-radius: 8px"
  >
    <div class="column q-pa-md">
      <div v-if="noTags" class="col text-caption">Tap to add tags</div>

      <div class="col">
        <q-chip
          outline
          removable
          v-model="icecream"
          @remove="log('Icecream')"
          color="grey-7"
          text-color="white"
        >
          Ice cream
        </q-chip>
        <q-chip
          removable
          outline
          v-model="eclair"
          @remove="log('Icecream')"
          color="teal"
          text-color="white"
        >
          Eclair
        </q-chip>
        <q-chip
          removable
          outline
          v-model="cupcake"
          @remove="log('Icecream')"
          color="orange"
          text-color="white"
        >
          Cupcake
        </q-chip>
        <q-chip
          removable
          outline
          v-model="gingerbread"
          @remove="log('Icecream')"
          color="red"
          text-color="white"
        >
          Gingerbread (disable)
        </q-chip>
      </div>

      <div class="col text-caption">
        <div class="row">Tap to add more tags</div>
      </div>
    </div>
  </q-btn>

  <div class="row q-py-md items-center justify-end" style="width: 100%">
    <!-- <q-btn
      no-caps
      class="tab-text"
      size="lg"
      unelevated
      rounded
      outline
      color="primary"
      label="Cancel"
      style="width: 40%"
    /> -->
    <q-btn
      no-caps
      class="tab-text"
      size="lg"
      unelevated
      rounded
      color="primary"
      label="Post"
      style="width: 40%"
    />
  </div>
  <q-dialog v-model="dialog" :position="position">
    <q-card style="width: 100%; border-radius: 20px">
      <q-card-section class="row q-my-lg items-center justify-center no-wrap">
        <div class="header-text text-grey-7">Share story as</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> DO </q-avatar>
          </q-item-section>

          <q-item-section>Link post to my profile</q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white"> A </q-avatar>
          </q-item-section>

          <q-item-section>Share your story anonymously</q-item-section>
        </q-item>
      </q-card-section>
      <q-separator class="q-mb-lg" />
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const dialog = ref(false);
    const position = ref("top");

    const icecream = ref(true);
    const eclair = ref(true);
    const cupcake = ref(true);
    const gingerbread = ref(true);

    return {
      icecream,
      eclair,
      cupcake,
      gingerbread,
      text: ref(""),

      dialog,
      position,

      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
    };
  },
};
</script>

<style>
.story-box {
  border: solid 1px green;
  border-radius: 8px;
}
</style>
