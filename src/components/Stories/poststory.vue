<template>
  <div class="q-py-md" style="width: 100%">
    <div class="row items-center q-gutter-x-sm">
      <q-avatar v-if="shareAnonymously" color="secondary" text-color="white">
        A
      </q-avatar>
      <q-avatar v-else color="green-2" text-color="white">{{
        username.charAt(0)
      }}</q-avatar>
      <div>
        <q-btn
          size="sm"
          no-caps
          outline
          rounded
          color="primary"
          :label="profilebtnLabel"
          icon-right="mdi-chevron-down"
          @click="open('bottom')"
        />
      </div>
    </div>

    <div class="row head-text q-mt-md">Headline</div>
    <div class="caption-text q-my-sm">Short tile to summarise you story</div>
    <q-input
      class="story-box q-px-sm"
      v-model="story.title"
      borderless
      placeholder="Tap to start typing"
    />
    <div
      v-if="showError && !story.title.trim().length > 0"
      class="caption-text text-red q-my-sm"
    >
      Please provide a title for your story*
    </div>
  </div>

  <div class="q-py-md" style="width: 100%">
    <div class="row head-text q-mb-sm">Your story</div>
    <!-- <div class="caption-text q-my-sm">Short tile to summarise you story</div> -->
    <q-input
      class="story-box q-px-sm"
      v-model="story.body"
      borderless
      placeholder="Tap to start typing"
      type="textarea"
    />
    <div
      v-if="showError && !story.body.trim().length > 0"
      class="caption-text text-red q-my-sm"
    >
      Story can't be empty*
    </div>
  </div>

  <div class="row head-text q-mt-md">Tags</div>
  <div class="caption-text q-my-sm">Make it easier to discover your story</div>

  <q-btn
    no-caps
    outline
    color="primary"
    style="width: 100%; min-height: 10vh; border-radius: 8px"
    @click="openTagsDialog('bottom')"
  >
    <div class="column q-pa-md">
      <div class="col">
        <q-chip
          size=""
          outline
          color="grey-7"
          v-for="(chip, index) in selectedTag"
          :key="index"
          removable
          @remove="removeChip(index)"
        >
          {{ chip.label }}
        </q-chip>
      </div>

      <div class="row text-caption justify-center q-pt-md" style="width: 100%">
        <div class="row">Tap to add tags</div>
      </div>
    </div>
  </q-btn>

  <div
    v-if="showError && !story.tags.length > 0"
    class="caption-text text-red q-my-sm"
  >
    Please select atleas one tag*
  </div>

  <div style="width: 100%; position: fixed; bottom: 0%;left:0%">
    <div class="row q-py-md items-center justify-center">
      <q-btn
        no-caps
        class="tab-text"
        size="lg"
        unelevated
        rounded
        color="primary"
        label="Post"
        @click="postStory"
        style="width: 80%"
      />
    </div>
  </div>

  <q-dialog v-model="dialog" :position="position">
    <q-card style="width: 100%; border-radius: 20px 20px 0px 0px">
      <q-card-section class="row q-my-lg items-center justify-center no-wrap">
        <div class="header-text text-grey-7">Share story as</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-item clickable @click="setShareProfile(false)" v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ username.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>Link post to my profile</q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-item clickable @click="setShareProfile(true)" v-ripple>
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white"> A </q-avatar>
          </q-item-section>

          <q-item-section>Share your story anonymously</q-item-section>
        </q-item>
      </q-card-section>
      <q-separator class="q-mb-lg" />
    </q-card>
  </q-dialog>

  <q-dialog v-model="tagsDialog" :position="position">
    <div class="bg-white" style="width: 100%; border-radius: 20px 20px 0px 0px">
      <div class="q-pa-md bg-white">
        <addTags />
      </div>
      <div class="q-pa-md bg-white" style="">
        <q-btn
          no-caps
          class="tab-text full-width"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Done"
          @click="tagsDialog = !tagsDialog"
          style="width: 40%"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import userAuthUser from "src/composables/userAuthUser";
import addTags from "src/components/Stories/storyTags.vue";
import { storiesStore } from "src/stores/stories";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";

const router = useRouter();

const { supabase } = useSupabase();

const { user } = userAuthUser();
const store = storiesStore();

const dialog = ref(false);
const tagsDialog = ref(false);
const position = ref("top");

const showError = ref(false);

const story = ref({
  title: "",
  body: "",
  tags: [],
});

const isStoryValid = computed(() => {
  return (
    story.value.title.trim().length > 0 &&
    story.value.body.trim().length > 0 &&
    story.value.tags.length > 0
  );
});

const shareAnonymously = ref(false);
const selectedTag = ref(store.storyTags);

const selectedTags = computed(() => {
  return store.storyTags;
});

const profilebtnLabel = computed(() => {
  if (shareAnonymously.value) {
    return "Share anonymously";
  } else {
    return "Link to my profile";
  }
});

const setShareProfile = (val) => {
  shareAnonymously.value = val;
  dialog.value = !dialog.value;
};

const username = computed(() => {
  return user.value.user_metadata.firstName;
});

const open = (pos) => {
  position.value = pos;
  dialog.value = true;
};

const openTagsDialog = (pos) => {
  position.value = pos;
  tagsDialog.value = true;
};

function removeChip(index) {
  selectedTag.value.splice(index, 1);
}

watch(
  selectedTag,
  (val) => {
    store.addStoryTags(selectedTag.value);
  },
  { deep: true }
);

watch(selectedTags, (val) => {
  selectedTag.value = val;
  story.value.tags = val;
});

const postStory = async () => {
  let userName;
  if (shareAnonymously.value) {
    userName = 'Anonymous'
  } else {
    userName = user.value.user_metadata.firstName
  }
  if (isStoryValid.value) {
    try {
      const { data, error: insertError } = await supabase
        .from("user_stories")
        .insert([
          {
            user_name: userName,
            user_email: user.value.email,
            title: story.value.title,
            body: story.value.body,
            story_tags: story.value.tags,
          },
        ])
        .select(); // This retrieves the inserted data

      if (insertError) throw insertError;

      // Clear the form values
      story.value = {
        title: "",
        body: "",
        tags: [],
      };
      selectedTag.value = [];

      // Redirect to the story view page with the newly inserted story's ID
      if (data && data.length > 0) {
        console.log(data);
        router.push({
          name: "readstory",
          query: { id: data[0].story_id },
        });
      }
    } catch (error) {
      console.error("Error in submitting story:", error.message);
    }
  } else {
    showError.value = true;
  }
};
</script>

<style>
.story-box {
  border: solid 1px green;
  border-radius: 8px;
}
</style>
