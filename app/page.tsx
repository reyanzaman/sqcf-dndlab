import Image from "next/image";
import "../styles/home.css";
import classnames from "classnames";
import db from "@/modules/db";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Landing Image */}
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className={classnames(
            "m-0 absolute inset-0",
            "image-container" // Applied class for the container with border
          )}
        >
          <Image
            src="https://dndlab-sqcf.s3.ap-southeast-1.amazonaws.com/Home_Paintings/IMG_9587.JPG"
            alt="Full screen background"
            layout="fill"
            objectFit="cover"
            className="image-zoom" // Applied zoom-in class to the image
          />
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-0 lg:p-[2.5em] p-[1em] anim-appear-2">
        <div className="flex items-center justify-center w-[75px] lg:w-[150px] h-[75px] lg:h-[150px] bg-[#f3ecdc] pr-1">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={75}
            height={75}
            className="w-auto lg:h-[140px] h-[70px]"
          />
        </div>
      </div>

      {/* Menu */}
      <div className="absolute top-0 right-0 lg:mr-[2.5em] lg:mt-[2.5em] mr-[1em] mt-[1em]">
        <a href="#">
          <div className="lg:p-3 p-4 bg-black border-white lg:border-[4px] border-[3px]">
            <IoMenuOutline className="lg:text-4xl text-xl text-white"/>
          </div>
        </a>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center lg:justify-center justify-end w-screen h-screen absolute">
          <h1 className="text-4xl lg:text-[5rem] font-extrabold text-white text-center anim-appear custom-font">HIGH NOON</h1>
          <div className="lg:mt-16 mt-4 lg:mb-0 mb-8 lg:space-y-4">
            <h3 className="text-lg lg:text-[2rem] text-white text-center anim-appear bangla-font">মধ্যদুপুর - শিল্পী কাইয়ুম চৌধুরী</h3>
            <h3 className="text-base lg:text-[1.7rem] text-white text-center anim-appear bangla-font">ম্যাসোনাইট বোর্ডে তেলরং</h3>
            <h3 className="text-base lg:text-[1.7rem] text-white text-center anim-appear bangla-font"> ১৯৬৮</h3>
          </div>
          <div>
            <div className="anim-appear-2 custom-link">
            <Link href="/" className="bg-black px-4 lg:py-4 py-3 border-2 border-white lg:px-24 lg:m-6 hover:text-white lg:text-xl text-base flex items-center justify-center relative link-comp">
              <span className="text-gray-300 flex items-center justify-center hover:text-white duration-300">
                <span className="relative hover-effect">বিস্তারিত জানুন</span>
                <FaArrowRight className="ml-4 transform translate-x-3"/>
              </span>
            </Link>
            </div>
          </div>
      </div>

    </main>
  );
}