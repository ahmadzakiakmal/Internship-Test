import { Comment, User } from "@/data/types";

interface Props {
  comment: Comment;
  participants: User[];
}

export default function ChatBubble({ comment, participants }: Props) {
  const senderDetails = participants.find((participant) => {
    return participant.id == comment.sender;
  });
  const isAdmin = comment.sender === "Admin";
  return (
    <main className="w-full text-[12px] text-black flex justify-start  py-2">
      <div className="">
        <p className="font-bold">
          {senderDetails?.name}{" "}
          <span className="text-[10px]">{comment.sender}</span>
        </p>
        <p>{comment.message}</p>
      </div>
    </main>
  );
}
