import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@/components/TabBarIcon';
import Home from '@/app/(app)/(tabs)/home';
import Profile from '@/app/(app)/(tabs)/profile';
import Schedules from './schedules';

const Tab = createMaterialTopTabNavigator();

export default function MainAppTabs() {
return (
    <Tab.Navigator
        initialRouteName='home'
        tabBarPosition='bottom'
        keyboardDismissMode='on-drag'
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.test}
        screenOptions={{
            tabBarActiveTintColor: '#D6BD98',
            tabBarInactiveTintColor: '#677D6A',
            tabBarLabelStyle: styles.label,
            tabBarStyle: styles.tab,
        }}
    >
        <Tab.Screen name="home" component={Home}
        options={{
            tabBarIndicator: () => null,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
        }}
        />

        <Tab.Screen name="schedules" component={Schedules}
            options={{
            title: 'Schedules',
            tabBarIndicator: () => null,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
            ),
        }}/>

        <Tab.Screen name="profile" component={Profile}
            options={{
            title: 'Profile',
            tabBarIndicator: () => null,
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
        }}/>
    </Tab.Navigator>
);
}

const styles = StyleSheet.create({
    tab: {
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: '#1A3636',
        width: '100%'
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        margin: 0,
    },
    test: {
        backgroundColor: 'rgba(214,189,152,1)',
    },
})
