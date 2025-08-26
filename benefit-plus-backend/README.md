# Benefit+ Strapi Backend

Complete Strapi backend for the Benefit+ V2 Premium platform, providing APIs for businesses, deals, events, and user management.

## 🚀 Features

- **Business Management**: Complete business listings with categories, neighborhoods, and premium features
- **Deal System**: Member deals, flash deals with countdown timers, and deal redemption
- **Event Management**: Event creation, attendance tracking, and social proof features
- **User Profiles**: Extended user profiles with preferences and favorites
- **Premium Features**: Support for premium businesses and exclusive member benefits

## 🏗️ Architecture

### Content Types
- **Business**: Core business listings with premium features
- **Deal**: Member deals and flash deals
- **Event**: Events and activities with attendance tracking
- **User Profile**: Extended user information and preferences

### Components
- **Location**: Business coordinates and address
- **Review**: Business reviews and ratings
- **Attendee**: Event attendee information for social proof

### Custom APIs
- `/api/businesses/recommended` - Personalized business recommendations
- `/api/businesses/with-deals` - Businesses with active deals
- `/api/deals/flash-deals` - Active flash deals
- `/api/events/upcoming` - Upcoming events
- `/api/events/:id/attend` - Event attendance management

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run develop
```

### 3. Access Admin Panel
- Open: http://localhost:1337/admin
- Create your first admin account
- Configure content types and permissions

### 4. Configure Permissions
- Go to Settings → Users & Permissions Plugin
- Configure public access for: business, deal, event
- Configure authenticated access for: user-profile

### 5. Seed Sample Data
The backend includes sample data for testing:
- 3 sample businesses
- 3 sample deals (including 1 flash deal)
- 2 sample events

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/businesses` - List all businesses
- `GET /api/businesses/:id` - Get business details
- `GET /api/deals` - List all deals
- `GET /api/deals/flash-deals` - Get active flash deals
- `GET /api/events` - List all events
- `GET /api/events/upcoming` - Get upcoming events

### Authenticated Endpoints
- `GET /api/businesses/recommended` - Get personalized recommendations
- `POST /api/businesses/:id/toggle-favorite` - Toggle business favorite
- `POST /api/deals/:id/redeem` - Redeem a deal
- `POST /api/events/:id/attend` - Attend an event

## 🔐 Authentication

Uses Strapi's built-in Users & Permissions plugin:
- JWT-based authentication
- Role-based access control
- User registration and login
- Password reset functionality

## 📱 Frontend Integration

### Environment Variables
```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_api_token_here
```

### API Configuration
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_STRAPI_URL + '/api',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`
  }
});
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure database connection
- Set admin panel URL
- Configure CORS origins

## 📊 Database Schema

### Business
- Basic info (name, description, category)
- Location and neighborhood
- Ratings and reviews
- Premium features and member deals
- Amenities and business hours

### Deal
- Deal details and pricing
- Flash deal timers
- Business relationship
- Redemption tracking

### Event
- Event information and scheduling
- Business relationship
- Attendance management
- Social proof features

## 🔧 Customization

### Adding New Fields
1. Update the content type schema
2. Modify controllers if needed
3. Update API documentation
4. Test with frontend

### Adding New APIs
1. Create controller methods
2. Define routes
3. Configure permissions
4. Test endpoints

## 📚 Documentation

- [Strapi Documentation](https://docs.strapi.io/)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Content Type Builder](https://docs.strapi.io/dev-docs/development/content-type-builder)

## 🆘 Support

For backend-specific issues:
1. Check Strapi logs
2. Verify content type configurations
3. Check API permissions
4. Review database connections

## 🎯 Next Steps

1. **Content Creation**: Add real businesses, deals, and events
2. **User Management**: Configure user roles and permissions
3. **Media Management**: Upload business photos and event images
4. **API Testing**: Test all endpoints with frontend
5. **Performance**: Optimize queries and add caching
6. **Security**: Review and enhance security measures

---

Built for Benefit+ V2 Premium Platform 🚀
