import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';
import { CampusSelector } from '../components/CampusSelector';
import {addDoc, collection} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import {useUser} from "../services/UserProvider";
import {colors} from "../assets/colors";
import {Author} from "../components/Author";
import {ActionButton} from "../components/ActionButton";
import {fetchUserProfile} from "../services/UserAPI";
import DateTimePicker from "react-native-ui-datepicker/src/DateTimePicker";
import dayjs from "dayjs";

export const NewPost = ({navigation}) => {

  const {currentUser} = useUser()
  const [creatingEvent, setCreatingEvent] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [user, setUser] = useState(null);
  const [editingStart, setEditingStart] = useState(false)
  const [editingEnd, setEditingEnd] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserProfile(currentUser.username);
      setUser(userData);
    };

    fetchUserData();
  }, []);

  function addPost(post) {
    addDoc(collection(db, "Posts"), post).then(() => {navigation.push('PostConfirmation', {post})})
  }

  function onPost() {
    const post = {
      content: postContent,
      creator: currentUser.username
    }
    addPost(post)
  }

  function onCancel() {
    // TODO warn user post will be discarded?
    navigation.goBack()
  }

  function startDatePressed() {
    setEditingStart(!editingStart)
    setEditingEnd(false)
  }

  function endDatePressed() {
    setEditingEnd(!editingEnd)
    setEditingStart(false)
  }

  return (
    <View style={styles.container}>

      <PostTypeMenu creatingEvent={creatingEvent} setCreatingEvent={setCreatingEvent}/>

      <View style={styles.postContainer}>
        {user && <Author user={user}/>}

        {creatingEvent && <View>
          <TextInput placeholder={"Add event title..."}
                     placeholderTextColor={colors.lowOpacityText} style={styles.titleText}/>
          <View style={styles.datesContainer}>
            <DatePickerButton onPress={startDatePressed} date={startDate} placeholder={"Start Date"} active={editingStart}/>
            <Text style={styles.dateText}>→</Text>
            <DatePickerButton onPress={endDatePressed} date={endDate} placeholder={"End Date"} active={editingEnd}/>
          </View>
          <View>
            {editingStart && <DatePicker date={startDate} setDate={setStartDate} title="Set Start Date"/>}
            {editingEnd && <DatePicker date={endDate} setDate={setEndDate} title="Set End Date"/>}
          </View>
        </View>}

        <TextInput multiline
                   placeholder={creatingEvent ? "Edit event description..." : "Write your post..."}
                   placeholderTextColor={colors.lowOpacityText}
                   numberOfLines={10}
                   style={styles.postInput}
                   onChangeText={setPostContent}/>

      </View>

      <View style={styles.buttonContainer}>
        <ActionButton text={"Post"} onPress={onPost}/>
        <ActionButton text={"Cancel"} onPress={onCancel}/>
      </View>

      <CampusSelector bottom={ true } />
    </View>
  );
}

const PostTypeMenu = ({creatingEvent, setCreatingEvent}) => {
  return(
      <View style={styles.postTypeMenu}>
        <Pressable onPress={() => setCreatingEvent(false)}>
          <Text style={{...styles.postTypeChoice, ...(creatingEvent ? {} : styles.activePostTypeChoice)}}>
            Text
          </Text>
        </Pressable>
        <Pressable onPress={() => setCreatingEvent(true)}>
          <Text style={{...styles.postTypeChoice, ...(creatingEvent ? styles.activePostTypeChoice : {})}}>
            Event
          </Text>
        </Pressable>
      </View>
  )
}

const DatePickerButton = ({onPress, date, placeholder, active}) => {
  return (<Pressable onPress={onPress} style={{...styles.dateTextContainer, ...(active ? styles.selectedDate : {})}}>
    <Text style={styles.dateText}>
      { date ? date.format('YYYY-MM-DD HH:mm') : placeholder }
    </Text>
  </Pressable>)
}

const DatePicker = ({date, setDate}) => {
  return(
      <>
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            mode="single"
            date={date ? date : dayjs()}
            onChange={(params) => setDate(dayjs(params.date))} timePicker={true}
            minDate={dayjs().subtract(1, 'day')}
            firstDayOfWeek={1}
          />
        </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50
  },
  postTypeMenu: {
    flexDirection: 'row',
    gap: 10
  },
  postTypeChoice: {
    color: colors.text
  },
  activePostTypeChoice: {
    textDecorationLine: 'underline'
  },
  postContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginVertical: 20,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    rowGap:15
  },
  postInput: {
    color: colors.text
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  },
  titleText: {
    color: colors.text,
    fontSize: 30
  },
  dateText: {
    color: colors.text,
  },
  datesContainer: {
    flexDirection: 'row',
    width: '100%',
    gap:10,
    alignItems: 'center'
  },
  datePickerContainer: {
    marginHorizontal:25,
    marginVertical:7,
    paddingHorizontal:30,
    paddingVertical:15,
    backgroundColor: colors.accentText,
    borderRadius:10
  },
  selectedDate: {
    backgroundColor: colors.accent
  },
  dateTextContainer: {
    padding:5,
    borderRadius:7
  }
});
