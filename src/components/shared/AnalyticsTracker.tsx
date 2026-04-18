import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../../lib/firebase';

export default function AnalyticsTracker() {
  const location = useLocation();

  React.useEffect(() => {
    // Basic page view tracking
    const pageName = location.pathname.startsWith('/admin') ? 'admin_page_view' : 'store_page_view';
    
    trackEvent('page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
      screen_class: pageName,
    });

    // Specific event for navigation
    trackEvent('screen_view', {
      firebase_screen: location.pathname,
      firebase_screen_class: 'AdminDashboard',
    });
  }, [location]);

  return null;
}
