import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Restaurante = {
  id: number;
  nombre: string;
  tipo: string;
  ciudad: string;
  puntuacion: string;
  precioMedio: number;
};

const API_URL = 'http://192.168.104.66:3000';

export default function App() {
  const [nombre,setNombre]=useState('');
  const [tipo,setTipo]=useState('');
  const [ciudad,setCiudad]=useState('');
  const [precioMedio,setPrecioMedio]=useState('');
  const [mensaje,setMensaje]=useState('');
  const [guardado,setGuardado]=useState<Restaurante | null>(null);

  async function guardar() {
    try {
      const respuesta=await fetch(API_URL+'/restaurantes',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          nombre,
          tipo,
          ciudad,
          puntuacion:9,
          precioMedio:Number(precioMedio),
        }),
      });

      if(!respuesta.ok){
        setMensaje('Error al guardar ('+respuesta.status+')');
        return;
      }

      const creado:Restaurante=await respuesta.json();
      setGuardado(creado);
      setMensaje('Restaurante guardado ✓');
    } catch {
      setMensaje('No se pudo conectar con la API');
    }
  }

  return <SafeAreaView style={styles.container}>
    <Text style={styles.title}>🍜 Food Spots</Text>
    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
    <TextInput style={styles.input} placeholder="Tipo" value={tipo} onChangeText={setTipo}/>
    <TextInput style={styles.input} placeholder="Ciudad" value={ciudad} onChangeText={setCiudad}/>
    <TextInput style={styles.input} placeholder="Precio medio (€)" value={precioMedio} onChangeText={setPrecioMedio} keyboardType="numeric"/>
    <Button title="Guardar restaurante" onPress={guardar}/>
    <Text style={styles.mensaje}>{mensaje}</Text>

    {guardado && (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍜 {guardado.nombre}</Text>
        <Text>{guardado.tipo} · {guardado.ciudad}</Text>
        <Text style={styles.precio}>Precio medio: {guardado.precioMedio} €</Text>
      </View>
    )}
  </SafeAreaView>;
}

const styles=StyleSheet.create({
 container:{flex:1,padding:24,backgroundColor:'#FFF7ED'},
 title:{fontSize:30,fontWeight:'800',marginBottom:20},
 input:{backgroundColor:'#FFF',padding:14,borderRadius:12,marginBottom:12},
 mensaje:{marginTop:12},
 card:{backgroundColor:'#FFF',padding:20,borderRadius:16,marginTop:16},
 cardTitle:{fontSize:20,fontWeight:'800'},
 precio:{marginTop:8,fontWeight:'700',color:'#C2410C'},
});