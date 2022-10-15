import { useEffect } from 'react';
import { MoteCamAdviceMessage } from '../src/components/organisms/MoteCamMessage';
//import { useLocale } from "../hooks/useLocale";

const useSpeech = (messages: MoteCamAdviceMessage[]) => {
  //const { languageCode } = useLocale()

  const languageCode = 'ko-KR';

  useEffect(() => {
    const candidates = messages.filter((msg) => {
      return !msg.fulfilled;
    });
    if (candidates.length > 0) {
      const message = selectMessage(candidates);
      // console.log(`Selected Message: ${message}`);
      if (message) {
        speakAdvice(message);
      }
    }
  }, [messages]);

  const selectMessage = (msgs: MoteCamAdviceMessage[]): string => {
    const idx = Math.floor(Math.random() * msgs.length);
    return msgs[idx].message;
  };

  const speakAdvice = (message: string) => {
    if (
      message !== 'undefined' &&
      typeof speechSynthesis !== 'undefined' &&
      speechSynthesis.speaking === false
    ) {
      speechSynthesis.cancel(); // for chrome bugs
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = message;
      utterance.lang = languageCode;
      speechSynthesis.speak(utterance);
    }
  };
};

const speakMessage = (message: string, langCode: string) => {
  speechSynthesis.cancel(); // for chrome bugs
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = message;
  utterance.lang = langCode;
  speechSynthesis.speak(utterance);
};

export { useSpeech, speakMessage };
