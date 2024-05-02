'use client'
import Navigation from "./components/Navigation";
import Login from "./login/page";


export default function Home() {
  return localStorage.getItem("accessToken") ? (
    <div>
      <h1 className="text-indigo-600">
        Stock Flow <span className="text-gray-500">Home</span>
      </h1>

      <Navigation />
    </div>
  ) : (
    <Login />
  );
}
