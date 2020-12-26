import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Animated ,Text, TouchableOpacity} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import Colors from "../Constants/Colors";

const { width, height } = Dimensions.get("screen");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FitImage = ({ outerCircleFillPercentage, steps, stepsGoal}) => {
  

  const outerCircleRadius = 18;
  const outerCirclePerimeter = 2 * Math.PI * outerCircleRadius;
  const outerCircleStrokeDashOffset =
    outerCirclePerimeter -
    (outerCirclePerimeter * outerCircleFillPercentage) / 100;

  const [springValue] = useState(new Animated.Value(1.3));

  const [outerCircleInitialFill] = useState(
    new Animated.Value(outerCirclePerimeter)
  );

  const refresh = ()=>{
    Animated.parallel([
        Animated.timing(outerCircleInitialFill, {
          toValue: outerCircleStrokeDashOffset,
          duration: 2000,
        }),
        Animated.spring(springValue, {
          toValue: 1,
          friction: 1,
        })
      ]).start()
  } 

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Svg
          viewBox={`0 0 50 50`}
          width={width}
          height={height / 2.5}
          style={{
            transform: [{ rotateZ: "-90deg" }],
          }}
        >
          <G>
            <Circle
              cx="25"
              cy="25"
              r={outerCircleRadius}
              fill="transparent"
              stroke={Colors.charcoalGrey}
              strokeDasharray="10, 1"
              strokeDashoffset={30}
              strokeWidth={0.7}
            />
            <AnimatedCircle
              cx="25"
              cy="25"
              r={outerCircleRadius}
              fill="transparent"
              stroke={Colors.outerCircle}
              strokeDasharray={outerCirclePerimeter}
              strokeDashoffset={outerCircleInitialFill}
              strokeLinecap={"round"}
            />
          </G>
        </Svg>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Text style={styles.text1}>{steps} / {stepsGoal} </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: width * 0.5,
    backgroundColor:Colors.red,
  },
  text1: {
    fontFamily:'Karla-Bold',
    fontSize:22,
    paddingHorizontal:10,
    color: Colors.primaryColorDark,
  },
});

export default FitImage;
