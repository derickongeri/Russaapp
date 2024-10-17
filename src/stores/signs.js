// stores/signs.js
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useSignsStore = defineStore("signs", {
  state: () => {
    const { t } = useI18n();

    return {
      allSigns: [
        { id: 1, label: t("signs.abdominal_pain") },
        { id: 2, label: t("signs.acne") },
        { id: 3, label: t("signs.anxiety") },
        { id: 4, label: t("signs.back_pain") },
        { id: 5, label: t("signs.breast_tenderness") },
        { id: 6, label: t("signs.cold_flashes") },
        { id: 7, label: t("signs.depression") },
        { id: 8, label: t("signs.difficulty_sleeping") },
        { id: 9, label: t("signs.dizziness") },
        { id: 10, label: t("signs.dry_skin") },
        { id: 11, label: t("signs.fatigue") },
        { id: 12, label: t("signs.forgetfulness") },
        { id: 13, label: t("signs.headaches") },
        { id: 14, label: t("signs.hot_flashes") },
        { id: 15, label: t("signs.irritability") },
        { id: 16, label: t("signs.joint_pain") },
        { id: 17, label: t("signs.mood_swings") },
        { id: 18, label: t("signs.night_sweats") },
        { id: 19, label: t("signs.osteoporosis") },
        { id: 20, label: t("signs.rapid_heartbeat") },
        { id: 21, label: t("signs.skin_itching") },
        { id: 22, label: t("signs.stress_incontinence") },
        { id: 23, label: t("signs.urinary_urgency") },
        { id: 24, label: t("signs.vaginal_dryness") },
        { id: 25, label: t("signs.vaginal_itching") },
        { id: 26, label: t("signs.weight_gain") },
      ],
      userSigns: [],
    };
  },

  actions: {
    getUserSignsWithRatings() {
      return this.userSigns.map((sign) => ({
        label: sign.label,
        value: sign.label,
        rating: "none", // Default rating
      }));
    },
    addSignToUserSigns(sign) {
      if (!this.userSigns.find((s) => s.id === sign.id)) {
        this.userSigns.push({ ...sign });
        this.saveUserSigns();
      }
    },
    // Function to add multiple signs (accepts a list of signs)
    addSignsToUserSigns(signs) {
      signs.forEach((sign) => {
        // Check if the sign already exists before adding
        if (!this.userSigns.find((s) => s.id === sign.id)) {
          this.userSigns.push({ ...sign });
        }
      });
      console.log(this.userSigns)
      this.saveUserSigns();
    },
    removeSignFromUserSigns(id) {
      this.userSigns = this.userSigns.filter((s) => s.id !== id);
      this.saveUserSigns();
    },
    resetUserSigns() {
      this.userSigns = [];
      this.saveUserSigns();
    },
    saveUserSigns() {
      localStorage.setItem("userSigns", JSON.stringify(this.userSigns));
    },
  },
});
