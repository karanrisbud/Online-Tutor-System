import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import About from './About'
import { useEffect, useState } from 'react';
import Navbar_empty from './Nabvar_empty.js';

function Home() {
  const [loggedin,setloggedin] = useState(false);
  
  useEffect(() => {

    if(localStorage.getItem("user") === null && localStorage.getItem("tutor") === null)
    {
      setloggedin(false);
    }
    else{
      setloggedin(true);
    }

  },[])


 

  return (  
    <div>
      {loggedin && <Navbar />}
      {!loggedin && <Navbar_empty />}
      <About />
    </div>
  );
}

export default Home;