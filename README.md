# Molki Design - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Components](#components)
6. [Pages and Routing](#pages-and-routing)
7. [Content Management](#content-management)
8. [State Management](#state-management)
9. [Animation and Interactions](#animation-and-interactions)
10. [Development Workflow](#development-workflow)
11. [Best Practices](#best-practices)
12. [Setup and Deployment](#setup-and-deployment)

## Project Overview

**Project Name:** Molki Design  
**Description:** A professional website for Molki Design, a design company based in Gdańsk, Poland, operating in the Tri-City market since 2019. The website showcases their creative solutions, projects, team, and services.  
**Author:** Patryk Smakosz  
**Website:** https://molki-design-2025.netlify.app  

This project is built as a modern, responsive website with a focus on visual appeal, smooth animations, and user experience. It utilizes Nuxt 3 as the framework, with Tailwind CSS for styling, custom SCSS for additional styling needs, Nuxt Content for content management, and Nuxt Studio as the CMS.

## Technology Stack

### Core Technologies
- **Nuxt 3**: Vue.js framework for building modern web applications
- **Vue 3**: Progressive JavaScript framework for building user interfaces
- **TypeScript**: Typed superset of JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **SCSS**: CSS preprocessor for custom styling
- **Nuxt Content**: Content management system for Nuxt
- **Nuxt Studio**: Headless CMS for managing content

### Additional Libraries and Plugins
- **GSAP (GreenSock Animation Platform)**: For advanced animations and transitions
  - Including premium plugins: MorphSVG, SplitText, ScrollSmoother
- **Pinia**: State management for Vue applications
- **Swiper**: Touch slider for mobile-friendly carousels
- **HubSpot Integration**: For form handling and customer relationship management

### Development Tools
- **Prettier**: Code formatter
- **ESLint**: Linting utility
- **Nuxt Devtools**: Development tools for Nuxt
- **PostCSS**: Tool for transforming CSS with JavaScript
- **Autoprefixer**: Plugin to parse CSS and add vendor prefixes

## Project Structure

```
molki-nuxt/
├── .nuxt/                  # Nuxt build directory
├── .output/                # Nuxt output directory
├── assets/                 # Static assets
│   ├── fonts/              # Custom fonts
│   ├── img/                # Images
│   ├── scss/               # SCSS files
│   │   ├── components/     # Component-specific styles
│   │   ├── colors.scss     # Color variables
│   │   ├── layout.scss     # Layout styles
│   │   ├── main.scss       # Main SCSS file
│   │   ├── settings.scss   # SCSS variables and settings
│   │   └── typography.scss # Typography styles
│   └── video/              # Video assets
├── components/             # Vue components
│   └── content/            # Content-specific components
├── composables/            # Vue composables
├── content/                # Content files (Markdown)
│   └── projects/           # Project content files
├── layouts/                # Layout components
├── pages/                  # Page components
├── plugins/                # Nuxt plugins
├── public/                 # Public static assets
├── server/                 # Server-side code
├── stores/                 # Pinia stores
└── types/                  # TypeScript type definitions
```

## Design System

### Colors
```typescript
colors: {
  primary: {
    DEFAULT: '#B76246',
    light: '#D0835F',
    dark: '#A65339',
  },
  secondary: {
    DEFAULT: '#3E5777',
    dark: '#262222',
  },
  neutral: {
    100: '#FFFFFF',
    200: '#F9F5F2',
    300: '#F7EEE6',
    400: '#E6E4DF',
    500: '#D9D9D9',
    600: '#363434',
  },
  text: {
    primary: '#503D32',
  },
}
```

### Typography
- **Primary Font**: Montserrat (sans-serif)
- **Secondary Font**: Spartan (sans-serif)

## Components

### Layout Components
- `HeaderComponent.vue`: Main navigation header
- `FooterComponent.vue`: Site footer
- `PreFooter.vue`: Pre-footer section
- `GSAPScrollSmoother.vue`: Smooth scrolling wrapper

### Hero Components
- `Hero.vue`: Generic hero component
- `HeroBusiness.vue`: Business-specific hero
- `HeroInterior.vue`: Interior design hero
- `HeroProjects.vue`: Projects showcase hero
- `HeroTeam.vue`: Team showcase hero

### UI Components
- `Logo.vue`: Site logo
- `Loader.vue`: Page loading animation
- `ButtonExamples.vue`: Button components
- `FrameCorner.vue`: Decorative frame
- `IconBlock.vue`: Icon with text block

### Content Components
- `ProjectGrid.vue` & `ProjectGridItem.vue`: Project display
- `SquareGrid.vue` & `SquareGridItem.vue`: Generic grid
- `TeamMember.vue`: Team member card
- `Feature.vue`: Feature highlight
- `TitleSection.vue`: Section titles

### Form Components
- `ContactForm.vue`: Contact form
- `HubspotForm.vue`: HubSpot integration

## Content Management

Content is managed through Nuxt Content and Nuxt Studio, with content files stored in Markdown format in the `content/` directory.

### Content Schema
```typescript
projects: {
  title: string,
  subtitle: string,
  slug: string,
  location: string,
  year: string,
  number: string,
  cover: string,
  images: string[],
  ctaText?: string,
  ctaLink?: string,
}
```

## State Management

The project uses Pinia for state management with the following stores:
- `loaderStore`: Application loading state
- `menuStore`: Navigation menu state

## Animation and Interactions

GSAP is used for animations with premium plugins:
- **MorphSVG**: SVG shape morphing
- **SplitText**: Text animation effects
- **ScrollSmoother**: Smooth scrolling

## Best Practices

### Code Style
- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Use Prettier for consistent formatting

### Component Design
- Create reusable components
- Use props for configuration
- Use slots for composition
- Document component usage

### Performance
- Lazy load images and components
- Optimize assets
- Implement proper caching

### Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure proper color contrast
- Support keyboard navigation

## Setup and Deployment

### Installation

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### Development

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

### Production

```bash
# Build
npm run build

# Preview
npm run preview
```

### Environment Variables
Required environment variables:
- `HUBSPOT_PORTAL_ID`: HubSpot portal ID for form integration

For more information about deployment, visit the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).
