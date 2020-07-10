import React from 'react'

export default function Spinner() {
    return (
        <div className={"d-flex justify-content-center mb-4"}>
            <div className="spinner-border" role="status">
                <span className="sr-only">加载中...</span>
            </div>
        </div>
    )
}