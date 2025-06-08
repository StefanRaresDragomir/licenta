import React, { useState, useEffect } from 'react';
import {
  View, TextInput, FlatList, Text, TouchableOpacity,
  StyleSheet, Image, Modal as RNModal
} from 'react-native';
import Modal from 'react-native-modal';
import { Camera } from 'expo-camera';
import { searchFoodsByBarcode, searchFoods } from '../lib/appwrite'; 
import { useGlobalContext } from '../context/GlobalProvider';
import icons from '../constants/icons.js';

const FoodSearchModal = ({ visible, onClose, onCreateFood, onSelectFood, recentFoods }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);

  const handleSearch = async (text) => {
    setSearch(text);
    if (text.trim().length === 0) {
      setResults([]);
      return;
    }

    const found = await searchFoods(text);
    setResults(found);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setCameraVisible(false);
    const result = await searchFoodsByBarcode(data);
    if (result && result.length > 0) {
      setResults(result);
      setSearch('');
    } else {
      setResults([]);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      backdropTransitionOutTiming={0}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search food..."
            value={search}
            onChangeText={handleSearch}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setCameraVisible(true)} style={styles.scanIconContainer}>
            <Image source={require('../assets/icons/barcode.png')} style={styles.scanIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onCreateFood} style={styles.createButton}>
          <Text style={styles.createButtonText}>Create new food</Text>
        </TouchableOpacity>

        <FlatList
          data={search ? results : recentFoods}
          keyExtractor={(item, index) => item.$id || `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectFood(item)} style={styles.item}>
              <Text style={{ fontWeight: '500' }}>{item.name}</Text>
              <Text style={{ color: '#6b7280' }}>{item.calories} kcal / 100g</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>

        
        <RNModal visible={cameraVisible} animationType="slide">
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={{ flex: 1 }}
            barCodeScannerSettings={{
            barCodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'], 
          }}
          />
          <TouchableOpacity onPress={() => setCameraVisible(false)} style={styles.closeCamera}>
            <Text style={{ color: 'white', fontSize: 18 }}>Close Camera</Text>
          </TouchableOpacity>
        </RNModal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    height: '55%',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    marginRight: 8,
  },
  scanIconContainer: {
    padding: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  scanIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  createButton: {
    backgroundColor: '#C0C0C0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  closeCamera: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    padding: 12,
    borderRadius: 10,
  },
});

export default FoodSearchModal;
