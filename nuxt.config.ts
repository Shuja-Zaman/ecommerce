// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title:'AktivFits',
      meta:[
        { charset: 'utf-8' },
        { name:'google-site-verification', content:'nBru1K8NLBn229WD1WVzrd8UwWuv3hmSeAvCZRP3OYA' },
        { key: 'description', name:'description', content:'Step into Aktiv, your ultimate destination for premium active-wear designed to empower your fitness journey. Whether you"re hitting the gym, running the trails, or simply embracing an active lifestyle, our collections combine style, comfort, and performance to keep you moving confidently. Enjoy AktivFits' }
      ],
      link:[
        { rel:'icon', type:'image/png', href:'/favicon.png' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
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