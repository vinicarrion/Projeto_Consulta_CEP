import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Animation} from 'react-native';
import LottieView from 'lottie-react-native';

export default function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)

const buscarCep = () => {

  //Validacao de CEP

  if(cep.replace("-", "").length != 8){
    alert('CEP invalido')
    return 
  }
  
  setCarregando(true)
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(resposta => resposta.json())
  .then(obj => setEndereco(obj))
  .catch(() => alert(`Nao encontrado o CEP ${cep}`))
  .finally(() => setCarregando(false))
}

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Consultar Endereço</Text>
      <Text style={styles.subTitulo}>Digite o CEP</Text>
      <TextInput style={styles.input} value={cep} onChangeText={input => setCep(input)}/>
      <Button style={styles.button} title='Buscar' onPress={buscarCep}/>
      {carregando && <LottieView source={require('./animations/loading.json')} style={{width: 40, height: 200}} loop={false} ref={Animation}/>}
      {endereco != null && (
        <View>      
          <Text>CEP: {endereco.cep}</Text>
          <Text>Logradouro: {endereco.logradouro}</Text>
          <Text>Complemento: {endereco.complemento}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.bairro}</Text>
          <Text>UF: {endereco.uf}</Text>
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
