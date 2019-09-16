import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,FlatList,ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import {connect} from 'react-redux'
import {loadRepos} from '../actions'
import ReposItem from '../components/ReposItem'

var lastItem = null;
class LoadRepos extends Component {
  
  constructor(props){
    super(props)
    this.callbackFromReposItem = this.callbackFromReposItem.bind(this);
    this.state={
      username : '',
      totalRepos: 0,
      numberReposLoaded: 0,
      number: 30,
      isShowButton: false,
      isLoadingLoadMore: false,
      isDisable: false,
      
    }
  }
  callbackFromReposItem(){
    this.setState({
      isDisable: false
    })
 }

  _showRepos=()=>{
      this.setState({
        isLoadingLoadMore: true,
        isDisable: true
      })
      axios.get('https://api.github.com/users/google/repos')
      // axios.get('https://api.github.com/users/'+this.state.username+'/repos')
      .then(res=>{
        this.setState({
            totalRepos: res.data.length,
        })
        // list > 30 item
        if(res.data.length>this.state.number){
            var list = [];
            for(var i=0;i<this.state.number;i++){
                if(res.data[i]!==null){
                  list.push(res.data[i]) 
                }
            }
           lastItem = list[list.length-1]

            this.props.loadRepos(list)
            this.setState({
                isShowButton: true,
                numberReposLoaded: list.length,
                isLoadingLoadMore: false,
             })
        // list <=30 item
        }else{ 
            this.props.loadRepos(res.data)
            this.setState({
                isShowButton: false,
                numberReposLoaded: res.data.length,
                isLoadingLoadMore: false
            })
        }
      })
      .catch(function (error) {
          console.log(error)
          this.setState({isLoadingLoadMore: true})
      });
  }

  _loadMore =()=>{
    this.setState({
      number: this.state.number + 30
    }), this._showRepos()
  }

  _renderItem=({item})=>(
      <ReposItem onRef={ref => (this.referenceCallback = ref)} referenceCallback = {this.callbackFromReposItem.bind(this)} item = {item} navigation ={this.props.navigation} lastItem={lastItem}/>
  )
  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.top}>
          <View style={styles.row1}>
            <TextInput
                style={styles.input}
                placeholder='input github username'
                onChangeText={(value)=>{this.setState({username:value})}}
            />
            <Button        
                title = 'Show'
                onPress={this._showRepos}
            />
          </View>

          <Text style={styles.title}> Total public repos: {this.state.totalRepos}</Text>
          <Text style={styles.title}> Number public repos loaded: {this.state.numberReposLoaded}</Text>     
          <FlatList
              style={styles.flatList}
              data={this.props.listRepos}
              renderItem={this._renderItem}
              keyExtractor={item => item.id.toString()}  
          />  
        </View>  

        {this.state.isShowButton ? (         
          <Button  
            disabled={this.state.isDisable}
            style={styles.bottom}           
            title='Load More' 
            onPress={this._loadMore}
            loading ={this.state.isLoadingLoadMore}/>
          ) : null}      
    </View>    
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    flexDirection:'column'
  },
  top:{
    flex: 9,
  },
  bottom:{
    flex:1,
  },
  title:{
    fontSize: 18,
    color: 'red',
    fontWeight:'bold'
  },
  row1:{
    flexDirection:'row'
  },
  input:{
      width: 300,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
  },
  flatList:{
    marginTop: 8,
  },
 
})

const mapStateToProps = (store)=>({
  listRepos: store.reposReducer
})
export default connect(mapStateToProps,{loadRepos})(LoadRepos)