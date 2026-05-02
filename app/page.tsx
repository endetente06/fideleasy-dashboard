export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#07070f',
      color: 'white',
      fontFamily: 'sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          Fidel<span style={{ color: '#4f6ef7' }}>Easy</span>
        </h1>
        <p style={{ color: '#6060a0', fontSize: '18px' }}>
          Dashboard commerçant — En construction 🚀
        </p>
      </div>
    </div>
  );
}