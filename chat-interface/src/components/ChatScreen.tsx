import AttachIcon from "@/../public/attach.svg";
import SendIcon from "@/../public/send.svg";
import { Comment, User } from "@/data/types";
import Image from "next/image";
import { FormEvent } from "react";
import ChatBubble from "./ChatBubble";

interface Props {
    comments: Comment[];
    participants: User[];
}

export default function ChatScreen({comments, participants}: Props) {
  const sendMessage = () => {
    console.log("Submit");
  };
  return (
    <main className="bg-blue-500/20 min-h-screen max-h-screen w-full relative flex flex-col">
      <section className="bg-white flex-grow-[100%] flex-1 p-5 overflow-y-auto pb-[100px]">
        {comments?.map((comment) => {
            return(
                <ChatBubble key={comment.id} comment={comment} participants={participants} />
            )
        })}
      </section>
      <section className="bg-purple w-full flex-shrink-0 absolute bottom-0">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center p-5 gap-3"
        >
          <label>
            <div
              className="bg-white size-7 grid place-items-center rounded-full cursor-pointer hover:bg-[#DEDEDE]"
            >
              <Image
                src={AttachIcon}
                alt="Attach File"
                className="absolute w-[15px]"
              />
            </div>
            <input type="file" className="hidden" />
          </label>
          <textarea
            onKeyDown={(e) => {
              const pressedEnterWithoutShift = e.key == "Enter" && !e.shiftKey;
              if (pressedEnterWithoutShift) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="text-black flex-grow-[100%] flex-1 h-8 p-1 resize-none rounded-[5px] text-[14px]"
          />
          <button
            type="submit"
            className="bg-white hover:bg-[#DEDEDE] rounded-full size-7 grid place-items-center"
          >
            <Image
              src={SendIcon}
              alt="Send Message"
              className="w-[15px] absolute"
            />
          </button>
        </form>
      </section>
    </main>
  );
}
