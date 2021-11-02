import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { UserPhoto } from "../UserPhoto";
import Logo from "../../assets/logo.svg";

import { styles } from "./styles";
import { useAuth } from "../../hooks/authContex";

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.logout}>
        {user && (
          <TouchableOpacity>
            <Text style={styles.logoutText} onPress={signOut}>
              Sair
            </Text>
          </TouchableOpacity>
        )}

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
