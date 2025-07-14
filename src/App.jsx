import './App.css'
import Dashboard from './Components/Dashboard';

const App = () => {

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
      {/* TODO: Dashboard swapped out with about component when about page is clicked in nav bar */}
      <Dashboard />
    </div>
  </>
  )
}

export default App;
