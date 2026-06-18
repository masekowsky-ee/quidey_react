import React, { useState } from 'react'
import StartSettingsContainer from './StartSettingsContainer';

export default function TaskContainer(props){
    const {tasks, setTasks, t, groups, setGroups} = props;

    const [assignGroups, setAssignGroups] = useState(false);
    const [groupToDisplayName, setGroupToDisplayName] = useState('all');
    const [taskToAssign, setTaskToAssign] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);
    const [showStartSettings, setShowStartSettings] = useState(false);

    const groupToDisplay = groups.find(g => g.name === groupToDisplayName);
    const tasksToDisplay = groupToDisplay.tasks.map(name => tasks.find(t => t.name === name));

    const handleTaskDelete = (taskName) => {
        setGroups(prev => prev.map(g => ({
            ...g,
            tasks: g.tasks.filter(name => name !== taskName)
        })));
        setTasks(prev => prev.filter(t => t.name !== taskName));
    }

    const changePropHandler = (event, taskKey, taskProp) => {
        setTaskToEdit(tasks.find(t => t.name === taskKey));
        setTaskPropToEdit(taskProp);
    }

    const setTaskPropHandler = (input) => {
        const updatedTask = {...taskToEdit, [taskPropToEdit]: input}
        setTaskToEdit(updatedTask);
        setTasks(prevTasks => prevTasks.map(t => t.name === taskToEdit.name ? updatedTask : t));
        setTaskToEdit(null);
        setTaskPropToEdit(null);
    }

    const handleAssignGroup = (task) => {
        setAssignGroups(true);
        setTaskToAssign(task);
    }

    const handleDisplayGroups = (groupName) => {
        setGroupToDisplayName(groupName);
    }

    const handleAddToGroup = (groupName) => {
        setTasks(prev => prev.map(t => {
            if (t.name === taskToAssign.name) {
                return { ...t, groups: [...t.groups, groupName] }
            }
            return t;
        }));
        setGroups(prev => prev.map(g => {
            if (g.name === groupName) {
                return { ...g, tasks: [...g.tasks, taskToAssign.name] }
            }
            return g;
        }));
        setAssignGroups(false);
    }

    return (
        <div>
            {assignGroups && (
                <div style={{position:'absolute', zIndex:"1000", width: '100%', height: 'auto', backgroundColor:'black', display: 'flex', flexDirection: 'column'}}>
                    {groups.map(group => (
                        <button key={group.name} style={{margin: '10px'}} onClick={() => handleAddToGroup(group.name)}>
                            {group.name}
                        </button>
                    ))}
                </div>
            )}
            <h2>{t('taskContainer')}</h2>
            {groups.map(group => (
                <button key={group.name + 'DisplayBtn'} onClick={() => handleDisplayGroups(group.name)}>
                    {group.name}
                </button>
            ))}
            <ul>
            {tasksToDisplay.map((task, index) => (
                <li key={index}>
                    {taskToEdit?.name === task.name && taskPropToEdit === 'name'
                        ? <input autoFocus type="text" defaultValue={task.name} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                        : <p onClick={(e) => changePropHandler(e, task.name, 'name')}>{task.name}</p>
                    }
                    {taskToEdit?.name === task.name && taskPropToEdit === 'due'
                        ? <input autoFocus type="date" defaultValue={task.due ?? null} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                        : <p onClick={(e) => changePropHandler(e, task.name, 'due')}>{task.due}</p>
                    }
                    {task.description && (
                        taskToEdit?.name === task.name && taskPropToEdit === 'description'
                        ? <input autoFocus type="text" defaultValue={task.description} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                        : <p onClick={(e) => changePropHandler(e, task.name, 'description')}>{task.description}</p>
                    )}
                    <button onClick={() => handleAssignGroup(task)}>{t('assignGroup')}</button>
                    <button onClick={() => handleTaskDelete(task.name)}>{t('taskDeleteBtn')}</button>
                </li>
            ))}
            </ul>
            {!showStartSettings && <button onClick={() => setShowStartSettings(true)}>{t('start')}</button>}
            {showStartSettings && <StartSettingsContainer setShowStartSettings={setShowStartSettings} t={t} groups={groups} />}
        </div>
    );
}