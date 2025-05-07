# Social Media Dialogue Modifier

A React application that allows users to create variations of social media posts and comments with subtle text modifications. This tool can generate multiple versions of text with various transformations like character substitutions, word replacements, emoji insertions, typos, capitalization changes, and punctuation variations.

## Features

- Create variations of original posts and comments
- Adjust modification levels for different text transformation types
- Generate multiple variations at once
- Responsive design with mobile support

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Create React App

## Setup

1. Clone the repository
```bash
git clone https://github.com/charliegum/social-media-dialogue-modifier.git
cd social-media-dialogue-modifier
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm start
```

4. Open your browser and navigate to http://localhost:3000

## Building for Production

To create a production build:

```bash
npm run build
```

This will create optimized files in the `build` folder that can be deployed to any static hosting service.

## Deployment

The application can be deployed to various platforms like GitHub Pages, Vercel, Netlify, etc.

### GitHub Pages Deployment

1. Add the homepage field to package.json:
```json
{
  "homepage": "https://charliegum.github.io/social-media-dialogue-modifier"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy the app:
```bash
npm run deploy
