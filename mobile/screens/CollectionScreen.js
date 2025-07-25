import React, { useContext } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { BirdContext } from '../context/BirdContext';

export default function CollectionScreen() {
  const { collection } = useContext(BirdContext);

  if (collection.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#666' }}>You haven't identified any birds yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={collection}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.photo }} style={styles.photo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.species}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  photo: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  item: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16 },
  date: { color: '#666' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});