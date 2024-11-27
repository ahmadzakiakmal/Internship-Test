# Internship-Test

## 1. System Architecture Diagram

- **General Architecture Diagram**

![](./assets//General%20Architecture.png)

The system consists of four main entities, the clients, the server, the message broker, and the database.

Clients can interact with the server to request and receive data, along with sending messages.

The server is responsible to fetch data from the database and pass them to clients or write data into it. It is also responssible to handle user messages, validating them, and forwarding it to the broker.

The broker is responsible to broadcast a message received from the server to the destined recipients, be it individual or a group chat. This feature may need an event-driven and publish-subscribe communication to support the real-time and multi-recipient requirement to be implemented.

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
![](./assets/Desktop%20View%201.png)

I designed the chat interface with a simple and clean concept inspired by Slack and Discord. 

I created a room navigation in the most left with room details to view and access medias, links, and room settings besides it (they don't do anything for now). Under these menus, participants of the room are shown along with their role badges.

The main part of the screen is the chat screen. This will show all the messages within the room.

The chat interface I developed can be accessed at [https://internship-test.ahmadzakiakmal.my.id](https://internship-test.ahmadzakiakmal.my.id)

The interface is also screen-responsive and adjusts itself depending on the screen width, the mobile preview is shown in the following image.

![](./assets/Mobile%20View.png)

## 4. JSON Extension

As instructed, I extended the provided JSON file. This can be accessed in the API I created at [https://internship-test.ahmadzakiakmal.my.id/api](https://internship-test.ahmadzakiakmal.my.id/api).


```
{
    "results": [
        {
            "room": {
                "name": "Product A",
                "id": 12456,
                "image_url": "https://picsum.photos/id/237/200/300",
                "participant": [
                    {
                        "id": "admin@mail.com",
                        "name": "Admin",
                        "role": 0
                    },
                    {
                        "id": "agent@mail.com",
                        "name": "Agent A",
                        "role": 1
                    },
                    {
                        "id": "customer@mail.com",
                        "name": "king customer",
                        "role": 2
                    }
                ]
            },
            "comments": [
                {
                    "id": 885512,
                    "type": "text",
                    "message": "Selamat malam",
                    "sender": "customer@mail.com"
                },
                {
                    "id": 885513,
                    "type": "text",
                    "message": "Malam",
                    "sender": "agent@mail.com"
                },
                {
                    "id": 885514,
                    "type": "text",
                    "message": "Ada yang bisa saya bantu?",
                    "sender": "agent@mail.com"
                },
                {
                    "id": 885515,
                    "type": "text",
                    "message": "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
                    "sender": "customer@mail.com"
                },
                {
                    "id": 885516,
                    "type": "text",
                    "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya",
                    "sender": "agent@mail.com"
                }
            ]
        },
        {
            "room": {
                "name": "Product B",
                "id": 12457,
                "image_url": "https://avatars.githubusercontent.com/u/144903134?s=400&u=1f6f214eb767a4f5abe44162bc741fa2a3b862a0&v=4",
                "participant": [
                    {
                        "id": "admin@mail.com",
                        "name": "Admin",
                        "role": 0
                    },
                    {
                        "id": "agent@mail.com",
                        "name": "Agent A",
                        "role": 1
                    },
                    {
                        "id": "ahmadzaki@mail.com",
                        "name": "Ahmad Zaki",
                        "role": 2
                    }
                ]
            },
            "comments": [
                {
                    "id": 885512,
                    "type": "text",
                    "message": "Selamat pagi",
                    "sender": "ahmadzaki@mail.com"
                },
                {
                    "id": 885513,
                    "type": "text",
                    "message": "Pagi, ada yang bisa saya bantu?",
                    "sender": "agent@mail.com"
                },
                {
                    "id": 885515,
                    "type": "text",
                    "message": "Saya ingin mengirimkan bukti pembayaran, karena di aplikasi selalu gagal",
                    "sender": "ahmadzaki@mail.com"
                },
                {
                    "id": 885516,
                    "type": "text",
                    "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya",
                    "sender": "agent@mail.com"
                },
                {
                    "id": 885517,
                    "type": "image",
                    "message": "Berikut bukti pembayarannya",
                    "sender": "ahmadzaki@mail.com",
                    "content": "https://avatars.githubusercontent.com/u/144903134?s=400&u=1f6f214eb767a4f5abe44162bc741fa2a3b862a0&v=4"
                },
                {
                    "id": 885518,
                    "type": "video",
                    "message": "Ini bukti video yang lebih jelas",
                    "sender": "ahmadzaki@mail.com",
                    "content": "https://github.com/ahmadzakiakmal/Internship-Test/raw/refs/heads/main/assets/sample_video.mp4"
                },
                {
                    "id": 885519,
                    "type": "text",
                    "message": "Baik, bukti sudah kami terima",
                    "sender": "agent@mail.com"
                }
            ]
        }
    ]
}
```

I added another room named "Produk B" which contains a message containing an image and a message containing a video (the video may or may not be available due to the limited hosting). There's currently two rooms where we can navigate through the room navigation as mentioned previously.

## **5. Handling Medias**

![](./assets/Desktop%20View%202.png)

I also added handlers to show medias, for now it supports text messages, images, and videos. The preview can be seen above.

We can also send a message (text only for now) as the Admin user, shown below.

![](./assets/Desktop%20View%203.png)
