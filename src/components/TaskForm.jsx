import React, { useState } from 'react'

export default function TaskForm(props){
    const {t, setTasks, setGroups} = props;

    function handleSubmit(e){
        e.preventDefault();
        const name = e.target[0].value;
        const due = e.target[1].value;
        const description = e.target[2].value;

        setTasks((prev) => [
            ...prev,
            { name, due, description, groups: ['all'] }
        ]);

        setGroups((prev) => prev.map(p => {
            if (p.name === 'all') {
                return { ...p, tasks: [...p.tasks, name] }
            }
            return p;
        }));

        console.log('submitted: ' + name + ' ' + due + ' ' + description);
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