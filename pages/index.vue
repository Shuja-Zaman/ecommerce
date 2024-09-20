<template>
  <div class="min-h-screen flex flex-col">
    
    <div class="h-screen flex flex-col justify-center items-center main">
      <h1 class="title px-1"> <span class="text-highlight">Pakistan's</span> Premium Aktiv-wear.</h1>
      <h1 class="italic border-2 p-1 m-2 border-neutral-900">Sleek and Modern design</h1>
      <div class="space-x-5">
          <!-- shop button -->
        <SolidButton name="Shop Now" to="/shop"/>
      </div>
    </div>

    <hr>

    <div class="my-10">
      <h1 class="text-center text-xl">We design durable "all day everyday activewear" with a conscience — 100% made in Pakistan.</h1>
    
      <div class="flex lg:w-[75%] lg:flex-row flex-col gap-10 items-center justify-center my-20  mx-auto">
        <img class="lg:w-1/2 w-full shadow-xl" src="/assets/images/show.jpg" alt="">
        <div class="lg:w-1/2 mx-10 leading-loose">
          <h1 class="font-light tracking-widest text-xl">Brand new</h1>
          <h1 class="text-3xl font-extrabold">Aktive-Wear</h1>
          <h1 class="text-lg tracking-tighter">Don't forget to check out our comfy t-shirts, raglans, trousers and more.</h1>
        </div>
      </div>

      <div class="lg:mt-52 my-36">
        <h1 class="text-center title">Featured.</h1>

        <div class="grid lg:grid-cols-4 grid-cols-2 m-5 gap-5">

          <BundleCard class="" v-for="item in bundles" :key="item.id" :item="item"/>
          <ProductCard v-for="item in products.slice(2, 4)" :key="item.id" :item="item" />
        </div>
      </div>

      <!-- why shop with us -->
      <div class="flex lg:w-[75%] lg:flex-row flex-col gap-10 items-center justify-center my-20  mx-auto">
        <img class="lg:w-1/2 w-full shadow-2xl" src="/assets/images/blueTrouser.jpg" alt="">
        <div class="lg:w-1/2 leading-loose mx-10">
          <h1 class="font-light tracking-widest text-xl py-5">A Journey</h1>
          <h1 class="text-3xl font-extrabold tracking-tighter">WHY AKTIV-FITS</h1>
          <h1 class=" text-lg tracking-tighter">
            In a sea of online stores, what truly distinguishes Aktiv is our commitment to you. We believe that lasting relationships are built on trust, quality, and care. That’s why we pour our passion into every detail, ensuring that our products speak for themselves and that you always feel valued.
          </h1>
          <SolidButton name="Shop Now" class="mt-5"/>
        </div>
      </div>

    
    </div>

  </div>
</template>

<script setup>
const { products } = useFetchProducts();
const { bundles } = useFetchBundles();


</script>

<style scoped>
.main{
  background-image: url('/assets/images/background.png');
  background-size: cover;
  object-fit: cover;
}

</style>

