/* eslint-disable no-unreachable */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./SingUp.css";
import * as yup from 'yup';

export default function SingUp() {
    const [status,setStatus]= React.useState({
        type:'',
        mensagem:''
    });
    const [sucess,setSucess]= React.useState({
        mensagem:''
    });
    const [fail,setFail]= React.useState({
        mensagem:''
    });
    const[user,setUser]=React.useState({
        name:'',
        password:'',
    });
    const valueInput = e => setUser({...user,[e.target.name]:e.target.value})
    async function Submit(e){
        const axios = require('axios').default
        const url = "http://localhost:4000/user/cadaster"
        e.preventDefault();
      if(!( await validate()) ) return;
      console.log(user);
      axios.post(url,{
        "name": user.name,
        "password": user.password
    }).then(res => {
        if(res.data.ok===true){
            setStatus({
                type:'',
                mensagem:""
            })
            setFail({
                mensagem:""
            })
            setSucess({
                mensagem:"VOCÊ ESTÁ CADASTRADO!!"
            })
        }
        alert('Você será redirecionado para a página de login.')
        window.location.href='http://localhost:3000/login'
    }).catch(e=>{
        console.log(e)
        setFail({
            mensagem:"Usuário já cadastrado!!"
        })
    })
  };
   async function validate(){
      let schema = yup.object().shape({
        name: yup.string("Erro: necessário preencher o campo 'Name'").required("Erro: necessário preencher o campo 'Name'"),
        password:yup.string("Erro: necessário preencher o campo 'Password'").required("Erro: necessário preencher o campo 'Password'")
      });
      try {
           await schema.validate(user)
          return(true)
      } 
      catch (err) {
          setStatus({
              type:'error',
              mensagem:"**"+err.errors+"**"
          })
          return false
      }
  }
  return (
    <div className="main">
      <span className="singUp">SingUp </span>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <p className="error">{status.mensagem}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
            value={user.name}
            onChange={valueInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={user.password}
            onChange={valueInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={Submit}
          >
            Cadastrar
          </Button>
          <p className="sucess">{sucess.mensagem}</p>
          <p className="error">{fail.mensagem}</p>
        </Box>
      </Container>
    </div>
  );
}
