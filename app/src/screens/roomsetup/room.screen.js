import React from 'react'
import {
	View,
	Text,
    StyleSheet,
    LayoutAnimation,
    UIManager
} from 'react-native'
import { RkTextInput, RkButton } from 'react-native-ui-kitten'
import { navigate } from '../../utils'

export class RoomSetup extends React.Component {

    constructor() {
        super()
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state = {
            roomNameError: '',
            nickNameError: ''
        }
        this.nickName = ''
        this.roomName = ''
    }

    onPress = () => {
        let err  = this.handleError()
        
        //no error
        if(!err) {
            navigate(
                'Chat',
                this
            )
        }
    }

    handleError = () => {

        let isNickNameError = this.nickName.length == 0
        let isroomNameError = this.roomName.length == 0
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({
            nickNameError: isNickNameError && 'Please enter the nickname',
            roomNameError: isroomNameError && 'Please enter the room name'
        })
        return isNickNameError || isroomNameError
    }
    onTextInputChange = name => text => {
        this[name] = text.trim()
    }

	render() {
		return (
			<View>
                <Text style={styles.text}>
                    Create Room
                </Text>
				<RkTextInput
					placeholder='Room Name'
                    onChangeText={this.onTextInputChange('roomName')}
				/>
                <View style={styles.errorTextContainer}>
                    <Text>
                        {this.state.roomNameError}
                    </Text>
                </View>
				<RkTextInput
					placeholder='Your Nick name'
                    onChangeText={this.onTextInputChange('nickName')}
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