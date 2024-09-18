<template>
  <div class="p-2" v-if="!isLoading">
    <h1 class="small-title">Orders <span>({{ orders.length }})</span></h1>
    <div class="flex flex-col bg-neutral-200 p-2 my-5" v-for="order in orders" :key="order.id">
      <h1 class="my-2">Personal</h1>  
      <h1> Order Id: <span>{{ order.id }}</span></h1>
      <p> Name: <span>{{ order.name }}</span></p>
      <p> Email: <span>{{ order.email }}</span></p>
      <p> Mobile: <span>{{ order.mobile }}</span></p>
      <p> Address: <span>{{ order.address }} , {{ order.city }} , {{ order.postal }}</span></p>
      
      <hr class="my-1 bg-neutral-900">

      <h1 class="my-2">Order Details</h1>  
      <h1> Total Price: <span> Rs. {{ order.totalPrice }}</span></h1>
      <div v-for="item in order.products" :key="item.id">
        <p>Product name: <span>{{ item.name }}  x {{ item.quantity }}</span> <span v-if="item.size">- {{ item.size }}</span>
          <span class="" v-for="bundleItem in item.bundleProducts" :key="bundleItem.id">
            <span class="ml-5">'{{ bundleItem.name }} - {{ bundleItem.size }}'</span>
          </span>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
const orders = ref([]);
const nuxtApp = useNuxtApp();
const db = nuxtApp.$firestore;
const isLoading = ref(true);

const fetchOrders = async () => {
  try {
      const orderRef = await getDocs(collection(db,'orders'));
      orders.value = orderRef.docs.map( (doc) => ({
          id:doc.id,
          ...doc.data()
      }));
  } catch (error) {
      console.error('Error fetching Messages: ',error);
  }finally{
      isLoading.value = false;
  }

};


onMounted(() => {
  fetchOrders();
});

</script>

<style>

</style>