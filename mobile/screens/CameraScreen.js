import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { BirdContext } from '../context/BirdContext';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addBird } = useContext(BirdContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    setLoading(true);
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.7 });

    try {
      const res = await fetch('http://localhost:3001/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: photo.base64 })
      });
      const json = await res.json();
      if (json.species) {
        addBird({ species: json.species, photo: photo.uri, date: new Date() });
        alert(`Added ${json.species} to your collection!`);
      } else {
        alert('Unable to identify bird.');
      }
    } catch (e) {
      console.error(e);
      alert('Server error.');
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1 }} ratio="4:3" />
      {loading && <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#fff" />}
      <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff'
  }
});