import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import hook

import { useGroupsForUser } from 'api/TSHooks/useGroups';
import MYCOLORS from 'Constants/MYCOLORS';
import { CustomText } from 'Constants/MYTEXT';
import { useEvent } from 'react-native-reanimated';

interface Group {
  admin: string[];
  description: string;
  events: any[];
  groupImage: string | null;
  id: string;
  lastEvent: string;
  memberTypes: any[];
  membersIds: string[];
  membersNames: string[];
  name: string;
  nextEvent: string;
  scoreByMember: Record<string, number>;
  totalScore: number;
}

interface RenderItemsProps {
  item: Group;
}

export default function GroupsMain({ navigation }) {
  const { data, isLoading, error } = useGroupsForUser('f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081');
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    setGroups(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={({ item }: RenderItemsProps) => (
          <Pressable
            style={styles.pressable}
            onPress={() =>
              navigation.navigate('GroupById', {
                id: item.id,
              })
            }>
            <CustomText>{item.name}</CustomText>
            <CustomText>{item.description}</CustomText>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
  },
  pressable: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: MYCOLORS.orange,
    borderBottomWidth: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    position: 'absolute',
    top: 10,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  description: {
    position: 'absolute',
    top: 40,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  nextEvent: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
