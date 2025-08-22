# Benefit+ Platform

A modern membership platform for Da Nang & Hoi An, Vietnam, designed for travelers, slow travelers, digital nomads, and expats.

## 🚀 Features

### Phase 1 (Current)
- **Business Directory**: Search and discover local businesses with member deals
- **Business Details**: Comprehensive business information with photo galleries and member benefits
- **User Profiles**: Personal dashboard for favorites, events, and account management
- **Member Deals**: Exclusive offers and discounts for platform members
- **Events**: Discover and track local events and workshops

### Future Phases
- **Phase 2**: Accommodation booking and management
- **Phase 3**: Talent representation and professional services

## 🎨 Design System

- **Color Palette**: Deep teal (#003B49), vibrant coral (#FF6B6B), light sand (#F8F5F1)
- **Typography**: Poppins for headings, Inter for body text
- **Icons**: Heroicons for consistent iconography
- **Mobile-First**: Responsive design optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with modern hooks and functional components
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for seamless navigation
- **Icons**: Heroicons for beautiful, consistent iconography
- **Backend**: Designed for Strapi CMS integration (API-ready)

## 📱 Screens

1. **Business Directory** (`/`)
   - Search functionality with filters
   - List/Map view toggle
   - Business cards with member deal highlights
   - Responsive grid layout

2. **Business Detail** (`/business/:id`)
   - Photo gallery with thumbnails
   - Tabbed content (About, Deals, Events, Reviews)
   - Sticky summary panel with member deals
   - Business information and contact details

3. **User Profile** (`/profile`)
   - Tabbed navigation (Favorites, Events, Account)
   - Favorite businesses management
   - Event tracking (upcoming and past)
   - Account settings and membership status

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd benefit-plus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_API_URL=http://localhost:1337/api
```

### Strapi Integration
The platform is designed to work with Strapi CMS. Key content types:

- **Business**: Name, category, neighborhood, rating, deals, events
- **User**: Profile, favorites, event attendance
- **Deal**: Member benefits, validity, business association
- **Event**: Title, date, description, business association

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BusinessCard.js
│   ├── Header.js
│   ├── SearchBar.js
│   └── ViewToggle.js
├── screens/            # Main application screens
│   ├── BusinessDirectory.js
│   ├── BusinessDetail.js
│   └── UserProfile.js
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Components

### BusinessCard
- Reusable business listing component
- Heart icon for favorites
- Member deal badges
- Responsive image handling

### SearchBar
- Search functionality with filters
- Clean, accessible design
- Mobile-optimized input

### ViewToggle
- List/Map view switching
- Consistent with design system
- Accessible button states

## 🔄 State Management

Currently using React hooks for local state management. The platform is designed to easily integrate with:

- Redux Toolkit for complex state
- React Query for server state
- Zustand for lightweight state management

## 📱 Responsive Design

- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Tailwind's responsive utilities
- **Touch-Friendly**: Optimized for touch interactions
- **Accessibility**: WCAG compliant components

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to update the color palette:

```javascript
colors: {
  primary: {
    DEFAULT: '#003B49', // Deep Teal
    dark: '#002A35',
    light: '#004D5F'
  },
  accent: {
    DEFAULT: '#FF6B6B', // Vibrant Coral
    // ... more colors
  }
}
```

### Components
All components are built with Tailwind CSS classes and can be easily customized by modifying the className props.

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your repository
2. Framework preset: Create React App
3. Build command: `npm run build`

### AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `build` folder to S3
3. Configure CloudFront for CDN

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live data
- **Offline Support**: Service worker for offline functionality
- **Push Notifications**: Deal alerts and event reminders
- **Social Features**: User reviews and ratings
- **Analytics**: Business performance tracking
- **Multi-language**: Vietnamese and English support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the Da Nang & Hoi An community**

