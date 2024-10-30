<template>
  <div
    v-if="!visible"
    class="stories-container-bg"
    style="min-height: 100vh; width: 100vw"
  >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :style="{ height: scrollAreaHeight, minWidth: '100%' }"
      class=""
    >
      <div>
        <div class="row q-pt-sm q-mb-sm" style="width: 100%"></div>
        <div
          class="q-px-md bg-white q-mx-sm q-pt-sm"
          style="border-radius: 10px"
        >
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
              storyData?.title ||
              "A journey through menopause: Embracing Change"
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
            <!-- <div class="caption-text">
            <b>{{ storyData?.comments }}</b> Comments
          </div> -->
            <q-space />
            <q-btn
              v-if="storyData?.user_email === user.email"
              no-caps
              flat
              size=""
              color="primary"
              @click="OpenDeleteItemDialog('story')"
            >
              <div class="q-px-sm">Delete story</div>
              <q-icon
                size="xs"
                name="mdi-delete-alert-outline"
                color="primary"
              />
            </q-btn>
            <q-btn
              v-else
              no-caps
              flat
              size=""
              color="primary"
              @click="openDialog('bottom', 'story')"
            >
              <div class="q-px-sm">Report this story</div>
              <q-icon size="xs" name="mdi-alert-outline" color="primary" />
            </q-btn>
          </div>
        </div>
      </div>

      <div class="comment-section q-pt-sm">
        <div
          class="row bg-white q-mx-sm q-px-md q-py-sm items-center"
          style="border-radius: 10px"
        >
          <div class="header-text text-grey-9" style="font-size: 16px">
            <b>{{ storyData?.comments }}</b> Comments
          </div>
          <q-space />
          <q-btn
            no-caps
            flat
            size=""
            color="primary"
            @click="openDialog('bottom', 'guidelines')"
          >
            <div class="q-px-sm">Community guidelines</div>
            <q-icon size="" name="mdi-help-circle-outline" color="primary" />
          </q-btn>
        </div>

        <div v-if="showComments" class="">
          <q-list v-for="comment in comments" :key="comment.id">
            <div class="row">
              <div class="col-1">
                <q-item class="q-pt-lg">
                  <q-item-section top avatar>
                    <q-avatar size="sm" color="primary" text-color="white">{{
                      comment.owner.firstName.charAt(0) || "A"
                    }}</q-avatar>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col">
                <q-card
                  flat
                  class="q-ma-md q-pt-xs bg-white"
                  style="border-radius: 10px 10px 10px 10px"
                >
                  <q-item>
                    <div class="triangle triangle-0"></div>
                    <q-item-section>
                      <div class="row items-center">
                        <div
                          class="header-text text-primary"
                          style="font-size: 16px; font-weight: normal"
                        >
                          {{ comment.owner.firstName }}
                          {{ comment.owner.lastName }}
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
                        <q-btn
                          v-if="storyData?.user_email === user.email"
                          no-caps
                          flat
                          dense
                          size=""
                          color="primary"
                          @click="
                            OpenDeleteItemDialog('comment', comment.comment_id)
                          "
                        >
                          <q-icon
                            size="xs"
                            name="mdi-delete-forever-outline"
                            color="primary"
                          />
                          <div class="q-px-sm">Delete</div>
                        </q-btn>
                        <q-btn
                          v-else
                          no-caps
                          flat
                          size=""
                          color="primary"
                          @click="
                            openDialog('bottom', 'comment', comment.comment_id)
                          "
                        >
                          <div class="q-px-sm">Report</div>
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
              </div>
            </div>
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
      </div>
    </q-scroll-area>

    <div
      class="q-px-sm comment-box"
      :style="{backgroundColor: commentBoxBackground}"
    >
      <div v-if="visibleKeybord" class="row q-px-md q-pt-sm caption-text" style="width: 100%; font-size:small">
        Replying to @{{ storyData?.user_name || "Username" }}
      </div>
      <div class="row q-py-md header-text text-primary" style="width: 100%">
        <div class="story-box bg-white col q-mr-sm items-center">
          <q-input
            ref="input"
            class="col-10 header-text q-px-md"
            style="font-size: 16px; line-height: 1.5em;max-height: 48px;"
            v-model="newComment"
            dense
            autogrow
            borderless
            placeholder="Add a comment"
            @focus="addComment('show', false)"
            @blur="addComment('hide', false)"
          />
        </div>
        <div class="column justify-around items-center">
          <q-btn
            unelevated
            size=""
            round
            color="primary"
            icon="mdi-send"
            @click="addComment('hide', true)"
          />
        </div>
      </div>

      <div
        v-if="visibleKeybord"
        class="row"
        style="width: 100%; min-height: 30vh"
      ></div>
    </div>
  </div>

  <q-dialog
    transition-show="slide-left"
    transition-hide="slide-right"
    :maximaized="true"
    v-model="dialogOpen"
    backdrop-filter="blur(8px) saturate(150%)"
  >
    <div
      v-if="reportCommentDialog"
      class="bg-white q-pa-md"
      style="width: 100%; border-radius: 20px"
    >
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
          @click="
            (dialogOpen = !dialogOpen),
              (reportCommentDialog = !reportCommentDialog)
          "
          style="width: 40%"
        />
      </div>
    </div>
    <div
      v-if="guidelinesDialog"
      class="bg-white q-pa-md"
      style="width: 100%; border-radius: 20px"
    >
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
          @click="
            (dialogOpen = !dialogOpen), (guidelinesDialog = !guidelinesDialog)
          "
          style="width: 40%"
        />
      </div>
    </div>
    <div
      v-if="reportStoryDialog"
      class="bg-white q-pa-md"
      style="width: 100%; border-radius: 20px"
    >
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
          @click="
            (dialogOpen = !dialogOpen), (reportStoryDialog = !reportStoryDialog)
          "
          style="width: 40%"
        />
      </div>
    </div>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <q-card v-if="deleteStoryDialog">
      <q-card-section class="">
        <p class="q-ml-sm" style="font-weight: bold">Are you sure?</p>
        <span class="q-ml-sm"
          >Are you sure you want to deleting your story?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Ok"
          color="primary"
          @click="deleteStory(storyId)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="deleteCommetDialog">
      <q-card-section class="">
        <p class="q-ml-sm" style="font-weight: bold">Are you sure?</p>
        <span class="q-ml-sm"
          >Are you sure you want to deleting your comment?</span
        >
        <!-- <p>{{ selectedCommentId }}</p> -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Ok"
          color="primary"
          @click="deleteComment(selectedCommentId, storyId)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
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
import setStories from "src/composables/stories";
import { useRoute, useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const { supabase } = useSupabase();
const { user } = userAuthUser();
const {
  storyData,
  comments,
  fetchStory,
  fetchComments,
  insertNewComment,
  deleteComment,
  deleteStory,
} = setStories();

const storyId = route.query.id;

const visibleKeybord = ref(false);
// Define computed height based on the isExpanded value
const scrollAreaHeight = computed(() =>
  visibleKeybord.value ? "50vh" : "83vh"
);

const commentBoxBackground = computed(() =>
  visibleKeybord.value ? "white" : "transparent"
);

const input = ref(null);
const newComment = ref("");
const visible = ref(false);

const confirm = ref(false);
const dialogOpen = ref(false);
const reportStoryDialog = ref(false);
const deleteStoryDialog = ref(false);
const deleteCommetDialog = ref(false);
const reportCommentDialog = ref(false);
const guidelinesDialog = ref(false);

const selectedCommentId = ref(null);
const position = ref("top");

const showComments = computed(() => {
  return comments.value.length > 0;
});

const openDialog = (pos, dialog, id) => {
  position.value = pos;
  switch (dialog) {
    case "story":
      reportStoryDialog.value = true;
      break;
    case "comment":
      selectedCommentId.value = id;
      reportCommentDialog.value = true;
      break;
    default:
      guidelinesDialog.value = true;
      break;
  }
  dialogOpen.value = true;
};

// Increment views after 5 seconds
let viewCounterTimeout;
const incrementViews = async () => {
  // const storyId = route.query.id;
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

const addComment = async (keyboardState, postComment) => {
  if (keyboardState !== "hide") {
    visibleKeybord.value = true;
  } else {
    visibleKeybord.value = false;
  }

  if (postComment && newComment.value.trim().length > 0) {
    //const storyId = route.query.id;
    const owner = { ...user.value.user_metadata };
    await insertNewComment(storyId, owner, newComment.value).then(() => {
      newComment.value = null;
      let timer;
      visible.value = true;
      fetchStory(storyId).then(() => {
        fetchComments(storyId);
        setTimeout(() => {
          visible.value = false;
        }, 300);
      });
    });
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

const reportStory = async () => {
  //const storyId = route.query.id;

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
  console.log(selectedCommentId.value);
  try {
    const { data, error } = await supabase
      .from("story_comments")
      .update({ reported: true })
      .eq("comment_id", selectedCommentId.value)
      .select("reported")
      .single();

    if (error) {
      console.error("Error reporting story:", error.message);
      return;
    }

    if (data.reported) {
      console.log("story hass been reported"); // Update UI to reflect that the story has been reported
      fetchComments(route.query.id);
      reportCommentDialog.value = !reportCommentDialog.value;
      dialogOpen.value = !dialogOpen.value;
    }
  } catch (err) {
    console.error("Unexpected error reporting story:", err.message);
  }
};

const OpenDeleteItemDialog = (item, id) => {
  switch (item) {
    case "comment":
      selectedCommentId.value = id;
      deleteCommetDialog.value = true;
      deleteStoryDialog.value = false;
      break;
    default:
      deleteCommetDialog.value = false;
      deleteStoryDialog.value = true;
      break;
  }
  confirm.value = true;
};

onMounted(() => {
  let timer;
  visible.value = true;
  fetchStory(route.query.id).then(() => {
    fetchComments(route.query.id);
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
  /* border: solid 1px green; */
  border-radius: 28px;
}

.stories-container-bg {
  flex-grow: 0;
  padding: 0 0 0px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15)
    ),
    /* linear-gradient(71deg, rgba(116, 178, 129, 0) 21%, #868686b6 99%), */
      url("~/src/assets/storiesbackground2.jpg");
  background-size: cover;
  background-position: center;
}

.triangle {
  position: absolute;
  z-index: 1;
  left: -5%;
  top: 0%;
  border-radius: 0px;
  rotate: 180deg;
}

.comment-box {
  position: fixed;
  bottom: 0%;
  width: 100%;
  border-radius: 0px;
}

.triangle-0 {
  width: 18px;
  height: 16px;
  border-left: solid 8px rgb(255, 255, 255);
  border-bottom: solid 8px transparent;
  border-top: solid 8px transparent;
}
</style>
