import React from "react"
import { useState } from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleUsersChange = (event) => {
        event.preventDefault()
        const { target } = event
        const deletedElement = target.id
        const newUsers = users.filter((user) => {
            return user._id !== deletedElement 
        })
        setUsers(newUsers)
    }

    const addUserQualities = (user) => {
        const newQualities = user.qualities.map((qualities) => {
            let classiesQualities = "badge bg-" + qualities.color
            return <span className="m-2" key={qualities._id}><p className={classiesQualities}>{qualities.name}</p></span>
        })
        return newQualities
    }

    const addUserList = (user) => {
        return (
            <tr key={user._id}>
                <th scope="row">{user.name}</th>
                    <td><ul>{addUserQualities(user)}</ul></td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td><button id={user._id} type="button" className="btn btn-danger" onClick={handleUsersChange}>delate</button></td>
            </tr>
        )
    }

    const removePhrase = () => {
        let phrase = users.length !== 0 ? users.length + " человек тусанет с тобой сегодня" : "никто с тобой не тусанет"
        if (users.length === 2 || users.length === 3 || users.length === 4) {
            phrase = users.length + " человека тусанет с тобой сегодня"
        }
        return phrase
    }
    
    let classes = users.length !== 0 ? "badge bg-primary" : "badge bg-danger"

    return (
    <>
        <div className={classes}><h2>{removePhrase()}</h2></div>
        <table className="table">
            <thead>
                <tr>
                    <th className="col-sm-3" scope="col">Имя</th>
                    <th className="col-sm-3" scope="col">Качества</th>
                    <th className="col-sm-3" scope="col">Профессия</th>
                    <th className="col-sm-3" scope="col">Встретился, раз</th>
                    <th className="col-sm-3" scope="col">Оценка</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                        addUserList(user)
                    )
                )}
            </tbody>
        </table>
    </>)
}

export default Users