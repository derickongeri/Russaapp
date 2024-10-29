<template>
  <div v-if="!visible">
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
          <b>{{ storyData?.views }}</b> Comments
        </div>
        <q-space />
        <q-btn
          no-caps
          rounded
          outline
          size="sm"
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
          size="sm"
          color="primary"
          @click="openGuidelinesDialog('bottom')"
        >
          <div class="q-px-sm">Community guidelines</div>
          <q-icon size="xs" name="mdi-help-circle-outline" color="primary" />
        </q-btn>
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
    </div>
  </div>

  <q-dialog
    transition-show="slide-left"
    transition-hide="slide-right"
    :maximaized="true"
    v-model="guidelinesDialog"
    backdrop-filter="blur(8px) saturate(150%)"
  >
    <div class="bg-white q-pa-md" style="width: 100%; border-radius: 20px;">
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
    <div class="bg-white q-pa-md" style="width: 100%; border-radius: 20px;">
      <div class="q-pa-md bg-white">
        <P>
          Does this story:
        </P>
        <p>
          Contain negative or abusive language?
        </p>
        <p>
          Offer medical advice?
        </p>
        <p>
          Contain product endorsements or inappropriate recommendations?
        </p>
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

  <q-inner-loading
    style="width: 100%; height: 100vh"
    class="bg-white"
    :showing="visible"
  >
    <q-spinner-hearts size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useQuasar, QSpinnerFacebook, QSpinnerHearts } from "quasar";
import stories from "src/components/Reusables/storiesSlides.vue";
import { Keyboard } from "@capacitor/keyboard";
import { useRoute } from "vue-router";
import useSupabase from "src/boot/supabase";

const $q = useQuasar();
const route = useRoute();
const { supabase } = useSupabase();

const visibleKeybord = ref(false);
const input = ref(null);
const comment = ref("");
const storyData = ref(null);
const visible = ref(false);

const reportStoryDialog = ref(false);
const guidelinesDialog = ref(false);
const position = ref("top");

const openReportStoryDialog = (pos) => {
  position.value = pos;
  reportStoryDialog.value = true;
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
      console.log('story hass been reported') // Update UI to reflect that the story has been reported
    }
  } catch (err) {
    console.error("Unexpected error reporting story:", err.message);
  }
};

onMounted(() => {
  let timer;
  visible.value = true;
  fetchStory().then(() => {
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
