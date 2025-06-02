import Image from "next/image";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white container mx-auto rounded-full flex items-center justify-center">
        <Image
          src={"/assets/svg/404.svg"}
          alt=""
          width={500}
          height={500}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
