import React, { useState } from 'react'
import StartSettingsContainer from './StartSettingsContainer';

export default function TaskContainer(props){
    console.log(props);
    const {tasks, setTasks, t, groups, setGroups} = props;

    const [assignGroups, setAssignGroups] = useState(false);
    const [groupToDisplay, setGroupToDisplay] = useState(tasks);
    const [taskToAssign, setTaskToAssign] = useState(null);

    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);

    const [showStartSettings, setShowStartSettings] = useState(false);

    const handleTaskDelete = (task) => {
        setTasks((prevTasks)=>{
            return prevTasks.filter((t)=>
                t['name'] !== task['name']
            );
        });
    }

    const changePropHandler = (event, taskKey, taskProp) => {
        setTaskToEdit(tasks.find(t => t.name === taskKey));
        setTaskPropToEdit(taskProp);
    }

    const setTaskPropHandler = (input) => {
        const updatedTask = {...taskToEdit, [taskPropToEdit]: input}
        setTaskToEdit(updatedTask);
        setTasks((prevTasks)=>
            prevTasks.map(t => t.name === taskToEdit.name ? updatedTask : t)
        );
        console.log(taskToEdit);
        setTaskToEdit(null);
        setTaskPropToEdit(null);
    }

    const handleAssignGroup = (task) => {
        setAssignGroups(true);
        setTaskToAssign(task);
    }

    const handleDisplayGroups = (group) => {
        if(group === 'all'){
            setGroupToDisplay(tasks);
        } else {
            const groupToBeAssigned = groups.find(g=>g.name===group);
            setGroupToDisplay(groupToBeAssigned.tasks);
        }
    }

    const handleAddToGroup = (groupName) => {
        let updatedGroup = groups.find(g=>g.name === groupName);
        updatedGroup.tasks.push(taskToAssign);
        setGroups((prevGroups)=> prevGroups.map(pg => pg.name === groupName ? updatedGroup : pg));
        setAssignGroups(false);
    }

    return (
        <div>
            {assignGroups &&<div style={{position:'absolute', zIndex:"1000", width: '100%', height: 'auto', backgroundColor:'black', display: 'flex', flexDirection: 'column'}}>
                {groups.map((group)=>(<button key={group.name} style={{margin: '10px'}} onClick={()=>{handleAddToGroup(group.name)}}>{group.name}</button>))}
            </div>}
            <h2>{t('taskContainer')}</h2>
            <button onClick={()=>{handleDisplayGroups('all')}}>{t('all')}</button>
            {groups.map((group)=>(<button key={group.name + 'DisplayBtn'} onClick={()=>{handleDisplayGroups(group.name)}}>{group.name}</button>))}
            <ul>
            {groupToDisplay.map((task)=>(
                <li key={task['name']}>
                    {
                        taskToEdit?.name === task.name && taskPropToEdit === 'name' 
                        ? <input autoFocus type="text" defaultValue={task.name} onBlur={(e) => {setTaskPropHandler(e.target.value);setTaskToEdit(null); setTaskPropToEdit(null);}} />
                        : <p onClick={(e) => changePropHandler(e, task['name'], 'name')}> 
                            {task['name']}
                        </p>
                    }

                    {
                        taskToEdit?.name === task.name && taskPropToEdit === 'due' 
                        ? <input autoFocus type="date" defaultValue={task.due ?? null} onBlur={(e) => {setTaskPropHandler(e.target.value);setTaskToEdit(null); setTaskPropToEdit(null);}} />
                        : <p onClick={(e) => changePropHandler(e, task['name'], 'due')}> 
                            {task['due']}
                        </p>
                    }

                    {task['description'] && 
                        taskToEdit?.name === task.name && taskPropToEdit === 'description' 
                        ? <input autoFocus type="text" defaultValue={task.description} onBlur={(e) => {setTaskPropHandler(e.target.value);setTaskToEdit(null); setTaskPropToEdit(null);}} />
                        : <p onClick={(e) => changePropHandler(e, task['name'], 'description')}> 
                            {task['description']}
                        </p>
                    }
                    <button onClick={()=>{handleAssignGroup(task)}}>{t('assignGroup')}</button>
                    <button onClick={() => handleTaskDelete(task)}>{t('taskDeleteBtn')}</button>
                </li>
            ))} 
            </ul>
            <button onClick={()=>{setShowStartSettings(true)}}>{t('start')}</button>
            {showStartSettings && <startSettingsContainer />}
        </div>
    );
}