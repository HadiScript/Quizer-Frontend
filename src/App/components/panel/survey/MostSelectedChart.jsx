
import { Treemap, ResponsiveContainer } from 'recharts';
const CustomizedContent = (props) => {
  const { depth, x, y, width, height, index, colors, name, option, value } = props;

  const fontSize = Math.min(width / 10, 14); // Adjust the maximum font size as needed
  const nameLines = name?.split(/\s+/).reduce((result, word, index, array) => {
    const length = result[result.length - 1]?.length || 0;
    if (length + word.length > 15) { // Adjust based on typical cell width
      result.push(word);
    } else {
      result[result.length - 1] += ` ${word}`;
    }
    return result;
  }, ['']);

  // Calculating offset for option/value text based on the number of name lines
  const optionValueOffset = nameLines?.length * (fontSize + 2);

  return depth === 1 ? (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[Math.floor(index % colors.length)],
          stroke: '#fff',
          // strokeWidth: 2
        }}
      />
      <text
        x={12}
        y={y + height / 2 - optionValueOffset}
        textAnchor="middle"
        fill="#fff"
        fontSize={15}
      >
        {nameLines.map((line, i) => (
          <tspan key={i} x={x + width / 2} dy={i === 0 ? 0 : fontSize + 2}>{line}</tspan>
        ))}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        textAnchor="middle"
        fill="#fff"
        fontSize={Math.min(fontSize, 10)} // Optionally smaller font size for option/value
      >
        {option}: {value}
      </text>
    </g>
  ) : null;
};


const MostSelectedChart = ({ data, loading }) => {


  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="value"
          aspectRatio={4 / 3}
          fill="#8884d8"
          content={<CustomizedContent colors={['#0f172a', '#1f2937', '#3f3f46', '#525252', '#082f49', '#155e75']} />}
        />
      </ResponsiveContainer>
    </>
  )
}

export default MostSelectedChart