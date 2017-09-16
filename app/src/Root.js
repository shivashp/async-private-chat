import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { 
    ChatSetup,
    Chat,
    RoomSetup,
    JoinSetup
} from './screens'

export const App = StackNavigator({
    ChatSetup: {
        screen: ChatSetup
    },
    
    Setup: {
        screen: ChatSetup,
        
    },
    Chat: {
        screen: Chat
    },
    Join: {
        screen: JoinSetup
    }

})

