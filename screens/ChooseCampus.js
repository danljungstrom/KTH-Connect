import { StyleSheet, View, Image, FlatList, Text } from 'react-native';
import { useCampus } from '../services/CampusProvider';
import { colors } from '../assets/colors';

export const ChooseCampus = ({navigation}) => {
  const { setSelectedCampus, campuses } = useCampus();

  selectedCampus = (id) => {
    setSelectedCampus(id);
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <FlatList
        ListHeaderComponent={() => <Text style={styles.listHeader}>Choose a Campus</Text>}
        style={styles.list}
        data={campuses}
        renderItem={({item}) => 
        <Text style={styles.listText} onPress={() => { selectedCampus(item.id) }}>{item.name}</Text>
        }
        keyExtractor={(item) => item.id}
        />
      <Text style={styles.infoText}>Choose what campus you want to interact with. This can be changed later on.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 105,
    height: 105,
    marginBottom: 75,
  },
  list: {
    width: 200,
    color: colors.text,
    backgroundColor: colors.chooseCampusBackground,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.chooseCampusBorder,
    flexGrow: 0,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  listText: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.text,
    borderTopWidth: 1,
    borderTopColor: colors.chooseCampusListBorder,
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    color: colors.accentText,
    textAlign: 'center',
    width: 330,
    marginTop: 100,
    marginBottom: -150,
  }
});
