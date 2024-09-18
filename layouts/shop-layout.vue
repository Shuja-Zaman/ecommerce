<template>
    <div class="pt-24 min-h-screen p-5">
      <Loader v-if="isLoading"/>
      <!-- show bundles -->
      <UButton variant="solid" :label="show ? 'Hide Bundles' : 'Show Bundles' " @click="show = !show" size="xl" class="bg-gradient-to-r from-orange-400 to-pink-500 rounded-none w-full block text-center"/>
      <div v-if="show" class="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <BundleCard v-for="item in bundles" :key="item.id" :item="item"/>
      </div>

      <!-- products -->
       <h1 class="title text-center my-10">Products</h1>
        <NuxtPage />
    </div>
  </template>
  
  <script setup>  
  const { categories, isLoading } = useFetchCategories();  
  const show = ref(false)

  const { bundles } = useFetchBundles();

  </script>
  
  <style>
  
  </style>