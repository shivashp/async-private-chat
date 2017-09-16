import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import {
	RkButton,
	RkText
} from 'react-native-ui-kitten'

export class ChatSetup extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						Private Chat
					</Text>
				</View>
				<View style={styles.mainContainer}>
					<RkButton rkType='rounded' style={styles.button}>Create Room</RkButton>
					<View style={{margin:7}}  />
					<RkButton rkType='rounded' style={[styles.button, styles.sec]}>Join Room</RkButton>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	titleContainer: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	mainContainer: {
		flex: 9,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100
	},
	button: {
		width: 300,
		height: 50,
		backgroundColor: 'rgba(38,198,218 ,1)'
	},
	sec: {
		backgroundColor: 'rgba(96,125,139 ,1)'
	}
})
