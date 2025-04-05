<template>
  <div class="p-5">
    <!-- Заголовок -->
    <div class="flex justify-center pt-5">
      <p class="rosarivo-regular text-xl">Cart</p>
    </div>
    <!-- Список товаров -->
    <div class="pt-5 flex flex-col gap-3">
      <Card v-for="item in uniqueProducts" :key="item.id">
        <template #content>
          <div class="flex flex-row justify-between">
            <div>
              <div>
                <!-- <img :src="item.image" class="rounded-4xl h-35 object-contain bg-white"> -->
              </div>
              <div>
                <div class="rosarivo-regular text-xl">{{ item.title }}</div>
                <div class="rosarivo-regular text-xl">₹{{ item.price }}</div>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <div class="flex flex-row gap-4 bg-counter rounded-2xl">
                <Button label="-" @click="decrement(item.id)" class="round w-10 h-10"></Button>
                <p class="rosarivo-regular text-xl">{{ item.count }}</p>
                <Button label="+" @click="increment(item.id)" class="round w-10 h-10"></Button>
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
    <!-- Кнопка -->
    <div class="flex justify-between gap-8 footer p-5">
      <Button label="PAY NOW" size="large" class="w-full round"></Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';



function calculateDeliveryCost(ratePerKm = 5) {
  const data = useGeolocation()
  if(!data) {
    return 0
  }
  // Извлекаем координаты из объекта
  const { latitude, longitude } = data.coords.value;

  // Координаты Ватикана
  const vatican = {
    latitude: 41.9029,
    longitude: 12.4534
  };

  // Функция для перевода градусов в радианы
  const toRad = value => value * (Math.PI / 180);

  // Переводим координаты в радианы
  const lat1 = toRad(latitude);
  const lon1 = toRad(longitude);
  const lat2 = toRad(vatican.latitude);
  const lon2 = toRad(vatican.longitude);

  // Вычисляем разницу координат
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Применяем формулу Хаверсина
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const earthRadiusKm = 6371;
  const distance = earthRadiusKm * c;

  // Вычисляем стоимость доставки
  const cost = distance * ratePerKm;

  return {
    distance: Number(distance.toFixed(2)), // расстояние в км
    cost: Number(cost.toFixed(2))          // стоимость в индийских рупиях
  };
}



const cart = useLocalStorage('cart', []);

const delivery = computed(() => 0);
const taxes = ref(0);
const total = computed(() => 0);

// Получаем корзину из localStorage.
// Пример начального содержимого:
// [
//   { "id": 2, "image": "...", "title": "Фотоальбом", "description": "...", "collapse": true, "price": 450 },
//   { "id": 1, "image": "...", "title": "Заставить человека сомневаться...", "description": "...", "collapse": true, "price": 10000 }
// ]
function getUniqueProducts(products) {
  const productMap = new Map();

  products.forEach(product => {
    // Если у продукта уже есть поле count, используем его, иначе считаем за 1
    const productCount = product.count ? product.count : 1;
    if (productMap.has(product.id)) {
      // Если продукт уже добавлен, прибавляем к существующему count значение текущего продукта
      productMap.get(product.id).count += productCount;
    } else {
      // Если продукт ещё не добавлен, устанавливаем его count равным productCount
      productMap.set(product.id, { ...product, count: productCount });
    }
  });

  return Array.from(productMap.values());
}
// При инициализации проверяем, что у каждого продукта есть свойство count,
// если его нет – устанавливаем значение 1.
onMounted(() => {
  console.log(coords)
  if (cart.value && cart.value.length > 0) {
    cart.value = getUniqueProducts(cart.value)

    cart.value = cart.value.map(product => ({
      ...product,
      count: (product.count != null && !isNaN(product.count)) ? product.count : 1
    }));
  }
});

// Вычисляемое свойство для получения уникальных товаров.
// Если в корзине окажутся дубликаты по id – они будут объединены с суммой count.
const uniqueProducts = computed(() => {
  const productMap = new Map();
  cart.value.forEach(product => {
    if (productMap.has(product.id)) {
      productMap.get(product.id).count += product.count;
    } else {
      productMap.set(product.id, { ...product });
    }
  });
  return Array.from(productMap.values());
});

// Функция для увеличения количества товара по id
function incrementProduct(products, id) {
  return products.map(product => {
    if (product.id === id) {
      return { ...product, count: product.count + 1 };
    }
    return product;
  });
}

// Функция для уменьшения количества товара по id.
// Если количество становится равным 0, товар удаляется из массива.
function decrementProduct(products, id) {
  return products.map(product => {
    if (product.id === id) {
      return { ...product, count: product.count - 1 };
    }
    return product;
  }).filter(product => product.count > 0);
}

const increment = (id) => {
  cart.value = incrementProduct(cart.value, id);
};

const decrement = (id) => {
  cart.value = decrementProduct(cart.value, id);
};
</script>

<style>
.dashed-line {
  border-bottom: 2px dashed rgba(255, 255, 255, 0.2);
  margin: 20px 0;
}

.bg-counter {
  background-color: rgba(255, 255, 255, 0.08);
}

.test {
  background-attachment: red;
}
</style>
