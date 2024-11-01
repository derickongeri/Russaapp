import { useQuasar } from "quasar";
export default function useNotify() {
  const $q = useQuasar();

  const alerts = [
    {
      color: "negative",
      message: "Woah! Danger! You are getting good at this!",
      icon: "report_problem",
    },
  ];

  const notifySuccess = (message) => {
    $q.notify({
      type: "positive",
      message: message || "All right !",
      position: "top",
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || "Failed !",
      position: "top",
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
