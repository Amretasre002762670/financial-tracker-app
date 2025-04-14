import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../../redux/slices/authSlice";


const AuthForm = ({mode = "login"}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      setUsername("");
      setPassword("");
      setError("");
    }, []);

    const handleSubmit = async(e) => {
        console.log(mode, "mode");
        e.preventDefault();
        const url = mode === "login" ? "http://localhost:5001/auth/login" : "http://localhost:5001/auth/register";
        try {
            const response = await axios.post(url, {
                username,
                password
            });

            if (response.status === 201 || response.status === 200) {
                const { token, username } = response.data;

                sessionStorage.setItem("username", username);
                sessionStorage.setItem("token", token);

                dispatch(login({ user: username, token }));

                setError("");

                navigate("/home");
                
            } else if (response.status === 401) {
                setError("Invalid credentials");
            } else if (response.status === 404) {
                setError("User not found");
            } else if (response.status === 409) {
                setError("User already exists");
            } else {
                console.log(response.status)
                setError("An unexpected error occurred");
            }
        } catch (e) {
            console.log(`Error in ${mode}: `, e);
            navigate("/serverError");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-[linear-gradient(to_right,_#764BA2,_#b36be8)] p-8 rounded-[5px] shadow-md w-full max-w-md h-[340px]">
            <h1 className="text-2xl font-bold mb-4 text-[#ededed] text-center">
              {mode === "signup" ? "Sign Up" : "Login"}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center p-4 space-x-2">
                <span className="text-white whitespace-nowrap text-bold text-l">User Name:</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="border-0 border-b-2 border-grey focus:border-[#e549ff]/100 focus:outline-none focus:ring-0 hover:border-[#e549ff]/60 w-full bg-transparent"
                />
              </div>
              <div className="flex items-center p-4 space-x-2">
                <span className="text-white text-bold text-l">Password:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border-0 border-b-2 border-grey focus:border-b-[#e549ff]/100 focus:outline-none focus:ring-0 hover:border-b-[#e549ff]/60 w-full bg-transparent"
                />
              </div>
              <div>
                {error && (
                  <div className="text-red-500 text-center font-bold h-[20px]">{error}</div>
                )}
              </div>
              <div className="flex justify-center p-4">
                <button
                  type="submit"
                  className="bg-[#ededed] shadow-custom-gray border-[#8401e7] border-[1.5px] text-[#8401e7] hover:text-white hover:bg-[#8401e7]/100 focus:bg-[#8401e7]/100 font-bold py-2 px-4 rounded-[50px]"
                >
                  {mode === "signup" ? "Sign Up" : "Log In"}
                </button>
              </div>
              <div>
                    <Link to={mode === "login"? "/signup": "/"} className="underline font-bold text-white hover:text-black shadow-lg">{mode === "login"? "Sign Up": "Log In"}</Link>
                </div>
            </form>
          </div>
        </div>
      );
};

export default AuthForm;