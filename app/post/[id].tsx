import AuthRoute from "@/components/AuthRoute";
import FeedItem from "@/components/FeedItem";
import { useGetPost } from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));

  if (isError || isPending) {
    return <Text>로딩중</Text>;
  }

  return (
    <AuthRoute>
      <View style={styles.container}>
        <ScrollView>
          <FeedItem
            post={post}
            isDetail={true}
          />
        </ScrollView>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
