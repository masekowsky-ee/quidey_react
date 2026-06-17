import React, { useState, useTransition } from 'react'


export default function TaskForm(props){
    const {t, setTasks} = props;

    function handleSubmit(e){
        e.preventDefault();
        setTasks((prevTasks)=>[
            ...prevTasks,
            {
                name: e.target[0].value,
                due: e.target[1].value,
                description: e.target[2].value,
                groups: [],
            }
        ]);
        console.log('submitted: ' + e.target[0].value + ' ' + e.target[1].value + ' ' + e.target[2].value);
        e.target[0].value = '';
        e.target[1].value = '';
        e.target[2].value = '';
    }

    return (
        <div>
            <h2>{t('createTaskH2')}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={t('taskName')} />
                <input type="date" />
                <input type="text" placeholder={t('description')} />
                <button type="submit">{t('createTaskBtn')}</button>
            </form>
        </div>
    )
}