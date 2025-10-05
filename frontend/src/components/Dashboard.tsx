import { useState } from 'react'
import { SidebarProvider, SidebarInset } from "./ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { AppNavbar } from "./AppNavbar"
import { NoteCard } from "./NoteCard"
import type { Note } from "./NoteCard"
import { NoteModal } from "./NoteModal"
import { AddContentModal } from "./AddContentModal"
import { mockNotes } from "../data/mockData"
import { toast } from "sonner"

interface DashboardProps {
  onLogout: () => void
  onShareBrain?: (shareId: string) => void
  userName?: string
}

export function Dashboard({ onLogout, onShareBrain, userName }: DashboardProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false)

  // Filter notes based on active filter and search query
  const filteredNotes = notes.filter((note) => {
    const matchesFilter = (() => {
      switch (activeFilter) {
        case 'all':
          return true
        case 'bookmarks':
          return note.isBookmarked === true
        default:
          return note.type === activeFilter
      }
    })()

    const matchesSearch = searchQuery === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.userNotes?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getFilterDisplayName = () => {
    switch (activeFilter) {
      case 'all':
        return 'All Notes'
      case 'bookmarks':
        return 'Bookmarks'
      case 'twitter':
        return 'Twitter Notes'
      case 'youtube':
        return 'YouTube Notes'
      case 'text':
        return 'Text Notes'
      default:
        return 'Notes'
    }
  }

  const handleAddContent = () => {
    setIsAddContentModalOpen(true)
  }

  const handleShareBrain = () => {
    // Generate a shareable link (mock implementation)
    const shareId = Math.random().toString(36).substring(7)
    const shareUrl = `${window.location.origin}?shared=${shareId}`

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Share link copied to clipboard!')
    }).catch(() => {
      toast.error('Failed to copy link')
    })

    if (onShareBrain) {
      onShareBrain(shareId)
    }
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    toast.success('Note deleted successfully')
  }

  const handleToggleBookmark = (noteId: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, isBookmarked: !note.isBookmarked }
          : note
      )
    )

    const note = notes.find(n => n.id === noteId)
    if (note) {
      toast.success(
        note.isBookmarked
          ? 'Removed from bookmarks'
          : 'Added to bookmarks'
      )
    }
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setIsModalOpen(true)
  }

  const handleUpdateUserNotes = (noteId: string, userNotes: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, userNotes } : note
      )
    )
    // Update selected note if it's the one being edited
    if (selectedNote?.id === noteId) {
      setSelectedNote({ ...selectedNote, userNotes })
    }
    toast.success('Notes updated successfully')
  }

  const handleAddNewContent = (newNote: {
    type: 'twitter' | 'youtube' | 'text'
    title: string
    content: string
    url?: string
    userNotes?: string
  }) => {
    const note: Note = {
      id: Date.now().toString(),
      type: newNote.type,
      title: newNote.title,
      content: newNote.content,
      url: newNote.url || '',
      userNotes: newNote.userNotes,
     
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      isBookmarked: false,
      
    }

    setNotes(prevNotes => [note, ...prevNotes])
    toast.success('Content added successfully!')
  }

  

  return (
    <SidebarProvider className="w-full">
      <div className="flex h-screen bg-background w-full">
        <AppSidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onLogout={onLogout}
          userName={userName}
        />

        <SidebarInset className="flex flex-col flex-1 overflow-hidden w-full">
          <AppNavbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddContent={handleAddContent}
            onShareBrain={handleShareBrain}
          />

          <main className="flex-1 overflow-auto p-4 sm:p-6 w-full">
            <div className="w-full max-w-none min-w-0">
              {/* Header */}
              <div className="mb-6 w-full">
                <h1 className="text-xl sm:text-2xl font-medium mb-2">
                  {getFilterDisplayName()}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {/* Responsive Notes Grid */}
              {filteredNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 w-full">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={handleDeleteNote}
                      onClick={handleNoteClick}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 w-full min-w-0">
                  <div className="text-muted-foreground w-full">
                    {searchQuery ? (
                      <div className="w-full">
                        <p>No notes found for "{searchQuery}"</p>
                        <p className="text-sm mt-1">Try adjusting your search or browse different content types</p>
                      </div>
                    ) : (
                      <div className="w-full">
                        <p>No {activeFilter === 'all' ? '' : activeFilter === 'bookmarks' ? 'bookmarked' : activeFilter} notes yet</p>
                        <p className="text-sm mt-1">
                          {activeFilter === 'bookmarks'
                            ? 'Use the bookmark button in the three-dots menu to save your favorite notes'
                            : 'Start building your second brain by adding some content'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Note Modal */}
      <NoteModal
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedNote(null)
        }}
        onUpdateUserNotes={handleUpdateUserNotes}
      />

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
        onAddContent={handleAddNewContent}
      />
    </SidebarProvider>
  )
}