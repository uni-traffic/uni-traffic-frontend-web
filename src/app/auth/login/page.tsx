"use client";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // testing the error message
  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required.");
    } else if (email != "email") {
      setError("Invalid email .");
    } else if (password != "password") {
      setError("Invalid password.");
    }
    else {
      setError("");
    } 
  };

  return (
    <div className="w-screen h-screen bg-[url('/neuCampusBlurred.png')] overflow-hidden bg-cover bg-center bg-no-repeat ] flex flex-col">
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex justify-center items-center w-[90vw] h-full">
          {/* uni traffic title */}
          <div className="flex-col items-center gap-5 text-center m-10  md: hidden lg:flex ">
            <div className="bg-[url('/uniTrafficLogo.png')] bg-cover bg-center bg-no-repeat w-[300px] h-[189px]" />
            <p className="max-w-[600px] text-sm text-black">
              UniTraffic ensures hassle-free vehicle entry at New Era University
              by verifying sticker registration and tracking violations with a
              quick scan.
            </p>
          </div>
          {/* login component */}
          <div className=" bg-opacity-10 bg-[rgba(255,255,255,0.77)]  mr-0 lg:mr-10 p-10 pt-3.5 flex flex-col gap-4 ">
            <img
              src="/neu-logo.png"
              alt="NEU Logo"
              className="w-[80px] h-[80px] mx-auto m-1"
            />
            <div className="flex flex-col justify-center items-center bg-white w-100 h-fit rounded-md shadow-[0px_0px_8px_0px_rgba(0,0,0,0.5)]  ">
              <h2 className="text-lg font-semibold mt-3 ">Log in to</h2>
              <img
              src="/uniTrafficLogoCropped.png"
              alt="UniTraffic"
              className="w-[150px] h-auto mx-auto mb-1.5"
              />
              <button className="w-75 p-2 m-3 bg-white border border-gray-500 rounded-md flex items-center justify-center gap-2 shadow-md hover:opacity-70 cursor-pointer">
                <img
                  src="/googleLogo.png"
                  alt="Google Logo"
                  className="w-4 h-auto"
                />
                <span className="text-sm font-medium">Sign in with Google</span>
              </button>
              <p className={`text-xs mb-2 ${error ? "text-red-500 font-semibold bg-red-300 p-1" : "text-gray-500"}`}>
                {error ? error : "Or, use my email address"}
              </p>
              <input
                type="text"
                placeholder="Email"
                className="w-75 p-2 border border-gray-500 rounded-md m-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Password"
                className="w-75 p-2 border border-gray-500 rounded-md m-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button 
              onClick={handleLogin}
              className="w-75 p-2 mt-4 bg-black text-white font-semibold rounded-md mb-10 hover:opacity-85 cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
