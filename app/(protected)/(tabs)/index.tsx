import { AuthContext } from "@/utils/authContext";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Heart,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react-native";
import { useContext } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  const { user } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 flex flex-col bg-gray-900"
      style={{
        paddingTop: insets.top,
      }}
    >
      {/* Header Area dengan Welcome Message */}
      <View className="pt-8 px-4 pb-4">
        <View className="flex flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/images/Icon.png")}
              className="w-12 h-12 mr-3"
              resizeMode="contain"
            />
            <View>
              <Text className="text-white text-3xl font-bold mb-1">Zendo</Text>
              <Text className="text-gray-400">
                Hai, {user?.full_name || "Mahasiswa"} 👋
              </Text>
            </View>
          </View>
          <Pressable
            className="h-10 w-10 bg-indigo-600 rounded-full items-center justify-center"
            onPress={() => router.push("/(tabs)/(setting)")}
          >
            <Text className="text-white font-bold">
              {user?.full_name ? user.full_name[0].toUpperCase() : ""}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 bg-gray-800 px-4 pt-4 rounded-t-3xl">
        {/* Hero Section */}
        <View className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6">
          <Text className="text-white text-2xl font-bold mb-2">
            🚀 Revolusi Cara Belajarmu!
          </Text>
          <Text className="text-indigo-200 text-base mb-4">
            Jadilah mahasiswa yang lebih produktif dengan Zendo! Kelola semua
            mata kuliah, tugas, dan jadwal dalam satu platform yang mudah dan
            menyenangkan.
          </Text>
          <Pressable
            className="bg-white rounded-lg py-3 px-4 self-start"
            onPress={() => router.push("/(tabs)/(course)")}
          >
            <Text className="text-indigo-600 font-bold">🎯 Mulai Sekarang</Text>
          </Pressable>
        </View>

        {/* Menu Cards */}
        <View className="flex flex-row justify-between mb-6">
          <Pressable
            className="bg-gray-700 rounded-lg p-4 w-[100%]"
            onPress={() => router.push("/(tabs)/(course)")}
          >
            <View className="bg-indigo-600/20 p-3 rounded-lg w-12 h-12 items-center justify-center mb-3">
              <BookOpen size={24} color="#818CF8" />
            </View>
            <Text className="text-white font-bold mb-1">📚 Mata Kuliah</Text>
            <Text className="text-gray-400 text-xs">
              Atur semua mata kuliah dengan mudah
            </Text>
          </Pressable>
        </View>

        {/* Stats yang Memotivasi */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-4">
            ⚡ Kenapa Zendo Berbeda?
          </Text>
          <View className="bg-gray-700 rounded-lg p-4">
            <Text className="text-gray-300 text-sm leading-6 mb-4">
              Zendo hadir untuk mengubah cara mahasiswa belajar. Dengan
              teknologi terdepan dan desain yang intuitif, kamu bisa
              meningkatkan produktivitas hingga 3x lipat!
            </Text>
            <View className="border-t border-gray-600 pt-4">
              <Text className="text-indigo-400 font-semibold mb-2">
                🎉 Fitur Unggulan yang Bikin Belajar Jadi Seru:
              </Text>
              <Text className="text-gray-300 text-sm">
                • 📊 Dashboard analytics untuk track progress belajar{"\n"}• ⏰
                Smart reminder yang nggak bikin kamu telat deadline{"\n"}• 🎯
                Goal setting untuk capai target IPK impianmu{"\n"}• 📝
                Note-taking cerdas dengan AI assistant
              </Text>
            </View>
          </View>
        </View>

        {/* Keunggulan */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-4">
            🏆 Keunggulan yang Bikin Kamu Unggul
          </Text>
          <View className="space-y-3 gap-3">
            <View className="bg-gray-700 rounded-lg p-4 flex flex-row items-center">
              <View className="bg-yellow-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Zap size={20} color="#FBBF24" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">
                  Boost Produktivitas 3x
                </Text>
                <Text className="text-gray-400 text-xs">
                  Sistem manajemen waktu yang terbukti efektif
                </Text>
              </View>
            </View>

            <View className="bg-gray-700 rounded-lg p-4 flex flex-row items-center">
              <View className="bg-green-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Trophy size={20} color="#22C55E" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">IPK Naik Drastis</Text>
                <Text className="text-gray-400 text-xs">
                  87% pengguna melaporkan peningkatan nilai
                </Text>
              </View>
            </View>

            <View className="bg-gray-700 rounded-lg p-4 flex flex-row items-center">
              <View className="bg-purple-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Clock size={20} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">
                  Hemat Waktu Belajar
                </Text>
                <Text className="text-gray-400 text-xs">
                  Belajar lebih efisien, punya waktu lebih banyak
                </Text>
              </View>
            </View>

            <View className="bg-gray-700 rounded-lg p-4 flex flex-row items-center">
              <View className="bg-red-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Heart size={20} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">
                  Stress-Free Learning
                </Text>
                <Text className="text-gray-400 text-xs">
                  Belajar jadi lebih santai dan menyenangkan
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Proof */}
        <View className="bg-gray-700 rounded-lg p-4 mb-6">
          <View className="flex flex-row items-center mb-3">
            <Users size={20} color="#818CF8" />
            <Text className="text-white font-bold ml-2">
              Join 10,000+ Mahasiswa Sukses
            </Text>
          </View>
          <Text className="text-gray-300 text-sm mb-3">
            "Zendo benar-benar game changer! IPK saya naik dari 2.8 jadi 3.6
            dalam 2 semester. Highly recommended!"
          </Text>
          <Text className="text-indigo-400 text-xs">
            - Sarah, Teknik Informatika UI
          </Text>
        </View>

        {/* Call to Action */}
        <View className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8">
          <View className="flex flex-row items-center mb-4">
            <View className="bg-white/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
              <Star size={20} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                🎯 Siap Jadi Mahasiswa Berprestasi?
              </Text>
              <Text className="text-indigo-200 text-sm">
                Bergabunglah dengan ribuan mahasiswa yang sudah merasakan
                manfaatnya!
              </Text>
            </View>
          </View>

          <Pressable
            className="bg-white rounded-lg py-3 px-4 flex flex-row items-center justify-center"
            onPress={() => router.push("/(tabs)/(course)")}
          >
            <Text className="text-indigo-600 font-bold mr-2">
              🚀 Mulai Transformasi Belajarmu
            </Text>
            <ChevronRight size={16} color="#4338CA" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
