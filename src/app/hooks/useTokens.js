export const useTokens = () => {

  const saveToken = async (user_id, token) => {
    try {
      const response = await fetch('/api/tokensAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user_id, token }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Succeeded saving token in useTokens.js');
      } else {
        console.log('Failed saving token in useTokens.js');
      }
    } catch (err) {
      console.log('Error in saveToken in useTokens.js');
    }
  };

  const fetchToken = async (user_id) => {
    try {
      const response = await fetch(`/api/tokensAPI?user_id=${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        return data.token;
      } else {
        console.log("Failed retrieving token in useTokens.js");
        return null;
      }
    } catch (err) {
      console.error("Error in getToken in useTokens.js", err);
      return null;
    }
  };

  return { saveToken, fetchToken };
};