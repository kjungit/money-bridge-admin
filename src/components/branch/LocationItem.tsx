import { deleteLocation, editLocation } from "@/app/apis/branch";
import { ICompanyLocationListData } from "@/types/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import ButtonModal from "../common/ButtonModal";
import ModalLayout from "../common/ModalLayout";
import { IModalContent } from "@/types/common";

function LocationItem({ location, companyId }: { location: ICompanyLocationListData; companyId: number }) {
  const [editMode, setEditMode] = useState(false);
  const inputName = useRef<HTMLInputElement>(null);
  const inputAddress = useRef<HTMLInputElement>(null);
  const inputSpecific = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContents_Default = {
    content: "현재 지점에 소속된 PB가 존재합니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsModalOpen(false);
    },
  };
  const [modalContent, setModalContent] = useState<IModalContent>(modalContents_Default);
  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyLocation"]);
      setEditMode(false);
    },
    onError: () => {
      setIsModalOpen(true);
    },
  });

  const { mutate: mutateEdit } = useMutation(editLocation, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyLocation"]);
      setEditMode(false);
    },
  });

  const getLoadAddress = (address: string) => {
    return address.includes(",") ? address.split(",")[0] : address;
  };
  const getSpecificAddress = (address: string) => {
    return address.includes(",") ? address.split(",")[1] : "";
  };

  const handleDelete = () => {
    mutateDelete(location.id);
  };

  const handleEdit = () => {
    if (inputName.current && inputAddress.current && inputSpecific.current) {
      mutateEdit({
        id: location.id,
        data: {
          companyId: companyId,
          name: inputName.current?.value,
          address: inputAddress.current?.value,
          specificAddress: inputSpecific.current?.value,
        },
      });
    } else {
      alert("유효한 데이터를 입력해주세요");
    }
  };

  return (
    <li className="flex h-[100px] w-full border-collapse items-center justify-between border-b-1 border-[#E0E0E0] px-4">
      <div>
        {editMode ? (
          <div className="flex flex-col gap-1">
            <label className="flex">
              <h4 className="w-16 text-center">지점명</h4>
              <input
                ref={inputName}
                defaultValue={location.name.substring(location.name.split(" ")[0].length + 1)}
                className="ml-2 w-[500px] rounded-sm border-1 border-black px-2"
              />
            </label>
            <label className="flex">
              <h4>지점 주소</h4>
              <input
                ref={inputAddress}
                defaultValue={getLoadAddress(location.roadAddress).trim()}
                className="ml-2 w-[500px] rounded-sm border-1 border-black px-2"
              />
            </label>
            <label className="flex">
              <h4>상세 주소</h4>
              <input
                ref={inputSpecific}
                defaultValue={getSpecificAddress(location.roadAddress).trim()}
                className="ml-2 w-[500px] rounded-sm border-1 border-black px-2"
              />
            </label>
          </div>
        ) : (
          <>
            <p className="font-bold">{location.name}</p>
            <p>{getLoadAddress(location.roadAddress)}</p>
            <p>{getSpecificAddress(location.roadAddress)}</p>
          </>
        )}
      </div>
      <div className="flex w-[150px] gap-2">
        {editMode ? (
          <>
            <button onClick={handleEdit} className="h-10 w-full rounded-md bg-primary-light px-2 text-sm text-white">
              수정
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="h-10 w-full rounded-md bg-status-alert px-2 text-sm text-white"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="h-10 w-full rounded-md bg-secondary-light px-1 text-sm text-white"
            >
              지점 수정
            </button>
            <button onClick={handleDelete} className="h-10 w-full rounded-md bg-primary-normal px-1 text-sm text-white">
              지점 삭제
            </button>
          </>
        )}
      </div>
      {isModalOpen && <ButtonModal modalContents={modalContent} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </li>
  );
}

export default LocationItem;
