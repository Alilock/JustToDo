import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, Text, Alert, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgMoon from './src/assets/icons/Moon'
import { Vector, Vectorwhite } from './src/assets/icons'
import TaskForm from './src/components/TaskForm';


const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current
  const moveAnim = useRef(new Animated.Value(200)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()


    Animated.timing(moveAnim, {
      toValue: 600,
      delay: 1000,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const value = await AsyncStorage.getItem('darkMode');
        if (value !== null) {
          setDarkMode(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDarkMode();
    fadeIn()
  }, [])

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const saveDarkMode = async () => {
      try {
        await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      } catch (error) {
        console.log(error);
      }
    };
    saveDarkMode();
  }
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(true);
  const handleAddTask = () => {
    setIsTaskFormVisible(true);
  };
  const handleCloseTaskForm = () => {
    setIsTaskFormVisible(false);
  };


  return (
    <BottomSheetModalProvider>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleDarkMode}>
            <SvgMoon width={30} height={30} fill={darkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            {
              darkMode ? <Vectorwhite width={30} height={30} /> :
                <Vector width={30} height={30} />
            }
          </TouchableOpacity>
        </View>
        <Animated.View style={{ opacity: fadeAnim, position: "absolute", transform: [{ translateY: moveAnim }] }} >
          <Image source={require('./src/assets/headrashad.jpeg')} />
        </Animated.View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
          <Text style={{ color: darkMode ? "white" : "black", textAlign: "center", fontSize: 25, fontFamily: "OpenSans-Light" }}>Add a new task</Text>
        </TouchableOpacity>

        <TaskForm isVisible={isTaskFormVisible} onClose={handleCloseTaskForm} />
      </SafeAreaView>
    </BottomSheetModalProvider >
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 25
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",

  }
}) 