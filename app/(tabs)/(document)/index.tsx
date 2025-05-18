import { Clock, GraduationCap, ListTodo } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* <LinearGradient
        colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
        className="absolute w-full h-full"
      /> */}

      {/* Header */}
      <View className="pt-12 px-4 pb-4">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold mb-1">
              Tentang Zendo
            </Text>
            <Text className="text-gray-400">Manajemen Perkuliahan Anda</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-800 px-4 pt-4 rounded-t-3xl">
        {/* App Description */}
        <View className="bg-gray-700 rounded-lg p-5 mb-6">
          <Text className="text-white text-lg font-bold mb-3">
            Apa itu Zendo?
          </Text>
          <Text className="text-gray-400 leading-6 mb-4">
            Zendo adalah aplikasi manajemen perkuliahan yang dirancang khusus
            untuk membantu mahasiswa mengelola mata kuliah dan tugas dengan
            lebih efektif. Dengan antarmuka yang modern dan fitur yang lengkap,
            Zendo memudahkan Anda untuk tetap terorganisir dalam perkuliahan.
          </Text>
        </View>

        {/* Features */}
        <Text className="text-white text-xl font-bold mb-4">Fitur Utama</Text>
        <View className="space-y-4 mb-6">
          <View className="bg-gray-700 rounded-lg p-5">
            <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-3">
              <GraduationCap size={24} color="#818CF8" />
            </View>
            <Text className="text-white text-lg font-bold mb-2">
              Manajemen Mata Kuliah
            </Text>
            <Text className="text-gray-400 leading-6">
              Kelola semua mata kuliah Anda dalam satu tempat. Lihat jadwal,
              ruangan, dan informasi pengajar dengan mudah.
            </Text>
          </View>

          <View className="bg-gray-700 rounded-lg p-5">
            <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-3">
              <ListTodo size={24} color="#818CF8" />
            </View>
            <Text className="text-white text-lg font-bold mb-2">
              Tracking Tugas
            </Text>
            <Text className="text-gray-400 leading-6">
              Pantau semua tugas dari setiap mata kuliah. Atur deadline dan
              status penyelesaian untuk tetap terorganisir.
            </Text>
          </View>

          <View className="bg-gray-700 rounded-lg p-5">
            <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-3">
              <Clock size={24} color="#818CF8" />
            </View>
            <Text className="text-white text-lg font-bold mb-2">
              Pengingat Deadline
            </Text>
            <Text className="text-gray-400 leading-6">
              Dapatkan informasi tentang deadline tugas yang akan datang. Jangan
              sampai melewatkan tugas penting Anda.
            </Text>
          </View>
        </View>

        {/* How to Use */}
        <Text className="text-white text-xl font-bold mb-4">
          Cara Penggunaan
        </Text>
        <View className="bg-gray-700 rounded-lg p-5 mb-24">
          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="bg-indigo-600/20 w-8 h-8 rounded-lg items-center justify-center mr-3">
                <Text className="text-indigo-400 font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">
                  Tambah Mata Kuliah
                </Text>
                <Text className="text-gray-400">
                  Mulai dengan menambahkan mata kuliah yang Anda ambil semester
                  ini.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="bg-indigo-600/20 w-8 h-8 rounded-lg items-center justify-center mr-3">
                <Text className="text-indigo-400 font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">Atur Tugas</Text>
                <Text className="text-gray-400">
                  Tambahkan tugas untuk setiap mata kuliah dan atur
                  deadline-nya.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="bg-indigo-600/20 w-8 h-8 rounded-lg items-center justify-center mr-3">
                <Text className="text-indigo-400 font-bold">3</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold mb-1">
                  Pantau Progress
                </Text>
                <Text className="text-gray-400">
                  Perbarui status tugas dan pantau progress perkuliahan Anda.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
