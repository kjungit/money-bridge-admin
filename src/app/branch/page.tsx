"use client";
import CompanyItem from "@/components/branch/CompanyItem";
import { ICompanyLocationListData, ICompanyNameListData } from "@/types/branch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteCompany, getCompanyList, getCompanyLocation } from "../apis/branch";
import LocationItem from "@/components/branch/LocationItem";
import RegisterForm from "@/components/branch/RegisterForm";
import ModalLayout from "@/components/common/ModalLayout";
import AddCompanyModal from "@/components/branch/AddCompanyModal";
import EditCompanyModal from "@/components/branch/EditCompanyModal";

function Page() {
  const queryClient = useQueryClient();
  const [company, setCompanyId] = useState<ICompanyNameListData>({ id: 0, name: "", logo: "" });
  const [keyword, setKeyword] = useState(company.name);
  const [modalType, setModalType] = useState<"edit" | "add" | null>(null);
  const { data: companyList } = useQuery<any, unknown, ICompanyNameListData[], any>(["companyList"], getCompanyList);
  const { data: locationList } = useQuery<any, unknown, ICompanyLocationListData[], any>(
    ["companyLocation", company.id, keyword],
    () => getCompanyLocation(company.id, keyword),
  );
  const { mutate: removeCompany } = useMutation(["deleteCompany"], deleteCompany, {
    onSuccess: () => {
      queryClient.refetchQueries(["companyList"]);
      setCompanyId({ id: 0, name: "", logo: "" });
    },
  });

  const handleDeleteCompany = () => {
    removeCompany(company.id);
  };

  const handleEditCompany = () => {
    setModalType("edit");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <>
      <div className="flex h-full w-full">
        <div className=" w-[300px] table-fixed">
          <div className="h-[52px] bg-[#425C6F] text-white">
            <div className="w-[300px] border-collapse border-r-1 border-[#E0E0E0] text-center font-bold leading-[52px]">
              증권사 리스트
            </div>
          </div>
          <ul className="max-h-[608px] overflow-y-scroll text-center">
            {companyList &&
              companyList.map(item => (
                <CompanyItem key={item.id} company={item} setCompanyId={setCompanyId} setKeyword={setKeyword} />
              ))}
          </ul>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex h-[52px] justify-between bg-[#425C6F] px-4">
            <h3 className="text-center leading-[52px] text-white">
              {company.id !== 0 ? <span className="font-bold">{company.name} </span> : ""}
            </h3>
            {company.id !== 0 && (
              <div className="flex items-center gap-2 text-sm">
                <button onClick={handleDeleteCompany} className="rounded-md bg-status-error px-2 py-1 text-white">
                  증권사 삭제
                </button>
                <button className="rounded-md bg-white px-2 py-1" onClick={handleEditCompany}>
                  증권사명 수정
                </button>
              </div>
            )}
          </div>
          <div className="h-full overflow-scroll">
            {company.id === 0 ? (
              <p className="mt-60 text-center">조회하실 증권사를 선택해주세요.</p>
            ) : (
              <ul>
                {locationList?.length ? (
                  locationList?.map(item => <LocationItem key={item.id} location={item} companyId={company.id} />)
                ) : (
                  <li>
                    <p className="mt-60 text-center">등록된 지점이 없습니다.</p>
                  </li>
                )}
              </ul>
            )}
          </div>
          {company.id !== 0 && <RegisterForm companyId={company.id} />}
        </div>
      </div>
      <button
        onClick={() => setModalType("add")}
        className="mt-4 w-[200px] rounded-md bg-primary-normal py-4 text-center text-white"
      >
        증권사 추가하기
      </button>
      {modalType && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          {modalType === "add" ? (
            <AddCompanyModal handleCloseModal={handleCloseModal} />
          ) : (
            <EditCompanyModal handleCloseModal={handleCloseModal} company={company} />
          )}
        </ModalLayout>
      )}
    </>
  );
}

export default Page;
