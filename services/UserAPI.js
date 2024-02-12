export const fetchUserProfile = async (username) => {
    try {
      const response = await fetch(`https://api.kth.se/api/profile/1.1/${username}`);
      if (response.ok) {
        const userJson = await response.json();
        return userJson;
      } else {
        console.error('Failed to fetch user profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };