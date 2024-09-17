<template>
    <div class="p-2 flex flex-col-reverse justify-around" v-bind:class="isLoading ? 'opacity-40 pointer-events-none' : ''">
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 overflow-auto">
        <BundleCard class="mx-auto" v-for="bundle in bundles" :key="bundle.id" :item="bundle"/>
      </div>
      <div class=" mb-10">
        <!-- form -->
      <UForm validate-on="submit" :schema="schema" :state="state" class="space-y-5 mt-5 w-1/2 mx-auto" @submit="onSubmit">
          <!-- Product Name -->
          <UFormGroup required label="Bundle Name" name="name">
            <UInput v-model="state.name" size="xl" color="dark"/>
          </UFormGroup>
  
          <!-- Product Price -->
          <UFormGroup required label="Bundle Price" name="price">
            <UInput type="number" v-model="state.price" size="xl" color="dark"/>
          </UFormGroup>

          <UFormGroup required label="Bundle products" name="products">
            <div v-for="product in products" :key="product.id">
                <input type="checkbox" :value="product" @change="toggleProductSelection(product)"/>
                <label class="text-lg px-2">{{ product.name }}</label>
            </div>
          </UFormGroup>
  
          <!-- bundle Image -->
          <UFormGroup required label="Bundle Image" name="images">
            <input type="file" multiple @change="handleFileUpload" />
          </UFormGroup>
  
          <SolidButton type="submit" name="Add bundle" class="rounded  text-center block mx-auto py-3"/>
      </UForm>
      </div>
    </div>
  </template>
  
  <script setup>
  const { products, isLoading } = useFetchProducts();
  const { bundles } = useFetchBundles();
  import { collection, addDoc } from 'firebase/firestore';
  import { uploadBytes, getDownloadURL, ref as Ref } from 'firebase/storage';
  import { object, string, number, array } from 'yup';
  const nuxtApp = useNuxtApp();
  const db = nuxtApp.$firestore;
  const storage = nuxtApp.$storage;
  
  // Schema validation
  const schema = object({
    name: string().required('Required'),
    price: number().required('Required').positive().integer(),
    bundleProducts: array().min(1),
    images: array().min(1, 'At least one image is required'),
  });

  // Form state
  const state = reactive({
    name: undefined,
    price: undefined,
    images: [],
    bundleProducts:[],
  });
  
  const toggleProductSelection = (product) => {
  const index = state.bundleProducts.findIndex(p => p.id === product.id);
  if (index === -1) {
    state.bundleProducts.push(product);  // Add product if not selected
  } else {
    state.bundleProducts.splice(index, 1);  // Remove product if already selected
  }
};


  // Handling file uploads
  const handleFileUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      state.images.push(files[i]);
    }
  };
  
  // Function to add product
  async function onSubmit () {
    if (state.images.length) {
      await uploadImagesAndAddBundle();
    } else {
      console.error('No images selected');
    }
  }
  
  // Upload images and get URLs
  const uploadImagesAndAddBundle = async () => {
    try {
      isLoading.value = true;
  
      const imageUrls = [];
      for (let i = 0; i < state.images.length; i++) {
        const imageFile = state.images[i];
        const imageRef = Ref(storage, `bundleImages/${imageFile.name}`);
        
        // Upload image
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
  
      // Add product with image URLs
      const docRef = await addDoc(collection(db, 'bundles'), {
        name: state.name,
        price: state.price,
        imgUrls: imageUrls,
        bundleProducts: state.bundleProducts
      });
  
      // Reset form
      state.name = '';
      state.price = '';
      state.images = [];
      state.bundleProducts = [];
    } catch (error) {
      console.error("Error adding bundle:", error);
    } finally {
      isLoading.value = false;
    }
  }
  
  </script>
  
  <style>
  
  </style>