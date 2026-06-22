import React, { useState, useEffect } from 'react'
import TaskContainer from './TaskContainer'
import TaskForm from './TaskForm'
import styles from './Home.module.css';
import GroupForm from './GroupForm';
import { Outlet } from 'react-router-dom';
import WeekDaysContainer from './WeekDaysContainer';
import GroupBtnContainer from './GroupBtnContainer';

export default function Home(props){
    const {t, tasks, groups, setGroups, setWorkingTime, setCustomError} = props;

    const [groupToDisplayName, setGroupToDisplayName] = useState('all');

    

    console.log(props.tasks);
    return (
        <div className={styles.div}>
            <WeekDaysContainer t={t} tasks={tasks} />
            <div className={styles.formsDiv}>
                <TaskForm setTasks={props.setTasks} t={props.t} setGroups={props.setGroups} taskIndexCounter={props.taskIndexCounter} setTaskIndexCounter={props.setTaskIndexCounter} />
                <GroupForm t={props.t} setGroups={props.setGroups} groups={props.groups} setCustomError={setCustomError} />
            </div>
            <GroupBtnContainer t={t} groups={groups} setGroups={setGroups} setGroupToDisplayName={setGroupToDisplayName} />
            <TaskContainer setWorkingTime={setWorkingTime} tasks={props.tasks} groupToDisplayName={groupToDisplayName} setGroupToDisplayName={setGroupToDisplayName} setTasks={props.setTasks} t={props.t} groups={props.groups} setGroups={props.setGroups} setWorkingGroup={props.setWorkingGroup} setCustomError={setCustomError} />
            <Outlet />
        </div>
    );
}