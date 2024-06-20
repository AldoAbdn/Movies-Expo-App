import { Image, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const movie = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image style={{width:150, height:200}} source={({
        uri:movie.thumbnail
      })}/>
      <Text>{movie.title}</Text>
      <Text>{movie.year}</Text>
      <Text>{movie.genres}</Text>
      <Text>{movie.cast}</Text>
      <Text>{movie.extract}</Text>
    </View>
  );
}