import React, { useEffect, useState } from 'react'

export default function Users(props) {
    const [users, setUsers] = useState([])

    async function fetchUsers() {
        try {
            const res = await fetch(`http://localhost:55555/users/${localStorage.email}`, {
                headers: {
                    authorization: localStorage.token
                }
            }).then(r => r.json())
            debugger
            setUsers(res)
        } catch (error) {
            debugger
        }
    }

    useEffect(() => { fetchUsers() }, [])

    if (!localStorage.token) {
        props.history.push('/login')
        return null
    }

    return <div>
        {JSON.stringify(users)}
    </div>
}