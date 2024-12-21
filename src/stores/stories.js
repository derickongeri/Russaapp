import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const storiesStore = defineStore("stories", {
  state: () => {
    const { t } = useI18n();

    return {
      allTags: [
        //Menopause signs
        { label: "Allergies", category: "Menopause signs" },
        { label: "Anxiety", category: "Menopause signs" },
        { label: "Bloating", category: "Menopause signs" },
        { label: "Body odor changes", category: "Menopause signs" },
        { label: "Breast tenderness", category: "Menopause signs" },
        { label: "Changes in taste", category: "Menopause signs" },
        { label: "Cold flashes", category: "Menopause signs" },
        { label: "Decreased libido", category: "Menopause signs" },
        { label: "Depression", category: "Menopause signs" },
        { label: "Dizziness", category: "Menopause signs" },
        { label: "Dry skin", category: "Menopause signs" },
        { label: "Eye dryness", category: "Menopause signs" },
        { label: "Fatigue", category: "Menopause signs" },
        { label: "Gum issues", category: "Menopause signs" },
        { label: "Hair thinning", category: "Menopause signs" },
        { label: "Headaches", category: "Menopause signs" },
        { label: "Heart palpitations", category: "Menopause signs" },
        { label: "Hot flashes", category: "Menopause signs" },
        { label: "Incontinence", category: "Menopause signs" },
        { label: "Increased facial hair", category: "Menopause signs" },
        { label: "Insomnia", category: "Menopause signs" },
        { label: "Irritability", category: "Menopause signs" },
        { label: "Irregular periods", category: "Menopause signs" },
        { label: "Joint pain", category: "Menopause signs" },
        { label: "Loss of muscle mass", category: "Menopause signs" },
        { label: "Loss of skin elasticity", category: "Menopause signs" },
        { label: "Memory issues", category: "Menopause signs" },
        { label: "Mood swings", category: "Menopause signs" },
        { label: "Night sweats", category: "Menopause signs" },
        { label: "Osteoporosis risk", category: "Menopause signs" },
        { label: "Restless legs", category: "Menopause signs" },
        { label: "Sensitivity to temperature", category: "Menopause signs" },
        { label: "Tingling extremities", category: "Menopause signs" },
        {
          label: "Urinary tract infections (UTIs)",
          category: "Menopause signs",
        },
        { label: "Vaginal dryness", category: "Menopause signs" },
        { label: "Weight gain", category: "Menopause signs" },
        //Mental Health
        { label: "Acceptance", category: "Mental Health" },
        { label: "Anger management", category: "Mental Health" },
        { label: "Anxiety", category: "Mental Health" },
        { label: "Brain fog", category: "Mental Health" },
        { label: "Burnout", category: "Mental Health" },
        { label: "Chronic fatigue", category: "Mental Health" },
        { label: "Coping strategies", category: "Mental Health" },
        { label: "Depression", category: "Mental Health" },
        { label: "Emotional eating", category: "Mental Health" },
        { label: "Fear of aging", category: "Mental Health" },
        { label: "Grief", category: "Mental Health" },
        { label: "Irritability", category: "Mental Health" },
        { label: "Inner peace", category: "Mental Health" },
        { label: "Intrusive thoughts", category: "Mental Health" },
        { label: "Life purpose", category: "Mental Health" },
        { label: "Lack of motivation", category: "Mental Health" },
        { label: "Loneliness", category: "Mental Health" },
        { label: "Low self-esteem", category: "Mental Health" },
        { label: "Meditation", category: "Mental Health" },
        { label: "Memory issues", category: "Mental Health" },
        { label: "Mindfulness", category: "Mental Health" },
        { label: "Mood swings", category: "Mental Health" },
        { label: "Negative body image", category: "Mental Health" },
        { label: "Overwhelm", category: "Mental Health" },
        { label: "Panic attacks", category: "Mental Health" },
        { label: "Perfectionism", category: "Mental Health" },
        { label: "Positive affirmations", category: "Mental Health" },
        { label: "Resilience", category: "Mental Health" },
        { label: "Self-care routines", category: "Mental Health" },
        { label: "Self-compassion", category: "Mental Health" },
        { label: "Sleep disturbances", category: "Mental Health" },
        { label: "Social withdrawal", category: "Mental Health" },
        { label: "Spiritual growth", category: "Mental Health" },
        { label: "Stress", category: "Mental Health" },
        { label: "Support networks", category: "Mental Health" },
        //Food and Drink
        { label: "Alcohol moderation", category: "Food and Drink" },
        { label: "Anti-inflammatory foods", category: "Food and Drink" },
        { label: "Berries", category: "Food and Drink" },
        { label: "Bone broth", category: "Food and Drink" },
        { label: "Calcium-rich foods", category: "Food and Drink" },
        { label: "Caffeine-free options", category: "Food and Drink" },
        { label: "Dark chocolate", category: "Food and Drink" },
        { label: "Fiber-rich foods", category: "Food and Drink" },
        { label: "Fermented foods", category: "Food and Drink" },
        { label: "Garlic", category: "Food and Drink" },
        { label: "Ginger", category: "Food and Drink" },
        { label: "Healthy fats", category: "Food and Drink" },
        { label: "Herbal teas", category: "Food and Drink" },
        { label: "Hydrating foods", category: "Food and Drink" },
        { label: "Iron-rich foods", category: "Food and Drink" },
        { label: "Lean proteins", category: "Food and Drink" },
        { label: "Leafy greens", category: "Food and Drink" },
        { label: "Low-fat dairy", category: "Food and Drink" },
        { label: "Low-sodium options", category: "Food and Drink" },
        { label: "Low-sugar snacks", category: "Food and Drink" },
        { label: "Meal planning", category: "Food and Drink" },
        { label: "Mindful eating", category: "Food and Drink" },
        { label: "Nuts and seeds", category: "Food and Drink" },
        { label: "Omega-3 foods", category: "Food and Drink" },
        { label: "Plant-based foods", category: "Food and Drink" },
        { label: "Processed foods to avoid", category: "Food and Drink" },
        { label: "Probiotics", category: "Food and Drink" },
        { label: "Snacks for energy", category: "Food and Drink" },
        { label: "Sugary foods to avoid", category: "Food and Drink" },
        { label: "Turmeric", category: "Food and Drink" },
        { label: "Vitamin B12 sources", category: "Food and Drink" },
        { label: "Vitamin D foods", category: "Food and Drink" },
        { label: "Water intake", category: "Food and Drink" },
        { label: "Whole grains", category: "Food and Drink" },
        { label: "Green juices", category: "Food and Drink" },
        { label: "Smoothies", category: "Food and Drink" },
        { label: "Community involvement", category: "Lifestyle" },
        { label: "Creative hobbies", category: "Lifestyle" },
        { label: "Decluttering", category: "Lifestyle" },
        { label: "Digital detox", category: "Lifestyle" },
        { label: "Exercise", category: "Lifestyle" },
        { label: "Family time", category: "Lifestyle" },
        { label: "Fashion and style", category: "Lifestyle" },
        { label: "Financial wellness", category: "Lifestyle" },
        { label: "Gardening", category: "Lifestyle" },
        { label: "Goal setting", category: "Lifestyle" },
        { label: "Healthy routines", category: "Lifestyle" },
        { label: "Journaling", category: "Lifestyle" },
        { label: "Life after menopause", category: "Lifestyle" },
        { label: "Meditation", category: "Lifestyle" },
        { label: "Minimalism", category: "Lifestyle" },
        { label: "Mindfulness", category: "Lifestyle" },
        { label: "Outdoor activities", category: "Lifestyle" },
        { label: "Personal empowerment", category: "Lifestyle" },
        { label: "Personal growth", category: "Lifestyle" },
        { label: "Pet care", category: "Lifestyle" },
        { label: "Positive affirmations", category: "Lifestyle" },
        { label: "Relaxation techniques", category: "Lifestyle" },
        { label: "Relationship building", category: "Lifestyle" },
        { label: "Reading", category: "Lifestyle" },
        { label: "Self-care routines", category: "Lifestyle" },
        { label: "Self-compassion", category: "Lifestyle" },
        { label: "Sleep hygiene", category: "Lifestyle" },
        { label: "Sleep routines", category: "Lifestyle" },
        { label: "Social connections", category: "Lifestyle" },
        { label: "Spirituality", category: "Lifestyle" },
        { label: "Stress management", category: "Lifestyle" },
        { label: "Sustainable living", category: "Lifestyle" },
        { label: "Time in nature", category: "Lifestyle" },
        { label: "Travel", category: "Lifestyle" },
        { label: "Volunteering", category: "Lifestyle" },
        { label: "Work-life balance", category: "Lifestyle" },
        { label: "Workplace wellness", category: "Lifestyle" },
        { label: "Yoga", category: "Lifestyle" },
        { label: "Acupuncture", category: "Treatment" },
        { label: "Alternative medicine", category: "Treatment" },
        { label: "Antidepressants", category: "Treatment" },
        { label: "Anxiety medications", category: "Treatment" },
        { label: "Bioidentical hormone therapy", category: "Treatment" },
        { label: "Black cohosh", category: "Treatment" },
        { label: "Bone density treatments", category: "Treatment" },
        { label: "Calcium supplements", category: "Treatment" },
        { label: "Cognitive behavioral therapy (CBT)", category: "Treatment" },
        { label: "Chiropractic care", category: "Treatment" },
        { label: "Customized skincare", category: "Treatment" },
        { label: "Dietary adjustments", category: "Treatment" },
        { label: "Evening primrose oil", category: "Treatment" },
        { label: "Essential oils", category: "Treatment" },
        { label: "Exercise regimen", category: "Treatment" },
        { label: "H hydration therapy", category: "Treatment" },
        { label: "Herbal remedies", category: "Treatment" },
        { label: "Hormone replacement therapy (HRT)", category: "Treatment" },
        { label: "Hot flash relief methods", category: "Treatment" },
        { label: "Laser therapy for vaginal dryness", category: "Treatment" },
        { label: "Lifestyle counseling", category: "Treatment" },
        { label: "Massage therapy", category: "Treatment" },
        { label: "Menopause education programs", category: "Treatment" },
        { label: "Mood stabilizers", category: "Treatment" },
        { label: "Natural supplements", category: "Treatment" },
        { label: "Over-the-counter (OTC) treatments", category: "Treatment" },
        { label: "Pain management", category: "Treatment" },
        { label: "Pelvic floor therapy", category: "Treatment" },
        { label: "Peer support groups", category: "Treatment" },
        { label: "Physical therapy", category: "Treatment" },
        { label: "Self-care practices", category: "Treatment" },
        { label: "Sleep aids", category: "Treatment" },
        { label: "Stress management techniques", category: "Treatment" },
        { label: "Therapeutic yoga", category: "Treatment" },
        { label: "Vaginal estrogen therapy", category: "Treatment" },
        { label: "Vitamin D supplements", category: "Treatment" },
        { label: "Weight management programs", category: "Treatment" },
        //   category: "Healthcare professional visit",
        {
          label: "Acupuncturist",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Alcohol counseling",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Alternative medicine consultations",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Annual wellness visit",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Behavioral health therapy",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Blood pressure check",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Bone density scan",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Cardiologist visit",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Cholesterol check",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Dermatologist visit",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Endocrinologist visits",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Estrogen therapy consultation",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Eye examination",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "General check-ups",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Gynecologist visits",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Hearing check",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Hormone level testing",
          category: "Healthcare and Professional Visit",
        },
        { label: "Mammogram", category: "Healthcare and Professional Visit" },
        {
          label: "Massage therapist",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Mental health counseling",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Menopause specialist",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Nutritionist consultation",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Osteoporosis screening",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Pain management specialist",
          category: "Healthcare and Professional Visit",
        },
        { label: "Pelvic exam", category: "Healthcare and Professional Visit" },
        {
          label: "Physical therapy sessions",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Primary care physician",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Reproductive health counseling",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Sleep specialist",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Smoking cessation programs",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Support groups",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Thyroid screening",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Urologist visit",
          category: "Healthcare and Professional Visit",
        },
        {
          label: "Weight management counseling",
          category: "Healthcare and Professional Visit",
        },
        // Add more tags as needed
      ],
      storyTags: [],
    };
  },

  actions: {
    addStoryTags(tags) {
      console.log(tags);
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
