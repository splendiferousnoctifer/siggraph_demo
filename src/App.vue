
<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img src="/logo.png" alt="Logo" class="logo">
      </router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style>
#app {
  text-align: center;
}

.logo {
  top: 10px;
  left: 10px;
  width: 200px;
  margin-bottom: 20px; /* Add buffer space under the logo */
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 140px); /* Adjust the height to account for the logo and margin */
}
</style>
