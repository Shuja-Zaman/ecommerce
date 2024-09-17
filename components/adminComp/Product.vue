<template>
  <div class="p-2 flex flex-col-reverse justify-around" v-bind:class="isLoading ? 'opacity-40 pointer-events-none' : ''">
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 overflow-auto">
      <ProductCard class="mx-auto" v-for="product in products" :key="product.id" :item="product"/>
    </div>
    <div class=" mb-10">
      <!-- form -->
    <UForm validate-on="submit" :schema="schema" :state="state" class="space-y-5 mt-5 w-1/2 mx-auto" @submit="onSubmit">
        <!-- Product Name -->
        <UFormGroup required label="Product Name" name="name">
          <UInput v-model="state.name" size="xl" color="dark"/>
        </UFormGroup>

        <!-- Product Price -->
        <UFormGroup required label="Product Price" name="price">
          <UInput type="number" v-model="state.price" size="xl" color="dark"/>
        </UFormGroup>

         <!-- Product Sizes (Checkboxes) -->
         <UFormGroup required label="Product Sizes" name="sizes">
          <div v-for="size in sizes" :key="size">
            <input type="checkbox" :value="size" @change="toggleSize(size)" />
            <label class="text-lg px-2">{{ size }}</label>
          </div>
        </UFormGroup>

        <!-- Product Images -->
        <UFormGroup required label="Product Images" name="images">
          <input type="file" multiple @change="handleFileUpload" />
        </UFormGroup>

        <!-- Category Selection Dropdown -->
        <UFormGroup required label="Category" name="categoryId">
          <select v-model="state.categoryId" class="p-2 border rounded">
            <option disabled value="">Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </UFormGroup>

        <SolidButton type="submit" name="Add product" class="rounded  text-center block mx-auto py-3"/>
    </UForm>
    </div>
  </div>
</template>

<script setup>
const { products, isLoading } = useFetchProducts();
const { categories } = useFetchCategories();
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
  sizes: array().min(1),
  images: array().min(1, 'At least one image is required'),
  categoryId: string().required('Requires')
});

// Sizes array
const sizes = ['S', 'M', 'L', 'XL'];

// Form state
const state = reactive({
  name: undefined,
  price: undefined,
  sizes: [],
  images: [],
  categoryId: undefined,
});

// Toggle selected size
const toggleSize = (size) => {
  if (state.sizes.includes(size)) {
    state.sizes = state.sizes.filter(s => s !== size);
  } else {
    state.sizes.push(size);
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
    await uploadImagesAndAddProduct();
  } else {
    console.error('No images selected');
  }
}

// Upload images and get URLs
const uploadImagesAndAddProduct = async () => {
  try {
    isLoading.value = true;

    const imageUrls = [];
    for (let i = 0; i < state.images.length; i++) {
      const imageFile = state.images[i];
      const imageRef = Ref(storage, `productImages/${imageFile.name}`);
      
      // Upload image
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    // Add product with image URLs
    const docRef = await addDoc(collection(db, 'products'), {
      name: state.name,
      price: state.price,
      sizes: state.sizes,
      imgUrls: imageUrls,
      categoryId: `/categories/${state.categoryId}`, // Store categoryId with the product
    });


    // Reset form
    state.name = '';
    state.price = '';
    state.sizes = [];
    state.images = [];
    state.categoryId = '';
  } catch (error) {
    console.error("Error adding product:", error);
  } finally {
    isLoading.value = false;
  }
}

</script>

<style>

</style>