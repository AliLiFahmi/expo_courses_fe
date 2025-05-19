import { AuthContext } from "@/utils/authContext";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
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

    // TODO: Implement actual login logic here
    // For now, just redirect to protected route
    router.replace("/(protected)/(tabs)");
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      {/* Logo dan Judul */}
      <View className="items-center mb-10">
        {/* <Image
          source={require("../assets/logo.png")}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        /> */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Selamat Datang
        </Text>
        <Text className="text-gray-600 text-center">
          Silakan masuk ke akun Anda
        </Text>
      </View>

      {/* Form Login */}
      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            className="bg-gray-100 rounded-lg p-4"
            placeholder="Masukkan email Anda"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-2">Password</Text>
          <TextInput
            className="bg-gray-100 rounded-lg p-4"
            placeholder="Masukkan password Anda"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Error Message */}
        {error ? (
          <Text className="text-red-500 text-center">{error}</Text>
        ) : null}

        {/* Tombol Login */}
        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-4 mt-4"
          onPress={authContext.logIn}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Masuk
          </Text>
        </TouchableOpacity>

        {/* Link Daftar */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Belum punya akun? </Text>
          <Link href="/register" className="text-blue-500 font-semibold">
            Daftar
          </Link>
        </View>
      </View>
    </View>
  );
}
