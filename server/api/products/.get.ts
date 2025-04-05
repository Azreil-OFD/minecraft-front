export default defineEventHandler(async (event) => {
  const data = await $fetch('https://minecraft-front.cloudpub.ru/items/products?fields=*')
  return data.data
})
