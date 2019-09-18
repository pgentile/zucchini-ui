import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function toNiceDate(dateStr) {
  if (dateStr) {
    return format(parseISO(dateStr), "dd/MM/yyyy à HH:mm");
  }
  return null;
}
