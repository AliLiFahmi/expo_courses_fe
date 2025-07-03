import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { Calendar, X } from "lucide-react-native";
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
import { useTask } from "../../hooks/useTask";

export default function ModalTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    course_id: "",
    status: "pending",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { taskId, courseId } = useLocalSearchParams();
  const { getTaskById, createTask, updateTask } = useTask();
  const { getCourses } = useCourse();

  useEffect(() => {
    // Load courses for dropdown
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses(courseId);
        setFormData({
          course_id: courseId || "",
        });
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();

    // Load task data if editing
    if (taskId) {
      const fetchTaskData = async () => {
        try {
          const task = await getTaskById(taskId);
          setFormData({
            title: task.title || "",
            description: task.description || "",
            deadline: task.deadline || "",
            course_id: task.course_id || "",
            status: task.status || "pending",
          });
        } catch (err) {
          console.error("Error fetching task data:", err);
        }
      };
      fetchTaskData();
    }
  }, [taskId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      ToastAndroid.show("Judul tugas tidak boleh kosong", ToastAndroid.SHORT);
      return;
    }
    if (!formData.course_id) {
      ToastAndroid.show("Mata kuliah tidak boleh kosong", ToastAndroid.SHORT);
      return;
    }
    if (!formData.deadline) {
      ToastAndroid.show("Deadline tidak boleh kosong", ToastAndroid.SHORT);
      return;
    }

    try {
      if (taskId) {
        await updateTask(taskId, formData);
        ToastAndroid.show("Tugas berhasil diperbarui", ToastAndroid.SHORT);
      } else {
        const newTask = {
          ...formData,
          status: "pending",
        };
        await createTask(newTask);
        ToastAndroid.show("Tugas berhasil ditambahkan", ToastAndroid.SHORT);
      }
      router.back();
    } catch (err) {
      ToastAndroid.show("Tugas gagal ditambahkan", ToastAndroid.SHORT);
      console.error("Error saving task:", err);
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
              {taskId ? "Edit Task" : "Buat Task"}
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
          <View>
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              JUDUL TASK
            </Text>
            <TextInput
              className="text-white text-base rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
                borderWidth: 0,
                outline: "none",
              }}
              placeholder="Masukkan judul task..."
              placeholderTextColor="#6B7280"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Description Field */}
          <View>
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              DESKRIPSI
            </Text>
            <TextInput
              className="text-white text-base rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
                borderWidth: 0,
                outline: "none",
                textAlignVertical: "top",
                minHeight: 100,
              }}
              placeholder="Jelaskan detail task..."
              placeholderTextColor="#6B7280"
              multiline
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
          </View>

          {/* Deadline Field */}
          <View>
            <Text className="text-gray-300 text-sm font-medium mb-3 tracking-wide">
              DEADLINE
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="rounded-2xl px-5 py-4"
              style={{
                backgroundColor: "rgba(56, 67, 82, 0.8)",
                borderWidth: 0,
              }}
            >
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-base"
                  style={{
                    color: formData.deadline ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  {formData.deadline
                    ? formatDate(formData.deadline)
                    : "Pilih Tanggal Deadline"}
                </Text>
                <Calendar size={20} color="#6B7280" />
              </View>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={
                  formData.deadline ? new Date(formData.deadline) : new Date()
                }
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const isoDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
                    setFormData({ ...formData, deadline: isoDate });
                  }
                }}
              />
            )}
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          className="py-4 rounded-2xl mt-8 mb-6"
          style={{
            background: "linear-gradient(135deg, #4F46E5, #3B82F6)",
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
            {taskId ? "Perbarui Task" : "Simpan Task"}
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
