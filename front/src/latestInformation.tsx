import React from 'react'
import ReactDOM from 'react-dom'
import { LatestInformation } from './entries/LatestInformation'

ReactDOM.render(
  <React.StrictMode>
    <div>
      <LatestInformation/>
    </div>
  </React.StrictMode>,
  document.getElementById('latestInformation')
)