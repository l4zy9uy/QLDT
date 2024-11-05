// ClassTable.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const CustomTable = ({
                        data,
                        headers,
                        hasSelected,
                        selectedRows,
                        onToggleRow,
                        customStyles = {}
                    }) => {
    const { tableHeader, headerBox, tableRow, cellBox, checkbox, headerText, cellText } = customStyles;

    return (
        <ScrollView horizontal>
            <View>
                {/* Table Header */}
                <View style={[styles.tableHeader, tableHeader]}>
                    {headers.map((header, index) => (
                        <View key={index} style={[styles.headerBox, headerBox]}>
                            <Text style={[styles.headerText, headerText]}>{header.label}</Text>
                        </View>
                    ))}
                    {hasSelected && (
                        <View style={[styles.headerBox, headerBox]}>
                            <Text style={[styles.headerText, headerText]}>Select</Text>
                        </View>
                    )}
                </View>

                {/* Table Rows */}
                {data.map((item) => (
                    <View key={item.id} style={[styles.tableRow, tableRow]}>
                        {headers.map((header, index) => (
                            <View key={index} style={[styles.cellBox, cellBox]}>
                                <Text style={[styles.cellText, cellText]}>{item[header.field]}</Text>
                            </View>
                        ))}
                        {hasSelected && (
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    style={[styles.checkbox, checkbox]}
                                    value={!!selectedRows[item.id]}
                                    onValueChange={() => onToggleRow(item.id)}
                                    color="#b30000"
                                />
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tableHeader: { flexDirection: 'row', backgroundColor: '#b30000', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    headerBox: { width: 100, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 10, alignItems: 'center' },
    cellBox: { width: 100, justifyContent: 'center', alignItems: 'center' },
    checkbox: { marginHorizontal: 20 },
    headerText: { color: 'white', fontWeight: 'bold' },
    cellText: { textAlign: 'center', color: '#333' },
    checkboxContainer: { width: 100, alignItems: 'center', justifyContent: 'center' },
});

export default CustomTable;
