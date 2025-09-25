import { Landing } from "./components/Landing";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Toaster, toast } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { useState, useEffect } from "react";
import axios from "axios";

type AppState = "landing" | "signin" | "signup" | "dashboard" | "public";

const backendURL = import.meta.env.VITE_BACKEND_URL as string;

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userName, setUserName] = useState<string>("");

  
  useEffect(() => {
    const token = localStorage.getItem("sb_token");
    if (token) {
      setAppState("dashboard");
    }
  }, []);

  
  const handleSignUp = async (name: string, email: string, password: string) => {
    try {
      await axios.post(`${backendURL}/signup`, { name, email, password });
      toast.success("Account created successfully! Please sign in.");
      setAppState("signin");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ Signin handler
  async function handleSignIn(email: string, password: string) {
    try {
      const res = await axios.post(`${backendURL}/signin`, { email, password });
      const { token, user } = res.data;

      localStorage.setItem("sb_token", token);
      setUserName(user.name || "User");

      toast.success(`Welcome back, ${user.name || "User"}!`);
      setAppState("dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signin failed");
    }
  }

  
  const handleLogout = () => {
    localStorage.removeItem("sb_token"); // clear token
    setUserName("");                     // clear username
    setAppState("landing");              // redirect to landing
    toast.success("Logged out successfully");
  };

  const handleShareBrain = (shareId: string) => {
    console.log("share brain attempted", shareId);
  };

  const renderCurrentView = () => {
    switch (appState) {
      case "landing":
        return (
          <Landing
            onGetStarted={() => setAppState("signup")}
            onSignIn={() => setAppState("signin")}
          />
        );

      case "signin":
        return (
          <SignIn
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAppState("signup")}
            onBackToLanding={() => setAppState("landing")}
          />
        );

      case "signup":
        return (
          <SignUp
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAppState("signin")}
            onBackToLanding={() => setAppState("landing")}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            onLogout={handleLogout}      
            onShareBrain={handleShareBrain}
            userName={userName}
          />
        );

      default:
        return (
          <Landing
            onGetStarted={() => setAppState("signup")}
            onSignIn={() => setAppState("signin")}
          />
        );
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="second-brain-theme">
      {renderCurrentView()}
      <Toaster />
    </ThemeProvider>
  );
}
