import { createContext, useState } from "react";
import { addEmotion, shareEmotions } from "../lib/emotions.api";

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emotionsSummary, setEmotionsSummary] = useState(null);
  const [sharedEmotion, setSharedEmotion] = useState(null);

  const setInitialEmotions = (data) => setEmotions(data);
  const setInitialEmotionsSummary = (data) => setEmotionsSummary(data);

  const newEmotion = async (emotionData) => {
    setLoading(true);
    const emotion = await addEmotion(emotionData);
    setEmotions((prev) => [emotion, ...prev]);
    setLoading(false);
  };

  const shareWithTherapist = async (emotionIds) => {
    setLoading(true);
    await shareEmotions(emotionIds);
    setEmotions((prevEmotions) =>
      prevEmotions.map((emotion) =>
        emotionIds.includes(emotion._id)
          ? { ...emotion, shared: true }
          : emotion
      )
    );
    setLoading(false);
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
        sharedEmotion,
        setSharedEmotion,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};
