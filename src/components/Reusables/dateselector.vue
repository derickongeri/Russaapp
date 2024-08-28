<template>
  <div class="q-mb-sm q-mx-md" style="width: 100%;">
    <q-btn
      icon-right="ti-calendar"
      size="lg"
      unelevated
      outline
      no-caps
      :label="formattedDate"
      class="full-width header-text tab-action-btn"
      text-color=""
    >
      <q-popup-proxy
        @before-show="updateProxy"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date v-model="proxyDate" mask="dddd, MMM D, YYYY">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="save"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { format } from "date-fns"; // Import date-fns for date formatting

// Helper function to get ordinal suffix
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export default {
  setup() {
    const today = new Date(); // Get today's date
    const date = ref(today);
    const proxyDate = ref(today);

    // Create a computed property to format the date with the required format
    const formattedDate = computed(() => {
      const dayOfWeek = format(date.value, "EEE"); // Short day of the week (e.g., Wed)
      const dayOfMonth = format(date.value, "d"); // Day of the month (e.g., 10)
      const month = format(date.value, "MMM"); // Short month (e.g., Jul)
      const year = format(date.value, "yyyy"); // Year (e.g., 2024)

      const ordinalSuffix = getOrdinalSuffix(parseInt(dayOfMonth, 10)); // Get the correct suffix

      return `${dayOfWeek} ${dayOfMonth}${ordinalSuffix} ${month} ${year}`;
    });

    // Update the proxyDate when the popup opens
    function updateProxy() {
      proxyDate.value = date.value;
    }

    // Save the selected date
    function save() {
      date.value = proxyDate.value;
    }

    return {
      date,
      proxyDate,
      formattedDate, // Bind formattedDate to the button label
      updateProxy,
      save,
    };
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
