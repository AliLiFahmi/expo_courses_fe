import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

export default function ButtonTabsLayout() {
  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#818CF8",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            backgroundColor: "#111827",
            borderTopColor: "#1F2937",
            height: 60,
            borderTopWidth: -2,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(course)"
          options={{
            title: "Courses",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(document)"
          options={{
            title: "Documents",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="info" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(setting)"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="circle-user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
