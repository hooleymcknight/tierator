<script setup>
</script>

<template>
  <main>
    <h1>Create Your Own Tier&nbsp;Chart</h1>
    <p>To get started, click on the Create button in the top right corner.&nbsp;<span class="arrow">↗</span></p>

    <h3>Example: Stardew Gems Rated&nbsp;by&nbsp;Tastiness</h3>
    <img src="@/assets/images/stardew-gems/stardew_chart.png" alt="example chart of Stardew Gems rated by tastiness" />
  </main>
</template>

<style scoped>
  main {
    margin: 0 auto;
    width: fit-content;
    width: -moz-fit-content;
  }

  .arrow {
    margin-left: 5px;
    font-size: 24px;
  }

  h3 {
    margin: 25px 0 10px;
  }

  img {
    max-width: 500px;
  }

  @media (max-width: 767px) {
    main {
      width: 90%;
      margin: 0 auto;
    }
    img {
      max-width: 100%;
    }
  }
</style>