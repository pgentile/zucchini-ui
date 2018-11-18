import format from "date-fns/format";

export default function toNiceDate(dateStr) {
  if (dateStr) {
    return format(dateStr, "DD/MM/YYYY à HH:mm");
  }
  return null;
}
