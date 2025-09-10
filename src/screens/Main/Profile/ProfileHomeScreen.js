import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import PostCard from "../../../components/PostCard";
import { getProfile, getMyPosts } from "../../../services/profileService";

export default function ProfileHomeScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("Posts");

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      if (p.ok) setProfile(p.data);
      const r = await getMyPosts();
      if (r.ok) setPosts(r.data);
    })();
  }, []);

  if (!profile) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Text style={styles.menuTxt}>⋯</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tab === "Posts" ? posts : []}
        keyExtractor={(item, i) => item?.id || String(i)}
        ListHeaderComponent={
          <>
            <ProfileHeader
              profile={profile}
              onEdit={() => navigation.navigate("EditProfile", { profile })}
            />
            <View style={styles.quickLinks}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Followers")}
                style={styles.quickBtn}
              >
                <Text style={styles.quickTxt}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Scorecards")}
                style={styles.quickBtn}
              >
                <Text style={styles.quickTxt}>Scorecards</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabs}>
              {["Posts", "Courses", "Badges"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t)}
                  style={[styles.tabBtn, tab === t && styles.tabActive]}
                >
                  <Text
                    style={[styles.tabTxt, tab === t && styles.tabTxtActive]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {tab === "Courses" && (
              <View style={styles.coursesWrap}>
                {profile.recentCourses.map((c) => (
                  <View key={c.id} style={styles.courseCard}>
                    <Image source={c.image} style={styles.courseImg} />
                    <Text style={styles.courseName}>{c.name}</Text>
                  </View>
                ))}
              </View>
            )}
            {tab === "Badges" && (
              <View style={styles.badgesWrap}>
                {profile.badges.map((b) => (
                  <View key={b.id} style={styles.badge}>
                    <Text style={styles.badgeTxt}>{b.label}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  headerBar: { height: 48, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontWeight: "700", fontSize: 18, color: "#222" },
  menu: {
    position: "absolute",
    right: 12,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTxt: { fontSize: 18 },
  list: { paddingBottom: 40 },
  quickLinks: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    backgroundColor: "#F6EFE9",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EFE7E1",
  },
  quickBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5D2C2",
  },
  quickTxt: { color: "#8B5C2A", fontWeight: "600" },
  tabs: { flexDirection: "row", marginTop: 10, paddingHorizontal: 12 },
  tabBtn: {
    flex: 1,
    height: 36,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#F1E7DF",
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: "#8B5C2A" },
  tabTxt: { color: "#8B5C2A", fontWeight: "600" },
  tabTxtActive: { color: "#fff", fontWeight: "700" },
  coursesWrap: { padding: 12, flexDirection: "row" },
  courseCard: { width: 140, marginRight: 12 },
  courseImg: { width: "100%", height: 90, borderRadius: 8 },
  courseName: { marginTop: 6, fontWeight: "600", color: "#222" },
  badgesWrap: { padding: 12, flexDirection: "row", flexWrap: "wrap" },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5D2C2",
    margin: 6,
  },
  badgeTxt: { color: "#8B5C2A", fontWeight: "600" },
});
