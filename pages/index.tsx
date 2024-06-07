import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ABI } from "../components/abis/contractABI";
import Navbar from "../components/Navbar";
import { BigNumber } from "@ethersproject/bignumber";

const contractAddress = "0x6848F371e6C454a4D29a0D00fd1792Da8989Fa25";

export default function Home() {
  const { writeContract: checkIn } = useWriteContract();
  const { address, isConnected } = useAccount();
  const [points, setPoints] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const { data: userPoints } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: "getPoints",
    args: [address],
  });

  const { data: lastCheckIn } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: "getLastCheckIn",
    args: [address],
  });

  useEffect(() => {
    if (userPoints) {
      setPoints(BigNumber.from(userPoints).toNumber());
    }
    if (lastCheckIn) {
      const remainingTime = Math.max(
        0,
        BigNumber.from(lastCheckIn).toNumber() * 1000 +
          24 * 60 * 60 * 1000 -
          Date.now()
      );
      setRemainingTime(remainingTime);
    }
  }, [userPoints, lastCheckIn]);

  const handleCheckIn = async () => {
    checkIn({
      address: contractAddress,
      abi: ABI,
      functionName: "checkIn",
    });
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="w-full">
        <Navbar />
      </div>
      <main className="flex flex-col justify-center items-center mt-[280px]">
        <button
          onClick={() => {
            console.log("clicked");
            handleCheckIn();
          }}
          className="bg-green-500 text-white px-6 py-3 rounded mb-4 items-center justify-center"
          disabled={remainingTime > 0}
        >
          Check In
        </button>
        <div className="text-xl mb-2 font-light">Points: {points}</div>
        <div className="text-xl font-extralight">
          {remainingTime > 0
            ? `Next check-in available in ${Math.floor(
                remainingTime / 3600000
              )}h ${Math.floor((remainingTime % 3600000) / 60000)}m`
            : "You can check in now!"}
        </div>
      </main>
    </div>
  );
}
