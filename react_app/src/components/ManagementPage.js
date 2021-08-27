import React from "react"
import styles from '../css/ManagementPage.module.css'
import CenterHeader from "./CenterHeader"
import Button from "./Button"
import CenterProfile from "./CenterProfile"
import Sort from "./Sort"
import WorkerCard from "./WorkerCard"
import {ReactComponent as Svg} from "../images/add-user.svg"
import {withContext} from "./Context";
import AddWorkerForm from "./AddWorkerForm";

class ManagementPage extends React.Component {
    state = {
        workerForm: false,
        sort: true,
        center: null,
        workers: null,
    }

    componentDidMount() {
        const {context} = this.props
        context.getCenterByOwnerId(context.user._id)
            .then(res => this.setState({center: res}))
            .then(() => context.getAllUserByCenterId(this.state.center._id)
                .then(res => this.setState({workers: res})))
    }

    render() {
        const {center} = this.state

        return (
            <div>
                <div className={styles.header}>
                    {center ? <CenterHeader center={center} /> : null}
                    <div className={styles.flex}>
                        <Button
                            title={'Изменить'}
                            event={() => {}}
                            className={styles.button}
                        />
                        <Button
                            title={'Удалить'}
                            event={() => {}}
                            color={'#FF0000'}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.details}>
                        {center ? <CenterProfile center={center} withOwner={false} /> : null}
                    </div>
                    <div className={styles.workers}>
                        <Sort
                            label1={'по имени'}
                            label2={'по роли'}
                            callBack={(sort) => this.setState({sort})}
                        />
                        <div className={styles.workerList}>
                            {this.state.workers ?
                                this.state.workers.map(worker =>
                                    <WorkerCard reload={() => {
                                        this.props.context.getAllUserByCenterId(this.state.center._id)
                                            .then(res => this.setState({workers: res}))
                                    }} worker={worker} />) :
                                null
                            }
                        </div>
                        <div
                            onClick={() => {
                                this.props.context.setToner(true)
                                this.setState({workerForm: true})
                            }}
                            className={styles.add}
                        >
                            <Svg fill={'#009CF0'} className={styles.svg} />
                            <p>Добавить сотрудника</p>
                        </div>
                    </div>
                </div>
                {this.state.workerForm ?
                    <AddWorkerForm
                        exitCallBack={() =>
                            this.setState({workerForm: false})}
                        centerId={this.state.center._id}
                    />
                    : null}
            </div>
        )
    }
}

export default withContext(ManagementPage)
