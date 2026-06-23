import React, { useState, useEffect } from "react";
import styles from './WorkingPage.module.css'
import { useNavigate } from "react-router-dom";
import TimerContainer from "./TimerContainer.jsx";

export default function WorkingPage(props){
    const { t, tasks, setTasks, groups, setSessionParams, sessionParams } = props;

    const navigate = useNavigate();

    const [group, setGroup] = useState(null);    

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
            <div className={styles.taskRow}>
                <div className={styles.toDoDiv}>
                    <h3 className={styles.h3}>{t('toDo')}</h3>
                    {
                        group.tasks.map((ta) => {
                            const displayTask = tasks.find(task => task.index === ta)
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
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
                <div className={styles.doneDiv}>
                    <h3 className={styles.h3}>{t('done')}</h3>
                    {
                        group.tasks.map((ta) => {
                            const displayTask = tasks.find(task => task.index === ta)
                            if(displayTask.done){
                                return (
                                    <div key={displayTask.index}>
                                        <p style={{textDecoration: 'line-through'}}>{displayTask.name}</p>
                                        <input type="checkbox" checked onChange={()=>handleTaskDone(displayTask.index)} />
                                    </div>
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
            <button onClick={handleSessionDone} className={styles.sessionDoneBtn}>{t('sessionDone')}</button>
        </div>
    )
}