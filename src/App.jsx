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
import WorkingPage from './components/WorkingPage';

function App(){
  const { t, language, setLanguage } = useTranslation();

  const [groups, setGroups] = useState(mockData.groups);

  let startCounter = mockData.taskIndexCouter;
  const [taskIndexCounter, setTaskIndexCounter] = useState(startCounter);

  const [tasks, setTasks] = useState(mockData.tasks);

  const [showMenu, setShowMenu] = useState(false);

  const [ signedIn, setSignedIn ] = useState(false);

  const [ user, setUser ] = useState(null);

  const [users, setUsers] = useState(mockData.users);

  const [workingGroup, setWorkingGroup] = useState('all');

  console.log(tasks);
  return (
    <div>
      <div>
        <Header t={t} showMenu={() => setShowMenu(true)} />
      </div>
      <Menu t={t} isOpen={showMenu} onClose={() => setShowMenu(false)} />
      <Routes>
        <Route path="/" element={<Home t={t} tasks={tasks} setTasks={setTasks} groups={groups} setGroups={setGroups} taskIndexCounter={taskIndexCounter} setTaskIndexCounter={setTaskIndexCounter} setWorkingGroup={setWorkingGroup} />} />
        <Route path="/working" element={<WorkingPage t={t} setTasks={setTasks} tasks={tasks} groups={groups} workingGroup={workingGroup} setWorkingGroup={setWorkingGroup} />} />
        <Route path="/profile" element={<Profile t={t} users={users} setUsers={setUsers} signedIn={signedIn} setSignedIn={setSignedIn} user={user} setUser={setUser} />} />
        <Route path="/settings" element={<Settings t={t} setLanguage={setLanguage} language={language} />} />
      </Routes>
    </div>
  );
}

export default App
