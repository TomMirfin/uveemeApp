import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

import { useGroupsForUser } from 'api/TSHooks/useGroups';
import MYCOLORS from 'Constants/MYCOLORS';

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

export default function Groups() {
  const { data, isLoading, error } = useGroupsForUser('f3b36ac4-a9c0-4a45-a68e-ab4a56ff7081');
  console.log(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }: RenderItemsProps) => (
          <View>
            <Text
              style={{
                color: 'white',
              }}>
              {item.name}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
  },
  imageBackground: {
    width: '95%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderBottomColor: MYCOLORS.orange,
    borderBottomWidth: 1,
  },
  pressable: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 10,
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
