<template>
  <div class="w-full h-full">
    <div v-if="status !== 'success'">
      Загрузка!
    </div>
    <div v-else class="p-5">
      <div v-if="card" class="flex flex-col gap-2">
        <img class="rounded-4xl h-130 object-contain bg-white" :src="'https://minecraft-front.cloudpub.ru/assets/' + card.image" alt="Product Image" />
        <h1 class="flex text-2xl rosarivo-regular pt-5 gap-5">
          {{ card.title }}
          <div class="flex gap-1">
            <Icon name="material-symbols:star" style="color: white;" />
            <p class="rosarivo-regular text-lg items-center">
              {{ card.rating }}
            </p>
          </div>
        </h1>
        <p class="rosarivo-regular grap" @click="card.collapse = false">{{ description }}</p>

        <div class="flex items-center justify-between gap-8 footer p-5">
          <div>
            <label class="rosarivo-regular">Price</label>
            <div class="text-2xl rosarivo-regular">₹{{ card.price }}</div>
          </div>
          <Button label="Submit" @click="addCartOrToHome(card)" size="large" class="w-full round"></Button>
        </div>
      </div>
      <div v-else>
        Продукт не найден
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, status } = await useAsyncData(
  'products',
  () => $fetch('/api/products')
)

const route = useRoute()
const router = useRouter()
const card = ref({
  id: 0,
  collapse: false,
  description: "",
  title: "",
  image: "",
  rating: 0,
  price: 0
})
const cart = useLocalStorage('cart' , [])
const description = computed(() => {
  if(card.value.collapse) {
    return card.value.description.slice(0, 50) + ' ...Read more'
  }
  return card.value.description
})

const addCartOrToHome = (item) => {
  cart.value.push(item)
  router.push('/')
}

onMounted(() => {
  if (data) {
    const _card = data.value.find((item) => item.id == route.params.id)
    if (_card) {
      card.value = {
        id: _card.id,
        image: _card.image,
        rating: _card.rating.rate,
        title: _card.title,
        description: _card.description + _card.description,
        collapse: true,
        price: _card.price,
      }
    }
  }
})

</script>

<style scoped>


</style>
