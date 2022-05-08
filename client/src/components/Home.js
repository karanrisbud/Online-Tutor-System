import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import About from './About'

function Home() {

  return (  
    <div>
      <Navbar />
      <About />
    </div>
  );
}

export default Home;