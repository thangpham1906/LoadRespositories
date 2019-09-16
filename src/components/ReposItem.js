import React, { Component } from 'react'
import { Text, StyleSheet, View,ToastAndroid,TouchableOpacity,Button } from 'react-native'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadStargazer} from '../actions'

class ReposItem extends Component {
    constructor(props){
        super(props);
        this.enableLoadMore = this.enableLoadMore.bind(this);
        this.state={
            numberOfStargazers: 0,
            listStargazer: [],
            number: 30,
            isShowButton: false
        }
    }
    enableLoadMore=()=>{
        this.props.referenceCallback();
      }
    _loadStargazer=()=>{
        this.props.loadStargazer(this.state.listStargazer)  
        this.props.navigation.navigate('LoadStargazer',{
            stargazers_url: this.props.item.stargazers_url,
            number: this.state.number,
            isShowButton: this.state.isShowButton
        })    
    }
    render() {
        return (
            
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>{this.props.item.name} -  </Text>
                <Text style={styles.title}>{this.state.numberOfStargazers} - </Text>
                <Button           
                    title = 'Load Stargazer'
                    onPress={this._loadStargazer}
                />
            </View>
           
        )
    }
    //get data to pass data to LoadStargazer
    componentDidMount(){       
        axios.get(this.props.item.stargazers_url)
        .then(res =>{
            this.setState({
                numberOfStargazers: res.data.length,                   
            })
            // khi item cuối cùng đc load xong
            if(this.props.lastItem.name == this.props.item.name){
                this.enableLoadMore()
            }

            if(res.data.length>this.state.number){
                var list = [];
                for(var i=0;i<this.state.number;i++){
                    if(res.data[i]!==null){
                      list.push(res.data[i]) 
                    }
                }
                this.setState({
                    listStargazer: list,
                    isShowButton: true,
                 })
               
            }else{
               
                this.setState({
                    listStargazer: res.data,
                    isShowButton: false
                })
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        marginVertical: 10,
        marginHorizontal: 10
    }
})

export default connect(null,{loadStargazer})(ReposItem)
