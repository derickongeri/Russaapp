// stores/signs.js
import { defineStore } from "pinia";

export const useLogsStore = defineStore("logs", {
  state: () => {
    return {
      selectedLogsDate: "",
      displayDate: "",
      signs_log: [],
      added_sign: {},
    };
  },

  actions: {
    setLogsDate(val) {
      console.log(val);
      this.selectedLogsDate = val;
    },
    setDisplayDate(val) {
      this.displayDate = val
    },
    addSignsLog(val) {
      console.log(val)
      this.signs_log = val;
    },
    setAddedSing(val) {
      console.log(val)
      this.added_sign = val;
    },
    fetchUserSigns(email, date) {},
  },
});
