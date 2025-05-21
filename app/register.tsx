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

export default function Register() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRegister = async () => {
    // Reset error message
    setError("");

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }

    if (password.length < 6) {
      setError("Password harus minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    if (!agreeToTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // TODO: Implement actual register logic here
      authContext.logIn(); // Auto login after registration
      router.replace("/(protected)/(tabs)");
    } catch (err) {
      setError("Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <View className="items-center mb-4">
              <Image
                source={require("../assets/images/splash-icon.png")}
                className="w-20 h-20"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-white mb-2">
                Buat Akun Baru
              </Text>
              <Text className="text-white/80 text-center text-base">
                Isi data diri Anda untuk membuat akun
              </Text>
            </View>

            {/* Card Form */}
            <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-lg">
              {/* Nama Lengkap */}
              <View className="mb-4">
                <Text className="text-white/80 mb-2 text-sm">Nama Lengkap</Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3 px-3 text-white text-base"
                    placeholder="Masukkan nama lengkap"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-white/80 mb-2 text-sm">Email</Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3 px-3 text-white text-base"
                    placeholder="Masukkan email Anda"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* Password */}
              <View className="mb-4">
                <Text className="text-white/80 mb-2 text-sm">Password</Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3 px-3 text-white text-base"
                    placeholder="Buat password"
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

              {/* Konfirmasi Password */}
              <View className="mb-4">
                <Text className="text-white/80 mb-2 text-sm">
                  Konfirmasi Password
                </Text>
                <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-1 border border-white/10">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                  <TextInput
                    className="flex-1 py-3 px-3 text-white text-base"
                    placeholder="Konfirmasi password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms and Conditions */}
              <TouchableOpacity
                className="flex-row items-center mb-4"
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View
                  className={`w-5 h-5 rounded mr-2 flex items-center justify-center ${
                    agreeToTerms
                      ? "bg-indigo-500"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-white/80 text-sm flex-1">
                  Saya setuju dengan{" "}
                  <Text className="text-indigo-200 font-semibold">
                    Syarat dan Ketentuan
                  </Text>{" "}
                  serta{" "}
                  <Text className="text-indigo-200 font-semibold">
                    Kebijakan Privasi
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* Error Message */}
              {error ? (
                <View className="bg-red-500/15 p-3 rounded-lg mb-4">
                  <Text className="text-red-300 text-center">{error}</Text>
                </View>
              ) : null}

              {/* Tombol Register */}
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
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text className="text-white font-semibold text-base">
                  {isLoading ? "Sedang Memproses..." : "Daftar"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Link Login */}
            <View className="flex-row justify-center">
              <Text className="text-white/70">Sudah punya akun? </Text>
              <Link href="/login">
                <Text className="text-indigo-200 font-semibold">Masuk</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
