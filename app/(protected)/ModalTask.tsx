import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTask } from "../../hooks/useTask";

export default function ModalTask() {
  const { id, course_id } = useLocalSearchParams<{
    id: string;
    course_id: string;
  }>();
  const router = useRouter();
  const { createTask, updateTask, getTaskById } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (id) {
      getTaskById(id).then((task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(new Date(task.deadline));
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateTask(id, {
          title,
          description,
          deadline: deadline.toISOString(),
        });
      } else {
        await createTask({
          title,
          description,
          deadline: deadline.toISOString(),
          course_id: course_id,
        });
      }
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100">
      <View className="flex-1 p-4">
        <View className="space-y-6 bg-white rounded-2xl shadow-lg p-5 mx-2">
          <Text className="text-2xl font-bold text-gray-800">
            {id ? "Edit Task" : "Create Task"}
          </Text>

          <View className="space-y-2">
            <Text className="text-gray-600 font-medium">Title</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="space-y-2">
            <Text className="text-gray-600 font-medium">Description</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>

          <View className="space-y-2">
            <Text className="text-gray-600 font-medium">Deadline</Text>
            <TouchableOpacity
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 active:bg-gray-100 transition duration-200"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-gray-800">
                {deadline.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDeadline(selectedDate);
                  }
                }}
              />
            )}
          </View>

          <TouchableOpacity
            className="bg-blue-600 rounded-xl p-4 items-center active:bg-blue-700 transition duration-200 shadow-md"
            onPress={handleSubmit}
          >
            <Text className="text-white text-lg font-semibold">
              {id ? "Update Task" : "Create Task"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
