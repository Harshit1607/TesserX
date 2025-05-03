import { createNewChat, getLatestChat, viewChat, getGroup } from '../controllers/Society/chatController';

export const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // Send message
    socket.on('newChat', async ({ text, user, group, isMedia }) => {
      try {
        const newChatData = await createNewChat({ text, user, group, isMedia });

        const GroupData = await getGroup(group);
        if(!GroupData) return;
        const recipients = GroupData.Users.map(id => id.toString()).filter(id => id !== user);

        recipients.forEach(recipient => {
          socket.to(recipient).emit("new message", { newChat: newChatData });
        });

        io.to(user).emit("new message", { newChat: newChatData });

      } catch (error) {
        console.error('Error while sending chat:', error);
        socket.emit('error', 'Unable to send chat');
      }
    });

    // Send latest message
    socket.on('latestChat', async ({ group }) => {
      try {
        const message = await getLatestChat({ group });
        if (message) {
          socket.emit("latestChat", { message });
        }
      } catch (error) {
        console.error("Error fetching latest chat:", error);
      }
    });

    // Mark messages as viewed
    socket.on('viewChat', async ({ group, user }) => {
      try {
        const viewedChats = await viewChat({ group, user });
        io.to(group).emit("viewChat", { viewedChats });
      } catch (error) {
        console.error("Error viewing chat:", error);
      }
    });

    // Typing indicators
    socket.on('typing', ({ group, user }) => {
      socket.to(group).emit('typing', { typing: true, by: user });
    });

    socket.on('stop typing', ({ group, user }) => {
      socket.to(group).emit('stop typing', { typing: false, by: user });
    });
  });
};