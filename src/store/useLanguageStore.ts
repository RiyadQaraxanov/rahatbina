
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from './useSettingsStore';

type TranslationKey = string;
type TranslationValue = string;
type Translations = Record<TranslationKey, TranslationValue>;
type LanguageTranslations = Record<Language, Translations>;

// For simplicity, we'll define a subset of translations here
// In a real app, this would likely be loaded from an API or separate JSON files
const initialTranslations: LanguageTranslations = {
  tr: {
    'dashboard.title': 'Gösterge Paneli',
    'language.title': 'Dil Ayarları',
    'profile.title': 'Profil',
    'notifications.empty': 'Bildirim yok',
    'notifications.viewAll': 'Tümünü Görüntüle',
    'dashboard.stats.totalUsers': 'Toplam Kullanıcılar',
    'dashboard.stats.activeParkingAreas': 'Aktif Park Alanları',
    'dashboard.stats.dailyNotifications': 'Günlük Bildirimler',
    'dashboard.stats.activeDevices': 'Aktif Cihazlar',
    'dashboard.stats.pendingIssues': 'Bekleyen Sorunlar',
    'dashboard.recentActivity': 'Son Aktiviteler',
    
    'users.title': 'Kullanıcı Yönetimi',
    'users.list': 'Kullanıcı Listesi',
    'users.create': 'Yeni Kullanıcı',
    'users.edit': 'Kullanıcı Düzenle',
    'users.delete': 'Kullanıcı Sil',
    'users.role': 'Rol',
    'users.email': 'E-posta',
    'users.name': 'Ad Soyad',
    'users.status': 'Durum',
    'users.lastLogin': 'Son Giriş',
    'users.actions': 'İşlemler',
    
    'roles.title': 'Rol ve İzinler',
    'roles.list': 'Rol Listesi',
    'roles.create': 'Yeni Rol',
    'roles.edit': 'Rol Düzenle',
    'roles.delete': 'Rol Sil',
    'roles.permissions': 'İzinler',
    'roles.module': 'Modül',
    'roles.viewPerm': 'Görüntüleme',
    'roles.createPerm': 'Oluşturma',
    'roles.updatePerm': 'Güncelleme',
    'roles.deletePerm': 'Silme',
    
    'parking.title': 'Park Alanları Yönetimi',
    'parking.list': 'Park Alanları Listesi',
    'parking.create': 'Yeni Park Alanı',
    'parking.edit': 'Park Alanı Düzenle',
    'parking.delete': 'Park Alanı Sil',
    'parking.name': 'Ad',
    'parking.capacity': 'Kapasite',
    'parking.occupied': 'Dolu',
    'parking.status': 'Durum',
    'parking.devices': 'Cihazlar',
    'parking.location': 'Konum',
    
    'devices.title': 'Cihaz Yönetimi',
    'devices.list': 'Cihaz Listesi',
    'devices.create': 'Yeni Cihaz',
    'devices.edit': 'Cihaz Düzenle',
    'devices.delete': 'Cihaz Sil',
    'devices.id': 'ID',
    'devices.name': 'Ad',
    'devices.type': 'Tip',
    'devices.status': 'Durum',
    'devices.location': 'Konum',
    'devices.parkingArea': 'Park Alanı',
    'devices.firmware': 'Yazılım',
    'devices.update': 'Güncelle',
    'devices.restart': 'Yeniden Başlat',
    
    'notifications.title': 'Bildirim Sistemi',
    'notifications.list': 'Bildirim Listesi',
    'notifications.create': 'Yeni Bildirim',
    'notifications.templates': 'Şablonlar',
    'notifications.subject': 'Başlık',
    'notifications.message': 'Mesaj',
    'notifications.type': 'Tip',
    'notifications.priority': 'Öncelik',
    'notifications.target': 'Hedef',
    'notifications.send': 'Gönder',
    
    'settings.title': 'Ayarlar',
    'settings.theme': 'Tema',
    'settings.language': 'Dil',
    'settings.notifications': 'Bildirimler',
    'settings.map': 'Harita Ayarları',
    'settings.apiKeys': 'API Anahtarları',
    'settings.version': 'Versiyon',
    'settings.save': 'Kaydet',
    'settings.reset': 'Sıfırla',
    
    'logs.title': 'Log ve Aktiviteler',
    'logs.level': 'Seviye',
    'logs.module': 'Modül',
    'logs.message': 'Mesaj',
    'logs.user': 'Kullanıcı',
    'logs.date': 'Tarih',
    'logs.filter': 'Filtrele',
    'logs.clear': 'Temizle',
    
    'support.title': 'Destek ve Geri Bildirim',
    'support.tickets': 'Destek Talepleri',
    'support.create': 'Yeni Talep',
    'support.status': 'Durum',
    'support.priority': 'Öncelik',
    'support.category': 'Kategori',
    'support.tags': 'Etiketler',
    'support.assign': 'Atama',
    'support.reply': 'Yanıtla',
    
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.edit': 'Düzenle',
    'common.delete': 'Sil',
    'common.create': 'Oluştur',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.status': 'Durum',
    'common.actions': 'İşlemler',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.logout': 'Çıkış Yap',
    'common.login': 'Giriş Yap',
  },
  
  en: {
    'dashboard.title': 'Dashboard',
    'language.title': 'Language Settings',
    'profile.title': 'Profile',
    'notifications.empty': 'No notifications',
    'notifications.viewAll': 'View All',
    'dashboard.stats.totalUsers': 'Total Users',
    'dashboard.stats.activeParkingAreas': 'Active Parking Areas',
    'dashboard.stats.dailyNotifications': 'Daily Notifications',
    'dashboard.stats.activeDevices': 'Active Devices',
    'dashboard.stats.pendingIssues': 'Pending Issues',
    'dashboard.recentActivity': 'Recent Activity',
    
    'users.title': 'User Management',
    'users.list': 'User List',
    'users.create': 'Create User',
    'users.edit': 'Edit User',
    'users.delete': 'Delete User',
    'users.role': 'Role',
    'users.email': 'Email',
    'users.name': 'Full Name',
    'users.status': 'Status',
    'users.lastLogin': 'Last Login',
    'users.actions': 'Actions',
    
    'roles.title': 'Roles & Permissions',
    'roles.list': 'Role List',
    'roles.create': 'Create Role',
    'roles.edit': 'Edit Role',
    'roles.delete': 'Delete Role',
    'roles.permissions': 'Permissions',
    'roles.module': 'Module',
    'roles.viewPerm': 'View',
    'roles.createPerm': 'Create',
    'roles.updatePerm': 'Update',
    'roles.deletePerm': 'Delete',
    
    'parking.title': 'Parking Area Management',
    'parking.list': 'Parking Areas List',
    'parking.create': 'Create Parking Area',
    'parking.edit': 'Edit Parking Area',
    'parking.delete': 'Delete Parking Area',
    'parking.name': 'Name',
    'parking.capacity': 'Capacity',
    'parking.occupied': 'Occupied',
    'parking.status': 'Status',
    'parking.devices': 'Devices',
    'parking.location': 'Location',
    
    'devices.title': 'Device Management',
    'devices.list': 'Device List',
    'devices.create': 'Create Device',
    'devices.edit': 'Edit Device',
    'devices.delete': 'Delete Device',
    'devices.id': 'ID',
    'devices.name': 'Name',
    'devices.type': 'Type',
    'devices.status': 'Status',
    'devices.location': 'Location',
    'devices.parkingArea': 'Parking Area',
    'devices.firmware': 'Firmware',
    'devices.update': 'Update',
    'devices.restart': 'Restart',
    
    'notifications.title': 'Notification System',
    'notifications.list': 'Notification List',
    'notifications.create': 'Create Notification',
    'notifications.templates': 'Templates',
    'notifications.subject': 'Title',
    'notifications.message': 'Message',
    'notifications.type': 'Type',
    'notifications.priority': 'Priority',
    'notifications.target': 'Target',
    'notifications.send': 'Send',
    
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.map': 'Map Settings',
    'settings.apiKeys': 'API Keys',
    'settings.version': 'Version',
    'settings.save': 'Save',
    'settings.reset': 'Reset',
    
    'logs.title': 'Logs & Activities',
    'logs.level': 'Level',
    'logs.module': 'Module',
    'logs.message': 'Message',
    'logs.user': 'User',
    'logs.date': 'Date',
    'logs.filter': 'Filter',
    'logs.clear': 'Clear',
    
    'support.title': 'Support & Feedback',
    'support.tickets': 'Support Tickets',
    'support.create': 'Create Ticket',
    'support.status': 'Status',
    'support.priority': 'Priority',
    'support.category': 'Category',
    'support.tags': 'Tags',
    'support.assign': 'Assign',
    'support.reply': 'Reply',
    
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.create': 'Create',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.logout': 'Logout',
    'common.login': 'Login',
  },
  
  // Placeholder for other languages - in a real application, we would have full translations
  de: {
    'dashboard.title': 'Dashboard',
    'common.loading': 'Wird geladen...',
    'language.title': 'Spracheinstellungen',
    'profile.title': 'Profil',
    'notifications.empty': 'Keine Benachrichtigungen',
    'notifications.viewAll': 'Alle anzeigen',
  },
  
  fr: {
    'dashboard.title': 'Tableau de Bord',
    'common.loading': 'Chargement...',
    'language.title': 'Paramètres de langue',
    'profile.title': 'Profil',
    'notifications.empty': 'Aucune notification',
    'notifications.viewAll': 'Voir tout',
  },
  
  ar: {
    'dashboard.title': 'لوحة القيادة',
    'common.loading': 'جار التحميل...',
    'language.title': 'إعدادات اللغة',
    'profile.title': 'الملف الشخصي',
    'notifications.empty': 'لا توجد إشعارات',
    'notifications.viewAll': 'عرض الكل',
  },
};

type LanguageMap = {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
};

const supportedLanguages: LanguageMap[] = [
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
  },
];

type LanguageStore = {
  currentLanguage: Language;
  supportedLanguages: LanguageMap[];
  translations: LanguageTranslations;
  setLanguage: (language: Language) => void;
  addTranslation: (language: Language, key: string, value: string) => void;
  translate: (key: string, params?: Record<string, string>) => string;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: 'tr',
      supportedLanguages,
      translations: initialTranslations,
      setLanguage: (language) => {
        set({ currentLanguage: language });
      },
      addTranslation: (language, key, value) => {
        set((state) => ({
          translations: {
            ...state.translations,
            [language]: {
              ...state.translations[language],
              [key]: value,
            },
          },
        }));
      },
      translate: (key, params) => {
        const { currentLanguage, translations } = get();
        let text = translations[currentLanguage][key] || translations.en[key] || key;
        
        // Replace parameters if they exist
        if (params) {
          Object.entries(params).forEach(([param, value]) => {
            text = text.replace(`{${param}}`, value);
          });
        }
        
        return text;
      },
    }),
    {
      name: 'park-pilot-language',
    }
  )
);
