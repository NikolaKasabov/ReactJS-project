import React from 'react';
import './styles.css';

function Home() {
  document.title = 'welcome';

  return (
    <div className="home-page">
      <h1>welcome to <span>e-comm</span></h1>
      <h2>we offer the best prices for television sets, laptops and smartphones</h2>
    </div>
  )
}

export default Home;
