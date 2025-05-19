import Ionicons from "@expo/vector-icons/Ionicons";
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
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "500",
            paddingBottom: 4,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Beranda",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(course)"
          options={{
            title: "Mata Kuliah",
            headerShown: false,
            popToTopOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(document)"
          options={{
            title: "Tentang",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Octicons name="info" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(setting)"
          options={{
            title: "Pengaturan",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
