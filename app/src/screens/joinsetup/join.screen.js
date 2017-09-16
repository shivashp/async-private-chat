import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	LayoutAnimation
} from 'react-native'
import {
	RkTextInput,
	RkButton
} from 'react-native-ui-kitten'
import { navigate } from '../../utils'

export class JoinSetup extends React.Component {

	constructor() {
        super()
        this.state = {
            tokenNameError: '',
            nickNameError: ''
        }
        this.tokenName = ''
        this.nickName = ''
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

        let istokenNameError = this.tokenName.length == 0
        let isnickNameError = this.nickName.length == 0
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.setState({
            tokenNameError: istokenNameError && 'Please enter the token',
            nickNameError: isnickNameError && 'Please enter the nickname'
        })
        return istokenNameError || isnickNameError
	}
	
    onTextInputChange = name => text => {
        this[name] = text.trim()
    }

	render() {
		return (
			<View>
                <Text style={styles.text}>
                    Join Room
                </Text>
				<RkTextInput
					placeholder='Token'
                    onChangeText={this.onTextInputChange('tokenName')}
				/>
                <View style={styles.errorTextContainer}>
                    <Text>
                        {this.state.tokenNameError}
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
