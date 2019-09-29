import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Text, Button, View } from 'react-native';
import MapView from 'react-native-maps';
// import console = require('console');

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
        }
    }
    
    render () {
        const styles = StyleSheet.create({
            button: {
                display: 'flex',
                height: 50,
                width: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#2AC062',
                shadowColor: '#2AC062',
                shadowOpacity: 0.4,
                shadowOffset: { height: 10, width: 0 },
                shadowRadius: 20,
            },
        
            text: {
                fontSize: 16,
                textTransform: 'uppercase',
                color: '#FFFFFF',
            },
        });
        return (
            <TouchableOpacity onPress={this.props.handleToggle} style={styles.button}>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}