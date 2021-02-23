import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

// export default class Preview extends React.Component { 
    
//  render(style,
//     item,
//     imageKey,
//     onPress,
//     index,
//     active,
//     local) {
//         const styles = StyleSheet.create({
//             videoContainer: {
//               width: 275,
//               paddingVertical: 28,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginRight: 20,
//             },
//             videoPreview: {
//               width: 275,
//               height: 155,
//               borderRadius: 8,
//               resizeMode: 'cover',
//             },
//             desc: {
//               fontSize: 14,
//               letterSpacing: 0,
//               lineHeight: 24,
//               marginTop: 18,
//             },
//             imageContainer: {
//               justifyContent: 'center',
//               alignItems: 'center',
//             },
//             shadow: {
//               ...Platform.select({
//                 ios: {
//                   shadowColor: 'black',
//                   shadowOffset: {width: 0, height: 1},
//                   shadowOpacity: 0.1,
//                   shadowRadius: 5,
//                 },
//                 android: {
//                   elevation: 5,
//                 },
//               }),
//             },
//           });

//   return (
//     <TouchableOpacity
//       style={[styles.videoContainer]}
//       onPress={() => onPress(item)}>
//       <View style={[styles.imageContainer, styles.shadow]}>
//         <Image
//           style={[styles.videoPreview, active ? {} : {height: 120}]}
//           source={{uri: item[imageKey]}}
//         />
//       </View>
//       <Text style={styles.desc}>{item.desc}</Text>
//     </TouchableOpacity>
//   );
// };

// }
export default (Preview = ({
    style,
    item,
    imageKey,
    onPress,
    index,
    active,
    local,
  }) => {
    return (
      <TouchableOpacity
        style={[styles.videoContainer]}
        onPress={() => onPress(item)}>
        <View style={[styles.imageContainer, styles.shadow]} key={item.key}>
          <Image
            style={[styles.videoPreview, active ? { width: 100,
              height: 100,
              borderRadius:50 } : {}]}
            source={{uri: item[imageKey]}}
          />
        </View>
        <Text style={styles.desc}>{item.desc}</Text>
      </TouchableOpacity>
    );
  });
  
  const styles = StyleSheet.create({
    videoContainer: {
      width: 95,
      paddingVertical: 38,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    videoPreview: {
      width: 80,
      height: 80,
      borderRadius:40 ,
      
    },
    desc: {
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 28,
      marginTop: 18,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadow: {
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
        },
      }),
    },
  });
