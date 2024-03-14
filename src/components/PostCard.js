import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const PostCard = ({ post, handleDelete }) => {
  return (
    <div className="w-full px-10 bg-white box-border rounded-md relative">
      <h3 className="mt-5 font-bold">{post.title}</h3>
      <p className="mb-5">{post.method}</p>
      <div className="absolute top-0 right-0 bg-secondary text-white rounded-md text-center bg-blue-300 w-10">
        {post.rating}
      </div>
      <div className="buttons">
        <Link to={"/" + post.id}>
          <i className="material-icons text-gray-400 text-lg p-2  bg-gray-200 rounded-full cursor-pointer">
            edit
          </i>
        </Link>
        <i
          className="material-icons text-red-400 text-lg p-2  bg-red-200 rounded-full cursor-pointer ml-4 mb-2"
          onClick={() => handleDelete(post.id)}
        >
          delete
        </i>
      </div>
    </div>
  );
};

export default PostCard;
