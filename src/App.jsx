import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './Components/Dashboard';
import LoginPrompt from './Components/LoginPrompt';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // If the user previously logged in, the token should be in sessionStorage
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, [])

  return (
  <>
    <nav className="sidebar glass-panel">
      <ul>
        <li>Dashboard</li>
        <li>About</li>
      </ul>
    </nav>
    <div className='content'>
      {/* Header that will remain persistent regardless of page */}
      <header>
        <h1><span className='accent'>Rhythm</span> <span>Radar</span></h1>
      </header>
      {accessToken ? (
        <Dashboard accessToken={accessToken}/>
      ) : (
        <LoginPrompt setAccessToken={setAccessToken} />
      )}
    </div>
  </>
  )
}

export default App;
