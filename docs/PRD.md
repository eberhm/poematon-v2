# Product Requirements Document: Poematon

## Document Information
- **Product Name:** Poematon 2.0
- **Version:** 2.0 (New Implementation)
- **Target Stack:** Vite, Vitest, React
- **Date:** 2026-02-06
- **Purpose:** Complete port from Create React App to modern Vite-based stack

## Executive Summary

Poematon is an interactive poetry installation application created for the "CEROPOÉTICAS" Expanded Poetry Exhibition. Users create "ready-made" poems by selecting and arranging verses from different authors through a drag-and-drop interface. The application explores the concept that reconfiguring elements from existing works can be a legitimate form of artistic creation.

## Product Objectives

1. Port the existing Create React App implementation to Vite with zero feature loss
2. Maintain identical user experience and visual design
3. Improve build performance and development experience
4. Implement proper testing infrastructure with Vitest
5. Support deployment to GitHub Pages at `https://eberhm.github.io/poematon/`

## Quick Reference

- **Current Repository:** https://github.com/eberhm/poematon
- **Current Deployment:** https://eberhm.github.io/poematon/
- **Screenshots:** The `/docs/screens/` folder contains reference screenshots of all application screens (see details below)
- **Asset URLs:** See Appendix C for complete list of all assets (images, audio, CSS, data files) with direct download links
- **Source Code Browser:** https://github.com/eberhm/poematon/tree/main/src

All assets, screenshots, and source code are publicly accessible for migration purposes.

### Available Screenshots

The repository includes complete visual reference screenshots in `/docs/screens/`:
- **intro.png** - Welcome screen with instructions and "EMPEZAR" button
- **main.png** - Main interface showing verse selection (left) and poem composition (right) panels
- **print-dialog.png** - Browser print dialog with formatted poem output
- **end.png** - Completion screen displayed after printing

**Screenshot URLs:**
- Intro: https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/intro.png
- Main: https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/main.png
- Print Dialog: https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/print-dialog.png
- End: https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/end.png

## Technical Stack Requirements

### Core Technologies
- **Build Tool:** Vite (latest stable version)
- **Testing:** Vitest for unit tests, @testing-library/react for component tests
- **Framework:** React 18+
- **Language:** TypeScript (strict mode)
- **UI Library:** Material-UI (MUI) v5
- **Drag & Drop:** @dnd-kit/core, @dnd-kit/sortable

### Additional Dependencies
- **Styling:** Emotion (via MUI)
- **Data Processing:** csv-parse for data transformation scripts
- **Formatting:** Prettier
- **Version Control:** Git with GitHub Actions for CI/CD

## User Personas

### Primary User: Poetry Installation Participant
- Visiting a physical art installation/exhibition
- May have limited technical experience
- Expects immediate, intuitive interaction
- Time-constrained (3-minute session)
- Wants to create and print a physical poem to take home

## Feature Requirements

### 1. Initial Welcome Screen

#### FR-1.1: Welcome Interface
- **Priority:** P0 (Critical)
- **Description:** Display welcome screen with logo, title, and instructions before session starts
- **Components:**
  - Corona logo image at top
  - Title: "Poematón 2.0"
  - Subtitle: "Haz tu poema ready-made"
  - Six-step instruction list with numbered items
  - Yellow (#cfc140) highlighted numbers and keywords
  - Large "EMPEZAR" (Start) button

#### FR-1.2: Instructions Display
- **Priority:** P0
- **Instructions Must Include:**
  1. Explanation of verse metrics (pentasílabos, heptasílabos, etc.)
  2. Drag-and-drop interaction instruction
  3. Verse repetition allowed
  4. No rhyme requirement (blank verse accepted)
  5. Time limit and maximum verse count (8 verses)
  6. Print button instruction

#### FR-1.3: Start Interaction
- **Priority:** P0
- **Behavior:**
  - Click "EMPEZAR" button to begin
  - Trigger fullscreen mode
  - Fade out welcome screen (0.5s transition)
  - Start countdown timer
  - Begin background music playback

### 2. Countdown Timer System

#### FR-2.1: Timer Display
- **Priority:** P0
- **Specification:**
  - 3-minute countdown (180 seconds)
  - Display format: MM:SS (e.g., "2:45")
  - Large white text (4em font size)
  - Positioned at top-center of screen
  - Updates every second

#### FR-2.2: Timer Audio Cues
- **Priority:** P0
- **Audio Requirements:**
  - Background music plays during entire session (music.mp3, 40% volume)
  - Warning sound at 20 seconds remaining (20s.mp3, 40% volume)
  - All audio files must be in public/sound/ directory

#### FR-2.3: Timer Expiration
- **Priority:** P0
- **Behavior When Timer Reaches 0:00:**
  - Automatically trigger print function
  - Stop all audio playback
  - Display completion screen
  - Auto-reload page after 10 seconds

### 3. Verse Selection Interface (Left Panel)

#### FR-3.1: Verses Section Layout
- **Priority:** P0
- **Specifications:**
  - Title: "VERSOS" centered at top
  - Dark background (#333)
  - Takes 50% of screen width (6/12 grid columns)
  - Scrollable verse list (height: 65vh)
  - Container height: 75vh
  - Rounded corners (20px border-radius)
  - Custom scrollbar styling (white thumb on dark background)

#### FR-3.2: Verse Cards Display
- **Priority:** P0
- **Card Specifications:**
  - White background rounded rectangles
  - Padding: 5px 10px
  - Border-radius: 14px
  - Displays verse text only (no author visible in this section)
  - Spacing between cards: 3 units (mb: 3)
  - Draggable state with visual feedback

#### FR-3.3: Verse List Behavior
- **Priority:** P0
- **Requirements:**
  - Verses randomized on initial load
  - Verses remain in left panel even after being added to poem
  - When verse is used in poem, regenerate its ID with timestamp suffix
  - This allows same verse to be dragged multiple times
  - No visual indication of which verses are already in poem

#### FR-3.4: Maximum Verses Alert
- **Priority:** P1
- **Specification:**
  - When user reaches 8 verses in poem, display error alert
  - Message: "Has llegado al número máximo de versos, pero aún puedes reordenar tu poema o sustituir versos."
  - Red background alert (Material-UI Alert severity="error")
  - Positioned above verse list
  - Prevents adding more verses to poem section
  - Allows reordering within poem section
  - Allows moving verses back from poem to verse list

### 4. Poem Composition Interface (Right Panel)

#### FR-4.1: Poem Section Layout
- **Priority:** P0
- **Specifications:**
  - Title: "TU POEMA" centered at top
  - Yellow/gold background (#cfc140)
  - Takes 50% of screen width (6/12 grid columns)
  - Scrollable verse list (height: 65vh)
  - Container height: 75vh
  - Rounded corners (20px border-radius)
  - Drop zone for verses from left panel

#### FR-4.2: Poem Verse Display
- **Priority:** P0
- **Specifications:**
  - Same visual style as verse cards in left panel
  - Shows verse text only (author hidden in main UI)
  - Sortable within poem section
  - Verses can be dragged back to left panel
  - Empty state shows empty droppable area

#### FR-4.3: Poem Ordering
- **Priority:** P0
- **Requirements:**
  - Verses can be reordered via drag and drop
  - Visual feedback during drag operations
  - Vertical list sorting strategy
  - Order is preserved for printing

### 5. Drag and Drop System

#### FR-5.1: Drag Operations
- **Priority:** P0
- **Supported Operations:**
  - Drag from "VERSOS" to "TU POEMA"
  - Drag within "TU POEMA" to reorder
  - Drag from "TU POEMA" back to "VERSOS"
  - Visual overlay of dragged verse during drag

#### FR-5.2: Drag Constraints
- **Priority:** P0
- **Rules:**
  - Maximum 8 verses in "TU POEMA" section
  - Cannot drag to "TU POEMA" when limit reached
  - Can always drag within "TU POEMA" for reordering
  - Can always drag from "TU POEMA" back to "VERSOS"

#### FR-5.3: Drag Interactions
- **Priority:** P0
- **Input Methods:**
  - Mouse/trackpad pointer events
  - Keyboard navigation with arrow keys
  - Collision detection using closest corners algorithm

#### FR-5.4: Drag Feedback
- **Priority:** P1
- **Visual Indicators:**
  - Overlay card following cursor during drag
  - Drop animation on release
  - Smooth transitions between positions

### 6. Data Management

#### FR-6.1: Verse Data Structure
- **Priority:** P0
- **Schema:**
```typescript
type Verse = {
  id: string;          // UUID v4 format
  value: string;       // The verse text
  autor: string;       // Author name
  poema: string;       // Source poem title
  poemario: string;    // Source poetry collection
}
```

#### FR-6.2: Data Sources
- **Priority:** P0
- **Format:**
  - CSV source files in `src/data/` directory
  - Delimiter: semicolon (;)
  - Columns: verso, autor, poema, poemario
  - Converted to JSON via build script

#### FR-6.3: Version System
- **Priority:** P0
- **Requirements:**
  - Support multiple verse collections/versions
  - Version selection via URL query parameter: `?version=<version-name>`
  - Default version: "v1"
  - Example versions: "v1", "canarias"
  - Each version maps to separate JSON data file

#### FR-6.4: Data Loading Script
- **Priority:** P1
- **Specifications:**
  - Script: `npm run data:reload`
  - Reads CSV file from `src/data/versos.canarias.csv`
  - Parses with semicolon delimiter
  - Generates UUID for each verse
  - Outputs to `src/data/canarias.json`
  - Console logs result for verification

### 7. Print Functionality

#### FR-7.1: Print Button
- **Priority:** P0
- **Specifications:**
  - Button text: "Imprime tu poema"
  - Yellow background (#cfc140)
  - Fixed positioning, always visible
  - Located below timer
  - Width: 190px
  - Rounded corners (10px border-radius)
  - Hover state: white background

#### FR-7.2: Print Layout
- **Priority:** P0
- **Requirements:**
  - Trigger browser print dialog
  - Hide main application UI in print view
  - Hide timer and buttons
  - Show print-only content:
    - Section 1: "POEMATÓN. Tu Poema ready-made:" header
    - Bullet list of verse texts (without author)
    - Section 2: "Poema confeccionado con los versos de los autores (autoría, poema):" header
    - Bullet list of attributions (author, poem, collection)

#### FR-7.3: Print Content Format
- **Priority:** P0
- **Specifications:**
  - Font sizes: 1.5em for main header, 1.2em for verses
  - Attribution font sizes: 1.3em for header, 1.1em for authors
  - Margins: 10px 100px 50px 100px for main content
  - Bold headers
  - Unstyled bullet lists

#### FR-7.4: Completion Screen
- **Priority:** P0
- **Display After Print:**
  - Full-screen overlay with background image
  - Message: "¡Enhorabuena, tu poema se está imprimiendo!" (3em font)
  - Submessage: "Gracias por participar." (2em font)
  - White text on dark background
  - Auto-reload after 10 seconds

### 8. Remote Video Server Integration

#### FR-8.1: Server Configuration
- **Priority:** P2 (Optional Feature)
- **URL Parameter:** `?videoServer=<url>`
- **Description:** Optional integration with external display/video system

#### FR-8.2: Data Transmission
- **Priority:** P2
- **Specification:**
  - Expose poem data to `window.poem` object
  - On print trigger, send POST request to configured server URL
  - Payload: JSON array of verse objects in poem
  - Headers: Content-Type: application/json
  - Silent failure if server unavailable (log to console)
  - Does not block print functionality

### 9. Visual Design Requirements

**Visual Reference:** Complete screenshots of all application screens are available in `/docs/screens/` folder (intro.png, main.png, print-dialog.png, end.png). See Appendix C for direct URLs to these screenshots for pixel-perfect reference during implementation.

#### FR-9.1: Color Palette
- **Priority:** P0
- **Colors:**
  - Primary accent: #cfc140 (yellow/gold)
  - Dark background: #000 (black)
  - Container background: #333 (dark gray)
  - Text: #fff (white)
  - Secondary text: #999 (gray)
  - Error: Red (Material-UI error color)

#### FR-9.2: Typography
- **Priority:** P0
- **Font:**
  - Font family: Roboto (weights: 300, 400, 500, 700)
  - Large title: 80px (h1)
  - Section headers: Material-UI h6 variant
  - Body text: Default Roboto sizing
  - Timer: 4em

#### FR-9.3: Background
- **Priority:** P1
- **Specification:**
  - Background image: `background.portada.png`
  - Applied to body and modal screens
  - Covers entire viewport

#### FR-9.4: Layout
- **Priority:** P0
- **Grid System:**
  - Material-UI Grid with 12-column system
  - Two equal columns (6/6 split)
  - Spacing between columns: 4 units
  - Responsive container
  - Top margin: 50px

### 10. Accessibility Requirements

#### FR-10.1: Keyboard Navigation
- **Priority:** P1
- **Requirements:**
  - Full keyboard support for drag and drop
  - Sortable keyboard coordinates for navigation
  - Tab navigation through interactive elements
  - Enter/Space to activate buttons

#### FR-10.2: Screen Reader Support
- **Priority:** P2
- **Requirements:**
  - Semantic HTML structure
  - ARIA labels for drag and drop regions
  - Alt text for images (corona logo)
  - Meaningful heading hierarchy

### 11. Performance Requirements

#### FR-11.1: Load Time
- **Priority:** P1
- **Target:** Initial page load under 3 seconds on standard broadband
- **Optimization:**
  - Code splitting with Vite
  - Asset optimization
  - Lazy loading of audio files

#### FR-11.2: Interaction Performance
- **Priority:** P0
- **Requirements:**
  - Drag operations must feel instantaneous (<16ms frame time)
  - Smooth animations (60fps)
  - No layout shifts during interactions

#### FR-11.3: Bundle Size
- **Priority:** P1
- **Target:** Total bundle size under 500KB (gzipped)
- **Strategy:** Tree-shaking, dynamic imports for audio

### 12. Browser Requirements

#### FR-12.1: Supported Browsers
- **Priority:** P0
- **Minimum Versions:**
  - Chrome/Edge: Last 2 versions
  - Firefox: Last 2 versions
  - Safari: Last 2 versions
  - No IE11 support required

#### FR-12.2: Required Features
- **Priority:** P0
- **APIs:**
  - Fullscreen API
  - Web Audio API
  - Drag and Drop API (via @dnd-kit)
  - Print API (window.print)
  - Fetch API

## Testing Requirements

### TR-1: Unit Tests (Vitest)
- **Priority:** P0
- **Coverage:**
  - Utility functions (board.ts, verse.ts)
  - Data processing script
  - Type definitions
  - Target: >80% code coverage

### TR-2: Component Tests
- **Priority:** P0
- **Coverage:**
  - VerseCard rendering
  - VersesSection and PoemSection components
  - Drag and drop interactions
  - Button click handlers
  - Timer countdown logic

### TR-3: Integration Tests
- **Priority:** P1
- **Scenarios:**
  - Complete user flow: start → drag verses → print
  - Version switching via URL parameters
  - Maximum verse limit enforcement
  - Timer expiration behavior

### TR-4: Visual Regression Tests
- **Priority:** P2
- **Coverage:**
  - Welcome screen
  - Main interface layout
  - Print layout
  - Completion screen
- **Reference Screenshots:** Use `/docs/screens/` screenshots as baseline for visual comparison (intro.png, main.png, print-dialog.png, end.png)

## Build and Deployment Requirements

### BD-1: Development Environment
- **Priority:** P0
- **Commands:**
  - `npm install` - Install dependencies
  - `npm run dev` - Start development server with HMR
  - `npm run build` - Production build
  - `npm run preview` - Preview production build locally
  - `npm test` - Run test suite
  - `npm run test:ui` - Run tests with Vitest UI
  - `npm run data:reload` - Regenerate JSON from CSV
  - `npm run format` - Check code formatting
  - `npm run format:fix` - Fix code formatting

### BD-2: Production Build
- **Priority:** P0
- **Requirements:**
  - Base path: `/poematon/` for GitHub Pages
  - Output directory: `dist/`
  - Asset optimization (minification, compression)
  - Source maps for debugging
  - TypeScript type checking before build

### BD-3: GitHub Actions Deployment
- **Priority:** P0
- **Workflow:**
  - Trigger on push to main branch
  - Manual workflow dispatch option
  - Steps:
    1. Checkout repository
    2. Setup Node.js 20
    3. Install dependencies (npm ci)
    4. Run tests
    5. Build application
    6. Deploy to GitHub Pages
  - Deploy to: `https://eberhm.github.io/poematon/`

### BD-4: Configuration Files
- **Priority:** P0
- **Required Files:**
  - `vite.config.ts` - Vite configuration with base path
  - `vitest.config.ts` - Test configuration
  - `tsconfig.json` - TypeScript configuration (strict mode)
  - `.prettierrc` - Code formatting rules
  - `.github/workflows/deploy.yml` - CI/CD pipeline

## Migration Strategy

**Note:** All source code, assets (images, audio, CSS), and data files are publicly available from the current repository. See **Appendix C: Asset URLs** for complete reference links to facilitate migration.

### Phase 1: Project Setup
1. Initialize new Vite + React + TypeScript project
2. Configure base path for GitHub Pages
3. Set up Vitest testing environment
4. Install all required dependencies
5. Configure Prettier and linting
6. Download or reference assets from current repository (see Appendix C)

### Phase 2: Core Implementation
1. Port type definitions (src/types/)
2. Port utility functions (src/utils/)
3. Implement data loading and version system
4. Port core components:
   - VerseCard
   - VerseItem/PoemItem
   - VersesSection/PoemSection
   - PoematonSectionList (main component)

### Phase 3: UI and Interaction
1. Implement drag and drop system
2. Port CSS styling (convert to module or keep global)
3. Implement timer system
4. Integrate audio playback
5. Implement fullscreen mode

### Phase 4: Print and Completion
1. Implement print functionality
2. Create print-specific CSS
3. Implement completion screen
4. Add remote video server integration

### Phase 5: Testing and Polish
1. Write unit tests for utilities
2. Write component tests
3. Test complete user flows
4. Performance optimization
5. Cross-browser testing

### Phase 6: Deployment
1. Configure GitHub Actions
2. Test deployment process
3. Verify production build
4. Deploy to GitHub Pages

## Data Migration

### Asset Access
All assets from the current implementation are publicly accessible via the GitHub repository and GitHub Pages deployment. See **Appendix C: Asset URLs** for complete list of image, audio, CSS, and data file URLs that can be used during development and migration.

### CSV to JSON Conversion
- **Files to Port:**
  - `src/data/data.csv` → `src/data/data.json`
  - `src/data/versos.canarias.csv` → `src/data/canarias.json`
- **Script:** Port `scripts/loadData.js` to work with new structure
- **Validation:** Verify all verses have unique UUIDs and complete metadata
- **Source:** Raw data files available at GitHub repository (see Appendix C)

## Non-Functional Requirements

### NFR-1: Code Quality
- TypeScript strict mode enabled
- ESLint with React and TypeScript rules
- Prettier for consistent formatting
- No console errors or warnings in production

### NFR-2: Documentation
- README with setup and development instructions
- Inline comments for complex logic
- Type definitions for all data structures
- CLAUDE.md for AI assistant context

### NFR-3: Maintainability
- Modular component structure
- Separation of concerns (UI, logic, data)
- Reusable utilities
- Clear naming conventions

### NFR-4: Error Handling
- Graceful fallback if audio fails to load
- Console logging for debugging
- User-friendly error messages
- Prevent crashes from drag and drop edge cases

## Success Criteria

1. **Feature Parity:** All features from original application working identically
2. **Performance:** Build time <30 seconds, dev server HMR <1 second
3. **Test Coverage:** >80% unit test coverage, all critical paths tested
4. **Zero Regressions:** No visual or functional differences from original
5. **Deployment:** Successful automated deployment to GitHub Pages
6. **User Experience:** Smooth 60fps interactions, no perceptible lag

## Future Enhancements (Out of Scope)

- Mobile/tablet responsive layout
- Social sharing functionality
- PDF export instead of print
- User accounts and poem saving
- Multilingual support
- Dark/light theme toggle
- Accessibility improvements (WCAG AAA)
- Analytics integration
- Progressive Web App (PWA) features

## Appendix

### A. File Structure
```
poematon/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── background.portada.png
│   ├── corona.png
│   ├── favicon.ico
│   └── sound/
│       ├── music.mp3
│       ├── 20s.mp3
│       └── 10s.mp3
├── scripts/
│   └── loadData.js
├── src/
│   ├── components/
│   │   ├── PoemItem.tsx
│   │   ├── PoemSection.tsx
│   │   ├── PoematonSectionList.tsx
│   │   ├── VerseCard.tsx
│   │   ├── VerseItem.tsx
│   │   └── VersesSection.tsx
│   ├── data/
│   │   ├── canarias.json
│   │   ├── data.json
│   │   ├── index.ts
│   │   └── versos.canarias.csv
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── board.ts
│   │   └── verse.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── theme.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

### B. Key Dependencies
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.0.5",
    "@dnd-kit/sortable": "^7.0.1",
    "@emotion/react": "^11.10.0",
    "@emotion/styled": "^11.10.0",
    "@mui/icons-material": "^5.10.2",
    "@mui/material": "^5.10.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "csv-parse": "^5.5.5",
    "prettier": "^3.2.5",
    "typescript": "^5.0.0",
    "uuid": "^9.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

### C. Asset URLs (Current Public Repository)

The current application is deployed at: `https://eberhm.github.io/poematon/`

#### Images
- **Background Image:** `https://eberhm.github.io/poematon/background.portada.png`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/background.portada.png`
- **Corona Logo:** `https://eberhm.github.io/poematon/corona.png`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/corona.png`
- **Favicon:** `https://eberhm.github.io/poematon/favicon.ico`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/favicon.ico`
- **Logo 192x192:** `https://eberhm.github.io/poematon/logo192.png`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/logo192.png`
- **Logo 512x512:** `https://eberhm.github.io/poematon/logo512.png`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/logo512.png`

#### Screenshots (Visual Reference)
The `/docs/screens/` folder contains complete screenshots of all application states for visual reference during implementation:
- **Welcome/Intro Screen:** `https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/intro.png`
  - Shows initial screen with logo, instructions, and "EMPEZAR" button
- **Main Interface:** `https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/main.png`
  - Shows drag-and-drop interface with verse selection (left) and poem composition (right)
- **Print Dialog:** `https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/print-dialog.png`
  - Shows browser print preview with formatted poem output
- **Completion Screen:** `https://raw.githubusercontent.com/eberhm/poematon/main/docs/screens/end.png`
  - Shows final "Enhorabuena" message after printing

#### Audio Files
- **Background Music:** `https://eberhm.github.io/poematon/sound/music.mp3`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/sound/music.mp3`
- **20 Second Warning:** `https://eberhm.github.io/poematon/sound/20s.mp3`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/sound/20s.mp3`
- **10 Second Sound (unused):** `https://eberhm.github.io/poematon/sound/10s.mp3`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/sound/10s.mp3`

#### CSS
- **Main Stylesheet:** `https://eberhm.github.io/poematon/main.css`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/main.css`

#### Data Files
- **Version 1 Data:**
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/src/data/data.json`
- **Canarias Version Data:**
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/src/data/canarias.json`
- **Canarias CSV Source:**
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/src/data/versos.canarias.csv`
- **Preload Data:**
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/src/data/preload.json`

#### Scripts
- **Timer Script:** `https://eberhm.github.io/poematon/tiempo.js`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/tiempo.js`
- **Data Loading Script:**
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/scripts/loadData.js`

#### Configuration
- **Manifest:** `https://eberhm.github.io/poematon/manifest.json`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/manifest.json`
- **Robots.txt:** `https://eberhm.github.io/poematon/robots.txt`
  - Raw: `https://raw.githubusercontent.com/eberhm/poematon/main/public/robots.txt`

#### Source Code Reference
- **Full Repository:** `https://github.com/eberhm/poematon`
- **Main Branch:** `https://github.com/eberhm/poematon/tree/main`
- **Components:** `https://github.com/eberhm/poematon/tree/main/src/components`
- **Types:** `https://github.com/eberhm/poematon/tree/main/src/types`
- **Utils:** `https://github.com/eberhm/poematon/tree/main/src/utils`

**Note:** Use raw GitHub URLs when fetching files programmatically. Use GitHub Pages URLs for production assets.

### D. Glossary
- **Ready-made poem:** Poetry created by selecting and arranging existing verses from other works
- **Verse:** A single line or phrase of poetry
- **CEROPOÉTICAS:** "Zero Poetics" - the expanded poetry exhibition context
- **Poematón:** Portmanteau of "poema" (poem) and possibly "maratón" (marathon)
