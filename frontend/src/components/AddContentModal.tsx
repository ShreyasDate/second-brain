import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { Youtube, Twitter, FileText } from 'lucide-react'

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
  onAddContent: (note: {
    type: 'twitter' | 'youtube' | 'text'
    title: string
    content: string
    url?: string
    userNotes?: string
  }) => void
}

export function AddContentModal({ isOpen, onClose, onAddContent }: AddContentModalProps) {
  const [type, setType] = useState<'twitter' | 'youtube' | 'text'>('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [userNotes, setUserNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all required fields')
      return
    }

    if ((type === 'twitter' || type === 'youtube') && !url.trim()) {
      alert('Please provide a URL for this content type')
      return
    }

    onAddContent({
      type,
      title: title.trim(),
      content: content.trim(),
      url: url.trim() || undefined,
      userNotes: userNotes.trim() || undefined
    })

    // Reset form
    setTitle('')
    setContent('')
    setUrl('')
    setUserNotes('')
    setType('text')
    onClose()
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setUrl('')
    setUserNotes('')
    setType('text')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
          <DialogDescription>
            Add a new note to your second brain. Choose the type and fill in the details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type Selection */}
          <div className="space-y-3">
            <Label>Content Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Card 
                className={`cursor-pointer transition-colors ${
                  type === 'text' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`}
                onClick={() => setType('text')}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Text Note</span>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${
                  type === 'twitter' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`}
                onClick={() => setType('twitter')}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Twitter className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Twitter</span>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${
                  type === 'youtube' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`}
                onClick={() => setType('youtube')}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Youtube className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">YouTube</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder={
                type === 'text' ? 'Enter note title' :
                type === 'twitter' ? 'Enter tweet description' :
                'Enter video title'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* URL Field (for Twitter and YouTube) */}
          {(type === 'twitter' || type === 'youtube') && (
            <div className="space-y-2">
              <Label htmlFor="url">
                {type === 'twitter' ? 'Tweet URL *' : 'YouTube URL *'}
              </Label>
              <Input
                id="url"
                type="url"
                placeholder={
                  type === 'twitter' 
                    ? 'https://twitter.com/username/status/...' 
                    : 'https://www.youtube.com/watch?v=...'
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
          )}

          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content">
              {type === 'text' ? 'Content *' : 
               type === 'twitter' ? 'Tweet Content *' : 
               'Video Description *'}
            </Label>
            <Textarea
              id="content"
              placeholder={
                type === 'text' ? 'Write your note content here...' :
                type === 'twitter' ? 'Copy the tweet content here...' :
                'Describe what this video is about...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Personal Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="userNotes">Your Notes (Optional)</Label>
            <Textarea
              id="userNotes"
              placeholder="Add your personal thoughts, insights, or takeaways..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Add Content
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}