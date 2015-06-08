/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ListView,
  TouchableOpacity,
  NavigatorIOS,
} = React;


var STORAGE_KEY = 'MomentsStorage:key';

var ReactTimerView = React.createClass({
  render: function() {
    return (
      <ReportsList navigator={this.props.navigator} style={styles.reports}/>
    );
  }
});

var ReportForm = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>New Form</Text>
        <TextInput style={styles.textInput}/>
      </View>
    )
  }
});

var ReportsList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  showError: function() {

  },

  fetchData: function() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        var reports;
        if (value == null) {
          reports = [];
        } else {
          reports = [{text: "Hello", time: 20}, {text: "Hello",time: 40}];
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(reports),
          loaded: true,
        });
      })
      .catch((error) => {
        this.showError(error);
      })
      .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading reports...
        </Text>
      </View>
    );
  },

  renderReport: function(report, i) {
    return (
      <View key={i} style={styles.row}>
        <Text style={styles.text}>
          {report.time}
        </Text>
      </View>
    );
  },

  renderFooter: function() {
    return (
      <ReportButton navigator={this.props.navigator} />
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderReport}
        renderFooter={this.renderFooter}
        style={styles.listView}
      />
    );
  }
});

var ReportButton = React.createClass({
  _onPressButton: function() {
    this.props.navigator.push({
      component: ReportForm,
      title: 'New Report',
    });
  },
  render: function() {
    return (
      <TouchableOpacity style={styles.footer} onPress={this._onPressButton}>
        <View style={styles.row}>
          <Text>
            New Item
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});


var ReactTimerMobile = React.createClass({
  render: function() {
    return (
      <NavigatorIOS style={styles.root} initialRoute={{
        component: ReactTimerView,
        title: 'React Timer',
      }}/>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },

  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  text: {
    fontSize: 24,
    textAlign: 'left',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  reports: {
    flex:1
  },
  button: {
    fontSize: 18
  },
  root: {
    flex:1,
  },
  label: {
    textAlign: 'left',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },

  footer: {
    alignSelf: 'flex-end'
  },
});

AppRegistry.registerComponent('ReactTimerMobile', () => ReactTimerMobile);
