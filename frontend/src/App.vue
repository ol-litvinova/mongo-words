<template>
  <h1>📚 My Dictionary</h1>
  <nav class="menu">
    <router-link to="/words" class="menu-item" active-class="active">📋 Список слів</router-link>
    <router-link to="/training" class="menu-item" active-class="active">🔁 Тренування</router-link>
    <router-link to="/cards" class="menu-item" active-class="active">📘 Картки</router-link>
    <router-link to="/add" class="menu-item" active-class="active">➕ Додати слово</router-link>
  </nav>
  <main class="main-content">
    <router-view />
  </main>
</template>

<style src="./style.css" />
<style scoped>
.app {
  font-family: 'Segoe UI', sans-serif;
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  background-color: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.menu-item {
  text-decoration: none;
  font-size: 1.1rem;
  color: #444;
  padding: 8px 14px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.menu-item:hover {
  background-color: #e6f0ff;
  color: #1a73e8;
}

.menu-item.active {
  background-color: #1a73e8;
  color: white;
}

.main-content {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>