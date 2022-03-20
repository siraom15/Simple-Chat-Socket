<script setup lang="ts">
import io from "socket.io-client";
import { computed, onBeforeMount, Ref, ref } from "vue";
import ChatBox from "./components/ChatBox.vue";
import RoomBox from "./components/RoomBox.vue";

const socket = io("http://localhost:3000");
const currentMessages: Ref<Array<Object>> = ref([]);
const roomId: Ref<String> = ref("");

const getCurrentMessage = computed(() => currentMessages);

onBeforeMount(() => {
  socket.on("connect", () => {
    console.log("connected");
  });
});
const joinRoom = (EmitRoomId: string) => {
  console.log("client joinning", roomId);
  socket.emit("join_room", { roomId: roomId });
  roomId.value = EmitRoomId;
};
const sendMessage = (EmitMessage: string) => {
  socket.emit("message", { message: EmitMessage });
  let sendMessage = {
    sender: "Me",
    message: EmitMessage,
  };
  console.log(`Send : `, sendMessage);

  currentMessages.value.push(sendMessage);
};
socket.on("joined_room", (data: any) => {
  console.log("joined_room", data);
});
socket.on("message", (data: any) => {
  console.log("message", data);
  currentMessages.value.push(data);
});
</script>

<template>
  <div class="container p-10">
    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <div class="row-span-3">
        <RoomBox @joinRoom="joinRoom" />
      </div>
      <div class="row-span-2 col-span-2">
        <ChatBox
          :roomId="roomId"
          :currentMessages="currentMessages"
          @sendMessage="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
