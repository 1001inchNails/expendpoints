const express = require('express');

const app = express();


app.use(express.json());


// https://stackoverflow.com/questions/47523265/jquery-ajax-no-access-control-allow-origin-header-is-present-on-the-requested
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let usuarios=[
  {
    "id":"1",
    "nombre":"José",
    "apellidos":"García Castro",
    "telefono":'635114477',
    "email":'joseGC@mainModule.com'
  },
  {
    "id":"2",
    "nombre":"Carlos",
    "apellidos":"Martinez Castro",
    "telefono":'622458958',
    "email":'carlosMC@mainModule.com'
  },
  {
    "id":"3",
    "nombre":"Maria",
    "apellidos":"Valle Igartiburu",
    "telefono":'663221148',
    "email":'mariaVI@mainModule.com'
  },
  {
    "id":"4",
    "nombre":"Ana",
    "apellidos":"Lopez Castillo",
    "telefono":'633220014',
    "email":'anaLC@mainModule.com'
  },
  {
    "id":"5",
    "nombre":"Garcilaso",
    "apellidos":"Fernandez Bahia",
    "telefono":'669887889',
    "email":'garcilasoFB@mainModule.com'
  },
  {
    "id":"6",
    "nombre":"Zeus",
    "apellidos":"Perez Colina",
    "telefono":'610445846',
    "email":'zeusPC@mainModule.com'
  },
  {
    "id":"7",
    "nombre":"Maria del Carmen",
    "apellidos":"García Castro",
    "telefono":'633233548',
    "email":'maricarmenGC@mainModule.com'
  },
];

app.get('/users',(req, res)=>{  // todos los usuarios
  res.json(usuarios);
});

app.get('/users/:nombre',(req, res)=>{  // busqueda por nombre
  let resultado=[];
  let userNombre=req.params.nombre;
  userNombre.toLowerCase();
  for(let usuario of usuarios){
    if(usuario['nombre'].toLowerCase().includes(userNombre.toLowerCase())){
      resultado.push(usuario);
    }
  }
  if(resultado.length>0){
    res.json(resultado);
  }
  else if(resultado.length==0){
    res.json({"mensaje":"No se han encontrado coincidencias"})
  }
  else{
    res.status(404).json(({error:"Error, madafaka"}));
  }
});

app.post('/datos',(req,res)=>{
  try{
    let nuevoIndice=(usuarios.length);  // calculamos nuevo indice
    nuevoIndice++;
    nuevoIndice.toString();

    let nuevoNombre=req.body.nombre;  // cojemos los valores para el nuevo dato
    let nuevoApellidos=req.body.apellidos;
    let nuevoTelefono=req.body.telefono;
    let nuevoEmail=req.body.email;

    let datoNuevo={
      "id":nuevoIndice,
      "nombre":nuevoNombre,
      "apellidos":nuevoApellidos,
      "telefono":nuevoTelefono,
      "email":nuevoEmail,
    };
    
    usuarios.push(datoNuevo);
    res.json({"mensaje":"Usuario introducido correctamente"});
  }catch(error){
    res.send({"mensaje":error});
  }
  

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});


