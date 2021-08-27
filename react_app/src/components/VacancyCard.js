import React, {useEffect, useState} from 'react'
import styles from '../css/VacancyCard.module.css'
import {withContext} from "./Context";
import {Link} from "react-router-dom";
import Date from "./Date";

const VacancyCard = ({vacancy, context}) => {
    const [center, setCenter] = useState(null)

    useEffect(() => {
        context.getCenterById(vacancy.centerId)
            .then(res => setCenter(res))
    })

    const role = type => type === 'admin' ? 'Администратора' : 'Мастера'

    return (
        <div className={styles.user}>
            <div className={styles.flex}>
                {center ? <img src={center.images[0]} alt="user_image"/> : null}

                <div className={styles.userInfo}>
                    {center ?
                        <Link
                            to={'/center/' + center._id}
                            className={styles.name}
                        >{center.name}</Link> : null
                    }
                    <p className={styles.age}>{`Вакансия на должность ${role(vacancy.role)}`}</p>
                    <div>
                        <span
                            style={{color: '#009CF0', cursor: "pointer"}}
                            onClick={async () => {
                                const user = context.user
                                user.type.push(vacancy.role)
                                user.centerId = vacancy.centerId
                                user.vacancy.splice(user.vacancy.indexOf(vacancy), 1)
                                const success = await context.putUser(user)
                                if (success) {
                                    await context.getUserByAuth(context.user.username, context.user.password)
                                } else
                                    alert('Что-то пошло не так! Попробуйте позже.')
                            }}
                        >Принять</span>
                        <span
                            style={{color: '#ff0000', cursor: "pointer"}}
                            onClick={async () => {
                                const user = context.user
                                user.vacancy.splice(user.vacancy.indexOf(vacancy), 1)
                                const success = await context.putUser(user)
                                if (success) {
                                    await context.getUserByAuth(context.user.username, context.user.password)
                                } else
                                    alert('Что-то пошло не так! Попробуйте позже.')
                            }}
                        >Отклонить</span>
                    </div>
                </div>
                <Date className={styles.date} date={vacancy.date} />
            </div>
        </div>
    )
}

export default withContext(VacancyCard)
