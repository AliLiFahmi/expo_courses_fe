import { router } from "expo-router";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  // Sample data untuk mata kuliah
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Struktur Data",
      instructor: "Dr. John Doe",
      schedule: "Senin, 08:00 - 10:30",
      room: "Lab Komputer 1",
      progress: 75,
    },
    {
      id: 2,
      title: "Algoritma Pemrograman",
      instructor: "Prof. Jane Smith",
      schedule: "Selasa, 13:00 - 15:30",
      room: "Lab Komputer 2",
      progress: 60,
    },
    {
      id: 3,
      title: "Basis Data",
      instructor: "Dr. David Wilson",
      schedule: "Rabu, 10:00 - 12:30",
      room: "Lab Database",
      progress: 45,
    },
    {
      id: 4,
      title: "Pemrograman Web",
      instructor: "Dr. Sarah Johnson",
      schedule: "Kamis, 15:00 - 17:30",
      room: "Lab Internet",
      progress: 90,
    },
    {
      id: 5,
      title: "Kecerdasan Buatan",
      instructor: "Dr. Michael Brown",
      schedule: "Jumat, 09:00 - 11:30",
      room: "Lab AI",
      progress: 30,
    },
  ]);

  // Data jadwal pertemuan berikutnya
  const upcomingSchedules = [
    {
      id: 1,
      title: "Struktur Data",
      type: "Kuliah",
      time: "Senin, 08:00 - 10:30",
      room: "Lab Komputer 1",
    },
    {
      id: 2,
      title: "Algoritma Pemrograman",
      type: "Tugas Deadline",
      time: "Selasa, 23:59",
      room: "Online Submission",
    },
    {
      id: 3,
      title: "Basis Data",
      type: "Quiz",
      time: "Rabu, 10:00",
      room: "Lab Database",
    },
  ];

  // Data tugas yang harus diselesaikan
  const assignments = [
    {
      id: 1,
      title: "Implementasi Linked List",
      course: "Struktur Data",
      deadline: "Besok, 23:59",
      isCompleted: false,
    },
    {
      id: 2,
      title: "ERD Database Perpustakaan",
      course: "Basis Data",
      deadline: "3 hari lagi",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Landing Page Website",
      course: "Pemrograman Web",
      deadline: "5 hari lagi",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Algoritma Sorting",
      course: "Algoritma Pemrograman",
      deadline: "Hari ini, 23:59",
      isCompleted: false,
    },
  ];

  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* Header Area dengan Welcome Message */}
      <View className="pt-12 px-4 pb-4">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold mb-1">Zendo</Text>
            <Text className="text-gray-400">
              Selamat datang kembali, Mahasiswa!
            </Text>
          </View>
          <Pressable
            className="h-10 w-10 bg-gray-800 rounded-full items-center justify-center"
            onPress={() => console.log("Profile pressed")}
          >
            <Text className="text-white font-bold">A</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 bg-gray-800 px-4 pt-4 rounded-t-3xl">
        {/* Menu Cards */}
        <View className="flex flex-row justify-between mb-6">
          <Pressable
            className="bg-gray-700 rounded-lg p-3 w-[48%]"
            onPress={() => router.push("/(tabs)/(course)")}
          >
            <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-2">
              <BookOpen size={20} color="#818CF8" />
            </View>
            <Text className="text-white font-bold mb-1">Mata Kuliah</Text>
            <Text className="text-gray-400 text-xs">
              {courses.length} mata kuliah aktif
            </Text>
          </Pressable>

          <Pressable
            className="bg-gray-700 rounded-lg p-3 w-[48%]"
            onPress={() => console.log("Calendar pressed")}
          >
            <View className="bg-green-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-2">
              <Calendar size={20} color="#4ADE80" />
            </View>
            <Text className="text-white font-bold mb-1">Jadwal</Text>
            <Text className="text-gray-400 text-xs">Lihat semua agenda</Text>
          </Pressable>
        </View>

        {/* Today's Schedule */}
        <View className="mb-6">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">
              Jadwal Terdekat
            </Text>
            <Pressable
              className="flex flex-row items-center"
              onPress={() => console.log("View all schedules")}
            >
              <Text className="text-indigo-400 mr-1">Lihat Semua</Text>
              <ChevronRight size={16} color="#818CF8" />
            </Pressable>
          </View>

          {/* Schedule List */}
          <View className="flex flex-col">
            {upcomingSchedules.map((schedule) => (
              <Pressable
                key={schedule.id}
                className="bg-gray-700 rounded-lg p-4 mb-3 flex flex-row items-center"
                onPress={() => console.log("Schedule selected:", schedule.id)}
              >
                <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                  <Clock size={20} color="#818CF8" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold">{schedule.title}</Text>
                  <Text className="text-gray-400 text-xs">
                    {schedule.type} • {schedule.time}
                  </Text>
                </View>
                <View className="bg-indigo-600 px-2 py-1 rounded">
                  <Text className="text-white text-xs">{schedule.room}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Assignments Section */}
        <View className="mb-6">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">Tugas-tugas</Text>
            <Pressable
              className="flex flex-row items-center"
              onPress={() => console.log("View all assignments")}
            >
              <Text className="text-indigo-400 mr-1">Lihat Semua</Text>
              <ChevronRight size={16} color="#818CF8" />
            </Pressable>
          </View>

          {/* Assignment List */}
          <View className="flex flex-col">
            {assignments.map((assignment) => (
              <Pressable
                key={assignment.id}
                className={`bg-gray-700 rounded-lg p-4 mb-3 flex flex-row items-center ${
                  assignment.isCompleted ? "opacity-60" : ""
                }`}
                onPress={() =>
                  console.log("Assignment selected:", assignment.id)
                }
              >
                <View
                  className={`p-2 rounded-lg w-10 h-10 items-center justify-center mr-3 ${
                    assignment.isCompleted
                      ? "bg-green-600/20"
                      : "bg-yellow-600/20"
                  }`}
                >
                  {assignment.isCompleted ? (
                    <CheckCircle size={20} color="#4ADE80" />
                  ) : (
                    <Clock size={20} color="#FBBF24" />
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-white font-bold ${
                      assignment.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {assignment.title}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {assignment.course} • {assignment.deadline}
                  </Text>
                </View>
                <Pressable
                  className={`w-6 h-6 rounded-full border ${
                    assignment.isCompleted
                      ? "bg-green-600 border-green-600"
                      : "border-gray-500"
                  } items-center justify-center`}
                  onPress={() =>
                    console.log("Toggle completion:", assignment.id)
                  }
                >
                  {assignment.isCompleted && (
                    <CheckCircle size={12} color="#FFFFFF" />
                  )}
                </Pressable>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View className="mb-8">
          <Text className="text-white text-lg font-bold mb-4">Pencapaian</Text>
          <View className="bg-gray-700 rounded-lg p-4">
            <View className="flex flex-row items-center mb-3">
              <View className="bg-yellow-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mr-3">
                <Award size={20} color="#FBBF24" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">
                  Produktivitas Mingguan
                </Text>
                <Text className="text-gray-400 text-xs">
                  Selesaikan 10 tugas minggu ini
                </Text>
              </View>
              <Text className="text-yellow-400 font-bold">7/10</Text>
            </View>

            <View className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
              <View className="w-[70%] h-full bg-yellow-400 rounded-full" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
