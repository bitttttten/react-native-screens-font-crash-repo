import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { AppLoading } from "expo"
import React, { Suspense } from "react"
import { Text } from "react-native"
import { AppearanceProvider } from "react-native-appearance"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { useLocalFonts } from "./fonts"

enableScreens()

const ENABLE_CRASH = false

const App = () => {
	const [hasFonts, fontError] = useLocalFonts()

	if (fontError) {
		console.error(`Error loading fonts: ${fontError}`)
	}

	if (!hasFonts) {
		return null
	}

	return (
		<SafeAreaProvider>
			<Suspense fallback={<AppLoading />}>
				<NavigationContainer>
					<AppearanceProvider>
						{ENABLE_CRASH ? (
							<Tabs />
						) : (
							<SafeAreaView>
								<Text
									style={{
										fontFamily: "AcuminRegular",
										textAlign: `center`,
										marginTop: 20,
										fontSize: 30,
									}}
								>
									This should be Acumin Regular
								</Text>
							</SafeAreaView>
						)}
					</AppearanceProvider>
				</NavigationContainer>
			</Suspense>
		</SafeAreaProvider>
	)
}

const Tab = createBottomTabNavigator()

export const Tabs: React.FC = () => {
	return (
		<Tab.Navigator
			initialRouteName="HomeScreen"
			backBehavior="initialRoute"
			tabBarOptions={{
				inactiveTintColor: `white`,
				inactiveBackgroundColor: `green`,
				activeBackgroundColor: `green`,
				activeTintColor: `darkgreen`,
				style: {
					backgroundColor: `green`,
					shadowColor: "#000",
					shadowOpacity: 0.5,
					shadowRadius: 5,
					shadowOffset: {
						width: 5,
						height: 5,
					},
					elevation: 5,
					top: 0,
				},
				labelStyle: {
					fontFamily: `AcuminRegular`,
					fontSize: 14,
					lineHeight: 14,
					marginTop: 0,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: `home`,
				}}
			/>
		</Tab.Navigator>
	)
}

const Stack = createNativeStackNavigator()

const HomeScreen = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: `red`,
				},
				headerTitleStyle: {
					// this is the problematic line!
					fontFamily: `AcuminRegular`,
				},
				headerTintColor: `yellow`,
			}}
		>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					headerTitle: `the home screen`,
				}}
			/>
		</Stack.Navigator>
	)
}

const Home = () => {
	return <Text>Home</Text>
}

export default App
