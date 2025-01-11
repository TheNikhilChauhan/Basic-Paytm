import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const handleTransfer = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      console.log("Token is missing. Pleas login again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/account/transfer",
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      console.error(
        "Transfer Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-gray-300 flex h-screen justify-center">
      <div className="h-full flex flex-col justify-center">
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-green-400 text-center">
              Send Money
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-slate-400 rounded-full w-12 h-12 flex justify-center items-center">
                <span className="text-2xl">{name[0].toUpperCase()}</span>
              </div>
              <h3 className="font-semibold">{name}</h3>
            </div>
            <div className="space-y-10">
              <div className="flex gap-4 justify-center items-center">
                <label className="font-semibold text-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                  Amount (in RS)
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="p-2 rounded font-medium text-black"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={handleTransfer}
                className="bg-green-500 p-2 rounded-xl font-bold hover:bg-green-600 justify-center w-full ring-offset-background transition-colors"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
