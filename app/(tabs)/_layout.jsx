import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-1 min-w-[50px] mt-5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-center whitespace-nowrap`}>
        { name }
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#C0C0C0',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'black',
            height: 84, 
          }
        }}
      >
        <Tabs.Screen
         name="profile"
         options={{
          title: 'Profile' ,
          headerShown: false,
          tabBarIcon: ({ color, focused}) => (
            <TabIcon 
            icon={icons.profile}
            color={color}
            name="Profile"
            focused={focused}
            />
          )
         }}
        />
        <Tabs.Screen
         name="track"
         options={{
          title: 'Track' ,
          headerShown: false,
          tabBarIcon: ({ color, focused}) => (
            <TabIcon 
            icon={icons.bookmark}
            color={color}
            name="Track"
            focused={focused}
            />
          )
         }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
