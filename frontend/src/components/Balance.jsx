import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/account/balance",
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        );

        setValue(res.data.balance.toFixed(3));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setValue("Error fetching balance");
      }
    };

    fetchBalance(); // Call the async function
  }, []);
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};
