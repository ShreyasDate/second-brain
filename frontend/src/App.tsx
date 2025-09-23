import { Landing } from "./components/Landing";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Dashboard } from "./components/Dashboard";
import { Toaster, toast } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { useState } from "react";






type AppState = 'landing' | 'signin' | 'signup' | 'dashboard' | 'public'





export default function App() {
  const [appState, setAppState] = useState<AppState>('landing')



  function handleSignIn(email: string, password: string) {
    console.log('Sign in attempt:', { email, password })
    setAppState('dashboard')

    toast.success('Welcome back!')
  }

  const handleSignUp = (name: string, email: string, password: string) => {
    // Mock authentication - in real app, this would call your backend
    console.log('Sign up attempt:', { name, email, password })
    // setIsAuthenticated(true)
    setAppState('dashboard')
    toast.success('Account created successfully!')
  }

  const handleLogout = () => {
    // setIsAuthenticated(false)
    setAppState('landing')
    // Clear any shared URL params
    // if (shareId) {
    //   window.history.replaceState({}, document.title, window.location.pathname)
    //   setShareId(null)
    // }
    toast.success('Logged out successfully')
  }

  const handleShareBrain = (shareId: string) => {
    // Update URL and navigate to public view to test the shared brain
    // const shareUrl = `${window.location.origin}?shared=${shareId}`
    // window.history.pushState({}, '', shareUrl)
    // setShareId(shareId)
    // setAppState('public')
    console.log("share brain attempted")
  }
  const renderCurrentView = () => {
    switch (appState) {
      case 'landing':
        return (<Landing
          onGetStarted={() => setAppState('signup')}
          onSignIn={() => setAppState('signin')}
        />)
      case 'signin':
        return (
          <SignIn
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAppState('signup')}
            onBackToLanding={() => setAppState('landing')}
          />
        )
      case 'signup':
        return (
          <SignUp
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAppState('signin')}
            onBackToLanding={() => setAppState('landing')}
          />
        )

      case 'dashboard':
        return <Dashboard onLogout={handleLogout} onShareBrain={handleShareBrain} />


      default:
        return (
          <Landing
            onGetStarted={() => setAppState('signup')}
            onSignIn={() => setAppState('signin')}
          />
        )
    }

  }
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="second-brain-theme">
        {renderCurrentView()}
        <Toaster />
      </ThemeProvider>

    </>
  )
}