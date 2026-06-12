import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import {Home} from './components/Home';
import './index.css';

const RestaurantView = lazy(() =>
  import('./components/RestaurantView').then((m) => ({default: m.RestaurantView})),
);

const restaurantFallback = <div className="min-h-[100dvh] bg-background" />;

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {index: true, element: <Home />},
        {
          path: 'r/:restaurantId',
          element: (
            <Suspense fallback={restaurantFallback}>
              <RestaurantView />
            </Suspense>
          ),
          children: [
            {index: true},
            {path: 'menu'},
          ],
        },
      ],
    },
  ],
  {basename: '/app'},
);

// Service worker solo in deploy reale: in `vite preview` interferisce col back/overlay.
if (!import.meta.env.VITE_PREVIEW) {
  registerSW({immediate: true});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
