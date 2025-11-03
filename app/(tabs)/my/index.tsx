import CustomButton from "@/components/CustomButton";
import CustomBottomSheet from "@/components/ui/CustomBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        label='바텀 시트 열기'
        onPress={() => bottomSheetRef.current?.expand()}
      />
      <CustomBottomSheet
        bottomSheetModalRef={bottomSheetRef}
        snapPoints={["30%", "60%"]}>
        <View style={styles.contentContainer}>
          <Button
            title='닫기'
            onPress={() => bottomSheetRef.current?.close()}
          />
          <Text>테스트테스트</Text>
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
