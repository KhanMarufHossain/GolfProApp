import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/dimensions';
import coursesService from '../../services/coursesService';
import handicapService from '../../services/handicapService';

// Assumptions:
// - GET /courses returns [{ id, name, par, courseRating, slopeRating }]
// - POST /handicap/calculate accepts { courseId, grossScore, courseRating, slopeRating, date }
//   and returns { handicapIndex, details }

export default function CalculatorScreen() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grossScore, setGrossScore] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('');
  const [date, setDate] = useState('');

  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const data = await coursesService.list();
      if (Array.isArray(data)) setCourses(data);
    } catch (e) {
      console.warn('Failed to load courses', e);
    } finally {
      setLoadingCourses(false);
    }
  };

  const onSelectCourse = (c) => {
    setSelectedCourse(c);
    setCourseRating(c.courseRating ? String(c.courseRating) : '');
    setSlopeRating(c.slopeRating ? String(c.slopeRating) : '');
    setShowCourses(false);
  };

  const validate = () => {
    if (!grossScore) return 'Please enter gross score';
    if (!courseRating) return 'Please enter course rating';
    if (!slopeRating) return 'Please enter slope rating';
    return null;
  };

  const onCalculate = async () => {
    const v = validate();
    if (v) return alert(v);

    const payload = {
      courseId: selectedCourse ? selectedCourse.id : null,
      grossScore: Number(grossScore),
      courseRating: Number(courseRating),
      slopeRating: Number(slopeRating),
      date: date || new Date().toISOString(),
    };

    setCalculating(true);
    try {
      const res = await handicapService.calculate(payload);
      setResult(res);
      // add to local history
      setHistory((h) => [ { id: Date.now(), payload, result: res }, ...h ]);
    } catch (e) {
      console.warn('Calculation failed', e);
      alert(e.message || 'Failed to calculate handicap');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Handicap Calculator</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Course</Text>
          <TouchableOpacity style={styles.select} onPress={() => setShowCourses(!showCourses)}>
            <Text style={styles.selectText}>{selectedCourse ? selectedCourse.name : 'Select course or type'}</Text>
          </TouchableOpacity>
          {showCourses && (
            <View style={styles.dropdown}>
              {loadingCourses ? (
                <ActivityIndicator color="#8B5C2A" />
              ) : (
                <FlatList
                  data={courses}
                  keyExtractor={(i) => String(i.id)}
                  style={{ maxHeight: verticalScale(220) }}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectCourse(item)} style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                      <Text style={styles.dropdownMeta}>Par {item.par ?? '-'}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Gross Score</Text>
            <TextInput
              keyboardType="numeric"
              value={grossScore}
              onChangeText={setGrossScore}
              style={styles.input}
              placeholder="e.g. 85"
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              style={styles.input}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Course Rating</Text>
            <TextInput
              keyboardType="numeric"
              value={courseRating}
              onChangeText={setCourseRating}
              style={styles.input}
              placeholder="e.g. 72.5"
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Slope Rating</Text>
            <TextInput
              keyboardType="numeric"
              value={slopeRating}
              onChangeText={setSlopeRating}
              style={styles.input}
              placeholder="e.g. 113"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.calcBtn} onPress={onCalculate} disabled={calculating}>
          {calculating ? <ActivityIndicator color="#fff" /> : <Text style={styles.calcBtnText}>Calculate Handicap</Text>}
        </TouchableOpacity>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultValue}>
              {typeof result === 'object' ? (result.handicapIndex ?? '-') : String(result)}
            </Text>
            {result?.details ? (
              <Text style={styles.resultDetails} numberOfLines={6} ellipsizeMode="tail">
                {typeof result.details === 'object'
                  ? (JSON.stringify(result.details).slice(0, 500) + (JSON.stringify(result.details).length > 500 ? '…' : ''))
                  : String(result.details)}
              </Text>
            ) : null}
          </View>
        )}

        <View style={styles.historyWrap}>
          <Text style={styles.subtitle}>Recent Calculations</Text>
          {history.length === 0 ? (
            <Text style={styles.empty}>No recent calculations</Text>
          ) : (
            history.map((h) => (
              <View key={h.id} style={styles.historyItem}>
                <Text style={styles.historyText}>{h.payload.date.split('T')[0]} • {h.payload.grossScore} • {h.result?.handicapIndex ?? '-'} </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: horizontalScale(20), paddingBottom: verticalScale(40) },
  title: { fontSize: moderateScale(22), fontWeight: '700', marginTop: verticalScale(12), marginBottom: verticalScale(16) },
  subtitle: { fontSize: moderateScale(14), color: '#666', marginBottom: verticalScale(8) },
  fieldGroup: { marginBottom: verticalScale(12) },
  label: { fontSize: moderateScale(13), color: '#5B3926', marginBottom: verticalScale(6) },
  select: { backgroundColor: '#F6EFEA', paddingVertical: verticalScale(12), paddingHorizontal: horizontalScale(12), borderRadius: moderateScale(8) },
  selectText: { color: '#444' },
  dropdown: { marginTop: verticalScale(8), backgroundColor: '#fff', borderRadius: moderateScale(8), borderWidth: 1, borderColor: '#EFE7E1', overflow: 'hidden' },
  dropdownItem: { paddingVertical: verticalScale(10), paddingHorizontal: horizontalScale(12), flexDirection: 'row', justifyContent: 'space-between' },
  dropdownItemText: { fontSize: moderateScale(14) },
  dropdownMeta: { fontSize: moderateScale(12), color: '#888' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: verticalScale(12) },
  halfField: { flex: 1, marginRight: horizontalScale(8) },
  input: { backgroundColor: '#F5F5F5', borderRadius: moderateScale(8), paddingVertical: verticalScale(10), paddingHorizontal: horizontalScale(12), fontSize: moderateScale(15), borderWidth: 1, borderColor: '#EFE7E1' },
  calcBtn: { backgroundColor: '#8B5C2A', paddingVertical: verticalScale(14), borderRadius: moderateScale(8), alignItems: 'center', marginTop: verticalScale(8) },
  calcBtnText: { color: '#fff', fontSize: moderateScale(16), fontWeight: '600' },
  resultCard: { backgroundColor: '#fff', borderRadius: moderateScale(8), padding: horizontalScale(12), marginTop: verticalScale(12), borderWidth: 1, borderColor: '#EFE7E1' },
  resultTitle: { fontSize: moderateScale(14), fontWeight: '700', marginBottom: verticalScale(6) },
  resultValue: { fontSize: moderateScale(20), fontWeight: '700', color: '#8B5C2A' },
  resultDetails: { marginTop: verticalScale(8), color: '#666' },
  historyWrap: { marginTop: verticalScale(16) },
  empty: { color: '#888' },
  historyItem: { paddingVertical: verticalScale(8), borderBottomWidth: 1, borderBottomColor: '#F0ECE9' },
  historyText: { fontSize: moderateScale(13) },
});
