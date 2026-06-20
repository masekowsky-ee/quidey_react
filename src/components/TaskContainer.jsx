import React, { useState } from 'react'
import StartSettingsContainer from './StartSettingsContainer';
import styles from './TaskContainer.module.css';

export default function TaskContainer(props){
    const {tasks, setTasks, t, groups, setGroups, setWorkingGroup} = props;

    const [assignGroups, setAssignGroups] = useState(false);
    const [groupToDisplayName, setGroupToDisplayName] = useState('all');
    const [taskToAssign, setTaskToAssign] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);
    const [showStartSettings, setShowStartSettings] = useState(false);
    const [editGroupDescription, setEditGroupDescription] = useState(false);

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

    const handleRemoveGroup = (groupName) => {
        setGroups(prev => prev.filter(g => g.name !== groupName));
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
                    <div className={styles.groupBtnDivInner} key={group.name + 'Div'}>
                        <button className={styles.groupBtn} key={group.name + 'DisplayBtn'} onClick={() => handleDisplayGroups(group.name)}>
                            {group.name === 'all' ? t('all') : group.name}
                        </button>
                        {group.name !== 'all' && <svg onClick={()=>handleRemoveGroup(group.name)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM428.5-291.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5ZM280-720v520-520Z"/></svg>}
                    </div>
                ))}
            </div>
            <h2 className={styles.h2}>{t('taskContainer')}</h2>
            {groups.find(g => g.name === groupToDisplayName)?.description &&
            <div className={styles.groupDescriptionDiv}>
                {editGroupDescription ?
                    <input type="text" id="groupDescriptionInput" defaultValue={groups.find(g => g.name === groupToDisplayName).description} onBlur={(e) => {setGroupDescriptionHandler(e.target.value);}} />
                    :
                    <p onClick={() => {setEditGroupDescription(true); document.getElementById('groupDescriptionInput')?.focus();}}>
                        {groups.find(g => g.name === groupToDisplayName).description}
                    </p>
                }
            </div>
            }
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
            {showStartSettings && <StartSettingsContainer setShowStartSettings={setShowStartSettings} t={t} groups={groups} setWorkingGroup={setWorkingGroup} />}
        </div>
    );
}