import React, { useState } from 'react'
import './Menu.css'

export default function Menu({baseUrl, setShowForm}) {
    const [loading, setLoading] = useState(false)
    const [populateMessage, setPopulateMessage] = useState('')

    const populateButton = () => {
        if(loading) {
            if(populateMessage === '') {
                return <li><div className="loader"></div><p>Initializing</p></li>
            } else {
                return <li><p>{populateMessage}</p></li>
            }
        } else {
            return <li><button onClick={sendPopulateRequest}>Populate DB</button></li>
        }
    }

    const sendPopulateRequest = async () => {
        setLoading(true)
        let response = await fetch(`${baseUrl}/save-from-json`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let data = await response.json();
        setTimeout(() => {
            setPopulateMessage(`${data.count} recipe(s) successfully added to the database`)
        }, 1500);
    }

    const showForm = () => {
        setShowForm(true)
    }

    return (
        <menu>
            { populateButton() }            
            <li><button onClick={showForm}>Add Recipe</button></li>
        </menu>
    )
}
