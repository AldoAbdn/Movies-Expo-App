import { Stack, router } from "expo-router";
import { Button } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="movies/index" options={{title:"Movies", headerRight:()=><Button title="Log Out" onPress={(e) => router.replace("/")}/>}}/>
      <Stack.Screen name="movies/[id]" options={{title:"Movie"}}/>
    </Stack>
  );
}
