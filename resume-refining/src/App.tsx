import { useState } from 'react'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import UploadjobDescription from './component/UploadJobDescription'

function App() {
  const [count, setCount] = useState(0)

  return (
	<div className="App">
	  <FrappeProvider>
		<UploadjobDescription/>
	  </FrappeProvider>
	</div>
  )
}

export default App
