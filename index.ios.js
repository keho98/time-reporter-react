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
var noReports = [
                  {text: "Hello", time: 10},
                  {text: "Hello", time: 20},
                  {text: "Hello", time: 30},
                  {text: "Hello", time: 40},
                  {text: "Hello", time: 50},
                  {text: "Hello", time: 60},
                  {text: "Hello", time: 70},
                ];

var ReactTimerView = React.createClass({
  render: function() {
    return (
      <ReportsList navigator={this.props.navigator} style={styles.reports}/>
    );
  }
});

var ReportForm = React.createClass({
  onSubmit: function() {
    this.props.navigator.pop();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>New Form</Text>
        <TextInput autoFocus={true} onChangeText={(text) => this.setState({input: text})} style={styles.textInput}/>
        <ReportButton title="Submit" onPress={this.onSubmit}/>
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

  onPress: function() {
    this.props.navigator.push({
      component: ReportForm,
      title: 'New Report',
    });
  },

  fetchData: function() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        var reports;
        if (value == null) {
          reports = noReports;
        } else {
          reports = value;
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
      <ReportButton title="New Report" navigator={this.props.navigator} onPress={this.onPress} />
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
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.row, styles.footer]}>
          <Text style={[styles.center, styles.button]}>
            {this.props.title}
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
    fontSize: 18,
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
    fontSize: 18,
    textAlign: 'center'
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
    marginVertical: 8,
  },

  center: {
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('ReactTimerMobile', () => ReactTimerMobile);
