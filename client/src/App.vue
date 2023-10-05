<template>
  <h2>Employees</h2>
  <DashBoard></DashBoard>
</template>

<script>
import DashBoard from "./components/DashBoard.vue";

export default {
  name: "App",
  components: {
    DashBoard,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 14px;
  margin-left: 20px;
  padding-right: 20px;
}
</style>
