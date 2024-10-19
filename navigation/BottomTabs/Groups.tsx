import { View, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { useDeleteGroup, useGroups, useGroupsForUser } from 'api/TSHooks/useGroups';
import MYCOLORS from 'Constants/MYCOLORS';
import { CustomText } from 'Constants/MYTEXT';
import { useUsers } from 'api/TSHooks/useUsers';
import { Ionicons } from '@expo/vector-icons';
import { deleteGroup } from '../../api/Api';
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

export default function Groups({ navigation }) {
  const { data, isLoading, error } = useGroupsForUser('f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081');
  const { mutate } = useDeleteGroup();
  // Handle loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={MYCOLORS.orange} />
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <CustomText>Error fetching groups</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={data} // Directly use the fetched data
        renderItem={({ item }: RenderItemsProps) => (
          <Pressable
            style={styles.pressable}
            onPress={() => navigation.navigate('GroupById', { id: item.id })}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
