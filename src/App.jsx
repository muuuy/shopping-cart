import './App.css'

import Navbar  from './components/Navbar/Navbar'
import SaleBanner from './components/SaleBanner/SaleBanner'

function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <SaleBanner />
      </div>
    </>
  )
}

export default App
