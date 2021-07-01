import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { fetchUser } from '../redux/actions';
import Feed from './main/Feed';

const Tab = createBottomTabNavigator();

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    if (!currentUser) {
      return (
        <View style={styles.loading}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Feed}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='shield-account' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
