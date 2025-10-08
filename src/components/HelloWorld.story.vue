<script setup lang="ts">
import HelloWorld from "./HelloWorld.vue"
import { ref } from "vue"

const name = ref("Histoire")
</script>

<template>
  <Story>
    <HelloWorld :name="name" />
  </Story>
</template>

<style scoped></style>
