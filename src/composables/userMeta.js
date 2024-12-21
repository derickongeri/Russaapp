import { ref } from "vue";
import useSupabase from "src/boot/supabase";
import { useMetaStore } from "src/stores/userMeta";
import { useSignsStore } from "src/stores/signs";
import userAuthUser from "src/composables/userAuthUser";


const user = ref(null);
const store = useMetaStore();
const signsStore = useSignsStore();

export default function userMeta() {
  const { supabase } = useSupabase();

  const submitUserMeta = async () => {
    try {
      // 1. Get the current user email
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email;

      if (!email) {
        throw new Error("User not logged in or email not available.");
      }

      // 2. Check if the user already exists in the user_profile table
      const { data: userProfile, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("email", email)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error; // Handle other errors apart from 'no records found'
      }

      const physicalInfoJson = store.physicalInfo;
      const menopauseStatusJson = store.menopauseStatus;
      const healthConditionsJson = store.healthConditions;
      const frequentSignsJson = signsStore.userSigns;

      // 3. If no user found, insert new row with email and physicalInfo
      if (!userProfile) {
        const { error: insertError } = await supabase
          .from("user_profile")
          .insert([
            {
              email: email,
              physical_info: physicalInfoJson, // Store physical info as JSONB
              knows_status: menopauseStatusJson,
              frequent_sings: frequentSignsJson,
              health_info: healthConditionsJson,
            },
          ]);

        if (insertError) {
          throw insertError;
        }

        console.log("New profile created successfully.");
      } else {
        // Optionally: Update existing profile's physical_info
        const { error: updateError } = await supabase
          .from("user_profile")
          .update({
            physical_info: physicalInfoJson,
            physical_info: physicalInfoJson, // Store physical info as JSONB
            knows_status: menopauseStatusJson,
            frequent_sings: frequentSignsJson,
            health_info: healthConditionsJson,
          })
          .eq("email", email);

        if (updateError) {
          throw updateError;
        }

        console.log("Profile updated successfully.");
      }
    } catch (error) {
      console.error("Error in submitting physical info:", error.message);
    }
  };

  return {
    submitUserMeta,
  };
}
