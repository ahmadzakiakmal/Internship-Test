"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditIcon from "@/../public/edit.svg";

interface Comment {
  id: number;
  message: string;
  sender: string;
  type: "text" | "image" | "video";
}

interface User {
  id: string;
  name: string;
  role: 0 | 1 | 2; // 0 = Admin | 1 = Agent | 2 = Customer
}

interface Room {
  name: string;
  id: number;
  image_url: string;
  participants: User[];
}

interface Channel {
  room: Room;
  comments: Comment[];
}

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<number>(0);
  useEffect(() => {
    GetData();
  }, []);
  return (
    <main className="bg-white min-h-screen font-lato">
      <aside className="bg-gradient-to-bl from-purple from-30% to-[#3D108F] w-[320px] min-h-screen flex">
        <section className="flex flex-col py-5 px-4 gap-4 box-border border-r border-white/30 flex-shrink-0">
          {channels.length > 0 &&
            channels.map((channel, index) => {
              return (
                <button
                  key={channel.room.id}
                  className={"size-8 rounded-[5px] overflow-hidden " + (activeChannel == index ? "outline outline-white outline-offset-4" : "hover:outline outline-white/20 outline-offset-4")}
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
              "bg-[#DEDEDE] size-8 rounded-[5px] grid place-items-center text-purple text-[20px] cursor-pointer hover:opacity-90 " +
              (channels.length <= 0 && "animate-pulse")
            }
          >
            {channels.length > 0 && "+"}
          </div>
        </section>

        <section className="w-full">
          <div className="flex justify-between items-center gap-4 border-b border-white/30 py-5 px-4">
            {channels.length > 0 ? (
              <p className="font-bold">{channels[activeChannel]?.room.name}</p>
            ) : (
              <div className="w-full h-8 bg-[#DEDEDE] animate-pulse rounded-[5px]" />
            )}
            <button className="bg-white size-7 rounded-full relative grid place-items-center hover:bg-[#DEDEDE]"><Image src={EditIcon} alt="Edit Icon" className="w-[15px] flex-shrink-0 cursor-pointer absolute" /></button>
          </div>
        </section>
      </aside>
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
