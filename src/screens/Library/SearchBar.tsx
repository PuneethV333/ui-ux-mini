import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme';
import {styles} from './styles';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export default function SearchBar({value, onChangeText, onClear}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.searchBar, focused && styles.searchBarFocused]}>
      <Icon
        name="search"
        size={18}
        color={focused ? colors.primaryBright : colors.textDim}
        strokeWidth={1.9}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search universes..."
        placeholderTextColor={colors.textDim}
        selectionColor={colors.primaryBright}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search universes"
        style={styles.searchInput}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={onClear}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({pressed}) => [
            styles.searchClear,
            pressed && styles.searchClearPressed,
          ]}>
          <Icon name="close" size={12} color={colors.text} strokeWidth={2.2} />
        </Pressable>
      ) : null}
    </View>
  );
}
