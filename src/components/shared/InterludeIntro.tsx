"use client";

import { intros } from "@/assets/intro";
import React from "react";
import { HiStar, HiChevronDoubleRight } from "react-icons/hi";

export default function InterludeIntro() {
  const [current, setCurrent] = React.useState(intros[0]);

  const changeIntro = () => {
    const index = intros.indexOf(current);
    const next = intros[index + 1] || intros[0];
    setCurrent(next);
  };
  return (
    <div className="hidden md:flex flex-col md:w-1/2">
      <p className="text-white text-sm flex items-center">
        <HiStar size={24} className="mr-2" /> Welcome to Interlude
      </p>
      <h1 className="text-2xl text-brand-cyan mt-6 md:text-4xl font-black tracking-wide max-w-sm">
        {current.title}
      </h1>
      <div
        className="text-white mt-8 leading-relaxed max-w-sm text-sm"
        dangerouslySetInnerHTML={{ __html: current.description }}
      />

      <div className="flex items-center mt-auto py-4">
        <button
          className="flex items-center text-brand-cyan py-2 text-sm"
          onClick={changeIntro}
        >
          Learn more <HiChevronDoubleRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
