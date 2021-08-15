import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import { isEmail } from 'validator';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { carregarTarefas } from '../store/actions/tarefasAction';
import axios from '../services/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome.length < 2 || nome.length > 255) {
      toast.error('O campo nome tem que ter entre 2 e 255 caracteres.');
      return;
    }

    if (desc.length < 3 || desc.length > 255) {
      toast.error('O campo descricao tem que ter entre 3 e 255 caracteres.');
      return;
    }

    const apiResp = await Axios.get(
      `http://apilayer.net/api/check?access_key=08537a3b76dac67a7c77fea72d966091&email=${email}`
    );

    if (apiResp.data.error) {
      toast.warning(`MailBoxLayer: ${apiResp.data.error.type}`);
      toast.error('Tarefa não cadastrada');
      return;
    }

    try {
      const resp = await axios.post('/api/tarefas/', {
        nome,
        email,
        descricao: desc,
      });

      if (resp.status === 200) {
        toast.success('Tarefa adicionada com sucesso!');
      }

      dispatch(carregarTarefas());
      setNome('');
      setEmail('');
      setDesc('');
    } catch (err) {
      err.response.data.errors.map((error) => toast.error(error));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Adicionar Tarefa
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nome"
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome Responsavel:"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email:"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="descricao"
                label="Descrição:"
                type="text"
                id="descricao"
                autoComplete="descricao"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Adicionar tarefa
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Form;
