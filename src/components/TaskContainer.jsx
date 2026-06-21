import React, { useState, useEffect } from 'react'
import StartSettingsContainer from './StartSettingsContainer';
import styles from './TaskContainer.module.css';


export default function TaskContainer(props){
    const {tasks, setTasks, t, groups, setGroups, setWorkingGroup, groupToDisplayName, setGroupToDisplayName, setWorkingTime} = props;

    const [assignGroups, setAssignGroups] = useState(false);
    const [taskToAssign, setTaskToAssign] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);
    const [showStartSettings, setShowStartSettings] = useState(false);
    const [editGroupDescription, setEditGroupDescription] = useState(false);

    let groupToDisplay = groups.find(g => g.name === groupToDisplayName) ?? groups.find(g => g.name === 'all');
    let tasksToDisplay = groupToDisplay?.tasks.map(index => tasks.find(t => t.index === index)) ?? [];

    useEffect(() => {
        if (!groups.some(g => g.name === groupToDisplayName)) {
            setGroupToDisplayName('all');
        }
    }, [groups, groupToDisplayName]);

    const handleTaskDelete = (taskIndex) => {
        setGroups(prev => prev.map(g => ({
            ...g,
            tasks: g.tasks.filter(index => index !== taskIndex)
        })));
        setTasks(prev => prev.filter(t => t.index !== taskIndex));
    }

    const changePropHandler = (event, taskKey, taskProp) => {
        setTaskToEdit(tasks.find(t => t.index === taskKey));
        setTaskPropToEdit(taskProp);
    }

    const setTaskPropHandler = (input) => {
        const updatedTask = {...taskToEdit, [taskPropToEdit]: input}
        setTaskToEdit(updatedTask);
        setTasks(prevTasks => prevTasks.map(t => t.index === taskToEdit.index ? updatedTask : t));
        setTaskToEdit(null);
        setTaskPropToEdit(null);
    }

    const handleAssignGroup = (task) => {
        setAssignGroups(true);
        setTaskToAssign(task);
    }

    const handleAddToGroup = (groupName) => {
        setTasks(prev => prev.map(t => {
            if (t.index === taskToAssign.index) {
                return { ...t, groups: [...t.groups, groupName] }
            }
            return t;
        }));
        setGroups(prev => prev.map(g => {
            if (g.name === groupName) {
                return { ...g, tasks: [...g.tasks, taskToAssign.index] }
            }
            return g;
        }));
        setAssignGroups(false);
    }

    const setGroupDescriptionHandler = (description) => {
        setGroups(prev => prev.map(g => {
            if (g.name === groupToDisplayName) {
                return { ...g, description: description }
            }
            return g;
        }));
        setEditGroupDescription(false);
    }

    const handleTaskDone = (taskIndex) => {
        const task = tasks.find(t => t.index === taskIndex);
        task.done = !task.done;
        setTasks((prev)=>prev.map(p => (p.index === task.index ? task : p)));
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
            <h2 className={styles.h2}>{t('taskContainer')}</h2>
            {groups.find(g => g.name === groupToDisplayName || g.name === 'all')?.description &&
            <div className={styles.groupDescriptionDiv}>
                {editGroupDescription ?
                    <input type="text" id="groupDescriptionInput" defaultValue={groups.find(g => g.name === groupToDisplayName).description} onBlur={(e) => {setGroupDescriptionHandler(e.target.value);}} />
                    :
                    <p onClick={() => {setEditGroupDescription(true); document.getElementById('groupDescriptionInput')?.focus();}}>
                        {groups.find(g => g.name === groupToDisplayName || g.name === 'all').description}
                    </p>
                }
            </div>
            }
            <div className={styles.outerUlDiv}>
                <div className={styles.ulDiv}>
                    <ul className={styles.ul}>
                    {tasksToDisplay.map((task) => {
                        if(!task.done){
                            return (<li key={task.index}>
                                <div className={styles.taskHeader}>
                                    {
                                    taskToEdit?.index === task?.index && taskPropToEdit === 'name'
                                        ? <input autoFocus type="text" defaultValue={task.name} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                        : <p onClick={(e) => changePropHandler(e, task.index, 'name')}>{task['name']}</p>
                                    }
                                    <input type="checkbox" onChange={()=>{handleTaskDone(task.index)}} />
                                </div>
                                {taskToEdit?.index === task.index && taskPropToEdit === 'due'
                                    ? <input autoFocus type="date" defaultValue={task.due ?? null} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                    : <p onClick={(e) => changePropHandler(e, task.index, 'due')}>{task.due}</p>
                                }
                                {task.description && (
                                    taskToEdit?.index === task.index && taskPropToEdit === 'description'
                                    ? <input autoFocus type="text" defaultValue={task.description} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                    : <p onClick={(e) => changePropHandler(e, task.index, 'description')}>{task.description}</p>
                                )}
                                <button onClick={() => handleAssignGroup(task)}>{t('assignGroup')}</button>
                                <button onClick={() => handleTaskDelete(task.index)}>{t('taskDeleteBtn')}</button>
                            </li>)
                        }
                    })}
                    </ul>
                </div>
                <div className={styles.ulDiv}>
                    <ul className={styles.ul}>
                    {tasksToDisplay.map((task) => {
                        if(task.done){
                            return (<li key={task.index}>
                                <div className={styles.taskHeader}>
                                    {
                                    taskToEdit?.index === task?.index && taskPropToEdit === 'name'
                                        ? <input autoFocus type="text" defaultValue={task.name} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                        : <p style={{textDecoration: 'line-through'}} onClick={(e) => changePropHandler(e, task.index, 'name')}>{task['name']}</p>
                                    }
                                    <input type="checkbox" checked onChange={()=>{handleTaskDone(task.index)}} />
                                </div>
                                {taskToEdit?.index === task.index && taskPropToEdit === 'due'
                                    ? <input autoFocus type="date" defaultValue={task.due ?? null} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                    : <p onClick={(e) => changePropHandler(e, task.index, 'due')}>{task.due}</p>
                                }
                                {task.description && (
                                    taskToEdit?.index === task.index && taskPropToEdit === 'description'
                                    ? <input autoFocus type="text" defaultValue={task.description} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                                    : <p onClick={(e) => changePropHandler(e, task.index, 'description')}>{task.description}</p>
                                )}
                                <button onClick={() => handleAssignGroup(task)}>{t('assignGroup')}</button>
                                <button onClick={() => handleTaskDelete(task.index)}>{t('taskDeleteBtn')}</button>
                            </li>)
                        }
                    })}
                    </ul>
                </div>
            </div>
            {!showStartSettings && <button className={styles.startBtn} onClick={() => setShowStartSettings(true)}>{t('start')}</button>}
            {showStartSettings && <StartSettingsContainer setWorkingTime={setWorkingTime} setShowStartSettings={setShowStartSettings} t={t} groups={groups} setWorkingGroup={setWorkingGroup} />}
        </div>
    );
}