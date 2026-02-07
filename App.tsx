import React, { useState } from 'react';
import { 
  Settings, 
  Wifi, 
  Globe, 
  Download, 
  Trash2, 
  ChevronRight, 
  Menu, 
  X, 
  Mail, 
  Lock, 
  Shield, 
  Network, 
  FileBadge, 
  Server, 
  Calendar, 
  Rss, 
  Users, 
  Camera, 
  Smartphone, 
  Search, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Sliders, 
  Filter, 
  Signal, 
  Bluetooth,
  Contact,
  MessageCircle,
  Inbox,
  Compass,
  Key,
  Printer,
  Bell,
  Type,
  LogIn,
  HelpCircle,
  PhoneCall,
  Hash,
  Flag
} from 'lucide-react';
import { 
  Profile, 
  Payload, 
  PayloadType, 
  WifiPayload, 
  WebClipPayload,
  EmailPayload,
  PasscodePayload,
  RestrictionsPayload,
  VpnPayload,
  CertificatePayload,
  DnsPayload,
  CalDavPayload,
  SubscribedCalendarPayload,
  LdapPayload,
  CameraPayload,
  AppLockPayload,
  MdmPayload,
  AppStorePayload,
  FindMyPayload,
  PhonePayload,
  SettingsRestrictionsPayload,
  WebContentFilterPayload,
  CellularPayload,
  BluetoothPayload,
  GlobalHttpProxyPayload,
  CardDavPayload,
  LockScreenPayload,
  ExchangeEasPayload,
  SafariPayload,
  ScepPayload,
  DomainsPayload,
  AirPrintPayload,
  NotificationSettingsPayload,
  GoogleAccountPayload,
  FontsPayload,
  SsoPayload,
  CallerIdPayload
} from './types';
import { GeneralSettings } from './components/GeneralSettings';
import { Guide } from './components/Guide';
import { iPhoneCodes } from './components/iPhoneCodes';
import { IranUSSDCodes } from './components/IranUSSDCodes';
import { WifiForm } from './components/payloads/WifiForm';
import { WebClipForm } from './components/payloads/WebClipForm';
import { EmailForm } from './components/payloads/EmailForm';
import { PasscodeForm } from './components/payloads/PasscodeForm';
import { RestrictionsForm } from './components/payloads/RestrictionsForm';
import { VPNForm } from './components/payloads/VPNForm';
import { CertificateForm } from './components/payloads/CertificateForm';
import { DnsForm } from './components/payloads/DnsForm';
import { CalDavForm } from './components/payloads/CalDavForm';
import { SubscribedCalendarForm } from './components/payloads/SubscribedCalendarForm';
import { LdapForm } from './components/payloads/LdapForm';
import { CameraForm } from './components/payloads/CameraForm';
import { AppLockForm } from './components/payloads/AppLockForm';
import { MdmForm } from './components/payloads/MdmForm';
import { AppStoreForm } from './components/payloads/AppStoreForm';
import { FindMyForm } from './components/payloads/FindMyForm';
import { PhoneForm } from './components/payloads/PhoneForm';
import { SettingsRestrictionsForm } from './components/payloads/SettingsRestrictionsForm';
import { WebContentFilterForm } from './components/payloads/WebContentFilterForm';
import { CellularForm } from './components/payloads/CellularForm';
import { BluetoothForm } from './components/payloads/BluetoothForm';
import { GlobalHttpProxyForm } from './components/payloads/GlobalHttpProxyForm';
import { CardDavForm } from './components/payloads/CardDavForm';
import { LockScreenForm } from './components/payloads/LockScreenForm';
import { ExchangeEasForm } from './components/payloads/ExchangeEasForm';
import { SafariForm } from './components/payloads/SafariForm';
import { ScepForm } from './components/payloads/ScepForm';
import { DomainsForm } from './components/payloads/DomainsForm';
import { AirPrintForm } from './components/payloads/AirPrintForm';
import { NotificationSettingsForm } from './components/payloads/NotificationSettingsForm';
import { GoogleAccountForm } from './components/payloads/GoogleAccountForm';
import { FontsForm } from './components/payloads/FontsForm';
import { SsoForm } from './components/payloads/SsoForm';
import { CallerIdForm } from './components/payloads/CallerIdForm';
import { downloadMobileConfig } from './utils/plistGenerator';

// Simple UUID generator
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toUpperCase();
  });
};

const initialProfile: Profile = {
  metadata: {
    displayName: 'Kiosk Profile',
    organization: 'Acme Corp',
    identifier: 'com.acme.kiosk',
    description: 'Single App Mode configuration for Kiosk devices',
    uuid: generateUUID(),
  },
  payloads: [
    {
      uuid: generateUUID(),
      type: PayloadType.APP_LOCK,
      identifier: 'com.acme.kiosk.applock',
      displayName: 'App Lock (Kiosk)',
      version: 1,
      appBundleIdentifier: 'com.apple.mobilesafari',
      disableTouch: false,
      disableDeviceRotation: true,
      disableVolumeButtons: true,
      disableSleepWakeButton: true,
      disableAutoLock: true,
      enableVoiceOver: false,
      enableZoom: false,
      enableInvertColors: false,
      enableAssistiveTouch: false,
    } as AppLockPayload
  ]
};

const AVAILABLE_PAYLOADS = [
    { type: PayloadType.WIFI, label: 'Wi-Fi', icon: Wifi },
    { type: PayloadType.EMAIL, label: 'Email', icon: Mail },
    { type: PayloadType.PASSCODE, label: 'Passcode', icon: Lock },
    { type: PayloadType.RESTRICTIONS, label: 'Restrictions', icon: Shield },
    { type: PayloadType.GLOBAL_HTTP_PROXY, label: 'Global HTTP Proxy', icon: Network },
    { type: PayloadType.BLUETOOTH, label: 'Bluetooth', icon: Bluetooth },
    { type: PayloadType.CELLULAR, label: 'Cellular & Carrier', icon: Signal },
    { type: PayloadType.WEB_CONTENT_FILTER, label: 'Web Content Filter', icon: Filter },
    { type: PayloadType.APP_LOCK, label: 'Single App Mode', icon: Smartphone },
    { type: PayloadType.WEB_CLIP, label: 'Web Clip', icon: Globe },
    { type: PayloadType.VPN, label: 'VPN', icon: Network },
    { type: PayloadType.CERTIFICATE, label: 'Certificate', icon: FileBadge },
    { type: PayloadType.DNS, label: 'Encrypted DNS', icon: Server },
    { type: PayloadType.MDM, label: 'MDM', icon: Server },
    { type: PayloadType.APP_STORE, label: 'App Store', icon: ShoppingBag },
    { type: PayloadType.FIND_MY, label: 'Find My', icon: MapPin },
    { type: PayloadType.PHONE, label: 'Phone & Siri', icon: Phone },
    { type: PayloadType.CALLER_ID, label: 'Caller ID', icon: PhoneCall },
    { type: PayloadType.SETTINGS_RESTRICTIONS, label: 'Settings Lock', icon: Sliders },
    { type: PayloadType.CALDAV, label: 'CalDAV', icon: Calendar },
    { type: PayloadType.SUBSCRIBED_CALENDAR, label: 'Subscribed Cal', icon: Rss },
    { type: PayloadType.LDAP, label: 'LDAP', icon: Users },
    { type: PayloadType.CARDDAV, label: 'CardDAV (Contacts)', icon: Contact },
    { type: PayloadType.LOCK_SCREEN, label: 'Lock Screen Message', icon: MessageCircle },
    { type: PayloadType.EXCHANGE_EAS, label: 'Exchange ActiveSync', icon: Inbox },
    { type: PayloadType.SAFARI, label: 'Safari', icon: Compass },
    { type: PayloadType.SCEP, label: 'SCEP', icon: Key },
    { type: PayloadType.DOMAINS, label: 'Domains', icon: Globe },
    { type: PayloadType.AIRPRINT, label: 'AirPrint', icon: Printer },
    { type: PayloadType.NOTIFICATION_SETTINGS, label: 'Notification Settings', icon: Bell },
    { type: PayloadType.GOOGLE_ACCOUNT, label: 'Google Account', icon: Users },
    { type: PayloadType.FONTS, label: 'Fonts', icon: Type },
    { type: PayloadType.SSO, label: 'Single Sign-On', icon: LogIn },
    { type: PayloadType.CAMERA, label: 'Camera', icon: Camera },
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [activeId, setActiveId] = useState<string>('general');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const addPayload = (type: PayloadType) => {
    const uuid = generateUUID();
    let newPayload: Payload;

    const getPayloadSlug = (t: PayloadType) => {
        switch(t) {
            case PayloadType.WIFI: return 'wifi';
            case PayloadType.WEB_CLIP: return 'webclip';
            case PayloadType.EMAIL: return 'email';
            case PayloadType.PASSCODE: return 'passcode';
            case PayloadType.RESTRICTIONS: return 'restrictions';
            case PayloadType.VPN: return 'vpn';
            case PayloadType.CERTIFICATE: return 'certificate';
            case PayloadType.DNS: return 'dns';
            case PayloadType.CALDAV: return 'caldav';
            case PayloadType.SUBSCRIBED_CALENDAR: return 'subscribed-calendar';
            case PayloadType.LDAP: return 'ldap';
            case PayloadType.CAMERA: return 'camera';
            case PayloadType.APP_LOCK: return 'applock';
            case PayloadType.MDM: return 'mdm';
            case PayloadType.APP_STORE: return 'appstore';
            case PayloadType.FIND_MY: return 'findmy';
            case PayloadType.PHONE: return 'phone';
            case PayloadType.CALLER_ID: return 'caller-id';
            case PayloadType.SETTINGS_RESTRICTIONS: return 'settings-restrictions';
            case PayloadType.WEB_CONTENT_FILTER: return 'web-content-filter';
            case PayloadType.CELLULAR: return 'cellular';
            case PayloadType.BLUETOOTH: return 'bluetooth';
            case PayloadType.GLOBAL_HTTP_PROXY: return 'global-http-proxy';
            case PayloadType.CARDDAV: return 'carddav';
            case PayloadType.LOCK_SCREEN: return 'lock-screen';
            case PayloadType.EXCHANGE_EAS: return 'exchange-eas';
            case PayloadType.SAFARI: return 'safari';
            case PayloadType.SCEP: return 'scep';
            case PayloadType.DOMAINS: return 'domains';
            case PayloadType.AIRPRINT: return 'airprint';
            case PayloadType.NOTIFICATION_SETTINGS: return 'notification-settings';
            case PayloadType.GOOGLE_ACCOUNT: return 'google-account';
            case PayloadType.FONTS: return 'fonts';
            case PayloadType.SSO: return 'sso';
            default: return 'payload';
        }
    };

    const base = {
      uuid,
      type,
      identifier: `${profile.metadata.identifier}.${getPayloadSlug(type)}.${uuid}`,
      displayName: '', // Will be set below
      version: 1,
    };

    switch(type) {
        case PayloadType.WIFI:
             newPayload = {
                ...base,
                displayName: 'Wi-Fi',
                ssid: '',
                hiddenNetwork: false,
                encryptionType: 'WPA',
                autoJoin: true,
                disableAssociationMACRandomization: false,
                proxyType: 'None',
            } as WifiPayload;
            break;
        case PayloadType.WEB_CLIP:
             newPayload = {
                ...base,
                displayName: 'Web Clip',
                url: 'https://',
                label: 'My Link',
                isRemovable: true,
                fullScreen: false,
             } as WebClipPayload;
             break;
        case PayloadType.EMAIL:
             newPayload = {
                ...base,
                displayName: 'Email',
                emailAccountType: 'EmailTypeIMAP',
                accountDescription: 'My Email',
                incomingMailServerHostName: '',
                incomingMailServerPortNumber: 993,
                incomingMailServerUsername: '',
                outgoingMailServerHostName: '',
                outgoingMailServerPortNumber: 587,
             } as EmailPayload;
             break;
        case PayloadType.PASSCODE:
             newPayload = {
                ...base,
                displayName: 'Passcode',
                forcePIN: true,
                allowSimple: true,
                requireAlphanumeric: false,
                minLength: 4,
                maxPINAgeInDays: 0,
                maxFailedAttempts: 0,
             } as PasscodePayload;
             break;
        case PayloadType.RESTRICTIONS:
             newPayload = {
                 ...base,
                 displayName: 'Restrictions',
                 // Device
                 allowCamera: true,
                 allowScreenShot: true,
                 allowVoiceDialing: true,
                 allowAssistant: true,
                 allowAirDrop: true,
                 // Apps
                 allowAppInstallation: true,
                 allowAppRemoval: true,
                 allowInAppPurchases: true,
                 allowAutomaticAppDownloads: true,
                 allowiTunes: true,
                 allowBookstore: true,
                 // Safari
                 allowSafari: true,
                 safariAllowAutoFill: true,
                 safariForceFraudWarning: true,
                 safariAllowJavaScript: true,
                 safariAllowPopups: true,
                 safariAcceptCookies: 2, // From visited
                 // Content
                 allowExplicitContent: true,
                 allowCloudBackup: true,
                 // Game Center
                 allowGameCenter: true,
                 allowMultiplayerGaming: true,
                 allowAddingGameCenterFriends: true,
             } as RestrictionsPayload;
             break;
        case PayloadType.VPN:
             newPayload = {
                 ...base,
                 displayName: 'VPN',
                 userDefinedName: 'My VPN',
                 vpnType: 'IKEv2',
                 remoteIdentifier: '',
                 localIdentifier: '',
                 server: '',
                 authenticationMethod: 'SharedSecret',
             } as VpnPayload;
             break;
        case PayloadType.CERTIFICATE:
             newPayload = {
                 ...base,
                 displayName: 'Certificate',
                 certificateFileName: '',
                 payloadContent: '',
             } as CertificatePayload;
             break;
        case PayloadType.DNS:
             newPayload = {
                 ...base,
                 displayName: 'Encrypted DNS',
                 dnsProtocol: 'HTTPS',
                 serverUrl: 'https://',
                 serverAddresses: '',
                 supplementalMatchDomains: '',
                 prohibitDisablement: false,
             } as DnsPayload;
             break;
        case PayloadType.CALDAV:
             newPayload = {
                 ...base,
                 displayName: 'CalDAV Account',
                 accountDescription: 'My Calendar',
                 hostName: '',
                 username: '',
                 port: 8443,
                 useSSL: true,
             } as CalDavPayload;
             break;
        case PayloadType.SUBSCRIBED_CALENDAR:
             newPayload = {
                 ...base,
                 displayName: 'Subscribed Calendar',
                 description: 'Calendar Subscription',
                 url: '',
                 useSSL: true,
             } as SubscribedCalendarPayload;
             break;
        case PayloadType.LDAP:
             newPayload = {
                 ...base,
                 displayName: 'LDAP Directory',
                 accountDescription: 'Company Directory',
                 hostname: '',
                 useSSL: true,
                 searchSettings: [],
             } as LdapPayload;
             break;
        case PayloadType.CAMERA:
             newPayload = {
                 ...base,
                 displayName: 'Camera Config',
                 allowCamera: true,
                 allowScreenShot: true,
                 allowFaceTime: true,
             } as CameraPayload;
             break;
        case PayloadType.APP_LOCK:
             newPayload = {
                 ...base,
                 displayName: 'App Lock',
                 appBundleIdentifier: '',
                 disableTouch: false,
                 disableDeviceRotation: false,
                 disableVolumeButtons: false,
                 disableSleepWakeButton: false,
                 disableAutoLock: false,
                 enableVoiceOver: false,
                 enableZoom: false,
                 enableInvertColors: false,
                 enableAssistiveTouch: false,
             } as AppLockPayload;
             break;
        case PayloadType.MDM:
             newPayload = {
                 ...base,
                 displayName: 'MDM Config',
                 serverUrl: 'https://',
                 topic: '',
                 identityCertificateUUID: '',
                 accessRights: 8191,
                 signMessage: false,
                 useDevelopmentAPNS: false,
             } as MdmPayload;
             break;
        case PayloadType.APP_STORE:
             newPayload = {
                 ...base,
                 displayName: 'App Store',
                 allowAppInstallation: true,
                 allowAppRemoval: true,
                 allowInAppPurchases: true,
                 allowAutomaticAppDownloads: true,
                 forceITunesStorePasswordEntry: false,
             } as AppStorePayload;
             break;
        case PayloadType.FIND_MY:
             newPayload = {
                 ...base,
                 displayName: 'Find My Config',
                 allowFindMyDevice: true,
                 allowFindMyFriends: true,
                 allowFindMyFriendsModification: true,
             } as FindMyPayload;
             break;
        case PayloadType.PHONE:
             newPayload = {
                 ...base,
                 displayName: 'Phone & Siri',
                 allowVoiceDialing: true,
                 allowFaceTime: true,
                 allowAssistant: true,
                 allowAssistantWhileLocked: true,
                 forceAssistantProfanityFilter: false,
                 allowAssistantUserGeneratedContent: true,
                 allowCellularPlanModification: true,
             } as PhonePayload;
             break;
        case PayloadType.SETTINGS_RESTRICTIONS:
             newPayload = {
                 ...base,
                 displayName: 'Settings Lock',
                 allowAccountModification: true,
                 allowPasscodeModification: true,
                 allowWallpaperModification: true,
                 allowDeviceNameModification: true,
                 allowEraseContentAndSettings: true,
                 allowBluetoothModification: true,
                 allowPersonalHotspotModification: true,
                 allowUIConfigurationProfileInstallation: true,
             } as SettingsRestrictionsPayload;
             break;
        case PayloadType.WEB_CONTENT_FILTER:
             newPayload = {
                 ...base,
                 displayName: 'Web Content Filter',
                 filterType: 'BuiltIn',
                 isSpecificWebsitesOnly: false,
                 autoFilterEnabled: true,
                 permittedURLs: '',
                 blacklistedURLs: '',
                 whitelistedBookmarks: [],
             } as WebContentFilterPayload;
             break;
        case PayloadType.CELLULAR:
             newPayload = {
                 ...base,
                 displayName: 'Cellular & Carrier',
                 apnName: '',
                 apnAuthenticationType: 'CHAP',
                 includeAttachApn: false,
                 attachApnName: '',
                 attachApnAuthenticationType: 'CHAP',
                 includeTetheringApn: false,
                 tetheringApnName: '',
                 tetheringAuthenticationType: 'CHAP',
                 includeMmsApn: false,
                 mmsApnName: '',
                 mmsAuthenticationType: 'CHAP',
             } as CellularPayload;
             break;
        case PayloadType.BLUETOOTH:
             newPayload = {
                 ...base,
                 displayName: 'Bluetooth',
                 allowBluetoothModification: true,
                 allowAirDrop: true,
             } as BluetoothPayload;
             break;
        case PayloadType.GLOBAL_HTTP_PROXY:
             newPayload = {
                 ...base,
                 displayName: 'Global HTTP Proxy',
                 proxyType: 'Manual',
                 proxyCaptiveLoginAllowed: true,
                 proxyPacFallbackAllowed: false,
             } as GlobalHttpProxyPayload;
             break;
        case PayloadType.CARDDAV:
             newPayload = {
                 ...base,
                 displayName: 'CardDAV (Contacts)',
                 accountDescription: 'My Contacts',
                 hostName: '',
                 username: '',
                 port: 443,
                 useSSL: true,
             } as CardDavPayload;
             break;
        case PayloadType.LOCK_SCREEN:
             newPayload = {
                 ...base,
                 displayName: 'Lock Screen Message',
                 lockScreenMessage: '',
             } as LockScreenPayload;
             break;
        case PayloadType.EXCHANGE_EAS:
             newPayload = {
                 ...base,
                 displayName: 'Exchange ActiveSync',
                 emailAddress: '',
                 host: '',
                 useSSL: true,
                 mailNumberOfPastDaysToSync: 7,
             } as ExchangeEasPayload;
             break;
        case PayloadType.SAFARI:
             newPayload = {
                 ...base,
                 displayName: 'Safari',
                 homepage: '',
                 bookmarks: [],
                 allowAutoFill: true,
                 forceFraudWarning: true,
                 allowJavaScript: true,
                 allowPopups: false,
             } as SafariPayload;
             break;
        case PayloadType.SCEP:
             newPayload = {
                 ...base,
                 displayName: 'SCEP',
                 url: '',
                 keysize: 2048,
                 keyType: 'RSA',
             } as ScepPayload;
             break;
        case PayloadType.DOMAINS:
             newPayload = {
                 ...base,
                 displayName: 'Domains',
                 emailDomains: [],
                 webDomains: [],
                 safariPasswordAutoFillDomains: [],
             } as DomainsPayload;
             break;
        case PayloadType.AIRPRINT:
             newPayload = {
                 ...base,
                 displayName: 'AirPrint',
                 printers: [],
             } as AirPrintPayload;
             break;
        case PayloadType.NOTIFICATION_SETTINGS:
             newPayload = {
                 ...base,
                 displayName: 'Notification Settings',
                 allowNotifications: true,
                 allowNotificationsModification: true,
             } as NotificationSettingsPayload;
             break;
        case PayloadType.GOOGLE_ACCOUNT:
             newPayload = {
                 ...base,
                 displayName: 'Google Account',
                 accountDescription: 'Google',
             } as GoogleAccountPayload;
             break;
        case PayloadType.FONTS:
             newPayload = {
                 ...base,
                 displayName: 'Fonts',
                 fonts: [],
             } as FontsPayload;
             break;
        case PayloadType.SSO:
             newPayload = {
                 ...base,
                 displayName: 'Single Sign-On',
                 name: '',
                 teamId: '',
                 type_: 'com.apple.extensibility.sso.kerberos',
                 bundleIds: [],
             } as SsoPayload;
             break;
        case PayloadType.CALLER_ID:
             newPayload = {
                 ...base,
                 displayName: 'Caller ID',
                 allowShowCallerID: true,
             } as CallerIdPayload;
             break;
        default:
            return;
    }

    setProfile(prev => ({
      ...prev,
      payloads: [...prev.payloads, newPayload]
    }));
    setActiveId(uuid);
    
    // Auto-close sidebar on mobile after adding
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  };

  const removePayload = (uuid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfile(prev => ({
      ...prev,
      payloads: prev.payloads.filter(p => p.uuid !== uuid)
    }));
    if (activeId === uuid) {
      setActiveId('general');
    }
  };

  const updatePayload = (updated: Payload) => {
    setProfile(prev => ({
      ...prev,
      payloads: prev.payloads.map(p => p.uuid === updated.uuid ? updated : p)
    }));
  };

  const getPayloadIcon = (type: PayloadType) => {
    switch(type) {
      case PayloadType.WIFI: return <Wifi className="w-4 h-4" />;
      case PayloadType.WEB_CLIP: return <Globe className="w-4 h-4" />;
      case PayloadType.EMAIL: return <Mail className="w-4 h-4" />;
      case PayloadType.PASSCODE: return <Lock className="w-4 h-4" />;
      case PayloadType.RESTRICTIONS: return <Shield className="w-4 h-4" />;
      case PayloadType.VPN: return <Network className="w-4 h-4" />;
      case PayloadType.CERTIFICATE: return <FileBadge className="w-4 h-4" />;
      case PayloadType.DNS: return <Server className="w-4 h-4" />;
      case PayloadType.MDM: return <Server className="w-4 h-4" />;
      case PayloadType.APP_STORE: return <ShoppingBag className="w-4 h-4" />;
      case PayloadType.FIND_MY: return <MapPin className="w-4 h-4" />;
      case PayloadType.PHONE: return <Phone className="w-4 h-4" />;
      case PayloadType.CALLER_ID: return <PhoneCall className="w-4 h-4" />;
      case PayloadType.SETTINGS_RESTRICTIONS: return <Sliders className="w-4 h-4" />;
      case PayloadType.WEB_CONTENT_FILTER: return <Filter className="w-4 h-4" />;
      case PayloadType.CELLULAR: return <Signal className="w-4 h-4" />;
      case PayloadType.BLUETOOTH: return <Bluetooth className="w-4 h-4" />;
      case PayloadType.GLOBAL_HTTP_PROXY: return <Network className="w-4 h-4" />;
      case PayloadType.CALDAV: return <Calendar className="w-4 h-4" />;
      case PayloadType.SUBSCRIBED_CALENDAR: return <Rss className="w-4 h-4" />;
      case PayloadType.LDAP: return <Users className="w-4 h-4" />;
      case PayloadType.CAMERA: return <Camera className="w-4 h-4" />;
      case PayloadType.APP_LOCK: return <Smartphone className="w-4 h-4" />;
      case PayloadType.CARDDAV: return <Contact className="w-4 h-4" />;
      case PayloadType.LOCK_SCREEN: return <MessageCircle className="w-4 h-4" />;
      case PayloadType.EXCHANGE_EAS: return <Inbox className="w-4 h-4" />;
      case PayloadType.SAFARI: return <Compass className="w-4 h-4" />;
      case PayloadType.SCEP: return <Key className="w-4 h-4" />;
      case PayloadType.DOMAINS: return <Globe className="w-4 h-4" />;
      case PayloadType.AIRPRINT: return <Printer className="w-4 h-4" />;
      case PayloadType.NOTIFICATION_SETTINGS: return <Bell className="w-4 h-4" />;
      case PayloadType.GOOGLE_ACCOUNT: return <Users className="w-4 h-4" />;
      case PayloadType.FONTS: return <Type className="w-4 h-4" />;
      case PayloadType.SSO: return <LogIn className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const filteredPayloads = AVAILABLE_PAYLOADS.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderActiveContent = () => {
    if (activeId === 'general') {
      return (
        <GeneralSettings 
          metadata={profile.metadata} 
          onChange={(m) => setProfile(prev => ({ ...prev, metadata: m }))} 
        />
      );
    }

    if (activeId === 'guide') {
      return <Guide />;
    }

    if (activeId === 'iphone-codes') {
      return <iPhoneCodes />;
    }

    if (activeId === 'iran-ussd') {
      return <IranUSSDCodes />;
    }

    const payload = profile.payloads.find(p => p.uuid === activeId);
    if (!payload) return null;

    switch (payload.type) {
      case PayloadType.WIFI:
        return <WifiForm payload={payload as WifiPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.WEB_CLIP:
        return <WebClipForm payload={payload as WebClipPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.EMAIL:
        return <EmailForm payload={payload as EmailPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.PASSCODE:
        return <PasscodeForm payload={payload as PasscodePayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.RESTRICTIONS:
        return <RestrictionsForm payload={payload as RestrictionsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.VPN:
        return <VPNForm payload={payload as VpnPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CERTIFICATE:
        return <CertificateForm payload={payload as CertificatePayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.DNS:
        return <DnsForm payload={payload as DnsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CALDAV:
        return <CalDavForm payload={payload as CalDavPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.SUBSCRIBED_CALENDAR:
        return <SubscribedCalendarForm payload={payload as SubscribedCalendarPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.LDAP:
        return <LdapForm payload={payload as LdapPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CAMERA:
        return <CameraForm payload={payload as CameraPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.APP_LOCK:
        return <AppLockForm payload={payload as AppLockPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.MDM:
        return <MdmForm payload={payload as MdmPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.APP_STORE:
        return <AppStoreForm payload={payload as AppStorePayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.FIND_MY:
        return <FindMyForm payload={payload as FindMyPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.PHONE:
        return <PhoneForm payload={payload as PhonePayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.SETTINGS_RESTRICTIONS:
        return <SettingsRestrictionsForm payload={payload as SettingsRestrictionsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.WEB_CONTENT_FILTER:
        return <WebContentFilterForm payload={payload as WebContentFilterPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CELLULAR:
        return <CellularForm payload={payload as CellularPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.BLUETOOTH:
        return <BluetoothForm payload={payload as BluetoothPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.GLOBAL_HTTP_PROXY:
        return <GlobalHttpProxyForm payload={payload as GlobalHttpProxyPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CARDDAV:
        return <CardDavForm payload={payload as CardDavPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.LOCK_SCREEN:
        return <LockScreenForm payload={payload as LockScreenPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.EXCHANGE_EAS:
        return <ExchangeEasForm payload={payload as ExchangeEasPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.SAFARI:
        return <SafariForm payload={payload as SafariPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.SCEP:
        return <ScepForm payload={payload as ScepPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.DOMAINS:
        return <DomainsForm payload={payload as DomainsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.AIRPRINT:
        return <AirPrintForm payload={payload as AirPrintPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.NOTIFICATION_SETTINGS:
        return <NotificationSettingsForm payload={payload as NotificationSettingsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.GOOGLE_ACCOUNT:
        return <GoogleAccountForm payload={payload as GoogleAccountPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.FONTS:
        return <FontsForm payload={payload as FontsPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.SSO:
        return <SsoForm payload={payload as SsoPayload} onChange={(p) => updatePayload(p)} />;
      case PayloadType.CALLER_ID:
        return <CallerIdForm payload={payload as CallerIdPayload} onChange={(p) => updatePayload(p)} />;
      default:
        return <div>Unknown Payload Type</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F2F2F7] overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {!isSidebarOpen && (
        <button 
          type="button"
          aria-label="Open menu"
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            <h1 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 bg-ios-blue rounded-lg flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </span>
              iOS Profile Manager
            </h1>
            <button 
              type="button"
              aria-label="Close menu"
              className="md:hidden text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            {/* General Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Settings</h3>
              <button
                onClick={() => { setActiveId('general'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeId === 'general' 
                    ? 'bg-ios-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">General</span>
                {activeId === 'general' && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </button>
              <button
                onClick={() => { setActiveId('guide'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeId === 'guide' 
                    ? 'bg-ios-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium">Guide</span>
                {activeId === 'guide' && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </button>
              <button
                onClick={() => { setActiveId('iphone-codes'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeId === 'iphone-codes' 
                    ? 'bg-ios-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Hash className="w-4 h-4" />
                <span className="font-medium">iPhone Codes</span>
                {activeId === 'iphone-codes' && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </button>
              <button
                onClick={() => { setActiveId('iran-ussd'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeId === 'iran-ussd' 
                    ? 'bg-ios-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span className="font-medium">Iran USSD</span>
                {activeId === 'iran-ussd' && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </button>
            </div>

            {/* Payloads Section */}
            <div>
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configured Payloads</h3>
              </div>
              
              <div className="space-y-1">
                {profile.payloads.map((p) => (
                  <button
                    key={p.uuid}
                    onClick={() => { setActiveId(p.uuid); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                      activeId === p.uuid 
                        ? 'bg-ios-blue text-white shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getPayloadIcon(p.type)}
                    <div className="flex-1 text-left truncate">
                      <span className="font-medium block truncate">{p.displayName}</span>
                      <span className={`text-xs block truncate ${activeId === p.uuid ? 'text-blue-100' : 'text-gray-400'}`}>
                        {p.type.split('.').slice(-2).join('.')}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${p.displayName} payload`}
                      onClick={(e) => removePayload(p.uuid, e)}
                      className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                        activeId === p.uuid ? 'hover:bg-blue-600' : 'hover:bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </button>
                ))}

                {profile.payloads.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-400">No payloads added</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add Button List */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
               <div className="px-2 mb-2">
                 <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Add New Payload</p>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-ios-blue focus:bg-white transition-all outline-none placeholder-gray-500"
                    />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 gap-1">
                   {filteredPayloads.map((item) => (
                       <button 
                          key={item.type}
                          onClick={() => {
                              addPayload(item.type);
                              setSearchTerm('');
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors group"
                       >
                         <div className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-500 flex items-center justify-center group-hover:border-ios-blue group-hover:text-ios-blue transition-colors shadow-sm shrink-0">
                           <item.icon className="w-4 h-4" />
                         </div>
                         <span className="text-gray-700 font-medium truncate">{item.label}</span>
                       </button>
                   ))}
                   {filteredPayloads.length === 0 && (
                       <div className="text-center py-4 px-2">
                           <p className="text-xs text-gray-400">No payloads found</p>
                       </div>
                   )}
               </div>
            </div>
            
            <div className="h-12" /> {/* Spacer for bottom scroll */}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F2F2F7]">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 md:hidden">
            {/* Spacer for menu button */}
            <div className="w-8" />
            <h2 className="font-semibold text-gray-900 truncate text-base">
               {activeId === 'general' ? 'General Settings' : activeId === 'guide' ? 'Guide' : activeId === 'iphone-codes' ? 'iPhone Codes' : activeId === 'iran-ussd' ? 'Iran USSD' : profile.payloads.find(p => p.uuid === activeId)?.displayName}
            </h2>
          </div>
          <div className="hidden md:block">
             <h2 className="text-sm font-medium text-gray-500">
               Editing: <span className="text-gray-900">{profile.metadata.displayName}</span>
             </h2>
          </div>

          <button
            onClick={() => downloadMobileConfig(profile)}
            className="flex items-center gap-2 bg-ios-blue hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Profile</span>
            <span className="sm:hidden">Export</span>
          </button>
        </header>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
           <div className="max-w-3xl mx-auto pb-12">
             {renderActiveContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;