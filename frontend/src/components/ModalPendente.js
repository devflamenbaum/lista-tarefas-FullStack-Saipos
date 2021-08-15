import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { carregarTarefas } from '../store/actions/tarefasAction';
import axios from '../services/axios';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalPendente({ open, setOpen, tarefaSelect, setTarefaSelect }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const handleClose = () => {
    setPassword('');
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, tentativas } = tarefaSelect;

    if (password !== 'TrabalheNaSaipos') {
      toast.error('Senha do superson inválida.');
      return;
    }

    if (tentativas >= 2) {
      toast.error('Excede o número de tentativas.');
      return;
    }

    try {
      if (tentativas === 0)
        await axios.put(`/api/tarefas/${id}`, {
          tentativas: 1,
          concluida: 0,
        });
      if (tentativas === 1)
        await axios.put(`/api/tarefas/${id}`, {
          tentativas: 2,
          concluida: 0,
        });

      toast.success('Status da Tarefa e tentativas alteradas.');
      dispatch(carregarTarefas());
      setTarefaSelect({});
      setOpen(false);
      setPassword('');
    } catch (err) {
      err.response.data.errors.map((error) => toast.error(error));
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Autenticação</h2>
          <FormAuth onSubmit={handleSubmit}>
            <TextField
              label="Senha Supervisor"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Enviar</Button>
          </FormAuth>
        </div>
      </Fade>
    </Modal>
  );
}

ModalPendente.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  tarefaSelect: PropTypes.object.isRequired,
  setTarefaSelect: PropTypes.func.isRequired,
};

const FormAuth = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ModalPendente;
