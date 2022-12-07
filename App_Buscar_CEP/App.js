import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, ScrollView} from 'react-native';
import { Feather } from 'react-native-vector-icons';

export default function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

const buscarCep = () => {

  //Validacao de CEP

  if(cep.replace("-", "").length != 8){
    alert('CEP invalido')
    return 
  }
  
  setCarregando(true)
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(resposta => resposta.json())
  .then(obj =>{
    if(obj.erro){
      setErro("CEP não encontrado!")
      return
    }
    setEndereco(obj)
    setErro("")
  })
  .catch(() => {
    setErro(`Ocorreu um erro ao buscar o endereço pelo CEP: ${cep}`)
  })
  .finally(() => {
    setCarregando(false)
  })
}

  return (
   <ScrollView>
   <View style={styles.container}>
      <Text style={styles.Titulo}>Consultar Endereço</Text>
      <Feather name='map-pin' size={50} color='black' ></Feather>
      <Text style={styles.subTitulo}>Digite o CEP</Text>
      <TextInput style={styles.input} value={cep} onChangeText={input => setCep(input)}/>
      <Button style={styles.button} title='Buscar' onPress={buscarCep}/>
      {carregando && <Text>Carregando....</Text>}
      {erro != "" && <Text style={styles.erro}>{erro}</Text>}
      {endereco != null && !carregando && erro == "" && (
        <View style={styles.enderecoCard}>
          <Text >CEP: {endereco.cep}</Text>
          <Text>Logradouro {endereco.logradouro}</Text>
          <Text>Logradouro: {endereco.logradouro}</Text>
          <Text>Complemento: {endereco.complemento}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.bairro}</Text>
          <Text>UF: {endereco.uf}</Text>
        </View>
        )}
      <StatusBar style="auto" />
    </View> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   
  enderecoCard: { 
    marginVertical: 20, 
    padding: 15, 
    backgroundColor: '#D5DBDB'
  },

  erro: {
    marginVertical:12,
    fontSize: 18,
    color: '#93032e'
  },

  input: { 
    marginVertical: 20, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 10, 
    alignItems: 'center'
  },
  
  Titulo: {
    fontSize: 30,
    color: 'black',
    marginBottom:20,
    backgroundColor: '#BB8FCE',
    paddingTop: 200,
    flexDirection: "row",
    paddingStart: 70,
    paddingEnd: 50,
    paddingBottom: 44,
  },

  subTitulo: {
    marginVertical: 10, 
    fontSize: 20,
    color: 'black'
  },

});
