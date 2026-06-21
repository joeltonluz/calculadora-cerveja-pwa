import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import DonationScreen from './components/DonationScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [beers, setBeers] = useState(() => {
    const saved = localStorage.getItem('calculabreja_beers');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Detect OS dark mode preference or load saved theme
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('calculabreja_dark_mode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync beers to localStorage
  useEffect(() => {
    localStorage.setItem('calculabreja_beers', JSON.stringify(beers));
  }, [beers]);

  // Sync theme class with body element
  useEffect(() => {
    const rootClassList = document.documentElement.classList;
    if (darkMode) {
      rootClassList.add('dark-theme');
    } else {
      rootClassList.remove('dark-theme');
    }
    localStorage.setItem('calculabreja_dark_mode', darkMode.toString());
  }, [darkMode]);

  const handleAddBeer = (newBeer) => {
    setBeers((prevBeers) => [...prevBeers, newBeer]);
  };

  const handleClearBeers = () => {
    if (window.confirm('Deseja limpar toda a lista de comparação?')) {
      setBeers([]);
    }
  };

  const handleDeleteBeer = (id) => {
    setBeers((prevBeers) => prevBeers.filter((beer) => beer.id !== id));
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('home')} />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen
          beers={beers}
          onAddBeer={handleAddBeer}
          onClearBeers={handleClearBeers}
          onDeleteBeer={handleDeleteBeer}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onGoToDonation={() => setCurrentScreen('donation')}
        />
      )}

      {currentScreen === 'donation' && (
        <DonationScreen onBack={() => setCurrentScreen('home')} />
      )}
    </>
  );
}

export default App;
