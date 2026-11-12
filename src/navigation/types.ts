import type {NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TabParamList = {
  HomeTab: undefined;
  LibraryTab: undefined;
  CreateTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  MoodSelection: undefined;
  DrawYourMood: {moodId?: string} | undefined;
  GeneratingUniverse: undefined;
  MusicalUniverse: {universeId?: string} | undefined;
  CreateParallelUniverse: {universeId?: string} | undefined;
  ParallelUniverseResult: {universeId?: string} | undefined;
  SonicverseMap: undefined;
  CompareUniverses: {leftId?: string; rightId?: string} | undefined;
  RemixMerge: undefined;
  FinalComposition: {universeId?: string} | undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
