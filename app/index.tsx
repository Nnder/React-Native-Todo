import { useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View, ScrollView, SafeAreaView, StatusBar } from "react-native";

type TodoStatus = 'new' | 'pending' | 'complete';

interface Todo {
  title: string;
  task: string;
  time: Date;
  status: TodoStatus;
}

const setTodoColor = (todo: Todo) => {
    if (todo.status === 'new')
      return '#f0f0f0'
    else if (todo.status === 'pending')
      return '#ffcc00'
    else if (todo.status === 'complete')
      return '#4caf50'
  
}

export default function Index() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoTask, setTodoTask] = useState<string>('')

  const createTodo = ()=>{
    if(!todoTask || !todoTitle)
      return Alert.alert('Please fill in all fields');

    setTodos((prev)=>{
      const todo: Todo = {
        status: 'new',
        time: new Date(),
        title: todoTitle,
        task: todoTask,
      }
      return [...prev, todo]
    })

    setTodoTask('')
    setTodoTitle('')

    Alert.alert('Todo created successfully');
  }

  const changeTodoStatus = (todo: Todo) => {
    setTodos((prev) => {
      const index = prev.indexOf(todo);
      if (index === -1) return prev;

      let status: TodoStatus;
      
      if(todo.status === 'new') status = 'pending';
      else if(todo.status === 'pending') status = 'complete';
      else status = 'new';

      return [
       ...prev.slice(0, index),
        { ...todo, status },
       ...prev.slice(index + 1),
      ];
    })

  }



  return (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          width: '100%',
          alignItems: 'center',
        }} >
          <View style={{
            width: "100%",
            padding: 16,
            margin: 8,
          }}>
            <Text>Add todo</Text>
            <TextInput style={{
              borderColor: '#000',
              borderWidth: 1,
              padding: 8,
              marginVertical: 8,
            }}
            value={todoTitle}
            onChangeText={setTodoTitle}
            />
            <TextInput style={{
              borderColor: '#000',
              borderWidth: 1,
              padding: 8,
              marginBottom: 8,
            }} multiline
            value={todoTask}
            onChangeText={setTodoTask}
            />
            <Button title="Add" onPress={createTodo}/>
          </View>

          <View style={{
            width: "100%",
            padding: 16,
            margin: 16,
          }}>
            { todos.length > 0 && <Text style={{
              fontWeight: 'bold',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              Todos {todos.length}
            </Text> }
              {todos.map(todo=>
                <View style={{
                  backgroundColor: setTodoColor(todo),
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#000',
                  marginBottom: 8,
                  padding: 8,
                }} key={todo.time.toString()}>
                  <Text>{todo.title}</Text>
                  <Text>{todo.task}</Text>
                  <Text>{todo.time.toLocaleString()}</Text>
                  <View>
                    <Button title="Change Status" onPress={()=>changeTodoStatus(todo)}/>
                  </View>
                </View>
              )}
          </View>
          
        </ScrollView>
      </SafeAreaView>
  );
}
