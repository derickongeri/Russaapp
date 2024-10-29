<template>
  <div class="q-pa-md" style="width: 100vw">
    <div class="row items-center">
      <q-avatar size="40px" color="green-2" text-color="white">{{
        storyData?.user_name.charAt(0) || "A"
      }}</q-avatar>
      <div class="column q-gutter-y-sm">
        <div
          class="row q-px-md header-text text-primary"
          style="font-size: 20px"
        >
          {{ storyData?.user_name || "Username" }}
        </div>
        <div class="caption-text q-px-md" style="font-style: italic">
          {{ formattedTime }}
        </div>
      </div>
    </div>

    <div
      class="q-py-md header-text text-primary"
      style="width: 100%; line-height: 1.2em"
    >
      {{ storyData?.title || "A journey through menopause: Embracing Change" }}
    </div>

    <div
      class="q-py-md header-text text-grey-9"
      style="font-size: 20px; font-weight: 300; line-height: 1.5em; width: 100%"
    >
      {{ storyData?.body || "Story content goes here..." }}
    </div>

    <div
      class="q-py-md header-text text-grey-9"
      style="font-size: 20px; font-weight: 300; width: 100%"
    >
      <q-chip
        size="md"
        outline
        color="grey-7"
        v-for="(tag, index) in storyData?.story_tags || []"
        :key="index"
      >
        {{ tag.label }}
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import stories from "src/components/Reusables/storiesSlides.vue";
import { Keyboard } from "@capacitor/keyboard";
import { useRoute } from "vue-router";
import useSupabase from "src/boot/supabase";

const route = useRoute();
const { supabase } = useSupabase();

const visibleKeybord = ref(false);
const input = ref(null);
const comment = ref("");
const storyData = ref(null);

// Fetch story data by ID on component mount
const fetchStory = async () => {
  const storyId = route.query.id; // Get the story ID from route query parameters

  if (storyId) {
    const { data, error } = await supabase
      .from("user_stories")
      .select("*")
      .eq("story_id", storyId)
      .single(); // Retrieve the story by ID

    if (error) {
      console.error("Error fetching story:", error.message);
    } else {
      storyData.value = data;
    }
  }
};

// Computed property to format the story time
const formattedTime = computed(() => {
  if (!storyData.value) return "5 mins ago";

  const createdAt = new Date(storyData.value.created_at);
  const now = new Date();
  const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInMinutes < 1440) {
    // Less than 24 hours
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else {
    const options = { day: "2-digit", month: "short" };
    if (now.getFullYear() === createdAt.getFullYear()) {
      return new Intl.DateTimeFormat("en-US", options).format(createdAt); // E.g., "08 Jul"
    } else {
      options.year = "2-digit";
      return new Intl.DateTimeFormat("en-US", options).format(createdAt); // E.g., "08 Jul 23"
    }
  }
});

const commentText = ref(
  "At first, she brushed it off as stress from work or the changing weather. But as the weeks went by, Susan began to suspect that something more significant was happening."
);

// const tags = ref([
//   "PMS",
//   "Perimenopause",
//   "Anxiety",
//   "HRT",
//   "Low mood or depression",
// ]);

onMounted(() => {
  fetchStory(); // Fetch the story when the component is mounted
});

Keyboard.addListener("keyboardWillHide", () => {
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
