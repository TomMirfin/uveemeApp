import { useTheme } from '@react-navigation/native';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'cardTitle';
  centered?: boolean;
};

export function CustomText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  centered = false,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? [styles.title, centered ? { textAlign: 'center' } : null] : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'cardTitle' ? styles.cardTitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins',
    color: 'white',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins',
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Poppins',
    color: 'white',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'LatoBold',
    color: '#0a7ea4',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'white',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Poppins',
  },
});
