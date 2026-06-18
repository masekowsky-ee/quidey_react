import React, { useState, useTransition } from 'react'
import Profile from './components/Profile'
import {useTranslation} from './i18n/LanguageContext'
import mockData from './components/mockData'
import styles from './App.module.css';
import Header from './components/Header';
import Home from './components/Home'

function App(){
  const { t, language, setLanguage } = useTranslation();

  const [groups, setGroups] = useState(mockData.groups);

  const [taskIndexCounter, setTaskIndexCounter] = useState(mockData.taskIndexCouter);

  const [tasks, setTasks] = useState(mockData.tasks);
  console.log(tasks);
  return (
    <div>
      <div>
        <Header t={t} />
      </div>
      <Home t={t} tasks={tasks} setTasks={setTasks} groups={groups} setGroups={setGroups} taskIndexCounter={taskIndexCounter} setTaskIndexCounter={setTaskIndexCounter} />
      <button className={styles.langBtn} onClick={()=>{setLanguage(language === 'de' ? 'en' : 'de')}}>
        {language === 'de' ? 'EN' : 'DE'}
      </button>
    </div>
  );
}

export default App
