import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import { colors } from '@/constants';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import { getMonthYearDetails, getNewMonthYear } from '@/utils';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

function CalendarHomeScreen() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        moveToToday={moveToToday}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default CalendarHomeScreen;