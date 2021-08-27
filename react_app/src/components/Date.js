import React from 'react'

const Date = ({className, date}) => {
    const formatDate = date.slice(0, 10).split('-').reverse().join('.')

    return <p className={className}>{formatDate}</p>
}

export default Date
