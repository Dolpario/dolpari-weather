import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import moment from 'moment';
import { LineChart,Grid,XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class TimeByTemp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            date: []
        }
    }

    componentDidMount() {
        this.dataSet();
    }

    dataSet = () => {
        const { timeByTemp } = this.props;
        var data = [];
        var date = [];
        timeByTemp.map(ele => {
            data.push(ele.main.temp)
            date.push(moment(ele.dt_txt).format("HH"))
        });
        this.setState({ data: data, date: date });
    }

    render() {
        const { data, date } = this.state
        const {isBlack} = this.props
        const counter = new Array(Number(date[0]) || 24).fill(0)
        const chartarray = {
            black:<View style ={{flex:1}}>
            <LineChart
                style={{ height: '100%' }}
                data={data}
                curve={shape.curveNatural}
                contentInset={{ top: 30, bottom: 20, left: 0, right: 0 }}
                svg={{ stroke: 'black', strokeWidth: 3 }}
                showGrid={true}
            >
                
                <Grid direction={Grid.Direction.VERTICAL}/>
            </LineChart>
            <XAxis
                style={{ marginHorizontal: -10 }}
                data={ counter }
                formatLabel={ (n, i) => i + Number(date[0]) }
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill:'black' }}
            />
            </View>,
            white: <View style ={{flex:1}}>
            <LineChart
                style={{ height: '100%' }}
                data={data}
                curve={shape.curveNatural}
                contentInset={{ top: 30, bottom: 20, left: 0, right: 0 }}
                svg={{ stroke: 'white', strokeWidth: 3 }}
                showGrid={true}
            >
                
                <Grid direction={Grid.Direction.VERTICAL}/>
            </LineChart>
            <XAxis
                style={{ marginHorizontal: -10 }}
                data={ counter }
                formatLabel={ (n, i) => i + Number(date[0]) }
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill:'white' }}
            />
            </View>
        }

        return (

            <View style={styles.container}>
                {console.log(isBlack)}
                {isBlack?chartarray['black']:chartarray['white']}
                
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    weatherContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})