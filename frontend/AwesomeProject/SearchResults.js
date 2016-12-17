  'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  rowContainer: {
    flexDirection: 'row',
    marginTop: 13,
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 13
  },

  dateContainer: {
    flex:2,
    borderColor: '#444444',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 1,
    backgroundColor: '#444444',
    marginRight: 5
  },

  dateText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20
  },
  timeContainer: {
    flex:3,
    borderColor: '#D7262D',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 3,
    padding: 10,
    marginRight: 5
  },
   timeText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444444',
    fontSize: 15
  },

  locationContainer:{
    flex:3,
    borderColor: '#D7262D',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 3,
    padding: 10,
    marginRight: 5
  },

   locationText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444444',
    fontSize: 15
  },

  sugarContainer: {
    flex:2,
    backgroundColor: "#48BBEC",
    borderColor: '#48BBEC',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10
  },
   sugarText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20
  },
});

class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.dateTime !== r2.dateTime});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.entries)
    };
  }
 
  renderRow(rowData, sectionID, rowID) {

  	var t = Date.parse(rowData.dateTime)
  	var d = new Date(t)

  	var day = d.getDate()
  	var month = d.getMonth() + 1

    var time = d.toLocaleTimeString()
    var timenum = time.split(" ")[0]
    var am = time.split(" ")[1]
    var timenum = timenum.substring(0, timenum.lastIndexOf(":"))
    var time = timenum + " " + am

    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
        <View style={styles.rowContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{month}/{day}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{rowData.location}</Text>
          </View>
          <View style={styles.sugarContainer}>
            <Text style={styles.sugarText}>{rowData.glucoseLevel}</Text>
          </View>
        </View>
        
        </View>
      </TouchableHighlight>
    );
  }
 
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}

module.exports = SearchResults;