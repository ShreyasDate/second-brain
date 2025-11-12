import { useState, useEffect } from 'react'
import { Loader2 } from "lucide-react";
import axios from 'axios'
import { SidebarProvider, SidebarInset } from "./ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { AppNavbar } from "./AppNavbar"
import { NoteCard } from "./NoteCard"
import type { Note } from "./NoteCard"
import { NoteModal } from "./NoteModal"
import { AddContentModal } from "./AddContentModal"

import { toast } from "sonner"

interface DashboardProps {
  onLogout: () => void
  onShareBrain?: (shareId: string) => void
  userName?: string
}

export function Dashboard({ onLogout, onShareBrain, userName }: DashboardProps) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [notes, setNotes] = useState<Note[]>([])

  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false)


  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("sb_token"); // token stored at login
      const res = await axios.get(`${BASE_URL}/content`, {
        headers: { Authorization: token },
      })
      setNotes(res.data.content);
      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    fetchNotes();
  }, []);

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

  const handleDeleteNote = async (id: string) => {

    const res = await axios.delete(`${BASE_URL}/content/${id}`,
      {
        headers: { Authorization: localStorage.getItem("sb_token") }
      }
    );
    console.log(res.data)
    toast.success('Note deleted successfully');
    fetchNotes();
  }

  const handleToggleBookmark = async (Id: string, Bookmarked: boolean) => {
    try {
      const token = localStorage.getItem("sb_token");
      const res = await axios.patch(`${BASE_URL}/content/${Id}`, { isBookmarked: !Bookmarked }, {
        headers: { Authorization: token }
      })
      console.log(res.data)
      toast.success('Note bookmarked successfully');
      fetchNotes();
    } catch (error) {
      console.log(error)
    }
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setIsModalOpen(true)
  }

  const handleUpdateUserNotes = async (id: string, userNotes: string) => {
    try {
      const token = localStorage.getItem("sb_token");
      const res = await axios.patch(`${BASE_URL}/content/${id}`, { userNotes: userNotes }, {
        headers: { Authorization: token }
      })
      console.log(res.data)
      toast.success('Notes updated successfully');
      fetchNotes();
    } catch (error) {
      console.log(error)
    }

  }

  const handleAddNewContent = async (newNote: {
    type: 'twitter' | 'youtube' | 'text'
    title: string
    content: string
    url?: string
    userNotes?: string
  }) => {
    try {
      const token = localStorage.getItem("sb_token");
      const res = await axios.post(`${BASE_URL}/content`,
        {
          title: newNote.title,
          content: newNote.content,
          type: newNote.type,
          link: newNote.url,
          userNotes: newNote.userNotes,

        },
        { headers: { Authorization: token } }
      )
      console.log(res.data)
      toast.success('Content added successfully!');
      fetchNotes();
    } catch (err) {
      console.log(err)

    }

  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
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