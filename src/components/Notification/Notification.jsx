// src/components/Notification/index.jsx

import React from 'react'

const Notification = props => {
    const { type, message } = props
    return (
        <div className={"notification is-size-7 " + type}>
            {message}
        </div>
    )
}

export default Notification