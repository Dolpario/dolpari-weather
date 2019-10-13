import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import moment from 'moment';
import { LineChart } from 'react-native-svg-charts'
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

        console.log(this.state.data)
        return (

            <View style={styles.container}>
                <LineChart
                    style={{ height: '100%' }}
                    data={data}
                    curve={shape.curveNatural}
                    contentInset={{ top: 30, bottom: 20, left: 25, right: 25 }}
                    svg={{ stroke: '#f12711', strokeWidth: 3 }}
                >
                </LineChart>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    weatherContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})