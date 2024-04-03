import { useState } from "react";

const usePostProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postProducts = async (url, values) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, values);
      // Handle the successful response here if needed
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postProducts };
};

export default usePostProducts;
