import React,{useState} from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback,Alert} from 'react-native';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import {InputForm} from '../../Components/Forms/InputForm';

import validationYup from '../../utils/validationYup';

import {Button} from '../../Components/Forms/Button';
import {TransactionTypeButton} from '../../Components/Forms/TransactionTypeButton';
import {CategorySelectButton} from '../../Components/Forms/CategorySelectButton';

import {CategorySelectContentModal} from '../CategorySelectContentModal';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionContainer 
} from './styles';

interface FormData{
  name:string;
  amount:string;
}

export const Register: React.FC = () => {
  const [transactionType, setTransactionType] =useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationYup)/* faz com que o handlesubmit use o schema */
  });

  function handleTransactionTypeSelect(type:'up' | 'down'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleRegister(form:FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data ={
      name:form.name,
      amount: form.amount,
      transactionType,
      category:category.key
    }
    console.log(data);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionContainer>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={()=> handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={()=> handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionContainer>

            <CategorySelectButton 
              title={category.name} 
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>

          <Button 
            title="Enviar" 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelectContentModal
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
   );
}

