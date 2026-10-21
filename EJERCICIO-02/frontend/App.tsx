import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Pelicula = {
  id: number;
  titulo: string;
  genero: string;
  anio: number;
  puntuacion: number;
  favorita: boolean;
};

const API_URL = 'http://localhost:3000';

export default function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  useEffect(() => {
    fetch(API_URL + '/peliculas')
      .then((respuesta) => respuesta.json())
      .then((datos: Pelicula[]) => setPeliculas(datos));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎬 CineBox</Text>
      <FlatList
        data={peliculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.movie}>
              {item.titulo}{' '}
              <Text style={styles.heart}>{item.favorita ? '♥' : '♡'}</Text>
            </Text>
            <Text>{item.genero} · {item.anio}</Text>
            <Text>⭐ {Number(item.puntuacion).toFixed(1)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 12 },
  movie: { fontSize: 18, fontWeight: '700' },
  heart: { color: '#E11D48' },
});