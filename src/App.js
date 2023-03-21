import React from 'react';
import { Text, View } from 'react-native';
import Home from './screens/Home';
import Temp from './screens/Temp';

export default () => {
    // AsyncStorage.removeItem('authToken')
    return (
        // <View>
        //     <Text>Welcome Screen</Text>
        // </View>
        // <Temp />
        <Home />
    );
};
