import { TouchableOpacity, FlatList, View, Image, Text, TextInput, Dimensions } from "react-native";
import { useRouter } from 'expo-router';
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {MOVIE_URL} from 'react-native-dotenv';

export default function Index() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [count, setCount] = useState(0);
  
  // Fetch Movie JSON
  useEffect(() => {
    // fetch(MOVIE_URL)
    // .then(response => response.json())
    // .then(json => {
    //   json.sort((a,b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0));
    //   setMovies(json)
    //   setFiltered(json);
    //   setCount(json.length);
    // })
    // .catch(err => console.log(err));
    const data = require("../../assets/json/movies.json");
    data.sort((a,b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0));
    setMovies(data);
    setFiltered(data);
    setCount(data.length);
  }, [])

  return (
    <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap:10
        }}
      >
      <TextInput style={{borderWidth:1,borderColor:"black",borderRadius:5,height:30}} placeholder="Search" value={search} onChangeText={(text) => {
        const searchToLower = text.toLocaleLowerCase();
        const filteredMovies = movies.filter((movie) => {
          if("extract" in movie) // Check if extract exists as it doesn't in some titles
            return movie.title.toLowerCase().includes(searchToLower) || movie.extract.toLowerCase().includes(searchToLower)
          else
            return movie.title.toLowerCase().includes(searchToLower);
        });
        setFiltered(filteredMovies);
        setCount(filteredMovies.length);
        setSearch(text);
      }}/>
      <Picker selectedValue={sort} onValueChange={((value, index) => {
        setSort(value);
        filtered.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0));
        setFiltered(filtered);
      })}>
        <Picker.Item label="Title" value="title"/>
        <Picker.Item label="Year" value="year"/>
      </Picker>
      <Text>{count}</Text>
      <FlatList data={filtered} renderItem={({item:movie}) => 
        <TouchableOpacity style={{
          borderWidth:2,
          borderColor:"black", 
          margin:10, 
          padding:10,
          borderRadius:10}} onPress={(e) => router.push({pathname:`/movies/${movie.href}`, params:movie})}>
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width:Dimensions.get("window").width * 0.9,
            flexDirection:"row"
          }}>
            <View style={{
              flex:1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection:"column",
              gap:10
            }}>
              <Text style={{fontWeight: "bold"}}>{movie.title} . {movie.year}</Text>
              <Text numberOfLines={3} ellipsizeMode="tail">{movie.extract}</Text>
            </View>
            <Image style={{width:150, height:200}} source={({
              uri:movie.thumbnail
            })}/>
          </View>
        </TouchableOpacity>
      }/>
    </View>
  );
}
