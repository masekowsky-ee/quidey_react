import React, { useState } from 'react'
import StartSettingsContainer from './StartSettingsContainer';
import styles from './TaskContainer.module.css';

export default function TaskContainer(props){
    const {tasks, setTasks, t, groups, setGroups} = props;

    const [assignGroups, setAssignGroups] = useState(false);
    const [groupToDisplayName, setGroupToDisplayName] = useState('all');
    const [taskToAssign, setTaskToAssign] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);
    const [showStartSettings, setShowStartSettings] = useState(false);

    const groupToDisplay = groups.find(g => g.name === groupToDisplayName);
    const tasksToDisplay = groupToDisplay.tasks.map(index => tasks.find(t => t.index === index));

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

    const handleDisplayGroups = (groupName) => {
        setGroupToDisplayName(groupName);
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
            <div className={styles.groupBtnDiv}>
                {groups.map(group => (
                    <button className={styles.groupBtn} key={group.name + 'DisplayBtn'} onClick={() => handleDisplayGroups(group.name)}>
                        {group.name}
                    </button>
                ))}
            </div>
            <h2 className={styles.h2}>{t('taskContainer')}</h2>
            <div className={styles.ulDiv}>
                <ul className={styles.ul}>
                {tasksToDisplay.map((task) => (
                    <li key={task.index}>
                        {taskToEdit?.index === task?.index && taskPropToEdit === 'name'
                            ? <input autoFocus type="text" defaultValue={task.name} onBlur={(e) => {setTaskPropHandler(e.target.value);}} />
                            : <p onClick={(e) => changePropHandler(e, task.index, 'name')}>{task['name']}</p>
                        }
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
                    </li>
                ))}
                </ul>
            </div>
            {!showStartSettings && <button className={styles.startBtn} onClick={() => setShowStartSettings(true)}>{t('start')}</button>}
            {showStartSettings && <StartSettingsContainer setShowStartSettings={setShowStartSettings} t={t} groups={groups} />}
        </div>
    );
}