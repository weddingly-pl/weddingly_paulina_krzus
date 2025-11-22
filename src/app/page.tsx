"use client";
import React, { useState  } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DataMiejsce from "./components/DataMiejsce";
import RSVP from "./components/RSVP";
import DrodzyGoscie from "./components/DrodzyGoscie";
import Kontakt from "./components/Kontakt";
import NaszaHistoria from "./components/NaszaHistoria";
import Nocleg from "./components/Nocleg";
import FAQ from "./components/FAQ";
import Cytat from "./components/Cytat";
import Dysk from "./components/Dysk";

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      
      <Hero />
      <DrodzyGoscie />
      <NaszaHistoria />
      <Cytat />
      <DataMiejsce />
      <Nocleg />
      <RSVP />
      <Dysk bucketName={"klaudia-darek"} galleryLink={"https://dysk.weddingly.pl/galeria_klaudia-darek"} workerClientName={"klaudia_darek"} />
      <Kontakt />
      <FAQ />
    </>
  );
}