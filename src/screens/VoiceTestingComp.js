import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';


function VoiceTestingComp({ props }) {

  useEffect(() => {

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])


  // Event Handlers
  onSpeechStart = (e) => {
    console.log('Speech Start: ', e);
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('Speech Recognized: ', e);
  };

  const onSpeechEnd = (e) => {
    console.log('Speech End: ', e);
  }

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log(JSON.stringify(e));
  }

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('Results');
    console.log(e.value);
  }

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('Partial Results');
    console.log(e.value);
  }

  const onSpeechVolumeChanged = (e) => {
    console.log(e);
  }

  const startRecognition = async () => {
    try {
      Voice.start('en-US');
      console.log('Started voice recognition')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Pressable onPress={startRecognition}>
      <Text>
        Voice Test
      </Text>
    </Pressable>
  )
}

export default VoiceTestingComp;