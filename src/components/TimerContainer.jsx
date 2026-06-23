import React, {useState, useEffect, useRef} from 'react'
import styles from './TimerContainer.module.css'

export default function TimerContainer(props){
    const { sessionParams } = props;
    
    let mins;
    let hours;
    let secs;

    const [timer, setTimer] = useState({time: sessionParams.time, active: false});
    console.log(timer);

    const [timeToDisplay, setTimeToDisplay] = useState();
    const [percentWidth, setPercentWidth] = useState(0);

    const timeoutRef = useRef(null);

    useEffect(()=>{
        hours = Math.floor(timer.time / 3600000);
        mins = Math.floor((timer.time - hours * 3600000) / 60000);
        secs = Math.floor((timer.time - hours * 3600000 - mins * 60000) / 1000);
        setTimeToDisplay(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);

        if (timer.active && timer.time >= 1000) {
            timeoutRef.current = setTimeout(() => {
                setTimer((prev) => ({ ...prev, time: prev.time - 1000 }));
            }, 1000);
        }
        setPercentWidth((sessionParams.time - timer.time) / sessionParams.time * 100);

        //cleanup räumt effect auf BEVOR nochmal durchläuft
        return () => clearTimeout(timeoutRef.current);
    },[timer]);

    const timerAction = (action) => {
        if (action === 'start'){
            setTimer((prev)=>({ ...prev, active: true}));
        } else if (action === 'pause'){
            setTimer((prev)=>({ ...prev, active: false}));
        } else if (action === 'terminate'){
            clearTimeout(timeoutRef.current);
            setTimer({ time: 0, active: false });
        }
    }

    return(
        <div className={styles.div}>
            <h2 className={styles.timerH2}>{timeToDisplay}</h2>
            <div className={styles.outerTimer}>
                <div style={{width: `${percentWidth}%`}} className={styles.innerTimer}></div>
            </div>
            <div className={styles.timerNav}>
                {!timer.active && timer.time !== 0 &&
                    <button className={styles.btn} onClick={()=>timerAction('start')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z"/></svg>
                    </button>
                }
                {timer.active && sessionParams.breaks &&
                    <button className={styles.btn} onClick={()=>timerAction('pause')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M600-200q-33 0-56.5-23.5T520-280v-400q0-33 23.5-56.5T600-760h80q33 0 56.5 23.5T760-680v400q0 33-23.5 56.5T680-200h-80Zm-320 0q-33 0-56.5-23.5T200-280v-400q0-33 23.5-56.5T280-760h80q33 0 56.5 23.5T440-680v400q0 33-23.5 56.5T360-200h-80Zm320-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>
                    </button>
                }
                {timer.active && !sessionParams.breaks &&
                    <button className={styles.btn} onClick={()=>timerAction('terminate')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-320v-320q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v320q0 33-23.5 56.5T640-240H320q-33 0-56.5-23.5T240-320Zm80 0h320v-320H320v320Zm160-160Z"/></svg>
                    </button>
                }
            </div>
        </div>
    );
}