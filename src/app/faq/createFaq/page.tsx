"use client";
import { createFaqDetail } from "@/app/apis/faq";
const ContentEditor = dynamic(() => import("@/components/common/ContentEditor"));
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function CreateFaqPage() {
  const [createState, setCreateState] = useState({ title: "", content: "", label: "" });
  const router = useRouter();

  const { mutate: createMutate } = useMutation(createFaqDetail, {
    onSuccess: () => {
      router.back();
    },
  });

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const createdTitle = e.target.value;
    setCreateState(prevState => ({ ...prevState, title: createdTitle }));
  };

  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const createdContent = e.target.value;
    setCreateState(prevState => ({ ...prevState, content: createdContent }));
  };

  const labelChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const createdContent = e.target.value;
    setCreateState(prevState => ({ ...prevState, label: createdContent }));
  };

  const deleteHandler = () => {
    router.back();
  };

  const createHandler = () => {
    if (createState.title === "" || createState.content === "" || createState.label === "") {
      alert("작성하지 않은 곳이 있습니다. 다시 확인해주세요.");
      return;
    }
    createMutate(createState);
  };
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 ">
          <span className="mr-3 w-[40px] font-bold text-white">제목</span>
          <input className="w-full p-2 py-1 font-bold" onChange={titleChangeHandler} />
          <div className="ml-5 w-[300px] ">
            <button
              onClick={deleteHandler}
              className="h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              취소
            </button>
            <button
              onClick={createHandler}
              className="ml-3 h-[40px] w-[100px] rounded-sm bg-white font-bold text-black hover:bg-background-primary"
            >
              작성
            </button>
          </div>
        </div>
        <div className="flex h-[52px] items-center justify-between border-t-1 border-background-normal bg-[#425C6F] p-4 ">
          <span className="mr-[3px] w-[40px] font-bold text-white">유형</span>
          <input className="w-full p-2 py-1 font-bold" onChange={labelChangeHandler} />
        </div>
        <ContentEditor initialState={createState.content} setContentState={setCreateState} />
      </div>
    </div>
  );
}

export default CreateFaqPage;
