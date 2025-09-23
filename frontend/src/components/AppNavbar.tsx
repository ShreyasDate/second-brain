import { Search, Plus, Share, Menu, Brain } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { SidebarTrigger } from "./ui/sidebar"
import { ThemeToggle } from "./ThemeToggle"

interface AppNavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onAddContent: () => void
  onShareBrain: () => void
}

export function AppNavbar({ searchQuery, onSearchChange, onAddContent, onShareBrain }: AppNavbarProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-2 sm:gap-4 px-4">
        {/* Left side - Logo and Sidebar Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SidebarTrigger>
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="flex items-center gap-2 select-none">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-medium hidden sm:inline">Second Brain</span>
          </div>
        </div>
        
        {/* Middle - Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Dark Mode Toggle */}
          <ThemeToggle />
          
          {/* Add Content Button */}
          <Button onClick={onAddContent} className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Content</span>
          </Button>
          
          {/* Share Brain Button */}
          <Button variant="outline" onClick={onShareBrain} className="gap-2" size="sm">
            <Share className="h-4 w-4" />
            <span className="hidden md:inline">Share Brain</span>
          </Button>
        </div>
      </div>
    </header>
  )
}