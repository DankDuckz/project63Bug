import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native'
import React,{Component} from 'react';

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {
      text:'',
      isSearchPressed:false,
      word: '',
      lexicalCategory:'',
      examples:[],
      definiton:''
    }
  }

  getWord = (word) => {
    var keyword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+keyword+".json"
    return fetch(url)
    .then((data) => {
      if (data.status === 200) {
        return data.json()
      }
      else {
        return null
      }
    })
    .then((response) => {
      var responseObject = response

      if (responseObject) {
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordType

        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCategory": lexicalCategory
        })
      }

      else{
        this.setState({
          "word":this.state.text,
          "definiton":"Not found"
        })
      }

    })
  }
    render(){
      return(
        <View>
            <Text style = {styles.header}>Pocket Dictionary</Text>
            <TextInput 
            style = {styles.inputBox}
            onChangeText ={text => {
              this.setState({
                text:text,
                isSearchPressed:false,
                word: 'Loading...',
                lexicalCategory:'',
                examples:[],
                definiton:''
              })
            }}
            value = {this.state.text}
            >
            </TextInput>
            <TouchableOpacity style = {styles.speechButton} onPress = {()=> {
              this.setState({isSearchPressed:true}) 
              this.getWord(this.state.text)
            }}>
              Search
            </TouchableOpacity> 

            <View style = {styles.detailsContainer}>
              <Text>
                Word : {""}
              </Text>
              <Text style = {{fontSize:18}}>
                {this.state.word}
              </Text>
            </View>

            <View style = {styles.detailsContainer}>
              <Text>
                Type : {""}
              </Text>
              <Text style = {{fontSize:18}}>
                {this.state.lexicalCategory}
              </Text>
            </View>

            <View style = {styles.detailsContainer}>
              <Text>
                Definition : {""}
              </Text>
              <Text style = {{fontSize:18}}>
                {this.state.definiton}
              </Text>
            </View>
        </View>

      )
    }
  }

const styles = StyleSheet.create({
    header:{
        backgroundColor:'purple',
        height:"30%",
        width:"100%",
        textAlign:"center",
        fontSize:"350%",
        alignItems:"center"
    },
    inputBox:{
      textAlign:'center',
      borderWidth:5,
      marginTop:"10%",
      height:"80%",
      alignSelf:"center",
      width:"50%",
      fontSize:"300%"
    },
    speechButton:{
      borderWidth:5,
      width:"30%",
      borderRadius:10,
      height:"40%",
      alignSelf:"center",
      textAlign:"center",
      marginTop:"5%",
      justifyContent:"center",
      fontSize:"500%"
    }
})