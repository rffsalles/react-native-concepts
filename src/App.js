import React, { useEffect,useState } from "react";
import styles from './styles';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";
 
export default function App() {
  const [repositories,setRepositories] = useState([]);
  useEffect(()=>{
    api.get('repositories').then(response =>{
        setRepositories(response.data);
    })
  },[]);  


  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`).then(res =>{
      console.log(res.data);
      console.log('dup');
      newRepositories = [...repositories];
      repositoryIndex = newRepositories.findIndex(repository => repository.id === id);      
      const newRepository = {
        id:repositories[repositoryIndex].id,
        title:repositories[repositoryIndex].title,
        techs:repositories[repositoryIndex].techs,
        url:repositories[repositoryIndex].url,
        likes:res.data.likes
      }
      newRepositories[repositoryIndex] = newRepository;
      setRepositories(newRepositories);
    })


  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
          <FlatList                
                  data={repositories}
                  keyExtractor={repository => repository.id}
                  renderItem={({item}) => (
                  <>
                  <Text style={styles.repository}>{item.title}</Text>
                  <View style={styles.techsContainer}>
                  <Text style={styles.tech}>
                    {item.url}
                  </Text>
                  <Text style={styles.tech}>
                    {item.techs}
                  </Text>
                  <View style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                      testID={`repository-likes-${item.id}`}
                    >
                      {item.likes === 1?'1 curtida':`${item.likes} curtidas`}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.6} 
                    style={styles.button}
                    onPress={() => handleLikeRepository(item.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${item.id}`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>                  
                </View>
                  </>
                  )}
          />
      </SafeAreaView>
    </>
  );
}


