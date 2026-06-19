import React, { useState } from 'react'
import styles from './TaskForm.module.css';

export default function TaskForm(props){
    const {t, setTasks, setGroups, taskIndexCounter, setTaskIndexCounter} = props;

    function handleSubmit(e){
        e.preventDefault();
        const name = e.target[0].value;
        const due = e.target[1].value;
        const description = e.target[2].value;
        const prioritise = e.target[3].checked;
        const index = taskIndexCounter;
        if(name && due){
            setTasks((prev) => [
                ...prev,
                { index: index, name: name, due: due, description: description, groups: ['all'], prioritise: prioritise }
            ]);

            setTaskIndexCounter((prev)=>prev++);

            setGroups((prev) => prev.map(p => {
                if (p.name === 'all') {
                    return { ...p, tasks: [...p.tasks, index] }
                }
                return p;
            }));

            console.log('submitted: '+ index + ' ' + name + ' ' + due + ' ' + description + ' ' + prioritise);
            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
        }
    }

    return (
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('createTaskH2')}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type="text" placeholder={t('taskName')} />
                <input className={styles.input} type="date" />
                <input className={styles.input} type="text" placeholder={t('description')} />
                <div>
                    <label htmlFor="prioritise">{t('prioritise')}</label>
                    <input type="checkbox" id="prioritise" />
                </div>
                <button type="submit" className={styles.createBtn}>{t('createBtn')}</button>
            </form>
        </div>
    )
}