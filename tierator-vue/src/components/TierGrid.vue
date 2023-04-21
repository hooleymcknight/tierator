<script setup>
  defineProps({
    dropData: {
      type: Object,
      required: false
    }
  })

  function allowDrop(e) {
    e.preventDefault()
  }

  function drop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData('text')
    const row = e.target.closest('tr')
    if (row) {
      row.querySelector('td').appendChild(document.getElementById(data))
    }
  }
</script>

<template>
  <div class="tier-grid" id="tier-grid">
    <table>
      <colgroup width="80px"></colgroup>
      <colgroup width="580px"></colgroup>

      <tbody @drop="$event => drop($event)" @dragover="$event => allowDrop($event)" :class="dropData">
        <tr class="s">
          <th>S</th>
          <td></td>
        </tr>

        <tr class="a">
          <th>A</th>
          <td></td>
        </tr>

        <tr class="b">
          <th>B</th>
          <td></td>
        </tr>

        <tr class="c">
          <th>C</th>
          <td></td>
        </tr>

        <tr class="d">
          <th>D</th>
          <td></td>
        </tr>

        <tr class="e">
          <th>E</th>
          <td></td>
        </tr>

        <tr class="f">
          <th>F</th>
          <td></td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<style scoped>
  .tier-grid.exporting colgroup[width="80px"] {
    min-width: 80px;
  }
  .tier-grid.exporting colgroup[width="580px"] {
    min-width: 580px;
  }

  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
  }

  h3 {
    font-size: 1.2rem;
  }

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  table {
    border-collapse: collapse;
  }

  tbody {
    background: #666;
    color: #fff;
  }

  th, td {
    border: 3px solid #fff;
  }

  th {
    padding: 15px 0;
    font-size: 24px;
    font-weight: bold;
  }

  .s th {
    background: #4f1665;
  }

  .a th {
    background: #192662;
  }

  .b th {
    background: #308bc0;
  }

  .c th {
    background: #196231;
  }

  .d th {
    background: #b19f00;
  }

  .e th {
    background: #bd5e11;
  }

  .f th {
    background: #ae230e;
  }

  @media (max-width: 767px) {
    .tier-grid {
      margin-bottom: 20px;
    }
  }
</style>
