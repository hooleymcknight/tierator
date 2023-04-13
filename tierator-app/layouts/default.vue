<template>
  <div>
    <header>
      <NuxtLink to="/" class="main-logo">
        <img alt="Tierator logo" class="logo" src="@/assets/tierator-logo.png" height="60" />
      </NuxtLink>

      <nav>
        <NuxtLink to="/create">Create</NuxtLink>
        <NuxtLink to="/browse">Browse</NuxtLink>
      </nav>
    </header>
    <Nuxt />
  </div>
</template>

<style>
  body, button {
    font-family: Poppins, sans-serif;
  }
</style>