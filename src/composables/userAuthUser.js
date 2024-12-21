import { ref } from "vue";
import useSupabase from "src/boot/supabase";

const user = ref(null);

export default function userAuthUser() {
  const { supabase } = useSupabase();
  const baseUrl = "https://rusaapp.com/#/";
  const resetpasswordUrl = `https://rusaapp.com/#/resetpassword/`;
  const confirmSingupUrl = `https://rusaapp.com/#/auth/`;
  // const baseUrl = "http://localhost:9000/#/onboarding/";

  const login = async ({ email, password }, rememberMe) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        shouldPersist: rememberMe, // Persist session if "Remember Me" is checked
      },
    });
    user.value = response.data.user;
    console.log(user.value);
    if (response.error) throw response.error;
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    user.value = null;
    if (error) throw error;
  };

  // const isLoggedIn = () => {
  //   return !!user.value
  // }
  const rememberUser = async () => {
    const {
      data
    } = await supabase.auth.getSession();

    console.log(data)

    if (data.session && data.session.user) {
      console.log('inside condition', data.session.user)
      user.value = data.session.user
      return data.session.user
    }
  };

  const isLoggedIn = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session && data.session.user) {
      user.value = data.session.user;
    }
    return data.session !== null;
  };

  const register = async ({ email, password, ...meta }) => {
    console.log(meta);
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: meta,
        emailRedirectTo: confirmSingupUrl,
      },
    });
    if (error) throw error;
    return user;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetpasswordUrl,
    });
    if (error) throw error;
    return user;
  };

  const updateUserPassword = async (new_password) => {
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
    });
    if (error) throw error;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    updateUserPassword,
    rememberUser
  };
}
