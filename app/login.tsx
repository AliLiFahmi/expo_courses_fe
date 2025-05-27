import { AuthContext } from "@/utils/authContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Reset error message
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // TODO: Implement actual login logic here
      authContext.logIn();
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="flex-1 px-6 py-8 justify-center"
            style={{ minHeight: height - 50 }}
          >
            {/* Header dan Logo */}
            <View className="items-center mt-12 mb-10">
              <Image
                source={require("../assets/images/splash-icon.png")}
                className="w-20 h-20"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-white mb-2">
                Selamat Datang
              </Text>
              <Text className="text-white/80 text-center text-base">
                Silakan masuk ke akun Anda
              </Text>
            </View>

            {/* Card Form */}
            <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-lg">
              {/* Form Login */}
              <View className="mb-6">
                <Text className="text-white/80 mb-2 text-sm">Email</Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3.5 px-3 text-white text-base"
                    placeholder="Masukkan email Anda"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View className="mb-2">
                <Text className="text-white/80 mb-2 text-sm">Password</Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3.5 px-3 text-white text-base"
                    placeholder="Masukkan password Anda"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity className="self-end mb-6">
                <Text className="text-white/80 text-sm">Lupa password?</Text>
              </TouchableOpacity>

              {/* Error Message */}
              {error ? (
                <View className="bg-red-500/15 p-3 rounded-lg mb-4">
                  <Text className="text-red-300 text-center">{error}</Text>
                </View>
              ) : null}

              {/* Tombol Login */}
              <TouchableOpacity
                className={`bg-indigo-500 rounded-xl py-4 items-center shadow-lg ${
                  error ? "" : "mt-2"
                }`}
                style={{
                  shadowColor: "#6366F1",
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.5,
                  shadowRadius: 12,
                  elevation: 8,
                }}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold text-base">
                  {isLoading ? "Sedang Memproses..." : "Masuk"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Link Daftar */}
            <View className="flex-row justify-center">
              <Text className="text-white/70">Belum punya akun? </Text>
              <Link href="/register">
                <Text className="text-indigo-200 font-semibold">Daftar</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
