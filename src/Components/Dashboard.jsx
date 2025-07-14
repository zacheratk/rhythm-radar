import './Dashboard.css';
import Track from './Track';
import Search from './Search';

const Dashboard = () => {

  return (
  <main>
    <section className='container'>
      <div className="glass-panel">
        <h1>Showing <span className="accent">{50}</span> Tracks</h1>
      </div>
      <div className="glass-panel">
        <h1>Average Popularity<br /><span className="accent">{'70/100'}</span></h1>
      </div>
      <div className="glass-panel">
        <h1>Most Popular Genre<br /><span className="accent">{'Genre'}</span></h1>
      </div>
    </section>

    <article className="glass-panel">
      <Search />
      {/* TODO: Track components will be added here for each track returned by the API */}
    </article>
  </main>
  );
};

export default Dashboard;