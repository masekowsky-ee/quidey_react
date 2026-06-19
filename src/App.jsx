import React, { useState, useTransition } from 'react'
import { Routes, Route } from 'react-router-dom'
import {useTranslation} from './i18n/LanguageContext'
import mockData from './components/mockData'
import styles from './App.module.css';
import Header from './components/Header';
import Home from './components/Home'
import Menu from './components/Menu'
import Profile from './components/Profile'
import Settings from './components/Settings'

function App(){
  const { t, language, setLanguage } = useTranslation();

  const [groups, setGroups] = useState(mockData.groups);

  const [taskIndexCounter, setTaskIndexCounter] = useState(mockData.taskIndexCouter);

  const [tasks, setTasks] = useState(mockData.tasks);

  const [showMenu, setShowMenu] = useState(false);

  console.log(tasks);
  return (
    <div>
      <div>
        <Header t={t} showMenu={() => setShowMenu(true)} />
      </div>
      <Menu t={t} isOpen={showMenu} onClose={() => setShowMenu(false)} />
      <Routes>
        <Route path="/" element={<Home t={t} tasks={tasks} setTasks={setTasks} groups={groups} setGroups={setGroups} taskIndexCounter={taskIndexCounter} setTaskIndexCounter={setTaskIndexCounter} />} />
        <Route path="/profile" element={<Profile t={t} />} />
        <Route path="/settings" element={<Settings t={t} />} />
      </Routes>

      <button className={styles.langBtn} onClick={()=>{setLanguage(language === 'de' ? 'en' : 'de')}}>
        {language === 'de' ? 'EN' : 'DE'}
      </button>
    </div>
  );
}

export default App
