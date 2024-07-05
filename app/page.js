"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import Eyelash from "./_components/Eyelash";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";



export default function Home() {
  const [eyelash, setEyelash] = useState([]);
  useEffect(() => {
    getEyelash();
  }, [])
  const getEyelash = () => {
    GlobalApi.getEyelash().then(resp => {
      setEyelash(resp.data.data);
    })
  }
  return (
    <div>
      {/* Hero Section  */}
      <Hero />

      {/* Search bar + Categories  */}
      <CategorySearch />

      {/* Popular Doctor List  */}
      <Eyelash eyelashList={eyelash} />
    </div>
  );
}
