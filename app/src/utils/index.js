import { NavigationActions } from 'react-navigation'

export const navigate = (routeName, instance, params={}) => {
	const navigateAction = NavigationActions.navigate({
		routeName: routeName,
		params: params,
		
	})

	instance.props.navigation.dispatch(navigateAction)
}