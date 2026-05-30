import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stylesVars = {
  brand: "#85cc17",
  text: "#1c1c1c",
  muted: "#7b7b7b",
  border: "#dfe3e7",
  icon: "#414141",
  iconMuted: "#7d7d7d",
  background: "#ffffff",
} as const;

type ResetMethod = "email" | "2fa" | "google";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<ResetMethod>("2fa");

  const options = useMemo(() => {
    return [
      {
        id: "email" as const,
        title: "Email Address",
        subtitle: "Send via email address securely.",
        icon: "envelope-o" as const,
      },
      {
        id: "2fa" as const,
        title: "2 Factor Authentication",
        subtitle: "Send via 2FA securely.",
        icon: "mobile" as const,
      },
      {
        id: "google" as const,
        title: "Google Authenticator",
        subtitle: "Send via authenticator securely.",
        icon: "google" as const,
      },
    ];
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.container}
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

          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Select which methods you&apos;d like to reset.
          </Text>

          <View style={styles.list}>
            {options.map((o) => {
              const selected = o.id === method;
              return (
                <Pressable
                  key={o.id}
                  onPress={() => setMethod(o.id)}
                  accessibilityRole="button"
                  style={[
                    styles.optionCard,
                    selected && styles.optionCardSelected,
                  ]}
                >
                  <View style={styles.optionIconWrap}>
                    <FontAwesome
                      name={o.icon}
                      size={18}
                      color={selected ? stylesVars.brand : stylesVars.iconMuted}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{o.title}</Text>
                    <Text style={styles.optionSubtitle}>{o.subtitle}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={styles.primaryButton} accessibilityRole="button">
            <Text style={styles.primaryButtonText}>Reset Password</Text>
            <FontAwesome name="arrow-right" size={16} color="#fff" />
          </Pressable>
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
    marginBottom: 14,
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
    marginBottom: 16,
  },
  list: {
    gap: 12,
    marginTop: 8,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: stylesVars.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "#f4f6f7",
  },
  optionCardSelected: {
    borderColor: stylesVars.brand,
    backgroundColor: "#ffffff",
  },
  optionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: stylesVars.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: stylesVars.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: stylesVars.muted,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: stylesVars.brand,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});

