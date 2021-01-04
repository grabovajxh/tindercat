import React, { memo } from 'react';
import { StyleSheet ,View ,Text} from 'react-native';



export default class AnalyticsSreen extends React.Component {
  
    render() {
        const styles = StyleSheet.create({
          separator: {
            height: 10,
          },
          contentStyle: {
            paddingHorizontal: 12,
            paddingTop:'25%',
           
          },
        });

       
        return (

        
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', width: 'auto', height: 'auto', flex: 1 }}>
         
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '20%', paddingLeft: '10%' }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", }}>Analytics Sreen</Text>
          </View>
           
              </View>
    
    
        );
    
    
      }
    
    }