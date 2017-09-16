import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
    ChatSetup,
    Chat,
    RoomSetup,
    JoinSetup
} from './screens'

export const App = StackNavigator({
    Chat: {
        screen: Chat
    },
    Setup: {
        screen: ChatSetup
    },
    Join: {
        screen: JoinSetup
    },
    ChatSetup: {
        screen: ChatSetup
    }

})
