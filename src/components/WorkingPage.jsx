import React, { useState, useEffect, useRef } from "react";
import styles from './WorkingPage.module.css'
import { useNavigate } from "react-router-dom";
import TimerContainer from "./TimerContainer.jsx";

export default function WorkingPage(props){
    const { t, setTasks, tasks, groups, setGroups, setSessionParams, setCustomError, showDone, setShowDone, sessionParams } = props;

    const navigate = useNavigate();

    const [group, setGroup] = useState(null);   
    const [working, setWorking] = useState(true);



    // Current State:
    const [activeTask, setActiveTask] = useState(null);

    // New state for drag logic:
    const [draggedTask, setDraggedTask] = useState(null); // currently dragged task
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 }); // current pointer position
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // distance from clickpoint to element corner

    const dropZoneRef = useRef(null);

    const handlePointerDown = (e, task) => {
        // Get the bounding box of the dragged element (the svg handle itself)
        e.preventDefault();
        const liElement = e.currentTarget.closest("li");
        const rect = liElement.getBoundingClientRect();

        // Calculate offset between pointer position and the element's top-left corner
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setDraggedTask(task);
        setDragOffset({ x: offsetX, y: offsetY });
        setDragPosition({ x: e.clientX, y: e.clientY });
    }

    const handlePointerMove = (e) => {
        setDragPosition({ x: e.clientX, y: e.clientY });
    }

    const handlePointerUp = () => {
        // Check if the drop zone ref actually exists before measuring it
        if (dropZoneRef.current && draggedTask) {
            const dropRect = dropZoneRef.current.getBoundingClientRect();

            // Check if the current pointer position is within the drop zone's boundaries
            const isOverDropZone =
                dragPosition.x >= dropRect.left &&
                dragPosition.x <= dropRect.right &&
                dragPosition.y >= dropRect.top &&
                dragPosition.y <= dropRect.bottom;

            if (isOverDropZone) {
                setActiveTask(draggedTask);
            }
        }

        // Reset drag state regardless of outcome
        setDraggedTask(null);
    };

    useEffect(() => {
        // Only register listeners while something is actively being dragged
        if (!draggedTask) return;

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        // Cleanup: remove listeners when dragging stops or component unmounts
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [draggedTask, dragPosition]);

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

    const handleDragEnd = (event) => {
        const { operation, canceled } = event;
        const { source, target } = operation;
        
        console.log("DRAG END:", {
            canceled,
            sourceId: source?.id,
            targetId: target?.id, // das ist der entscheidende Wert
        });

        if (canceled) return;
        // Rest kommt jetzt
    }

    if (!group) return null;
    return(
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('currentGroup')}: {sessionParams.group === 'all' ? t('all') : sessionParams.group}</h2>
            <TimerContainer setSessionParams={setSessionParams} sessionParams={sessionParams} />
            <div ref={dropZoneRef} className={styles.currentTaskDiv}>
                {activeTask ? <div>
                    <h2>{activeTask.name}</h2>
                    <p>{activeTask.description}</p>
                    <p>{activeTask.due}</p>
                </div> : <p>{t('dragATask')}</p>}
            </div>
            <ul className={styles.ul}>
                {group.tasks.map((taskIndex) => {
                    const task = tasks.find((t) => t.index === taskIndex);
                    if (task.done || task.index === activeTask?.index) { return null; }

                    // Check if this specific task is the one currently being dragged
                    const isBeingDragged = draggedTask?.index === task.index;

                    // Calculate the floating position only if this task is being dragged
                    const dragStyle = isBeingDragged ? {
                        position: "fixed",
                        left: dragPosition.x - dragOffset.x,
                        top: dragPosition.y - dragOffset.y,
                        zIndex: 1000,
                        pointerEvents: "none", // prevents the floating element from blocking pointer events underneath
                    } : undefined;

                    return (
                        <li className={styles.li} key={`t${task.index}`} style={dragStyle}>
                            <div className={styles.pDiv}>
                                <p>{task.name}</p>
                                <p>{task.due}</p>
                            </div>
                            <svg onPointerDown={(e) => handlePointerDown(e, task)} className={styles.dragSvg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" style={{ touchAction: "none" }}><path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"/></svg>
                        </li>
                    );
                })}
            </ul>
            <button onClick={handleSessionDone} className={styles.sessionDoneBtn}>{t('sessionDone')}</button>
        </div>
    )
}