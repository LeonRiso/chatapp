import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { auth, db } from '../firebaseconfig';
import { signInAnonymously } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const signin = async () => {
        try {
            // Query Firestore for the user with the entered username
            const userQuery = query(collection(db, 'users'), where('name', '==', username));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
                // Sign in anonymously and navigate to ChatPage if username exists
                await signInAnonymously(auth);
                const user = userSnapshot.docs[0].data();
                navigation.navigate('ChatPage', { user_id: user.uid });
            } else {
                Alert.alert("Username not found", "Please check the username and try again.");
            }
        } catch (error) {
            console.error("Error logging in with username:", error);
            Alert.alert("Login Error", "An error occurred during login. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />

            <Button title="Sign In" onPress={signin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default Login;
