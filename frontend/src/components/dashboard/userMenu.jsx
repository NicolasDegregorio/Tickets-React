import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {logout} from '../../redux/usuarioDucks';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userName = useSelector(store => store.usuario.usuario.data.nombre)
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {userName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ horizontal: "center" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => dispatch(logout())}>Cerrar Sesion</MenuItem>
      </Menu>
    </div>
  );
}