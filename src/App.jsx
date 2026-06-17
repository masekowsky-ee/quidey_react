import React, { useState, useTransition } from 'react'
import Home from './components/Home'
import Menu from './components/Menu'
import Profile from './components/Profile'
import {useTranslation} from './i18n/LanguageContext'
import mockData from './components/mockData'

function App(){
  const { t, language, setLanguage } = useTranslation();

  const [groups, setGroups] = useState(mockData.groups);

  const [tasks, setTasks] = useState(mockData.tasks);
  console.log(tasks);
  return (
    <div>
      <div>
        <Menu t={t} />
        <h1>{[t('app'), ' ', t('langPar')]}</h1>
        <Profile />
      </div>
      <Home t={t} tasks={tasks} setTasks={setTasks} groups={groups} setGroups={setGroups} />
      <button onClick={()=>{setLanguage(language === 'de' ? 'en' : 'de')}}>
        {language === 'de' ? 'EN' : 'DE'}
      </button>
    </div>
  );
}

export default App
