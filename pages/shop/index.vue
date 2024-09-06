<template>
  <div class="gap-10 lg:px-5 lg:pt-10 pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full">
    <div class="flex p-0  flex-col gap-1">
          <LinkButton class="w-max px-0 text-xl" v-for="category in categories" :key="category.id" :name="category.name" :to="`${category.path}-${category.id}`"/>
      </div>
    <ProductCard class="mx-auto" v-for="product in products" :key="product.id" :item="product"/>
  </div>
</template>

<script setup>

definePageMeta({
  layout:'shop-layout'
});

import { collection, getDocs } from 'firebase/firestore';
const { categories, isLoading } = useFetchCategories();  

const products = ref([]);

const fetchProducts = async () => {
  try {
            const nuxtApp = useNuxtApp();
            const db = nuxtApp.$firestore;
            const productsRef = await getDocs(collection(db,'products'));
            products.value = productsRef.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            }));
            console.log(products.value);
        } catch (error) {
            console.error('Error fetching Products: ',error);
        }finally{
            isLoading.value = false;
        }
};

onMounted(() => {
  fetchProducts();
});

</script>

<style>

</style>