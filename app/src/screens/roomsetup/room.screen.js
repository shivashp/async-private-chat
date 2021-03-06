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
        this.websocket = null
    }

    onPress = () => {
        let err  = this.handleError()
        //no error
        if(!err) {
            //creare a socket object and when connected pass to the navigate
            this.websocket = new WebSocket(`ws://182.93.91.147:5000/${this.roomName}`)
            this.websocket.onopen = this.onSocketOpen
        }
    }

		componentWillUnMount() {
			if(this.websocket !== null) {
				this.websocket.close();
			}
		}

    onSocketOpen = () => {
        navigate(
            'Chat',
            this,
            params= {
                nickName: this.nickName,
								roomName: this.roomName,
                websocket: this.websocket
            }
        )
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
        marginLeft: 10,
				marginTop:40,
				marginBottom:20,
				alignSelf: 'center',
    },
    buttonContainer: {

        alignItems: 'center',
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
