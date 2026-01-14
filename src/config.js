const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'CoffeeKing',
  ENV: import.meta.env.VITE_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  getApiUrl(path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.API_URL}${normalizedPath}`;
  },
  debug() {
    console.group('🔧 CoffeeKing Config');
    console.log('API URL:', this.API_URL);
    console.log('Environment:', this.ENV);
    console.log('Mode:', this.mode);
    console.log('Is Dev:', this.isDev);
    console.groupEnd();
  }
};
if (config.isDev) {
  config.debug();
}
export default config;
