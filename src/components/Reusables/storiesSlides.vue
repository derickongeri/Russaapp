<template>
  <div class="row row q-pl-md q-my-md justify-between" style="width: 100%">
    <div class="head-text">Stories</div>
    <q-space></q-space>

    <q-btn no-caps flat size="md" color="primary" @click="goTo('stories')">
      <div class="q-px-sm">View all</div>
      <q-icon size="xs" name="mdi-open-in-new" color="primary" />
    </q-btn>
  </div>

  <div class="row q-mb-md q-px-md" style="width: 100%">
    <div class="caption-text">Showing most recent first</div>
  </div>

  <div class="horizontal-content q-my-lg">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 35vh; max-width: 100%"
    >
      <div class="row q-px-md q-gutter-x-sm no-wrap">
        <q-item
          class="column items-start justify-around q-pa-md story-card add-story-card"
          clickable
          to="/createpost"
          v-ripple
        >
          <div class="col" style="width: 100%">
            <div class="row justify-between items-center" style="width: 100%">
              <div class="">Post a story</div>
              <q-icon
                size="md"
                name="mdi-plus-circle-outline"
                color="primary"
              />
            </div>
          </div>
          <div class="col caption-text q-my-sm">
            Share what's on your mind and engage with the community
          </div>
        </q-item>
        <q-item
          clickable
          @click="goToStory(story.story_id)"
          v-ripple
          v-for="story in stories.slice(0, 10)"
          :key="story.id"
          :class="[
            'column',
            'text-grey-1',
            'justify-between',
            'q-pa-md',
            'story-card',
            {
              'read-story-card': stories.indexOf(story) % 3 === 0,
              'read-story-card-1': stories.indexOf(story) % 3 === 1,
              'read-story-card-2': stories.indexOf(story) % 3 === 2,
            },
          ]"
        >
          <div
            :class="[
              'col-4',
              'caption-text',

              {
                '': stories.indexOf(story) % 3 === 0,
                'text-grey-3': stories.indexOf(story) % 3 === 1,
                'text-grey-8': stories.indexOf(story) % 3 === 2,
              },
            ]"
            style="font-weight: 700"
          >
            {{ story.title }}
          </div>
          <div
            :class="[
              'col-4',
              'caption-text',
              {
                '': stories.indexOf(story) % 3 === 0,
                'text-grey-3': stories.indexOf(story) % 3 === 1,
                'text-grey-8': stories.indexOf(story) % 3 === 2,
              },
            ]"
          >
            {{
              story.body.length > 100
                ? story.body.substring(0, 100) + "..."
                : story.body
            }}
          </div>
          <div class="">
            <div class="row items-center text-grey-1">
              <q-avatar size="sm" color="primary" text-color="white">
                {{ story.user_name.charAt(0) || "A" }}</q-avatar
              >
              <div class="column">
                <div
                  :class="[
                    'row',
                    'q-px-md',
                    'header-text',
                    {
                      'text-grey-8': stories.indexOf(story) % 3 === 0,
                      'text-grey-3': stories.indexOf(story) % 3 === 1,
                      'text-grey-9': stories.indexOf(story) % 3 === 2,
                    },
                  ]"
                  style="font-size: 16px; font-weight: 700"
                >
                  {{ story.user_name }}
                </div>
                <q-space />
                <div
                  :class="[
                    'caption-text',
                    'q-px-md',
                    {
                      'text-grey-8': stories.indexOf(story) % 3 === 0,
                      'text-grey-3': stories.indexOf(story) % 3 === 1,
                      'text-grey-9': stories.indexOf(story) % 3 === 2,
                    },
                  ]"
                  style="font-style: italic; font-size: 14px"
                >
                  {{ formatTime(story.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </q-item>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { defineComponent, ref, watch, onMounted } from "vue";
import { useQuasar, QSpinnerHearts } from "quasar";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";
import setStories from "src/composables/stories";

const $q = useQuasar();
const router = useRouter();
const { supabase } = useSupabase();
const visible = ref(false);
const { stories, fetchStories } = setStories();

// Format story time
const formatTime = (createdAt) => {
  const date = new Date(createdAt);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    const options = { day: "2-digit", month: "short" };
    if (now.getFullYear() === date.getFullYear()) {
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } else {
      options.year = "2-digit";
      return new Intl.DateTimeFormat("en-US", options).format(date);
    }
  }
};

function goTo(val) {
  router.push({
    name: val,
  });
}

// Navigate to single story view
const goToStory = (id) => {
  router.push({ name: "readstory", query: { id } });
};

onMounted(() => {
  let timer;
  visible.value = true;
  fetchStories().then(() => {
    setTimeout(() => {
      visible.value = false;
    }, 300);
  });
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

<style lang="scss"></style>
