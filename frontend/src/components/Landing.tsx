import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ThemeToggle } from './ThemeToggle'
import { 
  Brain, 
  Twitter, 
  Youtube, 
  FileText, 
  Bookmark, 
  Search, 
  Share2, 
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Globe,
  Play,
  Users,
  TrendingUp,
  Shield,
  Infinity as InfinityIcon,
  Menu,
  Plus,
  MoreHorizontal,
  
  Code,
  Database,
  Server,
  Palette,
  Layers,
  Cpu,
  X
} from 'lucide-react'

interface LandingProps {
  onGetStarted: () => void
  onSignIn: () => void
}

export function Landing({ onGetStarted, onSignIn }: LandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Refs for sections
  const heroRef = useRef<HTMLElement | null>(null)
  const featuresRef = useRef<HTMLElement | null>(null)
  const techStackRef = useRef<HTMLElement | null>(null)
  const previewRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLElement | null>(null)

  // Intersection observer hooks
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const techStackInView = useInView(techStackRef, { once: true, margin: "-100px" })
  const previewInView = useInView(previewRef, { once: true, margin: "-200px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', ref: heroRef },
    { label: 'Features', ref: featuresRef },
    { label: 'Tech Stack', ref: techStackRef },
    { label: 'Preview', ref: previewRef },
  ]

  const features = [
    {
      icon: Twitter,
      title: "Twitter Threads",
      description: "Capture and organize valuable Twitter content with rich previews",
      color: "from-blue-500 to-cyan-400",
      delay: 0.1
    },
    {
      icon: Youtube,
      title: "YouTube Videos",
      description: "Save videos with timestamps and personal insights for later reference",
      color: "from-red-500 to-pink-400",
      delay: 0.2
    },
    {
      icon: FileText,
      title: "Smart Notes",
      description: "Create rich text notes that connect and enhance your saved content",
      color: "from-purple-500 to-indigo-400",
      delay: 0.3
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find anything across your entire knowledge base in milliseconds",
      color: "from-green-500 to-emerald-400",
      delay: 0.4
    },
    {
      icon: Bookmark,
      title: "Smart Bookmarks",
      description: "Bookmark and categorize content for quick access when you need it",
      color: "from-yellow-500 to-orange-400",
      delay: 0.5
    },
    {
      icon: Share2,
      title: "Public Sharing",
      description: "Share your curated knowledge collections with the world",
      color: "from-pink-500 to-rose-400",
      delay: 0.6
    }
  ]

  const techStack = {
    frontend: [
      { name: 'React', icon: Code, color: 'text-blue-500', description: 'Modern UI library' },
      { name: 'TypeScript', icon: Code, color: 'text-blue-600', description: 'Type-safe development' },
      { name: 'Tailwind CSS', icon: Palette, color: 'text-cyan-500', description: 'Utility-first styling' },
      { name: 'Motion', icon: Zap, color: 'text-purple-500', description: 'Smooth animations' },
      { name: 'ShadCN/UI', icon: Layers, color: 'text-gray-600', description: 'Component library' },
    ],
    backend: [
      { name: 'Node.js', icon: Server, color: 'text-green-500', description: 'Runtime environment' },
      { name: 'Express', icon: Server, color: 'text-gray-600', description: 'Web framework' },
      { name: 'MongoDB', icon: Database, color: 'text-green-600', description: 'NoSQL database' },
      { name: 'TypeScript', icon: Code, color: 'text-blue-600', description: 'Backend type safety' },
    ]
  }

  const stats = [
    { icon: Users, value: "50+", label: "Beta Users" },
    { icon: FileText, value: "500+", label: "Notes Saved" },
    { icon: TrendingUp, value: "v1.0", label: "Current Version" },
    { icon: Star, value: "Open", label: "Source Project" }
  ]

  // Floating orbs data
  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
    initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    color: [
      'bg-gradient-to-r from-blue-400/30 to-purple-500/30',
      'bg-gradient-to-r from-pink-400/30 to-red-500/30',
      'bg-gradient-to-r from-green-400/30 to-blue-500/30',
      'bg-gradient-to-r from-yellow-400/30 to-orange-500/30',
      'bg-gradient-to-r from-purple-400/30 to-pink-500/30',
      'bg-gradient-to-r from-indigo-400/30 to-blue-500/30'
    ][i % 6]
  }))

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        
        {/* Floating Orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full opacity-40 blur-xl ${orb.color}`}
            style={{
              width: orb.size,
              height: orb.size,
            }}
            initial={{
              x: orb.initialX,
              y: orb.initialY,
            }}
            animate={{
              x: [orb.initialX, orb.initialX + 100, orb.initialX - 50, orb.initialX],
              y: [orb.initialY, orb.initialY - 80, orb.initialY + 50, orb.initialY],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + orb.id * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection(heroRef)}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
                <Brain className="h-8 w-8 text-primary relative z-10" />
              </motion.div>
              <span className="text-xl font-medium bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Second Brain
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref)}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Desktop Right Side - Theme Toggle + Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" onClick={onSignIn} className="hover:bg-muted/50">
                Sign In
              </Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-4 pt-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="ghost" onClick={onSignIn} className="justify-start">
                    Sign In
                  </Button>
                  <Button onClick={onGetStarted} className="justify-start">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-4 pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-gradient-to-r from-muted to-muted/50 border border-border/50">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Digital Knowledge Companion
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-medium mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Build Your
              </span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Second Brain
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Capture, organize, and rediscover your digital knowledge. Transform scattered information into a powerful, searchable second brain that grows with you.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={onGetStarted} className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" onClick={onSignIn} className="border-border/50 hover:bg-muted/50">
                  <Shield className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Brain Logo Section */}
            <motion.div
              className="relative mb-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="relative w-64 h-64 mx-auto">
                {/* Central Brain with Multiple Animation Layers */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      scale: { duration: 4, repeat: Infinity },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                  />
                  
                  {/* Middle Ring */}
                  <motion.div
                    className="absolute inset-8 rounded-full border-2 border-gradient-to-r from-blue-500/30 to-purple-500/30"
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                  />

                  {/* Inner Brain */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity },
                      rotate: { duration: 6, repeat: Infinity }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-60" />
                    <Brain className="h-24 w-24 text-primary relative z-10" />
                  </motion.div>
                </motion.div>

                {/* Orbiting Elements */}
                {[Twitter, Youtube, FileText, Bookmark, Search, Share2].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-12 h-12 flex items-center justify-center"
                    style={{
                      left: '50%',
                      top: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: Math.cos((index * 60) * Math.PI / 180) * 120 - 24,
                      y: Math.sin((index * 60) * Math.PI / 180) * 120 - 24,
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-card border border-border/50 rounded-full blur-sm" />
                      <div className="relative bg-card/90 border border-border/50 rounded-full p-3 backdrop-blur-sm">
                        <Icon className={`h-6 w-6 ${
                          index === 0 ? 'text-blue-500' :
                          index === 1 ? 'text-red-500' :
                          index === 2 ? 'text-purple-500' :
                          index === 3 ? 'text-yellow-500' :
                          index === 4 ? 'text-green-500' :
                          'text-pink-500'
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    style={{ transitionDelay: `${1.4 + index * 0.1}s` }}
                  >
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <Icon className="h-8 w-8 mx-auto text-muted-foreground relative z-10" />
                    </div>
                    <div className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-medium mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Everything you need in one place
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform how you capture, organize, and rediscover information with our comprehensive suite of knowledge management tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div 
                          className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white relative overflow-hidden`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-white/20 rounded-2xl" />
                          <Icon className="h-7 w-7 relative z-10" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <motion.div
                        className="w-full h-1 bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary/50 transition-all duration-500"
                        initial={{ scaleX: 0 }}
                        animate={featuresInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: feature.delay + 0.3 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techStackRef} className="relative z-10 px-4 py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={techStackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Cpu className="h-4 w-4 mr-2" />
              Technology Stack
            </Badge>
            <h2 className="text-4xl md:text-5xl font-medium mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Built with modern technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by a carefully selected tech stack that prioritizes performance, scalability, and developer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Frontend Technologies */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={techStackInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Frontend</h3>
                    <p className="text-muted-foreground">User Interface & Experience</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {techStack.frontend.map((tech, index) => {
                    const Icon = tech.icon
                    return (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={techStackInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div className={`p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors`}>
                          <Icon className={`h-5 w-5 ${tech.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-muted-foreground">{tech.description}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Backend Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={techStackInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400">
                    <Server className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Backend</h3>
                    <p className="text-muted-foreground">Server & Database</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {techStack.backend.map((tech, index) => {
                    const Icon = tech.icon
                    return (
                      <motion.div
                        key={tech.name}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group cursor-pointer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={techStackInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                      >
                        <div className={`p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors`}>
                          <Icon className={`h-5 w-5 ${tech.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-muted-foreground">{tech.description}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Quick Navigation to Preview */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={techStackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              onClick={() => scrollToSection(previewRef)}
              variant="outline" 
              className="group hover:bg-muted/50"
            >
              See it in action
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section ref={previewRef} className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={previewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Live Preview
            </Badge>
            <h2 className="text-4xl md:text-5xl font-medium mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              See Second Brain in action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the intuitive interface and powerful features that make knowledge management effortless.
            </p>
          </motion.div>

          {/* App Preview - Dashboard Screenshot */}
          <motion.div 
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={previewInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card to-muted/20 border border-border/50 backdrop-blur-sm shadow-2xl">
              {/* Mock Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground">
                  Second Brain Dashboard
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="flex h-96 md:h-[500px]">
                {/* Sidebar */}
                <div className="w-64 bg-sidebar border-r border-sidebar-border p-4 hidden md:block">
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="h-6 w-6 text-sidebar-primary" />
                    <span className="font-medium text-sidebar-foreground">Second Brain</span>
                  </div>
                  
                  <nav className="space-y-2">
                    {[
                      { icon: FileText, label: "All Notes", active: true },
                      { icon: Twitter, label: "Twitter", count: "12" },
                      { icon: Youtube, label: "YouTube", count: "8" },
                      { icon: FileText, label: "Text Notes", count: "15" },
                      { icon: Bookmark, label: "Bookmarks", count: "7" }
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={index}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            item.active 
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={previewInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{item.label}</span>
                          {item.count && (
                            <span className="text-xs bg-sidebar-border text-sidebar-foreground px-1.5 py-0.5 rounded">
                              {item.count}
                            </span>
                          )}
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-4 w-4" />
                      </Button>
                      <div>
                        <h1 className="text-xl font-medium">All Notes</h1>
                        <p className="text-sm text-muted-foreground">35 notes in your collection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Twitter Card */}
                    <motion.div
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={previewInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">@reactdev</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-1">React best practices</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        Just discovered this amazing pattern for managing state in React applications...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Jan 15, 2025</span>
                        <Bookmark className="h-3 w-3 text-primary" />
                      </div>
                    </motion.div>

                    {/* YouTube Card */}
                    <motion.div
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={previewInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-muted-foreground">TypeScript Pro</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-1">Advanced TypeScript Patterns</h3>
                      <div className="bg-muted rounded-lg h-20 mb-3 flex items-center justify-center">
                        <Play className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Jan 14, 2025</span>
                        <span>15:42</span>
                      </div>
                    </motion.div>

                    {/* Text Note Card */}
                    <motion.div
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={previewInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.6 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                          <span className="text-sm text-muted-foreground">Personal Note</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-1">CSS Grid Layout Guide</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        A comprehensive guide covering everything you need to know about CSS Grid...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Jan 13, 2025</span>
                        <Bookmark className="h-3 w-3 text-primary" />
                      </div>
                    </motion.div>

                    {/* Design System Card */}
                    <motion.div
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={previewInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.8 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">@designsystem</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-1">Design System Color Theory</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        Color theory in design systems is more than just picking pretty colors...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Jan 12, 2025</span>
                        <span>Thread</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-card border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={previewInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Search className="h-4 w-4 text-green-500" />
                <span className="font-medium">Search Active</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-card border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={previewInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Plus className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Content Added!</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm border border-border/50 rounded-3xl p-12">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
                <InfinityIcon className="h-16 w-16 text-primary relative z-10" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-medium mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Ready to amplify your mind?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the community of knowledge workers, researchers, and creators who are building their digital second brain.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" onClick={onGetStarted} className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg px-8">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" onClick={onSignIn} className="border-border/50 hover:bg-muted/50 px-8">
                    Continue Journey
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-12 border-t border-border/50 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
                <Brain className="h-6 w-6 text-primary relative z-10" />
              </div>
              <span className="font-medium bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Second Brain
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2025 Second Brain. A personal knowledge management project.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}