import React from "react"
import styles from '../css/CenterCard.module.css'
import Rating from "./Rating";
import {Link} from "react-router-dom";

const CenterCard = ({center}) => {


    // alert(day)

    const Schedule = schedule => {
        let day = new Date().getDay() - 1
        if (day < 0) day = 6
        return schedule[day].isHoliday ?
            <p className={styles.time}>Выходной</p> :
            <p className={styles.time}>{schedule[day].startTime + " - " + schedule[day].endTime}</p>
    }

    return (
        <Link className={styles.link} to={'/center/' + center._id}>
            <div className={styles.card}>
                <img src={center.images[0]} alt={'center_img'} />
                <h3>{center.name}</h3>
                <Rating rating={center.rating} />
                <p>{center.address.district}</p>
                {Schedule(center.schedule)}
            </div>
        </Link>
    )
}

export default CenterCard
