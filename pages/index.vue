<template>
  <div class="p-5">
    <div class="">
      <InputText type="text" class="rosarivo-regular inp_text" placeholder="Browse your favourite products..."/>
    </div>
    <!-- Список продуктов -->
    <div class="flex gap-5 pt-5 flex-wrap w-full justify-center">
      <Card v-for="item in data" class="w-[45%]">
        <template #header>
          <img  :src="item.image" class="rounded-4xl h-50 object-contain bg-white w-full">
        </template>
        <template #title>
          <div class="flex text-2xl rosarivo-regular pb-2">
              <div class="flex gap-1">
              <Icon name="material-symbols:star" style="color: white" />
              <p class="rosarivo-regular text-lg items-center">
                {{ item.rating.rate }}
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
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

const { data, status } = await useAsyncData(
  'products',
  () => $fetch('https://fakestoreapi.com/products')
)

</script>

<style>

.inp_text{
  background-color: rgba(23, 16, 23, 1);
  color: white;
  border: 0px;
}

.inp_text:focus{
  background-color: rgba(23, 16, 23, 1);
  color: white;
}

.inp_text:active{
  background-color: rgba(23, 16, 23, 1);
  color: white;
  border: 0px;
}

</style>