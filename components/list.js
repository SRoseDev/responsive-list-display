import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

function getColCount() {
    const screenWidth = window.innerWidth
    return (screenWidth < 400) ? 2 : (screenWidth < 510) ? 3 : (screenWidth < 620) ? 4 : (screenWidth < 842) ? 5 : (screenWidth < 960) ? 6 : (screenWidth < 1060) ? 7 : 8
}

export default function List({ list: { listId, items } }) {
    const [isOpen, setIsOpen] = useState(false)
    const [colCount, setColCount] = useState(getColCount())
    const itemRowCount = Math.ceil(items.length / colCount)
    const columns = [...Array(colCount).keys()].map((colIndex) => {
        return items.filter((item, itemIndex) => {
            const firstColItemIndex = colIndex * itemRowCount
            const lastColItemIndex = (colIndex + 1) * itemRowCount
            return itemIndex >= firstColItemIndex && itemIndex < lastColItemIndex
        })
    })
    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setColCount(getColCount())
        }, 500)

        window.addEventListener('resize', debouncedHandleResize)

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })
    return (
        <div className="w-full mt-2 mb-4 shadow-lg">
            <div key={listId} className="px-4 py-4 bg-gray-200 rounded-sm border border-gray-500 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex h-full justify-between items-center">
                    <div>
                        <svg className="inline h-6 w-6 -mt-2 mr-2 fill-current text-orange-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z" /></svg>

                        <h2 className="inline-block text-2xl font-medium text-blue-800">List {listId}</h2>
                    </div>
                    <svg className="w-6 h-6 fill-current text-gray-800 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div className={`flex flex-col items-center ${(isOpen) ? 'pt-3 pb-4 px-6' : ''}`}>
                <div className={`flex w-full justify-between space-x-6 ${(!isOpen) ? 'hidden' : ''}`}>
                    {columns.map((column, index) => (
                        <div key={index}>
                            <ul>
                                {column.map(({ id, name }) => (
                                    <li key={id} className="ml-5 list-disc">{name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
