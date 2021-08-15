import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { carregarTarefas } from '../store/actions/tarefasAction';
import TabPanel from './TabPanel';
import Form from './Form';
import Tabela from './Tabela';

function Header() {
  const [aba, setAba] = useState(0);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(carregarTarefas());
      setLoad(false);
    }
    fetchData();
  }, [dispatch]);

  const handleTabsChange = (event, newValue) => {
    setAba(newValue);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>Lista de Tarefas</h1>
          <Tabs value={aba} onChange={handleTabsChange}>
            <Tab label="Pendentes" id={0} />
            <Tab label="Concluídas" id={1} />
          </Tabs>
        </div>
      </AppBar>
      <TabPanel value={aba} index={0}>
        <Form />
        {!load && <CustomTabela isPendente />}
      </TabPanel>
      <TabPanel value={aba} index={1}>
        {!load && <CustomTabela isPendente={false} />}
      </TabPanel>
    </>
  );
}

const CustomTabela = styled(Tabela)`
  max-width: 650px;
`;

export default Header;
