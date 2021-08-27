import React from "react"
import styles from '../css/Filter.module.css'


const Filter = ({title, list, callback, selected}) => {
    list = list.map(el => <li key={el._id} className={selected === el ? styles.selected : null} onClick={() => callback(el)}>{el.title}</li>)

    return (
        <ul>
            <h2 className={styles.h2}>{title}</h2>
            {list}
        </ul>
    )
}

export default Filter
