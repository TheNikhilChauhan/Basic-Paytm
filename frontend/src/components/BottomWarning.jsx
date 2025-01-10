/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="py-2 text-sm flex justify-center text-white">
      <div>{label}</div>
      <Link
        className="pointer underline pl-1 cursor-pointer text-white"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
};
