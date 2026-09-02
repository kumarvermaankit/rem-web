# WhatsApp Reminder & Assistant Bot Website

A modern, responsive static website built with React for a WhatsApp reminder and assistant bot service.

Backend Github : https://github.com/kumarvermaankit/reminder-backend

## Features

- **Modern Design**: Clean, professional UI with Tailwind CSS
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Components**: Smooth animations and transitions
- **Complete Sections**: Hero, Features, Pricing, FAQ, Contact, and Footer
- **WhatsApp Integration Ready**: Designed to showcase WhatsApp bot capabilities

## Technology Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Create React App**: Standard React development setup

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```bash
   cd whatsapp-bot-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Navbar.js      # Navigation bar with mobile menu
│   ├── Hero.js        # Hero section with CTA
│   ├── Features.js    # Features showcase
│   ├── Pricing.js     # Pricing plans with toggle
│   ├── FAQ.js         # Accordion FAQ section
│   ├── Contact.js     # Contact form and info
│   └── Footer.js      # Footer with links
├── App.js             # Main app component
├── index.css          # Tailwind CSS and custom styles
└── index.js           # React entry point
public/
└── index.html         # HTML template
```

## Customization

### Colors

The project uses WhatsApp brand colors defined in `tailwind.config.js`:
- `whatsapp`: #25D366 (WhatsApp green)
- `whatsapp-dark`: #128C7E (Dark green)
- `whatsapp-light`: #DCF8C6 (Light green)

### Content

All text content is embedded within the components. You can easily modify:
- Headings and descriptions
- Feature lists
- Pricing plans
- FAQ items
- Contact information

### Styling

- Custom CSS classes are defined in `src/index.css`
- Tailwind utilities are used throughout for consistent styling
- Hover effects and transitions are built-in

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `build` folder ready for deployment.

### Deployment Options

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the `build` folder contents
- **Any static hosting**: The build folder contains all static assets

## Features Included

### Navigation
- Sticky header with scroll effects
- Mobile-responsive hamburger menu
- Smooth scrolling to sections

### Hero Section
- Eye-catching gradient background
- Call-to-action buttons
- Feature highlights
- WhatsApp branding

### Features Section
- Grid layout of features
- Detailed feature cards
- Hover animations
- Icon-based visual elements

### Pricing Section
- Multiple pricing tiers
- Monthly/annual toggle
- Feature comparisons
- Popular plan highlighting

### FAQ Section
- Accordion-style questions
- Category filtering
- Contact support integration
- Search functionality ready

### Contact Section
- Lead capture form
- Contact information display
- Social proof statistics
- Multiple contact methods

### Footer
- Company information
- Social media links
- Legal links
- Newsletter signup ready

## Performance

- Optimized images and assets
- Lazy loading ready
- SEO-friendly meta tags
- Fast loading times
- Mobile-first design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


---

Built with ❤️ for WhatsApp bot enthusiasts
