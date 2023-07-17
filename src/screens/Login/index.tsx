import { Button } from 'components/Button';
import { Colors } from 'utils/colors';
import { Divider } from 'components/Divider';
import { Text } from 'components/Text';
import { Input } from 'components/Input';
import { SocialMediaButton } from 'components/SocialMediaButton';
import { StatusBar } from 'expo-status-bar';
import { Image, View, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { styles } from './styles';
import { useContext, useState } from 'react';
import { AuthGoogleContext } from 'contexts/authGoogle';
import { isValidEmail } from 'utils/isValidEmail';
import { isValidPhoneNumber } from 'utils/isValidPhoneNumber';

interface FieldsProps {
  login: string;
  password: string;
}

export function Login() {
  const { onGoogleButtonPress } = useContext(AuthGoogleContext);

  const [fields, setFields] = useState<FieldsProps>({
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState<FieldsProps>({
    login: '',
    password: '',
  });

  function handleSetErrors(prop: 'login' | 'password', message: string) {
    setErrors((prevState) => ({ ...prevState, [prop]: message }));
  }

  function handleChange(
    prop: 'login' | 'password',
    value: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setFields((prevState) => ({ ...prevState, [prop]: value }));

    if (errors[prop]) {
      handleSetErrors(prop, '');
    }
  }

  function handleLogin() {
    const isEmptyPassword = !fields.password;

    if (!isValidEmail(fields.login) || !isValidPhoneNumber(fields.login) || isEmptyPassword) {
      if (!isValidEmail(fields.login) || !isValidPhoneNumber(fields.login)) {
        handleSetErrors('login', 'Preencha com um email ou número de telefone válido');
      }

      if (isEmptyPassword) {
        handleSetErrors('password', 'Preencha esse campo.');
      }

      return;
    }
  }

  // const handleButtonClick = () => {
  //   if (login === '') {
  //     setLoginError('Por favor, preencha com um email ou número de telefone válido.')
  //   }

  // }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} />
      <Text fontFamily="Poppins" fontWeight="SEMIBOLD" fontSize={18} color={Colors.GREY_600}>
        Para entregadores
      </Text>
      <View style={styles.loginContainer}>
        <Text
          fontFamily="Poppins"
          fontWeight="SEMIBOLD"
          fontSize={16}
          color={Colors.GREY_500}
          marginTop={32}
        >
          Login
        </Text>
        <Input
          value={fields.login}
          onChange={(text) => handleChange('login', text)}
          error={errors.login}
          label="Email ou Telefone"
        />
        <Input
          value={fields.password}
          error={errors.password}
          onChange={(text) => handleChange('password', text)}
          isConfidential
        />
        <Text
          fontFamily="Poppins"
          fontWeight="REGULAR"
          color={Colors.GREY_300}
          fontSize={13}
          marginVertical={20}
          textDecorationLine="underline"
        >
          Esqueci minha senha
        </Text>
      </View>
      <Button onPress={handleLogin} text="Entrar" isOrange />
      <View style={styles.signUpContainer}>
        <Text fontFamily="Poppins" fontWeight="REGULAR" color={Colors.GREY_300} fontSize={13}>
          Não tem uma Conta?
        </Text>
        <Text fontFamily="Poppins" fontWeight="REGULAR" color={Colors.ORANGE_700} fontSize={13}>
          Criar agora!
        </Text>
      </View>
      <View style={styles.loginWithContainer}>
        <View style={styles.loginWithContent}>
          <Text
            fontFamily="Poppins"
            fontWeight="SEMIBOLD"
            fontSize={13}
            color={Colors.GREY_600}
            paddingRight={7}
          >
            Entrar com
          </Text>
          <Divider />
        </View>
        <View style={styles.googleContainer}>
          <SocialMediaButton
            onPress={() => onGoogleButtonPress()}
            color={Colors.GREY_100}
            text="Continuar com o Google"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
