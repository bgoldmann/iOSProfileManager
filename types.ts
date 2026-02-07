export enum PayloadType {
  WIFI = 'com.apple.wifi.managed',
  WEB_CLIP = 'com.apple.webClip.managed',
  EMAIL = 'com.apple.mail.managed',
  PASSCODE = 'com.apple.mobiledevice.passwordpolicy',
  RESTRICTIONS = 'com.apple.applicationaccess',
  VPN = 'com.apple.vpn.managed',
  CERTIFICATE = 'com.apple.security.root',
  DNS = 'com.apple.dnsSettings.managed',
  CALDAV = 'com.apple.caldav.account.managed',
  SUBSCRIBED_CALENDAR = 'com.apple.subscribedcalendar.account',
  LDAP = 'com.apple.ldap.account.managed',
  CAMERA = 'com.custom.camera.configuration', // Internal type, maps to restrictions in generator
  APP_LOCK = 'com.apple.app.lock',
  MDM = 'com.apple.mdm',
  APP_STORE = 'com.custom.appstore.configuration', // Internal type, maps to restrictions in generator
  FIND_MY = 'com.custom.findmy.configuration', // Internal type, maps to restrictions in generator
  PHONE = 'com.custom.phone.configuration', // Internal type, maps to restrictions in generator
  SETTINGS_RESTRICTIONS = 'com.custom.settings.restrictions', // Internal type, maps to restrictions in generator
  WEB_CONTENT_FILTER = 'com.apple.webcontent-filter',
  CELLULAR = 'com.apple.cellular',
  BLUETOOTH = 'com.custom.bluetooth.configuration', // Internal type, maps to restrictions in generator
  GLOBAL_HTTP_PROXY = 'com.apple.proxy.http.global',
}

export interface BasePayload {
  uuid: string; // Internal UI ID
  type: PayloadType;
  identifier: string; // PayloadIdentifier
  displayName: string; // PayloadDisplayName
  version: number;
}

export interface WifiPayload extends BasePayload {
  type: PayloadType.WIFI;
  ssid: string;
  hiddenNetwork: boolean;
  encryptionType: 'None' | 'WEP' | 'WPA' | 'WPA2' | 'Any';
  password?: string; // PSK for WPA/WEP
  autoJoin: boolean;
  disableAssociationMACRandomization: boolean;
  
  // EAP-TLS / Enterprise Settings
  eapClientConfiguration?: {
      eapType?: 'TLS' | 'PEAP';
      username?: string;
      password?: string; // For PEAP
      userCertificateUUID?: string; // UUID of a Certificate Payload in the same profile (TLS)
      trustedServerCertificateUUIDs?: string[]; // UUIDs of Root CA Payloads
      tlsCertificateCommonName?: string;
  };

  // Proxy Settings
  proxyType: 'None' | 'Manual' | 'Auto';
  proxyServer?: string;
  proxyPort?: number;
  proxyUsername?: string;
  proxyPassword?: string;
  proxyUrl?: string; // PAC URL
}

export interface WebClipPayload extends BasePayload {
  type: PayloadType.WEB_CLIP;
  url: string;
  label: string;
  isRemovable: boolean;
  fullScreen: boolean;
  icon?: string; // Base64 string
}

export interface EmailPayload extends BasePayload {
  type: PayloadType.EMAIL;
  emailAccountType: 'EmailTypeIMAP' | 'EmailTypePOP';
  accountDescription: string;
  incomingMailServerHostName: string;
  incomingMailServerPortNumber: number;
  incomingMailServerUsername: string;
  outgoingMailServerHostName: string;
  outgoingMailServerPortNumber: number;
  outgoingMailServerUsername?: string;
}

export interface PasscodePayload extends BasePayload {
  type: PayloadType.PASSCODE;
  forcePIN: boolean;
  allowSimple: boolean;
  requireAlphanumeric: boolean;
  minLength: number;
  maxPINAgeInDays: number;
  maxFailedAttempts: number;
}

export interface RestrictionsPayload extends BasePayload {
  type: PayloadType.RESTRICTIONS;
  // Device Functionality
  allowCamera: boolean;
  allowScreenShot: boolean;
  allowVoiceDialing: boolean;
  allowAssistant: boolean; // Siri
  allowAirDrop: boolean;
  
  // Apps & Store
  allowAppInstallation: boolean;
  allowAppRemoval: boolean;
  allowInAppPurchases: boolean;
  allowiTunes: boolean; // iTunes Store
  allowBookstore: boolean; // iBooks Store
  allowAutomaticAppDownloads?: boolean;
  
  // Safari
  allowSafari: boolean;
  safariAllowAutoFill?: boolean;
  safariForceFraudWarning?: boolean;
  safariAllowJavaScript?: boolean;
  safariAllowPopups?: boolean;
  safariAcceptCookies?: number; // 0: Always, 1: Never, 2: From visited

  // iCloud & Data
  allowCloudBackup: boolean;
  allowExplicitContent: boolean;
  
  // Game Center
  allowGameCenter: boolean;
  allowMultiplayerGaming: boolean;
  allowAddingGameCenterFriends: boolean;
}

export interface VpnPayload extends BasePayload {
  type: PayloadType.VPN;
  userDefinedName: string;
  vpnType: 'IKEv2' | 'L2TP' | 'IPSec';
  
  // Common / IKEv2
  server: string;
  
  // IKEv2
  remoteIdentifier?: string;
  localIdentifier?: string;
  authenticationMethod: 'SharedSecret' | 'Certificate';
  
  // L2TP / IPSec / IKEv2 SharedSecret
  sharedSecret?: string;
  
  // L2TP / IPSec
  username?: string;
  password?: string;
  
  // IPSec
  groupName?: string;
}

export interface CertificatePayload extends BasePayload {
  type: PayloadType.CERTIFICATE;
  certificateFileName: string;
  payloadContent: string; // Base64 DER data
}

export interface DnsPayload extends BasePayload {
  type: PayloadType.DNS;
  dnsProtocol: 'HTTPS' | 'TLS';
  serverName?: string;
  serverUrl?: string;
  serverAddresses: string; // Comma separated for UI
  supplementalMatchDomains: string; // Comma separated for UI
  prohibitDisablement: boolean;
}

export interface CalDavPayload extends BasePayload {
  type: PayloadType.CALDAV;
  accountDescription: string;
  hostName: string;
  username: string;
  port?: number;
  useSSL: boolean;
}

export interface SubscribedCalendarPayload extends BasePayload {
  type: PayloadType.SUBSCRIBED_CALENDAR;
  description: string;
  url: string;
  username?: string;
  useSSL: boolean;
}

export interface LdapSearchSetting {
  description: string;
  searchBase: string;
  scope: 'Base' | 'OneLevel' | 'Subtree';
}

export interface LdapPayload extends BasePayload {
  type: PayloadType.LDAP;
  accountDescription: string;
  hostname: string;
  username?: string;
  password?: string;
  useSSL: boolean;
  searchSettings: LdapSearchSetting[];
}

export interface CameraPayload extends BasePayload {
  type: PayloadType.CAMERA;
  allowCamera: boolean;
  allowScreenShot: boolean;
  allowFaceTime: boolean;
}

export interface AppLockPayload extends BasePayload {
  type: PayloadType.APP_LOCK;
  appBundleIdentifier: string;
  // Options
  disableTouch: boolean;
  disableDeviceRotation: boolean;
  disableVolumeButtons: boolean;
  disableSleepWakeButton: boolean;
  disableAutoLock: boolean;
  enableVoiceOver: boolean;
  enableZoom: boolean;
  enableInvertColors: boolean;
  enableAssistiveTouch: boolean;
}

export interface MdmPayload extends BasePayload {
  type: PayloadType.MDM;
  serverUrl: string;
  checkInUrl?: string;
  topic: string;
  identityCertificateUUID: string; // UUID of the certificate payload
  accessRights: number; // Bitmask
  signMessage: boolean;
  useDevelopmentAPNS: boolean;
  checkInInterval?: number; // In minutes, optional custom key sometimes used
}

export interface AppStorePayload extends BasePayload {
  type: PayloadType.APP_STORE;
  allowAppInstallation: boolean;
  allowAppRemoval: boolean;
  allowInAppPurchases: boolean;
  allowAutomaticAppDownloads: boolean;
  forceITunesStorePasswordEntry: boolean;
}

export interface FindMyPayload extends BasePayload {
  type: PayloadType.FIND_MY;
  allowFindMyDevice: boolean;
  allowFindMyFriends: boolean;
  allowFindMyFriendsModification: boolean;
}

export interface PhonePayload extends BasePayload {
  type: PayloadType.PHONE;
  allowVoiceDialing: boolean;
  allowFaceTime: boolean;
  allowAssistant: boolean; // Siri
  allowAssistantWhileLocked: boolean;
  forceAssistantProfanityFilter: boolean;
  allowAssistantUserGeneratedContent: boolean; // Allow Siri to query user-generated content (web)
  allowCellularPlanModification: boolean;
}

export interface SettingsRestrictionsPayload extends BasePayload {
  type: PayloadType.SETTINGS_RESTRICTIONS;
  allowAccountModification: boolean;
  allowPasscodeModification: boolean;
  allowWallpaperModification: boolean;
  allowDeviceNameModification: boolean;
  allowEraseContentAndSettings: boolean;
  allowBluetoothModification: boolean;
  allowPersonalHotspotModification: boolean;
  allowUIConfigurationProfileInstallation: boolean;
}

export interface WebContentFilterPayload extends BasePayload {
  type: PayloadType.WEB_CONTENT_FILTER;
  filterType: 'BuiltIn';
  isSpecificWebsitesOnly: boolean; // If true, whitelist mode. If false, adult content mode.
  autoFilterEnabled: boolean;
  permittedURLs: string; // Comma separated string for UI
  blacklistedURLs: string; // Comma separated string for UI
  whitelistedBookmarks: { url: string; title: string }[];
}

export interface CellularPayload extends BasePayload {
  type: PayloadType.CELLULAR;
  // Data APN
  apnName: string;
  apnUsername?: string;
  apnPassword?: string;
  apnAuthenticationType: 'CHAP' | 'PAP';
  
  // Attach APN
  includeAttachApn: boolean;
  attachApnName: string;
  attachApnUsername?: string;
  attachApnPassword?: string;
  attachApnAuthenticationType: 'CHAP' | 'PAP';

  // Tethering (Hotspot) APN
  includeTetheringApn: boolean;
  tetheringApnName: string;
  tetheringUsername?: string;
  tetheringPassword?: string;
  tetheringAuthenticationType: 'CHAP' | 'PAP';

  // MMS APN
  includeMmsApn: boolean;
  mmsApnName: string;
  mmsUsername?: string;
  mmsPassword?: string;
  mmsAuthenticationType: 'CHAP' | 'PAP';
  mmsMmsc?: string;
  mmsProxy?: string;
  mmsProxyPort?: number;
  mmsMaxMessageSize?: number;
}

export interface BluetoothPayload extends BasePayload {
  type: PayloadType.BLUETOOTH;
  allowBluetoothModification: boolean;
  allowAirDrop: boolean;
}

export interface GlobalHttpProxyPayload extends BasePayload {
  type: PayloadType.GLOBAL_HTTP_PROXY;
  proxyType: 'Manual' | 'Auto';
  
  // Manual
  proxyServer?: string;
  proxyPort?: number;
  proxyUsername?: string;
  proxyPassword?: string;
  proxyCaptiveLoginAllowed: boolean;
  
  // Auto
  proxyPacUrl?: string;
  proxyPacFallbackAllowed: boolean; // Allows device to connect directly if PAC fails
}

export type Payload = 
  | WifiPayload 
  | WebClipPayload 
  | EmailPayload 
  | PasscodePayload 
  | RestrictionsPayload 
  | VpnPayload 
  | CertificatePayload
  | DnsPayload
  | CalDavPayload
  | SubscribedCalendarPayload
  | LdapPayload
  | CameraPayload
  | AppLockPayload
  | MdmPayload
  | AppStorePayload
  | FindMyPayload
  | PhonePayload
  | SettingsRestrictionsPayload
  | WebContentFilterPayload
  | CellularPayload
  | BluetoothPayload
  | GlobalHttpProxyPayload;

export interface ProfileMetadata {
  displayName: string;
  identifier: string;
  organization: string;
  description: string;
  uuid: string;
}

export interface Profile {
  metadata: ProfileMetadata;
  payloads: Payload[];
}