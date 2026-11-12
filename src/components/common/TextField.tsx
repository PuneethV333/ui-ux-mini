import React, {useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {colors, fonts, radius, spacing} from '../../theme';
import Icon, {IconName} from './Icon';

type Props = TextInputProps & {
  label?: string;
  icon?: IconName;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  secure?: boolean;
};

export default function TextField({
  label,
  icon,
  error,
  containerStyle,
  secure,
  style,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(Boolean(secure));

  return (
    <View style={[styles.root, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          focused && styles.focused,
          Boolean(error) && styles.errorField,
        ]}>
        {icon ? (
          <View style={styles.icon}>
            <Icon name={icon} size={18} color={colors.textDim} />
          </View>
        ) : null}
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          onFocus={e => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={colors.textDim}
          style={[styles.input, style]}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden(prev => !prev)}
            hitSlop={10}
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            <Icon
              name={hidden ? 'lock' : 'user'}
              size={17}
              color={colors.textDim}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {gap: 8},
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.8,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  field: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(18,11,38,0.72)',
    paddingHorizontal: spacing.lg,
  },
  focused: {
    borderColor: colors.primaryBright,
    backgroundColor: 'rgba(30,18,58,0.9)',
  },
  errorField: {borderColor: 'rgba(251,113,133,0.6)'},
  icon: {marginRight: spacing.sm},
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 14,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.danger,
  },
});
