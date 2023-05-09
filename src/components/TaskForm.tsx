import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const TaskForm = ({ isVisible, onClose }: any) => {
    const snapPoints = React.useMemo(() => ['25%', '50%'], []);

    return (
        <BottomSheetModal
            index={0}
            snapPoints={snapPoints}
            onChange={onClose}
            backdropComponent={null}
            style={styles.bottomSheet}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Add a new task</Text>
                <TextInput style={styles.input} placeholder="Task name" />
                <TextInput style={styles.input} placeholder="Task description" />
            </View>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default TaskForm;