import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { auth, db } from '../firebaseconfig';
import { signInAnonymously, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
        signInAnonymously(auth)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store user data in Firestore
                setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: name,
                    req: [],
                    realFriend: [],
                    avatar: avatar || 'https://robohash.org/default',
                });

                // Update user's profile
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar || 'https://robohash.org/default',
                });

                // Navigate to Home screen after registration
                navigation.navigate("Home");
            })
            .catch((error) => {
                console.error("Error with anonymous authentication", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter avatar URL (optional)"
                value={avatar}
                onChangeText={(text) => setAvatar(text)}
            />

            {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarPreview} />
            ) : (
                <Image source={{ uri: 'https://robohash.org/default' }} style={styles.avatarPreview} />
            )}

            <Button title="Register" onPress={register} />
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
        marginBottom: 15,
    },
    avatarPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
});

export default Register;
