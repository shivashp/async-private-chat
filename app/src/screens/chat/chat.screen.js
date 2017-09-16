import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
	StatusBar,
	UIManager,
  Alert,
  BackHandler
} from 'react-native';
import {InteractionManager} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import _ from 'lodash';
import {FontAwesome} from '../../assets/icons';
let moment = require('moment');
import {scale} from '../../utils/scale';

export class Chat extends React.Component {
	constructor(props) {
		super(props);
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		this.state = {
		data: {
					messages: []
				}
		};
	}

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state

    let renderTitle = (roomName) => {
      return (
        <View style={styles.header}>
          <RkText rkType='header5'>{roomName.toUpperCase()}</RkText>
        </View>
      )
    };

    let title = renderTitle(params.roomName);
    return (
      {
        headerTitle: title
      });
  };

	componentDidMount() {
		const { params } = this.props.navigation.state;
		let websocket = params.websocket;
    this.roomName = params.roomName;
    this.nickName = params.nickName;
    websocket.onmessage = this.onMessage;
    InteractionManager.runAfterInteractions(() => {
		    this.refs.list.scrollToEnd();
		});
  }

  componentWillUnmount() {
    const { params } = this.props.navigation.state;
		params.websocket.close();
  }

  onMessage = (e) => {
    let data = JSON.parse(e.data);
    this.updateMessage(this.createMessageObj(data.text, data.time, 'in', data.nickName))
  }

  createMessageObj = (message, time = new Date(), type = 'out', nickName=this.nickName)  => {
    return {
      id: this.state.data.messages.length,
      time: new Date(),
      type,
      text: message,
      nickName
    };
  }

  updateMessage = (obj) => {
    let messages = this.state.data.messages;
  	this.setState({
			data: {
				messages: [
					...messages,
					obj
				]
			},
			message: ''
		})
    this._scroll(true);
  }

	_scroll = () => {
    if (Platform.OS === 'ios') {
      this.refs.list.scrollToEnd();
    } else {
      _.delay(() => this.refs.list.scrollToEnd(), 100);
    }
  }

	_pushMessage() {
    if (!this.state.message)
      return;
    const { params } = this.props.navigation.state
		let websocket = params.websocket
    let msg = this.createMessageObj(this.state.message);
    this.updateMessage(msg);
    websocket.send(JSON.stringify(msg));
  }

		_keyExtractor(post, index) {
	    return post.id;
	  }

	  _renderItem(info) {
	    let inMessage = info.item.type === 'in';
	    let backgroundColor = inMessage
	      ? '#f2f2f2'
	      : '#e5e5e5';
	    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

	    let renderDate = (date) => (
	      <RkText style={styles.time} rkType='secondary7 hintColor'>
	        {moment().add(date, 'seconds').format('LT')}
	      </RkText>);

	    return (
	      <View style={[styles.item, itemStyle]}>
	        {!inMessage && renderDate(info.item.date)}
	        <View style={[styles.balloon, {backgroundColor}]}>
						<RkText rkType='primary2 mediumLine chat' style={styles.nickname}>{info.item.nickName}</RkText>
	          <RkText rkType='primary2 mediumLine chat'>{info.item.text}</RkText>
	        </View>
	        {inMessage && renderDate(info.item.date)}
	      </View>
	    )
	  }

	render() {
    <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
		return (
			<RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
        <FlatList ref='list'
                  extraData={this.state}
                  style={styles.list}
                  data={this.state.data.messages}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}/>
        <View style={styles.footer}>
          <RkTextInput
            onFocus={() => this._scroll(true)}
            onBlur={() => this._scroll(true)}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
						style={{flex:1, backgroundColor: 'white'}}
            rkType='rounded'
            placeholder="Type your message..."/>

          <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle highlight'>
            <Image source={require('../../assets/icons/sendIcon.png')}/>
          </RkButton>
        </View>
      </RkAvoidKeyboard>
		)
	}
}

let styles = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: -25
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',    
    minHeight: 60,
    padding: 10,
    backgroundColor: '#f2f2f2'
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row'
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end'
  },
  balloon: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
		fontSize:10
  },
	nickname: {
		marginBottom:5,
		fontSize:10,
		color: '#097fe5'
	},
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop:(Platform.OS === 'ios')?20:10
  }
}));
