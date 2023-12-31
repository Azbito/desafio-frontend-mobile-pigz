import { DaysEarning } from 'components/DaysEarning';
import { DeliveriesSummary } from 'components/DeliveriesSummary';
import { NewDelivery } from 'components/NewDelivery';
import { TopBar } from 'components/TopBar';
import {
  BackHandler,
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { useEffect, useLayoutEffect, useState } from 'react';
import { NewDeliveryInfos } from 'components/NewDeliveryInfos';
import { StatusBar } from 'expo-status-bar';
import { onlyNumbers } from 'utils/onlyNumbers';

export function Overview() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [idNumberInfo, setIdNumberInfo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    setIdNumberInfo(onlyNumbers(text));
    setError('');
  };

  function startNewDelivery() {
    if (idNumberInfo === '') {
      setError('Preencha o campo.');
      return;
    }
    Keyboard.dismiss();
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleCloseModal);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleCloseModal);
    };
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TopBar name="Visão geral" />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingHorizontal: 35,
            }}
          >
            <DaysEarning />
            <DeliveriesSummary />
            <NewDelivery
              value={idNumberInfo}
              onChangeText={handleInputChange}
              onPress={startNewDelivery}
              error={error}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
      <NewDeliveryInfos
        isOpen={isOpenModal}
        idNumber={String(idNumberInfo)}
        onPressClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
