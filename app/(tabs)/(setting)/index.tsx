import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  const userProfile = {
    name: "Zendo",
    nim: "12345678",
    program: "Magister Ilmu Komputer",
    semester: 2,
  };

  const menuItems = [
    {
      id: 1,
      title: "Informasi Akun",
      icon: User,
      color: "#818CF8",
      bgColor: "bg-indigo-600/20",
    },
    {
      id: 2,
      title: "Pengaturan Aplikasi",
      icon: Settings,
      color: "#4ADE80",
      bgColor: "bg-green-600/20",
    },
    {
      id: 3,
      title: "Notifikasi",
      icon: Bell,
      color: "#FBBF24",
      bgColor: "bg-yellow-600/20",
    },
    {
      id: 4,
      title: "Privasi & Keamanan",
      icon: Shield,
      color: "#F472B6",
      bgColor: "bg-pink-600/20",
    },
    {
      id: 5,
      title: "Bantuan & Dukungan",
      icon: HelpCircle,
      color: "#60A5FA",
      bgColor: "bg-blue-600/20",
    },
  ];

  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* Header Area */}
      <View className="pt-12 px-4 pb-4">
        <Text className="text-white text-2xl font-bold mb-1">Pengaturan</Text>
        <Text className="text-gray-400">Kelola akun dan preferensi Anda</Text>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 bg-gray-800 px-4 pt-4 rounded-t-3xl">
        {/* Profile Section */}
        <View className="bg-gray-700 rounded-lg p-4 mb-6">
          <View className="flex-row items-center">
            <View className="h-16 w-16 bg-indigo-600 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-2xl font-bold">Z</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">
                {userProfile.name}
              </Text>
              <Text className="text-gray-400">{userProfile.nim}</Text>
              <Text className="text-gray-400 text-sm">
                {userProfile.program}
              </Text>
              <Text className="text-indigo-400 text-sm">
                Semester {userProfile.semester}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mb-6">
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              className="bg-gray-700 rounded-lg p-4 mb-3 flex-row items-center"
              onPress={() => console.log(`Menu ${item.title} pressed`)}
            >
              <View
                className={`${item.bgColor} p-2 rounded-lg w-10 h-10 items-center justify-center mr-3`}
              >
                <item.icon size={20} color={item.color} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable
          className="bg-red-600/20 rounded-lg p-4 mb-6 flex-row items-center"
          onPress={() => console.log("Logout pressed")}
        >
          <View className="bg-red-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
            <LogOut size={20} color="#EF4444" />
          </View>
          <Text className="text-red-500 font-bold">Keluar</Text>
        </Pressable>

        {/* Version Info */}
        <View className="items-center mb-6">
          <Text className="text-gray-500 text-sm">Versi 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
