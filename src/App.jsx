import { useState, useEffect } from 'react';
import { portfolio } from './data/portfolioData.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import SubCategoryList from './pages/SubCategoryList.jsx';
import DetailView from './pages/DetailView.jsx';

export default function App() {
  // Navigation State
  // view: 'home' | 'category' | 'detail'
  const [currentView, setCurrentView] = useState('home');
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);

  const categories = portfolio.getMainCategories();
  const activeCategory = activeCategoryId ? portfolio.getCategoryMeta(activeCategoryId) : null;
  const activeItemData = activeItemId ? portfolio.getItem(activeCategoryId, activeItemId) : { item: null, categoryMeta: null };

  // Parse URL hash on mount and hashchange for deep linking and back/forward browser button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentView('home');
        setActiveCategoryId(null);
        setActiveItemId(null);
        return;
      }

      const parts = hash.split('/');
      if (parts[0] === 'category' && parts[1]) {
        setCurrentView('category');
        setActiveCategoryId(parts[1]);
        setActiveItemId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (parts[0] === 'item' && parts[1] && parts[2]) {
        setCurrentView('detail');
        setActiveCategoryId(parts[1]);
        setActiveItemId(parts[2]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Programmatic Navigation Handlers
  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    setActiveCategoryId(null);
    setActiveItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryId) => {
    window.location.hash = `category/${categoryId}`;
    setCurrentView('category');
    setActiveCategoryId(categoryId);
    setActiveItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToItem = (item) => {
    const catId = item.categoryKey || activeCategoryId || 'embedded-systems';
    window.location.hash = `item/${catId}/${item.id}`;
    setCurrentView('detail');
    setActiveCategoryId(catId);
    setActiveItemId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adjacent item lookup for smooth detail navigation
  const adjacentItems = (activeCategoryId && activeItemId)
    ? portfolio.getAdjacentItem(activeCategoryId, activeItemId)
    : { prev: null, next: null };

  return (
    <div className="min-h-screen bg-charcoal-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-400/30 selection:text-white">
      
      {/* Top Sticky Navbar with Interactive Breadcrumbs */}
      <Navbar
        currentView={currentView}
        activeCategory={activeCategory}
        activeItem={activeItemData.item}
        onNavigateHome={navigateToHome}
        onNavigateCategory={navigateToCategory}
      />

      {/* Main Multi-Level Content View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            categories={categories}
            onSelectCategory={navigateToCategory}
          />
        )}

        {currentView === 'category' && activeCategory && (
          <SubCategoryList
            categoryMeta={activeCategory}
            allCategories={categories}
            onSelectCategory={navigateToCategory}
            onSelectItem={navigateToItem}
            onBackToHome={navigateToHome}
          />
        )}

        {currentView === 'detail' && (
          <DetailView
            item={activeItemData.item}
            categoryMeta={activeCategory || activeItemData.categoryMeta}
            onBack={() => activeCategoryId ? navigateToCategory(activeCategoryId) : navigateToHome()}
            onNavigateItem={navigateToItem}
            adjacentItems={adjacentItems}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      
    </div>
  );
}
