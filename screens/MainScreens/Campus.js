import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useCampus } from '../../services/CampusProvider';

export const Campus = () => {
  const { selectedCampus } = useCampus();

  const localMaps =[
    require('../../assets/exMapFlemingsberg.png'),
    require('../../assets/exMapKista.png'),
    require('../../assets/exMapSolna.png'),
    require('../../assets/exMapSödertälje.png'),
    require('../../assets/exMapMainCampus.png'),
  ]




  return (
    <View style={styles.container}>

      <Text style={styles.headerText}>{selectedCampus.name}</Text>

      <View style={styles.dataRow}>
        <Text style={styles.title}>Visiting Address: </Text>
        <Text style={styles.data}>{selectedCampus.address}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.title}>Postal Adress: </Text>
        <Text style={styles.data}>{selectedCampus.postalAddress}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.title}>Phone Number: </Text>
        <Text style={styles.data}>{selectedCampus.phone}</Text>
      </View>

      <View style={styles.dataRow}>

        <Text style={styles.title}>Email: </Text>
        <Text style={styles.data}>{selectedCampus.email}</Text>

      </View>
      
      <Image style={styles.mapPicture} source={localMaps[selectedCampus.id - 1]} />
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  headerText: {
    fontSize: 40,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 15,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    paddingTop: 5,
    width: 300 // TODO: Fix this
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 mapPicture: {
  marginTop: 50, 
   width: 500,
   height: 300,
 }
});