import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { useCampus } from '../../services/CampusProvider';

//TODO: Implement
export const Campus = () => {
  const { selectedCampus } = useCampus();

  return (


    <View style={styles.container}>

      <Text style={styles.headerText}>{selectedCampus.name}</Text>

      <View style={styles.addressRow}>
        <Text style={styles.visitingAdress}>Visiting Address: </Text>
        <Text style={styles.actualAdress}>{selectedCampus.address}</Text>
      </View>

      <View style={styles.postalAddressRow}>
        <Text style={styles.postalAdress}>Postal Adress: </Text>
        <Text style={styles.actualPostalAdress}>{selectedCampus.postalAddress}</Text>
      </View>

      <View style={styles.phoneRow}>
        <Text style={styles.phoneNumber}>Phone Number: </Text>
        <Text style={styles.actualPhoneNumber}>{selectedCampus.phone}</Text>
      </View>

      <View style={styles.emailRow}>

        <Text style={styles.email}>Email: </Text>
        <Text style={styles.actualEmail}>{selectedCampus.email}</Text>

      </View>
      <Image style={styles.mapPicture} source={require('../../assets/exMapKista.png')} />
          

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
    marginLeft: 30,
  },
  visitingAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 30,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  actualAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 5,
    paddingTop: 20,

  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  postalAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualPostalAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 5,
    paddingTop: 10,

  },
  postalAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneNumber: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualPhoneNumber: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 5,
    paddingTop: 10,

  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  email: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualEmail: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'flex-start',
    marginLeft: 5,
    paddingTop: 10,

  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 mapPicture: {
  marginTop: 50, 
   width: 500,
   height: 300,
 }



});

