import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  action: () => void;
}

interface ContactInfo {
  type: string;
  value: string;
  icon: string;
  action: () => void;
}

export default function MoreScreen() {
  const contactInfo: ContactInfo[] = [
    {
      type: 'Phone',
      value: '+254 700 123 456',
      icon: 'call',
      action: () => Linking.openURL('tel:+254700123456'),
    },
    {
      type: 'Email',
      value: 'info@kisiipoly.ac.ke',
      icon: 'mail',
      action: () => Linking.openURL('mailto:info@kisiipoly.ac.ke'),
    },
    {
      type: 'Website',
      value: 'www.kisiipoly.ac.ke',
      icon: 'globe',
      action: () => Linking.openURL('https://www.kisiipoly.ac.ke'),
    },
    {
      type: 'Location',
      value: 'Kisii, Kenya',
      icon: 'location',
      action: () => Linking.openURL('https://maps.google.com/?q=Kisii+Polytechnic'),
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'About Institution',
      icon: 'information-circle',
      color: '#3b82f6',
      action: () => showAboutInfo(),
    },
    {
      id: '2',
      title: 'Campus Map',
      icon: 'map',
      color: '#10b981',
      action: () => Alert.alert('Campus Map', 'Interactive campus map will be displayed here'),
    },
    {
      id: '3',
      title: 'E-Learning Portal',
      icon: 'laptop',
      color: '#8b5cf6',
      action: () => Linking.openURL('https://elearning.kisiipoly.ac.ke'),
    },
    {
      id: '4',
      title: 'Library Catalog',
      icon: 'library',
      color: '#f59e0b',
      action: () => Alert.alert('Library', 'Library catalog will be displayed here'),
    },
    {
      id: '5',
      title: 'Career Services',
      icon: 'briefcase',
      color: '#ef4444',
      action: () => Alert.alert('Career Services', 'Career guidance and job placement services'),
    },
    {
      id: '6',
      title: 'Alumni Network',
      icon: 'people',
      color: '#06b6d4',
      action: () => Alert.alert('Alumni', 'Connect with our alumni network'),
    },
    {
      id: '7',
      title: 'Emergency Contacts',
      icon: 'medical',
      color: '#dc2626',
      action: () => showEmergencyContacts(),
    },
    {
      id: '8',
      title: 'Feedback',
      icon: 'chatbubble',
      color: '#7c3aed',
      action: () => Alert.alert('Feedback', 'Send your feedback and suggestions'),
    },
  ];

  const showAboutInfo = () => {
    Alert.alert(
      'About Kisii Polytechnic',
      'Kisii Polytechnic is a leading technical institution in Kenya, committed to providing quality technical and vocational education. Established with the mission to develop skilled professionals for industry and entrepreneurship.\n\nOur Vision: To be a center of excellence in technical education and training.\n\nOur Mission: To provide quality technical education and training that meets industry standards and promotes innovation.',
      [{ text: 'OK' }]
    );
  };

  const showEmergencyContacts = () => {
    Alert.alert(
      'Emergency Contacts',
      'Security: +254 700 111 222\nMedical: +254 700 333 444\nFire Emergency: 999\nPolice: 911\n\nCampus Security is available 24/7',
      [
        { text: 'Call Security', onPress: () => Linking.openURL('tel:+254700111222') },
        { text: 'Close' },
      ]
    );
  };

  const renderMenuItem = (item: MenuItem, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 100)}
      style={styles.menuCard}
    >
      <TouchableOpacity style={styles.menuContent} onPress={item.action}>
        <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon as any} size={24} color="white" />
        </View>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderContactItem = (contact: ContactInfo, index: number) => (
    <Animated.View
      key={contact.type}
      entering={FadeInDown.delay(index * 100)}
      style={styles.contactCard}
    >
      <TouchableOpacity style={styles.contactContent} onPress={contact.action}>
        <View style={styles.contactIcon}>
          <Ionicons name={contact.icon as any} size={20} color="#3b82f6" />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactType}>{contact.type}</Text>
          <Text style={styles.contactValue}>{contact.value}</Text>
        </View>
        <Ionicons name="open-outline" size={16} color="#9ca3af" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Institution Info */}
        <Animated.View entering={FadeInDown} style={styles.institutionCard}>
          <View style={styles.institutionHeader}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={32} color="white" />
            </View>
            <View style={styles.institutionInfo}>
              <Text style={styles.institutionName}>Kisii Polytechnic</Text>
              <Text style={styles.institutionTagline}>Excellence in Technical Education</Text>
              <Text style={styles.institutionLocation}>Kisii, Kenya</Text>
            </View>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services & Information</Text>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {contactInfo.map((contact, index) => renderContactItem(contact, index))}
        </View>

        {/* Social Media */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1877f2' }]}
              onPress={() => Linking.openURL('https://facebook.com/kisiipoly')}
            >
              <Ionicons name="logo-facebook" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1da1f2' }]}
              onPress={() => Linking.openURL('https://twitter.com/kisiipoly')}
            >
              <Ionicons name="logo-twitter" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#0077b5' }]}
              onPress={() => Linking.openURL('https://linkedin.com/school/kisiipoly')}
            >
              <Ionicons name="logo-linkedin" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#25d366' }]}
              onPress={() => Linking.openURL('https://wa.me/254700123456')}
            >
              <Ionicons name="logo-whatsapp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* App Info */}
        <Animated.View entering={FadeInDown.delay(900)} style={styles.appInfoSection}>
          <Text style={styles.appVersion}>App Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 Kisii Polytechnic. All rights reserved.</Text>
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
  content: {
    flex: 1,
  },
  institutionCard: {
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
  institutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  institutionInfo: {
    flex: 1,
  },
  institutionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  institutionTagline: {
    fontSize: 14,
    color: '#3b82f6',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  institutionLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  socialSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});