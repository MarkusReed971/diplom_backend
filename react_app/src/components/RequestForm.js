import React from "react"
import styles from '../css/RequestForm.module.css'
import Button from "./Button";
import {ReactComponent as Svg} from "../images/cancel.svg";
import {withContext} from "./Context";

class RequestForm extends React.Component {
    state = {
        image: '',
        request: {
            description: '',
            feedbackType: '',
            device: '',
            images: [],
            status: 0,
            date: new Date(),
        }
    }

    validateRequest = async () => {
        const {request} = this.state
        const {exitCallBack, centerId, context} = this.props

        request.userId = context.user._id
        request.fullname = context.user.fullname
        request.centerId = centerId

        const success = await context.postRequest(request)
        if (success) {
            context.setToner(false)
            exitCallBack()
        } else {
            alert('Введены некоректные данные!')
        }

    }

    render() {
        return (
            <div>
                <div className={'form ' + styles.reqForm}>
                    <Svg
                        onClick={() => {
                            this.props.context.setToner(false)
                            this.props.exitCallBack()
                        }}
                        fill={'#999'}
                        className={'svg'}
                    />
                    <h1>Создание заявки</h1>
                    <input
                        name={'device'}
                        type={'text'}
                        className={'input'}
                        placeholder={'Устройство'}
                        value={this.state.request.device}
                        onChange={event =>
                            this.setState(prev =>
                                ({
                                    request: {
                                        ...prev.request,
                                        device: event.target.value
                                    }
                                })
                            )}
                    />
                    <input
                        name={'feedbackType'}
                        type={'text'}
                        className={'input'}
                        placeholder={'Как с вами связаться?'}
                        value={this.state.request.feedbackType}
                        onChange={event =>
                            this.setState(prev =>
                                ({
                                    request: {
                                        ...prev.request,
                                        feedbackType: event.target.value
                                    }
                                })
                            )}
                    />
                    <textarea
                        name={'description'}
                        className={'input ' + styles.descInput}
                        placeholder={'Опишите проблему...'}
                        value={this.state.request.description}
                        onChange={event =>
                            this.setState(prev =>
                                ({
                                    request: {
                                        ...prev.request,
                                        description: event.target.value
                                    }
                                })
                            )}
                    />
                    <input
                        name={'image'}
                        type={'text'}
                        className={'input'}
                        placeholder={'Изображение'}
                        value={this.state.image}
                        onChange={event =>
                            this.setState({image: event.target.value})}
                    />
                    <div style={{marginTop: -20, height: 40}}>
                        {this.state.request.images.map((img, i) =>
                            <div onClick={() => {
                                const images = this.state.request.images
                                images.splice(i,1)
                                this.setState(prev => ({
                                    request: {
                                        ...prev.request,
                                        images,
                                    }
                                }))
                            }} className={styles.square}>x</div>)}
                    </div>
                    {this.state.request.images.length < 4 ?
                        <Button
                            title={'Добавить изображение'}
                            event={() => {
                                const imageList = this.state.request.images
                                imageList.push(this.state.image)
                                this.setState(prev => ({
                                    request: {
                                        ...prev.request,
                                        images: imageList
                                    }
                                }))
                            }}
                            className={styles.button}
                        /> :
                        <Button
                            title={'Добавить изображение'}
                            event={() => {}}
                            color={'#999'}
                            className={styles.button}
                        />
                    }
                    <div className={'center'}>
                        <Button
                            className={'button'}
                            title={'Отправить'}
                            event={this.validateRequest}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default withContext(RequestForm)
