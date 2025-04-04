<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
</template>

<script lang="ts" setup>
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())
useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<style>

</style>