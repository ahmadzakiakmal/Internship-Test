export interface Comment {
  id: number;
  message: string;
  sender: string;
  type: "text" | "image" | "video";
  content: string;
}

export interface User {
  id: string;
  name: string;
  role: 0 | 1 | 2; // 0 = Admin | 1 = Agent | 2 = Customer
}

export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: User[];
}

export interface Channel {
  room: Room;
  comments: Comment[];
}
