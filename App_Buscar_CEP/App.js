import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert} from 'react-native';

export default function App() {
  const [cep, setCep] = useState("")
  const[endereco, setEndereco] = useState(null)

const buscarCep = () => {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(resposta => resposta.json())
  .then(obj => setEndereco(obj))
  .catch(erro => alert(erro))
}

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Consultar Endereço</Text>
      <Text style={styles.subTitulo}>Digite o CEP</Text>
      <TextInput style={styles.input} value={cep} onChangeText={input => setCep(input)}/>
      <Button title='Buscar' onPress={buscarCep}/>
      {endereco != null && (
        <View>
          <Text>CEP{endereco.cep}</Text>
          </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40, 
    Width: 200, 
    borderColor: 'gray'
  },
  
  Titulo: {
    fontSize: 30,
    color: 'black',
    marginBottom:20

  },

  subTitulo: {
    fontSize: 20,
    color: 'black'
  },

});
