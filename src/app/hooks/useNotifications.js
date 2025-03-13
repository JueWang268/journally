export const useNotifications = () => {

  const sendNotification = async (token) => {
    try {
      const response = await fetch('/api/notificationsAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, title: "Test Notification", message: "df", link: "http://localhost:3000/dashboard" }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Succeeded running fetch for notificationsAPI');
      } else {
        console.log('Failed running fetch for notificationsAPI');
      }
    } catch (err) {
      console.log('Error in sendNotification in useNotifications.js');
    }
  };

  return { sendNotification };
};