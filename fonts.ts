import * as Font from "expo-font"

export const useLocalFonts = () =>
	Font.useFonts({
		AcuminRegular: require("./fonts/AcuminProCond-Bold.ttf"),
	})
