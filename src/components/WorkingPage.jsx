import React, { useState } from "react";
import styles from './WorkingPage.module.css'
import { useNavigate } from "react-router-dom";
import TimerContainer from "../TimerContainer";

export default function WorkingPage(props){
    const { t, tasks, setTasks, groups, setSessionParams, sessionParams } = props;

    const navigate = useNavigate();

    let group = groups.find(g => g.name === sessionParams.group);

    const handleTaskDone = (taskIndex) => {
        const task = tasks.find(t => t.index === taskIndex);
        task.done = !task.done;
        setTasks((prev)=>prev.map(p => (p.index === task.index ? task : p)));
    }

    const handleSessionDone = () => {
        navigate('/');
    }

    return(
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('currentGroup')}: {sessionParams.group}</h2>
            <div className={styles.taskRow}>
                <div className={styles.toDoDiv}>
                    <h3 className={styles.h3}>{t('toDo')}</h3>
                    {
                        group.tasks.map((t) => {
                            const displayTask = tasks.find(task => task.index === t)
                            if(!displayTask.done){
                                return (
                                    <div key={displayTask.index}>
                                        <div className={styles.taskHeadDiv} >
                                            <p>{displayTask.name}</p>
                                            <input type="checkbox" onChange={()=>handleTaskDone(displayTask.index)} />
                                        </div>
                                        <p>{displayTask.due}</p>
                                        {displayTask.description && <p>{displayTask.description}</p>}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.doneDiv}>
                    <h3 className={styles.h3}>{t('done')}</h3>
                    {
                        group.tasks.map((t) => {
                            const displayTask = tasks.find(task => task.index === t)
                            if(displayTask.done){
                                return (
                                    <div key={displayTask.index}>
                                        <p style={{textDecoration: 'line-through'}}>{displayTask.name}</p>
                                        <input type="checkbox" checked onChange={()=>handleTaskDone(displayTask.index)} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <button onClick={handleSessionDone} className={styles.sessionDoneBtn}>{t('sessionDone')}</button>
        </div>
    )
}