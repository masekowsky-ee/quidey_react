import React from 'react';
import styles from './WeekDaysContainer.module.css';

export default function WeekDaysContainer(props){
    const { t, tasks } = props;

    const today = new Date();
    const ttt1 = new Date(+ new Date() + 24 * 60 * 60 * 1000);
    const tt1 = ttt1.getDay()
    const ttt2 = new Date(+ new Date() + 2 * 24 * 60 * 60 * 1000);
    const tt2 = ttt2.getDay()
    const ttt3 = new Date(+ new Date() + 3 * 24 * 60 * 60 * 1000);
    const tt3 = ttt3.getDay()
    const ttt4 = new Date(+ new Date() + 4 * 24 * 60 * 60 * 1000);
    const tt4 = ttt4.getDay()
    const ttt5 = new Date(+ new Date() + 5 * 24 * 60 * 60 * 1000);
    const tt5 = ttt5.getDay()
    const ttt6 = new Date(+ new Date() + 6 * 24 * 60 * 60 * 1000);
    const tt6 = ttt6.getDay()
    const ttt7 = new Date(+ new Date() + 7 * 24 * 60 * 60 * 1000);
    const tt7 = ttt7.getDay()
    const weekDayIndex = today.getDay();
    console.log(tt1, tt2, tt3, tt4, tt5, tt6, tt7);

    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const t1 = days[tt1];
    const t2 = days[tt2];
    const t3 = days[tt3];
    const t4 = days[tt4];
    const t5 = days[tt5];
    const t6 = days[tt6];
    const t7 = days[tt7];

    function toDateOnly(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function dayTaskLis(date){
        const daysTasks = tasks.filter((task)=>{
            const inputDate = toDateOnly(new Date(new Date(task.due).getTime() + 24 * 60 * 60 * 1000));
            const daysDate = toDateOnly(date);
            return inputDate.getTime() === daysDate.getTime();
        })

        if (daysTasks.length === 0){
            return <li>---</li>;
        }

        return daysTasks.map((task) => (
            <li key={task.index} className={`${task.done ? styles.done : styles.notDone}`}>{task.name}</li>
        ));
    }

    return ( 
        <div>
            <div className={styles.weekTable}>
                <div className={styles.weekDayDiv}>
                    <h2>{t('today')}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(today)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t1) + ' ' + ttt1.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt1)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t2) + ' ' + ttt2.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt2)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t3) + ' ' + ttt3.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt3)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t4) + ' ' + ttt4.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt4)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t5) + ' ' + ttt5.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt5)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t6) + ' ' + ttt6.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt6)
                        }
                    </ul>
                </div>
                <div className={styles.weekDayDiv}>
                    <h2>{t(t7) + ' ' + ttt7.getUTCDate() + '.' + ttt1.getUTCMonth()}</h2>
                    <ul className={styles.dayList}>
                        {
                            dayTaskLis(ttt7)
                        }
                    </ul>
                </div>
                <div className={styles.dateIconDiv}>
                    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                </div>
            </div>
        </div>
    );
}