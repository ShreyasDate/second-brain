import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Twitter, Youtube, FileText, Calendar, MoreHorizontal, Trash2, ExternalLinkIcon, Bookmark, BookmarkCheck } from "lucide-react"

import { extractYouTubeId, extractTweetId } from "../utils/extractId"
import { Tweet } from 'react-tweet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"



export interface Note {
  _id: string;
  userId?: string;       // present when fetched from backend
  type: "text" | "youtube" | "twitter";
  title: string;
  content: string;
  link?: string;
  userNotes?: string;
  isBookmarked: boolean;

  date?: string;
}

interface NoteCardProps {
  note: Note
  onEdit?: (note: Note) => void
  onDelete?: (noteId: string) => void
  onClick?: (note: Note) => void
  onToggleBookmark?: (noteId: string, isBookmarked : boolean) => void
  isPublicView?: boolean
}

export function NoteCard({ note, onEdit, onDelete, onClick, onToggleBookmark, isPublicView }: NoteCardProps) {
  const getTypeIcon = () => {
    switch (note.type) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />
      case 'youtube':
        return <Youtube className="h-4 w-4" />
      case 'text':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on dropdown menu
    if ((e.target as Element).closest('[data-dropdown-trigger]')) {
      return
    }
    onClick?.(note)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    onDelete?.(note._id)
  }

  const handleViewOriginal = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(note.link, '_blank')
  }

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    onToggleBookmark?.(note._id, note.isBookmarked)
  }

  const renderEmbeddedContent = () => {
    if (note.type === 'youtube' && note.link) {
      const youtubeId = extractYouTubeId(note.link)
      if (youtubeId) {
        return (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={note.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      }
    }

    if (note.type === 'twitter' && note.link) {
      const tweetId = extractTweetId(note.link)
      if (tweetId) {
        return (
          <div
            className="w-full h-64 overflow-y-auto pr-2 scrollbar-stable
    [&_[data-theme]]:!bg-transparent
    [&_[data-theme]]:!border-0
    [&_[data-theme]]:!shadow-none
    [&_article]:!bg-card
    [&_article]:!border-border
    [&_article]:!rounded-lg
    [&_article]:!shadow-sm scrollbar-hide-until-hover"
          >
            <Tweet id={tweetId} />
          </div>

        )
      }
    }



    return null
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer relative flex flex-col h-full" onClick={handleCardClick}>
      {/* Bookmark indicator */}
      {note.isBookmarked && (
        <div className="absolute top-2 right-2 z-10">
          <BookmarkCheck className="h-4 w-4 text-yellow-500 fill-current" />
        </div>
      )}

      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${getTypeColor()} text-white border-0`}>
              {getTypeIcon()}
              <span className="ml-1 capitalize">{getTypeLabel()}</span>
            </Badge>
          </div>
          {!isPublicView && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(note.type === 'twitter' || note.type === 'youtube') && (
                  <DropdownMenuItem onClick={handleViewOriginal}>
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    View Original
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleToggleBookmark}>
                  {note.isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Remove Bookmark
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Add Bookmark
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Note
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {isPublicView && (note.type === 'twitter' || note.type === 'youtube') && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={handleViewOriginal}
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 overflow-hidden">
        {/* Embedded Content */}
        {renderEmbeddedContent()}

        {/* Title */}
        <h3 className="font-medium line-clamp-2 leading-snug">{note.title}</h3>

        {/* Content Preview */}
        {note.type !== 'twitter' && (
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {note.content}
          </p>
        )}

        {/* User Notes */}
        {note.userNotes && (
          <div className="border-l-2 border-primary/20 pl-3">
            <p className="text-sm italic text-muted-foreground">
              "{note.userNotes}"
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-muted/20 flex-shrink-0 mt-auto">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{note.date}</span>
          </div>

        </div>
      </CardFooter>
    </Card>
  )
}