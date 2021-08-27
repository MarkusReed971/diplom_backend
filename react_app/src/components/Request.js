import React, {useEffect, useState} from "react"
import styles from "../css/Request.module.css";
import Status from "./Status";
import Date from "./Date";
import {withContext} from "./Context";

const Request = ({request ,callBack, selectedId, forClient, context}) => {
    const [center, setCenter] = useState(null)

    useEffect(() => {
        if (forClient) {
            context.getCenterById(request.centerId)
                .then(res => setCenter(res))
        }
    })

    return (
        <div onClick={() => callBack(request)} className={selectedId === request._id ? [styles.request, styles.selected].join(' ') : styles.request}>
            <div className={styles.left}>
                <img src={request.images[0]} alt="request_img"/>
                <div className={styles.requestInfo}>
                    {center ?
                        <p className={styles.name}>{center.name}</p> :
                        <p className={styles.name}>{request.fullname}</p>
                    }
                    <p className={styles.description}>{request.description.slice(0, 40) + "..."}</p>
                    <Status request={request} />
                    {/*<p style={{color: color}} className={styles.status}>{request.status}</p>*/}
                </div>
            </div>
            <Date date={request.date} className={styles.date}/>
        </div>
    )
}

export default withContext(Request)
