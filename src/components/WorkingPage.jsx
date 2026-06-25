import React, { useState, useEffect } from "react";
import styles from './WorkingPage.module.css'
import { useNavigate } from "react-router-dom";
import TimerContainer from "./TimerContainer.jsx";
import TaskContainer from "./taskContainer.jsx";

export default function WorkingPage(props){
    const { t, setTasks, tasks, groups, setGroups, setSessionParams, setCustomError, showDone, setShowDone, sessionParams } = props;

    const navigate = useNavigate();

    const [group, setGroup] = useState(null);   
    const [working, setWorking] = useState(true);

    //drag and drop
    const [activeTask, setActiveTask] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("taskIndex", task.index);//only use index not whole object
    }

    const handleDragOver = (e) => {
        e.preventDefault(); // necessary for drop
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const taskIndex = e.dataTransfer.getData("taskIndex");
        const task = tasks.find((t)=>t.index === Number(taskIndex));
        if (task){
            setActiveTask(task);
        }
    }

    useEffect(()=>{
        if(!groups.some(g => g.name === sessionParams.group)){
            setSessionParams({group: 'all', time: 30*60*1000, breaks: true});
            return;
        }
        const found = groups.find(g => g.name === sessionParams.group)
        setGroup(found);
    }, [sessionParams, groups]);

    const handleTaskDone = (taskIndex) => {
        setTasks(prev => prev.map(p => 
            p.index === taskIndex ? { ...p, done: !p.done } : p
        ));
    }

    const handleSessionDone = () => {
        navigate('/');
    }

    if (!group) return null;
    return(
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('currentGroup')}: {sessionParams.group === 'all' ? t('all') : sessionParams.group}</h2>
            <TimerContainer setSessionParams={setSessionParams} sessionParams={sessionParams} />
            <div className={styles.currentTaskDiv} onDragOver={handleDragOver} onDragEnter={() => setIsDraggingOver(true)} onDragLeave={() => setIsDraggingOver(false)} onDrop={(e) => {setIsDraggingOver(false); handleDrop(e);}}style={{background: isDraggingOver ? "rgb(49,49,49)" : "transparent",}}>
                {activeTask ? <div>
                    <h2>{activeTask.name}</h2>
                    <p>{activeTask.description}</p>
                    <p>Deadline: {activeTask.due}</p>
                </div> : <p>{t('dragATask')}</p>}
            </div>
            <ul className={styles.ul}>
                {group.tasks.map((taskIndex)=>{
                    const task = tasks.find(t=> t.index===taskIndex);
                    if(task.done){return}
                    return(<li className={styles.li} key={`t${task.index}`} draggable onDragStart={(e) => handleDragStart(e, task)}>
                        <div className={styles.pDiv}>
                            <p>{task.name}</p>
                            <p>{task.due}</p>
                        </div>
                        <svg className={styles.dragSvg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"/></svg>
                    </li>)
                })}
            </ul>
            <button onClick={handleSessionDone} className={styles.sessionDoneBtn}>{t('sessionDone')}</button>
        </div>
    )
}