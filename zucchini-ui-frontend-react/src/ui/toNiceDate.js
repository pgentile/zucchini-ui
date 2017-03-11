import moment from 'moment';


export default function toNiceDate(dateStr) {
  const date = moment(dateStr);
  return date.format('DD/MM/YYYY à HH:mm');
}
