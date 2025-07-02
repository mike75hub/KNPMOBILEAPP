import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState<NewsArticle[]>([]);

  const categories: Category[] = [
    { id: 'all', name: 'All', color: '#6b7280' },
    { id: 'academic', name: 'Academic', color: '#3b82f6' },
    { id: 'events', name: 'Events', color: '#10b981' },
    { id: 'admissions', name: 'Admissions', color: '#f59e0b' },
    { id: 'sports', name: 'Sports', color: '#ef4444' },
  ];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    // Simulate API call
    const mockNews: NewsArticle[] = [
      {
        id: '1',
        title: 'New Academic Year 2024 Registration Now Open',
        summary: 'Applications for the new academic year are now open. Early registration recommended.',
        content: 'The institution is pleased to announce that registration for the 2024 academic year is now open...',
        date: '2024-01-15',
        category: 'admissions',
        image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
        author: 'Admissions Office',
        readTime: '3 min read',
      },
      {
        id: '2',
        title: 'Annual Technical Skills Competition 2024',
        summary: 'Students showcase their technical prowess in the annual competition.',
        content: 'The annual technical skills competition brings together students from all departments...',
        date: '2024-01-12',
        category: 'events',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        author: 'Events Committee',
        readTime: '5 min read',
      },
      {
        id: '3',
        title: 'New Engineering Workshop Facility Opens',
        summary: 'State-of-the-art workshop facility enhances practical learning experience.',
        content: 'The new engineering workshop facility is equipped with modern machinery and tools...',
        date: '2024-01-10',
        category: 'academic',
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
        author: 'Engineering Department',
        readTime: '4 min read',
      },
      {
        id: '4',
        title: 'Inter-College Football Championship',
        summary: 'Our team advances to the finals of the regional championship.',
        content: 'The Kisii Polytechnic football team has made it to the finals...',
        date: '2024-01-08',
        category: 'sports',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
        author: 'Sports Department',
        readTime: '2 min read',
      },
      {
        id: '5',
        title: 'Digital Library System Launch',
        summary: 'New digital library system provides 24/7 access to academic resources.',
        content: 'Students can now access thousands of books and journals online...',
        date: '2024-01-05',
        category: 'academic',
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        author: 'Library Services',
        readTime: '3 min read',
      },
    ];
    setNews(mockNews);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const filteredNews = news.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const handleShare = async (article: NewsArticle) => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.summary}\n\nRead more in the Kisii Polytechnic app.`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#6b7280';
  };

  const renderCategoryFilter = (category: Category, index: number) => (
    <Animated.View key={category.id} entering={FadeInDown.delay(index * 100)}>
      <TouchableOpacity
        style={[
          styles.categoryChip,
          selectedCategory === category.id && { backgroundColor: category.color }
        ]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category.id && { color: 'white' }
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderNewsCard = (article: NewsArticle, index: number) => (
    <Animated.View
      key={article.id}
      entering={FadeInDown.delay(index * 150)}
      style={styles.newsCard}
    >
      <TouchableOpacity style={styles.newsContent}>
        <Image source={{ uri: article.image }} style={styles.newsImage} />
        
        <View style={styles.newsInfo}>
          <View style={styles.newsHeader}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(article.category) }]}>
              <Text style={styles.categoryBadgeText}>
                {categories.find(cat => cat.id === article.category)?.name || 'News'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleShare(article)}>
              <Ionicons name="share-outline" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.newsTitle} numberOfLines={2}>
            {article.title}
          </Text>
          
          <Text style={styles.newsSummary} numberOfLines={3}>
            {article.summary}
          </Text>

          <View style={styles.newsFooter}>
            <View style={styles.newsMetadata}>
              <Text style={styles.newsAuthor}>{article.author}</Text>
              <Text style={styles.newsDot}>•</Text>
              <Text style={styles.newsDate}>
                {new Date(article.date).toLocaleDateString()}
              </Text>
              <Text style={styles.newsDot}>•</Text>
              <Text style={styles.readTime}>{article.readTime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News & Updates</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilters}
        contentContainerStyle={styles.categoryFiltersContent}
      >
        {categories.map((category, index) => renderCategoryFilter(category, index))}
      </ScrollView>

      {/* News List */}
      <ScrollView
        style={styles.newsList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.newsHeader}>
          <Text style={styles.newsCount}>
            {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredNews.map((article, index) => renderNewsCard(article, index))}

        {/* Featured Section */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Important Notices</Text>
          
          <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Ionicons name="megaphone" size={24} color="#f59e0b" />
              <Text style={styles.noticeTitle}>Academic Calendar Update</Text>
            </View>
            <Text style={styles.noticeText}>
              Please note the updated academic calendar for the current semester. 
              Check your student portal for detailed information.
            </Text>
            <TouchableOpacity style={styles.noticeButton}>
              <Text style={styles.noticeButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Ionicons name="warning" size={24} color="#ef4444" />
              <Text style={styles.noticeTitle}>Fee Payment Deadline</Text>
            </View>
            <Text style={styles.noticeText}>
              Reminder: Fee payment deadline is approaching. 
              Ensure all payments are completed to avoid late fees.
            </Text>
            <TouchableOpacity style={styles.noticeButton}>
              <Text style={styles.noticeButtonText}>Pay Now</Text>
            </TouchableOpacity>
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
  categoryFilters: {
    marginBottom: 16,
  },
  categoryFiltersContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  newsList: {
    flex: 1,
  },
  newsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  newsCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  newsCard: {
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
  newsContent: {
    padding: 16,
  },
  newsImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  newsInfo: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  newsMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsAuthor: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  newsDot: {
    fontSize: 12,
    color: '#9ca3af',
    marginHorizontal: 6,
  },
  newsDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  readTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  featuredSection: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  noticeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  noticeText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  noticeButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  noticeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});