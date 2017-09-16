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
import { NavigationActions } from 'react-navigation'
import { navigate } from '../../utils'

export class ChatSetup extends React.Component {

	static CREATE_ROOM = 'CREATE_ROOM'
	static JOIN_ROOM = 'JOIN_ROOM'

	onPress = (action) => {
		switch (action) {
			case ChatSetup.CREATE_ROOM:

				navigate('Room', this)
				break;

			case ChatSetup.JOIN_ROOM:
				navigate('Join', this)
				break;

			default:
				break;
		}
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						Private Chat
					</Text>
				</View>
				<View style={styles.mainContainer}>
					<RkButton rkType='rounded'
						style={styles.button}
						onPress={() => this.onPress(ChatSetup.CREATE_ROOM)}
					>
						Create Room
					</RkButton>
					<View style={{margin:7}}  />
					<RkButton rkType='rounded'
						style={[styles.button, styles.sec]}
						onPress={() => this.onPress(ChatSetup.JOIN_ROOM)}
					>
						Join Room
					</RkButton>
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
		fontSize: 40,
		fontWeight: '300',

	},
	titleContainer: {
		flex: 2,
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
