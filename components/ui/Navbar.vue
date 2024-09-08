<template>
  <nav class="josefin-sans-font p-5 flex justify-between items-center fixed w-full myborder backdrop-blur-md z-50">
    <div class="left">
        <h1 class="text-light">
          <NuxtLink to="/">@ecommerce</NuxtLink>
        </h1>
    </div>

    <!-- display screen -->
    <div class="center space-x-8 hidden lg:block">
        <LinkButton v-for="item in navItems" :key="item.name" :name="item.name" :to="item.path"/>
        <CategoryDropdown/>
        <!-- slider for cart -->
        <div class="inline relative">
          <div v-if="subTotal > 0" class="animate-pulse absolute h-2 w-2 bg-red-600 end-0 top-0 rounded-full"></div>
          <GhostButton class="rounded" name="cart" @click="openCart = true"/>
        </div>
        <USlideover v-model="openCart">
          <div class="p-4 flex-1">
            <UButton
              color="gray"
              variant="ghost"
              size="xl"
              icon="i-heroicons-x-mark-20-solid"
              class="flex absolute end-5 top-5 z-10"
              square
              padded
              mode="hover"
              @click="openCart = false"
            />

            <div class=" h-full flex flex-col px-10 pb-5 gap-5 justify-between">
              <!-- product details -->
              <div>
                <h1 class="text-4xl font-bold">Cart</h1>
                <hr class="my-5">
                <h1 v-if="!subTotal" class="pt-2">Your cart is currently empty.</h1>
                <!-- products -->
                <div class="space-y-8">
                  <NuxtLink class="flex gap-2" :to="`/shop/${item.id}`" v-for="item in cartItems" :key="item">
                    <img class="h-20 w-20" :src="item.img" alt="" @click="openCart = false">
                    <div class="flex flex-col justify-between w-full">
                      <h1 @click="openCart = false" class="">{{ item.name }} - {{ item.size }}</h1>
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
                  </NuxtLink>
                </div>
              </div>
              <!-- total -->
              <div v-if="subTotal" class="space-y-5 ">
                <hr>
                <div class="flex items-center justify-between">
                  <h1 class="text-xl font-bold uppercase">Subtotal</h1>
                  <p>Rs.{{ subTotal }}</p>
                </div>
                <p class="text-xs text-dull">Shipping, taxes, and discount codes calculated at checkout.</p>
                <SolidButton class="block text-center w-full" @click="openCart = false" to="/checkout" name="Checkout"/>
              </div>

            </div>

          </div>
        </USlideover>

    </div>
    <div class="right hidden lg:block">
      <OutlineButton v-if="!userCred.id" @click="signin" name="Sign in" icon='i-logos-google-icon'/>
      <UTooltip v-if="userCred.id" text="Account">
        <NuxtLink :to="`/user/${userCred.id}`">
          <UAvatar size='md' chip-color="sky" :src="userCred.imgUrl || ''" class="hover:cursor-pointer" alt="Avatar"></UAvatar>
        </NuxtLink>
      </UTooltip>
    </div>

    <!-- slider -->
    <div class="lg:hidden flex items-center gap-2">
      <div class="relative">
        <div v-if="subTotal > 0" class="animate-pulse absolute h-2 w-2 bg-red-600 top-3 end-0 rounded-full"></div>
        <GhostButton icon="i-heroicons-shopping-bag" color="gray" @click="openCart = true"/>
      </div>
    <!-- <UButton label="Open" @click="isOpen = true" /> -->
    <UIcon @click="isOpen = true"  name="i-solar-hamburger-menu-outline" class="h-7 w-7"/>

    <USlideover v-model="isOpen" class="lg:hidden block">
      <div class="p-4 flex-1">
        <UButton
          color="gray"
          variant="ghost"
          size="xl"
          icon="i-heroicons-x-mark-20-solid"
          class="flex absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
        />

        <!-- items -->
        <div class="flex flex-col mt-12 border-t-[1px]">
          <LinkButton @click="isOpen = false" v-for="item in navItems" :key="item.name" :name="item.name" :to="item.path"/>
          <GhostButton @click="showCategories = !showCategories" name="categories" :trailing-icon="showCategories ? 'i-heroicons-chevron-up-20-solid': 'i-heroicons-chevron-down-20-solid'"/>
          <div v-if="showCategories" class="flex flex-col pl-3 gap-2 mb-5">
            <LinkButton class="underline" @click="isOpen = false, showCategories = false" v-for="item in categories" :key="item.id" :name="item.name" :to="`${item.path}-${item.id}`"/>
          </div>
          <OutlineButton v-if="!userCred.id" @click="isOpen = false, signin()" class="flex justify-center mt-5" icon="i-logos-google-icon" name="Sign in"/>
          <NuxtLink @click="isOpen = false" v-if="userCred.id" :to="`/user/${userCred.id}`">
            <h1 class="text-center p-2 bg-gradient-to-r from-sky-300 via-sky-600 to-sky-800 font-bold text-neutral-100">{{ userCred.name }}</h1>
          </NuxtLink>
        </div>

      </div>
    </USlideover>
  </div>
  </nav>
</template>

<script setup>

const { categories } = useFetchCategories();
const showCategories = ref(false);

const navItems = ref([
    {name:'shop', path:'/shop'},
    {name:'contact', path:'/contact'},
    
]);

const isOpen = ref(false)
const openCart = ref(false);

const cartData = useState('cartData');
const cartItems = computed(() => cartData.value);
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

import { getAuth, signInWithPopup } from "firebase/auth";

const nuxtApp = useNuxtApp();
const auth = getAuth();
const provider = nuxtApp.$provider;
const userCred = useState('userCred',() => ({
  name:'',
  email:'',
  imgUrl:'',
  id:''
}));

const signin = async () => {
  try {
    console.log('hello');
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    userCred.value = {
      email: user.email,
      name: user.displayName,
      imgUrl: user.photoURL,
      id: user.uid
    };
  } catch (error) {
    console.error('Error signing in: ' ,error);
  }
};

</script>

<style>

</style>