import { collection, getDocs } from "firebase/firestore";

export const useFetchBundles = () => {
    const bundles = ref([]);
    const isLoading = ref(true);

    const fetchBundles = async () => {
        try {
            const nuxtApp = useNuxtApp();
            const db = nuxtApp.$firestore;
            const bundlesRef = await getDocs(collection(db,'bundles'));
            bundles.value = bundlesRef.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching Bundles: ',error);
        }finally{
            isLoading.value = false;
        }
    }

    fetchBundles();

    return {
        bundles, isLoading
    };
};


