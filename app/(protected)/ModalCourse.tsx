import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
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
        ToastAndroid.show(
          "Mata Kuliah berhasil diperbarui",
          ToastAndroid.SHORT
        );
      } else {
        await createCourse(formData);
        ToastAndroid.show(
          "Mata Kuliah berhasil ditambahkan",
          ToastAndroid.SHORT
        );
      }
      router.back();
    } catch (err) {
      ToastAndroid.show("Gagal menyimpan Mata Kuliah", ToastAndroid.SHORT);
      console.error("Error saving course:", err);
    }
  };

  return (
    <View
      className="flex-1 justify-center items-center p-8"
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(20px)",
      }}
    >
      <ScrollView
        className="w-full max-w-sm"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-white text-2xl font-bold tracking-tight">
              {courseId ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </Text>
            <View
              className="h-1 rounded-full mt-2"
              style={{
                width: 40,
                background: "linear-gradient(90deg, #4F46E5, #3B82F6)",
                backgroundColor: "#4F46E5",
              }}
            />
          </View>
          <Pressable
            onPress={() => router.back()}
            className="p-2 rounded-full"
            style={{ backgroundColor: "rgba(75, 85, 99, 0.3)" }}
          >
            <X size={20} color="#E5E7EB" />
          </Pressable>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Title Field */}
          <View className="mb-3">
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              JUDUL MATA KULAH
            </Text>
            <TextInput
              className="text-white text-base rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
              }}
              placeholder="Masukkan judul Mata Kuliah..."
              placeholderTextColor="#6B7280"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Description Field */}
          <View className="mb-3">
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              DESKRIPSI
            </Text>
            <TextInput
              className="text-white text-base rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
                textAlignVertical: "top",
                minHeight: 100,
              }}
              placeholder="Jelaskan detail Mata Kuliah..."
              placeholderTextColor="#6B7280"
              multiline
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
          </View>

          {/* Class Name Field */}
          <View className="mb-3">
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              SEMESTER / KELAS
            </Text>
            <TextInput
              className="text-white text-base rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
              }}
              placeholder="Masukkan nama kelas..."
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
          className="py-4 rounded-2xl mt-8 mb-6"
          style={{
            background: "#4F46E5",
            backgroundColor: "#4F46E5",
            shadowColor: "#4F46E5",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold text-lg tracking-wide">
            {courseId ? "Perbarui Mata Kuliah" : "Simpan Mata Kuliah"}
          </Text>
        </Pressable>

        {/* Footer */}
        <View className="items-center mb-4">
          <View
            className="h-1 rounded-full"
            style={{
              width: 60,
              backgroundColor: "rgba(75, 85, 99, 0.4)",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
