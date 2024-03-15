import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const RecoverPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);
  const [closeWindow, setCloseWindow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }

    if (data) {
      setFormError(null);
      setCloseWindow(true);
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email Id">Email:</label>
        <input
          type="text"
          id="title"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button>Recover password</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      {closeWindow && (
        <div className=" text-center py-4">
          <p>Recovery link sent to your email pls close this window</p>
        </div>
      )}
    </div>
  );
};

export default RecoverPassword;
