import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { carregarTarefas } from '../store/actions/tarefasAction';
import ModalPendente from './ModalPendente';
import axios from '../services/axios';

const useClasses = makeStyles(() => ({
  button: {
    background: '#fff',
    color: '#00FF00',
    '&:hover': {
      background: '#00FF00',
    },
    '&:hover $svg': {
      color: '#fff',
    },
  },
}));

export default function Tabela({ isPendente }) {
  const classes = useClasses();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tarefaSelect, setTarefaSelect] = useState({});
  const pendentes = useSelector((state) => state.tarefas.pendentes);
  const concluidas = useSelector((state) => state.tarefas.concluidas);

  const incluirTarefa = {
    nome: '',
    email: '',
    descricao: '',
    concluida: 0,
    tentativas: 0,
  };

  const handleClickConcluir = async (id) => {
    try {
      const resp = await axios.put(`/api/tarefas/${id}`, {
        concluida: 1,
      });

      if (resp.status === 200) {
        toast.success('Tarefa Concluida!');
        dispatch(carregarTarefas());
      }
    } catch (err) {
      err.response.data.errors.map((error) => toast.error(error));
    }
  };

  const handleClickCatFact = async () => {
    try {
      const resp = await Axios.get(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3`
      );

      toast.warning('Essa api está com instabilidade no serviço!');

      if (typeof resp === 'object' && resp.length > 0) {
        resp.map((fact) => async () => {
          try {
            await axios.post('/api/tarefas/', {
              ...incluirTarefa,
              nome: 'Eu',
              email: 'eu@me.com',
              descricao: fact.text,
            });
          } catch (err) {
            toast.error(`Ocorreu Um erro: ${err.message}`);
          }
        });
      }

      toast.success('Tarefa da Api Adicionada!');
      dispatch(carregarTarefas());
    } catch (err) {
      err.response.data.errors.map((error) => toast.error(error));
    }
  };

  const handleClickPendente = (tarefa) => {
    setOpen(true);
    setTarefaSelect(tarefa);
  };

  return (
    <Container
      component="main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalPendente
        open={open}
        setOpen={setOpen}
        tarefaSelect={tarefaSelect}
        setTarefaSelect={setTarefaSelect}
      />
      <TableContainer component={Paper} style={{ width: '850px' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome Responsavel</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Descricao</TableCell>
              <TableCell align="center">Acao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isPendente &&
              pendentes &&
              pendentes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.nome}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.descricao}</TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.button}
                      onClick={() => handleClickConcluir(row.id)}
                    >
                      <BeenhereOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!isPendente &&
              concluidas &&
              concluidas.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.nome}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.descricao}</TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.button}
                      onClick={() => handleClickPendente(row)}
                    >
                      <AutorenewOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPendente && pendentes.length === 0 && (
        <Button
          style={{ margin: '5px' }}
          variant="contained"
          color="secondary"
          onClick={() => handleClickCatFact()}
        >
          Estou sem tarefa
        </Button>
      )}
    </Container>
  );
}

Tabela.propTypes = {
  isPendente: PropTypes.bool.isRequired,
};
