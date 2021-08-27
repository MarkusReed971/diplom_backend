import React, {useState} from 'react'
import styles from '../css/UserCard.module.css'
import UserModal from "./UserModal";
import {withContext} from "./Context";
import {Link} from "react-router-dom";

const UserCard = ({user, chatEnabled, isHeader, context}) => {
    const [isModal, setIsModal] = useState(false)

    const clickHandler = () => {
        setIsModal(true)
        context.setToner(true)
    }

    return (
        <div className={styles.user}>
            <div className={styles.flex}>
                <img src={user.image} alt="user_image"/>
                <div className={styles.userInfo}>
                    {isHeader ?
                        <Link
                            to={'/profile'}
                            className={styles.name}
                        >{user.fullname}</Link> :
                        <p onClick={clickHandler}
                           className={styles.name}>{user.fullname}</p>
                    }

                    {isHeader ?
                        <p onClick={() => context.signOut()} className={styles.out}>Выйти</p> :
                        <p className={styles.age}>{`Возраст: ${user.age}`}</p>
                    }

                </div>
            </div>
            {chatEnabled ?
                <div className={styles.link}>Написать</div> : null}
            {isModal ?
                <UserModal
                    exitCallBack={() =>
                        setIsModal(false)}
                    user={user}
                /> : null
            }
        </div>
    )
}

export default withContext(UserCard)
