import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    console.log("data", data);
    if (data) {
      setFormError(null);
      window.location.href = "/";
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email Id">Email: (should be same as user)</label>
        <input
          type="text"
          id="title"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">New password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>update Password</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
