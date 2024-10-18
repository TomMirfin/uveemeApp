import { FontAwesome } from '@expo/vector-icons';
import { useCreateGroup } from 'api/TSHooks/useGroups';
import groupStore from 'Constants/Hooks/groupState';
import ThemedButton from 'Constants/MYBUTTON';
import MYCOLORS from 'Constants/MYCOLORS';
import ThemedTextInput from 'Constants/MYINPUT';
import { CustomText } from 'Constants/MYTEXT';
import React, { useState } from 'react';

import { Text, Dimensions, StyleSheet, View, TextInput, Button } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export const NewGroupWizard = ({ navigation }) => {
  const { data, error, mutate } = useCreateGroup();
  const setGroupId = groupStore((state) => state.setGroupId);
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    membersIds: ['f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081'],
    admin: ['f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081'],
    nextEvent: null,
  });
  console.log(data);
  const handleInputChange = (text: string, identifier: string) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      [identifier]: text,
    }));
  };

  const createGroup = () => {
    mutate(groupDetails);
  };
  const createGroupAndEvent = () => {
    mutate(groupDetails);
    setGroupId(data.id);
  };
  return (
    <View style={styles.container}>
      <SwiperFlatList showPagination horizontal paginationActiveColor="black">
        <View style={[styles.child, { backgroundColor: 'tomato' }]}>
          <FontAwesome
            name="arrow-left"
            size={50}
            color={MYCOLORS.white}
            style={{
              marginTop: 20,
              marginLeft: 5,
            }}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.inputContainer}>
            <CustomText
              type="title"
              centered
              style={{
                marginTop: 50,
                marginBottom: 20,
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              CREATE A GROUP
            </CustomText>

            <ThemedTextInput
              label="Name"
              onChange={(e) => handleInputChange(e.nativeEvent.text, 'name')}
              value={groupDetails.name}
              style={{ color: MYCOLORS.black }}
            />

            <ThemedTextInput
              label="Description"
              onChange={(e) => handleInputChange(e.nativeEvent.text, 'description')}
              value={groupDetails.description}
              style={{ color: MYCOLORS.black }}
            />
          </View>
        </View>
        <View style={[styles.child, { backgroundColor: 'thistle' }]}>
          <CustomText
            type="title"
            centered
            style={{
              marginTop: 80,
              marginBottom: 20,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            WOULD YOU LIKE TO CREATE AN EVENT NOW?
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <ThemedButton title="No" onPress={createGroup} />
            <ThemedButton title="Yes" onPress={createGroupAndEvent} />
          </View>
        </View>
      </SwiperFlatList>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: {
    width,
    height,
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
});

export default NewGroupWizard;
