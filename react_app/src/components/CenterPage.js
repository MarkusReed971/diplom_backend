import React, {useEffect, useState} from "react"
import styles from '../css/CenterPage.module.css'
import CenterHeader from "./CenterHeader";
import {useParams} from 'react-router-dom'
import {withContext} from "./Context";
import CenterProfile from "./CenterProfile";
import {ReactComponent as Svg} from "../images/star.svg";
// import Sort from "./Sort";
import Review from "./Review";
import Button from "./Button";
import RequestForm from "./RequestForm";
import ReviewForm from "./ReviewForm";

const CenterPage = ({context}) => {
    const [center, setCenter] = useState()
    // const [sort, setSort] = useState()
    const [requestForm, setRequestForm] = useState(false)
    const [reviewForm, setReviewForm] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        context.getCenterById(id).then(res => setCenter(res))
    })

    const requestFormEnable = () => {
        context.setToner(true)
        setRequestForm(true)
    }

    const clickHandler = () => {
        let newFavorites = context.user.favorites
        if (newFavorites.indexOf(center._id) === -1) {
            newFavorites.push(center._id)
        } else {
            newFavorites = newFavorites.filter(el => el !== center._id)
        }
        context.setUser({favorites: newFavorites})
        context.updateUser()
    }

    const Favorite = (id) => {
        let styleFull, color, title
        if (context.user.favorites.indexOf(id) === -1) {
            styleFull = styles.favoriteBox
            color = "#009CF0"
            title = 'В избранное'
        } else {
            styleFull = styles.favoriteBox + " " + styles.active
            color = "#ffe600"
            title = "Убрать из избранного"
        }

        return (
            <div onClick={clickHandler} className={styleFull}>
                <Svg fill={color} className={styles.svg} />
                <span>{title}</span>
            </div>
        )
    }

    const Reviews = reviews => reviews.map(review => <Review review={review} />)

    return (
        <div className={styles.centerPage}>
            {center ? <div className={styles.flex}>
                        <CenterHeader center={center}/>
                        {context.user ?
                            <div className={`${styles.flex} ${styles.vertCenter}`}>
                                <Button event={requestFormEnable} title={'Оставить заявку'} />
                                {Favorite(center._id)}
                            </div> : null}
                      </div> :
                null
            }
            <div className={styles.content}>
                <div className={styles.details}>
                    {center ? <CenterProfile center={center}  withOwner={true}/> : null}
                </div>
                <div className={styles.reviews}>
                    <h1>Отзывы</h1>
                    {/*<Sort callBack={(sort) => setSort({sort})} label1={'по дате'} label2={'по рейтингу'} />*/}
                    <div className={styles.reviewList}>
                        {context.user ?
                            <Button
                                title={'Оставить отзыв'}
                                className={styles.button}
                                event={() => {
                                    context.setToner(true)
                                    setReviewForm(true)
                                }}
                            /> : null
                        }

                        {center && center.reviews.length > 0 ?
                            Reviews(center.reviews) :
                            <p>Нет отзывов</p>
                        }
                    </div>
                </div>
            </div>
            {requestForm ? <RequestForm centerId={center._id} exitCallBack={() => setRequestForm(false)} /> : null}
            {reviewForm ? <ReviewForm center={center} exitCallBack={() => setReviewForm(false)} /> : null }

        </div>
    )
}

export default withContext(CenterPage)
