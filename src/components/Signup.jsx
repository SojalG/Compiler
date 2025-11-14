import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaFingerprint,
  FaGoogle,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import bgimg from "./../../src/pics/newbg.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordView = () => setShowPassword(!showPassword);

  const validatePasswords = (pass, confirm) => {
    // const regex =
    //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    // if (!regex.test(pass)) {
    //   setError(
    //     "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
    //   );
    if (pass.length < 8 || confirm.length < 8) {
      setError("password length > 8");
    } else if (pass !== confirm) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePasswords(password, value);
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


  const handleSignup = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // alert("Please enter a valid email address.");
      errorNotify("Please enter a valid email address.");
      // <ToastContainer />
      return;
    }
    if (error || password === "" || confirmPassword === "") {
      errorNotify("Please fix the errors before signing up.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // alert(data.message || "Signup successful!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/loginpage");
      } else {
        errorNotify(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      errorNotify("Server error. Please try again later.");
    }

    successNotify("Signup successful!");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgimg})`,
          opacity: 0.2,
        }}
      />
      <div
        className="p-1 rounded-2xl w-[95%] max-w-md relative z-10 bg-[#101828]"
        style={{ boxShadow: "0 0 15px 8px #335976ff" }}
      >
        <div className="w-full p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
          <div className="flex">
            {/* <img src="/logo.png" alt="logo" className="w-6 md:w-6 mr-1.5" /> */}
            <h2 className="text-3xl font-bold">
              <span className="">Compile</span>
              <span className="text-[#64bcff]">IN</span>
            </h2>
          </div>
          <h1 className="text-lg md:text-xl font-semibold">Create Account</h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/loginpage"
              className="text-white underline hover:text-blue-400"
            >
              Login
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

            <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
              <FaFingerprint />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <button
            onClick={handleSignup}
            className="w-full p-2 bg-green-500 rounded-xl mt-3 hover:bg-green-600 text-sm md:text-base text-white"
          >
            Sign Up
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

export default Signup;