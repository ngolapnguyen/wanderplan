import React from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/layouts';
import { Home } from '../pages/Home';
import { LoginLayout } from '../pages/Login';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(MainLayout),
    children: [
      {
        index: true,
        element: React.createElement(Home),
      },
    ],
  },
  {
    path: '/login',
    element: React.createElement(LoginLayout),
  },
];
