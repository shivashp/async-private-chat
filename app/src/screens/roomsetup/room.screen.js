import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import { RkTextInput, RkButton } from 'react-native-ui-kitten'

export class RoomSetup extends React.Component {

    constructor() {
        super()
        this.state = {
            roomNameError: '',
            nickNameError: ''
        }
        this.nickName = ''
    }

    onPress = () => {
        alert(' hi ther')
    }
    onTextInputChange = name => text => {
        alert(name + text)
    }

	render() {
		return (
			<View>
                <Text style={styles.text}>
                    Create Room
                </Text>
				<RkTextInput
					placeholder='Room Name'
                    onChangeText={this.onTextInputChange('roomname')}
				/>
                <View style={styles.errorTextContainer}>
                    <Text>
                        {this.state.roomNameError}
                    </Text>
                </View>
				<RkTextInput
					placeholder='Your Nick name'
                    onChangeText={this.onTextInputChange('nickname')}
				/>
                <View style={styles.errorTextContainer}>
                    <Text>
                        {this.state.nickNameError}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RkButton rkType='rounded'
                            style={styles.button}
                            onPress={this.onPress}
                    >
                        Join Room
                    </RkButton>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: '300',
        marginLeft: 10
    },
    buttonContainer: {
        
        alignItems: 'flex-end',
        marginRight: 20,
        marginTop: 30
    },
    button: {
        width: 200,
		height: 40,
		backgroundColor: 'rgba(38,198,218 ,1)'
    },
    errorTextContainer: {
        alignItems: 'flex-end',
        marginRight: 10
    }
})