import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from '../Components/ThemeButton'
import ThemeNumberInput from './../Components/ThemeNumberInput';
import DropDownPicker from "react-native-dropdown-picker";

const MaintenanceCalorie = () => {
    const [mass, setMass] = useState();
    const [length, setLength] = useState();
    const [age, setAge] = useState();
    const [sex, setSex] = useState('Male');
    const [active, setActive] = useState('1');
    const [maintenance, setMaintenance] = useState(null);
    const [error, setError] = useState(false);

    const refresh = () => {
        setMass(null);
        setLength(null);
        setAge(null);
        setActive('1');
        setMaintenance(null);
        setError(false);
    }

    const BMRcalculator = () => {
        if (sex === 'Male' && mass && length && age && active) {
            const BMR = 66.47 + (13.75 * mass) + (5.003 * length) - (6.755 * age);
            if (active === '1') {
                setMaintenance(Math.round(1.2 * BMR))
            } else if (active === '2') {
                setMaintenance(Math.round(1.375 * BMR))
            } else if (active === '3') {
                setMaintenance(Math.round(1.55 * BMR))
            } else if (active === '4') {
                setMaintenance(Math.round(1.725 * BMR))
            } else {
                setMaintenance(Math.round(1.9 * BMR))
            }
            console.log(maintenance);

        } else if (sex === 'Female' && mass && length && age && active) {
            const BMR = 655.1 + (9.563 * mass) + (1.85 * length) - (4.676 * age);
            if (active === '1') {
                setMaintenance(Math.round(1.2 * BMR))
            } else if (active === '2') {
                setMaintenance(Math.round(1.375 * BMR))
            } else if (active === '3') {
                setMaintenance(Math.round(1.55 * BMR))
            } else if (active === '4') {
                setMaintenance(Math.round(1.725 * BMR))
            } else {
                setMaintenance(Math.round(1.9 * BMR))
            }
            console.log(maintenance);
            console.log(active)
        } else {
            console.log('Enter the correct data u dumbass')
            setError(true)
        }
    }

    return (

        <View style={styles.childContainer}>
            <Text style={styles.heading}>MAINTENANCE CALORIES CALCULATOR</Text>
            <View style={styles.row}>
                <Text style={styles.title}>Sex:</Text>
                <View style={styles.button}>
                    <RadioButton
                        value="Male"
                        status={sex === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => { setSex('Male'); refresh(); }}
                        color={Colors.primaryColorDark}
                    />
                    <Text>Male</Text>
                </View>
                <View style={styles.button}>
                    <RadioButton
                        value="Female"
                        status={sex === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => { setSex('Female'); refresh(); }}
                        color={Colors.primaryColorDark}
                    />
                    <Text>Female</Text>
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Age:</Text>
                    <ThemeNumberInput value={age} placeholder='Enter Age in Years' onChangeText={(val) => { setAge(val) }} keyboard={'numeric'} />
                </View>
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Weight:</Text>
                    <ThemeNumberInput value={mass} placeholder='Enter Weight in Kgs' onChangeText={(val) => { setMass(val) }} keyboard={'numeric'} />
                </View>
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Height:</Text>
                    <ThemeNumberInput value={length} placeholder='Enter Height in CentiMetres' onChangeText={(val) => { setLength(val) }} keyboard={'numeric'} />
                </View>
            </View>
            <DropDownPicker
                items={[
                    { label: 'No Exercise(0 days)', value: '1' },
                    { label: 'Little Exercise(1-3 days per week)', value: '2' },
                    { label: 'Moderate Exercise(3-5 days a week)', value: '3' },
                    { label: 'Very Active(6-7 days a week)', value: '4' },
                    { label: 'Extra Active(very active + physical job)', value: '5' },
                ]}
                placeholder="Select your catgeory"
                containerStyle={{ height: 40 }}
                dropDownMaxHeight={100}
                style={{ backgroundColor: Colors.gray }}
                dropDownStyle={{ backgroundColor: Colors.gray }}
                onChangeItem={item => setActive(item.value)}
            />
            <View style={{ marginTop: 10, }}>
                {maintenance &&
                    (<View>
                        <Text style={styles.calc}>{`Your Maintenance Calories are ${maintenance} KCal`}</Text>
                        <Text style={styles.tip}>{`For Fat Loss eat between ${maintenance - 500} - ${maintenance - 200} KCal`}</Text>
                        <Text style={styles.tip}>{`For Weight Gain eat between ${maintenance + 200} - ${maintenance + 500} KCal`}</Text>
                    </View>)
                }
            </View>
            <View style={{ paddingTop: 5 }}>
                <ThemeButton title='Calculate' onPress={BMRcalculator} />
            </View>
            {error &&
                <Text style={styles.errorText}>Please Enter Correct Weight or Height or Age</Text>}
        </View>
    )

}
export default MaintenanceCalorie;

const styles = StyleSheet.create({
    container: {
        padding: 7,
        marginBottom: 100,
    },
    errorText: {
        color: Colors.warning,
        textAlign: 'center',
        padding: 3,
        fontSize: 12,
    },
    form: {
        padding: 5,
    },
    calc: {
        textAlign: 'center',
        padding: 5,
        fontWeight:'bold',
    },
    tip: {
        textAlign: 'center',
        padding: 5,
        fontSize:13.5,
    },
    label: {
        paddingTop: 10,
        fontSize: 15,
        color: Colors.charcoalGrey80,
        fontFamily: 'Karla-Regular'
    },
    childContainer: {
        padding: 10,
        borderWidth: .2,
        borderRadius: 5,
        elevation: 1,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Karla-Bold',
        fontSize: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    heading: {
        fontSize: 15,
        textAlign: 'center',
        padding: 15,
    }
})