import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  Download,
  Edit3,
  Eye,
  FileText,
  RefreshCcw,
  Trash2,
  Upload,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Animated,
  Linking,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useCourse } from "../../../../../../hooks/useCourse";
import { useTask } from "../../../../../../hooks/useTask";

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

// Task Info Skeleton
const TaskInfoSkeleton = () => (
  <View className="mx-4 mb-4">
    <View className="bg-indigo-900/40 backdrop-blur-lg rounded-2xl p-5 border border-indigo-800/50">
      {/* Status and Priority */}
      <View className="flex-row justify-between items-start mb-4">
        <SkeletonLoader width={80} height={28} borderRadius={12} />
        <SkeletonLoader width={70} height={28} borderRadius={12} />
      </View>

      {/* Description */}
      <SkeletonLoader width="30%" height={18} style={{ marginBottom: 12 }} />
      <SkeletonLoader width="100%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="85%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="60%" height={16} style={{ marginBottom: 16 }} />

      {/* Info Grid */}
      <View className="space-y-3">
        <View className="flex-row items-center">
          <SkeletonLoader width={16} height={16} style={{ marginRight: 12 }} />
          <SkeletonLoader width="60%" height={16} />
        </View>
        <View className="flex-row items-center">
          <SkeletonLoader width={16} height={16} style={{ marginRight: 12 }} />
          <SkeletonLoader width="50%" height={16} />
        </View>
        <View className="flex-row items-center">
          <SkeletonLoader width={16} height={16} style={{ marginRight: 12 }} />
          <SkeletonLoader width="70%" height={16} />
        </View>
      </View>
    </View>
  </View>
);

// Documents Skeleton
const DocumentsSkeleton = () => (
  <View className="mx-4 mb-4">
    <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50">
      <SkeletonLoader width="40%" height={20} style={{ marginBottom: 16 }} />
      {[1, 2].map((item) => (
        <View
          key={item}
          className="flex-row items-center p-3 bg-gray-700/30 rounded-xl mb-3"
        >
          <SkeletonLoader
            width={40}
            height={40}
            borderRadius={8}
            style={{ marginRight: 12 }}
          />
          <View className="flex-1">
            <SkeletonLoader
              width="70%"
              height={16}
              style={{ marginBottom: 6 }}
            />
            <SkeletonLoader width="40%" height={14} />
          </View>
          <SkeletonLoader width={32} height={32} borderRadius={6} />
        </View>
      ))}
    </View>
  </View>
);

// Main Loading Skeleton Component
const LoadingSkeleton = () => (
  <View className="flex-1 bg-gray-900">
    <LinearGradient
      colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
      className="absolute w-full h-full"
    />
    <HeaderSkeleton />
    <ScrollView className="flex-1">
      <TaskInfoSkeleton />
      {/* <DocumentsSkeleton /> */}
    </ScrollView>
  </View>
);

export default function TaskDetail() {
  const { taskId } = useLocalSearchParams();
  const [taskInfo, setTaskInfo] = useState(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    getTaskById,
    quickUpdateStatus,
    deleteTask,
    updateTaskStatus,
    isLoading: taskLoading,
    error: taskError,
  } = useTask();
  const {
    getCourseById,
    isLoading: courseLoading,
    error: courseError,
  } = useCourse();

  // Fungsi untuk mengambil data task
  const fetchTaskInfo = async () => {
    try {
      if (taskId) {
        const task = await getTaskById(taskId);
        setTaskInfo(task);

        // Ambil info course jika ada course_id
        if (task.course_id) {
          const course = await getCourseById(task.course_id);
          setCourseInfo(course);
        }
      }
    } catch (err) {
      console.error("Error fetching task info:", err);
      ToastAndroid.show("Gagal mengambil data tugas", ToastAndroid.SHORT);
    }
  };

  // Load data saat komponen pertama kali dimount
  useEffect(() => {
    if (taskId) {
      fetchTaskInfo();
    }
  }, [taskId]);

  // Fungsi untuk refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTaskInfo();
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setRefreshing(false);
    }
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
          icon: CheckCircle,
        };
      case "ongoing":
        return {
          bgColor: "bg-blue-500/30 border-blue-500/50",
          textColor: "text-blue-300",
          text: "Progress",
          icon: Clock,
        };
      case "pending":
      default:
        return {
          bgColor: "bg-yellow-500/30 border-yellow-500/50",
          textColor: "text-yellow-300",
          text: "Pending",
          icon: Clock,
        };
    }
  };

  // Fungsi untuk menentukan priority style
  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return {
          bgColor: "bg-red-500/30 border-red-500/50",
          textColor: "text-red-300",
          text: "High",
        };
      case "medium":
        return {
          bgColor: "bg-orange-500/30 border-orange-500/50",
          textColor: "text-orange-300",
          text: "Medium",
        };
      case "low":
      default:
        return {
          bgColor: "bg-gray-500/30 border-gray-500/50",
          textColor: "text-gray-300",
          text: "Low",
        };
    }
  };

  // Fungsi untuk menentukan apakah deadline sudah lewat
  const isOverdue = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < now;
  };

  // Fungsi untuk menghitung waktu tersisa
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff < 0) return "Sudah lewat";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} hari ${hours} jam lagi`;
    } else if (hours > 0) {
      return `${hours} jam lagi`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes} menit lagi`;
    }
  };

  // Fungsi untuk mengubah status task
  const handleStatusChange = async (newStatus) => {
    try {
      await quickUpdateStatus(taskId, newStatus);
      await fetchTaskInfo();
      ToastAndroid.show("Status tugas berhasil diubah", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Gagal mengubah status tugas", ToastAndroid.SHORT);
      console.error("Error updating task status:", error);
    }
  };

  // Fungsi untuk edit task
  const handleEditTask = () => {
    setShowActionModal(false);
    if (taskInfo) {
      router.push(
        `/modal-task?taskId=${taskInfo.id}&taskId=${
          taskInfo.course_id || taskId
        }`
      );
    }
  };

  // Fungsi untuk delete task
  const handleDeleteTask = () => {
    setShowActionModal(false);
    setShowDeleteModal(true);
  };

  // Fungsi untuk konfirmasi delete
  const confirmDeleteTask = async () => {
    if (!taskInfo) return;

    setIsDeleting(true);
    try {
      await deleteTask(taskInfo.id);
      setShowDeleteModal(false);
      ToastAndroid.show("Tugas berhasil dihapus", ToastAndroid.SHORT);
      router.back();
    } catch (error) {
      ToastAndroid.show("Gagal menghapus tugas", ToastAndroid.SHORT);
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Fungsi untuk membuka dokumen
  const handleOpenDocument = async (document) => {
    try {
      if (document.url) {
        await Linking.openURL(document.url);
      } else {
        ToastAndroid.show("URL dokumen tidak tersedia", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Gagal membuka dokumen", ToastAndroid.SHORT);
      console.error("Error opening document:", error);
    }
  };

  // Loading state - Show skeleton
  if (taskLoading || courseLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (taskError && !taskInfo) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <LinearGradient
          colors={["#1E1B4B", "#312E81", "#1E1B4B"]}
          className="absolute w-full h-full"
        />
        <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 items-center mx-4">
          <AlertTriangle size={48} color="#F87171" />
          <Text className="text-white text-lg font-bold mt-4 mb-2">
            Gagal Memuat Data
          </Text>
          <Text className="text-gray-400 text-center mb-4">
            Tidak dapat mengambil informasi tugas
          </Text>
          <Pressable
            className="bg-indigo-600 px-6 py-3 rounded-lg"
            onPress={fetchTaskInfo}
          >
            <Text className="text-white font-medium">Coba Lagi</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!taskInfo) return null;

  const statusStyle = getStatusStyle(taskInfo.status);
  const priorityStyle = getPriorityStyle(taskInfo.priority);
  const overdueStatus =
    isOverdue(taskInfo.deadline) && taskInfo.status !== "completed";
  const StatusIcon = statusStyle.icon;

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
          <Text className="text-white text-xl font-bold" numberOfLines={2}>
            {taskInfo.title}
          </Text>
          <Text className="text-indigo-200">
            {courseInfo?.title || "Detail Tugas"}
          </Text>
        </View>
        <Pressable
          className="mr-3 p-2 bg-indigo-500/30 backdrop-blur-lg rounded-xl border border-indigo-500/50"
          onPress={() => {
            fetchTaskInfo();
          }}
        >
          <RefreshCcw size={20} color="#A5B4FC" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#A5B4FC"
          />
        }
      >
        {/* Task Info Card */}
        <View className="mx-4 mb-4">
          <View
            className={`backdrop-blur-lg rounded-2xl p-5 border shadow-lg ${
              overdueStatus
                ? "bg-red-900/30 border-red-800/50"
                : "bg-indigo-900/40 border-indigo-800/50"
            }`}
          >
            {/* Status and Priority */}
            <View className="flex-row justify-between items-start mb-4">
              <View
                className={`px-3 py-2 rounded-xl border flex-row items-center ${statusStyle.bgColor}`}
              >
                <Text className={`ml-2 font-medium ${statusStyle.textColor}`}>
                  {statusStyle.text}
                </Text>
              </View>

              <View
                className={`px-3 py-2 rounded-xl border ${priorityStyle.bgColor}`}
              >
                <Text className={`font-medium ${priorityStyle.textColor}`}>
                  {priorityStyle.text}
                </Text>
              </View>
            </View>

            {/* Overdue Warning */}
            {overdueStatus && (
              <View className="mb-4 bg-red-600/20 px-4 py-3 rounded-xl border border-red-500/30">
                <View className="flex-row items-center">
                  <AlertTriangle size={20} color="#F87171" />
                  <Text className="text-red-300 font-medium ml-2">
                    Tugas sudah melewati deadline
                  </Text>
                </View>
              </View>
            )}

            {/* Description */}
            <Text className="text-white text-lg font-bold mb-3">Deskripsi</Text>
            <Text className="text-indigo-200 leading-6 mb-6">
              {taskInfo.description || "Tidak ada deskripsi"}
            </Text>

            {/* Task Information Grid */}
            <View className="space-y-4">
              {/* Deadline */}
              <View className="flex-row items-center">
                <Clock
                  size={18}
                  color={overdueStatus ? "#F87171" : "#A5B4FC"}
                />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-400 text-sm">Deadline</Text>
                  <Text
                    className={`font-medium ${
                      overdueStatus ? "text-red-300" : "text-white"
                    }`}
                  >
                    {formatDate(taskInfo.deadline)}
                  </Text>
                  <Text
                    className={`text-sm ${
                      overdueStatus ? "text-red-400" : "text-indigo-300"
                    }`}
                  >
                    {getTimeRemaining(taskInfo.deadline)}
                  </Text>
                </View>
              </View>

              {/* Course */}
              {courseInfo && (
                <View className="flex-row items-center">
                  <BookOpen size={18} color="#A5B4FC" />
                  <View className="ml-3 flex-1">
                    <Text className="text-gray-400 text-sm">Mata Kuliah</Text>
                    <Text className="text-white font-medium">
                      {courseInfo.title}
                    </Text>
                    <Text className="text-indigo-300 text-sm">
                      {courseInfo.class_name}
                    </Text>
                  </View>
                </View>
              )}

              {/* Created Date */}
              <View className="flex-row items-center">
                <Calendar size={18} color="#A5B4FC" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-400 text-sm">Dibuat</Text>
                  <Text className="text-white font-medium">
                    {formatDate(taskInfo.created_at)}
                  </Text>
                </View>
              </View>

              {/* Created By */}
              {taskInfo.created_by && (
                <View className="flex-row items-center">
                  <User size={18} color="#A5B4FC" />
                  <View className="ml-3 flex-1">
                    <Text className="text-gray-400 text-sm">Dibuat oleh</Text>
                    <Text className="text-white font-medium">
                      {taskInfo.created_by.full_name || "Unknown"}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        {taskInfo.status !== "completed" && (
          <View className="mx-4 mb-4">
            <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50">
              <Text className="text-white text-lg font-bold mb-4">
                Aksi Cepat
              </Text>

              <View className="flex-row space-x-3 gap-2">
                {/* Tombol Selesai (jika belum completed) */}
                <Pressable
                  className="flex-1 bg-green-600/20 border border-green-500/30 rounded-xl p-3 items-center"
                  onPress={() => handleStatusChange("completed")}
                >
                  <CheckCircle size={20} color="#86EFAC" />
                  <Text className="text-green-300 text-sm font-medium mt-1">
                    Selesai
                  </Text>
                </Pressable>

                {/* Tombol Mulai hanya jika statusnya pending */}
                {taskInfo.status === "pending" && (
                  <Pressable
                    className="flex-1 bg-blue-600/20 border border-blue-500/30 rounded-xl p-3 items-center"
                    onPress={() => handleStatusChange("ongoing")}
                  >
                    <Clock size={20} color="#93C5FD" />
                    <Text className="text-blue-300 text-sm font-medium mt-1">
                      Mulai
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Documents Section */}
        {taskInfo.documents && taskInfo.documents.length > 0 && (
          <View className="mx-4 mb-4">
            <View className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50">
              <Text className="text-white text-lg font-bold mb-4">
                Dokumen ({taskInfo.documents.length})
              </Text>

              {taskInfo.documents.map((document, index) => (
                <Pressable
                  key={index}
                  className="flex-row items-center p-3 bg-gray-700/30 rounded-xl mb-3 last:mb-0"
                  onPress={() => handleOpenDocument(document)}
                >
                  <View className="w-10 h-10 bg-indigo-600/30 rounded-lg items-center justify-center mr-3">
                    <FileText size={20} color="#A5B4FC" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-white font-medium" numberOfLines={1}>
                      {document.name || `Dokumen ${index + 1}`}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {document.type || "File"}
                      {document.size && ` • ${document.size}`}
                    </Text>
                  </View>

                  <View className="flex-row space-x-2">
                    <Pressable className="p-2">
                      <Eye size={16} color="#A5B4FC" />
                    </Pressable>
                    <Pressable className="p-2">
                      <Download size={16} color="#A5B4FC" />
                    </Pressable>
                  </View>
                </Pressable>
              ))}

              {/* Add Document Button */}
              <Pressable className="flex-row items-center justify-center p-3 border-2 border-dashed border-gray-600 rounded-xl mt-2">
                <Upload size={20} color="#9CA3AF" />
                <Text className="text-gray-400 ml-2 font-medium">
                  Tambah Dokumen
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Submission Section (if task has submission) */}
        {taskInfo.submission && (
          <View className="mx-4 mb-4">
            <View className="bg-green-900/30 backdrop-blur-lg rounded-2xl p-4 border border-green-800/50">
              <Text className="text-white text-lg font-bold mb-4">
                Pengumpulan
              </Text>

              <View className="bg-green-800/20 rounded-xl p-4">
                <View className="flex-row items-center mb-2">
                  <CheckCircle size={20} color="#86EFAC" />
                  <Text className="text-green-300 font-medium ml-2">
                    Sudah Dikumpulkan
                  </Text>
                </View>

                <Text className="text-green-200 mb-2">
                  Dikumpulkan pada:{" "}
                  {formatDate(taskInfo.submission.submitted_at)}
                </Text>

                {taskInfo.submission.notes && (
                  <Text className="text-green-100">
                    Catatan: {taskInfo.submission.notes}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}

        <View className="h-24" />
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => !isDeleting && setShowDeleteModal(false)}
      >
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <View className="bg-gray-800/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm border border-red-500/20 shadow-2xl">
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-red-500/20 rounded-full items-center justify-center mb-4 border-2 border-red-500/30">
                <Trash2 size={28} color="#F87171" />
              </View>
              <Text className="text-white text-xl font-bold text-center">
                Hapus Tugas
              </Text>
            </View>

            <View className="mb-6">
              <Text className="text-gray-300 text-center text-base leading-6 mb-3">
                Apakah Anda yakin ingin menghapus tugas
              </Text>
              <Text className="text-white font-semibold text-center text-lg mb-3">
                "{taskInfo?.title}"
              </Text>
              <Text className="text-red-300 text-center text-sm">
                Tindakan ini tidak dapat dibatalkan
              </Text>
            </View>

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
                onPress={() => setShowDeleteModal(false)}
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
    </View>
  );
}
