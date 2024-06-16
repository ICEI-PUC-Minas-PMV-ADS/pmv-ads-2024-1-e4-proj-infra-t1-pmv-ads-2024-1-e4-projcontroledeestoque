import {Pressable, StyleSheet, Text} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import {FetchRelatorios, RelatoriosQueryParams, RelatoriosResponse} from "@/services/relatorios";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListRelatorio from "@/components/relatorios/ListRelatorio";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {toLocaleDateString} from "@/util/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useThemeColorName} from "@/hooks/useThemeColor";

export default function RelatoriosScreen() {
    const {isValidSession, isLoading} = useSession();
    const [appIsReady, setAppIsReady] = useState(false);
    const [relatorios, setRelatorios] = useState<RelatoriosResponse[]>([]);
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [showDataInicioPicker, setShowDataInicioPicker] = useState(false);
    const [showDataFimPicker, setShowDataFimPicker] = useState(false);
    const textInputColor = useThemeColorName("textInput");
    const iconColor = useThemeColorName("icon");

    useEffect(() => {
        setAppIsReady(false);

        if (!isValidSession()) {
            router.replace('(auth)');
        }

        fetchRelatorios({}).then(() => setTimeout(() => setAppIsReady(true), 1000));
    }, []);

    const handleDataInicio = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dataInicio;
        setShowDataInicioPicker(false)
        setDataInicio(currentDate);
    };

    const handleDataFim = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dataFim;
        setShowDataFimPicker(false);
        setDataFim(currentDate);
    };

    const handleSearch = () => {
        setAppIsReady(false);
        fetchRelatorios({dataInicio: dataInicio.toISOString(), dataFim: dataFim.toISOString()})
            .then(() => setTimeout(() => setAppIsReady(true), 1000));
    }

    async function fetchRelatorios(queryParams: RelatoriosQueryParams) {
        const fetchData = await FetchRelatorios(queryParams);
        setRelatorios(fetchData);
    }

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Buscando relatórios..."/>;
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Relatórios</ThemedText>
            </ThemedView>

            <ThemedView style={styles.dateContainer}>
                <Pressable style={[{borderColor: iconColor, backgroundColor: textInputColor}, styles.datePicker]}
                           onPress={() => setShowDataInicioPicker(true)}>
                    <Text>De: {toLocaleDateString(dataInicio)}</Text>
                </Pressable>
                {showDataInicioPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dataInicio}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={handleDataInicio}
                        maximumDate={dataFim}
                    />
                )}

                <Pressable style={[{borderColor: iconColor, backgroundColor: textInputColor}, styles.datePicker]}
                           onPress={() => setShowDataFimPicker(true)}>
                    <Text>Até: {toLocaleDateString(dataFim)}</Text>
                </Pressable>
                {showDataFimPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dataFim}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={handleDataFim}
                        maximumDate={new Date()}
                    />
                )}

                <Pressable style={styles.button} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color={iconColor}/>
                </Pressable>

            </ThemedView>

            <ListRelatorio relatorios={relatorios}/>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8.5,
        borderRadius: 10,
        borderWidth: 2,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
