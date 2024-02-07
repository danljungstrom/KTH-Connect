import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, FlatList, Text } from 'react-native';

export const ChooseCampus = ({navigation}) => {
    const campusList = [
      { id: 1, name: 'KTH Flemingsberg' },
      { id: 2, name: 'KTH Kista' },
      { id: 3, name: 'KTH Solna' },
      { id: 4, name: 'KTH Södertälje' },
      { id: 5, name: 'KTH Valhallavägen' },
    ];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <FlatList
        ListHeaderComponent={() => <Text style={styles.listHeader}>Choose a Campus</Text>}
        style={styles.list}
        data={campusList}
        renderItem={({item}) => 
            <Text style={styles.listText} onPress={() => console.log('User chose: ' + item.name) + navigation.navigate('Campus')}>{item.name}</Text>
        }
        keyExtractor={(item) => item.id}
        />
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
    color: '#FFFFFF',
    backgroundColor: '#002145',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgba(50, 135, 194, 0.5)',
    flexGrow: 0,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  listText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 163, 191, 0.1)',
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 25, 52, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
