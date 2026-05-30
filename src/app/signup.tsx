import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stylesVars = {
  brand: "#85cc17",
  text: "#1c1c1c",
  muted: "#7b7b7b",
  placeholder: "#9aa0a6",
  border: "#dfe3e7",
  icon: "#414141",
  iconMuted: "#7d7d7d",
  danger: "#e84b5b",
  background: "#ffffff",
} as const;

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mismatch =
    confirmPassword.trim().length > 0 && confirmPassword !== password;

  const canSubmit = useMemo(() => {
    return (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0 &&
      !mismatch
    );
  }, [email, password, confirmPassword, mismatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            style={styles.backButton}
            hitSlop={10}
          >
            <FontAwesome name="chevron-left" size={18} color={stylesVars.icon} />
          </Pressable>

          <Image
            source={require("@/assets/images/my-app-assets/logo-app.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Sign Up For Free</Text>
          <Text style={styles.subtitle}>
            Sign up in 1 minute for free!
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome
                name="envelope-o"
                size={16}
                color={stylesVars.iconMuted}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email..."
                placeholderTextColor={stylesVars.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                returnKeyType="next"
              />
            </View>

            <Text style={[styles.label, styles.labelSpacing]}>Password</Text>
            <View style={[styles.inputWrapper, mismatch && styles.inputError]}>
              <FontAwesome name="lock" size={18} color={stylesVars.iconMuted} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password..."
                placeholderTextColor={stylesVars.placeholder}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                returnKeyType="next"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                hitSlop={10}
                style={styles.inputTrailing}
              >
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  size={18}
                  color={stylesVars.iconMuted}
                />
              </Pressable>
            </View>

            <Text style={[styles.label, styles.labelSpacing]}>
              Password Confirmation
            </Text>
            <View style={[styles.inputWrapper, mismatch && styles.inputError]}>
              <FontAwesome name="lock" size={18} color={stylesVars.iconMuted} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password..."
                placeholderTextColor={stylesVars.placeholder}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                returnKeyType="done"
              />
              <Pressable
                onPress={() => setShowConfirm((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={
                  showConfirm ? "Hide confirmation password" : "Show confirmation password"
                }
                hitSlop={10}
                style={styles.inputTrailing}
              >
                <FontAwesome
                  name={showConfirm ? "eye-slash" : "eye"}
                  size={18}
                  color={stylesVars.iconMuted}
                />
              </Pressable>
            </View>

            {mismatch && (
              <View style={styles.errorPill}>
                <FontAwesome
                  name="exclamation-circle"
                  size={14}
                  color={stylesVars.danger}
                />
                <Text style={styles.errorText}>ERROR: Password do not match!</Text>
              </View>
            )}

            <Pressable
              style={[
                styles.primaryButton,
                !canSubmit && styles.primaryButtonDisabled,
              ]}
              disabled={!canSubmit}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
              <FontAwesome name="arrow-right" size={16} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace("/")}
            >
              <Text style={styles.footerLink}>Sign In.</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: stylesVars.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: stylesVars.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 6,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: stylesVars.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: stylesVars.muted,
    textAlign: "center",
    marginBottom: 18,
  },
  form: {
    width: "100%",
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: stylesVars.text,
    marginBottom: 8,
  },
  labelSpacing: {
    marginTop: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: stylesVars.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: stylesVars.danger,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: stylesVars.text,
    paddingVertical: 0,
  },
  inputTrailing: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorPill: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f1b4bc",
    backgroundColor: "#ffecee",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  errorText: {
    color: stylesVars.danger,
    fontSize: 12,
    fontWeight: "700",
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: stylesVars.brand,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: stylesVars.muted,
  },
  footerLink: {
    fontSize: 12,
    color: stylesVars.brand,
    textDecorationLine: "underline",
    fontWeight: "800",
  },
});

