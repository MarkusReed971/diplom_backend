import React, {useEffect, useState} from 'react'
import styles from '../css/Review.module.css'
import UserCard from "./UserCard";
import {withContext} from "./Context";
import Rating from "./Rating";
import Date from "./Date";

const Review = ({review, context}) => {
    const [user, setUser] = useState()

    useEffect(() => {
        context.getUserById(review.userId).then(res => setUser(res))
    })

    return (
        <div className={styles.review}>
            <div className={styles.flex}>
                {user ? <UserCard user={user} /> : null}
                <div className={styles.right}>
                    <Rating rating={review.rating} />
                    <Date className={styles.date} date={review.date} />
                </div>
            </div>
            <p className={styles.text}>{review.text}</p>
        </div>
    )
}

export default withContext(Review)
