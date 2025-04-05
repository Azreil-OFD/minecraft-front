<template>
  <div class="p-5">
    <!-- Заголовок -->
    <div class="flex justify-center pt-5">
      <p class="rosarivo-regular text-xl">Cart</p>
    </div>
    <!-- Список Товаров -->
     <div class="pt-5">
       <Card>
         <template #content>
          <div class="flex flex-row justify-between">
            <div>
              <div>
                <!-- <img  :src="item.image" class="rounded-4xl h-35 object-contain bg-white"> -->
              </div>
              <div>
                <div class="rosarivo-regular text-xl">Title</div>
                <div class="rosarivo-regular text-xl">Price</div>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <div class="flex flex-row gap-4 bg-counter rounded-2xl">
                <Button label="-" class="round w-10 h-10"></Button>
                <p class="rosarivo-regular text-xl">5</p>
                <Button label="+" class="round w-10 h-10"></Button>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <!-- Сервисный сбор -->
    <div class="dashed-line"></div>
    <div>
      <div class="flex justify-between pb-5">
        <p class="rosarivo-regular text-xl">Delivery Charges</p>
        <p class="rosarivo-regular text-xl">₹{{ delivery }}</p>
      </div>
      <div class="flex justify-between">
        <p class="rosarivo-regular text-xl">Taxes</p>
        <p class="rosarivo-regular text-xl">₹{{ taxes }}</p>
      </div>
    </div>
    <!-- Итоговая стоимость -->
    <div class="dashed-line"></div>
    <div class="flex justify-between">
      <p class="rosarivo-regular text-xl">Grand Total</p>
      <p class="rosarivo-regular text-xl">₹{{ total }}</p>
    </div>
    <!-- Кнопка  items-center -->
     <div class="flex  justify-between gap-8 footer p-5">
       <Button label="PAY NOW" size="large" class="w-full round"></Button>
     </div>
  </div>
</template>

<script setup>

const delivery = ref(0)
const taxes = ref(0)
const total = ref(0)


</script>

<style>
.dashed-line {
  border-bottom: 2px dashed rgba(255, 255, 255, 0.2); /* Толщина, тип, цвет */
  margin: 20px 0; /* Отступы сверху и снизу (опционально) */
}

.bg-counter{
  background-color: rgba(255, 255, 255, 0.08);
}

.test{
  background-attachment: red;
}
</style>