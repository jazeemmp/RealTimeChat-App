# API Documentation

## Chat Endpoints

### Create New Chat
- **Method:** POST
- **Endpoint:** `/api/chat/create`
- **Access:** Private
- **Description:** Creates a new chat.

---

### Get All Chats of a Specific User
- **Method:** GET
- **Endpoint:** `/api/chat/`
- **Access:** Private
- **Description:** Retrieves all chats for the authenticated user.

---

### Get One Chat Between Two Users
- **Method:** GET
- **Endpoint:** `/api/chat/find/:firstId/:secondId`
- **Access:** Private
- **Description:** Fetches the chat between two specific users based on their IDs.

---

## Message Endpoints

### Create a New Message
- **Method:** POST
- **Endpoint:** `/api/message`
- **Access:** Private
- **Description:** Creates a new message in a chat.

---

### Get All Messages for a Specific Chat
- **Method:** GET
- **Endpoint:** `/api/message/:chatId`
- **Access:** Private
- **Description:** Retrieves all messages from a specified chat.
