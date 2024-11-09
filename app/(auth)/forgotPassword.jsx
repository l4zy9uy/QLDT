import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, Image, Pressable, Alert } from 'react-native';
import { icons } from "../../constants";
import { useState } from 'react';

const ForgotPassWord = ({ visible, onClose }) => {
    const [input, setInput] = useState('');

    const handleResetPassword = () => {
        // Handle reset pass
        alert(input);
        onClose();
      };

    const getDynamicStyles = (pressed) => ({
        backgroundColor: pressed ? 'grey' : 'white',
    });

    return (
        <Modal
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.overlay}>
            <View style={styles.popupContainer}>
                <Text style={styles.title}>Bạn hãy nhập Email (của trường) hoặc MSSV (đối với Sinh viên) để lấy lại mật khẩu. Mật khẩu mới sẽ được gửi về email của bạn.</Text>
                <View style={styles.input}>
                    <Image 
                        source={icons.forgotPassIcon} 
                        style={styles.forgotPassIcon}
                    />
                    <TextInput 
                    placeholder="Email hoặc Mã số sinh viên"
                    onChangeText={setInput}/>
                </View>

              <View style={styles.buttonContainer}>
                <Pressable onPress={onClose} 
                    style={({ pressed }) => [
                        styles.cancelButton,
                        getDynamicStyles(pressed)]}
                    >
                    <Text style={{color:'red', textAlign:'center'}}>Hủy</Text>
                </Pressable>
                <Pressable onPress={handleResetPassword} 
                    style={({ pressed }) => [
                        styles.confirmButton,
                        getDynamicStyles(pressed)]}
                    >
                    <Text style={{color:'purple', textAlign:'center'}}>Xác nhận</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      );
};

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', //làm mờ
    },
    popupContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center' //căn giữa text
    },
    forgotPassIcon: {
        width: 30,
        height: 30,
        bottom: 4
    },
    input: {
      flexDirection:'row',
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 50,
    },
    buttonContainer: {
      flexDirection:'row',
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: 'grey',
      paddingTop: 10,
      marginTop: 10
    },
    cancelButton: {
        width: '50%',
        borderRightWidth: 1,
        borderRightColor: 'grey'
    },
    confirmButton: {
        width: '50%'
    }
});

export default ForgotPassWord;