import React from 'react'
import styles from "../css/MasterTab.module.css";
import Status from "./Status";
import UserCard from "./UserCard";
import Sort from "./Sort";

import Request from "./Request";
import Button from "./Button";
import {withContext} from "./Context";
import Date from "./Date";

class AdminTab extends React.Component {
    state = {
        sort: true,
        selectedRequest: null,
        selectedUser: null,
        selectedAdmin: null,
        requests: null
    }

    componentDidMount() {
        this.props.context.getRequestListByMasterId()
    }

    clickHandler = async (selectedRequest) => {
        const {context} = this.props
        this.setState({
            selectedRequest,
            selectedUser: await context.getUserById(selectedRequest.userId),
            selectedAdmin: await context.getUserById(selectedRequest.adminId)
        })
    }

    Requests = (requests) => requests.map(request =>
        request.status >= 4 ?
            <Request
                request={request}
                selectedId={this.state.selectedRequest ? this.state.selectedRequest._id : -1}
                callBack={this.clickHandler}
            /> :
            null
        )

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
                            {/*<div className={styles.margin}>*/}
                            {/*    <h2>Клиент</h2>*/}
                            {/*    <UserCard user={this.state.selectedUser} chatEnabled={true}/>*/}
                            {/*</div>*/}
                            {
                                this.state.selectedRequest.status >= 4 ?
                                    <div className={styles.margin}>
                                        <h2>Администратор</h2>
                                        <UserCard user={this.state.selectedAdmin} />
                                    </div> : null
                            }
                            <div className={styles.margin}>
                                <h2>Фото</h2>
                                <div className={styles.images}>
                                    {this.state.selectedRequest.images.map(img =>
                                        <img src={img} alt="request_img"/>)}
                                </div>
                            </div>
                            {this.state.selectedRequest.status === 4 ?
                                <div className={styles.right}>
                                    <Button
                                        title={'Завершить этап'}
                                        event={async () => {
                                            const {selectedRequest} = this.state
                                            selectedRequest.status = 5
                                            // alert(JSON.stringify(selectedRequest))
                                            const success =
                                                await this.props.context.putRequest(
                                                    selectedRequest._id,
                                                    selectedRequest
                                                )
                                            if (success) {
                                                await this.props.context.getRequestListByMasterId()
                                            } else {
                                                alert('Что-то пошло не так! Попробуйте позже.')
                                            }
                                        }}
                                    />
                                </div> :
                                <div className={styles.right}>
                                    Вы завершили свою работу над этой заявкой
                                </div>
                            }
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
                        {this.props.context.masterRequests ? this.Requests(this.props.context.masterRequests) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withContext(AdminTab)
