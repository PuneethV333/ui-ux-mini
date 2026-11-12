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
import {isValidEmail, required} from '../../utils/validation';
import {styles} from './styles';

type Errors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {signIn} = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const next: Errors = {};
    if (!required(email)) {
      next.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!required(password)) {
      next.password = 'Password is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) {
      return;
    }
    signIn(email.trim());
    navigation.navigate('MainTabs', {screen: 'HomeTab'});
  };

  const handleGoogle = () => {
    setErrors({});
    signIn('demo@sonicverse.app', 'Demo Explorer');
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
          <Logo size={64} showWordmark />
          <Text style={styles.eyebrow}>ACCESS YOUR UNIVERSE</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Log in to keep drawing worlds and collecting sounds.
          </Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.form}>
            <TextField
              label="Email"
              icon="mail"
              value={email}
              onChangeText={value => {
                setEmail(value);
                if (errors.email) {
                  setErrors(prev => ({...prev, email: undefined}));
                }
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
                if (errors.password) {
                  setErrors(prev => ({...prev, password: undefined}));
                }
              }}
              placeholder="Enter your password"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              error={errors.password}
              accessibilityLabel="Password"
            />

            <GlowButton
              title="LOG IN"
              uppercase
              iconRight="arrow-right"
              onPress={handleLogin}
              style={styles.submit}
            />
          </View>

          <GlowButton
            title="Continue with Google"
            variant="ghost"
            icon="globe"
            onPress={handleGoogle}
            style={styles.google}
          />

          <Text style={styles.hint}>
            Offline demo — any credentials work.
          </Text>
        </GlassCard>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Go to sign up"
            onPress={() => navigation.navigate('Signup')}
            style={styles.link}
            hitSlop={8}>
            <Text style={styles.linkText}>Sign up</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
