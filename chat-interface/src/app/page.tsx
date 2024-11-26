"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    GetData();
  });
  return <main></main>;

  function GetData() {
    axios.get("https://gist.githubusercontent.com/asharijuang/23745f3132fa30e666db68d2bf574e4a/raw/5d556dbb9c2aea9fdf3e1ec96e45f62a88cea7b6/chat_response.json", {
      // mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
