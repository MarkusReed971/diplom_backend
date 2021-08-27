import React from 'react'
import styles from '../css/Button.module.css'

const Button = ({title, event, color = '#009CF0', className = ''}) => {
    return (
        <div style={{backgroundColor: color}} onClick={event} className={[styles.button, className].join(' ')}>
            {title}
        </div>
    )
}

export default Button
