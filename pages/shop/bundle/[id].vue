<template>
    <div class="min-h-screen pt-28 px-5 pb-5 relative">
      
      <Loader v-if="isLoading"/>
  
      <div v-if="!isLoading" class="product flex lg:flex-row flex-col gap-5">
          <!-- Bundle Image -->
          <img :src="selectedImage" class="h-[30rem] lg:w-1/2 bg-cover object-cover" alt="Bundle Image ">
          
          <!-- Bundle details -->
          <div class="space-y-3 w-full ">
              <h1 class="lg:text-5xl text-3xl font-bold">{{ bundle.name }}</h1>
              <h2 class="text-xl text-red-700">Rs.{{ bundle.price }}</h2>
              <p class="text-dull text-sm">Tax included. Shipping calculated at checkout.</p>
              <hr>
              
              <p class="pt-4 text-md flex items-center gap-2"> 
                <UIcon class="h-7 w-7" name="i-heroicons-shield-check-20-solid"/> 
                Customer satisfaction guarantee
              </p>

              <h1 class="small-title text-center lg:text-left">Products</h1>

              <!-- Products Loop -->
              <div v-for="(product, index) in products" :key="product.id" class="space-y-5">
                  <!-- Product Image -->
                  <img :src="selectedImageProduct[index] || product.imgUrls[0]" class="mb-5 h-[20rem] bg-cover object-cover" alt="Product Image">
                  
                  <!-- Product details -->
                  <div class="space-y-3 w-full">
                      <h1 class="lg:text-5xl text-3xl font-bold">{{ product.name }}</h1>
                      <hr>

                      <!-- Size Selection -->
                      <h2 class="font-bold">Size</h2>
                      <div class="space-x-2 pt-2">
                          <label 
                            @click="selectSize(product, size)" 
                            :class="selectedSize[index] === size ? 'border-2 border-neutral-800' : 'border-neutral-400 border-[1px]'" 
                            v-for="size in product.sizes" 
                            :key="size"
                            class="px-3 py-2 hover:cursor-pointer text-xl">
                            {{ size }}
                          </label>
                      </div>

                      <!-- Multiple Images -->
                      <div class="flex items-center gap-2">
                          <img 
                            @click="selectProductImage(index, img)" 
                            :class="selectedImageProduct[index] === img ? 'border-2 border-neutral-800' : 'border-neutral-400 border-[1px]'" 
                            class="hover:cursor-pointer h-16 w-16 bg-cover object-cover" 
                            :src="img" 
                            alt="Product Image" 
                            v-for="img in product.imgUrls" 
                            :key="img">
                      </div>

                  </div>
              </div>

              <!-- Add to Cart and Buy Now Buttons -->
              <SolidButton @click="addToCart()" class="w-full block text-center" name="Add to cart"/>
              <OutlineButton @click="buyNow()" class="w-full block text-center" name="Buy it now"/>
          </div>
      </div>
    </div>
</template>

<script setup>
import { getDoc, doc } from 'firebase/firestore';

// Nuxt and Firebase setup
const nuxtApp = useNuxtApp();
const route = useRoute();
const db = nuxtApp.$firestore;

// Data refs
const bundle = ref({});
const products = ref([]);
const selectedImage = ref('');
const selectedImageProduct = ref([]);
const selectedSize = ref([]);
const isLoading = ref(true);
const toast = useToast();

// Fetch Bundle
const fetchBundle = async () => {
    try {
        const docRef = doc(db, 'bundles', `${route.params.id}`); 
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
          bundle.value = docSnap.data();
          selectedImage.value = bundle.value.imgUrls[0];
          products.value = bundle.value.bundleProducts;
          selectedImageProduct.value = Array(products.value.length).fill('');
          selectedSize.value = products.value.map(product => product.sizes[0] || '');
        }
    } catch (error) {
        console.error('Error fetching Bundle: ', error);
    } finally {
        isLoading.value = false;
    }
};

// Handle image selection for products
const selectProductImage = (index, img) => {
    selectedImageProduct.value[index] = img;
};

// Handle size selection for products
const selectSize = (product, size) => {
    const productIndex = products.value.findIndex(p => p.id === product.id);
    selectedSize.value[productIndex] = size;
};

// Cart and subtotal state
const cartData = useState('cartData', () => []);
const subTotal = useState('subTotal', () => 0);
const router = useRouter();

// Add Bundle and Products to Cart
const addToCart = () => {
    try {
        // Add Bundle
        const hasBundle = cartData.value.find(item => item.id === route.params.id);
        if (hasBundle) {
            hasBundle.quantity++;
            subTotal.value += hasBundle.price;
        } else {
            const bundleItem = {
                id: route.params.id,
                name: bundle.value.name,
                img: bundle.value.imgUrls[0],
                quantity: 1,
                price: bundle.value.price,
                bundleProducts: products.value.map((product, index) => ({
                    name: product.name,
                    price: product.price,
                    size: selectedSize.value[index] || product.sizes[0],
                    imgUrl: selectedImageProduct.value[index] || product.imgUrls[0],
                })),
            };
            cartData.value.push(bundleItem);
            subTotal.value += bundleItem.price;
        }

        toast.add({ title: 'Confirmation', description: 'Products added successfully to cart!', color: 'sky' });
    } catch (error) {
        console.error('Error adding to Cart: ', error);
    }
};

// Buy Now
const buyNow = () => {
    addToCart();
    router.push('/checkout');
};

// Fetch bundle on component mount
onMounted(() => {
    fetchBundle();
});
</script>

<style>
/* Add custom styles here */
</style>
