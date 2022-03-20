<script setup lang="ts">
import io from 'socket.io-client';
import { computed, onBeforeMount, Ref, ref } from 'vue';
import ChatBox from './components/ChatBox.vue';
import RoomBox from './components/RoomBox.vue';
import NameBox from './components/NameBox.vue';
import ServerStatusBox from './components/ServerStatusBox.vue';

const socket = io('http://localhost:3000');
const currentMessages: Ref<Array<Object>> = ref([]);
const roomId: Ref<String> = ref('general');
const displayName: Ref<String> = ref('');
const serverStatus: Ref<Boolean> = ref(false);

onBeforeMount(() => {
  socket.on('connection', (data) => {
    console.log(data);
    if (data) serverStatus.value = true;
    displayName.value = data.clientId;
    joinRoom(roomId.value);
  });
});

socket.on('message', (data: any) => {
  console.log('message', data);
  currentMessages.value.push(data);
});

const joinRoom = (targetRoomId: String) => {
  socket.emit('join_room', { roomId: targetRoomId });
  roomId.value = targetRoomId;
  currentMessages.value = [];
  currentMessages.value.push({
    sender: 'system',
    type: 'system',
    message: `You has joined the room`,
  });
};
socket.on('joined_room', (data: any) => {
  currentMessages.value.push({
    type: 'system',
    message: `${data.clientId} has joined the room`,
  });
});

const leaveRoom = (targetRoomId: String) => {
  socket.emit('leave_room', { roomId: targetRoomId });
};
socket.on('leaved_room', (data: any) => {
  currentMessages.value.push({
    type: 'system',
    message: `${data.clientId} has left the room`,
  });
});
const changeRoom = (data: any) => {
  leaveRoom(data.from);
  joinRoom(data.to);
};
const setDisplayName = (EmitName: String) => {
  displayName.value = EmitName;
};

const sendMessage = (EmitMessage: String) => {
  const sendedMessage = {
    type: 'client',
    sender: displayName.value,
    message: EmitMessage,
    roomId: roomId.value.length ? roomId.value : null,
  };
  const myMessage = {
    type: 'local',
    sender: 'Me',
    message: EmitMessage,
    roomId: roomId.value.length ? roomId.value : null,
  };
  socket.emit('message', sendedMessage);
  console.log(`Send : `, sendedMessage);
  currentMessages.value.push(myMessage);
};
</script>

<template>
  <div class="container p-20 mx-auto">
    <ServerStatusBox :server-status="serverStatus" />
    <div class="grid grid-cols-2 max-w-full">
      <div class="grid grid-row-3">
        <RoomBox @changeRoom="changeRoom" :currentRoomId="roomId" />
        <NameBox @setDisplayName="setDisplayName" :displayName="displayName" />
      </div>
      <div class="grid grid-row-1">
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
