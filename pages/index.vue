<template>
  <div class="p-5">
    <div class="flex justify-around pt-5">
      <IconField class="flex w-[80%]">
        <InputIcon class="pi pi-search" style="color: white;"/>
        <InputText v-model="search" type="text" class="rosarivo-regular inp_text w-full" placeholder="Browse your favourite products..."/>
      </IconField>
      <i class="pi pi-spin pi-shopping-cart" @click="router.push('/cart')" style="font-size: 2rem">{{ count }}</i>
    </div>
    <div class="flex gap-5 pt-5 flex-wrap w-full justify-center">
      <Card v-for="item in searchHandler(data)" class="w-[45%]" @click="router.push(`/products/${item.id}`)">
        <template #header>
          <img :src="'https://minecraft-front.cloudpub.ru/assets/' + item.image" class="rounded-4xl h-50 object-contain bg-white w-full">
        </template>
        <template #title>
          <div class="flex text-2xl rosarivo-regular pb-2">
              <div class="flex gap-1">
              <Icon name="material-symbols:star" class="pi-spin" style="color: white" />
              <p class="rosarivo-regular text-lg items-center">
                {{ item.rating }}
              </p>
            </div>
          </div>
          <p class="rosarivo-regular">{{ item.title }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const cart = useLocalStorage('cart' , [])
const count = ref(0)
const { data, status } = await useAsyncData(
  'products',
  () => $fetch('/api/products')
)

const search = ref("")
const searchHandler = (data) => {
  count.value = 0;
  cart.value.forEach((e) => {
    const productCount = e.count ? e.count : 1;
    count.value += productCount;
  }) 

  if(search.value === "") {
    return data
  }
  return data.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()));
}
</script>

<style>
.inp_text{
  background-color: rgba(23, 16, 23, 1);
  color: white;
  border: 0px;
  border-radius: 10px;
}
</style>