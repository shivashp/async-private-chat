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
    
    Room: {
        screen: RoomSetup,
        
    },
    Chat: {
        screen: Chat
    },
    Join: {
        screen: JoinSetup
    }

})

