import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { useState, useEffect } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCourse } from "../../hooks/useCourse";

export default function ModalAdd() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class_name: "",
  });

  const { courseId } = useLocalSearchParams();
  const { getCourseById, createCourse, updateCourse } = useCourse();

  useEffect(() => {
    if (courseId) {
      const fetchCourseData = async () => {
        try {
          const course = await getCourseById(courseId);
          setFormData({
            title: course.title || "",
            description: course.description || "",
            class_name: course.class_name || "",
          });
        } catch (err) {
          console.error("Error fetching course data:", err);
        }
      };
      fetchCourseData();
    }
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      if (courseId) {
        await updateCourse(courseId, formData);
        Alert.alert("Sukses", "Tugas berhasil diperbarui");
      } else {
        await createCourse(formData);
        Alert.alert("Sukses", "Tugas berhasil ditambahkan");
      }
      router.back();
    } catch (err) {
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan tugas");
      console.error("Error saving course:", err);
    }
  };

  return (
    <View className="flex-1 bg-gray-900/80 justify-center items-center p-4">
      <View className="bg-gray-800 w-full rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-xl font-bold">
            {courseId ? "Edit Tugas" : "Tambah Tugas Baru"}
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
            <Text className="text-gray-400 mb-2">Semester / Kelas</Text>
            <TextInput
              className="bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="Masukkan nama kelas"
              placeholderTextColor="#6B7280"
              value={formData.class_name}
              onChangeText={(text) =>
                setFormData({ ...formData, class_name: text })
              }
            />
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          className="bg-indigo-600 py-3 rounded-lg mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold">
            {courseId ? "Perbarui Tugas" : "Simpan Tugas"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
