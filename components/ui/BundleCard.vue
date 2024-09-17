<template>
    <NuxtLink :to="`/shop/bundle/${item.id}`">
      <div class=" p-0 ring-0 shadow-none divide-none bg-transparent border-none my-3">
      <img :src="img" class="h-[10rem] md:h-[15rem] lg:h-[18rem] bg-cover object-cover" alt="product image">
  
      <div class="details pt-2">
        <h1 class="font-normal lg:font-medium lg:text-xl">{{ item.name }}</h1>
        <p class="font-normal">Rs.{{ item.price }}</p>
    </div>
    </div>
    </NuxtLink>
  </template>
  
  <script setup>
  
  const props = defineProps({
    item:{}
  });
  const img = props.item?.imgUrls[0] || '';
  
  </script>
  
  <style>
  
  </style>