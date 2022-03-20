<script setup lang="ts">
import { ref, Ref, toRef } from "vue";

const emits = defineEmits(["sendMessage"]);

const props = defineProps({
  roomId: {
    type: String,
    default: null,
  },
  currentMessages: {
    type: Array,
    require: true,
  },
});
const messageContent: Ref<String> = ref("");
</script>

<template>
  <div
    class="p-4 mt-5 max-w-full bg-white rounded-lg border border-gray-200 shadow-md"
  >
    <h1 class="text-center text-xl font-bold">Chat Room : {{ roomId }}</h1>
    <div
      v-for="(message, index) in currentMessages"
      :key="index"
      :class="message.sender == 'Me' ? ['bg-blue-300', 'text-white'] : []"
      class="p-4 mt-5 max-w-sm rounded-lg border border-gray-200 shadow-md"
    >
      {{ message.sender }} : {{ message.message }}
    </div>
    <form @submit.prevent="$emit('sendMessage', messageContent)">
      <div class="relative z-0 mb-6 w-full group mt-5">
        <input
          v-model="messageContent"
          type="text"
          name="floating_message"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_message"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Send Message</label
        >
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Send Message
      </button>
    </form>
  </div>
</template>

<style scoped></style>
