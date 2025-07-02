import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [quickActions] = useState<QuickAction[]>([
    { id: '1', title: 'Student Portal', icon: 'person-circle', color: '#3b82f6', route: '/student' },
    { id: '2', title: 'Academics', icon: 'school', color: '#10b981', route: '/academics' },
    { id: '3', title: 'Fee Payment', icon: 'card', color: '#f59e0b', route: '/student' },
    { id: '4', title: 'Results', icon: 'trophy', color: '#ef4444', route: '/student' },
    { id: '5', title: 'Library', icon: 'library', color: '#8b5cf6', route: '/academics' },
    { id: '6', title: 'Contact', icon: 'call', color: '#06b6d4', route: '/more' },
  ]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    // Simulate API call
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'New Academic Year 2024 Registration Open',
        summary: 'Applications for the new academic year are now open. Apply early to secure your spot.',
        date: '2024-01-15',
        image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      },
      {
        id: '2',
        title: 'Technical Skills Competition 2024',
        summary: 'Annual technical skills competition scheduled for March. Register now!',
        date: '2024-01-10',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      },
      {
        id: '3',
        title: 'New Engineering Workshop Facility',
        summary: 'State-of-the-art engineering workshop now open for student practical sessions.',
        date: '2024-01-08',
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
      },
    ];
    setNews(mockNews);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const renderQuickAction = (action: QuickAction, index: number) => (
    <Animated.View
      key={action.id}
      entering={FadeInUp.delay(index * 100)}
      style={styles.quickActionItem}
    >
      <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon as any} size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.quickActionText}>{action.title}</Text>
    </Animated.View>
  );

  const renderNewsItem = (item: NewsItem, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 150)}
      style={styles.newsCard}
    >
      <TouchableOpacity style={styles.newsContent}>
        <Image source={{ uri: item.image }} style={styles.newsImage} />
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.newsSummary} numberOfLines={3}>
            {item.summary}
          </Text>
          <Text style={styles.newsDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <LinearGradient colors={['#1e40af', '#3b82f6']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.institutionName}>Kisii Polytechnic</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => renderQuickAction(action, index))}
        </View>
      </View>

      {/* Latest News */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {news.map((item, index) => renderNewsItem(item, index))}
      </View>

      {/* Institution Stats */}
      <Animated.View entering={FadeInUp.delay(800)} style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>At a Glance</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>200+</Text>
            <Text style={styles.statLabel}>Faculty</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  institutionName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  quickActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4b5563',
    fontWeight: '500',
  },
  newsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  newsContent: {
    flexDirection: 'row',
    padding: 16,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  newsSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statsContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});