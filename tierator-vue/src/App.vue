<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/" class="main-logo">
      <img alt="Tierator logo" class="logo" src="@/assets/tierator-logo.png" height="60" />
    </RouterLink>

    <nav>
      <RouterLink to="/create">
        <span>Create</span>
        <font-awesome-icon icon="fa-solid fa-plus" />
      </RouterLink>

      <RouterLink to="/browse">
        <span>Browse</span>
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: auto;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 20px);
}

.logo {
  margin: 0 2rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

nav {
  text-align: left;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 0;
}

nav a svg {
  display: none;
}

@media (max-width: 830px) {
  header > a {
    display: flex;
    align-items: center;
  }
  header a img {
    max-height: 40px;
  }
}

@media (max-width: 767px) {
  nav a span {
    display: none;
  }
  nav a svg {
    display: block;
  }
  nav a {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  header {
    width: 100%;
    margin: 0;
  }
  header a img {
    max-width: calc(85vw - 100px);
    height: auto;
  }
}
</style>
