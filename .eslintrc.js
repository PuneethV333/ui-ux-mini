module.exports = {
  root: true,
  extends: 'expo',
  rules: {
    // React Compiler lint rules flag established React Native patterns
    // (Animated refs read during render, local animation state in effects).
    'react-hooks/refs': 'off',
    'react-hooks/immutability': 'off',
    'react-hooks/set-state-in-effect': 'off',
  },
};
