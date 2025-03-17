import { AuthProvider } from "../context/AuthContext";
import { EmotionProvider } from "../context/EmotionContext";
import { RemindersProvider } from "../context/RemindersContext";
import { TherapistProvider } from "../context/TherapistContext";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <EmotionProvider>
        <RemindersProvider>
          <TherapistProvider>{children}</TherapistProvider>
        </RemindersProvider>
      </EmotionProvider>
    </AuthProvider>
  );
};
