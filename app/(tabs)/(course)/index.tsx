import { router } from "expo-router";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  GraduationCap,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Struktur Data",
      instructor: "Dr. John Doe",
      schedule: "Senin, 08:00 - 10:30",
      room: "Lab Komputer 1",
      credits: 3,
      semester: 3,
      category: "Pemrograman",
      progress: 75,
      color: "#4F46E5", // indigo
    },
    {
      id: 2,
      title: "Algoritma Pemrograman",
      instructor: "Prof. Jane Smith",
      schedule: "Selasa, 13:00 - 15:30",
      room: "Lab Komputer 2",
      credits: 4,
      semester: 1,
      category: "Pemrograman",
      progress: 60,
      color: "#4F46E5", // indigo
    },
    {
      id: 3,
      title: "Basis Data",
      instructor: "Dr. David Wilson",
      schedule: "Rabu, 10:00 - 12:30",
      room: "Lab Database",
      credits: 3,
      semester: 3,
      category: "Database",
      progress: 45,
      color: "#0284C7", // sky
    },
    {
      id: 4,
      title: "Pemrograman Web",
      instructor: "Dr. Sarah Johnson",
      schedule: "Kamis, 15:00 - 17:30",
      room: "Lab Internet",
      credits: 4,
      semester: 4,
      category: "Web",
      progress: 90,
      color: "#DC2626", // red
    },
    {
      id: 5,
      title: "Kecerdasan Buatan",
      instructor: "Dr. Michael Brown",
      schedule: "Jumat, 13:00 - 15:30",
      room: "Lab AI",
      credits: 3,
      semester: 6,
      category: "AI",
      progress: 30,
      color: "#059669", // emerald
    },
    {
      id: 6,
      title: "Jaringan Komputer",
      instructor: "Prof. Robert Lee",
      schedule: "Senin, 15:00 - 17:30",
      room: "Lab Networking",
      credits: 3,
      semester: 5,
      category: "Jaringan",
      progress: 50,
      color: "#7C3AED", // violet
    },
  ]);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  // Filter categories
  const filters = ["Semua", "Pemrograman", "Database", "Web", "AI", "Jaringan"];

  // Filter courses based on search and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      activeFilter === "Semua" || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Sort courses - higest semester first
  const sortedCourses = [...filteredCourses].sort(
    (a, b) => b.semester - a.semester
  );

  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* Header Area with Back Button */}
      <View className="pt-12 px-4 pb-4 flex flex-row items-center">
        <Pressable
          className="mr-3 p-2 bg-gray-800 rounded-full"
          onPress={() => router.back()}
        >
          <ChevronLeft size={20} color="#FFFFFF" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-white text-xl font-bold">Mata Kuliah</Text>
          <Text className="text-gray-400">Daftar mata kuliah semester ini</Text>
        </View>
      </View>

      {/* Course Statistics */}
      <ScrollView
        className="flex-1 bg-gray-800 rounded-t-3xl"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-6 mb-4">
          <View className="bg-gray-700 rounded-xl p-5">
            <Text className="text-white text-lg font-bold mb-4">
              Statistik Akademik
            </Text>

            <View className="flex flex-row justify-between mb-5">
              <View className="w-[30%] bg-gray-800 rounded-lg p-3 items-center">
                <View className="bg-indigo-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-2">
                  <BookOpen size={18} color="#818CF8" />
                </View>
                <Text className="text-indigo-400 text-xs mb-1">
                  Mata Kuliah
                </Text>
                <Text className="text-white text-lg font-bold">
                  {courses.length}
                </Text>
              </View>

              <View className="w-[30%] bg-gray-800 rounded-lg p-3 items-center">
                <View className="bg-green-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-2">
                  <GraduationCap size={18} color="#4ADE80" />
                </View>
                <Text className="text-green-400 text-xs mb-1">Total SKS</Text>
                <Text className="text-white text-lg font-bold">
                  {totalCredits}
                </Text>
              </View>

              <View className="w-[30%] bg-gray-800 rounded-lg p-3 items-center">
                <View className="bg-purple-600/20 p-2 rounded-lg w-10 h-10 items-center justify-center mb-2">
                  <Calendar size={18} color="#C084FC" />
                </View>
                <Text className="text-purple-400 text-xs mb-1">Semester</Text>
                <Text className="text-white text-lg font-bold">
                  Ganjil 2023
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="mb-1">
              <View className="flex flex-row justify-between mb-1">
                <Text className="text-gray-400 text-xs">Progress Semester</Text>
                <Text className="text-gray-400 text-xs">75%</Text>
              </View>
              <View className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <View className="w-3/4 h-full bg-indigo-500 rounded-full" />
              </View>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex flex-row px-4 mb-4">
          <View className="flex-1 flex flex-row items-center bg-gray-700/50 backdrop-blur-lg rounded-xl p-3 mr-2 border border-gray-600/50">
            <Search size={20} color="#E5E7EB" />
            <TextInput
              className="flex-1 text-gray-100 ml-2 leading-6 py-0"
              placeholder="Cari mata kuliah..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              style={{ height: 24 }}
            />
          </View>
          <Pressable className="bg-indigo-500/30 backdrop-blur-lg p-3 rounded-xl border border-indigo-500/50">
            <SlidersHorizontal size={20} color="#A5B4FC" />
          </Pressable>
        </View>

        {/* Filter Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 px-4"
        >
          {filters.map((filter) => (
            <Pressable
              key={filter}
              className={`px-4 py-2 rounded-full mr-2 ${
                activeFilter === filter ? "bg-indigo-600" : "bg-gray-700"
              }`}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                className={`${
                  activeFilter === filter ? "text-white" : "text-gray-400"
                } font-medium`}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Course List */}
        <View className="px-4 mb-24">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <Pressable
                key={course.id}
                className="bg-gray-700 rounded-lg p-4 mb-4"
                onPress={() => router.push(`/(tabs)/(course)/${course.id}`)}
              >
                <View className="flex flex-row items-center mb-3">
                  <View
                    style={{ backgroundColor: course.color }}
                    className="w-12 h-12 rounded-lg items-center justify-center mr-3"
                  >
                    <BookOpen size={22} color="#FFFFFF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-lg font-bold">
                      {course.title}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {course.category}
                    </Text>
                  </View>
                  <View className="bg-gray-800 p-2 rounded-lg">
                    <Text className="text-white font-medium">
                      {course.credits} SKS
                    </Text>
                  </View>
                </View>

                <View className="mb-3">
                  {/* Progress bar */}
                  <View className="flex flex-row justify-between mb-1">
                    <Text className="text-gray-400 text-xs">
                      Progress Perkuliahan
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {course.progress}%
                    </Text>
                  </View>
                  <View className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: course.color,
                        width: `${course.progress}%`,
                      }}
                    />
                  </View>
                </View>

                <View className="flex flex-row justify-between border-t border-gray-600 pt-3">
                  <View className="flex flex-row items-center">
                    <Users size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm ml-1">
                      {course.instructor}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Clock size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-sm ml-1">
                      {course.schedule}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row flex-wrap mt-3">
                  <View className="bg-gray-800 px-2 py-1 rounded mr-2 mb-1">
                    <Text className="text-gray-300 text-xs">
                      Semester {course.semester}
                    </Text>
                  </View>
                  <View className="bg-gray-800 px-2 py-1 rounded mr-2 mb-1">
                    <Text className="text-gray-300 text-xs">{course.room}</Text>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-400 text-center">
                Tidak ada mata kuliah yang ditemukan
              </Text>
            </View>
          )}
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
