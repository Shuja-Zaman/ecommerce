<template>
  <div class="main min-h-screen pt-28 px-5">
    <div class="product flex gap-5">
        <!-- img -->
        <img src="/assets/images/bg.jpg" class="w-[50%] h-[30rem] bg-cover object-cover" alt="">
         <!-- details -->
          <div class="space-y-2 w-full">
            <h1 class="text-5xl font-bold">{{ product.name }}</h1>
            <h2 class="text-xl text-red-700">Rs.{{ product.price }}</h2>
            <p class="text-dull text-sm">Tax included. Shipping calculated at checkout.</p>
            <hr>
            <h2 class="font-bold">Size</h2>
            <!-- size selection -->
            <div class="space-x-2 pt-2">
                <label @click="selectedSize = size" :class="selectedSize === size ? 'border-2 border-neutral-800' : 'border-neutral-400 border-[1px]' " v-for="size in product.sizes" :key="size.id" class="px-3 py-2">{{ size }}</label>
            </div>
            <p class="pt-4 text-md flex items-center gap-2"> <UIcon class="h-7 w-7" name="i-heroicons-shield-check-20-solid"/> Customer satisfaction guarantee</p>
            
            <!-- multiple images -->

            
            <SolidButton class="w-full block text-center" name="Add to cart"/>
            <OutlineButton class="w-full block text-center" name="Buy it now"/>
          </div>
    </div>


  </div>
</template>

<script setup>
import { getDoc, doc } from 'firebase/firestore';

const nuxtApp = useNuxtApp();
const route = useRoute();
const db = nuxtApp.$firestore;

const product = ref({});
const selectedSize = ref('');

const fetchProduct = async () => {
    try {
        const docRef = doc(db, 'products', `${route.params.id}`); 
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            product.value = docSnap.data();
            console.log(product.value)
        }

    } catch (error) {
        console.error('Error fetching Product: ',error);
    }
};

onMounted(() => {
    fetchProduct();
});

</script>

<style>

</style>