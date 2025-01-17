"use client";
import Image from "next/image";
import Logo from "/public/Logo.png";
import { usePathname, useRouter } from "next/navigation";
import { ICategoryItem } from "@/types/fixedLayout";
import admin from "public/admin.svg";
import { MouseEvent, useState } from "react";
import AdminInfoModal from "./AdminInfoModal";

const category = [
  { title: "대시보드", path: "/dashBoard" },
  { title: "PB 회원가입 승인", path: "/joinAccept" },
  { title: "회원 관리", path: "/users" },
  { title: "상담 현황", path: "/counseling" },
  { title: "게시글 관리", path: "/contents" },
  { title: "공지사항 관리", path: "/notice" },
  { title: "FAQ 관리", path: "/faq" },
];

function FixedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (item: ICategoryItem) => {
    router.push(item.path);
  };

  const handleClickInfo = (e: MouseEvent) => {
    setIsHovered(!isHovered);
  };

  return (
    <main>
      <header className="fixed left-[240px] top-0 flex h-[50px] w-[calc(100vw-240px)] items-center bg-white">
        <div className="absolute right-10 h-[30px] w-[30px] cursor-pointer object-contain" onClick={handleClickInfo}>
          <Image src={admin} alt="user" />
        </div>
        {isHovered && (
          <div className="absolute right-10 top-16">
            <AdminInfoModal />
          </div>
        )}
      </header>
      <nav className="sticky left-0 top-0 h-[100vh] w-60 bg-primary-normal px-5 py-[50px]">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={35}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
        <ul className="mt-20 px-2 text-white">
          {category.map(item => (
            <li
              key={Date.now() + item.title}
              onClick={() => handleClick(item)}
              className={`mt-1 flex h-10 cursor-pointer items-center justify-center rounded-[8px] hover:bg-[#5b717c] ${
                pathName === item.path ? "bg-[#5b717c]" : "transparent"
              }`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </main>
  );
}

export default FixedLayout;
