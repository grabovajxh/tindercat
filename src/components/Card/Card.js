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
      source={card.photo}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.name}, ${card.price}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    price: number,
  }).isRequired,
}

export default Card
