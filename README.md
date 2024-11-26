# Internship-Test

## 1. System Architecture Diagram

- **General Architecture Diagram**

![](./assets//General%20Architecture.png)

The system consists of four main entities, the clients, the server, the message broker, and the database.

Clients can interact with the server to request and receive data, along with sending messages.

The server is responsible to fetch data from the database and pass them to clients or write data into it. It is also responssible to handle user messages, validating them, and forwarding it to the broker.

The broker is responsible to broadcast a message received from the server to the destined recipients, be it individual or a group chat. This feature may need an event-driven publish-subscribe communication to support the real-time and multi-recipient requirement to be implemented.

The database, is used to store messages, allowing them to persist thus enable users to view past messages.

- **Messaging Activity Diagram**

![](./assets/Messaging%20Activity%20Diagram.png)

When a user sends a message, the server will receive it. Before processing it further, it will validate the message first via some process, an example would be an authentication of the sender. If the sender if not authenticated, an error should be handled and an error message should be sent. If the user is authenticated, the server will proceed to save the message to the database, then forwards it to the broker. The broker will then broadcast the message to the recipients. 

A event-driven communication seems ideal for this case, because it allows the message to be received in real-time. As for the group chat (multiple recipients), a publish-subscribe communication is ideal as it allows members of the same group to simply be subscribed to the same topic/channel to receive the group message.

## 2. Entity-Relation Diagram

![](./assets/Entity%20Relation%20Diagram.png)

The database has 3 main entities, that is User, Message, and Group. 

Users wil be stored with a unique primary key, the `user_id`. Alongside that, the credentials and personal data of the user will be stored too, like the `username`, `email`, and the hashed value of the `password`. More attributes can be added if as the system grows, however for a basic concept, these should suffice.

Messages have a unique identifier, the `message_id`. It also requires foreign keys. The first one is sender_id, the id of the sender to tell who sends this message. The other two is `recipient_id` and `group_id`. Both are nullable, with a message only havine either. If the message is a personal chat, then it will only have a recipient_id of the receiving person. Meanwhile if the message is a group message, then it will only have a `group_id` to indicate which group this message belongs to. The `type` attribute represents the media type of the message, either a normal text, an image, or possible videos or sticker. The application can then determine the message based on this, then shows the `content` accordingly. Each message also has the `time` property to know when it was sent, along with a `status` property which shows wether or not the message is sent or pending.

The Group entity has a unique identifier `group_id` to distinguish one with another. It also has the `created_by` attribute to show the creator of the group, together with the time it was created in the `created_at` attribute.

Besides the 3 tables representing the main entities, a fourth table is required to map the membership of groups. I designed it to have a unique identifier `membership_id` as the primary key. Then it will map a user represented by `user_id` to a group with id value of `group_id`. To keep note of when a user joined a group, the `created_at` property is added. Another attribute can be added as a combination of the `user_id` and `group_id` set as UNIQUE. When a new membership is added, we can check this to determine if it is a duplicate or not.

## 3. Chat Page Interface