import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { ReactNode, RefObject, useCallback } from "react";
import { StyleSheet } from "react-native";

interface CustomBottomSheetProps extends BottomSheetProps {
  children: ReactNode; // 리액트가 화면에 렌더링할 수 있는 모든 것의 총집합 타입
  bottomSheetModalRef: RefObject<BottomSheetMethods | null>; // RefObject는 ref의 타입
  snapPoints?: string[];
}

function CustomBottomSheet({
  children,
  bottomSheetModalRef,
  snapPoints = ["30%"],
  ...props
}: CustomBottomSheetProps) {
  //바텀시트 뒷배경을 커스텀할 수 있는 컴포넌트. (함수의 재생성을 방지)
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps} // (필수)BottomSheet가 계산한 애니메이션 상태(예: 투명도)를 적용한다.
        pressBehavior='close' // 백드롭(뒷배경)을 탭했을 때 바텀시트가 닫히도록 설정한다. ('none'은 반응 없음)
        appearsOnIndex={0} // 첫 번째 스냅포인트(snapPoints[0])에 도달할 때 백드롭이 나타나기 시작합니다.
        disappearsOnIndex={-1} // 시트가 닫힌 상태(인덱스 -1)가 되면 백드롭이 완전히 사라집니다.
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetModalRef} // 외부에서 expand()/close() 제어할 ref 연결
      index={0} // 초기 상태: 첫 스냅포인트에서 열린 상태(닫힌 시작은 -1)
      snapPoints={snapPoints} // 시트 높이 정의
      style={styles.container}
      enableDynamicSizing={false} // 내용 높이에 따라 자동 리사이즈 비활성(스냅포인트 고정 사용)
      enablePanDownToClose={true} // 아래로 스와이프해 닫기 비활성(UX상 true 권장되는 경우가 많음)
      backdropComponent={renderBackdrop}
      {...props}>
      <BottomSheetView style={styles.sheetContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10, // 겹침 순서(안보임 이슈 대비)
    elevation: 10, // 안드로이드 그림자/겹침 우선순위
  },
  sheetContainer: {
    flex: 1,
  },
});

export default CustomBottomSheet;
