import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const storiesStore = defineStore("stories", {
  state: () => {
    const { t } = useI18n();

    return {
      allTags: [
        { label: "Hot flashes", category: "Menopause signs" },
        { label: "Mood swings", category: "Mental health" },
        { label: "Diet changes", category: "Food and drink" },
        { label: "Yoga", category: "Lifestyle" },
        { label: "Hormone therapy", category: "Treatment" },
        {
          label: "Regular check-up",
          category: "Healthcare professional visit",
        },
        // Add more tags as needed
      ],
      storyTags: [],
    };
  },

  actions: {
    addStoryTags(tags) {
      console.log(tags)
      this.storyTags = tags;
      this.savestoryTags();
    },
    removeTagFromstoryTags(label) {
      this.storyTags = this.storyTags.filter((s) => s.label !== label);
      this.savestoryTags();
    },
    resetstoryTags() {
      this.storyTags = [];
      this.savestoryTags();
    },
    savestoryTags() {
      localStorage.setItem("storyTags", JSON.stringify(this.storyTags));
    },
  },
});
