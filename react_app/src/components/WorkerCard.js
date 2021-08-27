import React from "react"
import styles from '../css/WorkerCard.module.css'
import {Link} from "react-router-dom";
import {withContext} from "./Context";

const WorkerCard = ({worker, reload, context}) => {
    const role = (userType) => {
        if (userType.indexOf('master') !== -1 && userType.indexOf('admin') !== -1) {
            return 'Администратор / Мастер'
        } else if (userType.indexOf('admin') !== -1) {
            return 'Администратор'
        } else if (userType.indexOf('master') !== -1) {
            return 'Мастер'
        }
    }

    const removeWorker = async () => {
        let newWorker = worker
        const type = newWorker.type
        if (type.indexOf('admin') !== -1)
            type.splice(type.indexOf('admin'), 1)
        if (type.indexOf('master') !== -1)
            type.splice(type.indexOf('master'), 1)
        newWorker.type = type
        newWorker.centerId = null
        // alert(JSON.stringify(newWorker))
        const success = await context.putUser(newWorker)
        if (success) {
            reload()
        } else
            alert('Что-то пошло не так! Попробуйте позже.')
    }

    return (
        <div className={styles.user}>
            <div className={styles.flex}>
                <img src={worker.image} alt="user_image"/>
                <div className={styles.userInfo}>
                    <Link to={'/user/' + worker.id} className={styles.name}>{worker.fullname}</Link>
                    <p className={styles.role}>{role(worker.type)}</p>
                </div>
            </div>
            <div className={styles.flex}>
                <div
                    className={styles.link}
                    onClick={() => {}}
                >Изменить</div>
                <div
                    style={{color: '#ff0000'}}
                    className={styles.link}
                    onClick={removeWorker}
                >Уволить</div>
            </div>

        </div>
    )
}

export default withContext(WorkerCard)
