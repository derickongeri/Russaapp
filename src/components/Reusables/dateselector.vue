<template>
  <div class="q-mb-sm q-mx-md" style="width: 100%">
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
        <q-date v-model="proxyDate" :options="optionsFn">
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

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useLogsStore } from "src/stores/logs";

const logsStore = useLogsStore();

// Helper function to get ordinal suffix
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getFormattedToday() {
  const today = new Date(); // Get today's date
  const year = today.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so we add 1), and ensure two digits
  const day = String(today.getDate()).padStart(2, "0"); // Get the day and ensure two digits

  return `${year}/${month}/${day}`; // Return in yyyy/mm/dd format
}

const today = new Date(); // Get today's date
const date = ref(getFormattedToday());
const proxyDate = ref(getFormattedToday());

// Create a computed property to format the date with the required format
const formattedDate = computed(() => {
  let datestring;
  const todaysDate = getFormattedToday();

  if (date.value === todaysDate) {
    datestring = `Today`;
  } else {
    const dayOfWeek = format(date.value, "EEE"); // Short day of the week (e.g., Wed)
    const dayOfMonth = format(date.value, "d"); // Day of the month (e.g., 10)
    const month = format(date.value, "MMM"); // Short month (e.g., Jul)
    const year = format(date.value, "yyyy"); // Year (e.g., 2024)

    const ordinalSuffix = getOrdinalSuffix(parseInt(dayOfMonth, 10)); // Get the correct suffix

    datestring = `${dayOfWeek} ${dayOfMonth}${ordinalSuffix} ${month} ${year}`;
  }

  return datestring;
});

// Update the proxyDate when the popup opens
const updateProxy = function () {
  proxyDate.value = date.value;
};

// Save the selected date
const save = function () {
  date.value = proxyDate.value;
  logsStore.setLogsDate(proxyDate.value);
  logsStore.setDisplayDate(formattedDate.value);
};

const optionsFn = (date) => {
  const today = new Date(); // Get today's date
  const year = today.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so we add 1), and ensure two digits
  const day = String(today.getDate()).padStart(2, "0"); // Get the day and ensure two digits

  return date <= `${year}/${month}/${day}`;
};

onMounted(() => {
  date.value = getFormattedToday();
  proxyDate.value = getFormattedToday();
  logsStore.setLogsDate(getFormattedToday());
  logsStore.setDisplayDate(formattedDate.value);
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
