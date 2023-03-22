import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

import Chessboard, { ChessboardRef } from 'react-native-chessboard';

// King
// Queen
// Bishop - camel
// Knight - horse
// Rook - elephant
// Pawn

const checkIfVarExistInSpeech = (varList, speech) => {
  for (let str of varList) {
    if (speech.includes(str))
      return true;
    else
      continue;
  }
  return false;
}


function Home({ props }) {

  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  const chessboardRef = useRef(null);

  let speech;

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };

  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value && e.value[0];
    console.log(e.value);
    setResult((currentResult) => (text));
  };

  const speechPartialResultsHandler = e => {
    // console.log(e.value);
  };

  const speechErrorHandler = async (e) => {
    console.log(e);
    if (e.error.message[0] == '7')
      startRecording();
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      Voice.start('en-Us').then((res) => (console.log(res)));
      console.log("Started Recording")
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    console.log("Stop Recording")
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechPartialResults = speechPartialResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // startRecording();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  useEffect(() => {
    if (!result) {
      console.log('No Result');
      startRecording();
    } else {
      speech = result.toLowerCase();
      if (checkIfVarExistInSpeech(['stop', 'end', 'close'], speech)) {
        // stop here
        Voice.stop();
      } else if (checkIfVarExistInSpeech(['move'], speech)) {
        // move pawn from e2 to e4
        speech = speech.split(' ');

        try {
          chessboardRef.current?.move({ from: speech[3], to: speech[5] });
        } catch (error) {
          console.log("There's some error. Please try again.");
        }
      }
      startRecording();
    }
  }, [result]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Chessboard
        ref={chessboardRef}
        durations={{ move: 500 }}
      />
    </View>
  );
}

export default Home;