import React from 'react'
import { View, Text, Image } from 'react-native'
import ImageSourcePropType  from 'react-native'

import { shape, string, number } from 'prop-types'
import styles from './Card.styles'

const Card = ({ card }) => (
  <View
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={{uri:card.urlImage}}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.productionName}, ${card.price}`}$
      </Text>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    urlImage: string,
    description :string,
    action:string,
    productionName: string,
    price: number,
  }).isRequired,
}

export default Card
