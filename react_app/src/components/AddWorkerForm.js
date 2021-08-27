import React from "react"
import styles from '../css/AddWorkerForm.module.css'
import Button from "./Button";
import {ReactComponent as Svg} from "../images/cancel.svg";
import {withContext} from "./Context";
import Select from "react-select";

class AddWorkerForm extends React.Component {
    state = {
        userId: '',
        vacancy: null,
    }


    validateUser = async () => {
        const {userId, vacancy} = this.state
        const {exitCallBack} = this.props
        let user = await this.props.context.getUserById(userId)
        vacancy.centerId = this.props.centerId
        vacancy.date = new Date()
        const vacancies = user.vacancy
        vacancies.push(vacancy)
        user.vacancy = vacancies

        const success = await this.props.context.putUser(user)

        if (success) {
            this.props.context.setToner(false)
            exitCallBack()
        } else {
            alert('Неверный id пользователя!')
        }

    }

    typeOptions = [
        {
            value: 'admin',
            label: 'Администратор',
        },
        {
            value: 'master',
            label: 'Мастер',
        }
    ]

    render() {
        return (
            <div>
                <div className={'form ' + styles.addWorkerForm}>
                    <Svg
                        onClick={() => {
                            this.props.context.setToner(false)
                            this.props.exitCallBack()
                        }}
                        fill={'#999'}
                        className={'svg'} />
                    <h1>Добавить сотрудника</h1>
                    <input
                        name={'userId'}
                        type={'text'}
                        className={'input'}
                        placeholder={'Введите id пользователя'}
                        value={this.state.userId}
                        onChange={event => this.setState({userId: event.target.value})}
                    />
                    <Select
                        options={this.typeOptions}
                        className={styles.select}
                        onChange={value => {
                            this.setState({vacancy: {role: value.value}})}}
                    />
                    {/*<p>{JSON.stringify(this.state)}</p>*/}
                    <div className={'center'}>
                        <Button
                            className={'button'}
                            title={'Отправить запрос'}
                            event={this.validateUser}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default withContext(AddWorkerForm)
