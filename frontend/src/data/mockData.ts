import type { Note } from '../components/NoteCard'

export const mockNotes: Note[] = [
  {
    id: '1',
    type: 'twitter',
    title: 'Thread about React best practices',
    content: 'Just discovered this amazing pattern for managing state in React applications. The key is to keep your components as pure as possible and lift state up when needed. Here\'s what I learned...\n\n🧵 Thread (1/5)\n\n1. Always start with local state\n2. Lift state up when multiple components need it\n3. Use context for deeply nested prop drilling\n4. Consider state management libraries for complex apps\n\nWhat are your favorite React patterns? 🤔',
    url: 'https://twitter.com/example/status/123',
    
    date: 'Jan 15, 2025',
  
    userNotes: 'Great insights on component architecture. Need to apply this to our current project.',
    
    isBookmarked: true
  },
  {
    id: '2',
    type: 'youtube',
    title: 'Advanced TypeScript Patterns You Should Know',
    content: 'In this video, we explore advanced TypeScript patterns including conditional types, mapped types, and template literal types. These patterns will help you write more type-safe code and catch errors at compile time.',
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    
   
    date: 'Jan 14, 2025',

    userNotes: 'Excellent explanation of conditional types. Bookmarked the timestamp 12:30 for template literals.',
    
    isBookmarked: false
  },
  {
    id: '3',
    type: 'text',
    title: 'The Complete Guide to CSS Grid Layout',
    content: 'A comprehensive guide covering everything you need to know about CSS Grid. From basic concepts to advanced layout techniques, this article has it all.\n\nKey concepts covered:\n- Grid containers and items\n- Grid lines and tracks\n- Grid template areas\n- Auto-placement algorithms\n- Responsive grid layouts\n\nThis is an essential resource for modern web development.',
    url: 'https://example.com/css-grid-guide',
   
    date: 'Jan 13, 2025',

    userNotes: 'Useful reference for grid-template-areas. The examples are very clear.',
    isBookmarked: true
  },
  {
    id: '4',
    type: 'twitter',
    title: 'Design System Color Theory',
    content: ' dasfs',
    url: 'https://twitter.com/example/status/456',
    
    date: 'Jan 12, 2025',

    userNotes: 'Love the color palette examples. Applied similar approach to our design tokens.',
    
    isBookmarked: false
  },
  {
    id: '5',
    type: 'youtube',
    title: 'Building a Design System from Scratch',
    content: 'Join me as I build a complete design system from the ground up. We\'ll cover everything from design tokens to component libraries and documentation.',
    url: 'https://youtube.com/watch?v=jNQXAC9IVRw',
    
    
    date: 'Jan 11, 2025',

    userNotes: 'Great walkthrough of the token structure. Need to implement similar naming convention.',
    
    isBookmarked: true
  },
  {
    id: '6',
    type: 'text',
    title: 'Web Performance Optimization Checklist',
    content: 'A detailed checklist covering all aspects of web performance optimization. Includes tools, techniques, and best practices for faster websites.\n\n## Core Web Vitals\n- Largest Contentful Paint (LCP)\n- First Input Delay (FID) \n- Cumulative Layout Shift (CLS)\n\n## Optimization Techniques\n- Image optimization and lazy loading\n- Code splitting and tree shaking\n- CDN implementation\n- Caching strategies\n- Minification and compression\n\n## Tools for Measurement\n- Lighthouse\n- PageSpeed Insights\n- WebPageTest\n- Chrome DevTools',
    url: 'https://example.com/performance-checklist',
   
    date: 'Jan 10, 2025',

    userNotes: 'Comprehensive list. Already implemented lazy loading based on recommendations here.',
    isBookmarked: false
  },
  {
    id: '7',
    type: 'twitter',
    title: 'AI in Frontend Development',
    content: 'The future of frontend development is here, and AI is changing everything! 🤖\n\nFrom code generation to automated testing, here\'s how AI is transforming our workflow:\n\n✨ Code completion and suggestions\n🔍 Automated bug detection\n🎨 Design-to-code generation\n📝 Documentation writing\n🧪 Test case generation\n\nBut remember: AI is a tool, not a replacement for understanding fundamentals!\n\nHow are you using AI in your development process?',
    url: 'https://twitter.com/example/status/789',
   
    date: 'Jan 9, 2025',

    userNotes: 'Interesting perspective on AI tools. Need to try out the automated testing suggestions.',
    
    isBookmarked: false
  },
  {
    id: '8',
    type: 'youtube',
    title: 'Modern CSS Techniques for 2025',
    content: 'Discover the latest CSS features and techniques that will make your designs stand out in 2025. From container queries to CSS layers, we cover it all.',
    url: 'https://youtube.com/watch?v=oHg5SJYRHA0',
    
    date: 'Jan 8, 2025',

    userNotes: 'Container queries are game-changing! Implemented them in our latest project.',
    
    isBookmarked: true
  },
  {
    id: '9',
    type: 'text',
    title: 'JavaScript ES2024 Features Overview',
    content: 'A comprehensive overview of the new JavaScript features introduced in ES2024. These features will help you write more efficient and maintainable code.\n\n## New Features:\n\n### Array.prototype.with()\nA new method for creating a copy of an array with a single element changed.\n\n### Object.groupBy()\nGroups elements of an array based on a provided function.\n\n### Promise.withResolvers()\nProvides a new way to create promises with external resolve/reject functions.\n\n### Temporal API (Stage 3)\nA modern date/time API that addresses the shortcomings of the Date object.\n\nThese features are gradually being adopted by major browsers and will become standard tools in our development toolkit.',
    url: '',
   
    date: 'Jan 7, 2025',

    userNotes: 'The Temporal API looks promising. Will be great to finally have a proper date/time solution.',
    isBookmarked: false
  },
   {
    id: '10',
    type: 'twitter',
    title: 'Thread about React best practices',
    content: 'Just discovered this amazing pattern for managing state in React applications. The key is to keep your components as pure as possible and lift state up when needed. Here\'s what I learned...\n\n🧵 Thread (1/5)\n\n1. Always start with local state\n2. Lift state up when multiple components need it\n3. Use context for deeply nested prop drilling\n4. Consider state management libraries for complex apps\n\nWhat are your favorite React patterns? 🤔',
    url: 'https://x.com/hijunedkhatri/status/1970506065784816090',
    
    date: 'Jan 15, 2025',

    userNotes: 'Great insights on component architecture. Need to apply this to our current project.',
    
    isBookmarked: true
  },
]