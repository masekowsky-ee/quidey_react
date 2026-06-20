import React, { useState, useTransition } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './StartSettingsContainer.module.css'

const StartSettingsContainer = (props) => {
    const { t, groups, setShowStartSettings, setWorkingGroup } = props;

    const navigate = useNavigate();

    const handleStartSession = (e) => {
        e.preventDefault();
        setWorkingGroup(e.target[0].value);
        setShowStartSettings(false);
        navigate('/working');
    }

    return (
        <form onSubmit={(e)=>{handleStartSession(e)}}>
            <label for="groupInput">{t('group')}: </label>
            <select id='groups'>
                <option>{t('all')}</option>
                {props.groups.map((group) => (
                    <option key={group.name} value={group.name}>
                        {group.name}
                    </option>
                ))}
            </select>
            <button type="submit">{t('start')}</button>
        </form>
    );
}

export default StartSettingsContainer;