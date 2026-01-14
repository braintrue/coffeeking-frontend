import './style.css';
import config from './config.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header>
      <h1>☕ ${config.APP_NAME}</h1>
      <p class="subtitle">커피와 함께하는 네트워킹</p>
    </header>
    
    <nav class="nav-menu">
      <a href="/" class="nav-link active">홈</a>
      <a href="/src/pages/dashboard.html" class="nav-link">대시보드</a>
      <a href="/src/pages/menus.html" class="nav-link">메뉴</a>
      <a href="/src/pages/orders.html" class="nav-link">주문</a>
      <a href="/src/pages/tables.html" class="nav-link">테이블</a>
      <a href="/src/pages/matches.html" class="nav-link">매칭</a>
    </nav>
    
    <main class="main-content">
      <div class="welcome-card">
        <h2>🎯 환영합니다!</h2>
        <p>CoffeeKing에 오신 것을 환영합니다.</p>
        
        <div class="info-grid">
          <div class="info-item"><strong>환경:</strong> ${config.ENV}</div>
          <div class="info-item"><strong>API:</strong> ${config.API_URL}</div>
          <div class="info-item"><strong>모드:</strong> ${config.mode}</div>
        </div>
      </div>
      
      <div class="action-card">
        <h3>🧪 API 테스트</h3>
        <button id="test-connection" class="btn btn-primary">백엔드 연결 테스트</button>
        <div id="test-result" class="test-result"></div>
      </div>
    </main>
    
    <footer>
      <p>CoffeeKing v1.0.0 | Powered by Vite</p>
    </footer>
  </div>
`;

document.querySelector('#test-connection').addEventListener('click', async () => {
  const resultDiv = document.querySelector('#test-result');
  if (!resultDiv) return;
  
  resultDiv.innerHTML = '<p class="loading">⏳ 연결 테스트 중...</p>';
  
  try {
    const response = await fetch(config.getApiUrl('/'));
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + response.statusText);
    }
    const data = await response.json();
    resultDiv.innerHTML = '<div class="success"><h4>✅ 연결 성공!</h4><pre>' + JSON.stringify(data, null, 2) + '</pre></div>';
  } catch (error) {
    resultDiv.innerHTML = '<div class="error"><h4>❌ 연결 실패</h4><p><strong>에러:</strong> ' + error.message + '</p><div class="error-tips"><p><strong>해결 방법:</strong></p><ul><li>백엔드 서버가 실행 중인지 확인하세요</li><li>API URL: ' + config.API_URL + '</li></ul></div></div>';
  }
});

console.log('🚀 CoffeeKing Frontend Started!');
console.log('📍 Environment:', config.ENV);
console.log('🔗 API URL:', config.API_URL);
