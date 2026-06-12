import React, { useState } from 'react'
import Home from './components/home'
import Menu from './components/menu'
import Profile from './components/profile'

function App(){
  return (
    <div>
      <div>
        <Menu />
        <h1 data-i18n="app"></h1>
        <Profile />
      </div>
      <Home />
    </div>
  );
}

export default App
