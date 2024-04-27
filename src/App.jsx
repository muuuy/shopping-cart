import './App.css';

import Navbar  from './components/Navbar/Navbar';
import SaleBanner from './components/SaleBanner/SaleBanner';
import Banner from './components/Banner/Banner';
import ItemCard from './components/ItemCard/ItemCard';

function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <SaleBanner />
        <Banner />
        <ItemCard />
      </div>
    </>
  )
}

export default App
