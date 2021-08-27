import React from 'react'
import styles from '../css/UserFullCard.module.css'

const UserFullCard = ({user, withId, withChange}) => {

    return (
        <div className={styles.fullCard}>
            <img src={user.image} alt="user_img"/>
            <p className={styles.name}>{user.fullname}</p>
            {withId ?
                <div className={styles.item}>
                    <h2>id</h2>
                    <p>{user._id}</p>
                </div> : null
            }
            <div className={styles.item}>
                <h2>Возраст</h2>
                <p>{user.age}</p>
            </div>
            <div className={styles.item}>
                <h2>Телефон</h2>
                <p>{user.phone}</p>
            </div>
            <div className={styles.item}>
                <h2>Телеграм</h2>
                <p>{user.telegram}</p>
            </div>
            <div className={styles.item}>
                <h2>Почта</h2>
                <p>{user.mail}</p>
            </div>
            {withChange ? <span className={styles.change}>Изменить</span> : null}
        </div>
    )
}

export default UserFullCard
