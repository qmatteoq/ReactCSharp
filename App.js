/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  Button,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DateTimePicker from '@react-native-community/datetimepicker';

const App: () => React$Node = () => {

  useEffect(() => {

    async function launchProcess() {
      await NativeModules.ServiceChannelModule.launchFullTrustProcess();
    }

    launchProcess();
  }, []);

  const[apiData, setApiData] = useState("");
  const[name, setName] = useState("");
  const[surname, setSurname] = useState("");

  const sendMessage = async() => {
    var message = await NativeModules.ServiceChannelModule.sendMessageWithAppService(name, surname);
    setApiData(message);
  }

  const login = async () => {
    var result = await NativeModules.ReactNativeWindowsMsal.getLoginToken({ "tenant": "test", "clientId": "test"});
    setApiData(result);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <View style={styles.body}>
              <Text>Name:</Text>
              <TextInput onChangeText={text => setName(text)}  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
              <Text>Surname:</Text>
              <TextInput onChangeText={text => setSurname(text)}  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
              <Button title="Send message" onPress={sendMessage} />
              <Text>{apiData}</Text>
              <Button title="Login" onPress={login} />
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                display="default" />              
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
