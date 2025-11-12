import './App.css'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '5rem' }}>
      <h1>Welcome to Goodwill Gold</h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '1rem auto' }}>
        Helping you discover amazing resale finds, sustainable fashion tips, and creative ways
        to turn Goodwill treasures into gold. ✨
      </p>

      <div style={{ marginTop: '3rem' }}>
        <a
          href="https://www.goodwill.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#0070f3',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Explore More
        </a>
      </div>
    </div>
  )
}

export default App

