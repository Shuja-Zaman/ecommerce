<template>
  <div class="pt-16 flex lg:flex-row flex-col-reverse lg:h-screen min-h-screen">
    
      <Loader v-if="isLoading"/>
      
      <!-- checkout info -->
      <div :class="isLoading ? 'dimmed pointer-events-none' : '' " class="w-full mt-5 p-10 overflow-auto ">
        <div class="flex items-center justify-between">
            <h1>
                <NuxtLink to="/">
                    <img src="/assets/logos/logo.png" alt="aktivfits" class="h-6">
                </NuxtLink>
            </h1>
            <NuxtLink to="/cart">
                <UTooltip text="Cart" class="text-xl" :popper="{placement:'top'}">
                    <UIcon name="i-heroicons-shopping-bag" class="text-2xl"/>
                </UTooltip>
            </NuxtLink>
        </div>
        <div class="mt-5">
            <h1 class="small-title">Contact</h1>
        </div>
        <!-- input form -->
        <UForm validate-on="submit" :schema="schema" :state="state" class="space-y-5 mt-5" @submit="onSubmit">
            <UFormGroup required label="Email" name="email">
                <UInput v-model="state.email" size="xl" color="dark"/>
            </UFormGroup>

            <h1 class="small-title pt-3">Delivery</h1>

            <UFormGroup label="Country/Region" name="country">
                <UInput v-model="state.country" disabled size="xl"/>
            </UFormGroup>

            <div class="names flex justify-between gap-5">
                <UFormGroup required class="w-full" label="First name" name="firstName">
                    <UInput v-model="state.firstName" type="text"  size="xl" color="dark"/>
                </UFormGroup>
                <UFormGroup required label="Last name" class="w-full" name="lastName">
                    <UInput v-model="state.lastName" type="text"  size="xl" color="dark"/>
                </UFormGroup>
            </div>

            <UFormGroup required label="Complete address" class="w-full" name="lastName">
                <UInput v-model="state.address" type="text"  size="xl" color="dark"/>
            </UFormGroup>     
            
            <div class="city postal flex justify-between gap-5">
                <UFormGroup required class="w-full" label="City" name="city">
                    <UInput v-model="state.city" type="text"  size="xl" color="dark"/>
                </UFormGroup>
                <UFormGroup required label="Postal code" class="w-full" name="postal">
                    <UInput v-model="state.postal" type="text"  size="xl" color="dark"/>
                </UFormGroup>
            </div>

            <UFormGroup required label="Mobile no." class="w-full" name="lastName">
                <UInput v-model="state.mobile" type="text"  size="xl" color="dark"/>
            </UFormGroup> 

            <h1 class="text-xl font-semibold pt-3">Shipping method</h1>

            <UFormGroup class="w-full" name="shipping">
                <UInput class="bg-gray-200" v-model="state.shipping" type="text" disabled size="xl" />
            </UFormGroup>

            <h1 class="text-xl font-semibold pt-3">Payment</h1>

            <UFormGroup class="w-full" name="payment" description="All transactions are secure and encrypted.">
                <UInput class="my-2 bg-gray-200" v-model="state.payment" type="text" disabled size="xl" />
            </UFormGroup>

            <SolidButton type="submit" name="Complete Order" class="rounded w-full text-center block py-3"/>
        </UForm>
        
    </div>
    <!-- products info -->
    <div :class="isLoading ? 'dimmed pointer-events-none' : '' " class="w-full h-full bg-gray-200 myborder-l lg:ml-5 pt-10 px-10 pb-5 overflow-auto">
        <!-- products -->
        <div class="space-y-5">
            <div v-for="item in cartData" :key="item.id" class="flex justify-between items-center">
                <div class="flex gap-5">
                    <div class="relative">
                        <div class="quantity absolute opacity-80 -right-3 -top-3 rounded-full bg-neutral-700 py-[1px] px-2 text-white">
                            {{ item.quantity }}
                        </div>
                        <img class="h-20 w-20 rounded bg-cover object-cover" :src="item.img" alt="product image">
                    </div>
                    <div class="flex flex-col justify-center">
                        <h1 class="font-semibold">{{ item.name }}</h1>
                        <p class="text-dull2">{{ item.size }}</p>
                    </div>
                </div>
                <h1>Rs.{{ item.price * item.quantity}}</h1>
            </div>
        </div>
        <!-- total cal -->
        <div class="mt-10 space-y-3">
            <!-- subtotal -->
            <div class="flex justify-between items-center text-sm">
                <h1>Subtotal ({{ cartData.length }} - items)</h1>
                <p>Rs. {{ subTotal }}</p>
            </div>
            <!-- shipping -->
            <div class="flex justify-between items-center text-sm">
                <h1>Shipping</h1>
                <p>Rs. 220</p>
            </div>
            <!-- total -->
            <div class="flex justify-between items-center font-semibold text-2xl">
                <h1 class="font-semibold text-xl">Total</h1>
                <p> <span class="text-sm text-dull2">PKR</span> Rs. {{ subTotal + 220 }}</p>
            </div>
            <p class="text-dull2 text-sm">Including Rs 0.00 in taxes</p>
        </div>
    </div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
import { collection, addDoc } from 'firebase/firestore';
import { object, string } from 'yup';

const cartData = useState('cartData');
const subTotal = useState('subTotal');
const router = useRouter();
const db = nuxtApp.$firestore;
const isLoading = ref(false);


const schema = object({
  email: string().email('Invalid email').required('Required'),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  address: string().required('Required'),
  postal: string().required('Required'),
  mobile: string().required('Required'),
  city: string().required('Required'),
});

const state = reactive({
  email: undefined,
  country: 'Pakistan',
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  postal: undefined,
  city: undefined,
  mobile: undefined,
  shipping: 'Delivery Charges - Rs. 220',
  payment:'Cash on Delivery (COD)'
});

async function onSubmit (event) {
  completeOrder();
}

const completeOrder = async () => {
    try {
        isLoading.value = true;

        const docRef = await addDoc(collection(db, 'orders'),{
            email: state.email,
            name : state.firstName + ' ' + state.lastName,
            address: state.address,
            postal: state.postal,
            city: state.city,
            mobile: state.mobile,
            totalPrice: subTotal.value + 220,
            // items
            products: cartData.value.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                size: item.size ? item.size : '',
                bundleProducts: item.bundleProducts ? item.bundleProducts.map((bundleItem) => ({
                    name:bundleItem.name,
                    size: bundleItem.size
                })) : []
            }))
        });

        isLoading.value = false;
        state.email = '';
        state.address = '';
        state.city = '';
        state.firstName = '';
        state.lastName = '';
        state.mobile = '';
        state.postal = '';

        cartData.value = [];
        subTotal.value = 0;

        router.push(`/thank-you-${docRef.id}`);
        

    } catch (error) {
        console.error('Error adding product: ', error);
    }
};

</script>

<style lang="css" scoped> 

</style>