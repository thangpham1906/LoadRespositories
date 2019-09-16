import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios'
import {connect} from 'react-redux'
import {loadStargazer} from '../actions'
var url = ''
var lastItem = null
class LoadStargazer extends Component {
    
    constructor(props){
        super(props);
        const {state} = this.props.navigation;
        url = state.params.stargazers_url
        this.state={
            listStargazer: [],
            number: 30,
            isLoading: false,
            isShowButton: state.params.isShowButton,
            isDisable: true
        }
    }
    
    _renderItem = ({item})=>{
        if(lastItem !=null && lastItem.id === item.id){
            this.setState({
                isDisable: false
            })
        }
        return <Text>{item.login}</Text>
    }
    _loadMoreStagazer = ()=>{
        this.setState({
            number: this.state.number + 30,
            isLoading: true,   
        })
        axios.get(url)
            .then(res =>{
                if(res.data.length>this.state.number){
                    var list = [];
                    for(var i=0;i<this.state.number;i++){
                        if(res.data[i]!==null){
                          list.push(res.data[i]) 
                        }
                    }
                    
                    this.props.loadStargazer(list) 
                    this.setState({
                        isShowButton: true,
                        isLoading: false,
                    })         
                }else{
                    this.props.loadStargazer(res.data)     
                    this.setState({
                        isShowButton: false,
                        isLoading: false
                    })    
                }
            })
            .catch(err =>{
                console.log(err)
                this.setState({isLoading: true})
            })
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList   
                    style={styles.flatList}             
                    data={this.props.listStargazers}
                    renderItem={this._renderItem}
                    keyExtractor= {item => item.id.toString()}
                />
                
                {this.state.isShowButton ? (
                    <Button
                       disabled={this.state.isDisable}
                       style={styles.button}
                       title='Load More Stargazers'
                       onPress ={this._loadMoreStagazer}
                       loading = {this.state.isLoading}
                    />
                ) : null}
            </View>
        )
    }  
    componentDidMount() {
        axios.get(url)
        .then(res =>{
            if(res.data.length>this.state.number){
                var list = [];
                for(var i=0;i<this.state.number;i++){
                    if(res.data[i]!==null){
                      list.push(res.data[i]) 
                    }
                }
                lastItem = list[list.length-1]
                this.props.loadStargazer(list) 
                this.setState({
                    isShowButton: true,
                    isLoading: false,
                })         
            }else{
                this.props.loadStargazer(res.data)     
                this.setState({
                    isShowButton: false,
                    isLoading: false
                })    
            }
        })
        .catch(err =>{
            console.log(err)
            this.setState({isLoading: true})
        })
    }
   
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    flatList:{
        flex: 9
    },
    button:{
        flex: 1
    }
})
const mapStateToProps = (store)=>({
    listStargazers: store.stargazerReducer
})

export default connect(mapStateToProps,{loadStargazer})(LoadStargazer)