<template>
    <div class="pt-20 min-h-screen p-5">
      <Loader v-if="isLoading"/>
      <!-- products -->
       <h1 class="title text-center my-10">Products</h1>
        <NuxtPage />
    </div>
  </template>
  
  <script setup>  
  const { categories, isLoading } = useFetchCategories();  
  
  </script>
  
  <style>
  
  </style>