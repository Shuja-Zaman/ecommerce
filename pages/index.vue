<template>
  <div class="h-screen flex flex-col justify-center items-center gap-10 main text-light bg-dark">
    <h1 class="title"> <span class="text-highlight">Start</span> Shopping Today.</h1>
    
    <div class="space-x-5">
        <!-- shop button -->
      <SolidButton name="Shop Now" to="/shop"/>
      <!-- demo -->
      <OutlineButton name="Demo" to="/demo"/>
    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>
.main{
  background-image: url('../assets/images/bg.jpg');
  background-size: cover;
  object-fit: contain;
}

</style>

