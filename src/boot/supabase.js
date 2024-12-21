import { createClient } from "@supabase/supabase-js";
//import userAuthUser from "src/composables/userAuthUser";

//const supabaseUrl = "https://zziuvvorxkugtbmruglb.supabase.co";
const supabaseUrl = "https://admin.rusa-app.com";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("init supabase:", supabase);

// supabase.auth.onAuthStateChange((event, session) => {
//   const { user } = userAuthUser();

//   user.value = session?.user;
// });

export default function useSupabase() {
  return { supabase };
}



