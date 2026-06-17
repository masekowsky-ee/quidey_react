import React, { useState } from 'react'

export default function TaskContainer(props){
    console.log(props);
    const {tasks, setTasks, t} = props;

    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskPropToEdit, setTaskPropToEdit] = useState(null);

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

    return (
        <div>
            <h2>{t('taskContainer')}</h2>
            <ul>
            {tasks.map((task)=>(
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

                    <button onClick={() => handleTaskDelete(task)}>{t('taskDeleteBtn')}</button>
                </li>
            ))} 
            </ul>
        </div>
    );
}