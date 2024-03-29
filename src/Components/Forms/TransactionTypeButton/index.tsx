import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';


import { Container,Icon,Title,Button } from './styles';

const icons ={
  up:'arrow-up-circle',
  down:'arrow-down-circle',
}

interface Props extends RectButtonProps{
  title: string;
  type:'up' | 'down';
  isActive: boolean;
}

export const TransactionTypeButton: React.FC<Props> = ({title,type,isActive, ...rest}) => {
  return (
    <Container 
      isActive={isActive}
      type={type}
    >
      <Button {...rest} >
        <Icon 
          name={icons[type]}
          type={type}
          isActive={isActive}
        />
        <Title isActive={isActive}>{title}</Title>
      </Button>
    </Container>
  );
}
