import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useCampus } from '../../services/CampusProvider';
import { colors } from '../../assets/colors';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

export const Campus = () => {
  const { selectedCampus } = useCampus();
  const mapRef = useRef(null);

  const [selectedRegion, setSelectedRegion] = useState();
  
  useEffect(() => {
    const newRegion = {
      latitude: selectedCampus.geopoint.latitude,
      longitude: selectedCampus.geopoint.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };

    mapRef.current?.animateToRegion(newRegion, 350);
  }, [selectedCampus]);

  const handleEmailPress = async () => {
    const url = `mailto:${selectedCampus.email}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      console.log('Cannot handle mailto link');
    }
  };

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
        <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.link}>{selectedCampus.email}</Text>
        </TouchableOpacity>
      </View>
      
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={selectedRegion}
        onRegionChangeComplete={region => setSelectedRegion(region)}
      >
        <Marker
          coordinate={{ latitude: selectedCampus.geopoint.latitude, longitude: selectedCampus.geopoint.longitude }}
          title={selectedCampus.name}
          description={selectedCampus.address}
          tracksViewChanges={false}
        />
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  headerText: {
    fontSize: 40,
    color: colors.text,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontSize: 14,
    color: colors.text,
    alignSelf: 'flex-start',
    marginLeft: 15,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 14,
    color: colors.text,
    alignSelf: 'flex-start',
    paddingTop: 5,
    width: 300
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 map: {
  marginTop: '20%',
  width: '100%',
  height: '50%',
 },
 link: {
  color: colors.lowOpacityText,
  textDecorationLine: 'underline',
},
});