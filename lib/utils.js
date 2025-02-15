import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatToIndianNumber(num) {
  // Convert the string to a number
  const number = Number(num);

  // Check if the conversion is valid
  if (isNaN(number)) {
    return num;
  } else if (number >= 10000000) {
    // For Crore
    const croreValue = number / 10000000;
    return croreValue % 1 === 0
      ? croreValue.toFixed(0) + " Crore"
      : croreValue.toFixed(1) + " Crore";
  } else if (number >= 100000) {
    // For Lakh
    const lakhValue = number / 100000;
    return lakhValue % 1 === 0
      ? lakhValue.toFixed(0) + " Lakh"
      : lakhValue.toFixed(1) + " Lakh";
  } else {
    // Convert the number to Indian number format
    return number.toLocaleString("en-IN");
  }
}

// Helper function to convert budget strings to numeric values
const parseBudget = (budgetStr) => {
  const regex = /(\d+(?:,\d{3})*)(\s*(Lakh|Cr|K|Thousand)?)/i;
  const match = budgetStr.match(regex);
  if (!match) return 0;

  let value = parseInt(match[1].replace(/,/g, ""), 10); // Remove commas and convert to number
  const unit = match[3]?.toLowerCase();

  switch (unit) {
    case "lakh":
      value *= 100000;
      break;
    case "cr":
      value *= 10000000;
      break;
    case "k":
    case "thousand":
      value *= 1000;
      break;
    default:
      break;
  }

  return value;
};
