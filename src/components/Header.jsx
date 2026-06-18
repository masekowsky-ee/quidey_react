import React from 'react'
import styles from './Header.module.css';
import Profile from './Profile'
import Menu from './Menu'

export default function Header(props){
    const {t} = props;
    return (
        <div className={styles.header}>
            <Menu t={t} />
            <h1>{t('planner')}</h1>
            <Profile />
        </div>
    );
}