import './style.css'
const formulario=document.getElementById('form-productos')
let productos=[]
const itemProducto=(item)=>{
  return /*HTML*/`
  <tr>
  <td>${item.producto_nombre}</td>
  <td>${item.producto_precio}</td>
  <td>Invierno</td>
  <td>Si</td>
  <td>#000000</td>
  <td>S</td>
  <td>10</td>
  <td>
    <button class="btn-editar">Editar</button>
    <button class="btn-eliminar">Eliminar</button>
  </td>
</tr>
`
}
const postItem=(item)=>{
  fetch('http://localhost:4000/productos',{
    method:'POST',
    body:JSON.stringify(item),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(res=>res.json()).then(data=>{
    productos.push(data)
  }).catch(err=>console.log(err))
}
const render = (item) => {
  console.log("llega a render")
  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ''
  item.forEach(item => {
    tbody.innerHTML += itemProducto(item)
  }
  )
}
const getItems=()=>{
  console.log("llega a get itemS")
fetch("http://localhost:4000/productos").then(res=>res.json()).then(data=>{
  productos=data
  render(productos)
})
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  const form=Object.fromEntries(new FormData(formulario))
  console.log(form)
  postItem(form)
})

getItems();