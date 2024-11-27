import { Comment, User } from "@/data/types";
import Image from "next/image";
import RoleBadge from "./RoleBadge";

interface Props {
  comment: Comment;
  participants: User[];
}

const roleColors = [
    "outline-blue-500 text-blue-500",
    "outline-red-500 text-red-500",
    "outline-green-600 text-green-600"
]

export default function ChatBubble({ comment, participants }: Props) {
  const senderDetails = participants.find((participant) => {
    return participant.id == comment.sender;
  });
  const hasImage = comment.type === "image";
  const hasVideo = comment.type === "video";
  return (
    <main className="w-full text-[12px] text-black flex justify-start py-2">
      <div className="">
        <div className="flex">
        <p className={"font-bold " + roleColors[Number(senderDetails?.role)]}>
          {senderDetails?.name}{" "}
          <span className="text-[10px]">{comment.sender}</span>
        </p>
        </div>
        <p>{comment.message}</p>
        {
            hasImage && (
                <img src={comment.content} alt="Image" className="w-[200px] rounded-[10px] outline outline-purple outline-1 mt-1" />
            )
        }
      </div>
    </main>
  );
}
