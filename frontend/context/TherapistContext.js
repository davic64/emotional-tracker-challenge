import { createContext, useState } from "react";

export const TherapistContext = createContext();

export const TherapistProvider = ({ children }) => {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(false);

  const setInitialTherapist = (data) => setTherapist(data);

  return (
    <TherapistContext.Provider
      value={{ therapist, setInitialTherapist, loading, setLoading }}
    >
      {children}
    </TherapistContext.Provider>
  );
};
