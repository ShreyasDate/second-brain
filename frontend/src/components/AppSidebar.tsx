import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar"

import { Twitter, Youtube, FileText, Bookmark, Grid3X3, LogOut, Brain, User } from "lucide-react"
import { Button } from "./ui/button"

interface AppSidebarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  onLogout?: () => void
  userName?: string
}

export function AppSidebar({ activeFilter, onFilterChange, onLogout, userName }: AppSidebarProps) {
  const filters = [
    {
      id: 'all',
      label: 'All Notes',
      icon: Grid3X3,
      count: 0, // This will be calculated in the parent component
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      count: 0,
    },
    {
      id: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      count: 0,
    },
    {
      id: 'text',
      label: 'Text Notes',
      icon: FileText,
      count: 0,
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      count: 0,
    },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-medium">Second Brain</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filter Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filters.map((filter) => {
                const Icon = filter.icon
                return (
                  <SidebarMenuItem key={filter.id}>
                    <SidebarMenuButton
                      isActive={activeFilter === filter.id}
                      onClick={() => onFilterChange(filter.id)}
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{filter.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-3">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{userName}</span>
            <span className="text-xs text-muted-foreground">Personal Brain</span>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-2" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}