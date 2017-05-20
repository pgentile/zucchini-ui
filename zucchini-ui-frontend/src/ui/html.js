import _ from 'lodash';


export default function html(strings, ...args) {
  return strings.reduce((prevValue, currentValue, index) => {
    const arg = args[index - 1];
    return prevValue + _.escape(arg) + currentValue;
  });
}
