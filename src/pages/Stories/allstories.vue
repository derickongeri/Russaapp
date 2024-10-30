<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 94vh; min-width: 100%"
    class="bg-grey-4"
  >
    <div class="q-pa-md" style="width: 100vw">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="stories.length > 0" class="story-list">
          <q-card
            v-for="story in stories"
            :key="story.id"
            class="story-item q-mb-lg bg-white"
            clickable
            @click="goToStory(story.story_id)"
            flat
          >
            <div class="row items-center">
              <q-avatar size="40px" color="green-2" text-color="white">{{
                story.user_name.charAt(0) || "A"
              }}</q-avatar>

              <div
                class="row q-px-md header-text text-primary"
                style="font-size: 20px"
              >
                {{ story.user_name }}
              </div>
              <q-space />
              <div class="caption-text q-px-md" style="font-style: italic">
                {{ formatTime(story.created_at) }}
              </div>
            </div>

            <div
              class="story-title q-pt-md text-primary"
              style="font-size: 20px; font-weight: normal"
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

            <div class="row q-my-md items-center" style="font-size: 16px">
              <div class="caption-text q-mr-md">
                <i class="fa-regular fa-eye"></i> <b>{{ story.views }}</b>
              </div>
              <div class="caption-text">
                <i class="fa-regular fa-message"></i>
                <b>{{ ` ${story.comments}` }}</b>
              </div>
              <q-space />
              <q-btn
                no-caps
                flat
                color="primary"
                @click="goToStory(story.story_id)"
                label="View story"
                icon-right="mdi-open-in-new"
              />
            </div>
            <!-- <q-btn
              no-caps
              outline
              color="primary"
              @click="goToStory(story.story_id)"
              label="Read More"
              class="q-mt-sm"
            /> -->
          </q-card>
        </div>

        <div v-else class="text-center text-grey-7">No stories posted yet.</div>
      </transition>
    </div>
  </q-scroll-area>
  <q-inner-loading class="bg-white" :showing="visible">
    <q-spinner-hearts size="50px" color="primary" />
  </q-inner-loading>
  <q-page-sticky v-if="!visible" position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" to="/createpost" />
  </q-page-sticky>
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

<style scoped>
.story-list {
  display: flex;
  flex-direction: column;
}

.story-item {
  padding: 16px;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
}

.story-title {
  font-weight: bold;
  color: #007acc;
}

.story-body-preview {
  color: #333;
}

.stories-container {
  flex-grow: 0;
  padding: 0 0 0px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.219),
      rgba(0, 0, 0, 0.35)
    ),
    /* linear-gradient(71deg, rgba(116, 178, 129, 0) 21%, #868686b6 99%), */
      url("~/src/assets/storiesbackground.jpg");
  background-size: cover;
  background-position: center;
}
</style>
