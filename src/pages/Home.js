import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// components
import PostCard from "../components/PostCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      const remainingPosts = posts.filter((post) => post.id !== id);
      setPosts(remainingPosts);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the posts");
        setPosts(null);
      }
      if (data) {
        setPosts(data);
        setFetchError(null);
      }
    };

    fetchPosts();
  }, [orderBy]);

  return (
    <div className="page home">
      <div className=" sticky top-28 z-[9999]">
        <p>Order by:</p>
        <button
          className="mr-10 bg-primary text-white border-0 px-8 py-4 rounded-md font-poppins cursor-pointer bg-[#12bca2]"
          onClick={() => setOrderBy("created_at")}
        >
          Time Created
        </button>
        <button
          className="mr-10 bg-primary text-white border-0 px-8 py-4 rounded-md font-poppins cursor-pointer bg-[#12bca2]"
          onClick={() => setOrderBy("title")}
        >
          Title
        </button>
        <button
          className="mr-10 bg-primary text-white border-0 px-8 py-4 rounded-md font-poppins cursor-pointer bg-[#12bca2]"
          onClick={() => setOrderBy("rating")}
        >
          Rating
        </button>
      </div>
      {fetchError && <p>{fetchError}</p>}
      {posts && (
        <div>
          {/* order-by buttons */}
          <div className="mt-40 grid grid-cols-3 gap-40">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
