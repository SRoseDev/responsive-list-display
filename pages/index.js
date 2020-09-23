import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

import Nav from '../components/nav'
import List from '../components/list'

export default function IndexPage() {
    const { error, data: unfilteredItems } = useSWR('/api/items')
    const listIds = (unfilteredItems) ? [...new Set(unfilteredItems.map(item => item.listId))].sort() : []
    const lists = listIds.map(groupedListId => {
        return {
            'listId': groupedListId,
            'items': unfilteredItems.filter(({ name, listId }) => name != null && name != '' && listId == groupedListId).sort((a, b) => a.id - b.id),
        }
    })

    return (
        <div className="w-full">
            <Nav />
            <div className="mx-5 md:mx-20 xl:w-256 xl:m-auto">
                <h1 className="pt-4 text-3xl text-gray-600">Dashboard</h1>
                {error &&
                    <div>Failed to load: </div>
                }
                {!error && lists &&
                    <div className="w-full flex flex-wrap">
                        {lists.map(list => (
                            <List key={list.listId} list={list} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
