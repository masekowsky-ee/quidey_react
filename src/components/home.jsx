import React, { useState } from 'react'
import TaskContainer from './TaskContainer'
import TaskForm from './TaskForm'
import styles from './Home.module.css';
import GroupForm from './GroupForm';
import { Outlet } from 'react-router-dom';

export default function Home(props){

    console.log(props.tasks);
    return (
        <div>
            <div className={styles.formsDiv}>
                <TaskForm setTasks={props.setTasks} t={props.t} setGroups={props.setGroups} taskIndexCounter={props.taskIndexCounter} setTaskIndexCounter={props.setTaskIndexCounter} />
                <GroupForm t={props.t} setGroups={props.setGroups} groups={props.groups} />
            </div>
            <TaskContainer tasks={props.tasks} setTasks={props.setTasks} t={props.t} groups={props.groups} setGroups={props.setGroups} setWorkingGroup={props.setWorkingGroup} />
            <Outlet />
        </div>
    );
}