import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Voice from '@react-native-community/voice';

import { Chess } from 'chess.js';

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

const chess = new Chess();


function Home({ props }) {

  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

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
      } else if (checkIfVarExistInSpeech(['move'], speech)) {
        // move pawn from d4 to e5
        let piece;
        if (checkIfVarExistInSpeech(['pawn', 'on'], speech)) {
          piece = 'p';
        } else if (checkIfVarExistInSpeech(['knight', 'night', 'nite'], speech)) {
          piece = 'n';
        } else if (checkIfVarExistInSpeech(['rook'], speech)) {
          piece = 'r';
        } else if (checkIfVarExistInSpeech(['bishop'], speech)) {
          piece = 'b';
        } else if (checkIfVarExistInSpeech(['queen'], speech)) {
          piece = 'q';
        } else if (checkIfVarExistInSpeech(['king'], speech)) {
          piece = 'k';
        } else {
          startRecording();
          return
        }
        speech = speech.split(' ');
        let moveVal = piece + speech[3] + speech[5];

        try {
          chess.move(moveVal);
        } catch (error) {
          console.log("There's some error. Please try again.");
        }
        console.log(chess.fen());
      }
      startRecording();
    }
  }, [result]);

  return (
    <View>

    </View>
  );
}

export default Home;