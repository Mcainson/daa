import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typeScale } from '@/theme/tokens';

type SectionHeadingProps = {
  action?: string;
  title: string;
};

export function SectionHeading({ action, title }: SectionHeadingProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action === undefined ? null : <Text style={styles.action}>{action}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    color: colors.textMuted,
    fontSize: typeScale.caption,
    fontWeight: '600',
  },
  row: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typeScale.heading,
    fontWeight: '700',
  },
});
