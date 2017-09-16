import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import {
	RkTextInput
} from 'react-native-ui-kitten'

export class JoinSetup extends React.Component {

	render() {
		return (
			<View>
				<RkTextInput
					placeholder='Room Name'
				/>
				<RkTextInput
					placeholder='Room Name'
				/>
			</View>
		)
	}
}
