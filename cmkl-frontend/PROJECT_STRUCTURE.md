# SampleSite - Modern React Website

A comprehensive sample website built with React, TypeScript, and Vite, demonstrating modern web development patterns and best practices.

## 🚀 Features

- **Modern React Architecture**: Built with React 19, TypeScript, and Vite
- **Organized Structure**: Well-organized folder structure separating concerns
- **Dark/Light Theme**: Toggle between light and dark themes
- **Shopping Cart**: Functional shopping cart with add/remove/update capabilities
- **Responsive Design**: Mobile-first responsive design
- **Context Management**: React Context for global state management
- **Routing**: Client-side routing with React Router
- **Type Safety**: Full TypeScript implementation with proper type definitions

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable UI components
│   ├── Header.tsx   # Navigation header with theme toggle
│   ├── Footer.tsx   # Site footer
│   ├── ProductCard.tsx  # Product display component
│   ├── BlogCard.tsx     # Blog post display component
│   └── index.ts     # Component exports
├── context/         # React Context providers
│   ├── ThemeContext.tsx  # Theme management
│   ├── CartContext.tsx   # Shopping cart state
│   └── index.ts     # Context exports
├── data/           # Data layer and type definitions
│   ├── types.ts    # TypeScript type definitions
│   ├── mockData.ts # Sample data for the application
│   └── index.ts    # Data exports
├── pages/          # Page components (routes)
│   ├── Home.tsx    # Landing page with hero section
│   ├── Products.tsx # Product listing with filters
│   ├── Blog.tsx    # Blog posts listing
│   ├── Cart.tsx    # Shopping cart page
│   ├── About.tsx   # About us page
│   └── index.ts    # Page exports
├── App.tsx         # Main app component with routing
├── main.tsx        # Application entry point
├── index.css       # Global styles and CSS reset
└── App.css         # App-specific styles
```

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API + useReducer
- **Styling**: CSS Modules with CSS Variables for theming
- **Code Quality**: ESLint + TypeScript strict mode

## 🏃‍♂️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 🎨 Features Overview

### Theme System
- Light/Dark theme toggle
- System preference detection
- CSS variables for consistent theming
- Smooth transitions between themes

### Shopping Cart
- Add/remove items
- Quantity management
- Total calculation
- Persistent state during session

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Type Safety
- Comprehensive TypeScript definitions
- Strict type checking
- Interface definitions for all data structures
- Type-safe component props

## 🔧 Development Patterns

### Component Organization
- Separate components by functionality
- Co-located CSS files with components
- Index files for clean imports
- Reusable, composable components

### State Management
- Context API for global state
- useReducer for complex state logic
- Local state for component-specific data
- Custom hooks for state logic reuse

### Data Management
- Centralized type definitions
- Mock data for development
- Structured data layer
- Easy to replace with API calls

## 📱 Pages Overview

- **Home**: Hero section, featured products, latest blog posts
- **Products**: Product grid with search and category filtering
- **Blog**: Article listing with rich content cards
- **Cart**: Shopping cart management with quantity controls
- **About**: Company information, team, and contact details

## 🎯 Best Practices Implemented

- **Code Organization**: Clear separation of concerns
- **Type Safety**: Comprehensive TypeScript usage
- **Performance**: Optimized rendering with proper React patterns
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **SEO**: Proper meta tags and semantic structure
- **Maintainability**: Clean, documented, and modular code

## 🚀 Extending the Application

This structure makes it easy to:
- Add new pages by creating components in `/pages`
- Create reusable UI components in `/components`
- Extend the data layer with new types and mock data
- Add new context providers for additional global state
- Implement real API integration by updating the data layer

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

This sample website demonstrates modern React development practices and serves as a solid foundation for building scalable web applications.