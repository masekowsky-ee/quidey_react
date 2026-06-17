import React, { useState } from 'react'
import TaskContainer from './TaskContainer'
import TaskForm from './TaskForm'

export default function Home(props){

    console.log(props.tasks);
    return (
        <div>
            <h2>{props.t('home')}</h2>
            <TaskForm setTasks={props.setTasks} t={props.t} />
            <TaskContainer tasks={props.tasks} setTasks={props.setTasks} t={props.t} groups={props.groups} setGroups={props.setGroups} />
        </div>
    );
}