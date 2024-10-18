import { View, Text } from 'react-native';
import React from 'react';
import { useGroupById } from 'api/TSHooks/useGroups';
import MYCOLORS from 'Constants/MYCOLORS';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from 'Constants/MYTEXT';
import { FontAwesome } from '@expo/vector-icons';

export default function GroupById({ route, navigation }) {
  const { id } = route.params;
  const { data, isLoading, error } = useGroupById(id);
  console.log(data);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: MYCOLORS.background,
      }}>
      <FontAwesome
        name="arrow-left"
        size={50}
        color={MYCOLORS.white}
        onPress={() => {
          navigation.navigate('Groups');
        }}
      />
      {data &&
        data.map((group) => (
          <View key={group.id}>
            <CustomText>{group.name}</CustomText>
            <CustomText>{group.description}</CustomText>
          </View>
        ))}
    </SafeAreaView>
  );
}
