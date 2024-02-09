import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCampus } from '../services/CampusProvider';

export const CampusSelector = ({ bottom }) => {
  const { selectedCampus, setSelectedCampus } = useCampus();
  const [ modalVisible, setModalVisible ] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);
  const chooseCampus = (campus) => {
    setSelectedCampus(campus);
    toggleModal();
  };

  //Sort campuses and remove the current one.
  const getSortedCampuses = () => {
    return campus
      .filter(c => c.id !== selectedCampus.id)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const campus = [
      { id: 1, name: 'KTH Flemingsberg' },
      { id: 2, name: 'KTH Kista' },
      { id: 3, name: 'KTH Solna' },
      { id: 4, name: 'KTH Södertälje' },
      { id: 5, name: 'KTH Valhallavägen' },
  ];

  const renderCampusItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => chooseCampus(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { bottom: bottom ? 0 : 70 }]}>
      <TouchableOpacity onPress={toggleModal} style={styles.selector}>
        <Text style={styles.campusText}>{selectedCampus.name}</Text>
        <MaterialCommunityIcons
          name='chevron-up' 
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal} activeOpacity={1}>
          <View style={[styles.modalView, { bottom: bottom ? 0 : 69 }]}>
            <FlatList
              ListHeaderComponent={
                <TouchableOpacity 
                  style={styles.itemHeader} 
                  onPress={toggleModal}
                >
                  <Text style={[styles.itemText, styles.selectedCampusText]}>
                    {selectedCampus.name}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down" 
                    size={24}
                    color="white"
                    style={styles.downButton}
                  />
                </TouchableOpacity>
              }
              data={getSortedCampuses()}
              renderItem={renderCampusItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 69,
    width: 170,
    alignSelf: 'center',
    backgroundColor: '#132E49',
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  campusText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: 170,
    alignSelf: 'center',
    backgroundColor: '#132E49',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 2,
    paddingLeft: 5,
    position: 'absolute',
    bottom: 70,
  },
  item: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 0,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: 'white',
  },
  selectedCampusText: {
    fontWeight: 'bold',
  },
  campusText:{
    fontWeight: 'bold',
    color: 'white',
  },  
  downButton: {
    paddingBottom: 5,
    marginTop: -3,
  } 
});