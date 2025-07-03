import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Calendar,
  ChevronLeft,
  Clock,
  Edit3,
  FileText,
  MoreVertical,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useCourse } from "../../../../../hooks/useCourse";
import { useTask } from "../../../../../hooks/useTask";

// Skeleton Loading Component
const SkeletonLoader = ({ width, height, borderRadius = 4, style = {} }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#374151", "#4B5563"],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

// Header Skeleton
const HeaderSkeleton = () => (
  <View className="pt-8 px-4 pb-4 flex flex-row items-center">
    <View className="mr-3 p-2 bg-indigo-500/30 backdrop-blur-lg rounded-xl border border-indigo-500/50 w-11 h-11">
      <ChevronLeft size={20} color="#A5B4FC" />
    </View>
    <View className="flex-1">
      <SkeletonLoader
        width="70%"
        height={24}
        borderRadius={6}
        style={{ marginBottom: 8 }}
      />
      <SkeletonLoader width="50%" height={16} borderRadius={4} />
    </View>
    <SkeletonLoader width={32} height={32} borderRadius={6} />
  </View>
);

// Course Info Skeleton
const CourseInfoSkeleton = () => (
  <View className="mx-4 mb-4">
    <View className="bg-indigo-900/40 backdrop-blur-lg rounded-2xl p-4 border border-indigo-800/50">
      <SkeletonLoader width="60%" height={20} style={{ marginBottom: 12 }} />
      <SkeletonLoader width="100%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="80%" height={16} style={{ marginBottom: 16 }} />
      <View className="flex-row">
        <SkeletonLoader
          width={100}
          height={28}
          borderRadius={8}
          style={{ marginRight: 8 }}
        />
      </View>
    </View>
  </View>
);

// Statistics Skeleton
const StatisticsSkeleton = () => (
  <View className="mx-4 mb-4">
    <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50">
      <SkeletonLoader width="50%" height={20} style={{ marginBottom: 16 }} />
      <View className="flex-row justify-between">
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="items-center">
            <SkeletonLoader
              width={40}
              height={32}
              style={{ marginBottom: 8 }}
            />
            <SkeletonLoader width={50} height={14} />
          </View>
        ))}
      </View>
    </View>
  </View>
);

// Task Item Skeleton
const TaskItemSkeleton = () => (
  <View className="backdrop-blur-lg rounded-2xl p-5 border bg-indigo-900/30 border-indigo-800/50 shadow-lg mb-4">
    {/* Header */}
    <View className="flex-row justify-between items-start mb-3">
      <View className="flex-1 mr-3">
        <SkeletonLoader width="80%" height={20} style={{ marginBottom: 8 }} />
      </View>
      <View className="flex-row items-center space-x-2">
        <SkeletonLoader width={70} height={24} borderRadius={12} />
        <SkeletonLoader width={32} height={32} borderRadius={6} />
      </View>
    </View>

    {/* Description */}
    <SkeletonLoader width="100%" height={16} style={{ marginBottom: 8 }} />
    <SkeletonLoader width="70%" height={16} style={{ marginBottom: 16 }} />

    {/* Info rows */}
    <View className="space-y-2">
      <View className="flex-row items-center">
        <Clock size={16} color="#A5B4FC" />
        <SkeletonLoader width="60%" height={14} style={{ marginLeft: 8 }} />
      </View>
      <View className="flex-row items-center">
        <Calendar size={16} color="#A5B4FC" />
        <SkeletonLoader width="50%" height={14} style={{ marginLeft: 8 }} />
      </View>
    </View>
  </View>
);

// Task List Skeleton
const TaskListSkeleton = () => (
  <ScrollView className="flex-1 px-4 pt-2">
    <View className="mb-24">
      {[1, 2, 3].map((item) => (
        <TaskItemSkeleton key={item} />
      ))}
    </View>
  </ScrollView>
);

// Main Loading Skeleton Component
const LoadingSkeleton = () => (
  <View className="flex-1 bg-gray-900">
    <LinearGradient
      colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
      className="absolute w-full h-full"
    />
    <HeaderSkeleton />
    <CourseInfoSkeleton />
    <StatisticsSkeleton />
    <TaskListSkeleton />

    {/* Floating Action Button Skeleton */}
    <View className="absolute bottom-8 right-6 bg-indigo-500/50 w-16 h-16 rounded-2xl items-center justify-center shadow-2xl border border-indigo-400/50">
      <Plus size={28} color="#FFFFFF" opacity={0.5} />
    </View>
  </View>
);

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const [tasks, setTasks] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    getTasks,
    deleteTask,
    isLoading: tasksLoading,
    error: tasksError,
  } = useTask();
  const {
    getCourseById,
    isLoading: courseLoading,
    error: courseError,
  } = useCourse();

  // Fungsi untuk mengambil data course
  const fetchCourseInfo = async () => {
    try {
      if (id) {
        const course = await getCourseById(id);
        setCourseInfo(course);
      }
    } catch (err) {
      console.error("Error fetching course info:", err);
    }
  };

  // Fungsi untuk mengambil data tasks
  const fetchTasks = async () => {
    try {
      const allTasks = await getTasks(id);
      // Filter tasks berdasarkan course_id
      const courseTasks = allTasks.filter((task) => task.course_id === id);
      setTasks(courseTasks);
    } catch (err) {
      ToastAndroid.show("Gagal mengambil data tugas", ToastAndroid.SHORT);
      console.error("Error fetching tasks:", err);
    }
  };

  // Load data saat komponen pertama kali dimount
  useEffect(() => {
    if (id) {
      fetchCourseInfo();
      fetchTasks();
    }
  }, [id]);

  // Fungsi untuk refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchCourseInfo(), fetchTasks()]);
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Fungsi untuk menampilkan action modal
  const showTaskActions = (task) => {
    setSelectedTask(task);
    setShowActionModal(true);
  };

  // Fungsi untuk edit task
  const handleEditTask = () => {
    setShowActionModal(false);
    if (selectedTask) {
      router.push(`/ModalTask?taskId=${selectedTask.id}&courseId=${id}`);
    }
  };

  // Fungsi untuk delete task
  const handleDeleteTask = () => {
    setShowActionModal(false);
    setShowDeleteModal(true);
  };

  // Fungsi untuk konfirmasi delete
  const confirmDeleteTask = async () => {
    if (!selectedTask) return;

    setIsDeleting(true);
    try {
      await deleteTask(selectedTask.id);
      setShowDeleteModal(false);
      ToastAndroid.show("Tugas berhasil dihapus", ToastAndroid.SHORT);
      fetchTasks(); // Refresh task list
    } catch (error) {
      ToastAndroid.show("Gagal menghapus tugas", ToastAndroid.SHORT);
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Fungsi untuk batal delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      return dateString;
    }
  };

  // Fungsi untuk menentukan status color dan text
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          bgColor: "bg-green-500/30 border-green-500/50",
          textColor: "text-green-300",
          text: "Selesai",
        };
      case "ongoing":
        return {
          bgColor: "bg-blue-500/30 border-blue-500/50",
          textColor: "text-blue-300",
          text: "Progress",
        };
      case "pending":
      default:
        return {
          bgColor: "bg-yellow-500/30 border-yellow-500/50",
          textColor: "text-yellow-300",
          text: "Pending",
        };
    }
  };

  // Fungsi untuk menentukan apakah deadline sudah lewat
  const isOverdue = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < now;
  };

  // Loading state - Show skeleton
  if (tasksLoading || courseLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <View className="flex-1 bg-gray-900">
      <LinearGradient
        colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
        className="absolute w-full h-full"
      />

      {/* Header */}
      <View className="pt-8 px-4 pb-4 flex flex-row items-center">
        <Pressable
          className="mr-3 p-2 bg-indigo-500/30 backdrop-blur-lg rounded-xl border border-indigo-500/50"
          onPress={() => router.back()}
        >
          <ChevronLeft size={20} color="#A5B4FC" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-white text-xl font-bold">
            {courseInfo?.title || "Detail Mata Kuliah"}
          </Text>
          <Text className="text-indigo-200">
            {tasks.length} tugas • {courseInfo?.class_name || ""}
          </Text>
        </View>
        <Pressable
          className="mr-3 p-2 bg-indigo-500/30 backdrop-blur-lg rounded-xl border border-indigo-500/50"
          onPress={() => {
            fetchCourseInfo();
            fetchTasks();
          }}
        >
          <RefreshCcw size={20} color="#A5B4FC" />
        </Pressable>
      </View>

      {/* Course Info Card */}
      {courseInfo && (
        <View className="mx-4 mb-4">
          <View className="bg-indigo-900/40 backdrop-blur-lg rounded-2xl p-4 border border-indigo-800/50">
            <Text className="text-white text-lg font-bold mb-2">
              Informasi Mata Kuliah
            </Text>
            <Text className="text-indigo-200 mb-2">
              {courseInfo.description}
            </Text>
            <View className="flex-row items-center">
              <View className="bg-indigo-600/30 px-3 py-1 rounded-lg mr-2">
                <Text className="text-indigo-300 text-sm">
                  Semester: {courseInfo.class_name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Task Statistics */}
      <View className="mx-4 mb-4">
        <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50">
          <Text className="text-white text-lg font-bold mb-3">
            Statistik Tugas
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">
                {tasks.length}
              </Text>
              <Text className="text-gray-400 text-sm">Total</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-400">
                {tasks.filter((task) => task.status === "completed").length}
              </Text>
              <Text className="text-gray-400 text-sm">Selesai</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-400">
                {tasks.filter((task) => task.status === "ongoing").length}
              </Text>
              <Text className="text-gray-400 text-sm">Progress</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-yellow-400">
                {tasks.filter((task) => task.status === "pending").length}
              </Text>
              <Text className="text-gray-400 text-sm">Pending</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-400">
                {
                  tasks.filter(
                    (task) =>
                      isOverdue(task.deadline) && task.status !== "completed"
                  ).length
                }
              </Text>
              <Text className="text-gray-400 text-sm">Terlambat</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Task List */}
      <ScrollView
        className="flex-1 px-4 pt-2"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#A5B4FC"
          />
        }
      >
        <View className="mb-24">
          {tasks.length > 0 ? (
            tasks.map((task) => {
              const statusStyle = getStatusStyle(task.status);
              const overdueStatus =
                isOverdue(task.deadline) && task.status !== "completed";

              return (
                <View
                  key={task.id}
                  className={`backdrop-blur-lg rounded-2xl p-5 border shadow-lg mb-4 ${
                    overdueStatus
                      ? "bg-red-900/30 border-red-800/50"
                      : "bg-indigo-900/30 border-indigo-800/50"
                  }`}
                >
                  {/* Header dengan tombol aksi */}
                  <View className="flex-row justify-between items-start mb-3">
                    <Pressable
                      className="flex-1 mr-3"
                      onPress={() =>
                        router.push(
                          `/(tabs)/(course)/${task.course_id}/${task.id}`
                        )
                      }
                    >
                      <Text className="text-white text-lg font-bold">
                        {task.title}
                      </Text>
                    </Pressable>

                    <View className="flex-row items-center space-x-2">
                      <View
                        className={`px-3 py-1 rounded-xl border ${statusStyle.bgColor}`}
                      >
                        <Text
                          className={`text-sm font-medium ${statusStyle.textColor}`}
                        >
                          {statusStyle.text}
                        </Text>
                      </View>

                      {/* Action Button */}
                      <Pressable
                        className="p-2 rounded-lg"
                        onPress={() => showTaskActions(task)}
                      >
                        <MoreVertical size={16} color="#A5B4FC" />
                      </Pressable>
                    </View>
                  </View>

                  <Pressable
                    onPress={() => router.push(`/(tabs)/(task)/${task.id}`)}
                  >
                    <Text className="text-indigo-200 mb-3 leading-5">
                      {task.description}
                    </Text>

                    <View className="space-y-2">
                      <View className="flex-row items-center">
                        <Clock
                          size={16}
                          color={overdueStatus ? "#F87171" : "#A5B4FC"}
                        />
                        <Text
                          className={`ml-2 ${
                            overdueStatus ? "text-red-300" : "text-indigo-300"
                          }`}
                        >
                          Deadline: {formatDate(task.deadline)}
                        </Text>
                      </View>

                      <View className="flex-row items-center">
                        <Calendar size={16} color="#A5B4FC" />
                        <Text className="text-indigo-300 ml-2">
                          Dibuat: {formatDate(task.created_at)}
                        </Text>
                      </View>

                      {task.documents && task.documents.length > 0 && (
                        <View className="flex-row items-center">
                          <FileText size={16} color="#A5B4FC" />
                          <Text className="text-indigo-300 ml-2">
                            {task.documents.length} dokumen
                          </Text>
                        </View>
                      )}
                    </View>

                    {overdueStatus && (
                      <View className="mt-3 bg-red-600/20 px-3 py-2 rounded-lg border border-red-500/30">
                        <Text className="text-red-300 text-sm font-medium">
                          ⚠️ Tugas ini sudah melewati deadline
                        </Text>
                      </View>
                    )}
                  </Pressable>
                </View>
              );
            })
          ) : (
            <View className="items-center justify-center py-12">
              <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 items-center">
                <FileText size={48} color="#6B7280" />
                <Text className="text-gray-400 text-center text-lg font-medium mt-4 mb-2">
                  Belum ada tugas
                </Text>
                <Text className="text-gray-500 text-center">
                  {tasksError
                    ? "Gagal memuat data tugas"
                    : "Mata kuliah ini belum memiliki tugas"}
                </Text>
                {tasksError && (
                  <Pressable
                    className="mt-4 bg-indigo-600 px-4 py-2 rounded-lg"
                    onPress={fetchTasks}
                  >
                    <Text className="text-white text-sm font-medium">
                      Coba Lagi
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => !isDeleting && cancelDelete()}
      >
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <View className="bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm border border-red-500/20 shadow-2xl">
            {/* Icon & Header */}
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-red-500/20 rounded-full items-center justify-center mb-4 border-2 border-red-500/30">
                <Trash2 size={28} color="#F87171" />
              </View>
              <Text className="text-white text-xl font-bold text-center">
                Hapus Tugas
              </Text>
            </View>

            {/* Content */}
            <View className="mb-6">
              <Text className="text-gray-300 text-center text-base leading-6 mb-3">
                Apakah Anda yakin ingin menghapus tugas
              </Text>
              <Text className="text-white font-semibold text-center text-lg mb-3">
                "{selectedTask?.title}"
              </Text>
              <Text className="text-red-300 text-center text-sm">
                Tindakan ini tidak dapat dibatalkan
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="space-y-3">
              <Pressable
                className={`p-4 rounded-2xl border-2 ${
                  isDeleting
                    ? "bg-red-800/50 border-red-700/50"
                    : "bg-red-600/20 border-red-500/50"
                } ${isDeleting ? "opacity-70" : ""}`}
                onPress={confirmDeleteTask}
                disabled={isDeleting}
              >
                <Text className="text-red-300 text-center font-bold text-base">
                  {isDeleting ? "Menghapus..." : "Ya, Hapus Tugas"}
                </Text>
              </Pressable>

              <Pressable
                className={`p-4 rounded-2xl border-2 bg-gray-700/50 border-gray-600/50 ${
                  isDeleting ? "opacity-50" : ""
                }`}
                onPress={cancelDelete}
                disabled={isDeleting}
              >
                <Text className="text-gray-300 text-center font-semibold text-base">
                  Batal
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Action Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showActionModal}
        onRequestClose={() => setShowActionModal(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setShowActionModal(false)}
        >
          <TouchableOpacity
            className="bg-gray-800 rounded-2xl p-4 mx-8 w-64 border border-gray-700"
            activeOpacity={1}
          >
            <Text className="text-white text-lg font-bold mb-4 text-center">
              Aksi Tugas
            </Text>

            <Pressable
              className="flex-row items-center p-3 mb-2 bg-indigo-600/20 rounded-xl border border-indigo-500/30"
              onPress={handleEditTask}
            >
              <Edit3 size={20} color="#A5B4FC" />
              <Text className="text-indigo-200 ml-3 font-medium">
                Edit Tugas
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center p-3 mb-4 bg-red-600/20 rounded-xl border border-red-500/30"
              onPress={handleDeleteTask}
            >
              <Trash2 size={20} color="#F87171" />
              <Text className="text-red-300 ml-3 font-medium">Hapus Tugas</Text>
            </Pressable>

            <Pressable
              className="bg-gray-700 p-3 rounded-xl"
              onPress={() => setShowActionModal(false)}
            >
              <Text className="text-gray-300 text-center font-medium">
                Batal
              </Text>
            </Pressable>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-8 right-6 bg-indigo-500 w-16 h-16 rounded-2xl items-center justify-center shadow-2xl border border-indigo-400/50"
        onPress={() => router.push(`/ModalTask?courseId=${id}`)}
      >
        <Plus size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
