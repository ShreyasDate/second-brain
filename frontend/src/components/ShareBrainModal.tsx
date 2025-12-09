import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Copy, ExternalLink, Check } from "lucide-react"
import { toast } from "sonner"

interface ShareBrainModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenShared?: (shareId: string) => void
}

export function ShareBrainModal({ isOpen, onClose, onOpenShared }: ShareBrainModalProps) {
  const [shareId, setShareId] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  // Generate a new share ID when modal opens
  useEffect(() => {
    if (isOpen) {
      const newShareId = Math.random().toString(36).substring(2, 10).toUpperCase()
      setShareId(newShareId)
      const url = `${window.location.origin}?shared=${newShareId}`
      setShareUrl(url)
      setCopied(false)
    }
  }, [isOpen])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareId).then(() => {
      setCopied(true)
      toast.success('Share code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      toast.error('Failed to copy code')
    })
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Share link copied to clipboard!')
    }).catch(() => {
      toast.error('Failed to copy link')
    })
  }

  const handleOpenInNewTab = () => {
    if (onOpenShared) {
      onOpenShared(shareId)
    }
    // Open in new tab
    window.open(`?shared=${shareId}`, '_blank')
    toast.success('Opening shared brain in new tab...')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Brain</DialogTitle>
          <DialogDescription>
            Share your second brain with others. They can view all your notes using this unique code.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Share Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Code</label>
            <div className="flex gap-2">
              <Input
                value={shareId}
                readOnly
                className="font-mono tracking-wider"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this code with others to give them access
            </p>
          </div>

          {/* Share URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyUrl}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Or copy the full link to share
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={handleOpenInNewTab}
              className="flex-1 gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
