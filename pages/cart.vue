<template>
  <div class="pt-28 p-5 min-h-screen w-full flex flex-col items-center">
    <h1 class="small-title">Cart</h1>
    <LinkButton name="Continue Shopping" to="/shop" class="pt-5"/>

    <div class="pt-10 w-full px-10">
        <!-- values -->
         <!-- big screen -->
        <div v-if="subTotal > 0" class="lg:flex hidden flex-col gap-10 border-y-[1px] py-5">
            <div v-for="item in cartData" :key="item.id" class="flex flex-row items-center justify-between">
                <div class="flex gap-2 items-center">
                    <img class="h-36" :src="item.img" alt="product image">
                    <h1 class="text-2xl font-light">{{ item.name }}</h1>
                    <p>- {{ item.size }}</p>
                </div>
                <div class="flex h-max w-max gap-2 border-[1px]  p-1">
                    <UIcon @click="decreaseQuantity(item)" class="text-2xl hover:bg-gray-500" name="i-heroicons-minus-16-solid"/>
                    <h1 class="">{{ item.quantity }}</h1>
                    <UIcon @click="increaseQuantity(item)" class="text-2xl hover:bg-gray-500" name="i-heroicons-plus-16-solid"/>
                </div>
                <p>Rs.{{ item.price }}</p>
            </div>
        </div>
        <!-- mobile screen -->
         <div v-if="subTotal > 0" class="lg:hidden block py-5 border-y-[1px]">
          <div class="space-y-8">
            <div class="flex gap-2" v-for="item in cartData" :key="item">
              <img class="h-20 w-20" :src="item.img" alt="">
              <div class="flex flex-col justify-between w-full">
                <h1 class="text-lg font-light">{{ item.name }}</h1>
                <p>{{ item.size }}</p>
                <div class="flex justify-between items-center w-full">
                    <!-- quanitity -->
                  <div class="flex gap-2 border-[1px]  p-1">
                    <UIcon @click="decreaseQuantity(item)" class="text-2xl hover:bg-gray-500" name="i-heroicons-minus-16-solid"/>
                    <h1 class="">{{ item.quantity }}</h1>
                    <UIcon @click="increaseQuantity(item)" class="text-2xl hover:bg-gray-500" name="i-heroicons-plus-16-solid"/>
                  </div>
                  <!-- price -->
                  <h1>Rs.{{ item.price }}</h1>
                </div>
              </div>
            </div>
          </div>
         </div>

        <div v-else class="border-t-[1px] py-5">
                <h1 class="text-xl text-dull text-center">Your cart is currently empty.</h1>
        </div>
        <!-- subTotal -->
        <div v-if="subTotal > 0" class="pt-5 flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <h1 class="font-bold">SUBTOTAL</h1>
            <h1>Rs.{{ subTotal }}</h1>
          </div>
          <p class="text-dull text-sm text-center">Shipping, taxes, and discount codes calculated at checkout.</p>
          <SolidButton to="/checkout" class="text-center block" name="Check out"/>
        </div>
    </div>
</div>
</template>

<script setup>
const cartData = useState('cartData');
const subTotal = useState('subTotal');

function decreaseQuantity(item){
  if(item.quantity == 1){
    // remove item from cart
    cartData.value = cartData.value.filter(cartItem => {
      // Keep only items that don't match both the ID and size of the current item
      return !(cartItem.id === item.id && cartItem.size === item.size);
    });
    subTotal.value -= item.price;
  }
  else if(item.quantity > 1){
    item.quantity--;
    subTotal.value -= item.price; 
  }
  console.log(cartData.value);
}

const message = ref('');

function increaseQuantity(item) {
  if(item.quantity == 10){
    message.value = 'Max limit reached';
  }
  else if(item.quantity < 10){
    item.quantity++;
    subTotal.value += item.price; 
  }  
}

</script>

<style>

</style>