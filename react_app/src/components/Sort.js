import React, {useState} from "react"
import styles from "../css/Sort.module.css";

const Sort = ({label1, label2, callBack}) => {
    const [sort, setSort] = useState(true);

    const classList = [styles.check, styles.withoutCheck].join(' ')
    const classListFull = [styles.check, styles.withoutCheck, styles.selected].join(' ')

    return (
        <div className={styles.sort}>
            <label className={sort ? classListFull : classList}>
                <input
                    name={'status'}
                    type={'radio'}
                    checked={sort}
                    onChange={() => {
                        setSort(true)
                        callBack(true)
                    }}
                />
                <p className={styles.title}>{label1}</p>
            </label>
            <label className={!sort ? classListFull : classList}>
                <input
                    name={'status'}
                    type={'radio'}
                    checked={!sort}
                    onChange={() => {
                        setSort(false)
                        callBack(false)
                    }}
                />
                <p className={styles.title}>{label2}</p>
            </label>
            <div>

            </div>
        </div>
    )
}

export default Sort
