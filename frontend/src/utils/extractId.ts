// Helper functions to extract IDs from URLs
  export const extractYouTubeId = (url: string): string | undefined => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : undefined
  }

  export const extractTweetId = (url: string): string | undefined => {
    const match = url.match(/twitter\.com\/\w+\/status\/(\d+)/)
    return match ? match[1] : undefined
  }