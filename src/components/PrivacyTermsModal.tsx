import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { Controller } from 'react-hook-form';
import { Trans } from 'react-i18next';

export default function PrivacyTermsModal({ control }: { control: any }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const openModal = (url: string) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <Controller
        control={control}
        name="privacyPolicy"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity onPress={() => onChange(!value)}>
            <Text style={{ marginRight: 8 }}>{value ? '✅' : '⬜'}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{ flexShrink: 1 }}>
        <Trans
          i18nKey="register.checkbox_agreement"
          components={[
            <Text
              style={{ color: '#ead8d8' }}
              onPress={() =>
                openModal('https://taskcraft.click/auth/terms-service')
              }
              key="0"
            />,
            <Text
              style={{ color: '#ead8d8' }}
              onPress={() =>
                openModal('https://taskcraft.click/auth/privacy-policy')
              }
              key="1"
            />,
          ]}
        />
      </Text>

      <Modal
        isVisible={modalVisible}
        propagateSwipe={true} // ключ для скролу
        style={{ margin: 0, justifyContent: 'center' }}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalHeader}
          >
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <WebView
            source={{ uri: currentUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
            scrollEnabled={true}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#111',
  },
  closeButton: {
    color: '#fff',
    fontSize: 16,
  },
});
