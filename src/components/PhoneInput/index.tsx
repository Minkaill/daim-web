import { useState } from "react";

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  let result = "+7 ";
  if (digits.length > 1) result += `(${digits.slice(1, 4)}`;
  if (digits.length >= 4) result += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 7) result += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) result += `-${digits.slice(9, 11)}`;

  return result;
};

export const PhoneInput = () => {
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      placeholder="+7 (___) ___-__-__"
      className="w-full rounded-lg bg-[#1f2937] px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
    />
  );
};
