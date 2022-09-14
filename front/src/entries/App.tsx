import React from 'react'
import { useParams } from 'react-router-dom'

const eventListUrl = "http://localhost:8000/api/events/"
function App() {
    const { event_id } = useParams();
    console.log(`event_id ${event_id}`)
    return (
        <div>
          hello
        </div>
    )
}

export default App
