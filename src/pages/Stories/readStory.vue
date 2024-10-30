<template>
  <div v-if="!visible" class="bg-grey-2" style="min-height: 90vh">
    <div class="q-px-md q-pt-md" style="width: 100vw">
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
        <q-space />

        <div></div>
      </div>

      <div
        class="q-py-md header-text text-primary"
        style="width: 100%; line-height: 1.2em"
      >
        {{
          storyData?.title || "A journey through menopause: Embracing Change"
        }}
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
        {{ storyData?.body || "Story content goes here..." }}
      </div>

      <div
        class="q-pt-md header-text text-grey-9"
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
      <q-separator class="q-mt-md"></q-separator>
      <div class="row q-my-sm items-center" style="font-size: 16px">
        <div class="caption-text q-mr-md">
          <b>{{ storyData?.views }}</b> Views
        </div>
        <div class="caption-text">
          <b>{{ storyData?.comments }}</b> Comments
        </div>
        <q-space />
        <q-btn
          no-caps
          flat
          size=""
          color="primary"
          @click="openReportStoryDialog('bottom')"
        >
          <div class="q-px-sm">Report this story</div>
          <q-icon size="xs" name="mdi-alert-outline" color="primary" />
        </q-btn>
      </div>
      <q-separator class=""></q-separator>
    </div>

    <div class="comment-section q-pt-sm">
      <div class="row q-px-md q-my-sm items-center">
        <div class="header-text text-primary" style="font-size: 20px">
          Comments
        </div>
        <q-space />
        <q-btn
          no-caps
          flat
          size=""
          color="primary"
          @click="openGuidelinesDialog('bottom')"
        >
          <div class="q-px-sm">Community guidelines</div>
          <q-icon size="" name="mdi-help-circle-outline" color="primary" />
        </q-btn>
      </div>

      <div v-if="showComments" class="">
        <q-list v-for="comment in comments" :key="comment.id">
          <q-card
            flat
            class="q-ma-md q-pt-md bg-white"
            style="border-radius: 10px"
          >
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>
              <q-item-section>
                <div class="row items-center">
                  <div
                    class="header-text text-primary"
                    style="font-size: 16px; font-weight: normal"
                  >
                    {{ comment.owner.firstName }} {{ comment.owner.lastName }}
                  </div>
                  <q-space />
                  <div
                    class="caption-text"
                    style="font-style: italic; font-size: 16px"
                  >
                    {{ formatTime(comment.created_at) }}
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
                  {{ comment.comment_text }}
                </div>

                <div class="row items-center" style="font-size: 16px">
                  <q-space />
                  <q-btn
                    no-caps
                    flat
                    size=""
                    color="primary"
                    @click="openReportCommentDialog('bottom', comment.comment_id)"
                  >
                    <div class="q-px-sm">Report comment</div>
                    <q-icon
                      size="xs"
                      name="mdi-chat-alert-outline"
                      color="primary"
                    />
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </q-list>
        <div class="row" style="width: 100%; min-height: 10vh"></div>
      </div>

      <div
        v-if="!showComments"
        class="column items-center justify-center"
        style="width: 100%; height: 20vh"
      >
        <div class="caption-text" style="font-style: italic">
          No comments yet*
        </div>
      </div>
      <div
        class="q-px-md bg-white"
        style="position: fixed; bottom: 0%; width: 100%"
      >
        <div class="q-py-sm header-text text-primary" style="width: 100%">
          <div class="story-box bg-white items-center row" style="width: 100%">
            <q-input
              ref="input"
              class="col-10 header-text q-pl-sm"
              style="font-size: 16px; line-height: 1.5em"
              v-model="newComment"
              borderless
              placeholder="Add comment"
              autogrow
              dense
              @focus="visibleKeybord = true"
              @blur="visibleKeybord = false"
            />
            <div class="col-2 column justify-around items-center">
              <q-btn
                flat
                round
                color="primary"
                icon="mdi-send"
                @click="addComment"
              />
            </div>
          </div>
        </div>

        <div
          v-if="visibleKeybord"
          class="row"
          style="width: 100%; min-height: 30vh"
        ></div>
      </div>
    </div>
  </div>

  <q-dialog
    transition-show="slide-left"
    transition-hide="slide-right"
    :maximaized="true"
    v-model="guidelinesDialog"
    backdrop-filter="blur(8px) saturate(150%)"
  >
    <div class="bg-white q-pa-md" style="width: 100%; border-radius: 20px">
      <div class="q-pa-md bg-white">
        <P>
          Plese note - we are here to support each other so any negative
          comments will be reported and you may be blocked from using the
          platform.
        </P>
        <p>
          Whilst RUSA is created by experts, we're not here to give medical
          advice. Any post offering medical adivce will be deleted.
        </p>
        <q-btn
          no-caps
          class="tab-text q-mt-md full-width"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Okay, got it"
          @click="guidelinesDialog = !guidelinesDialog"
          style="width: 40%"
        />
      </div>
    </div>
  </q-dialog>

  <q-dialog
    transition-show="slide-left"
    transition-hide="slide-right"
    :maximaized="true"
    v-model="reportStoryDialog"
    backdrop-filter="blur(8px) saturate(150%)"
  >
    <div class="bg-white q-pa-md" style="width: 100%; border-radius: 20px">
      <div class="q-pa-md bg-white">
        <P> Does this story: </P>
        <p>Contain negative or abusive language?</p>
        <p>Offer medical advice?</p>
        <p>Contain product endorsements or inappropriate recommendations?</p>
        <q-btn
          no-caps
          class="tab-text q-mt-md full-width"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Yes, report the story"
          @click="reportStory"
          style="width: 40%"
        />
        <q-btn
          no-caps
          class="tab-text q-mt-md full-width"
          size="lg"
          outline
          rounded
          color="primary"
          label="No, cancel"
          @click="reportStoryDialog = !reportStoryDialog"
          style="width: 40%"
        />
      </div>
    </div>
  </q-dialog>

  <q-dialog
    transition-show="slide-left"
    transition-hide="slide-right"
    :maximaized="true"
    v-model="reportCommentDialog"
    backdrop-filter="blur(8px) saturate(150%)"
  >
    <div class="bg-white q-pa-md" style="width: 100%; border-radius: 20px">
      <div class="q-pa-md bg-white">
        <P> Does this Comment: </P>
        <p>Contain negative or abusive language?</p>
        <p>Offer medical advice?</p>
        <p>Contain product endorsements or inappropriate recommendations?</p>
        <q-btn
          no-caps
          class="tab-text q-mt-md full-width"
          size="lg"
          unelevated
          rounded
          color="primary"
          label="Yes, report the comment"
          @click="reportComment"
          style="width: 40%"
        />
        <q-btn
          no-caps
          class="tab-text q-mt-md full-width"
          size="lg"
          outline
          rounded
          color="primary"
          label="No, cancel"
          @click="reportCommentDialog = !reportCommentDialog"
          style="width: 40%"
        />
      </div>
    </div>
  </q-dialog>

  <q-inner-loading
    style="width: 100%; height: 100vh"
    class="bg-white"
    :showing="visible"
  >
    <q-spinner-hearts size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useQuasar, QSpinnerFacebook, QSpinnerHearts } from "quasar";
import stories from "src/components/Reusables/storiesSlides.vue";
import { Keyboard } from "@capacitor/keyboard";
import userAuthUser from "src/composables/userAuthUser";
import { useRoute, useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const { supabase } = useSupabase();
const { user } = userAuthUser();

const visibleKeybord = ref(false);
const input = ref(null);
const newComment = ref("");
const comments = ref([]);
const storyData = ref(null);
const visible = ref(false);
const showComments = ref(false);

const reportStoryDialog = ref(false);
const reportCommentDialog = ref(false);
const reportCommentId = ref(null);
const guidelinesDialog = ref(false);
const position = ref("top");

const openReportStoryDialog = (pos) => {
  position.value = pos;
  reportStoryDialog.value = true;
};

const openReportCommentDialog = (pos, id) => {
  reportCommentId.value = id
  position.value = pos;
  reportCommentDialog.value = true;
};

const openGuidelinesDialog = (pos) => {
  position.value = pos;
  guidelinesDialog.value = true;
};

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

// Fetch all stories on component mount
const fetchComments = async () => {
  const storyId = route.query.id;

  const { data, error } = await supabase
    .from("story_comments")
    .select("*")
    .eq("story_id", storyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error.message);
  } else if (data.length > 0) {
    comments.value = data.filter(comment => comment.reported !== true);
    console.log(comments.value);
    showComments.value = true;
  } else {
    showComments.value = false;
  }
};

// Increment views after 5 seconds
let viewCounterTimeout;
const incrementViews = async () => {
  const storyId = route.query.id;
  // Fetch the current view count first
  const { data, error: fetchError } = await supabase
    .from("user_stories")
    .select("views")
    .eq("story_id", storyId)
    .single();

  if (fetchError) {
    console.error("Error fetching current views:", fetchError.message);
    return;
  }

  const currentViews = data.views || 0;
  const newViews = currentViews + 1;

  // Update the views column with the new value
  const { error: updateError } = await supabase
    .from("user_stories")
    .update({ views: newViews })
    .eq("story_id", storyId);

  console.log(newViews);

  if (updateError) {
    console.error("Error updating views:", updateError.message);
  }
};

const incrementComments = async () => {
  const storyId = route.query.id;
  // Fetch the current view count first
  const { data, error: fetchError } = await supabase
    .from("user_stories")
    .select("comments")
    .eq("story_id", storyId)
    .single();

  if (fetchError) {
    console.error("Error fetching current views:", fetchError.message);
    return;
  }

  const currentComments = data.comments || 0;
  const newComments = currentComments + 1;

  // Update the Comments column with the new value
  const { error: updateError } = await supabase
    .from("user_stories")
    .update({ comments: newComments })
    .eq("story_id", storyId)
    .select();

  console.log(newComments);

  if (updateError) {
    console.error("Error updating comments:", updateError.message);
  }
};

const addComment = async () => {
  const storyId = route.query.id;

  if (newComment.value.trim().length > 0) {
    try {
      const { data, error: insertError } = await supabase
        .from("story_comments")
        .insert([
          {
            owner: { ...user.value.user_metadata },
            story_id: storyId,
            comment_text: newComment.value,
          },
        ])
        .select();

      if (insertError) throw insertError;

      if (data && data.length > 0) {
        incrementComments().then(() => {
          newComment.value = null;
          let timer;
          visible.value = true;
          fetchStory().then(() => {
            fetchComments();
            setTimeout(() => {
              visible.value = false;
            }, 300);
          }); // Fetch the story when the component is mounted
        });
      }
    } catch (error) {}
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

const reportStory = async () => {
  const storyId = route.query.id;

  try {
    const { data, error } = await supabase
      .from("user_stories")
      .update({ reported: true })
      .eq("story_id", storyId)
      .select("reported")
      .single();

    if (error) {
      console.error("Error reporting story:", error.message);
      return;
    }

    if (data.reported) {
      console.log("story hass been reported"); // Update UI to reflect that the story has been reported
    }
  } catch (err) {
    console.error("Unexpected error reporting story:", err.message);
  }
};

const reportComment = async () => {
  console.log(reportCommentId.value)
  try {
    const { data, error } = await supabase
      .from("story_comments")
      .update({ reported: true })
      .eq("comment_id", reportCommentId.value)
      .select("reported")
      .single();

    if (error) {
      console.error("Error reporting story:", error.message);
      return;
    }

    if (data.reported) {
      console.log("story hass been reported"); // Update UI to reflect that the story has been reported
      fetchComments();
      reportCommentDialog.value = !reportCommentDialog.value
    }
  } catch (err) {
    console.error("Unexpected error reporting story:", err.message);
  }
};

onMounted(() => {
  let timer;
  visible.value = true;
  fetchStory().then(() => {
    fetchComments();
    setTimeout(() => {
      visible.value = false;
    }, 300);

    viewCounterTimeout = setTimeout(() => {
      incrementViews();
    }, 10000);
  }); // Fetch the story when the component is mounted
});

onBeforeUnmount(() => {
  // Clear timeout if the user leaves before 5 seconds
  if (viewCounterTimeout) clearTimeout(viewCounterTimeout);
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

.stories-container-bg {
  flex-grow: 0;
  padding: 0 0 0px;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.25)
    ),
    /* linear-gradient(71deg, rgba(116, 178, 129, 0) 21%, #868686b6 99%), */
      url("~/src/assets/storiesbackground2.jpg");
  background-size: cover;
  background-position: center;
}
</style>
