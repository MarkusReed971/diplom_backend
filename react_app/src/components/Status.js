import React, {useEffect, useState} from 'react'
import styles from "../css/Status.module.css";

const Status = ({request}) => {
    const [color, setColor] = useState('')
    const [status, setStatus] = useState('')
    const red = '#FF0000'
    const green = '#00FF00'
    const yellow = '#FFE600'

    useEffect(() => {
        switch (request.status) {
            case 0:
                setStatus('Рассматривается')
                setColor(yellow)
                break
            case 1:
                setStatus('Принято')
                setColor(green)
                break
            case 2:
                setStatus('Отклонено')
                setColor(red)
                break
            case 3:
                const formatDate = request.meetingDate.slice(0, 10).split('-').reverse().join('.')
                setStatus('Назначена встреча на ' + formatDate)
                setColor(yellow)
                break
            case 4:
                setStatus('Идет ремонт')
                setColor(yellow)
                break
            case 5:
                setStatus('Можно забрать')
                setColor(green)
                break
            case 6:
                setStatus('Завершено')
                setColor(green)
                break
            default:
                setStatus('Неопределено')
                setColor(red)
        }
    },[request.status, request.meetingDate])

    return (
        <p style={{color: color}} className={styles.status}>{status}</p>
    )
}

export default Status
