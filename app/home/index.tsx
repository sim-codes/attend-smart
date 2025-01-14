import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@/components/TabBarIcon';
import Login from '../(auth)/login';
import Signup from '../(auth)/signup';


const Tab = createMaterialTopTabNavigator();

export default function Index() {
return (
    <Tab.Navigator
        initialRouteName='Home'
        tabBarPosition='bottom'
        keyboardDismissMode='on-drag'
        screenOptions={{
            tabBarActiveTintColor: '#D6BD98',
            tabBarInactiveTintColor: '#677D6A',
            tabBarLabelStyle: styles.label,
            tabBarStyle: styles.tab,
        }}
    >
        <Tab.Screen name="Home" component={Login}
        options={{
            tabBarIndicator: () => null,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
        }}
        />

        <Tab.Screen name="Resources" component={Signup}
            options={{
            tabBarIndicator: () => null,
            title: 'Resources',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'file-tray' : 'file-tray-outline'} color={color} />
            ),
            }}
        />
    </Tab.Navigator>
);
}

const styles = StyleSheet.create({
    tab: {
        margin: 'auto',
        backgroundColor: '#1A3636',
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        margin: 0,
        fontFamily: 'Nunito_400Regular',
    }
})
