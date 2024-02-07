import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';



//TODO: Implement





export const Campus = () => {

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 59.40464,
    longitude: 17.95018,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const mapRef = useRef(null);



  const campus = {
    name: "KTH Kista",
    visitingAdress: "Visiting Address:",
    actualAdress: "Kistagången 16, 164 40 KISTA",
    postalAdress: "Postal Adress:",
    actualPostalAdress: "Electrum 229, 164 40 KISTA",
    phoneNumber: "Phone Number:",
    actualPhoneNumber: "08-790 40 00",
    email: "Email:",
    actualEmail: "service@eecs.kth.se",

  }

  return (


    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={selectedRegion}
        onRegionChangeComplete={region => setSelectedRegion(region)}
      >
        <Marker
          coordinate={{ latitude: 59.40464, longitude: 17.95018 }}
          title="KTH Kista"
          description="Kistagången 16, 164 40 KISTA"
        />
      </MapView>

      <Text style={styles.headerText}>{campus.name}</Text>

      <View style={styles.addressRow}>
        <Text style={styles.visitingAdress}>{campus.visitingAdress}</Text>
        <Text style={styles.actualAdress}>{campus.actualAdress}</Text>
      </View>

      <View style={styles.postalAddressRow}>
        <Text style={styles.postalAdress}>{campus.postalAdress}</Text>
        <Text style={styles.actualPostalAdress}>{campus.actualPostalAdress}</Text>
      </View>

      <View style={styles.phoneRow}>
        <Text style={styles.phoneNumber}>{campus.phoneNumber}</Text>
        <Text style={styles.actualPhoneNumber}>{campus.actualPhoneNumber}</Text>
      </View>

      <View style={styles.emailRow}>

        <Text style={styles.email}>{campus.email}</Text>
        <Text style={styles.actualEmail}>{campus.actualEmail}</Text>

      </View>


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
    fontSize: 45,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
    marginLeft: 30,
  },
  visitingAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
    marginLeft: 30,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  actualAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
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
    alignSelf: 'left',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualPostalAdress: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
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
    alignSelf: 'left',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualPhoneNumber: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
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
    alignSelf: 'left',
    marginLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  actualEmail: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'left',
    marginLeft: 5,
    paddingTop: 10,

  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    width: 25,
    height: 25,
  }



});

