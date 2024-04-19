import './App.css';

import Navbar  from './components/Navbar/Navbar';
import SaleBanner from './components/SaleBanner/SaleBanner';
import Banner from './components/Banner/Banner';

function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <SaleBanner />
        <Banner />
      </div>
    </>
  )
}

export default App
