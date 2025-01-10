/* eslint-disable react/prop-types */
export const Button = ({ onClick, label }) => {
  return (
    <button
      className="bg-slate-500 px-4 py-2 rounded font-semibold mb-3 me-2 w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
