import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Logo from '../../components/common/Logo';
import GlassCard from '../../components/common/GlassCard';
import TextField from '../../components/common/TextField';
import GlowButton from '../../components/common/GlowButton';
import {useApp} from '../../context/AppContext';
import type {RootStackParamList} from '../../navigation/types';
import {isValidEmail, minLength, required} from '../../utils/validation';
import {styles} from './styles';

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Signup() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {signUp} = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: keyof Errors) => {
    setErrors(prev => (prev[field] ? {...prev, [field]: undefined} : prev));
  };

  const validate = () => {
    const next: Errors = {};
    if (!required(name)) {
      next.name = 'Name is required.';
    }
    if (!required(email)) {
      next.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!required(password)) {
      next.password = 'Password is required.';
    } else if (!minLength(password, 6)) {
      next.password = 'Use at least 6 characters.';
    }
    if (!required(confirmPassword)) {
      next.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) {
      return;
    }
    signUp(name.trim(), email.trim());
    navigation.navigate('MainTabs', {screen: 'HomeTab'});
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenContainer
        edges={['top', 'left', 'right', 'bottom']}
        contentContainerStyle={styles.content}>
        <View style={styles.glowPink} pointerEvents="none" />
        <View style={styles.glowViolet} pointerEvents="none" />

        <View style={styles.brandBlock}>
          <Logo size={60} showWordmark />
          <Text style={styles.eyebrow}>JOIN THE SONICVERSE</Text>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            One small step from a feeling to a universe of sound.
          </Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.form}>
            <TextField
              label="Name"
              icon="user"
              value={name}
              onChangeText={value => {
                setName(value);
                clearError('name');
              }}
              placeholder="Your name"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              textContentType="name"
              returnKeyType="next"
              error={errors.name}
              accessibilityLabel="Name"
            />

            <TextField
              label="Email"
              icon="mail"
              value={email}
              onChangeText={value => {
                setEmail(value);
                clearError('email');
              }}
              placeholder="you@sonicverse.app"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              error={errors.email}
              accessibilityLabel="Email address"
            />

            <TextField
              label="Password"
              icon="lock"
              secure
              value={password}
              onChangeText={value => {
                setPassword(value);
                clearError('password');
              }}
              placeholder="At least 6 characters"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="next"
              error={errors.password}
              accessibilityLabel="Password"
            />

            <TextField
              label="Confirm password"
              icon="lock"
              secure
              value={confirmPassword}
              onChangeText={value => {
                setConfirmPassword(value);
                clearError('confirmPassword');
              }}
              placeholder="Repeat your password"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="go"
              onSubmitEditing={handleSignup}
              error={errors.confirmPassword}
              accessibilityLabel="Confirm password"
            />

            <GlowButton
              title="CREATE ACCOUNT"
              uppercase
              iconRight="sparkles"
              onPress={handleSignup}
              style={styles.submit}
            />
          </View>

          <Text style={styles.hint}>
            Offline demo — your account stays on this device.
          </Text>
        </GlassCard>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Go to log in"
            onPress={() => navigation.navigate('Login')}
            style={styles.link}
            hitSlop={8}>
            <Text style={styles.linkText}>Log in</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
