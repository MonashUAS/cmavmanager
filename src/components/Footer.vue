<template>
  <footer>
   <span> Build with <a href="https://vuejs.org/">Vue.js</a> and <a href="http://vue-chartjs.org/#/">vue-chartjs</a></span>
   <span>For issues or feature requests visit <a href="https://github.com/apertureless/npm-stats">Github</a></span>
  </footer>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  footer {
    background-color: #708090;
    color: #fff;
    font-size: rem(16);
    padding: rem(30) rem(40);
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;

    a {
      color: color(robin-egg-blue);
    }
  }
</style>
