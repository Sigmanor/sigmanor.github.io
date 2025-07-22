// Caching and Performance Script for Links Page
// Version 1.0.0

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Cache management for links page
(function() {
  'use strict';
  
  const CACHE_VERSION = '1.0.0';
  const CACHE_KEY = 'sigmanor_links_cache';
  const CACHE_DURATION = 3600000; // 1 hour in milliseconds
  
  // Check if content is cached and still valid
  function isCacheValid() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return false;
    
    try {
      const data = JSON.parse(cached);
      const now = Date.now();
      return (now - data.timestamp) < CACHE_DURATION && data.version === CACHE_VERSION;
    } catch (e) {
      return false;
    }
  }
  
  // Cache page metadata
  function cachePageData() {
    const cacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      lastVisit: new Date().toISOString(),
      visitCount: getVisitCount() + 1
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem('sigmanor_visit_count', cacheData.visitCount.toString());
  }
  
  // Get visit count
  function getVisitCount() {
    return parseInt(localStorage.getItem('sigmanor_visit_count') || '0', 10);
  }
  
  // Preload images for better caching
  function preloadImages() {
    const images = ['../assets/photo.jpg'];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Lazy load external resources
  function optimizeExternalResources() {
    // Add loading="lazy" to images if not already present
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto && !profilePhoto.hasAttribute('loading')) {
      profilePhoto.setAttribute('loading', 'lazy');
    }
  }
  
  // Initialize caching
  function init() {
    // Cache current visit
    cachePageData();
    
    // Preload critical images
    preloadImages();
    
    // Optimize external resources
    optimizeExternalResources();
    
    // Log cache status (for development)
    if (console && console.log) {
      const visitCount = getVisitCount();
      console.log(`Links page loaded. Visit #${visitCount}. Cache: ${isCacheValid() ? 'valid' : 'refreshed'}`);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();