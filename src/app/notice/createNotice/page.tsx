"use client";
import { CreateNoticeProps, createNoticeDetail } from "@/app/apis/notice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function CreateNoticePage() {
  const [createState, setCreateState] = useState({ title: "", content: "" });
  const router = useRouter();

  const { mutate: createMutate } = useMutation<null, AxiosError, CreateNoticeProps>(createNoticeDetail, {
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

  const deleteHandler = () => {
    router.back();
  };

  const createHandler = () => {
    createMutate(createState);
  };
  return (
    <div>
      <div className="w-full ">
        <div className="flex h-[52px] items-center justify-between bg-[#425C6F] p-4 ">
          <input className="w-full p-2 py-1 font-bold" onChange={titleChangeHandler} />
          <div className="ml-5 w-[280px] ">
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
        <div className="flex h-[614px] items-center justify-center p-4">
          <textarea
            onChange={contentChangeHandler}
            className={"h-full w-full"}
            name=""
            id=""
            cols={30}
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default CreateNoticePage;