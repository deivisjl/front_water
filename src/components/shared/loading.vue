<template>
  <div class="text-center over">
    <div class="loader">
        <v-progress-circular
            indeterminate
            color="light-blue"
            size="50"
            width="4"
            align="center"
            ></v-progress-circular>
    </div>
  </div>
</template>

<style scoped>
.over {
    position:relative;
    background-color: #e2e2e2a3;
    z-index: 9999;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.loader{
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -50px;
}
.v-progress-circular {
   margin: 1rem; 
   clear: both;
    height: 100px;
}
</style>