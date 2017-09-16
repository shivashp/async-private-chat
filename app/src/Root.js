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
    ChatSetup: {
        screen: ChatSetup
    },
    Room: {
        screen: RoomSetup,

    },
    Setup: {
        screen: ChatSetup
    },
    Join: {
        screen: JoinSetup
    }

})
