import { createContext, useState } from "react";
import Cookie from "js-cookie";
import { addEmotion } from "../lib/emotions.api";

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emotionsSummary, setEmotionsSummary] = useState(null);

  const setInitialEmotions = (data) => setEmotions(data);
  const setInitialEmotionsSummary = (data) => setEmotionsSummary(data);

  const newEmotion = async (emotionData) => {
    setLoading(true);
    const emotion = await addEmotion(emotionData);
    setEmotions((prev) => [emotion, ...prev]);
    setLoading(false);
  };

  const shareWithTherapist = async (emotionIds) => {
    // TODO: Implement sharing with therapist
    console.log("Sharing emotions with therapist:", emotionIds);
  };

  return (
    <EmotionContext.Provider
      value={{
        emotions,
        loading,
        setInitialEmotions,
        newEmotion,
        shareWithTherapist,
        emotionsSummary,
        setInitialEmotionsSummary,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};
