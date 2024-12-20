import SendIcon from "@/../public/send.svg";
import MenuIcon from "@/../public/menu.svg";
import { Comment, User } from "@/data/types";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

interface Props {
  comments: Comment[];
  participants: User[];
  updateComments: (newComment: Comment) => void;
  allowChat: boolean;
  toggleMobileMenu: () => void;
}

export default function ChatScreen({
  comments,
  participants,
  updateComments,
  allowChat = false,
  toggleMobileMenu
}: Props) {
  const [message, setMessage] = useState<string>("");
  const [scrollTrigger, setScrollTrigger] = useState<boolean>(false);
  const scrollableSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isScrollableSectionAvailable = scrollableSectionRef?.current !== null;
    if (isScrollableSectionAvailable) {
      scrollableSectionRef.current.scrollTop =
        scrollableSectionRef.current.scrollHeight;
    }
  }, [scrollTrigger, scrollableSectionRef]);

  const sendMessage = () => {
    const messageIsEmpty = message === "";
    if (messageIsEmpty) {
      alert("Message is empty");
      return;
    }
    updateComments({
      id: Number(new Date().getMilliseconds()),
      message,
      content: "",
      sender: "admin@mail.com",
      type: "text",
    });
    setMessage("");
    setScrollTrigger(!scrollTrigger);
  };

  return (
    <main className="bg-blue-500/20 min-h-screen max-h-screen w-full relative flex flex-col">
      <section
        ref={scrollableSectionRef}
        className="bg-white flex-grow-[100%] flex-1 p-5 overflow-y-auto pb-[80px]"
      >
        {comments?.map((comment) => {
          return (
            <ChatBubble
              key={comment.id}
              comment={comment}
              participants={participants}
            />
          );
        })}
      </section>
      <section className="bg-purple w-full flex-shrink-0 absolute bottom-0 border-l border-white/30">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center p-5 gap-3"
        >
          {/* <label>
            <div className="bg-white size-7 grid place-items-center rounded-full cursor-pointer hover:bg-[#DEDEDE]">
              <Image
                src={AttachIcon}
                alt="Attach File"
                className="absolute w-[15px]"
              />
            </div>
            <input type="file" className="hidden" />
          </label> */}
          <button type="button" onClick={toggleMobileMenu} className="sm:hidden bg-white size-7 grid place-items-center rounded-full hover:bg-[#DEDEDE]">
              <Image
                src={MenuIcon}
                alt="Attach File"
                className="absolute w-[15px]"
              />
            </button>
          <textarea
            value={message}
            onKeyDown={(e) => {
              const pressedEnterWithoutShift = e.key == "Enter" && !e.shiftKey;
              if (pressedEnterWithoutShift) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={!allowChat}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className={"text-black flex-grow-[100%] flex-1 h-8 p-1 resize-none rounded-[5px] text-[14px] placeholder:text-white " + (allowChat ? "" : "cursor-not-allowed")}
            placeholder={allowChat ? "Write a message..." : "Loading..."}
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
