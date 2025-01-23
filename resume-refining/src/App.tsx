import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
function App() {
  const [count, setCount] = useState(0)

  return (
	<div className="App">
	  <FrappeProvider>
		<div>	
		<button onClick={() => setCount((count) => count + 1)}>
		  count is {count}
		</button>
	<br/>
		
		<h1>Heding</h1>
		<h1>Heding</h1>	
	  </div>
	  </FrappeProvider>
	</div>
  )
}

export default App
