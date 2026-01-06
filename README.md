# 🎟️ Ticket Draw Web Application

A React-based web application for randomly selecting winning tickets from a pool of 3,000 tickets and assigning them to 8 prizes.

## Features

- **Random Selection**: Fair random selection of 8 unique winning tickets from 3,000 total tickets
- **Persistent Storage**: Results are saved in browser local storage and persist across page refreshes
- **One-Time Draw**: Prevents accidental duplicate draws
- **Reset Functionality**: Clear results and start a new draw (with confirmation)
- **Modern UI**: Clean, responsive design with gradient styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Initial State**: On first load, the "Draw Winners" button is enabled
2. **Draw Process**: Clicking "Draw Winners" randomly selects 8 unique tickets and assigns them to prizes 1st through 8th
3. **Persistence**: Results are automatically saved to browser local storage
4. **Page Refresh**: Results persist across page reloads
5. **Reset**: Click "Reset" to clear results and enable a new draw (requires confirmation)

## Technical Details

- **Framework**: React 18 with Vite
- **Storage**: Browser Local Storage
- **Randomization**: Fisher-Yates shuffle algorithm for fair randomization
- **Total Tickets**: 3,000 (numbered 1-3000)
- **Total Prizes**: 8 (1st through 8th)

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- Local Storage API
- React 18

## License

MIT

