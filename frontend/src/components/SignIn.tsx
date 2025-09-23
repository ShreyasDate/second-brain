import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Brain, ArrowLeft } from 'lucide-react'

interface SignInProps {
  onSignIn: (email: string, password: string) => void
  onSwitchToSignUp: () => void
  onBackToLanding?: () => void
}

export function SignIn({ onSignIn, onSwitchToSignUp, onBackToLanding }: SignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignIn(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {onBackToLanding && (
        <Button
          variant="ghost"
          onClick={onBackToLanding}
          className="absolute top-4 left-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      )}
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 mr-2" />
            <span className="text-xl font-medium">Second Brain</span>
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to your second brain account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}