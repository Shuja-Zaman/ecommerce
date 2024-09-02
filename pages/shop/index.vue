<template>
  <div class="pt-20 min-h-screen lg:flex">
    <Loader v-if="isLoading"/>
    <!-- categories -->
    <div class="lg:flex flex-col left lg:w-[15%] w-full text-center p-1 pt-3">
        <LinkButton class="w-max" v-for="category in categories" :key="category.id" :name="category.name" :to="category.path"/>
    </div>
    <!-- products -->
    <div class="right lg:w-[85%] w-full lg:myborder-l pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard class="mx-auto" v-for="product in products" :key="product.id" :item="product"/>
    </div>
  </div>
</template>

<script setup>
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
        } catch (error) {
            console.error('Error fetching Products: ',error);
        }finally{
            isLoading.value = false;
        }
};

onMounted(() => {
  fetchProducts();
})

</script>

<style>

</style>