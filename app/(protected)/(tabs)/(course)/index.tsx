import { router } from "expo-router";
import {
  BookOpen,
  Calendar,
  Edit3,
  GraduationCap,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCourse } from "../../../../hooks/useCourse";

// Custom Skeleton Component
const SkeletonItem = ({ width, height, borderRadius = 4, style = {} }) => {
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

// Skeleton Components
const StatisticsSkeleton = () => (
  <View className="px-4 pt-4 mb-4">
    <View className="bg-gray-700 rounded-xl p-5">
      <SkeletonItem width={150} height={24} style={{ marginBottom: 16 }} />

      <View className="flex flex-row justify-between mb-5">
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            className="w-[30%] bg-gray-800 rounded-lg p-3 items-center"
          >
            <SkeletonItem
              width={40}
              height={40}
              borderRadius={8}
              style={{ marginBottom: 8 }}
            />
            <SkeletonItem width={60} height={12} style={{ marginBottom: 4 }} />
            <SkeletonItem width={40} height={20} />
          </View>
        ))}
      </View>
    </View>
  </View>
);

const CourseCardSkeleton = () => (
  <View className="bg-gray-700 rounded-lg p-4 mb-4">
    <View className="flex flex-row items-center mb-3">
      <SkeletonItem
        width={48}
        height={48}
        borderRadius={8}
        style={{ marginRight: 12 }}
      />
      <View className="flex-1">
        <SkeletonItem width="80%" height={20} style={{ marginBottom: 4 }} />
      </View>
      <View className="flex-row items-center">
        <SkeletonItem width={32} height={32} borderRadius={8} />
      </View>
    </View>

    <View className="flex flex-row flex-wrap mt-3">
      <SkeletonItem
        width={80}
        height={24}
        borderRadius={4}
        style={{ marginRight: 8, marginBottom: 4 }}
      />
      <SkeletonItem width={70} height={24} borderRadius={4} />
    </View>
  </View>
);

const SearchBarSkeleton = () => (
  <View className="flex flex-row px-4 mb-4">
    <SkeletonItem
      width="85%"
      height={48}
      borderRadius={12}
      style={{ marginRight: 8 }}
    />
    <SkeletonItem width={48} height={48} borderRadius={12} />
  </View>
);

export default function Index() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [courses, setCourses] = useState([]);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { getCourses, deleteCourse, isLoading, error } = useCourse();

  // Fungsi untuk mengambil data courses dari API
  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (err) {
      Alert.alert("Error", "Gagal mengambil data mata kuliah");
      console.error("Error fetching courses:", err);
    }
  };

  // Load data saat komponen pertama kali dimount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fungsi untuk menampilkan action modal
  const showCourseActions = (course) => {
    setSelectedCourse(course);
    setShowActionModal(true);
  };

  // Fungsi untuk edit course
  const handleEditCourse = () => {
    setShowActionModal(false);
    const course = selectedCourse;
    router.push(`/ModalCourse?courseId=${course.id}`);
  };

  // Fungsi untuk delete course
  const handleDeleteCourse = () => {
    setShowActionModal(false);
    setShowDeleteModal(true);
  };

  // Fungsi untuk konfirmasi delete
  const confirmDeleteCourse = async () => {
    if (!selectedCourse) return;

    setIsDeleting(true);
    try {
      await deleteCourse(selectedCourse.id);
      setShowDeleteModal(false);
      Alert.alert("Berhasil", "Mata kuliah berhasil dihapus");
      fetchCourses(); // Refresh course list
    } catch (error) {
      Alert.alert("Error", "Gagal menghapus mata kuliah");
      console.error("Error deleting course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Fungsi untuk batal delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  // Fungsi untuk mapping data API ke format yang dibutuhkan UI
  const formatCourseData = (course) => {
    return {
      id: course.id,
      title: course.title,
      semester: course.class_name || "Semester ?",
      color: getColorByTitle(course.title),
      description: course.description,
      tasksCount: course.tasks?.length || 0,
    };
  };

  // Fungsi untuk mendapatkan warna berdasarkan huruf pertama
  const getColorByTitle = (title) => {
    if (!title || typeof title !== "string") return "#9CA3AF"; // fallback abu-abu

    const firstChar = title.trim().charAt(0).toUpperCase();

    if (firstChar >= "A" && firstChar <= "F") return "#3B82F6"; // biru
    if (firstChar >= "G" && firstChar <= "L") return "#10B981"; // hijau
    if (firstChar >= "M" && firstChar <= "R") return "#8B5CF6"; // ungu
    if (firstChar >= "S" && firstChar <= "Z") return "#EF4444"; // merah

    return "#9CA3AF"; // jika simbol atau angka
  };

  // Format courses untuk UI
  const formattedCourses = courses.map(formatCourseData);

  const totalCredits = formattedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  // Filter courses based on search and category
  const filteredCourses = formattedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      activeFilter === "Semua" || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort(
    (a, b) => b.semester - a.semester
  );

  return (
    <View className="flex-1 flex flex-col bg-gray-900">
      {/* Header Area */}
      <View className="pt-8 px-4 pb-4 flex flex-row items-center">
        <View className="flex-1">
          <Text className="text-white text-3xl font-bold mb-1">
            Mata Kuliah
          </Text>
          <Text className="text-gray-400">Daftar mata kuliah semester ini</Text>
        </View>
      </View>

      {/* Course Statistics */}
      <ScrollView
        className="flex-1 bg-gray-800 rounded-t-3xl"
        showsVerticalScrollIndicator={false}
      >
        {/* Statistics Section */}
        {isLoading ? (
          <StatisticsSkeleton />
        ) : (
          <View className="px-4 pt-4 mb-4">
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
                    {formattedCourses.length}
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
                    Ganjil 2024
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Search Bar */}
        {isLoading ? (
          <SearchBarSkeleton />
        ) : (
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
        )}

        {/* Course List */}
        <View className="px-4 mb-24">
          {isLoading ? (
            // Loading skeletons
            <>
              {[1, 2, 3, 4].map((item) => (
                <CourseCardSkeleton key={item} />
              ))}
            </>
          ) : sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <View key={course.id} className="bg-gray-700 rounded-lg p-4 mb-4">
                {/* Header dengan tombol aksi */}
                <View className="flex flex-row items-center mb-3">
                  <View
                    style={{ backgroundColor: course.color }}
                    className="w-12 h-12 rounded-lg items-center justify-center mr-3"
                  >
                    <BookOpen size={22} color="#FFFFFF" />
                  </View>
                  <Pressable
                    className="flex-1"
                    onPress={() => router.push(`/(tabs)/(course)/${course.id}`)}
                  >
                    <Text className="text-white text-lg font-bold">
                      {course.title}
                    </Text>
                  </Pressable>

                  {/* Action Button */}
                  <Pressable
                    className="p-2 rounded-lg"
                    onPress={() => showCourseActions(course)}
                  >
                    <MoreVertical size={16} color="#A5B4FC" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => router.push(`/(tabs)/(course)/${course.id}`)}
                >
                  <View className="flex flex-row flex-wrap mt-3">
                    <View className="bg-gray-800 px-2 py-1 rounded mr-2 mb-1">
                      <Text className="text-gray-300 text-xs">
                        {course.semester}
                      </Text>
                    </View>
                    {course.tasksCount > 0 && (
                      <View className="bg-orange-600/20 px-2 py-1 rounded mr-2 mb-1">
                        <Text className="text-orange-400 text-xs">
                          {course.tasksCount} Tugas
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-400 text-center">
                {error
                  ? "Gagal memuat data mata kuliah"
                  : "Tidak ada mata kuliah yang ditemukan"}
              </Text>
              {error && (
                <Pressable
                  className="mt-2 bg-indigo-600 px-4 py-2 rounded-lg"
                  onPress={fetchCourses}
                >
                  <Text className="text-white text-sm">Coba Lagi</Text>
                </Pressable>
              )}
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
                Hapus Mata Kuliah
              </Text>
            </View>

            {/* Content */}
            <View className="mb-6">
              <Text className="text-gray-300 text-center text-base leading-6 mb-3">
                Apakah Anda yakin ingin menghapus mata kuliah
              </Text>
              <Text className="text-white font-semibold text-center text-lg mb-3">
                "{selectedCourse?.title}"
              </Text>
              <Text className="text-red-300 text-center text-sm mb-2">
                Semua tugas yang terkait juga akan terhapus.
              </Text>
              <Text className="text-red-300 text-center text-sm">
                Tindakan ini tidak dapat dibatalkan.
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
                onPress={confirmDeleteCourse}
                disabled={isDeleting}
              >
                <Text className="text-red-300 text-center font-bold text-base">
                  {isDeleting ? "Menghapus..." : "Ya, Hapus Mata Kuliah"}
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
              Aksi Mata Kuliah
            </Text>

            <Pressable
              className="flex-row items-center p-3 mb-2 bg-indigo-600/20 rounded-xl border border-indigo-500/30"
              onPress={handleEditCourse}
            >
              <Edit3 size={20} color="#A5B4FC" />
              <Text className="text-indigo-200 ml-3 font-medium">Edit</Text>
            </Pressable>

            <Pressable
              className="flex-row items-center p-3 mb-4 bg-red-600/20 rounded-xl border border-red-500/30"
              onPress={handleDeleteCourse}
            >
              <Trash2 size={20} color="#F87171" />
              <Text className="text-red-300 ml-3 font-medium">Hapus</Text>
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
        className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/ModalCourse")}
      >
        <Plus size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
