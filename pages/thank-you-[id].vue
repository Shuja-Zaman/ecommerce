<template>
  <div class="flex flex-col items-center pt-24 mb-5 min-h-screen">
    <h1 class=" mt-4 title text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600 p-2">Confirmation</h1>
    <UDivider label="Thank you" class="text-3xl"/>
    <p class="my-3 text-dull text-sm">Your order will reach you in a few days.</p>
    
    <div class="w-full max-w-md p-5">
      <UForm class="space-y-5">
        
        <div class="flex gap-3">
            <!-- order id -->
          <UFormGroup label="Order id" name="order">
            <UInput :value="route.params.id" type="text" size="xl" color="dark" readonly class="w-full"/>
          </UFormGroup> 

          <!-- phone -->
          <UFormGroup label="Mobile" name="mobile">
            <UInput :value="order.mobile" size="xl" color="dark" readonly class="w-full"/>
          </UFormGroup>
        </div>
        
        <!-- address -->
        <UFormGroup label="Address" name="address">
          <UInput :value="order.address" size="xl" color="dark" readonly class="w-full"/>
        </UFormGroup>

        <div class="flex flex-col">
          <h1>Items:</h1>
          <h1 v-for="item in order.products" :key="item.id">
            - {{ item.name }} ({{ item.size }}) x {{ item.quantity }}
          </h1>
        </div>

        <!-- total -->
        <UFormGroup label="Total price - Rs." name="total">
          <UInput :value="order.totalPrice" size="xl" color="dark" readonly class="w-full"/>
        </UFormGroup>

        <UButton to="/" size="xl" label="Return home" class="rounded-none w-full block text-center" color="sky"/>
      </UForm>
    </div>
  
  </div>
</template>

<script setup>
import { doc, getDoc } from 'firebase/firestore';
const route = useRoute();
const nuxtApp = useNuxtApp();
const db = nuxtApp.$firestore;
const order = ref({});

console.log(route.params.id);

const fetchOrder = async () => {
  try {
    const orderDoc = doc(db, 'orders',route.params.id);
    const docSnapshot = await getDoc(orderDoc);
    if (docSnapshot.exists()) {
      order.value = docSnapshot.data(); // Set the order data
    }
    console.log(order.value);
  } catch (error) {
    console.error('Error fetching order: ', error);
  }
}

onMounted(() => {
  fetchOrder();
})

</script>

<style>

</style>