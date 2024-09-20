<template>
  <div v-if="!isLoading" class="px-5 my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    <Loader v-if="isLoading"/>
    <div class="flex p-0  flex-col gap-1">
          <LinkButton class="w-max px-0 lg:text-lg" v-for="category in categories" color="dark" :key="category.id" :name="category.name" :to="`${category.path}-${category.id}`"/>
      </div>
    <ProductCard class="mx-auto" v-for="product in products" :key="product.id" :item="product"/>
  </div>
</template>

<script setup>

const { categories, isLoading } = useFetchCategories();  

definePageMeta({
  layout:'shop-layout'
});

import { collection, getDocs, doc, query, where } from 'firebase/firestore';

const products = ref([]);
const route = useRoute();

const fetchProducts = async () => {
  try {
    const nuxtApp = useNuxtApp();
    const db = nuxtApp.$firestore;
    const categoryId = route.params.id;
    // Create a document reference for the category
    const categoryRef = doc(db, 'categories', categoryId);
    const q = query(collection(db, 'products'), where('categoryId','==', categoryRef));
    const querySnapshot = await getDocs(q);
    products.value = querySnapshot.docs.map( doc => ({
        id:doc.id,
        ...doc.data()
    }));
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