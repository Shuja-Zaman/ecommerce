// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      meta:[
        { name:'google-site-verification', content:'nBru1K8NLBn229WD1WVzrd8UwWuv3hmSeAvCZRP3OYA' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
      apiKey:process.env.FB_API_KEY,
      authDomain:process.env.FB_AUTH_DOMAIN,
      projectId:process.env.FB_PROJECT_ID,
      storageBucket:process.env.FB_STORAGE_BUCKET,
      senderId:process.env.FB_MESSAGING_SENDER_ID,
      appId:process.env.FB_APP_ID,
      measurementId:process.env.FB_MEASUREMENT_ID
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css:['~/assets/css/main.css'],
  modules: ['@nuxt/ui'],
  pages:true,
  components:[{
    path:'~/components',
    pathPrefix:false
  }]
})