import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface StudentData {
  name: string;
  studentId: string;
  course: string;
  year: string;
  email: string;
}

interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  requiresAuth: boolean;
}

export default function StudentScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ studentId: '', password: '' });

  const services: ServiceItem[] = [
    {
      id: '1',
      title: 'Check Results',
      icon: 'trophy',
      color: '#10b981',
      description: 'View your academic results and transcripts',
      requiresAuth: true,
    },
    {
      id: '2',
      title: 'Fee Payment',
      icon: 'card',
      color: '#f59e0b',
      description: 'Pay school fees and view payment history',
      requiresAuth: true,
    },
    {
      id: '3',
      title: 'Course Registration',
      icon: 'school',
      color: '#3b82f6',
      description: 'Register for courses and view timetable',
      requiresAuth: true,
    },
    {
      id: '4',
      title: 'Library Services',
      icon: 'library',
      color: '#8b5cf6',
      description: 'Access digital library and book reservations',
      requiresAuth: false,
    },
    {
      id: '5',
      title: 'Student ID Card',
      icon: 'card-outline',
      color: '#ef4444',
      description: 'Digital student ID and verification',
      requiresAuth: true,
    },
    {
      id: '6',
      title: 'Academic Calendar',
      icon: 'calendar',
      color: '#06b6d4',
      description: 'View important dates and events',
      requiresAuth: false,
    },
  ];

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (userToken && userData) {
        setIsLoggedIn(true);
        setStudentData(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleLogin = async () => {
    if (!loginForm.studentId || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate login API call
    try {
      const mockStudentData: StudentData = {
        name: 'John Doe',
        studentId: loginForm.studentId,
        course: 'Diploma in Computer Science',
        year: 'Year 2',
        email: 'john.doe@student.kisiipoly.ac.ke',
      };

      await AsyncStorage.setItem('userToken', 'mock-token-123');
      await AsyncStorage.setItem('userData', JSON.stringify(mockStudentData));
      
      setIsLoggedIn(true);
      setStudentData(mockStudentData);
      setShowLoginModal(false);
      setLoginForm({ studentId: '', password: '' });
      
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            setIsLoggedIn(false);
            setStudentData(null);
          },
        },
      ]
    );
  };

  const handleServicePress = (service: ServiceItem) => {
    if (service.requiresAuth && !isLoggedIn) {
      Alert.alert(
        'Login Required',
        'Please login to access this service',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => setShowLoginModal(true) },
        ]
      );
      return;
    }

    // Handle service navigation
    switch (service.id) {
      case '1':
        Alert.alert('Results', 'Your results will be displayed here');
        break;
      case '2':
        Alert.alert('Fee Payment', 'Payment gateway will open here');
        break;
      case '3':
        Alert.alert('Course Registration', 'Course registration form will open here');
        break;
      case '4':
        Alert.alert('Library', 'Library services will open here');
        break;
      case '5':
        Alert.alert('Student ID', 'Digital student ID will be displayed here');
        break;
      case '6':
        Alert.alert('Calendar', 'Academic calendar will be displayed here');
        break;
    }
  };

  const renderServiceCard = (service: ServiceItem, index: number) => (
    <Animated.View
      key={service.id}
      entering={FadeInDown.delay(index * 100)}
      style={styles.serviceCard}
    >
      <TouchableOpacity
        style={styles.serviceContent}
        onPress={() => handleServicePress(service)}
      >
        <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
          <Ionicons name={service.icon as any} size={24} color="white" />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          {service.requiresAuth && !isLoggedIn && (
            <Text style={styles.authRequired}>Login required</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Portal</Text>
        {isLoggedIn ? (
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowLoginModal(true)}>
            <Ionicons name="log-in-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {/* Student Info Card */}
        {isLoggedIn && studentData ? (
          <Animated.View entering={FadeInDown} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={32} color="white" />
              </View>
              <View style={styles.studentDetails}>
                <Text style={styles.studentName}>{studentData.name}</Text>
                <Text style={styles.studentId}>ID: {studentData.studentId}</Text>
                <Text style={styles.studentCourse}>{studentData.course}</Text>
                <Text style={styles.studentYear}>{studentData.year}</Text>
              </View>
            </View>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown} style={styles.loginPromptCard}>
            <Ionicons name="person-circle-outline" size={48} color="#6b7280" />
            <Text style={styles.loginPromptTitle}>Welcome to Student Portal</Text>
            <Text style={styles.loginPromptText}>
              Login to access your student services and information
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setShowLoginModal(true)}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Student Services</Text>
          {services.map((service, index) => renderServiceCard(service, index))}
        </View>
      </ScrollView>

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Student Login</Text>
            <TouchableOpacity onPress={() => setShowLoginModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Student ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your student ID"
                value={loginForm.studentId}
                onChangeText={(text) => setLoginForm({ ...loginForm, studentId: text })}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={loginForm.password}
                onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  studentCourse: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 2,
  },
  studentYear: {
    fontSize: 14,
    color: '#6b7280',
  },
  loginPromptCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  loginPromptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  loginPromptText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  authRequired: {
    fontSize: 12,
    color: '#ef4444',
    fontStyle: 'italic',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#3b82f6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});