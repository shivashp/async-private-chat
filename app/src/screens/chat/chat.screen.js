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
  Alert
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
					messages: [
						{
							id: 0,
							text: "Hello User",
							time: new Date(),
							type: 'out'
						},
						{
							id: 1,
							text: "How are you? ",
							time: new Date(),
							type: 'out'
						},
						{
							id: 2,
							text: "How are you? ",
							time: new Date(),
							type: 'out'
						},
						{
							id: 3,
							text: "How are you? ",
							time: new Date(),
							type: 'out'
						},
						{
							id: 4,
							text: "How are you? ",
							time: new Date(),
							type: 'out'
						},
						{
							id: 5,
							text: "How are you? ",
							time: new Date(),
							type: 'in'
						},
			{
							id: 6,
							text: "I am good ",
							time: new Date(),
							type: 'in'
						},
			{
							id: 7,
							text: "Tell me more",
							time: new Date(),
							type: 'in'
						},
					]
				}
		};
	}

	componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refs.list.scrollToEnd();
    });
  }
	_scroll() {
    if (Platform.OS === 'ios') {
      this.refs.list.scrollToEnd();
    } else {
      _.delay(() => this.refs.list.scrollToEnd(), 100);
    }
  }

	_pushMessage() {
    if (!this.state.message)
      return;
    let msg = {
      id: this.state.data.messages.length,
      time: new Date(),
      type: 'out',
      text: this.state.message
    };
    let messages = this.state.data.messages;
  	this.setState({
			data: {
				messages: [
					...messages,
					msg
				]
			},
			message: ''
		})

    this._scroll(true);
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
						<RkText rkType='primary2 mediumLine chat' style={styles.nickname}>Shiva pandey</RkText>
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
          <RkButton style={styles.plus} rkType='clear'>
            <RkText rkType='awesome secondaryColor'>+</RkText>
          </RkButton>

          <RkTextInput
            onFocus={() => this._scroll(true)}
            onBlur={() => this._scroll(true)}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
						style={{flex:1}}
            rkType='row sticker'
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
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 17
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter
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
  }
}));
