import React from 'react'
import styles from "../css/AdminTab.module.css";
import Status from "./Status";
import UserCard from "./UserCard";
import Sort from "./Sort";
import Request from "./Request";
import Button from "./Button";
import {withContext} from "./Context";
import Date from "./Date";
import Select from "react-select";

class AdminTab extends React.Component {
    state = {
        meetingDate: null,
        sort: true,
        selectedRequest: null,
        selectedUser: null,
        selectedMaster: null,
        requests: null,
        workers: []
    }

    componentDidMount() {
        this.props.context.getAllUserByCenterId(
            this.props.context.workingCenter._id)
            .then(res => this.setState({workers: res}))
        this.props.context.getRequestListByCenterId()

    }

    clickHandler = async (selectedRequest) => {
        const {context} = this.props
        const selectedMaster = selectedRequest.masterId ?
            await context.getUserById(selectedRequest.masterId) :
            null

        this.setState({
            selectedRequest,
            selectedUser: await context.getUserById(selectedRequest.userId),
            selectedMaster,
        })
    }

    Requests = (requests) => requests.map(request =>
        <Request
            request={request}
            selectedId={this.state.selectedRequest ? this.state.selectedRequest._id : -1}
            callBack={this.clickHandler}
        />)

    options = list => list.map(el => {
        return {
            value: el._id,
            label: el.fullname,
        }
    })


    generateButtons = () => {
        switch(this.state.selectedRequest.status) {
            case 0:
                return (
                    <div className={styles.right}>
                        <Button
                            className={styles.button}
                            title={'Принять'}
                            event={async () => {
                                const {selectedRequest} = this.state
                                selectedRequest.status = 1
                                const success =
                                    await this.props.context.putRequest(
                                        selectedRequest._id,
                                        selectedRequest
                                    )
                                if (success) {
                                    await this.props.context.getRequestListByCenterId()
                                } else {
                                    alert('Что-то пошло не так! Попробуйте позже.')
                                }
                            }}
                        />
                        <Button
                            className={styles.button}
                            title={'Отклонить'}
                            event={async () => {
                                const {selectedRequest} = this.state
                                selectedRequest.status = 2
                                const success =
                                    await this.props.context.putRequest(
                                        selectedRequest._id,
                                        selectedRequest
                                    )
                                if (success) {
                                    await this.props.context.getRequestListByCenterId()
                                } else {
                                    alert('Что-то пошло не так! Попробуйте позже.')
                                }
                            }}
                            color={'#FF0000'}
                        />
                    </div>
                )
            case 1:
                return (
                    <div className={styles.right}>
                        <input
                            type="date"
                            name={'meetingDate'}
                            placeholder={'Введите дату'}
                            className={styles.input}
                            value={this.state.selectedRequest.meetingDate}
                            onChange={(event) =>
                                this.setState(prev => ({
                                    selectedRequest: {
                                        ...prev.selectedRequest,
                                        meetingDate: event.target.value
                                    }
                                }))}
                        />
                        <Button
                            className={styles.button}
                            title={'Назначить встречу'}
                            event={async () => {
                                const {selectedRequest} = this.state
                                selectedRequest.status = 3
                                // alert(JSON.stringify(selectedRequest))
                                const success =
                                    await this.props.context.putRequest(
                                        selectedRequest._id,
                                        selectedRequest
                                    )
                                if (success) {
                                    await this.props.context.getRequestListByCenterId()
                                } else {
                                    alert('Что-то пошло не так! Попробуйте позже.')
                                }
                            }}
                        />
                    </div>
                )
            case 2:
                return (
                    <div className={styles.right}>
                        Вы завершили свою работу над этой заявкой
                    </div>
                )
            case 3:
                return (
                    <div className={styles.right}>
                        <Select
                            options={ this.options(this.state.workers) }
                            className={styles.select}
                            onChange={value => {
                                this.setState(prev => ({
                                    selectedRequest: {
                                        ...prev.selectedRequest,
                                        masterId: value.value
                                    }
                                }))
                                // alert(JSON.stringify(this.state.selectedRequest))
                            }}
                        />
                        <Button
                            className={styles.button}
                            title={'Выбрать мастера'}
                            event={async () => {
                                const {selectedRequest} = this.state
                                selectedRequest.status = 4
                                // alert(JSON.stringify(selectedRequest))
                                const success =
                                    await this.props.context.putRequest(
                                        selectedRequest._id,
                                        selectedRequest
                                    )
                                if (success) {
                                    await this.props.context.getRequestListByCenterId()
                                    const selectedMaster = await this.props.context.getUserById(selectedRequest.masterId)
                                    this.setState({selectedMaster})
                                } else {
                                    alert('Что-то пошло не так! Попробуйте позже.')
                                }
                            }}
                        />
                    </div>
                )
            case 4:
                return (
                    <div className={styles.right}>
                        Ожидайте, пока мастер завершит работу...
                    </div>
                )
            case 5:
                return (
                    <div className={styles.right}>
                        <Button
                            className={styles.button}
                            title={'Закрыть заявку'}
                            event={async () => {
                                const {selectedRequest} = this.state
                                selectedRequest.status = 6
                                const success =
                                    await this.props.context.putRequest(
                                        selectedRequest._id,
                                        selectedRequest
                                    )
                                if (success) {
                                    await this.props.context.getRequestListByCenterId()
                                } else {
                                    alert('Что-то пошло не так! Попробуйте позже.')
                                }
                            }}
                        />
                    </div>
                )
            case 6:
                return (
                    <div className={styles.right}>
                        Вы завершили свою работу над этой заявкой
                    </div>
                )
            default:
                return (
                    <div className={styles.right}>
                        -
                    </div>
                )
        }
    }

    render() {
        return (
            <div className={styles.content}>
                <div className={styles.details}>
                    {this.state.selectedRequest ?
                        <div className={styles.requestDetails}>
                            <div className={styles.detailsHeader}>
                                <Status request={this.state.selectedRequest} />
                                {/*<p className={styles.date}>{this.state.selectedRequest.date}</p>*/}
                                <Date date={this.state.selectedRequest.date} className={styles.date}/>
                            </div>
                            <div className={styles.margin}>
                                <h2>Описание</h2>
                                {/*<h2>{JSON.stringify(this.props.context)}</h2>*/}
                                <p className={styles.detailsContent}>{this.state.selectedRequest.description}</p>
                            </div>
                            <div className={`${styles.flex} ${styles.margin}`}>
                                <h2>Устройство</h2>
                                <p>{this.state.selectedRequest.device}</p>
                            </div>
                            <div className={`${styles.flex} ${styles.margin}`}>
                                <h2>Способ обратной связи</h2>
                                <p>{this.state.selectedRequest.feedbackType}</p>
                            </div>
                            <div className={styles.margin}>
                                <h2>Клиент</h2>
                                <UserCard user={this.state.selectedUser} chatEnabled={true}/>
                            </div>
                            {
                                this.state.selectedMaster ?
                                    <div className={styles.margin}>
                                        <h2>Мастер</h2>
                                        <UserCard user={this.state.selectedMaster} />
                                    </div> : null
                            }
                            <div className={styles.margin}>
                                <h2>Фото</h2>
                                <div className={styles.images}>
                                    {this.state.selectedRequest.images.map(img =>
                                        <img src={img} alt="request_img"/>)}
                                </div>
                            </div>
                            {this.generateButtons()}
                        </div> :
                        <div className={styles.plug}>
                            Выберите заявку для просмотра подробной информации
                        </div>
                    }

                </div>
                <div className={styles.requests}>
                    <Sort
                        label1={'по дате'}
                        label2={'по статусу'}
                        callBack={(sort) => this.setState({sort})}
                    />
                    <div className={styles.requestList}>
                        {this.props.context.centerRequests ? this.Requests(this.props.context.centerRequests) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withContext(AdminTab)
