import { Text, TextProps } from './Themed';

const MonoText = (props: TextProps) => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

export default MonoText;
