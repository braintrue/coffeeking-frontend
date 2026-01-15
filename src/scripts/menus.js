// src/scripts/menus.js
// Vite 환경변수 사용

import config from '../config.js';

const API_URL = config.API_URL;

console.log('🍕 Menus.js loaded');
console.log('📡 API URL:', API_URL);

// 메뉴 목록 로드
async function loadMenus() {
  try {
    const response = await fetch(config.getApiUrl('/api/menus'));
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const menus = await response.json();
    console.log('✅ Menus loaded:', menus);
    
    displayMenus(menus);
  } catch (error) {
    console.error('❌ Failed to load menus:', error);
    showError('메뉴를 불러오는데 실패했습니다.');
  }
}

// 메뉴 표시
function displayMenus(menus) {
  const container = document.getElementById('menus-container');
  if (!container) {
    console.warn('메뉴 컨테이너를 찾을 수 없습니다.');
    return;
  }
  
  container.innerHTML = menus.map(menu => `
    <div class="menu-card">
      <h3>${menu.name}</h3>
      <p>${menu.description || ''}</p>
      <p class="price">${menu.price}원</p>
      <button onclick="addToCart(${menu.id})">주문하기</button>
    </div>
  `).join('');
}

// 에러 표시
function showError(message) {
  const container = document.getElementById('menus-container');
  if (container) {
    container.innerHTML = `<div class="error">${message}</div>`;
  }
}

// 페이지 로드 시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadMenus);
} else {
  loadMenus();
}

// 전역으로 export (기존 코드 호환)
window.loadMenus = loadMenus;

export { loadMenus, displayMenus };
