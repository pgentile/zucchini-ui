import moment from 'moment';


export default function toNiceDate(dateStr) {
  if (dateStr) {
    const date = moment(dateStr);
    return date.format('DD/MM/YYYY à HH:mm');
  }
  return null;
}
