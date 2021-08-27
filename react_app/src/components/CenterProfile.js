import React, {useEffect, useState} from 'react'
import styles from '../css/CenterProfile.module.css'
import UserCard from "./UserCard";
import Date from "./Date";
import {withContext} from "./Context";

const CenterProfile = ({center, withOwner, context}) => {
    const [owner, setOwner] = useState()

    useEffect(() => {
        if (withOwner) context.getUserById(center.ownerId).then(res => setOwner(res))
    })

    const Status = status => status ?
        <span style={{color: '#00ff00'}} className={styles.status}>Авторизован</span> :
        <span style={{color: '#FFE600'}} className={styles.status}>Не авторизован</span>

    const Address = address => <p>{`г. ${address.city}, ${address.district} р-н, ул. ${address.street}, д.${address.house}`}</p>

    const Images = images => images.map(img => <img className={styles.img} src={img} alt="center_img"/>)

    const Schedule = schedule => schedule.map(day => {
        let dayText
        switch (day.id) {
            case 0:
                dayText = 'Понедельник'
                break
            case 1:
                dayText = 'Вторник'
                break
            case 2:
                dayText = 'Среда'
                break
            case 3:
                dayText = 'Четверг'
                break
            case 4:
                dayText = 'Пятница'
                break
            case 5:
                dayText = 'Суббота'
                break
            case 6:
                dayText = 'Воскресенье'
                break
            default:
                dayText = '-'
        }
        return (
            <div className={styles.right + ' ' + styles.flex}>
                <h2 className={styles.day}>{dayText}</h2>
                {day.isHoliday ?
                    <p>Выходной</p>:
                    <p>{`с ${day.startTime} до ${day.endTime}`}</p>
                }
            </div>
        )
    })

    return (
        <div>
            <div className={styles.detailsHeader}>
                <div className={styles.status}>{Status(center.status)}</div>
                <Date className={styles.date} date={center.date}/>
            </div>
            <div className={styles.item}>
                <h2>Описание</h2>
                <p className={styles.right}>{center.description}</p>
            </div>
            <div className={styles.item + ' ' + styles.flex}>
                <h2>Телефон</h2>
                <p>{center.phone}</p>
            </div>
            <div className={styles.item + ' ' + styles.flex}>
                <h2>Адрес</h2>
                {Address(center.address)}
            </div>
            <div className={styles.item + ' ' + styles.flex}>
                <h2>В приложении</h2>
                <Date date={center.dateInApp}/>
            </div>
            <div className={styles.item + ' ' + styles.flex}>
                <h2>Инн</h2>
                <p>{center.inn}</p>
            </div>
            {withOwner ?
                <div className={styles.item}>
                    <h2>Владелец</h2>
                    {owner ? <UserCard user={owner} chatEnabled={false} /> : null }
                </div> :
                null
            }
            <div className={styles.item}>
                <h2>Врямя работы</h2>
                {Schedule(center.schedule)}
            </div>
            <div className={styles.item}>
                <h2>Фото</h2>
                <div className={styles.images}>
                    {Images(center.images)}
                </div>
            </div>
        </div>
    )
}

export default withContext(CenterProfile)
