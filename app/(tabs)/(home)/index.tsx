import { router } from "expo-router";
import {
  ChevronRight,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  // Sample data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Struktur Data",
      instructor: "Dr. John Doe",
      schedule: "Senin, 08:00 - 10:30",
      room: "Lab Komputer 1",
    },
    {
      id: 2,
      title: "Algoritma Pemrograman",
      instructor: "Prof. Jane Smith",
      schedule: "Selasa, 13:00 - 15:30",
      room: "Lab Komputer 2",
    },
    {
      id: 3,
      title: "Basis Data",
      instructor: "Dr. David Wilson",
      schedule: "Rabu, 10:00 - 12:30",
      room: "Lab Database",
    },
    {
      id: 4,
      title: "Pemrograman Web",
      instructor: "Dr. Sarah Johnson",
      schedule: "Kamis, 15:00 - 17:30",
      room: "Lab Internet",
    },
    {
      id: 5,
      title: "Pemrograman Web",
      instructor: "Dr. Sarah Johnson",
      schedule: "Kamis, 15:00 - 17:30",
      room: "Lab Internet",
    },
  ]);

  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* Header Area */}
      <View className="pt-12 px-4 pb-4">
        <Text className="text-white text-2xl font-bold mb-2">Zendo</Text>
        <Text className="text-gray-400">Manajemen Perkuliahan Anda</Text>
      </View>

      {/* Search Bar */}
      <View className="flex flex-row px-4 mb-4">
        <View className="flex-1 flex flex-row items-center bg-gray-800 rounded-lg p-2 mr-2">
          <Search size={20} color="#9CA3AF" />
          <Text className="text-gray-400 ml-2">Cari mata kuliah...</Text>
        </View>
        <View className="bg-indigo-600 p-2 rounded-lg">
          <SlidersHorizontal size={20} color="#FFFFFF" />
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 bg-gray-800 px-4 pt-4 rounded-t-3xl">
        {/* Course Summary */}
        <View className="bg-indigo-600 p-4 rounded-lg mb-4">
          <Text className="text-white text-lg font-bold mb-2">
            Ringkasan Perkuliahan
          </Text>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-indigo-200">Total Mata Kuliah</Text>
              <Text className="text-white text-xl font-bold">
                {courses.length}
              </Text>
            </View>
            <View>
              <Text className="text-indigo-200">Semester Aktif</Text>
              <Text className="text-white text-xl font-bold">Ganjil 2023</Text>
            </View>
          </View>
        </View>

        {/* Course Preview Section */}
        <View className="mb-6">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">
              Mata Kuliah Terdaftar
            </Text>
            <Pressable
              className="flex flex-row items-center"
              onPress={() => router.push("/(tabs)/(course)")}
            >
              <Text className="text-indigo-400 mr-1">Lihat Semua</Text>
              <ChevronRight size={16} color="#818CF8" />
            </Pressable>
          </View>

          {/* Course List Preview */}
          <View className="flex flex-col">
            {courses.slice(0, 5).map((course) => (
              <Pressable
                key={course.id}
                className="bg-gray-700 rounded-lg p-4 mb-4"
                onPress={() => console.log("Course selected:", course.id)}
              >
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-white text-lg font-bold">
                    {course.title}
                  </Text>
                  <View className="bg-indigo-600 px-3 py-1 rounded">
                    <Text className="text-white text-sm">{course.room}</Text>
                  </View>
                </View>
                <Text className="text-gray-400 mb-1">
                  Pengajar: {course.instructor}
                </Text>
                <Text className="text-gray-400">{course.schedule}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/modal-course")}
      >
        <Plus size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
