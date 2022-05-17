import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  // fetching or read data from databases
  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { todo } = doc.data();
        todos.push({
          id: doc.id,
          todo,
        });
      });

      setTodos(todos);
    });
  }, []);

  // delete todos from databases


  // add todos
  const addTodo = () => {
    //checking if we have todo
    if (addData && addData.length > 0) {
      // get the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        todo: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          // releasing the keyboard
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          alignItems: "center",
          backgroundColor:"#143F6B",
          borderBottomRightRadius:50,
          borderBottomLeftRadius:50,
        }}
      >
        <Text style={styles.title}>Todo List</Text>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.todo[0].toUpperCase() + item.todo.slice(1)}
                </Text>
              </View>
            </Pressable>

          </View>
        )}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(todo) => setAddData(todo)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"#DDDDDD"
  },
  container: {
    backgroundColor: "#fff",
    padding: 25,
    margin: 5,
    marginTop:40,
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
    fontSize: 20,
    fontWeight:"bold",
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 120,
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
});
