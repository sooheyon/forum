"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode({ mode }) {
  let router = useRouter()

  const changeDarkModeCookie = (mode) => {
    document.cookie = "mode=" + mode + "; max-age=" + 3600 * 24 * 10;
  };

  const onClickDarkMode = () => {
    console.log(mode)
    changeDarkModeCookie(mode === "dark" ? "light" : "dark");
    router.refresh()
  };

  useEffect(() => {
    let modeCookie = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];

    if (modeCookie == "") {
      changeDarkModeCookie("light");
    }
  }, []);

  return (
    <span className="dark-mode-button" onClick={onClickDarkMode}>{mode === "light" ? "🌙" : "☀️"}</span>
  );
}
