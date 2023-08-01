import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import DocumentaryProducerPassABI from "../../contracts/abis/DocumentaryProducerPassABI.json";
import { DocumentaryProducerPassAddress } from "../../contracts/address.json";

const FundingSuccessModal = ({ isOpenModal, setIsOpenFunginModal }) => {
  return (
    <div>
      {isOpenModal && (
        <div>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="flex flex-col items-center justify-center p-6 bg-[#081521]">
                    <Image
                      src="/modal-funding-success.png"
                      width={680}
                      height={933}
                      alt="Picture of the author"
                    />
                    <Image
                      class="absolute right-4 top-4 hover:cursor-pointer"
                      src="/btn-close.png"
                      width={40}
                      height={40}
                      onClick={() => setIsOpenFunginModal(false)}
                    />
                    <button
                      class="rounded-[30px] text-[#FFCD4E] border-2 border-[#FFCD4E] hover:cursor-pointer px-[24px] py-[16px] mt-[36px]"
                      onClick={() => {
                        Router.replace("/scenes/tears-of-the-antarctic");
                      }}
                    >
                      Go to behind the scene
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FundingModal = ({
  isOpenModal,
  setIsOpenFunginModal,
  isLoading,
  write,
}) => {
  return (
    <div>
      {isOpenModal && (
        <div>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                  <div class="flex flex-col items-center justify-center p-6 bg-[#081521]">
                    <Image
                      src="/modal-funding-header.png"
                      width={645}
                      height={933}
                      alt="Picture of the author"
                    />
                    <div class="flex mt-8">
                      <Image
                        class="absolute right-4 top-4 hover:cursor-pointer"
                        src="/btn-close.png"
                        width={40}
                        height={40}
                        onClick={() => setIsOpenFunginModal(false)}
                      />
                      <Image
                        src="/modal-funding-utility-perks.png"
                        width={200}
                        height={395}
                      />
                      <div class="flex flex-col items-center  justify-center pl-[34px]">
                        <div class="w-full flex items-center justify-center rounded-t-[18px] bg-[#012b4e]">
                          <div class="font-normal text-[32px] text-white">
                            1240
                          </div>
                          <div class="font-normal text-[32px] text-white">
                            /
                          </div>
                          <div class="font-normal text-[32px] text-white pr-2">
                            5000
                          </div>
                          <div class="font-normal text-[14px] text-white pt-1">
                            NFTs sold
                          </div>
                        </div>
                        <div class="font-normal text-[15px] text-[#FFCD4E] my-[18px]">
                          How many Producer Pass would you like to buy?
                        </div>
                        <div class="flex items-center">
                          <input
                            type="text"
                            id="first_name"
                            class="w-[61px]  text-center bg-gray-50 border border-gray-300 text-gray-900 text-[24px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            required
                          />
                          <div class="font-normal text-[24px] text-white px-2">
                            /
                          </div>
                          <div class="font-normal text-[24px] text-white">
                            5
                          </div>
                          <div class="font-normal text-[24px] text-white pl-2">
                            NFTs
                          </div>
                        </div>
                        <div class="bg-[#002B4D] w-[90%] h-[2px] my-[24px]"></div>
                        <div class="flex items-center">
                          <div class="font-normal text-[16px] text-[#FFCD4E] px-2">
                            Total Price
                          </div>
                          <div class="font-normal text-[40px] text-white px-2">
                            0.1
                          </div>
                          <div class="font-normal text-[16px] text-white px-2">
                            ETH
                          </div>
                        </div>
                        <div
                          disabled={!write || isLoading}
                          class="rounded-[30px] text-[#FFCD4E] border-2 border-[#FFCD4E] hover:cursor-pointer px-[24px] py-[16px] mt-[36px]"
                          onClick={() => write()}
                        >
                          {isLoading ? "Minting..." : "Mint"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Funding() {
  const [isOpenFundingModal, setIsOpenFunginModal] = useState(false);
  const [isOpenFundingSuccessModal, setIsOpenFunginSuccessModal] =
    useState(false);

  const price = ethers.parseEther("0.1");

  const { config } = usePrepareContractWrite({
    address: DocumentaryProducerPassAddress,
    abi: DocumentaryProducerPassABI,
    functionName: "mintProducerPass",
    args: [1, 1],
    // enabled: Boolean(title),
    value: price,
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsOpenFunginModal(false);
      setIsOpenFunginSuccessModal(true);
    }
  }, [isSuccess]);

  return (
    <div class="bg-[#081521] pb-[200px]">
      <FundingModal
        isOpenModal={isOpenFundingModal}
        setIsOpenFunginModal={setIsOpenFunginModal}
        write={write}
        isLoading={isLoading}
      />
      <FundingSuccessModal
        isOpenModal={isOpenFundingSuccessModal}
        setIsOpenFunginModal={setIsOpenFunginSuccessModal}
      />
      {/* <div class="bg-[url('/bg-funding-detail.svg')] bg-cover flex items-center justify-center h-[392px] font-normal text-[64px] text-white">
        Tears of the Antarctic
      </div> */}
      <div class="bg-[url('/header.svg')] bg-contain flex items-center justify-center font-normal text-[64px] text-white pt-[150px] pb-[80px]">
        Tears of the Antarctic
      </div>
      {/* <Image
        src="/dummy/detail-header.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      /> */}
      <div class="flex items-center justify-center flex-col">
        <div class="flex gap-24 items-center justify-center">
          <div>
            <Image
              class="mt-20"
              src="/dummy/img-left-funding.png"
              width={700}
              height={644}
              alt="Picture of the author"
            />
          </div>
          <div class="flex flex-col items-center justify-center">
            <Image
              src="/dummy/img-right-funding.png"
              width={332}
              height={644}
              alt="Picture of the author"
            />
            <button
              class="bg-[#ffcd4e] rounded-[56px] px-[16px] py-[24px] text-18 font-bold uppercase mt-[-35px]"
              onClick={() => {
                setIsOpenFunginModal(true);
              }}
            >
              SUPPORT THIS PROJECT
            </button>
          </div>
        </div>
        <div class="mt-20">
          <Image
            src="/dummy/roadmap-title.png"
            width={169}
            height={40}
            alt="Picture of the author"
          />
          <Image
            class="mt-8"
            src="/dummy/roadmap-detail.png"
            width={1125}
            height={644}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}
