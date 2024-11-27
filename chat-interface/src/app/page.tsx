"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditIcon from "@/../public/edit.svg";
import DropdownIcon from "@/../public/dropdown.png";
import MenuIcon from "@/../public/menu.svg";
import RoleBadge from "@/components/RoleBadge";
import ChatScreen from "@/components/ChatScreen";
import { Channel, Comment } from "@/data/types";

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<number>(0);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    GetData();
  }, []);

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const updateComments = (newComment: Comment) => {
    const newChannels = channels.map((channel: Channel) => {
      const isTheUpdatedChannel =
        channel.room.id === channels[activeChannel].room.id;
      if (isTheUpdatedChannel) {
        channel.comments.push(newComment);
        return channel;
      } else {
        return channel;
      }
    });
    setChannels(newChannels);
    console.log(newChannels);
  };

  return (
    <main className="bg-white min-h-screen font-lato flex relative">
      <aside
        className={
          "bg-purple w-[320px] min-h-screen flex z-[10] transition-transform absolute sm:static sm:translate-x-0 " +
          (openMobileMenu ? "translate-x-0" : "translate-x-[-100%]")
        }
      >
        <section className="flex flex-col py-5 justify-between px-4 box-border border-r border-white/30 flex-shrink-0">
          <div className="flex flex-col gap-4">
            {channels.length > 0 &&
              channels.map((channel, index) => {
                return (
                  <button
                    key={channel.room.id}
                    className={
                      "size-6 md:size-8 rounded-[5px] overflow-hidden " +
                      (activeChannel == index
                        ? "outline outline-white outline-offset-4"
                        : "hover:outline outline-white/20 outline-offset-4")
                    }
                    onClick={() => {
                      setActiveChannel(index);
                    }}
                  >
                    <Image
                      src={channel.room.image_url}
                      alt={`${channel.room.name} image`}
                      className="w-full h-full"
                      width={32}
                      height={32}
                    />
                  </button>
                );
              })}
            <div
              className={
                "bg-[#DEDEDE] size-6 md:size-8 rounded-[5px] grid place-items-center text-purple text-[20px] cursor-pointer hover:opacity-90 " +
                (channels.length <= 0 && "animate-pulse")
              }
            >
              <p className="absolute">{channels.length > 0 && "+"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="sm:hidden self-end bg-white size-7 grid place-items-center rounded-full hover:bg-[#DEDEDE]"
          >
            <Image
              src={MenuIcon}
              alt="Attach File"
              className="absolute w-[15px]"
            />
          </button>
        </section>

        <section className="w-full text-[15px]">
          <div className="flex justify-between items-center gap-4 border-b border-white/30 py-5 px-4">
            {channels.length > 0 ? (
              <p className="font-bold">{channels[activeChannel]?.room.name}</p>
            ) : (
              <div className="w-full h-8 bg-[#DEDEDE] animate-pulse rounded-[5px]" />
            )}
            <button className="bg-white flex-shrink-0 size-7 rounded-full relative grid place-items-center hover:bg-[#DEDEDE]">
              <Image
                src={EditIcon}
                alt="Edit Icon"
                className="w-[15px] flex-shrink-0 cursor-pointer absolute"
              />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              Photos
              <Image src={DropdownIcon} alt="Dropdown" className="w-[10px]" />
            </div>
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              Videos
              <Image src={DropdownIcon} alt="Dropdown" className="w-[10px]" />
            </div>
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              Links
              <Image src={DropdownIcon} alt="Dropdown" className="w-[10px]" />
            </div>
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              Files
              <Image src={DropdownIcon} alt="Dropdown" className="w-[10px]" />
            </div>
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              Settings
              {/* <Image src={DropdownIcon} alt="Dropdown" className="w-[10px]" /> */}
            </div>
          </div>
          <div className="flex flex-col p-4 gap-2">
            <p>Participants</p>

            {channels.length > 0 && (
              <div className="flex flex-col gap-2 text-[12px]">
                {channels[activeChannel]?.room?.participant?.map((member) => {
                  return (
                    <div className="flex items-center gap-2" key={member.id}>
                      {member.name}
                      <RoleBadge role={member.role} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </aside>

      <ChatScreen
        comments={channels[activeChannel]?.comments}
        participants={channels[activeChannel]?.room?.participant}
        updateComments={updateComments}
        allowChat={channels.length > 0}
        toggleMobileMenu={toggleMobileMenu}
      />
    </main>
  );

  function GetData() {
    fetch("/api", {
      // mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((json) => json.json())
      .then((data) => {
        console.log(data.results);
        setChannels(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
