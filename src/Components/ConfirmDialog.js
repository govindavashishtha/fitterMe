import React, { useState } from "react";
import {Alert } from "react-native";

const ConfirmDialog = (title , message , confirmFunction) =>
 Alert.alert(
  title,
  message,
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => {confirmFunction();} }
  ],
  { cancelable: false }
);

export default ConfirmDialog;