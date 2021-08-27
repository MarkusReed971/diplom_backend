import React from "react"
import styles from '../css/AuthForm.module.css'
import Button from "./Button";
import {ReactComponent as Svg} from "../images/cancel.svg";
import {withContext} from "./Context";
import RegistrationForm from "./RegistrationForm";

class AuthForm extends React.Component {
    state = {
        regForm: false,
        username: 'login1',
        password: '1234',
    }

    validateUser = async () => {
        const {username, password} = this.state
        const {exitCallBack} = this.props
        await this.props.context.getUserByAuth(username, password)
        if (this.props.context.user) {
            this.props.context.setToner(false)
            exitCallBack()
        } else {
            alert('Такого пользователя не существует!')
        }

    }

    render() {
        return (
            <div>
                <div className={'form ' + styles.authForm}>
                    <Svg
                        onClick={() => {
                            this.props.context.setToner(false)
                            this.props.exitCallBack()
                        }}
                        fill={'#999'}
                        className={'svg'} />
                    <h1>Вход</h1>
                    <input
                        name={'username'}
                        type={'text'}
                        className={'input'}
                        placeholder={'Имя пользователя'}
                        value={this.state.username}
                        onChange={event => this.setState({username: event.target.value})}
                    />
                    <input
                        name={'password'}
                        type={'password'}
                        className={'input'}
                        placeholder={'Пароль'}
                        value={this.state.password}
                        onChange={event => this.setState({password: event.target.value})}
                    />
                    <div className={'center'}>
                        <Button
                            className={'button'}
                            title={'Войти'}
                            event={this.validateUser}
                        />
                    </div>
                    <div
                        onClick={() =>
                            this.setState({regForm: true})}
                        className={'link ' + styles.footer}
                    >Регистрация</div>
                </div>
                {this.state.regForm ?
                    <RegistrationForm exitCallBack={() =>
                        this.setState({regForm: false})}
                    />
                        : null}
            </div>

        )
    }
}

export default withContext(AuthForm)
