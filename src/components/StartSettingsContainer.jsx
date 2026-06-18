import React, { useState, useTransition } from 'react'

const StartSettingsContainer = (props) => {
    const { t, groups, setShowStartSettings } = props;

    const handleStartSession = (e) => {
        e.preventDefault();

        setShowStartSettings(false);
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