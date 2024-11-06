// src/app/components/RouterProvider.tsx
"use client";

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

export default RouterProvider;
