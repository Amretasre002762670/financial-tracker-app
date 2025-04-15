import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        username,
        password
      });
      if (response.status === 200) {
        const {token, username, id} = response.data;
        // set session 
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", id);

        dispatch(login({user: username, token})); // dispatch the login action
        setError("");
        navigate("/home");
      } else if (response.status === 401) {
        setError("Invalid credentials");
      } else if (response.status === 404) {
        setError("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        setError("User not found");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[linear-gradient(to_right,_#764BA2,_#b36be8)] p-8 rounded-[5px] shadow-md w-full max-w-md h-[300px]">
        <h1 className="text-2xl font-bold mb-4 text-[#ededed] text-center">Login</h1>
        <div className="h-full max-h-md">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center p-4 space-x-2">
              <span className="text-white whitespace-nowrap">User Name:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="border-0 border-b-2 border-grey focus:border-[#e549ff]/100 hover:border-[#e549ff]/100 w-full bg-transparent"
              />
            </div>
            <div className="flex items-center p-4 space-x-2">
              <span className="text-white">Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-0 border-b-2 border-grey focus:border-[#e549ff]/100 hover:border-[#e549ff]/100 w-full bg-transparent"
              />
            </div>
            <div>
              {error && 
                <div className="font-red font-bold h-[10px]">{error}</div>}
            </div>
            <div className="flex justify-center p-4">
              <button type="submit"
              className="bg-[#8401e7]/60 hover:bg-[#8401e7]/100 text-white font-bold py-2 px-4 rounded-[50px]">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
