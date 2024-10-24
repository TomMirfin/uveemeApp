import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useCreateGroup, useUpdateGroup } from 'api/TSHooks/useGroups';
import { useUserById, useUsers } from 'api/TSHooks/useUsers';
import groupStore from 'Constants/Hooks/groupState';
import ThemedButton from 'Constants/MYBUTTON';
import MYCOLORS from 'Constants/MYCOLORS';
import ThemedTextInput from 'Constants/MYINPUT';
import { CustomText } from 'Constants/MYTEXT';
import React, { useEffect, useState } from 'react';

import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export const NewGroupWizard = ({ navigation }) => {
  const { users } = useUsers();

  const { data, error, mutate } = useCreateGroup();
  const setGroupId = groupStore((state) => state.setGroupId);
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    membersIds: ['f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081'],
    admin: ['f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081'],
    nextEvent: null,
  });

  const [membersDropDown, setMembersDropDown] = useState<any[]>([]);

  const handleInputChange = (text: string, identifier: string) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      [identifier]: text,
    }));
  };

  const handleMemberSelection = (id: string) => {
    console.log('Selected member ID:', id);

    // Prevent duplicates
    if (groupDetails?.membersIds?.includes(id)) {
      console.log('Member already selected:', id);
      return;
    }

    setGroupDetails((prevState) => {
      const updatedMembers = [...prevState.membersIds, id];
      console.log('Updated members:', updatedMembers);
      return {
        ...prevState,
        membersIds: updatedMembers,
      };
    });

    setMembersDropDown([]);
  };

  const removeMember = (id: string) => {
    setGroupDetails((prevState) => ({
      ...prevState,
      membersIds: prevState.membersIds.filter((member) => member !== id),
    }));
  };

  const createGroup = () => {
    mutate(groupDetails);

    navigation.navigate('GroupById');
  };
  const createGroupAndEvent = () => {
    mutate(groupDetails);
    navigation.navigate('GroupById');
  };

  const searchForUsers = (e: any) => {
    const searchText = e.nativeEvent.text.toLowerCase();

    if (searchText.length === 0) {
      setMembersDropDown([]);
      return;
    }

    const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchText));
    setMembersDropDown(filteredUsers);
  };

  const findUserById = (id: string) => {
    return users?.find((user) => user.id === id);
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
                marginBottom: 20,
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              CREATE A GROUP
            </CustomText>

            <ThemedTextInput
              label="Name"
              onChange={(e) => handleInputChange(e.nativeEvent.text, 'name')}
              value={groupDetails?.name}
              style={{ color: MYCOLORS.black }}
            />

            <ThemedTextInput
              label="Description"
              onChange={(e) => handleInputChange(e.nativeEvent.text, 'description')}
              value={groupDetails?.description}
              style={{ color: MYCOLORS.black }}
            />
          </View>
        </View>
        <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
          <CustomText
            type="title"
            centered
            style={{
              marginTop: 110,
              marginBottom: 20,
            }}>
            ADD MEMBERS
          </CustomText>

          <CustomText style={{ marginLeft: 10 }}>Search By Email or Invite Code</CustomText>

          <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
            <ThemedTextInput label="Search" onChange={(e) => searchForUsers(e)} />

            {membersDropDown?.length > 0 ? (
              <ScrollView style={styles.dropdown}>
                {membersDropDown.map((member) => (
                  <Pressable
                    key={member.id}
                    style={styles.dropdownItem}
                    onPress={() => handleMemberSelection(member.id)}>
                    <CustomText>{member?.email}</CustomText>
                    <CustomText>{member?.name}</CustomText>
                  </Pressable>
                ))}
              </ScrollView>
            ) : null}
            <CustomText style={{ marginLeft: 10 }} type="title" centered>
              Members
            </CustomText>
            {groupDetails?.membersIds.map((member) => (
              <View
                key={member}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  padding: 10,
                  marginHorizontal: 10,
                }}>
                <CustomText
                  style={{
                    marginLeft: 10,
                    color: 'black',
                    marginTop: 2,
                  }}>
                  {findUserById(member)?.name || 'Unknown User'}{' '}
                </CustomText>

                <Ionicons
                  name="close-circle"
                  size={24}
                  color="tomato"
                  onPress={() => removeMember(member)}
                />
              </View>
            ))}
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
  dropdown: {
    backgroundColor: 'tomato',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 250,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default NewGroupWizard;
