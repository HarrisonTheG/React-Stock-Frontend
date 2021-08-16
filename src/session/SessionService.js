class SessionService {
  getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  clearSessionStorage(key) {
    sessionStorage.removeItem(key);
    return true;
  }

  clearAllSessionStorage() {
    sessionStorage.clear();
  }
}

export default new SessionService();
