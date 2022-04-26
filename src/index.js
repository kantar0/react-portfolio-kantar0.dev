import * as React from 'react-dom/client';
import { LangProvider } from './contexts/LangContext';
import App from './App';
import './index.css';

const container = document.getElementById('root');

// Create a root.
const root = React.createRoot(container);
// Initial render: Render an element to the root.
root.render(<LangProvider><App /></LangProvider>);
