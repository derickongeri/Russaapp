<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 90vh; min-width: 100%"
  >
    <div class="q-pa-md" style="width: 100vw">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="stories.length > 0" class="story-list">
          <div
            v-for="story in stories"
            :key="story.id"
            class="story-item q-mb-lg"
          >
            <div class="row items-center">
              <q-avatar size="40px" color="green-2" text-color="white">{{
                story.user_name.charAt(0) || "A"
              }}</q-avatar>
              <div class="column q-gutter-y-sm">
                <div
                  class="row q-px-md header-text text-primary"
                  style="font-size: 20px"
                >
                  {{ story.user_name }}
                </div>
                <div class="caption-text q-px-md" style="font-style: italic">
                  {{ formatTime(story.created_at) }}
                </div>
              </div>
            </div>

            <div
              class="story-title q-py-md text-primary"
              style="font-size: 24px; font-weight: bold"
            >
              {{ story.title }}
            </div>

            <div
              class="story-body-preview q-py-sm text-grey-8"
              style="font-size: 18px; line-height: 1.5em"
            >
              {{
                story.body.length > 100
                  ? story.body.substring(0, 100) + "..."
                  : story.body
              }}
            </div>

            <q-btn
              flat
              color="primary"
              @click="goToStory(story.story_id)"
              label="Read More"
              class="q-mt-sm"
            />
          </div>
        </div>

        <div v-else class="text-center text-grey-7">No stories posted yet.</div>
      </transition>
    </div>
  </q-scroll-area>
  <q-inner-loading class="bg-white" :showing="visible">
    <q-spinner-hearts
      size="50px"
      color="primary"
    />

  </q-inner-loading>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, QSpinnerFacebook, QSpinnerHearts } from "quasar";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";

const $q = useQuasar();
const router = useRouter();
const { supabase } = useSupabase();
const stories = ref([]);
const visible = ref(false);

// Fetch all stories on component mount
const fetchStories = async () => {
  const { data, error } = await supabase
    .from("user_stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching stories:", error.message);
  } else {
    stories.value = data;
  }
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

// Navigate to single story view
const goToStory = (id) => {
  router.push({ name: "readstory", query: { id } });
};
</script>

<style scoped>
.story-list {
  display: flex;
  flex-direction: column;
}

.story-item {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.story-title {
  font-weight: bold;
  color: #007acc;
}

.story-body-preview {
  color: #333;
}
</style>
