import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Clock, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Tugas 1: Implementasi Linked List",
      description: "Membuat implementasi linked list dengan operasi dasar",
      deadline: "2023-12-20 23:59",
      status: "pending",
    },
    {
      id: 2,
      title: "Tugas 2: Binary Tree",
      description: "Implementasi binary tree dan traversal",
      deadline: "2023-12-25 23:59",
      status: "completed",
    },
    {
      id: 3,
      title: "Tugas 3: Graph Algorithm",
      description: "Implementasi algoritma DFS dan BFS",
      deadline: "2024-01-05 23:59",
      status: "pending",
    },
  ]);

  return (
    <View className="flex-1 bg-gray-900">
      <LinearGradient
        colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
        className="absolute w-full h-full"
      />

      {/* Header */}
      <View className="pt-12 px-4 pb-4 flex flex-row items-center">
        <Pressable
          className="mr-3 p-2 bg-indigo-500/30 backdrop-blur-lg rounded-xl border border-indigo-500/50"
          onPress={() => router.back()}
        >
          <ChevronLeft size={20} color="#A5B4FC" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-white text-xl font-bold">Struktur Data</Text>
          <Text className="text-indigo-200">Daftar tugas mata kuliah</Text>
        </View>
      </View>

      {/* Task List */}
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="mb-24">
          {tasks.map((task) => (
            <Pressable
              key={task.id}
              className="bg-indigo-900/30 backdrop-blur-lg rounded-2xl p-5 border border-indigo-800/50 shadow-lg mb-4"
              onPress={() => console.log("Task selected:", task.id)}
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white text-lg font-bold flex-1 mr-3">
                  {task.title}
                </Text>
                <View
                  className={`px-3 py-1 rounded-xl ${
                    task.status === "completed"
                      ? "bg-green-500/30 border-green-500/50"
                      : "bg-yellow-500/30 border-yellow-500/50"
                  } border`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      task.status === "completed"
                        ? "text-green-300"
                        : "text-yellow-300"
                    }`}
                  >
                    {task.status === "completed" ? "Selesai" : "Pending"}
                  </Text>
                </View>
              </View>

              <Text className="text-indigo-200 mb-3">{task.description}</Text>

              <View className="flex-row items-center">
                <Clock size={16} color="#A5B4FC" />
                <Text className="text-indigo-300 ml-2">
                  Deadline: {task.deadline}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-8 right-6 bg-indigo-500 w-16 h-16 rounded-2xl items-center justify-center shadow-2xl border border-indigo-400/50"
        onPress={() => console.log("Add new task")}
      >
        <Plus size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
