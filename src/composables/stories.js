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
  };
}
