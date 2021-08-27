import React from "react"
import styles from '../css/ReviewForm.module.css'
import Button from "./Button";
import {ReactComponent as Svg} from "../images/cancel.svg";
import {withContext} from "./Context";
import Select from "react-select";

class ReviewForm extends React.Component {
    state = {
        review: {
            text: '',
            rating: 5,
        }
    }

    validateUser = async () => {
        const {review} = this.state
        const {exitCallBack, context, center} = this.props

        review.date = new Date()
        review.userId = context.user._id
        center.reviews.push(review)

        const success = await context.putCenter(center)

        if (success) {
            context.setToner(false)
            exitCallBack()
        } else {
            alert('Что-то пошло не так! Попробуйте позже.')
        }

    }

    typeOptions = [
        {
            value: 5,
            label: '5',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 1,
            label: '1',
        },
    ]

    render() {
        return (
            <div>
                <div className={'form ' + styles.reviewForm}>
                    <Svg
                        onClick={() => {
                            this.props.context.setToner(false)
                            this.props.exitCallBack()
                        }}
                        fill={'#999'}
                        className={'svg'} />
                    <h1>Оставить отзыв</h1>
                    <textarea
                        name={'text'}
                        className={'input ' + styles.descInput}
                        placeholder={'Напишите здесь свой комментарий...'}
                        value={this.state.review.text}
                        onChange={event =>
                            this.setState(prev =>
                                ({
                                    review: {
                                        ...prev.review,
                                        text: event.target.value
                                    }
                                })
                            )}
                    />
                    <Select
                        placeholder={'Оценка'}
                        options={this.typeOptions}
                        className={styles.select}
                        onChange={value =>
                            this.setState(prev =>
                                ({
                                    review: {
                                        ...prev.review,
                                        rating: value.value
                                    }
                                })
                            )}
                    />
                    <div className={'center'}>
                        <Button
                            className={'button'}
                            title={'Отправить'}
                            event={this.validateUser}
                        />
                    </div>

                </div>
            </div>

        )
    }
}

export default withContext(ReviewForm)
