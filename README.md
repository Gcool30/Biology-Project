# Biology-Project
An educational website for biology learning support, specific in topic about "Reproduction in Human &amp; Plant". This website is made with AI.


**Flow of Life** - Educational Website
Overview
Flow of Life is an educational website that explores human and plant reproduction from a Qur'anic perspective. The application presents scientific concepts alongside religious verses, creating an interactive learning experience through animated visualizations and multilingual content. The site features canvas-based animations, accessibility controls, and a slide-based presentation format to engage users in understanding the parallels between Islamic teachings and scientific knowledge about reproduction.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
The application uses a vanilla JavaScript architecture with no frameworks, emphasizing performance and simplicity. The system is built around a slide-based presentation model with state management handled through a global AppState object. The architecture separates concerns into distinct modules for internationalization, animations, and user interactions.

Presentation Layer
The site implements a progressive slide system with top navigation bar featuring Google Material Icons and progress tracking. Each slide represents a different aspect of reproduction (human, plant, comparisons, etc.) with smooth transitions and canvas-based animations. The main navigation is positioned in the header with clear section separation and visual icons for better user experience. The layout is responsive and uses CSS custom properties for consistent theming.

Animation System
Canvas-based animations are used to visualize biological processes, particularly sperm movement and plant reproduction mechanisms. The animation system is designed to respect user preferences for reduced motion, providing alternative static visualizations when needed.

Accessibility Features
The application includes comprehensive accessibility support with skip links, ARIA labels, keyboard navigation, and screen reader compatibility. Motion reduction toggles and high contrast options ensure the content is accessible to users with various needs.

Internationalization
Multi-language support is implemented through a JavaScript-based i18n system that dynamically switches content between languages (English and Arabic indicated by the language toggle). Text content is stored in structured objects and applied via data attributes.

Styling Architecture
The CSS uses a custom property system for consistent theming with support for dark/light modes. The styling follows a mobile-first responsive approach with fluid typography using clamp() functions for optimal readability across devices.

External Dependencies
Core Technologies
HTML5 Canvas API - For interactive biological animations and visualizations
CSS Custom Properties - For dynamic theming and responsive design
Web APIs - localStorage for user preferences, Intersection Observer for animations
Browser APIs
LocalStorage - Persisting user preferences (theme, language, motion settings)
Intersection Observer - Triggering animations based on viewport visibility
RequestAnimationFrame - Smooth canvas animations and transitions
Accessibility APIs
ARIA - Screen reader support and semantic markup
prefers-reduced-motion - Respecting user motion preferences
prefers-color-scheme - System theme detection
The application is designed to work entirely in the browser without external API calls or database dependencies, making it self-contained and easily deployable as a static site.
