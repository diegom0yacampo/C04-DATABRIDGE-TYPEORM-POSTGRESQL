import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Mascota = {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  ciudad: string;
  nivelEnergia: string;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL + '/mascotas/1')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((dato: Mascota) => setMascota(dato))
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <Text style={styles.mensaje}>Error: {error}</Text>;
  if (!mascota) return <Text style={styles.mensaje}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{mascota.nombre}</Text>
        <Text>🐶 {mascota.raza}</Text>
        <Text>{mascota.edad} años · {mascota.ciudad}</Text>
        <Text style={styles.energia}>⚡ Nivel de energía: {mascota.nivelEnergia}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#EEF6FF' },
  card: { backgroundColor: '#FFF', padding: 28, borderRadius: 24, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800' },
  energia: { marginTop: 12, fontWeight: '700', color: '#B45309' },
  mensaje: { marginTop: 80, textAlign: 'center' },
});