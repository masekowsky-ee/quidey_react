import React, { useState } from 'react'
import styles from './GroupForm.module.css';

export default function GroupForm(props){
    const {t, setGroups} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        setGroups((prev) => [...prev, { name: name, tasks: [] }]);
        e.target[0].value = '';
    }

    return (
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('createGroupH2')}</h2>
            <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
                <input type="text" placeholder={t('groupName')} />
                <button type="submit" className={styles.createBtn}>{t('createBtn')}</button>
            </form>
        </div>
    )
}