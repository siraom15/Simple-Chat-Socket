<script setup lang="ts">
import { ref } from "@vue/reactivity";

defineEmits(["joinRoom"]);

const roomId = ref("");

</script>

<template>
  <div
    class="p-4 mt-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
  >
    <h1 class="text-center text-xl font-bold">Join Room</h1>
    
    <form @submit.prevent="$emit('joinRoom', roomId)">
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="floating_room_id"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="roomId"
        />
        <label
          for="floating_room_id"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Input Room Id</label
        >
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Join
      </button>
    </form>
  </div>
</template>
