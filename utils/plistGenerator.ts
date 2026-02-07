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
  GlobalHttpProxyPayload
} from '../types';

const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

const wrapKey = (key: string) => `\t\t<key>${escapeXml(key)}</key>`;
const wrapString = (val: string) => `\t\t<string>${escapeXml(val)}</string>`;
const wrapBool = (val: boolean) => `\t\t<${val ? 'true' : 'false'}/>`;
const wrapInt = (val: number) => `\t\t<integer>${val}</integer>`;
const wrapData = (val: string) => `\t\t<data>\n${val}\n\t\t</data>`;

const generateWifiDict = (payload: WifiPayload): string => {
  let content = '';
  content += `${wrapKey('SSID_STR')}\n${wrapString(payload.ssid)}\n`;
  content += `${wrapKey('HIDDEN_NETWORK')}\n${wrapBool(payload.hiddenNetwork)}\n`;
  content += `${wrapKey('AutoJoin')}\n${wrapBool(payload.autoJoin)}\n`;
  
  if (payload.disableAssociationMACRandomization) {
      content += `${wrapKey('DisableAssociationMACRandomization')}\n<true/>\n`;
  }
  
  content += `${wrapKey('EncryptionType')}\n${wrapString(payload.encryptionType)}\n`;
  
  // Standard Password
  if (payload.password && payload.encryptionType !== 'WPA2') {
    content += `${wrapKey('Password')}\n${wrapString(payload.password)}\n`;
  }

  // EAP-TLS / Enterprise Settings
  if (payload.encryptionType === 'WPA2' && payload.eapClientConfiguration) {
      let eapContent = '';
      const eapType = payload.eapClientConfiguration.eapType || 'TLS';
      
      // Accept EAP Types
      // 13 = TLS, 25 = PEAP
      const typeCode = eapType === 'PEAP' ? 25 : 13;
      eapContent += `${wrapKey('AcceptEAPTypes')}\n\t\t\t<array>\n\t\t\t\t<integer>${typeCode}</integer>\n\t\t\t</array>\n`;
      
      if (payload.eapClientConfiguration.username) {
          eapContent += `${wrapKey('UserName')}\n${wrapString(payload.eapClientConfiguration.username)}\n`;
      }
      
      // PEAP Password
      if (eapType === 'PEAP' && payload.eapClientConfiguration.password) {
           eapContent += `${wrapKey('Password')}\n${wrapString(payload.eapClientConfiguration.password)}\n`;
      }

      // Identity Cert (TLS Only)
      if (eapType === 'TLS' && payload.eapClientConfiguration.userCertificateUUID) {
          eapContent += `${wrapKey('PayloadCertificateAnchorUUID')}\n\t\t\t<array>\n\t\t\t\t<string>${escapeXml(payload.eapClientConfiguration.userCertificateUUID)}</string>\n\t\t\t</array>\n`;
      }

      if (payload.eapClientConfiguration.trustedServerCertificateUUIDs && payload.eapClientConfiguration.trustedServerCertificateUUIDs.length > 0) {
           const certs = payload.eapClientConfiguration.trustedServerCertificateUUIDs.map(uuid => `\t\t\t\t<string>${escapeXml(uuid)}</string>`).join('\n');
           eapContent += `${wrapKey('TLSTrustedServerNames')}\n\t\t\t<array>\n${certs}\n\t\t\t</array>\n`;
      }

      if (payload.eapClientConfiguration.tlsCertificateCommonName) {
           eapContent += `${wrapKey('TLSTrustedServerNames')}\n\t\t\t<array>\n\t\t\t\t<string>${escapeXml(payload.eapClientConfiguration.tlsCertificateCommonName)}</string>\n\t\t\t</array>\n`;
      }
      
      content += `${wrapKey('EAPClientConfiguration')}\n\t\t<dict>\n${eapContent}\t\t</dict>\n`;
  }

  if (payload.proxyType && payload.proxyType !== 'None') {
      content += `${wrapKey('ProxyType')}\n${wrapString(payload.proxyType)}\n`;
      
      if (payload.proxyType === 'Manual') {
          if (payload.proxyServer) content += `${wrapKey('ProxyServer')}\n${wrapString(payload.proxyServer)}\n`;
          if (payload.proxyPort) content += `${wrapKey('ProxyPort')}\n${wrapInt(payload.proxyPort)}\n`;
          if (payload.proxyUsername) content += `${wrapKey('ProxyUsername')}\n${wrapString(payload.proxyUsername)}\n`;
          if (payload.proxyPassword) content += `${wrapKey('ProxyPassword')}\n${wrapString(payload.proxyPassword)}\n`;
      } else if (payload.proxyType === 'Auto') {
          if (payload.proxyUrl) content += `${wrapKey('ProxyPACURL')}\n${wrapString(payload.proxyUrl)}\n`;
      }
  }
  
  return content;
};

const generateWebClipDict = (payload: WebClipPayload): string => {
  let content = '';
  content += `${wrapKey('URL')}\n${wrapString(payload.url)}\n`;
  content += `${wrapKey('Label')}\n${wrapString(payload.label)}\n`;
  content += `${wrapKey('IsRemovable')}\n${wrapBool(payload.isRemovable)}\n`;
  content += `${wrapKey('FullScreen')}\n${wrapBool(payload.fullScreen)}\n`;
  
  if (payload.icon) {
     content += `${wrapKey('Icon')}\n${wrapData(payload.icon)}\n`;
  }

  return content;
};

const generateEmailDict = (payload: EmailPayload): string => {
  let content = '';
  content += `${wrapKey('EmailAccountType')}\n${wrapString(payload.emailAccountType)}\n`;
  content += `${wrapKey('EmailAccountDescription')}\n${wrapString(payload.accountDescription)}\n`;
  content += `${wrapKey('IncomingMailServerHostName')}\n${wrapString(payload.incomingMailServerHostName)}\n`;
  content += `${wrapKey('IncomingMailServerPortNumber')}\n${wrapInt(payload.incomingMailServerPortNumber)}\n`;
  content += `${wrapKey('IncomingMailServerUsername')}\n${wrapString(payload.incomingMailServerUsername)}\n`;
  content += `${wrapKey('IncomingMailServerUseSSL')}\n<true/>\n`;
  content += `${wrapKey('OutgoingMailServerHostName')}\n${wrapString(payload.outgoingMailServerHostName)}\n`;
  content += `${wrapKey('OutgoingMailServerPortNumber')}\n${wrapInt(payload.outgoingMailServerPortNumber)}\n`;
  content += `${wrapKey('OutgoingMailServerUseSSL')}\n<true/>\n`;
  
  if (payload.outgoingMailServerUsername) {
     content += `${wrapKey('OutgoingMailServerUsername')}\n${wrapString(payload.outgoingMailServerUsername)}\n`;
  }

  return content;
};

const generatePasscodeDict = (payload: PasscodePayload): string => {
  let content = '';
  content += `${wrapKey('forcePIN')}\n${wrapBool(payload.forcePIN)}\n`;
  content += `${wrapKey('allowSimple')}\n${wrapBool(payload.allowSimple)}\n`;
  content += `${wrapKey('requireAlphanumeric')}\n${wrapBool(payload.requireAlphanumeric)}\n`;
  content += `${wrapKey('minLength')}\n${wrapInt(payload.minLength)}\n`;
  
  if (payload.maxPINAgeInDays > 0) {
    content += `${wrapKey('maxPINAgeInDays')}\n${wrapInt(payload.maxPINAgeInDays)}\n`;
  }
  if (payload.maxFailedAttempts > 0) {
    content += `${wrapKey('maxFailedAttempts')}\n${wrapInt(payload.maxFailedAttempts)}\n`;
  }

  return content;
};

const generateRestrictionsDict = (payload: RestrictionsPayload): string => {
  let content = '';
  content += `${wrapKey('allowCamera')}\n${wrapBool(payload.allowCamera)}\n`;
  content += `${wrapKey('allowScreenShot')}\n${wrapBool(payload.allowScreenShot)}\n`;
  content += `${wrapKey('allowVoiceDialing')}\n${wrapBool(payload.allowVoiceDialing)}\n`;
  content += `${wrapKey('allowAssistant')}\n${wrapBool(payload.allowAssistant)}\n`;
  content += `${wrapKey('allowAirDrop')}\n${wrapBool(payload.allowAirDrop)}\n`;
  
  content += `${wrapKey('allowSafari')}\n${wrapBool(payload.allowSafari)}\n`;
  content += `${wrapKey('allowAppInstallation')}\n${wrapBool(payload.allowAppInstallation)}\n`;
  content += `${wrapKey('allowAppRemoval')}\n${wrapBool(payload.allowAppRemoval)}\n`;
  content += `${wrapKey('allowInAppPurchases')}\n${wrapBool(payload.allowInAppPurchases)}\n`;
  content += `${wrapKey('allowiTunes')}\n${wrapBool(payload.allowiTunes)}\n`;
  content += `${wrapKey('allowBookstore')}\n${wrapBool(payload.allowBookstore)}\n`;
  
  if (payload.allowAutomaticAppDownloads !== undefined) {
      content += `${wrapKey('allowAutomaticAppDownloads')}\n${wrapBool(payload.allowAutomaticAppDownloads)}\n`;
  }

  if (payload.allowSafari) {
      if (payload.safariAllowAutoFill !== undefined) 
          content += `${wrapKey('safariAllowAutoFill')}\n${wrapBool(payload.safariAllowAutoFill)}\n`;
      if (payload.safariForceFraudWarning !== undefined) 
          content += `${wrapKey('safariForceFraudWarning')}\n${wrapBool(payload.safariForceFraudWarning)}\n`;
      if (payload.safariAllowJavaScript !== undefined) 
          content += `${wrapKey('safariAllowJavaScript')}\n${wrapBool(payload.safariAllowJavaScript)}\n`;
      if (payload.safariAllowPopups !== undefined) 
          content += `${wrapKey('safariAllowPopups')}\n${wrapBool(payload.safariAllowPopups)}\n`;
      if (payload.safariAcceptCookies !== undefined) 
          content += `${wrapKey('safariAcceptCookies')}\n${wrapInt(payload.safariAcceptCookies)}\n`;
  }

  content += `${wrapKey('allowExplicitContent')}\n${wrapBool(payload.allowExplicitContent)}\n`;
  content += `${wrapKey('allowCloudBackup')}\n${wrapBool(payload.allowCloudBackup)}\n`;
  
  content += `${wrapKey('allowGameCenter')}\n${wrapBool(payload.allowGameCenter)}\n`;
  content += `${wrapKey('allowMultiplayerGaming')}\n${wrapBool(payload.allowMultiplayerGaming)}\n`;
  content += `${wrapKey('allowAddingGameCenterFriends')}\n${wrapBool(payload.allowAddingGameCenterFriends)}\n`;

  return content;
};

const generateVpnDict = (payload: VpnPayload): string => {
  let content = '';
  content += `${wrapKey('UserDefinedName')}\n${wrapString(payload.userDefinedName)}\n`;
  content += `${wrapKey('VPNType')}\n${wrapString(payload.vpnType)}\n`;

  if (payload.vpnType === 'IKEv2') {
    let ikev2 = '';
    ikev2 += `${wrapKey('RemoteAddress')}\n${wrapString(payload.server)}\n`;

    if (payload.remoteIdentifier) {
        ikev2 += `${wrapKey('RemoteIdentifier')}\n${wrapString(payload.remoteIdentifier)}\n`;
    }
    if (payload.localIdentifier) {
        ikev2 += `${wrapKey('LocalIdentifier')}\n${wrapString(payload.localIdentifier)}\n`;
    }
    
    ikev2 += `${wrapKey('AuthenticationMethod')}\n${wrapString(payload.authenticationMethod)}\n`;
    
    if (payload.authenticationMethod === 'SharedSecret' && payload.sharedSecret) {
       ikev2 += `${wrapKey('SharedSecret')}\n${wrapString(payload.sharedSecret)}\n`;
    }
    
    content += `${wrapKey('IKEv2')}\n\t\t<dict>\n${ikev2}\t\t</dict>\n`;
  } else if (payload.vpnType === 'L2TP') {
    let l2tp = '';
    let ppp = '';
    ppp += `${wrapKey('CommRemoteAddress')}\n${wrapString(payload.server)}\n`;
    if (payload.username) {
        ppp += `${wrapKey('AuthName')}\n${wrapString(payload.username)}\n`;
    }
    if (payload.password) {
        ppp += `${wrapKey('AuthPassword')}\n${wrapString(payload.password)}\n`;
    }
    l2tp += `${wrapKey('PPP')}\n\t\t<dict>\n${ppp}\t\t</dict>\n`;

    let ipsec = '';
    ipsec += `${wrapKey('AuthenticationMethod')}\n${wrapString('SharedSecret')}\n`;
    if (payload.sharedSecret) {
        ipsec += `${wrapKey('SharedSecret')}\n${wrapString(payload.sharedSecret)}\n`;
    }
    l2tp += `${wrapKey('IPSec')}\n\t\t<dict>\n${ipsec}\t\t</dict>\n`;
    
    content += l2tp;
  } else if (payload.vpnType === 'IPSec') {
    let ipsec = '';
    ipsec += `${wrapKey('RemoteAddress')}\n${wrapString(payload.server)}\n`;
    ipsec += `${wrapKey('AuthenticationMethod')}\n${wrapString('SharedSecret')}\n`;
    if (payload.sharedSecret) {
        ipsec += `${wrapKey('SharedSecret')}\n${wrapString(payload.sharedSecret)}\n`;
    }
    if (payload.username) {
        ipsec += `${wrapKey('XAuthName')}\n${wrapString(payload.username)}\n`;
    }
    if (payload.password) {
        ipsec += `${wrapKey('XAuthPassword')}\n${wrapString(payload.password)}\n`;
    }
    ipsec += `${wrapKey('XAuthEnabled')}\n<integer>1</integer>\n`;
    
    if (payload.groupName) {
        ipsec += `${wrapKey('LocalIdentifier')}\n${wrapString(payload.groupName)}\n`;
    }

    content += `${wrapKey('IPSec')}\n\t\t<dict>\n${ipsec}\t\t</dict>\n`;
  }
  
  return content;
};

const generateCertificateDict = (payload: CertificatePayload): string => {
  let content = '';
  content += `${wrapKey('PayloadCertificateFileName')}\n${wrapString(payload.certificateFileName)}\n`;
  content += `${wrapKey('PayloadContent')}\n${wrapData(payload.payloadContent)}\n`;
  return content;
};

const generateDnsDict = (payload: DnsPayload): string => {
  let dnsSettings = '';
  dnsSettings += `${wrapKey('DNSProtocol')}\n${wrapString(payload.dnsProtocol)}\n`;
  
  if (payload.dnsProtocol === 'HTTPS' && payload.serverUrl) {
      dnsSettings += `${wrapKey('ServerURL')}\n${wrapString(payload.serverUrl)}\n`;
  }
  if (payload.dnsProtocol === 'TLS' && payload.serverName) {
      dnsSettings += `${wrapKey('ServerName')}\n${wrapString(payload.serverName)}\n`;
  }

  if (payload.serverAddresses) {
      const ips = payload.serverAddresses.split(',').map(s => s.trim()).filter(Boolean);
      if (ips.length > 0) {
           dnsSettings += `${wrapKey('ServerAddresses')}\n\t\t<array>\n${ips.map(ip => `\t\t\t<string>${escapeXml(ip)}</string>`).join('\n')}\n\t\t</array>\n`;
      }
  }

  if (payload.supplementalMatchDomains) {
       const domains = payload.supplementalMatchDomains.split(',').map(s => s.trim()).filter(Boolean);
       if (domains.length > 0) {
           dnsSettings += `${wrapKey('SupplementalMatchDomains')}\n\t\t<array>\n${domains.map(d => `\t\t\t<string>${escapeXml(d)}</string>`).join('\n')}\n\t\t</array>\n`;
       }
  }

  let content = '';
  content += `${wrapKey('DNSSettings')}\n\t\t<dict>\n${dnsSettings}\t\t</dict>\n`;
  content += `${wrapKey('ProhibitDisablement')}\n${wrapBool(payload.prohibitDisablement)}\n`;

  return content;
};

const generateCalDavDict = (payload: CalDavPayload): string => {
  let content = '';
  content += `${wrapKey('CalDAVAccountDescription')}\n${wrapString(payload.accountDescription)}\n`;
  content += `${wrapKey('CalDAVHostName')}\n${wrapString(payload.hostName)}\n`;
  content += `${wrapKey('CalDAVUsername')}\n${wrapString(payload.username)}\n`;
  content += `${wrapKey('CalDAVUseSSL')}\n${wrapBool(payload.useSSL)}\n`;
  
  if (payload.port) {
      content += `${wrapKey('CalDAVPort')}\n${wrapInt(payload.port)}\n`;
  }

  return content;
};

const generateSubscribedCalendarDict = (payload: SubscribedCalendarPayload): string => {
  let content = '';
  content += `${wrapKey('SubscribedCalendarDescription')}\n${wrapString(payload.description)}\n`;
  content += `${wrapKey('SubscribedCalendarURL')}\n${wrapString(payload.url)}\n`;
  content += `${wrapKey('SubscribedCalendarUseSSL')}\n${wrapBool(payload.useSSL)}\n`;
  
  if (payload.username) {
      content += `${wrapKey('SubscribedCalendarUsername')}\n${wrapString(payload.username)}\n`;
  }

  return content;
};

const generateLdapDict = (payload: LdapPayload): string => {
  let content = '';
  content += `${wrapKey('LDAPAccountDescription')}\n${wrapString(payload.accountDescription)}\n`;
  content += `${wrapKey('LDAPAccountHostName')}\n${wrapString(payload.hostname)}\n`;
  content += `${wrapKey('LDAPAccountUseSSL')}\n${wrapBool(payload.useSSL)}\n`;

  if (payload.username) {
    content += `${wrapKey('LDAPAccountUserName')}\n${wrapString(payload.username)}\n`;
  }
  if (payload.password) {
    content += `${wrapKey('LDAPAccountPassword')}\n${wrapString(payload.password)}\n`;
  }

  if (payload.searchSettings.length > 0) {
    let settings = '';
    payload.searchSettings.forEach(setting => {
      let s = '';
      s += `${wrapKey('LDAPSearchSettingDescription')}\n${wrapString(setting.description)}\n`;
      s += `${wrapKey('LDAPSearchSettingSearchBase')}\n${wrapString(setting.searchBase)}\n`;
      
      let scopeVal = 2; // Default Subtree
      if (setting.scope === 'Base') scopeVal = 0;
      if (setting.scope === 'OneLevel') scopeVal = 1;
      
      s += `${wrapKey('LDAPSearchSettingScope')}\n${wrapInt(scopeVal)}\n`;
      settings += `\t\t\t<dict>\n${s}\t\t\t</dict>\n`;
    });
    content += `${wrapKey('LDAPSearchSettings')}\n\t\t<array>\n${settings}\t\t</array>\n`;
  }

  return content;
};

const generateCameraDict = (payload: CameraPayload): string => {
    let content = '';
    content += `${wrapKey('allowCamera')}\n${wrapBool(payload.allowCamera)}\n`;
    content += `${wrapKey('allowScreenShot')}\n${wrapBool(payload.allowScreenShot)}\n`;
    content += `${wrapKey('allowFaceTime')}\n${wrapBool(payload.allowFaceTime)}\n`;
    return content;
};

const generateAppLockDict = (payload: AppLockPayload): string => {
    let appContent = '';
    appContent += `${wrapKey('Identifier')}\n${wrapString(payload.appBundleIdentifier)}\n`;
    
    let optionsContent = '';
    optionsContent += `${wrapKey('DisableTouch')}\n${wrapBool(payload.disableTouch)}\n`;
    optionsContent += `${wrapKey('DisableDeviceRotation')}\n${wrapBool(payload.disableDeviceRotation)}\n`;
    optionsContent += `${wrapKey('DisableVolumeButtons')}\n${wrapBool(payload.disableVolumeButtons)}\n`;
    optionsContent += `${wrapKey('DisableSleepWakeButton')}\n${wrapBool(payload.disableSleepWakeButton)}\n`;
    optionsContent += `${wrapKey('DisableAutoLock')}\n${wrapBool(payload.disableAutoLock)}\n`;
    optionsContent += `${wrapKey('EnableVoiceOver')}\n${wrapBool(payload.enableVoiceOver)}\n`;
    optionsContent += `${wrapKey('EnableZoom')}\n${wrapBool(payload.enableZoom)}\n`;
    optionsContent += `${wrapKey('EnableInvertColors')}\n${wrapBool(payload.enableInvertColors)}\n`;
    optionsContent += `${wrapKey('EnableAssistiveTouch')}\n${wrapBool(payload.enableAssistiveTouch)}\n`;

    if (optionsContent) {
        appContent += `${wrapKey('Options')}\n\t\t\t<dict>\n${optionsContent}\t\t\t</dict>\n`;
    }

    let content = '';
    content += `${wrapKey('App')}\n\t\t<dict>\n${appContent}\t\t</dict>\n`;
    return content;
};

const generateMdmDict = (payload: MdmPayload): string => {
    let content = '';
    content += `${wrapKey('ServerURL')}\n${wrapString(payload.serverUrl)}\n`;
    content += `${wrapKey('Topic')}\n${wrapString(payload.topic)}\n`;
    content += `${wrapKey('IdentityCertificateUUID')}\n${wrapString(payload.identityCertificateUUID)}\n`;
    content += `${wrapKey('AccessRights')}\n${wrapInt(payload.accessRights)}\n`;
    content += `${wrapKey('SignMessage')}\n${wrapBool(payload.signMessage)}\n`;
    content += `${wrapKey('UseDevelopmentAPNS')}\n${wrapBool(payload.useDevelopmentAPNS)}\n`;

    if (payload.checkInUrl) {
        content += `${wrapKey('CheckInURL')}\n${wrapString(payload.checkInUrl)}\n`;
    }

    if (payload.checkInInterval && payload.checkInInterval > 0) {
        content += `${wrapKey('CheckInInterval')}\n${wrapInt(payload.checkInInterval)}\n`;
    }

    return content;
};

const generateAppStoreDict = (payload: AppStorePayload): string => {
    let content = '';
    content += `${wrapKey('allowAppInstallation')}\n${wrapBool(payload.allowAppInstallation)}\n`;
    content += `${wrapKey('allowAppRemoval')}\n${wrapBool(payload.allowAppRemoval)}\n`;
    content += `${wrapKey('allowInAppPurchases')}\n${wrapBool(payload.allowInAppPurchases)}\n`;
    content += `${wrapKey('allowAutomaticAppDownloads')}\n${wrapBool(payload.allowAutomaticAppDownloads)}\n`;
    content += `${wrapKey('forceITunesStorePasswordEntry')}\n${wrapBool(payload.forceITunesStorePasswordEntry)}\n`;
    return content;
};

const generateFindMyDict = (payload: FindMyPayload): string => {
    let content = '';
    content += `${wrapKey('allowFindMyDevice')}\n${wrapBool(payload.allowFindMyDevice)}\n`;
    content += `${wrapKey('allowFindMyFriends')}\n${wrapBool(payload.allowFindMyFriends)}\n`;
    content += `${wrapKey('allowFindMyFriendsModification')}\n${wrapBool(payload.allowFindMyFriendsModification)}\n`;
    return content;
};

const generatePhoneDict = (payload: PhonePayload): string => {
    let content = '';
    content += `${wrapKey('allowVoiceDialing')}\n${wrapBool(payload.allowVoiceDialing)}\n`;
    content += `${wrapKey('allowFaceTime')}\n${wrapBool(payload.allowFaceTime)}\n`;
    content += `${wrapKey('allowAssistant')}\n${wrapBool(payload.allowAssistant)}\n`;
    content += `${wrapKey('allowAssistantWhileLocked')}\n${wrapBool(payload.allowAssistantWhileLocked)}\n`;
    
    if (payload.forceAssistantProfanityFilter !== undefined) {
         content += `${wrapKey('forceAssistantProfanityFilter')}\n${wrapBool(payload.forceAssistantProfanityFilter)}\n`;
    }
    if (payload.allowAssistantUserGeneratedContent !== undefined) {
         content += `${wrapKey('allowAssistantUserGeneratedContent')}\n${wrapBool(payload.allowAssistantUserGeneratedContent)}\n`;
    }
    if (payload.allowCellularPlanModification !== undefined) {
         content += `${wrapKey('allowCellularPlanModification')}\n${wrapBool(payload.allowCellularPlanModification)}\n`;
    }
    
    return content;
};

const generateSettingsRestrictionsDict = (payload: SettingsRestrictionsPayload): string => {
    let content = '';
    content += `${wrapKey('allowAccountModification')}\n${wrapBool(payload.allowAccountModification)}\n`;
    content += `${wrapKey('allowPasscodeModification')}\n${wrapBool(payload.allowPasscodeModification)}\n`;
    content += `${wrapKey('allowWallpaperModification')}\n${wrapBool(payload.allowWallpaperModification)}\n`;
    content += `${wrapKey('allowDeviceNameModification')}\n${wrapBool(payload.allowDeviceNameModification)}\n`;
    content += `${wrapKey('allowEraseContentAndSettings')}\n${wrapBool(payload.allowEraseContentAndSettings)}\n`;
    content += `${wrapKey('allowBluetoothModification')}\n${wrapBool(payload.allowBluetoothModification)}\n`;
    content += `${wrapKey('allowPersonalHotspotModification')}\n${wrapBool(payload.allowPersonalHotspotModification)}\n`;
    content += `${wrapKey('allowUIConfigurationProfileInstallation')}\n${wrapBool(payload.allowUIConfigurationProfileInstallation)}\n`;
    return content;
};

const generateWebContentFilterDict = (payload: WebContentFilterPayload): string => {
    let content = '';
    content += `${wrapKey('FilterType')}\n${wrapString(payload.filterType)}\n`;
    
    if (payload.isSpecificWebsitesOnly) {
        // Whitelist Mode
        // Note: Apple interprets presence of WhitelistedBookmarks as whitelist mode, 
        // usually accompanied by AutoFilterEnabled: false (or absent)
        content += `${wrapKey('AutoFilterEnabled')}\n<false/>\n`;
        
        if (payload.whitelistedBookmarks && payload.whitelistedBookmarks.length > 0) {
            let bookmarks = '';
            payload.whitelistedBookmarks.forEach(bm => {
                bookmarks += `\t\t\t<dict>\n`;
                bookmarks += `${wrapKey('URL')}\n${wrapString(bm.url)}\n`;
                bookmarks += `${wrapKey('Title')}\n${wrapString(bm.title)}\n`;
                bookmarks += `\t\t\t</dict>\n`;
            });
            content += `${wrapKey('WhitelistedBookmarks')}\n\t\t<array>\n${bookmarks}\t\t</array>\n`;
        }
    } else {
        // Adult Content Mode
        content += `${wrapKey('AutoFilterEnabled')}\n${wrapBool(payload.autoFilterEnabled)}\n`;
        
        if (payload.permittedURLs) {
            const urls = payload.permittedURLs.split(',').map(s => s.trim()).filter(Boolean);
            if (urls.length > 0) {
                content += `${wrapKey('PermittedURLs')}\n\t\t<array>\n${urls.map(u => `\t\t\t<string>${escapeXml(u)}</string>`).join('\n')}\n\t\t</array>\n`;
            }
        }
        
        if (payload.blacklistedURLs) {
            const urls = payload.blacklistedURLs.split(',').map(s => s.trim()).filter(Boolean);
            if (urls.length > 0) {
                content += `${wrapKey('BlacklistedURLs')}\n\t\t<array>\n${urls.map(u => `\t\t\t<string>${escapeXml(u)}</string>`).join('\n')}\n\t\t</array>\n`;
            }
        }
    }
    
    return content;
};

const generateCellularDict = (payload: CellularPayload): string => {
    let content = '';
    
    // Build APNs Array
    let apnsArrayContent = '';

    // 1. Data APN (Always included or main one)
    let dataApn = '';
    dataApn += `${wrapKey('AccessPointName')}\n${wrapString(payload.apnName)}\n`;
    dataApn += `${wrapKey('AuthenticationType')}\n${wrapString(payload.apnAuthenticationType)}\n`;
    if (payload.apnUsername) dataApn += `${wrapKey('Username')}\n${wrapString(payload.apnUsername)}\n`;
    if (payload.apnPassword) dataApn += `${wrapKey('Password')}\n${wrapString(payload.apnPassword)}\n`;
    apnsArrayContent += `\t\t\t<dict>\n${dataApn}\t\t\t</dict>\n`;

    // 2. Tethering APN (If included)
    if (payload.includeTetheringApn) {
        let tethApn = '';
        tethApn += `${wrapKey('AccessPointName')}\n${wrapString(payload.tetheringApnName)}\n`;
        tethApn += `${wrapKey('AuthenticationType')}\n${wrapString(payload.tetheringAuthenticationType)}\n`;
        if (payload.tetheringUsername) tethApn += `${wrapKey('Username')}\n${wrapString(payload.tetheringUsername)}\n`;
        if (payload.tetheringPassword) tethApn += `${wrapKey('Password')}\n${wrapString(payload.tetheringPassword)}\n`;
        apnsArrayContent += `\t\t\t<dict>\n${tethApn}\t\t\t</dict>\n`;
    }
    
    // 3. MMS APN (If included)
    if (payload.includeMmsApn) {
        let mmsApn = '';
        mmsApn += `${wrapKey('AccessPointName')}\n${wrapString(payload.mmsApnName)}\n`;
        mmsApn += `${wrapKey('AuthenticationType')}\n${wrapString(payload.mmsAuthenticationType)}\n`;
        if (payload.mmsUsername) mmsApn += `${wrapKey('Username')}\n${wrapString(payload.mmsUsername)}\n`;
        if (payload.mmsPassword) mmsApn += `${wrapKey('Password')}\n${wrapString(payload.mmsPassword)}\n`;
        if (payload.mmsMmsc) mmsApn += `${wrapKey('MMSC')}\n${wrapString(payload.mmsMmsc)}\n`;
        if (payload.mmsProxy) mmsApn += `${wrapKey('ProxyServer')}\n${wrapString(payload.mmsProxy)}\n`;
        if (payload.mmsProxyPort) mmsApn += `${wrapKey('ProxyPort')}\n${wrapInt(payload.mmsProxyPort)}\n`;
        if (payload.mmsMaxMessageSize) mmsApn += `${wrapKey('MMSMaxMessageSize')}\n${wrapInt(payload.mmsMaxMessageSize)}\n`;
        apnsArrayContent += `\t\t\t<dict>\n${mmsApn}\t\t\t</dict>\n`;
    }

    content += `${wrapKey('APNs')}\n\t\t<array>\n${apnsArrayContent}\t\t</array>\n`;

    // Attach APN (Separate dictionary)
    if (payload.includeAttachApn) {
        let attachDict = '';
        attachDict += `${wrapKey('AccessPointName')}\n${wrapString(payload.attachApnName)}\n`;
        attachDict += `${wrapKey('AuthenticationType')}\n${wrapString(payload.attachApnAuthenticationType)}\n`;
        if (payload.attachApnUsername) {
             attachDict += `${wrapKey('Username')}\n${wrapString(payload.attachApnUsername)}\n`;
        }
        if (payload.attachApnPassword) {
             attachDict += `${wrapKey('Password')}\n${wrapString(payload.attachApnPassword)}\n`;
        }
        
        content += `${wrapKey('AttachAPN')}\n\t\t<dict>\n${attachDict}\t\t</dict>\n`;
    }

    return content;
};

const generateBluetoothDict = (payload: BluetoothPayload): string => {
    let content = '';
    content += `${wrapKey('allowBluetoothModification')}\n${wrapBool(payload.allowBluetoothModification)}\n`;
    content += `${wrapKey('allowAirDrop')}\n${wrapBool(payload.allowAirDrop)}\n`;
    return content;
};

const generateGlobalHttpProxyDict = (payload: GlobalHttpProxyPayload): string => {
    let content = '';
    content += `${wrapKey('ProxyType')}\n${wrapString(payload.proxyType)}\n`;
    content += `${wrapKey('ProxyCaptiveLoginAllowed')}\n${wrapBool(payload.proxyCaptiveLoginAllowed)}\n`;

    if (payload.proxyType === 'Manual') {
        if (payload.proxyServer) content += `${wrapKey('ProxyServer')}\n${wrapString(payload.proxyServer)}\n`;
        if (payload.proxyPort) content += `${wrapKey('ProxyPort')}\n${wrapInt(payload.proxyPort)}\n`;
        if (payload.proxyUsername) content += `${wrapKey('ProxyUsername')}\n${wrapString(payload.proxyUsername)}\n`;
        if (payload.proxyPassword) content += `${wrapKey('ProxyPassword')}\n${wrapString(payload.proxyPassword)}\n`;
    } else if (payload.proxyType === 'Auto') {
        if (payload.proxyPacUrl) content += `${wrapKey('ProxyPACURL')}\n${wrapString(payload.proxyPacUrl)}\n`;
        content += `${wrapKey('ProxyPACFallbackAllowed')}\n${wrapBool(payload.proxyPacFallbackAllowed)}\n`;
    }

    return content;
};

const generatePayloadDict = (payload: Payload): string => {
  let specifics = '';
  
  switch (payload.type) {
    case PayloadType.WIFI:
      specifics = generateWifiDict(payload as WifiPayload);
      break;
    case PayloadType.WEB_CLIP:
      specifics = generateWebClipDict(payload as WebClipPayload);
      break;
    case PayloadType.EMAIL:
      specifics = generateEmailDict(payload as EmailPayload);
      break;
    case PayloadType.PASSCODE:
      specifics = generatePasscodeDict(payload as PasscodePayload);
      break;
    case PayloadType.RESTRICTIONS:
      specifics = generateRestrictionsDict(payload as RestrictionsPayload);
      break;
    case PayloadType.VPN:
      specifics = generateVpnDict(payload as VpnPayload);
      break;
    case PayloadType.CERTIFICATE:
      specifics = generateCertificateDict(payload as CertificatePayload);
      break;
    case PayloadType.DNS:
      specifics = generateDnsDict(payload as DnsPayload);
      break;
    case PayloadType.CALDAV:
      specifics = generateCalDavDict(payload as CalDavPayload);
      break;
    case PayloadType.SUBSCRIBED_CALENDAR:
      specifics = generateSubscribedCalendarDict(payload as SubscribedCalendarPayload);
      break;
    case PayloadType.LDAP:
      specifics = generateLdapDict(payload as LdapPayload);
      break;
    case PayloadType.CAMERA:
      specifics = generateCameraDict(payload as CameraPayload);
      break;
    case PayloadType.APP_LOCK:
      specifics = generateAppLockDict(payload as AppLockPayload);
      break;
    case PayloadType.MDM:
      specifics = generateMdmDict(payload as MdmPayload);
      break;
    case PayloadType.APP_STORE:
      specifics = generateAppStoreDict(payload as AppStorePayload);
      break;
    case PayloadType.FIND_MY:
      specifics = generateFindMyDict(payload as FindMyPayload);
      break;
    case PayloadType.PHONE:
      specifics = generatePhoneDict(payload as PhonePayload);
      break;
    case PayloadType.SETTINGS_RESTRICTIONS:
      specifics = generateSettingsRestrictionsDict(payload as SettingsRestrictionsPayload);
      break;
    case PayloadType.WEB_CONTENT_FILTER:
      specifics = generateWebContentFilterDict(payload as WebContentFilterPayload);
      break;
    case PayloadType.CELLULAR:
      specifics = generateCellularDict(payload as CellularPayload);
      break;
    case PayloadType.BLUETOOTH:
      specifics = generateBluetoothDict(payload as BluetoothPayload);
      break;
    case PayloadType.GLOBAL_HTTP_PROXY:
      specifics = generateGlobalHttpProxyDict(payload as GlobalHttpProxyPayload);
      break;
  }

  // Determine the correct Apple PayloadType
  let realPayloadType: string = payload.type;
  if (payload.type === PayloadType.CAMERA || 
      payload.type === PayloadType.APP_STORE || 
      payload.type === PayloadType.FIND_MY ||
      payload.type === PayloadType.PHONE ||
      payload.type === PayloadType.SETTINGS_RESTRICTIONS ||
      payload.type === PayloadType.BLUETOOTH) {
      realPayloadType = 'com.apple.applicationaccess';
  }

  // Common Payload Keys
  let common = '';
  common += `${wrapKey('PayloadType')}\n${wrapString(realPayloadType)}\n`;
  common += `${wrapKey('PayloadVersion')}\n${wrapInt(1)}\n`;
  common += `${wrapKey('PayloadIdentifier')}\n${wrapString(payload.identifier)}\n`;
  common += `${wrapKey('PayloadUUID')}\n${wrapString(payload.uuid)}\n`;
  common += `${wrapKey('PayloadDisplayName')}\n${wrapString(payload.displayName)}\n`;

  return `\t<dict>\n${specifics}${common}\t</dict>`;
};

export const generateMobileConfig = (profile: Profile): string => {
  const payloadContent = profile.payloads.map(p => generatePayloadDict(p)).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>PayloadContent</key>
\t<array>
${payloadContent}
\t</array>
\t<key>PayloadDisplayName</key>
\t<string>${escapeXml(profile.metadata.displayName)}</string>
\t<key>PayloadIdentifier</key>
\t<string>${escapeXml(profile.metadata.identifier)}</string>
\t<key>PayloadOrganization</key>
\t<string>${escapeXml(profile.metadata.organization)}</string>
\t<key>PayloadDescription</key>
\t<string>${escapeXml(profile.metadata.description)}</string>
\t<key>PayloadType</key>
\t<string>Configuration</string>
\t<key>PayloadUUID</key>
\t<string>${escapeXml(profile.metadata.uuid)}</string>
\t<key>PayloadVersion</key>
\t<integer>1</integer>
</dict>
</plist>`;

  return xml;
};

export const downloadMobileConfig = (profile: Profile) => {
  const xmlContent = generateMobileConfig(profile);
  const blob = new Blob([xmlContent], { type: 'application/x-apple-aspen-config' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.metadata.displayName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mobileconfig`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};