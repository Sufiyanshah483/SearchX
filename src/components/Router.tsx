import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import TweetDetailPage from '@/components/pages/TweetDetailPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import SavedPage from '@/components/pages/SavedPage';
import ProfilePage from '@/components/pages/ProfilePage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';
import CookiesPage from '@/components/pages/CookiesPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "tweet/:id",
        element: <TweetDetailPage />,
        routeMetadata: {
          pageIdentifier: 'tweet-detail',
        },
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
        routeMetadata: {
          pageIdentifier: 'analytics',
        },
      },
      {
        path: "saved",
        element: <SavedPage />,
        routeMetadata: {
          pageIdentifier: 'saved',
        },
      },
      {
        path: "profile",
        element: <ProfilePage />,
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "terms",
        element: <TermsPage />,
        routeMetadata: {
          pageIdentifier: 'terms',
        },
      },
      {
        path: "cookies",
        element: <CookiesPage />,
        routeMetadata: {
          pageIdentifier: 'cookies',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
