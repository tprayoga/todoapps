import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  console.log(route.params.item.todo);
  const navigation = useNavigation();
  const Data = {
    id: route.params.item.id,
    todo: route.params.item.todo,
  };

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          todo: textHeading,
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const deleteTodo = () => {
    todoRef
      .doc(route.params.item.id)
      .delete()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (

    <View style={{ flex: 1 }}>
    <View
      style={{
        alignItems: "center",
        backgroundColor:"#143F6B",
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
      }}
    >
      <Text style={styles.title}>Your List</Text>
    </View>
    <View style={styles.card}>
        <Text style={styles.text}>
          {Data.todo}
        </Text>
        <FontAwesome
            name="trash-o"
            color="red"
            onPress={() => deleteTodo()}
            style={styles.todoIcon}
          />
      </View>

    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add new todo"
        placeholderTextColor="#aaaaaa"
        onChangeText={onChangeHeadingText}
        value={textHeading}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={()=>{updateTodo()}}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

    </View>
  </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#143F6B",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 360,
  },
  card:{
    flexDirection: "row",
    alignItems: "center",
    marginTop:40,
    justifyContent:"space-between",
    backgroundColor:"#fff",
    padding:40,
    marginHorizontal:20

  },

  todoIcon:{
    fontSize:30
  },


  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color:"#fff",
    padding:20
},
  text:{
    fontSize:20,
    fontWeight:"bold"
  }
});
