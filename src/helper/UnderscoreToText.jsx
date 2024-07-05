export const UnderScroreToText = (input) => {
  console.log(input, "here is ");
  return input?.split('_')?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())?.join(' ');
}


export const UnderScoreChecker = (value) => {
  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <span key={index} style={{ marginRight: '5px' }}>
        {item.replace('_', ' ')}
      </span>
    ));
  }
  if (typeof value === 'string') {
    return value.replace('_', ' ');
  }
  if (typeof value === 'object' && value !== null) {
    return `${value[0].toLocaleString()} - ${value[1].toLocaleString()}`;
  }
  return value;
};