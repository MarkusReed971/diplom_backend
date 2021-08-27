import React from "react"
import styles from '../css/CenterHeader.module.css'
import Rating from "./Rating";
import {Link} from "react-router-dom";

const CenterHeader = ({center}) => {

    return (
        <div className={styles.centerHeader}>
            <img src={center.images[0]} alt="center_img"/>
            <div className={styles.centerInfo}>
                <Link to={'/center/' + center._id} className={styles.name}>{center.name}</Link>
                <div>
                    <Rating rating={center.rating} />
                    <p>{center.address.district}</p>
                </div>
            </div>
        </div>
    )
}

export default CenterHeader
