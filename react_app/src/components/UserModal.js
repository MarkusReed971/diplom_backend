import styles from '../css/UserModal.module.css'
import {withContext} from "./Context";
import {ReactComponent as Svg} from "../images/cancel.svg";
import UserFullCard from "./UserFullCard";

const UserModal = ({user, exitCallBack, context}) => {

    const clickHandler = () => {
        context.setToner(false)
        exitCallBack()
    }

    return (
        <div className={styles.userModal}>
            <Svg
                onClick={clickHandler}
                fill={'#999'}
                className={styles.svg} />
            {user ? <UserFullCard user={user} /> : null}
        </div>
    )
}

export default withContext(UserModal)
