<template>
  <div class="min-h-screen pt-28 px-5 pb-5 relative">
    
    <Loader v-if="isLoading"/>

    <div v-if="!isLoading" class="product flex lg:flex-row flex-col gap-5">
        <!-- img -->
        <img :src="selectedImage" class="w-full h-[30rem] bg-cover object-cover" alt="">
         <!-- details -->
          <div class="space-y-3 w-full">
            <h1 class="lg:text-5xl text-3xl font-bold">{{ product.name }}</h1>
            <h2 class="text-xl text-red-700">Rs.{{ product.price }}</h2>
            <p class="text-dull text-sm">Tax included. Shipping calculated at checkout.</p>
            <hr>
            <h2 class="font-bold">Size</h2>
            <!-- size selection -->
            <div class="space-x-2 pt-2">
                <label @click="selectedSize = size" :class="selectedSize === size ? 'border-2 border-neutral-800' : 'border-neutral-400 border-[1px]' " v-for="size in product.sizes" :key="size.id" class="px-3 py-2 hover:cursor-pointer">{{ size }}</label>
            </div>
            <p class="pt-4 text-md flex items-center gap-2"> <UIcon class="h-7 w-7" name="i-heroicons-shield-check-20-solid"/> Customer satisfaction guarantee</p>
            
            <!-- multiple images -->
             <div class="flex items-center gap-2">
                <img @click="selectedImage = img" :class="selectedImage === img ? 'border-4 border-neutral-800' : 'border-neutral-400 border-[1px]'" class="hover:cursor-pointer h-16 w-16 bg-cover object-cover" :src="img" alt="" v-for="img in product.imgUrls" :key="img.id">
             </div>

            <SolidButton @click="addToCart(), toast.add({title:'Confirmation', description:'Product added successfully to cart!', color:'sky'})" class="w-full block text-center" name="Add to cart"/>
            <OutlineButton @click="buyNow()" to="/checkout" class="w-full block text-center" name="Buy it now"/>
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
const selectedImage = ref('');
const isLoading = ref(true);
const toast = useToast();

const fetchProduct = async () => {
    try {
        const docRef = doc(db, 'products', `${route.params.id}`); 
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            product.value = docSnap.data();
            selectedSize.value = product.value.sizes[0];
            selectedImage.value = product.value.imgUrls[0];
        }
    } catch (error) {
        console.error('Error fetching Product: ',error);
    } finally{
        isLoading.value = false;
    }
};

const cartData = useState('cartData', () => []);
const subTotal = useState('subTotal',() => 0);
const router = useRouter();

const addToCart = () => {
    try {
        const hasItem = cartData.value.find(item => item.name === `${product.value.name}` && item.size === `${selectedSize.value}`);
        if(hasItem){
            hasItem.quantity++;
            subTotal.value += hasItem.price;
        }
        else{
            const cartItem = {
                id:route.params.id,
                name:product.value.name,
                size:selectedSize.value,
                img:product.value.imgUrls[0],
                quantity:1,
                price:product.value.price
            };
            cartData.value.push(cartItem);
            subTotal.value += cartItem.price;
        }
        console.log(subTotal.value);
        console.log(cartData.value);
    } catch (error) {
        console.error("Error adding to Cart: ",error);
    }
};

const buyNow = () => {
    try {
        const hasItem = cartData.value.find(item => item.name === `${product.value.name}` && item.size === `${selectedSize.value}`);
        if(hasItem){
            hasItem.quantity++;
            subTotal.value += hasItem.price;
        }
        else{
            const cartItem = {
                id:route.params.id,
                name:product.value.name,
                size:selectedSize.value,
                img:product.value.imgUrls[0],
                quantity:1,
                price:product.value.price
            };
            cartData.value.push(cartItem);
            subTotal.value += cartItem.price;
        }
        router.push('/checkout');
    } catch (error) {
        console.error("Error adding to Cart: ",error);
    }
};

onMounted(() => {
    fetchProduct();
});

</script>

<style>

</style>