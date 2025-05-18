import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ModalAdd() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleSubmit = () => {
    // Implementasi logika penambahan tugas di sini
    console.log("Tugas baru:", formData);
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-900/80 justify-center items-center p-4">
      <View className="bg-gray-800 w-full rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-xl font-bold">
            Tambah Tugas Baru
          </Text>
          <Pressable onPress={() => router.back()}>
            <X size={24} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Form */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-400 mb-2">Judul Tugas</Text>
            <TextInput
              className="bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="Masukkan judul tugas"
              placeholderTextColor="#6B7280"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          <View>
            <Text className="text-gray-400 mb-2">Deskripsi</Text>
            <TextInput
              className="bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="Masukkan deskripsi tugas"
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={3}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
          </View>

          <View>
            <Text className="text-gray-400 mb-2">Deadline</Text>
            <TextInput
              className="bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#6B7280"
              value={formData.deadline}
              onChangeText={(text) =>
                setFormData({ ...formData, deadline: text })
              }
            />
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          className="bg-indigo-600 py-3 rounded-lg mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold">Simpan Tugas</Text>
        </Pressable>
      </View>
    </View>
  );
}
