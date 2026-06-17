import React, { useState, useTransition } from 'react'
import Home from './components/Home'
import Menu from './components/Menu'
import Profile from './components/Profile'
import {useTranslation} from './i18n/LanguageContext'
import mockData from './components/mockData'

function App(){
  const { t, language, setLanguage } = useTranslation();

  const [tasks, setTasks] = useState([
    {
      name: 'test-task',
      due: '2026-10-26',
      description: 'test-description',
    },{
      name: 'test-task1',
      due: '2026-10-26',
      description: '',
    },
  ]);
  console.log(tasks);
  return (
    <div>
      <div>
        <Menu t={t} />
        <h1>{[t('app'), ' ', t('langPar')]}</h1>
        <Profile />
      </div>
      <Home t={t} tasks={tasks} setTasks={setTasks} />
      <button onClick={()=>{setLanguage(language === 'de' ? 'en' : 'de')}}>
        {language === 'de' ? 'EN' : 'DE'}
      </button>
    </div>
  );
}

export default App
