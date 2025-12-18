import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center transition-all duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 text-white"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur shadow-lg hover:scale-110 transition"
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text mb-6">
        Smart AQI Prediction System
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-center max-w-2xl mb-10 text-white/90">
        Monitor real-time air quality across India, predict future AQI
        levels, receive health recommendations, and share insights instantly.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-8 py-3 rounded-full bg-black/80 hover:bg-black text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:scale-105 transition"
        >
          Register
        </Link>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-sm text-white/80">
        © 2025 Smart AQI | India
      </p>
    </div>
  );
};

export default Home;
