import { useState } from 'react'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
// import {UploadjobDescription} from ''

function App() {
  const [count, setCount] = useState(0)

  return (
	<div className="App">
	  <FrappeProvider>
	  </FrappeProvider>
	</div>
  )
}

export default App
