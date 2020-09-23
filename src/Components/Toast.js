import Toast from 'react-native-tiny-toast';

const toast = Text => {
  Toast.show(Text, {
    containerStyle: {},
    textStyle: {fontSize: 10},
  });
};
export default toast;