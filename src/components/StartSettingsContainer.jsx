import React, { useState, useTransition } from 'react'

const StartSettingsContainer = (props) => {
    const { t, groups } = props;

    const handleStartSession = () => {


        setShowStartSettings(false);
    }

    return (
        <form>
            <label for="groupInput">{t('group')}: </label>
            <select id='groups'>
                <option>{t('all')}</option>
                {props.groups.map((group) => (
                    <option key={group.name} value={group.name}>
                        {group.name}
                    </option>
                ))}
            </select>
            <button onClick={handleStartSession}>{t('start')}</button>
        </form>
    );
}

export default StartSettingsContainer;