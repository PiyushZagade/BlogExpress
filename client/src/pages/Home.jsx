import React from 'react'
import SlideBar from './../Component/SlideBar';

function Home() {
  return (
    <div>
      <SlideBar />
      <div className="container">
        <h1 style={{ textAlign: 'center ', margin: '10px', color: '#512888' }}>Welcome to BlogExpress App</h1>

        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <section className='w-100'>
            BlogExpress App an informational website consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page.
            </section>
    
          </div>
          <div className="col"></div>
        </div>

      </div>

    </div>
  )
}

export default Home
