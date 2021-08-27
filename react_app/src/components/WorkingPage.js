import React from "react"
import CenterHeader from "./CenterHeader";
import styles from "../css/WorkingPage.module.css";
import AdminTab from "./AdminTab";
import MasterTab from "./MasterTab";
import {withContext} from "./Context";

class WorkingPage extends React.Component {
    state = {
        isAdmin: true,
    }

    componentDidMount() {
        const {context} = this.props
        context.getWorkingCenterById(context.user.centerId)
    }

    classList = [styles.check, styles.withoutCheck].join(' ')
    classListFull = [styles.check, styles.withoutCheck, styles.selected].join(' ')

    getTab = () => {
        if (this.props.context.workingCenter) {
            return this.state.isAdmin ? <AdminTab /> : <MasterTab />
        }

        return null
    }

    render() {
        let {context} = this.props
        let center = context.workingCenter
        return (
            <div>
                {/*<button onClick={() => this.props.context.getRequestListByCenterId()}>press</button>*/}
                <div className={styles.header}>
                    {center ? <CenterHeader center={center} /> : null}
                    <div className={styles.swapRole}>
                        <label className={this.state.isAdmin ? this.classListFull : this.classList}>
                            <input
                                name={'status'}
                                type={'radio'}
                                checked={this.state.isAdmin}
                                onChange={() => this.setState({isAdmin: true})}
                            />
                            <p>Администратор</p>
                        </label>
                        <label className={!this.state.isAdmin ? this.classListFull : this.classList}>
                            <input
                                name={'status'}
                                type={'radio'}
                                checked={!this.state.isAdmin}
                                onChange={() => this.setState({isAdmin: false})}
                            />
                            <p>Мастер</p>
                        </label>
                    </div>
                </div>
                {this.getTab()}

            </div>
        )
    }

}

export default withContext(WorkingPage)
