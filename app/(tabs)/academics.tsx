import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Course {
  id: string;
  title: string;
  department: string;
  duration: string;
  level: string;
  description: string;
  image: string;
}

interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function AcademicsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments: Department[] = [
    { id: 'all', name: 'All', icon: 'apps', color: '#6b7280' },
    { id: 'engineering', name: 'Engineering', icon: 'construct', color: '#3b82f6' },
    { id: 'ict', name: 'ICT', icon: 'laptop', color: '#10b981' },
    { id: 'business', name: 'Business', icon: 'briefcase', color: '#f59e0b' },
    { id: 'hospitality', name: 'Hospitality', icon: 'restaurant', color: '#ef4444' },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Diploma in Computer Science',
      department: 'ict',
      duration: '3 Years',
      level: 'Diploma',
      description: 'Comprehensive program covering programming, databases, and software development.',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    },
    {
      id: '2',
      title: 'Certificate in Electrical Engineering',
      department: 'engineering',
      duration: '2 Years',
      level: 'Certificate',
      description: 'Practical training in electrical systems, wiring, and power distribution.',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    },
    {
      id: '3',
      title: 'Diploma in Business Management',
      department: 'business',
      duration: '3 Years',
      level: 'Diploma',
      description: 'Business fundamentals, management principles, and entrepreneurship skills.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
    {
      id: '4',
      title: 'Certificate in Food & Beverage',
      department: 'hospitality',
      duration: '1 Year',
      level: 'Certificate',
      description: 'Professional training in food service and beverage management.',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    },
    {
      id: '5',
      title: 'Diploma in Mechanical Engineering',
      department: 'engineering',
      duration: '3 Years',
      level: 'Diploma',
      description: 'Mechanical systems, manufacturing processes, and industrial maintenance.',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
    },
    {
      id: '6',
      title: 'Certificate in Web Development',
      department: 'ict',
      duration: '1 Year',
      level: 'Certificate',
      description: 'Modern web technologies, responsive design, and full-stack development.',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const renderDepartmentFilter = (dept: Department, index: number) => (
    <Animated.View key={dept.id} entering={FadeInDown.delay(index * 100)}>
      <TouchableOpacity
        style={[
          styles.departmentChip,
          selectedDepartment === dept.id && { backgroundColor: dept.color }
        ]}
        onPress={() => setSelectedDepartment(dept.id)}
      >
        <Ionicons
          name={dept.icon as any}
          size={16}
          color={selectedDepartment === dept.id ? 'white' : dept.color}
        />
        <Text
          style={[
            styles.departmentText,
            selectedDepartment === dept.id && { color: 'white' }
          ]}
        >
          {dept.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCourseCard = (course: Course, index: number) => (
    <Animated.View
      key={course.id}
      entering={FadeInDown.delay(index * 150)}
      style={styles.courseCard}
    >
      <TouchableOpacity style={styles.courseContent}>
        <Image source={{ uri: course.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {course.title}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
          </View>
          <Text style={styles.courseDescription} numberOfLines={2}>
            {course.description}
          </Text>
          <View style={styles.courseFooter}>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text style={styles.durationText}>{course.duration}</Text>
            </View>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academic Programs</Text>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6b7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Department Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.departmentFilters}
        contentContainerStyle={styles.departmentFiltersContent}
      >
        {departments.map((dept, index) => renderDepartmentFilter(dept, index))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView style={styles.coursesList} showsVerticalScrollIndicator={false}>
        <View style={styles.coursesHeader}>
          <Text style={styles.coursesCount}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </Text>
        </View>
        {filteredCourses.map((course, index) => renderCourseCard(course, index))}
        
        {/* Academic Calendar Section */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Academic Calendar</Text>
          <View style={styles.calendarCard}>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDate}>Jan 15, 2024</Text>
              <Text style={styles.calendarEvent}>Registration Opens</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDate}>Feb 5, 2024</Text>
              <Text style={styles.calendarEvent}>Classes Begin</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDate}>May 20, 2024</Text>
              <Text style={styles.calendarEvent}>End of Semester</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  departmentFilters: {
    marginBottom: 16,
  },
  departmentFiltersContent: {
    paddingHorizontal: 20,
  },
  departmentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  departmentText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  coursesList: {
    flex: 1,
  },
  coursesHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  coursesCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  courseCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  courseContent: {
    padding: 16,
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 12,
  },
  levelBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  applyButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  calendarSection: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  calendarCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  calendarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  calendarDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  calendarEvent: {
    fontSize: 14,
    color: '#1f2937',
  },
});