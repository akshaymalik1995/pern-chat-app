import { InputHTMLAttributes } from "react";


export default function TextInput({ className = "", ...props }:  InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`text-gray-900 focus:outline-none text-sm w-full p-2.5 ${className}`}
      
      {...props}
      type="text"
      
    />
  );
}

  
