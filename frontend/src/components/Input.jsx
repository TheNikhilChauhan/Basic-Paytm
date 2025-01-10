/* eslint-disable react/prop-types */
export const Input = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm text-white text-left font-medium py-3">
        {label}
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-300 text-black font-semibold mb-4"
      />
    </div>
  );
};
