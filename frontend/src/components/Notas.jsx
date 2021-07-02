import React from 'react';
import axios from 'axios'

const Notas = () => {
    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState({
      nombre: '',
      descripcion : '',
      usuarioId : ''
    })
    const [formCreate, setFormCreate] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setId] = React.useState(false)
    const [tareasInicial, setTareasInicial] = React.useState([])
    const [pagination, setPagination] = React.useState({
      skip: 0,
      limit: 5
    })
    const obtenerTareas = async (skip, limit) => {
      const res = await axios.get(`http://localhost:5000/api/paginate?skip=${skip}&limit=${limit}`)
      setTareasInicial(res.data)
      setTareas(res.data)
      /* res.data.map((tarea) => (
          setTareas([
              ...tareas,
              {id : tarea._id, nombre: tarea.nombre, descripcion: tarea.descripcion,}
          ])
      )) */
    }
    React.useEffect(() => {
      
      obtenerTareas(pagination.skip, pagination.limit)

    }, [pagination.skip, pagination.limit])

    /* const columns = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'nombre', headerName: 'nombre', width: 130 },
        { field: 'descripcion', headerName: 'descripcion', width: 150 },
        { field: 'acciones', headerName: 'Acciones', width: 150,
            renderCell: () => (
                [
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>,
                    <IconButton aria-label="delete" onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                    
                ]
            ),
        }
      
      ]; */

    const eliminarTarea = async id => {
      try {
        await axios.delete(`http://localhost:5000/api/nota/${id}`)
        console.log("nota eliminada")
        const arrayFiltrado = tareas.filter(item => item._id !== id)
        setTareas(arrayFiltrado)
      } catch (error) {
        console.log(error)
      }
    }

    const agregarTarea = async (e) =>{
      e.preventDefault()
      try {
        await axios.post('http://localhost:5000/api/nueva-nota', tarea)
        setTareas([
          ...tareas,
          tarea
        ])
        setTarea({nombre: '', descripcion : '', usuarioId : ''})
        cerrarFormulario()
      } catch (error) {
        console.log(error)
      }
    }
    
    const editar = item => {
      setEdit(true)
      setFormCreate(true)
      setId(item._id)
      setTarea({...tarea, nombre: item.nombre, descripcion : item.descripcion, usuarioId : item.usuarioId})
      console.log(tareas)
    }

    const editarTarea = async (e) => {
      e.preventDefault()
      try {
        await axios.put(`http://localhost:5000/api/nota/${id}`, tarea)
        const arrayEditado = tareas.map(item => (
          item._id === id ? tarea : item
        ))
        setTareas(arrayEditado)
        setTarea({nombre: '', descripcion : '', usuarioId : ''})
        setId('')
        cerrarFormulario()
      } catch (error) {
        console.log(error)
      }
    }

    const cerrarFormulario = () =>{
      setFormCreate(false)
      setEdit(false)
    }

    const buscador = (palabra) => {
      const arrayFiltrado = tareasInicial.filter(tarea => (
        tarea.nombre.toLowerCase().indexOf(palabra) !== -1 
      ))
      console.log(palabra)

      setTareas(arrayFiltrado)
      
    }
    const siguiente = async () => {
      setPagination({...pagination, skip: pagination.skip +5})
      
    }
    const anterior = async () => {
      if(pagination.skip > 0){
        setPagination({...pagination, skip: pagination.skip - 5})
      }  
      
    }
    

    
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            {
              formCreate ? 
              <form onSubmit= {edit ? editarTarea : agregarTarea}>
              <h4> {edit ? 'Editar Tarea' : 'Nueva Tarea'} </h4>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nombre Tarea"
                  value={tarea.nombre} 
                  onChange={e => setTarea({...tarea, nombre: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Descripcion" 
                  value={tarea.descripcion}
                  onChange={ e => setTarea({...tarea, descripcion: e.target.value})}/>
              </div>
              <div className="form-group">
                <input type="text" 
                  className="form-control" 
                  placeholder="Usuario Id"
                  value = {tarea.usuarioId} 
                  onChange={ e => setTarea({...tarea, usuarioId: e.target.value}) }/>
              </div>
              <div>
                {
                  edit ? 
                    (<button type="submit" className="btn btn-warning"> Editar </button>)
                  :
                    (<button type="submit" className="btn btn-success"> Agregar </button>) 

                }
                <button type="button" className="btn btn-danger ml-3" onClick={() => cerrarFormulario()}>
                  Cancelar
                </button>
              </div>
            </form>
            : null
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {
              formCreate ? 
              null
              : <button className="btn btn-primary mt-3" onClick={() => setFormCreate(true)}> Agregar Tarea</button>
            }
            <div>
              <input type="search" className="float-right my-2" placeholder="Buscar..." onChange={(e) => buscador(e.target.value)  }/>
            </div>
            <table className="table table-striped mt-3">
              
              <thead>
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                    tareas.map((tarea, index) => (
                      <tr>
                        <th key={index}scope="row">{tarea._id}</th>
                        <td>{tarea.nombre}</td>
                        <td>{tarea.descripcion}</td>
                        <td>{tarea.usuarioId}</td>
                        <td>
                          <button className="btn" onClick={() => eliminarTarea(tarea._id)}>
                            <i class="far fa-trash-alt"></i>
                          </button>
                          <button className="btn" onClick={() => editar(tarea)}>
                            <i class="far fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))

                }
              </tbody>
            </table>
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item ">
                  <button className="page-link" onClick={ () => anterior()}>Anterior</button>
                </li>
                <li className="page-item">
                  <button className="btn page-link"  onClick={() => siguiente()}>Siguiente</button>
                </li>
              </ul>
            </nav>
          </div>
        </div> 
        
      </div>  

        
    )
}

export default Notas
