import { ref } from "vue";
import useSupabase from "src/boot/supabase";
import { useRoute, useRouter } from "vue-router";

const stories = ref([]);
const storyData = ref(null);
const comments = ref([]);

export default function setStories() {
  const { supabase } = useSupabase();
  const router = useRouter();

  // Fetch all stories
  const fetchStories = async () => {
    const { data, error } = await supabase
      .from("user_stories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching stories:", error.message);
    } else {
      stories.value = data.filter((story) => story.reported !== true);
    }
  };

  // Fetch story data by ID
  const fetchStory = async (storyId) => {
    if (storyId) {
      const { data, error } = await supabase
        .from("user_stories")
        .select("*")
        .eq("story_id", storyId)
        .single(); // Retrieve the story by ID

      if (error) {
        console.error("Error fetching story:", error.message);
      } else {
        storyData.value = data;
      }
    }
  };

  const deleteStory = async (storyId) => {
    const { error: deleteError } = await supabase
      .from("user_stories")
      .delete()
      .eq("story_id", storyId);
    if (deleteError) {
      console.error("Error deleting comment:", deleteError.message);
    } else {
      const { error: deleteError } = await supabase
        .from("story_comments")
        .delete("*")
        .eq("story_id", storyId);

      router.push({
        name: "stories",
      });
    }
  };

  // Fetch all stories on component mount
  const fetchComments = async (storyId) => {
    const { data, error } = await supabase
      .from("story_comments")
      .select("*")
      .eq("story_id", storyId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error.message);
    } else {
      comments.value = data.filter((comment) => comment.reported !== true);
    }
  };

  const insertNewComment = async (storyId, commentOwner, comment) => {
    const { newComment, error: insertError } = await supabase
      .from("story_comments")
      .insert([
        {
          owner: commentOwner,
          story_id: storyId,
          comment_text: comment,
        },
      ])
      .select();
    if (insertError) {
      throw insertError;
    } else {
      const { data, error: fetchError } = await supabase
        .from("user_stories")
        .select("comments")
        .eq("story_id", storyId)
        .single();

      if (fetchError) {
        console.error("Error fetching current views:", fetchError.message);
        return;
      }

      const currentCommentsCount = data.comments || 0;
      const newCommentsCount = currentCommentsCount + 1;

      // Update the Comments column with the new value
      const { error: updateError } = await supabase
        .from("user_stories")
        .update({ comments: newCommentsCount })
        .eq("story_id", storyId)
        .select();
    }
  };

  const updateStory = async (storyId) => {
    const { data, error } = await supabase
      .from("user_stories")
      .select("*")
      .eq("story_id", storyId)
      .single();

    storyData.value.comments = data.comments;
  };

  // Subscribe to new messages
  const subscribeToStory = async (storyId) => {
    supabase
      .channel("public:user_stories")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_stories" },
        (payload) => {

          if (payload.eventType === "INSERT") {
            stories.value.unshift(payload.new);
          } else if (payload.eventType === "UPDATE") {
            storyData.value.comments = payload.new.comments
            storyData.value.views = payload.new.views
          } else if (payload.eventType === "DELETE") {

          }
          // const newStoryData = fetchStory(storyId);
          // storyData.value.comments = newStoryData.comments

          //messages.value.push(payload.new); // Add new message to the list
        }
      )
      .subscribe();
  };

  // Subscribe to new messages
  const subscribeToMessages = async (storyId) => {
    supabase
      .channel("public:story_comments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "story_comments" },
        (payload) => {
          // console.log(payload);

          if (payload.eventType === "INSERT") {
            if (payload.new.story_id === storyId) {
              comments.value.unshift(payload.new);
              // updateStory(storyId);
            } // Add new message to the list
          } else if (payload.eventType === "UPDATE") {
            const index = messages.value.findIndex(
              (msg) => msg.id === payload.old.id
            );
            if (index !== -1) {
              messages.value[index] = payload.new; // Update message in the list
            }
          } else if (payload.eventType === "DELETE") {
            comments.value = comments.value.filter(
              (msg) => msg.id !== payload.old.id
            );
          }
          // const newStoryData = fetchStory(storyId);
          // storyData.value.comments = newStoryData.comments

          //messages.value.push(payload.new); // Add new message to the list
        }
      )
      .subscribe();
  };

  const deleteComment = async (commentId, storyId) => {
    const { error: deleteError } = await supabase
      .from("story_comments")
      .delete()
      .eq("comment_id", commentId); // Use the comment_id to identify the comment to delete

    if (deleteError) {
      console.error("Error deleting comment:", deleteError.message);
    } else {
      console.log("Comment deleted successfully");
      const { data, error: fetchError } = await supabase
        .from("user_stories")
        .select("comments")
        .eq("story_id", storyId)
        .single();

      if (fetchError) {
        console.error("Error fetching current views:", fetchError.message);
        return;
      }

      const currentCommentsCount = data.comments || 0;
      const newCommentsCount = currentCommentsCount - 1;

      // Update the Comments column with the new value
      const { error: updateError } = await supabase
        .from("user_stories")
        .update({ comments: newCommentsCount })
        .eq("story_id", storyId)
        .select();

      fetchStory(storyId);
      fetchComments(storyId);
    }
  };

  const reportComment = async (commentId, storyId) => {
    try {
      const { data, error } = await supabase
        .from("story_comments")
        .update({ reported: true })
        .eq("comment_id", commentId)
        .select("reported")
        .single();

      if (error) {
        console.error("Error reporting story:", error.message);
        return;
      }

      if (data.reported) {
        console.log("story hass been reported"); // Update UI to reflect that the story has been reported
        fetchComments(storyId);
        // reportCommentDialog.value = !reportCommentDialog.value;
        // dialogOpen.value = !dialogOpen.value;
      }
    } catch (err) {
      console.error("Unexpected error reporting story:", err.message);
    }
  };

  // Format story time
  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      const options = { day: "2-digit", month: "short" };
      if (now.getFullYear() === date.getFullYear()) {
        return new Intl.DateTimeFormat("en-US", options).format(date);
      } else {
        options.year = "2-digit";
        return new Intl.DateTimeFormat("en-US", options).format(date);
      }
    }
  };

  return {
    stories,
    storyData,
    comments,
    fetchStories,
    fetchStory,
    fetchComments,
    insertNewComment,
    deleteComment,
    deleteStory,
    reportComment,
    formatTime,
    subscribeToMessages,
    subscribeToStory,
  };
}
