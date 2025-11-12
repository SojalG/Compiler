import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordView = () => setShowPassword(!showPassword);

  const validatePasswords = (pass, confirm) => {
    const regex =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!regex.test(pass)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
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

  const handleSignup = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (error || password === "" || confirmPassword === "") {
      alert("Please fix the errors before signing up.");
      return;
    }
    alert("Signup successful!");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="p-1 rounded-xl w-[95%] max-w-md"
        
        style={{ boxShadow: "0 0 15px 3px #335976ff" }}
      >
        <div className="w-full p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
          <img src="/logo.png" alt="logo" className="w-12 md:w-14" />
          <h1 className="text-lg md:text-xl font-semibold">Create Account</h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-white underline hover:text-blue-400">
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
            className="w-full p-2 bg-green-500 rounded-xl mt-3 hover:bg-green-600 text-sm md:text-base"
          >
            Sign Up
          </button>

          <div className="relative w-full flex items-center justify-center py-3">
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
            <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">Or</h3>
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
              <FaFacebookF className="text-lg md:text-xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;