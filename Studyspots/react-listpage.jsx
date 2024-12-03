import React from "react";
import { createRoot } from 'react-dom/client';
import ListPage from './react-src/ListPage';

const domNode = document.getElementById('react-link');
const root = createRoot(domNode);
root.render(<ListPage />);