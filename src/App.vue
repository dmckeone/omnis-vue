<script setup lang="ts">
import { useOmnis } from "@/stores/omnis.ts"
import HelloWorld from "@/components/HelloWorld.vue"
import { computed, type Ref, toRef } from "vue"

const omnis = useOmnis()

// Extract data from $dataname
const data: Ref<{ name?: string }> = toRef(omnis, "data")
const name = computed(() => data.value?.name)

// Enable custom user events
const onUserEvent = (message: string) => {
  const payload = { message }
  omnis.emitEvent("user-event", JSON.stringify(payload))
}
</script>

<template>
  <div class="h-full min-h-screen">
    <div class="h-[97vh] m-2">
      <HelloWorld :name="name" />
      <button @click="() => onUserEvent('Hello!')">Click me!</button>
    </div>
  </div>
</template>
