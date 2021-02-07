const {default: PushNotification} = require('react-native-push-notification');
export const triggerWaterReminderNotifications = () => {
  for (var i = 9; i <= 21; i = i + 3) {
    var now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(i);
    now.setMinutes(0);
    now.setMilliseconds(0);
    PushNotification.localNotificationSchedule({
      channelId: 'LOCALNOTIFICATIONCHANNEL',
      id: i,
      title: i === 12 || i === 18 ? 'Stay hydrated!!!' : 'uggh...ughhh...aah',
      message:
        i === 12 || i === 18
          ? 'Drink another glass of water and say yes to better digestion'
          : 'One more glass of water will add to your glowing skin',
      allowWhileIdle: true,
      repeatType: 'day',
      date: new Date(now),
    });
  }
};
