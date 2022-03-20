<script setup lang="ts">
const props = defineProps({
  serverStatus: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div
    class="flex absolute top-5 right-5 items-center p-4 space-x-4 w-full max-w-xs rounded-lg divide-x divide-gray-200 shadow space-x"
    :class="
      serverStatus
        ? ['bg-green-400', 'text-white']
        : ['bg-red-600', 'text-white']
    "
    role="alert"
  >
    <div class="text-md font-normal">
      {{ serverStatus ? 'Connected To Server' : 'Server Error' }}
    </div>
  </div>
</template>
