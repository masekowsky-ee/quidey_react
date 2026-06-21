import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './StartSettingsContainer.module.css'

const StartSettingsContainer = (props) => {
    const { t, groups, setShowStartSettings, setWorkingGroup, setWorkingTime } = props;

    const navigate = useNavigate();

    const handleStartSession = (e) => {
        e.preventDefault();
        const form = e.target;
        setWorkingGroup(form.elements.groups.value);
        const h = Number(form.elements.hours.value);
        const m = Number(form.elements.mins.value);
        setWorkingTime(h * 3600 + m * 60);
        setShowStartSettings(false);
        navigate('/working');
    }

    return (
        <form onSubmit={(e)=>{handleStartSession(e)}}>
            <label htmlFor="groupInput">{t('group')}: </label>
            <select name="groups" id='groups'>
                <option>{t('all')}</option>
                {groups.map((group) => (
                    <option key={group.name} value={group.name}>
                        {group.name}
                    </option>
                ))}
            </select>
            <div className={styles.timerDiv}>
                <select name="hours">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="0">00</option>
                </select>
                <p className={styles.p}> : </p>
                <select name="mins">
                    <option value="0">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
            </div>
            <button type="submit">{t('start')}</button>
        </form>
    );
}

export default StartSettingsContainer;