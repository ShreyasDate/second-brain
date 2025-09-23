import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Brain, ArrowLeft } from 'lucide-react'

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void
  onSwitchToSignIn: () => void
  onBackToLanding?: () => void
}

export function SignUp({ onSignUp, onSwitchToSignIn, onBackToLanding }: SignUpProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    onSignUp(name, email, password)
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
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Start building your second brain today
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}