import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function App() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const modal2Ref = useRef<BottomSheetModal>(null);
  const snapPoints = ["50%", "50%"];

  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [Modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (bottomModalOpen) {
          bottomSheetRef.current?.close();
          return true;
        }

        if (Modal2Open) {
          modal2Ref.current?.close();
          return true;
        }

        return false;
      }
    );

    return () => backHandler.remove();
  }, [Modal2Open, bottomModalOpen]);

  const bottomModals = (
    <>
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onDismiss={() => {
          setBottomModalOpen(false);
        }}
      >
        <View style={styles.bottomSheet}>
          <TextInput placeholder="Some Text" style={styles.text} />
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={modal2Ref}
        onDismiss={() => {
          setModal2Open(false);
        }}
      >
        <View style={styles.bottomSheet}>
          <TextInput placeholder="modal 2 Text" style={styles.text} />
        </View>
      </BottomSheetModal>
    </>
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.screen}>
        {bottomModals}
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.present();
            setBottomModalOpen(true);
          }}
        >
          <Text style={styles.text}>Open Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            modal2Ref.current?.present();
            setModal2Open(true);
          }}
        >
          <Text style={styles.text}>Open Modal 2</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
  },
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  bottomSheet: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
});
