import{ useState } from 'react';
import './App.css';
import DeadNaut from './DeadNaut';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <DeadNaut accounts={accounts} setAccounts={setAccounts} />
    
    <div className="App">
  <div className="App">
  
</div>
<div className="background"> </div>

<NavBar accounts={accounts} setAccounts={setAccounts} />
</div>

  </div>);
}


export default App;