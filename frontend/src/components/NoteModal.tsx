import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Twitter, Youtube, FileText, Calendar, ExternalLinkIcon, Edit3 } from "lucide-react"
import { ImageWithFallback } from './figma/ImageWithFallback'
import type { Note } from './NoteCard'
import { useState } from 'react'

interface NoteModalProps {
  note: Note | null
  isOpen: boolean
  onClose: () => void
  onUpdateUserNotes?: (noteId: string, userNotes: string) => void
  isPublicView?: boolean
}

export function NoteModal({ note, isOpen, onClose, onUpdateUserNotes, isPublicView }: NoteModalProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [userNotes, setUserNotes] = useState(note?.userNotes || '')

  if (!note) return null

  const getTypeIcon = () => {
    switch (note.type) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />
      case 'youtube':
        return <Youtube className="h-5 w-5" />
      case 'text':
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeColor = () => {
    switch (note.type) {
      case 'twitter':
        return 'bg-blue-500'
      case 'youtube':
        return 'bg-red-500'
      case 'text':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeLabel = () => {
    switch (note.type) {
      case 'twitter':
        return 'twitter'
      case 'youtube':
        return 'youtube'
      case 'text':
        return 'text'
      default:
        return 'note'
    }
  }

  const handleSaveNotes = () => {
    onUpdateUserNotes?.(note.id, userNotes)
    setIsEditingNotes(false)
  }

  const handleCancelEdit = () => {
    setUserNotes(note.userNotes || '')
    setIsEditingNotes(false)
  }

  const renderFullEmbeddedContent = () => {
    if (note.type === 'youtube' && note.youtubeId) {
      return (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
          <iframe
            src={`https://www.youtube.com/embed/${note.youtubeId}`}
            title={note.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    if (note.type === 'twitter' && note.tweetId) {
      return (
        <div className="bg-card border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Twitter className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium">{note.author}</div>
              <div className="text-sm text-muted-foreground">{note.date}</div>
            </div>
          </div>
          <div className="leading-relaxed whitespace-pre-wrap">
            {note.content}
          </div>
        </div>
      )
    }

    // Fallback for other content types
    if (note.thumbnail) {
      return (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
          <ImageWithFallback
            src={note.thumbnail}
            alt={note.title}
            className="w-full h-full object-cover"
          />
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={`${getTypeColor()} text-white border-0`}>
                {getTypeIcon()}
                <span className="ml-1 capitalize">{getTypeLabel()}</span>
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{note.date}</span>
              </div>
            </div>
            {(note.type === 'twitter' || note.type === 'youtube') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(note.url, '_blank')}
                className="gap-2"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                View Original
              </Button>
            )}
          </div>
          <DialogTitle className="text-left text-xl leading-tight mt-4">
            {note.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-2">
            {note.type === 'twitter' ? 'Twitter post' : 
             note.type === 'youtube' ? 'YouTube video' : 
             'Text note'} saved on {note.date}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Embedded Content */}
          {renderFullEmbeddedContent()}

          {/* Content for non-Twitter posts */}
          {note.type !== 'twitter' && (
            <div className="mb-6">
              <p className="leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>
              {note.author && (
                <p className="text-sm text-muted-foreground mt-4">
                  by {note.author}
                </p>
              )}
            </div>
          )}

          {/* User Notes Section */}
          {!isPublicView && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Your Notes</h3>
                {!isEditingNotes && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingNotes(true)}
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    {note.userNotes ? 'Edit' : 'Add Notes'}
                  </Button>
                )}
              </div>

              {isEditingNotes ? (
                <div className="space-y-4">
                  <Textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Add your thoughts, insights, or reminders about this content..."
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveNotes}>Save Notes</Button>
                    <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div>
                  {note.userNotes ? (
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                      <p className="italic leading-relaxed whitespace-pre-wrap">
                        "{note.userNotes}"
                      </p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm bg-muted/30 rounded-lg p-8 text-center border-2 border-dashed">
                      <p>No notes added yet.</p>
                      <p className="mt-1">Click "Add Notes" to capture your thoughts about this content.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Public view notes section */}
          {isPublicView && note.userNotes && (
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Author's Notes</h3>
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                <p className="italic leading-relaxed whitespace-pre-wrap">
                  "{note.userNotes}"
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}