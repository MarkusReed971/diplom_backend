import React from "react"
import styles from '../css/RegistrationForm.module.css'
import Button from "./Button";
import {withContext} from "./Context";

class RegistrationForm extends React.Component {
    state = {
        confPassword: '',
        user: {
            name: '',
            lastname: '',
            age: '',
            phone: '',
            mail: '',
            address: {
                city: '',
                district: '',
                street: '',
                house: '',
            },
            telegram: '',
            image: '',
            username: '',
            password: '',
        }
    }

    validateUser = async (context) => {
        const {user, confPassword} = this.state
        const {exitCallBack} = this.props
        user.fullname = `${user.name} ${user.lastname}`

        if (user.password === confPassword) {
            const noExist = await context.postUser(user)
            if (noExist) {
                exitCallBack()
            } else {
                alert('Такой пользователь уже существует!')
            }
        } else {
            alert('Пароли не совпадают!')
        }


    }

    render() {
        return (
            <div className={'form ' + styles.regForm}>
                <h1>Регистрация</h1>
                <div className={styles.flexCenter}>
                    <div className={styles.column}>
                        <input
                            name={'name'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Имя'}
                            value={this.state.user.name}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            name: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'lastname'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Фамилия'}
                            value={this.state.user.lastname}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            lastname: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'age'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Возраст'}
                            value={this.state.user.age}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            age: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'mail'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Электронная почта'}
                            value={this.state.user.mail}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            mail: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'telegram'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Телеграм'}
                            value={this.state.user.telegram}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            telegram: event.target.value
                                        }
                                    }))
                            }
                        />
                    </div>
                    <div className={styles.column}>
                        <input
                            name={'phone'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Телефон'}
                            value={this.state.user.phone}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            phone: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'username'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Имя пользователя'}
                            value={this.state.user.username}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            username: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'password'}
                            type={'password'}
                            className={'input'}
                            placeholder={'Пароль'}
                            value={this.state.user.password}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            password: event.target.value
                                        }
                                    }))
                            }
                        />
                        <input
                            name={'confPassword'}
                            type={'password'}
                            className={'input'}
                            placeholder={'Повторите пароль'}
                            value={this.state.confPassword}
                            onChange={event =>
                                this.setState({confPassword: event.target.value})}
                        />
                        <input
                            name={'image'}
                            type={'text'}
                            className={'input'}
                            placeholder={'Изображение'}
                            value={this.state.user.image}
                            onChange={event =>
                                this.setState(prev =>
                                    ({
                                        user: {
                                            ...prev.user,
                                            image: event.target.value
                                        }
                                    }))
                            }
                        />
                    </div>
                </div>


                <div className={'justify ' + styles.footer}>
                    <span onClick={this.props.exitCallBack} className="link">Назад</span>
                    <Button
                        className={'button'}
                        title={'Продолжить'}
                        event={() => this.validateUser(this.props.context)}
                    />
                </div>
            </div>
        )
    }
}

export default withContext(RegistrationForm)
