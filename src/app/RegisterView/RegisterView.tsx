import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import { useState, useEffect } from 'react';
import { registerUser } from '../../services/registerService';
import { useAppDispatch } from '../../store/store';
import { setUserId } from '../../features/app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';

export default function RegisterView({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username.length > 3) {
      return setButtonDisabled(false);
    } else {
      return setButtonDisabled(true);
    }
  }, [username]);

  const pressHandler = async () => {
    setLoading(true);
    const response = await registerUser(username);
    if (response.success) {
      dispatch(setUserId(response.data.username));
      navigation.navigate('App');
    } else {
      setErrMsg(true);
      setLoading(false);
    }
  };

  return (
    <View style={[styles.mainContainer, loading && styles.halfTransparent]}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your username..."
        onChangeText={setUsername}
      />
      <TouchableOpacity
        onPress={pressHandler}
        disabled={buttonDisabled || loading}
        style={[
          styles.sendButton,
          {
            backgroundColor: buttonDisabled ? colors.gray200 : colors.blue600,
          },
        ]}
      >
        <Text style={styles.sendButtonText}>Register</Text>
      </TouchableOpacity>
      {errMsg && <Text style={styles.errorMessage}>Some errror occured</Text>}
      <Text style={styles.hintText}>
        Type here simple username, at least four signs. Server will use it to
        generate userId for you which will let you send and receive messages.
        When I was building this app, goal was just to build UI. I added some
        more functionality but there is no complex error handling or something
        so if you start to test that, it will probably crash. API server will
        restart automatically but there's no database so your userId will be
        rejected. In short, this is just a preview made for fun so don't expect
        that it will work perfectly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  sendButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  hintText: {
    color: colors.gray200,
  },
  halfTransparent: {
    opacity: 0.5,
  },
});
