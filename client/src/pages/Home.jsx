import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ 
        fontSize: '3.5rem', 
        background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        fontWeight: '800',
        textShadow: '0 2px 20px rgba(0,0,0,0.1)',
        animation: 'fadeInDown 0.8s ease-out'
      }}>
        Welcome to Student Marketplace 🎓
      </h1>
      <p style={{ 
        fontSize: '1.3rem', 
        color: 'rgba(255,255,255,0.95)', 
        marginBottom: '2.5rem',
        fontWeight: '300',
        animation: 'fadeIn 1s ease-out'
      }}>
        Buy and sell textbooks, electronics, furniture, and more!
      </p>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        animation: 'fadeInUp 1s ease-out'
      }}>
        <button 
          className="btn" 
          style={{ 
            width: 'auto', 
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#667eea',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
          }}
          onClick={() => navigate('/products')}
        >
          🛍️ Browse Products
        </button>
        <button 
          className="btn" 
          style={{ 
            width: 'auto', 
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 8px 25px rgba(245, 87, 108, 0.4)'
          }}
          onClick={() => navigate('/register')}
        >
          🚀 Get Started
        </button>
      </div>
      
      <div style={{ 
        marginTop: '5rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        animation: 'fadeInUp 1.2s ease-out'
      }}>
        <div style={{ 
          padding: '2.5rem', 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/products')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>Books & Textbooks</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Save money on expensive textbooks and find great deals</p>
        </div>
        <div style={{ 
          padding: '2.5rem', 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/products')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h3 style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>Electronics</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Find laptops, tablets, and more tech essentials</p>
        </div>
        <div style={{ 
          padding: '2.5rem', 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/products')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛋️</div>
          <h3 style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>Furniture</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Furnish your dorm room affordably and stylishly</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
