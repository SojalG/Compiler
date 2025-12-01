import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaFingerprint,
  FaGoogle,
  FaRegEye,
  FaRegEyeSlash,
  FaFacebookF,
} from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import newlogo from './../../src/assets/newlogo.png';
import cmpltlogo from './../../src/assets/cmplt-logo.png';
import LiquidEther from './LiquidEther';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setError("Password must be at least 8 characters.");
    } else {
      setError("");
    }
  };

  const errorNotify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

  const successNotify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorNotify("Please enter a valid email address.");
      return;
    }
    if (error || password === "") {
      errorNotify("Please enter a valid password.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loginCheck", "true");
        successNotify("Login successful!");
        navigate("/compiler");
      } else {
        errorNotify(`${data.message}`);
      }
    } catch (err) {
      console.error(err);
      errorNotify("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#000613]">
      <div className="w-full h-full absolute">
        <LiquidEther
          colors={['#5227FF', '#16abe1', '#a3aacc']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div
        className="p-1 rounded-2xl w-[95%] max-w-md z-10 bg-[#101828]"
        style={{ boxShadow: "0 0 15px 3px #335976ff" }}
      >
        <div className="w-full p-6 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
          <a href="/compilein/" className='flex justify-center active:scale-95 items-center'>
            <img className='logo w-[22px] md:w-[38px]' src={newlogo} alt="logo" />
            <img className='logo w-[120px] md:w-[150px] mt-1' src={cmpltlogo} alt="logo" />
          </a>
          <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link
              to="./signup"
              className="text-white underline hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>

          <div className="w-full flex flex-col gap-3 mt-2">
            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
              <MdAlternateEmail />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
            </div>

            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              ) : (
                <FaRegEye
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              )}
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base cursor-pointer text-white"
          >
            Login
          </button>

          <div className="relative w-full flex items-center justify-center py-3">
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
            <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
              Or
            </h3>
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
          </div>

          <div className="w-full flex items-center justify-evenly md:justify-between gap-2 mt-2">
            <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              <BsApple className="text-lg md:text-xl" />
            </div>
            <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              <FaGoogle className="text-lg md:text-xl" />
            </div>
            <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800">
              {/* <FaTwitter className="text-lg md:text-xl" /> */}
              <FaFacebookF className="text-lg md:text-xl" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;